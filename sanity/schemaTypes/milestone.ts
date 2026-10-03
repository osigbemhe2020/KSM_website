import { defineType, defineField } from 'sanity'

export const milestone = defineType({
  name: 'milestone',
  title: 'Milestone',
  type: 'object',
  fields: [
    defineField({ name: 'date', title: 'Date', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'note', title: 'Note', type: 'text', rows: 3 }),
  ],
})
