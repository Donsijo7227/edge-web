// sanity/schemas/objects/textSection.ts
export default {
    name: 'textSection',
    title: 'Text Section',
    type: 'object',
    fields: [
      {
        name: 'heading',
        title: 'Heading',
        type: 'string'
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [
              { title: 'Normal', value: 'normal' },
              { title: 'Heading 2', value: 'h2' },
              { title: 'Heading 3', value: 'h3' },
              { title: 'Heading 4', value: 'h4' }
            ],
            lists: [
              { title: 'Bullet', value: 'bullet' },
              { title: 'Numbered', value: 'number' }
            ],
            marks: {
              decorators: [
                { title: 'Strong', value: 'strong' },
                { title: 'Emphasis', value: 'em' },
                { title: 'Underline', value: 'underline' }
              ],
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'Link',
                  fields: [
                    {
                      name: 'href',
                      type: 'url',
                      title: 'URL'
                    },
                    {
                      name: 'blank',
                      type: 'boolean',
                      title: 'Open in new tab',
                      initialValue: true
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ],
    preview: {
      select: {
        title: 'heading'
      },
      prepare({ title }: { title: string }) {
        return {
          title: title || 'Text Section',
          subtitle: 'Text Section',
          media: () => '📝'
        };
      }
    }
  };