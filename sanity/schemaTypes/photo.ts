// sanity/schemaTypes/photo.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        { 
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      options: {
        layout: 'grid'
      },
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      categoryTitle: 'category.title',
      media: 'images.0'
    },
    prepare(selection) {
      const {categoryTitle, media} = selection
      
      return {
        title: categoryTitle ? `${categoryTitle} Photos` : 'Untitled Gallery',
        subtitle: 'Gallery Photo Set',
        media: media
      }
    }
  }
})