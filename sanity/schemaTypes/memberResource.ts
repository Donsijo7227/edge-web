// sanity/schemaTypes/memberResource.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'memberResource',
  title: 'Member Resources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'resourceFile',
      title: 'Resource File (PDF)',
      type: 'file',
      options: {
        accept: '.pdf'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Code of Conducts', value: 'codeOfConduct'},
          {title: 'EDGE Constitution', value: 'constitution'},
          {title: 'BY-Law', value: 'byLaws'},
          {title: 'Financial Year End Report', value: 'financialReports'},
          {title: 'Membership Form', value: 'membershipForm'},
          {title: 'Other', value: 'other'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'orderRank',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (if multiple documents in same category)',
      initialValue: 10
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'resourceFile'
    }
  }
})