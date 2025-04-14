import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2022-11-15',
  useCdn: false,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { documentIds } = req.body;
  console.log('📥 Incoming documentIds:', documentIds);

  try {
    const bursaryDocs = await sanityClient.fetch(
      `*[_type == "bursaryDocument" && _id in $ids]{
        _id,
        title,
        "fileAssetId": file.asset->_id,
        "fileName": file.asset->originalFilename,
        "fileType": file.asset->mimeType
      }`,
      { ids: documentIds }
    );
    
    console.log('📦 Fetched bursaryDocument docs from Sanity:', bursaryDocs);
    
    const projectId = sanityClient.config().projectId;
    const dataset = sanityClient.config().dataset;
    
    const documents = bursaryDocs.map(doc => {
      if (!doc.fileAssetId) {
        console.warn(`No file asset found for document: ${doc._id}`);
        return null;
      }
      
      // Extract the asset hash from the asset ID
      const assetHash = doc.fileAssetId.split('-')[1];
      
      // Get the file extension
      const ext = doc.fileAssetId.split('-')[2] || 'pdf';
      
      // Construct the Sanity CDN URL
      const url = `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetHash}.${ext}`;
      
      console.log(`📄 Created URL for ${doc.title}: ${url}`);
      
      return {
        id: doc._id,
        title: doc.title || doc.fileName || 'Untitled',
        url: url
      };
    }).filter(Boolean);

    res.status(200).json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
}