// pages/api/upload-to-sanity.js
import { createClient } from '@sanity/client';
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';
import fs from 'fs';

// Configure upload middleware
const upload = multer({
  storage: multer.diskStorage({
    destination: '/tmp',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  })
});

// Initialize next-connect with error handling
const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: 'Method not allowed' });
  },
});

// Use multer middleware to handle file upload
apiRoute.use(upload.single('file'));

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2022-11-15',
  useCdn: false,
});

// Handle the POST request
apiRoute.post(async (req, res) => {
  try {
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the file from disk
    const fileData = fs.readFileSync(file.path);
    
    // Upload to Sanity
    const fileDocument = await sanityClient.assets.upload('file', fileData, {
      filename: file.originalname || 'document.pdf',
      contentType: file.mimetype || 'application/pdf',
    });

    // Clean up the temporary file
    fs.unlinkSync(file.path);

    // Create a reference document in bursaryDocument schema
    const doc = {
      _type: 'bursaryDocument',
      title: file.originalname || 'Document',
      file: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: fileDocument._id
        }
      },
      uploadedAt: new Date().toISOString()
    };

    // Create the document
    const createdDocument = await sanityClient.create(doc);

    // Return the document ID to be stored in MongoDB
    return res.status(200).json({ 
      documentId: createdDocument._id,
      message: 'File uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file', details: error.message });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disables body parsing, necessary for multer
  },
};