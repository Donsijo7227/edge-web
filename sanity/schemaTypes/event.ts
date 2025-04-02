// sanity/schemaTypes/event.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    // Add name as an alias for backward compatibility
    defineField({
      name: 'name',
      title: 'Event Name (Legacy)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true
      },
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date/Time',
      type: 'datetime',
    }),
    defineField({
      name: 'doorsOpen',
      title: 'Doors Open',
      type: 'number',
    }),
    defineField({
      name: 'location',
      title: 'Location Name',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    // Fix venue reference by changing to a string until you have a venue schema
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      // Remove the reference for now
      // If you need the reference later, create a venue schema first
    }),
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'text',
    }),
    defineField({
      name: 'details',
      title: 'Event Details',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'In Person', value: 'in person'},
          {title: 'Online', value: 'online'},
          {title: 'Hybrid', value: 'hybrid'}
        ]
      }
    }),
    // Fix headline reference by changing to a string
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      // Remove the reference for now
    }),
    defineField({
      name: 'tickets',
      title: 'Tickets URL',
      type: 'url',
    })
  ],
  preview: {
    select: {
      title: 'title',
      name: 'name',
      media: 'image',
      date: 'date'
    },
    prepare(selection) {
      const { title, name, media, date } = selection
      const eventDate = date ? new Date(date).toLocaleDateString() : 'No date'
      
      return {
        title: title || name,
        subtitle: `Event Date: ${eventDate}`,
        media
      }
    }
  }
})