// sanity/schemaTypes/importantDate.ts
// @ts-nocheck

export default {
    name: 'importantDate',
    title: 'Important Date',
    type: 'document',
    fields: [
      {
        name: 'month',
        title: 'Month',
        type: 'string',
        options: {
          list: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ]
        },
        validation: (Rule) => Rule.required()
      },
      {
        name: 'day',
        title: 'Day',
        type: 'number',
        validation: (Rule) => Rule.min(1).max(31).required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule) => Rule.required()
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        description: 'Order in which this date should appear (lower numbers first)',
        validation: (Rule) => Rule.required()
      }
    ],
    preview: {
      select: {
        month: 'month',
        day: 'day',
        description: 'description',
        order: 'order'
      },
      prepare(selection) {
        const {month, day, description, order} = selection
        // Add null check for description
        const desc = description || '';
        return {
          title: `${month} ${day}`,
          subtitle: `${desc.substring(0, 50)}${desc.length > 50 ? '...' : ''} (Order: ${order})`
        }
      }
    },
    orderings: [
      {
        title: 'Date Order',
        name: 'dateOrder',
        by: [
          { field: 'order', direction: 'asc' }
        ]
      },
      {
        title: 'Calendar Order',
        name: 'calendarOrder',
        by: [
          { 
            field: 'month', 
            direction: 'asc',
            // Custom ordering for months
            options: {
              sortItems: (items) => {
                const monthOrder = [
                  'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
                ];
                return items.sort((a, b) => {
                  return monthOrder.indexOf(a) - monthOrder.indexOf(b);
                });
              }
            }
          },
          { field: 'day', direction: 'asc' }
        ]
      }
    ]
  }