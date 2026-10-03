import { UserIcon } from '@sanity/icons/User'
import { defineType, defineField, defineArrayMember } from 'sanity'

export const stMulumba = defineType({
  name: 'stMulumba',
  title: 'St. Mulumba Page',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'portrait', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'portraitCaption', type: 'string' }),
    defineField({ name: 'lifeTitle', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'lifeParagraphs', type: 'array', of: [defineArrayMember({ type: 'text' })] }),
    defineField({ name: 'quote', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'quoteAttribution', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'anthem', title: 'Mulumba Anthem', type: 'text', rows: 16 }),
    defineField({ name: 'anthemComposer', title: 'Anthem Composer', type: 'string' }),
    defineField({ name: 'significanceTitle', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'significanceText', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'legacyTitle', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'legacyPoints', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
  ],
})
