// sanity/schemaTypes/applicationSteps.ts
// @ts-nocheck

export default {
    name: 'applicationSteps',
    title: 'Application Steps',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'A title for these application steps (e.g., "Local High School Application Steps")',
        validation: (Rule) => Rule.required()
      },
      {
        name: 'bursary',
        title: 'Bursary',
        type: 'reference',
        to: [{ type: 'bursary' }],
        description: 'The bursary these steps apply to',
        validation: (Rule) => Rule.required()
      },
      {
        name: 'steps',
        title: 'Steps',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'stepTitle',
                title: 'Step Title',
                type: 'string',
                validation: (Rule) => Rule.required()
              },
              {
                name: 'stepImage',
                title: 'Step Image',
                type: 'image',
                options: {
                  hotspot: true,
                },
                validation: (Rule) => Rule.required()
              },
              {
                name: 'stepDescription',
                title: 'Step Description',
                type: 'array',
                of: [{ type: 'block' }],
                validation: (Rule) => Rule.required()
              }
            ],
            preview: {
              select: {
                title: 'stepTitle',
                media: 'stepImage'
              }
            }
          }
        ],
        validation: (Rule) => Rule.required().min(1)
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        description: 'Order in which these steps should appear (lower numbers first)',
        validation: (Rule) => Rule.required()
      }
    ],
    preview: {
      select: {
        title: 'title',
        bursaryName: 'bursary.title',
        order: 'order'
      },
      prepare(selection) {
        const {title, bursaryName, order} = selection
        return {
          title: title,
          subtitle: `For: ${bursaryName || 'Unknown bursary'} (Order: ${order})`
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