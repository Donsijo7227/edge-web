// sanity/schemas/objects/seo.ts
export default {
    name: 'seo',
    title: 'SEO',
    type: 'object',
    fields: [
      {
        name: 'metaTitle',
        title: 'Meta Title',
        type: 'string',
        description: 'Title used for search engines and browser tabs',
        validation: (Rule: any) => Rule.max(60).warning('Longer titles may be truncated by search engines')
      },
      {
        name: 'metaDescription',
        title: 'Meta Description',
        type: 'text',
        rows: 3,
        description: 'Description for search engines',
        validation: (Rule: any) => Rule.max(160).warning('Longer descriptions may be truncated by search engines')
      },
      {
        name: 'shareImage',
        title: 'Share Image',
        type: 'image',
        description: 'Image used for social media sharing',
        options: {
          hotspot: true
        }
      }
    ]
  };