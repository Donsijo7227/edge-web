// sanity/schemas/bursaryDocument.js
export default {
    name: 'bursaryDocument',
    title: 'Bursary Document',
    type: 'document',
    hidden: true,
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'file',
        title: 'File',
        type: 'file'
      },
      {
        name: 'uploadedAt',
        title: 'Uploaded At',
        type: 'datetime'
      }
    ]
  };