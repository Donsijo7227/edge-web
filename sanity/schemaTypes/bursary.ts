// sanity/schemaTypes/bursary.ts
// @ts-nocheck

export default {
    name: 'bursary',
    title: 'Bursary',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'array',
        of: [{ type: 'block' }],
        validation: (Rule) => Rule.required()
      },
      {
        name: 'website',
        title: 'Website',
        type: 'url',
        description: 'Website for more information (optional)'
      },
      {
        name: 'contactPerson',
        title: 'Contact Person',
        type: 'string',
        description: 'Contact person name (optional)'
      },
      {
        name: 'contactEmail',
        title: 'Contact Email',
        type: 'string',
        description: 'Contact email (optional)'
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        description: 'Order in which this bursary should appear (lower numbers first)',
        validation: (Rule) => Rule.required()
      }
    ],
    preview: {
      select: {
        title: 'title',
        order: 'order'
      },
      prepare(selection) {
        const {title, order} = selection
        return {
          title: title,
          subtitle: `Order: ${order}`
        }
      }
    },
    orderings: [
      {
        title: 'Display Order',
        name: 'displayOrder',
        by: [
          { field: 'order', direction: 'asc' }
        ]
      }
    ]
  }