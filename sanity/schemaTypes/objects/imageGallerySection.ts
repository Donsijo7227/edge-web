// sanity/schemas/objects/imageGallerySection.ts
export default {
    name: 'imageGallerySection',
    title: 'Image Gallery Section',
    type: 'object',
    fields: [
      {
        name: 'heading',
        title: 'Heading',
        type: 'string'
      },
      {
        name: 'subheading',
        title: 'Subheading',
        type: 'string'
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true
            },
            fields: [
              {
                name: 'alt',
                title: 'Alt Text',
                type: 'string',
                description: 'Alternative text for screen readers',
                validation: (Rule: any) => Rule.required()
              },
              {
                name: 'caption',
                title: 'Caption',
                type: 'string'
              }
            ]
          }
        ],
        validation: (Rule: any) => Rule.min(1)
      },
      {
        name: 'layout',
        title: 'Layout',
        type: 'string',
        options: {
          list: [
            { title: 'Grid', value: 'grid' },
            { title: 'Carousel', value: 'carousel' },
            { title: 'Masonry', value: 'masonry' }
          ],
          layout: 'radio'
        },
        initialValue: 'grid'
      }
    ],
    // preview: {
    //   select: {
    //     title: 'heading',
    //     imageCount: 'images.length'
    //   },
    //   prepare({ title, media }: { title: string, media: any }) {
    //     return {
    //       title: title || 'Image Gallery',
    //       subtitle: 'Image Gallery Section',
    //       media: media || '🖼️'
    //     };
    //   }
    // }
  };