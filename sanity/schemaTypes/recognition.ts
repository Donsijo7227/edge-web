// sanity/schemaTypes/recognition.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recognition',
  title: 'Recognition',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Recipient Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Recipient Image',
      type: 'image',
      description: 'Upload a photo of the recipient. IMPORTANT: After uploading, click "Edit" and use the hotspot tool (circle) to position it over the person\'s face to ensure proper cropping.',
      options: {
        hotspot: true, // Enables the hotspot tool in the Sanity Studio UI
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'memberSince',
      title: 'Member Since',
      type: 'date',
      description: 'When they joined the club',
    }),
    defineField({
      name: 'term',
      title: 'Term of Service',
      type: 'string',
      description: 'e.g., "2023-2025" or "Current"',
    }),
    defineField({
      name: 'category',
      title: 'Role/Position',
      type: 'string',
      options: {
        list: [
          {title: 'President', value: 'president'},
          {title: 'Vice President', value: 'vice-president'},
          {title: 'Secretary', value: 'secretary'},
          {title: 'Treasurer', value: 'treasurer'},
          {title: 'Events Coordinator', value: 'events-coordinator'},
          {title: 'Membership Chair', value: 'membership-chair'},
          {title: 'Education Director', value: 'education-director'},
          {title: 'Garden Manager', value: 'garden-manager'},
          {title: 'Plant Exchange Coordinator', value: 'plant-exchange'},
          {title: 'Newsletter Editor', value: 'newsletter-editor'}
        ]
      }
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'details',
      title: 'Detailed Information',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'quote', type: 'text', title: 'Quote'},
            {name: 'author', type: 'string', title: 'Author'}
          ]
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Featured Recipient',
      type: 'boolean',
      description: 'Toggle to feature this recipient prominently',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage',
      role: 'category',
      term: 'term'
    },
    prepare(selection) {
      const { title, media, role, term } = selection
      const displayTerm = term || ''
      const displayRole = role || 'Member'
      
      return {
        title,
        subtitle: `${displayRole} ${displayTerm ? `(${displayTerm})` : ''}`,
        media
      }
    }
  }
})