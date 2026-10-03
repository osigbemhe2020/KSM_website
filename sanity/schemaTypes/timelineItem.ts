import { defineType, defineField } from 'sanity'

export const timelineItem = defineType({
  name: 'timelineItem',
  title: 'Timeline Item',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', validation: (rule) => rule.required() }),
  ],
  orderings: [
    {
      title: 'Year Order',
      name: 'yearOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
