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
      name: 'recognizedFor',
      title: 'Recognized For',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'awardDate',
      title: 'Award Date',
      type: 'date',
    }),
    defineField({
      name: 'category',
      title: 'Award Category',
      type: 'string',
      options: {
        list: [
          {title: 'Community Service', value: 'community'},
          {title: 'Gardening Excellence', value: 'gardening'},
          {title: 'Environmental Stewardship', value: 'environmental'},
          {title: 'Innovation', value: 'innovation'},
          {title: 'Lifetime Achievement', value: 'lifetime'}
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
      subtitle: 'recognizedFor',
      media: 'mainImage',
      date: 'awardDate'
    },
    prepare(selection) {
      const { title, subtitle, media, date } = selection
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'No date'
      
      return {
        title,
        subtitle: `${subtitle} (${formattedDate})`,
        media
      }
    }
  }
})