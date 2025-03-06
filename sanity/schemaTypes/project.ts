// sanity/schemaTypes/project.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'A short summary that will appear on the projects listing page',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
          { title: 'Upcoming', value: 'upcoming' }
        ]
      }
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date'
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date'
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      status: 'status'
    },
    prepare(selection) {
      const { title, media, status } = selection
      
      return {
        title,
        subtitle: status ? `Status: ${status}` : '',
        media
      }
    }
  }
})