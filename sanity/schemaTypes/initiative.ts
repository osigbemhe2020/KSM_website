import { defineType, defineField } from 'sanity'

export const initiative = defineType({
  name: 'initiative',
  title: 'Initiative',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
})
