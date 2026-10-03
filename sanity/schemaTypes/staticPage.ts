import { DocumentIcon } from '@sanity/icons/Document'
import { defineType, defineField, defineArrayMember } from 'sanity'
import { richTextBlock } from './richTextBlock'

export const staticPage = defineType({
  name: 'staticPage',
  title: 'Static Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', type: 'array', of: [richTextBlock] }),
    defineField({ name: 'timeline', type: 'array', of: [defineArrayMember({ type: 'timelineItem' })] }),
  ],
})
