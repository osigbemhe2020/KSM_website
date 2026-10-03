import { HelpCircleIcon } from '@sanity/icons/HelpCircle'
import { defineType, defineField } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: 'question', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'answer', type: 'text', rows: 5, validation: (rule) => rule.required() }),
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'isPublished', title: 'Published', type: 'boolean', initialValue: true }),
  ],
})
