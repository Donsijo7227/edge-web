// pages/api/upload-base64-to-sanity.js
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2022-11-15',
  useCdn: false,
});
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb', 
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, mimeType, base64 } = req.body;
    
    if (!base64) {
      return res.status(400).json({ error: 'No file data provided' });
    }

    // Strip out the base64 prefix (e.g., "data:application/pdf;base64,")
    const base64Data = base64.split(';base64,').pop();
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Upload to Sanity
    const fileDocument = await sanityClient.assets.upload('file', buffer, {
      filename,
      contentType: mimeType,
    });

    // Create a reference document in bursaryDocument schema
    const doc = {
      _type: 'bursaryDocument',
      title: filename || 'Document',
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

    // Return the document ID
    return res.status(200).json({ 
      documentId: createdDocument._id,
      message: 'File uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Error uploading file', details: error.message });
  }
}