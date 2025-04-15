// sanity/schemas/documents/page.ts
export default {
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Page Title',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'includeInNavigation',
        title: 'Include in Navigation',
        description: 'Should this page appear in the main navigation?',
        type: 'boolean',
        initialValue: false
      },
      {
        name: 'navigationOrder',
        title: 'Navigation Order',
        description: 'Order in which this page appears in the navigation (lower numbers appear first)',
        type: 'number',
        hidden: ({ document }: { document: any }) => !document?.includeInNavigation
      },
      {
        name: 'seo',
        title: 'SEO',
        type: 'seo'
      },
      {
        name: 'content',
        title: 'Page Content',
        type: 'array',
        of: [
          { type: 'textSection' },
          { type: 'imageGallerySection' }
          // Add more section types here
        ]
      }
    ],
    preview: {
      select: {
        title: 'title',
        slug: 'slug.current',
        includeInNav: 'includeInNavigation'
      },
      prepare({ title, slug, includeInNav }: { title: string, slug: string, includeInNav: boolean }) {
        return {
          title,
          subtitle: `/${slug} ${includeInNav ? '• In navigation' : ''}`
        };
      }
    }
  };