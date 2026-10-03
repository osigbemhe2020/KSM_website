import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { defineType, defineField, defineArrayMember } from 'sanity'

const richParagraphBlock = defineArrayMember({
  type: 'block',
  title: 'Paragraph',
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
    ],
    annotations: [],
  },
})

const headingBlock = defineArrayMember({
  type: 'object',
  name: 'heading',
  fields: [
    defineField({ name: 'level', type: 'string', title: 'Heading Level', options: { list: ['h2', 'h3'] } }),
    defineField({ name: 'text', type: 'string', title: 'Heading Text' }),
  ],
})

const quoteBlock = defineArrayMember({
  type: 'object',
  name: 'quote',
  fields: [
    defineField({ name: 'text', type: 'array', title: 'Quote Text', of: [richParagraphBlock] }),
    defineField({ name: 'cite', type: 'string', title: 'Citation/Author' }),
  ],
})

const contentImageBlock = defineArrayMember({
  type: 'object',
  name: 'contentImage',
  fields: [
    defineField({ 
      name: 'image', 
      type: 'image', 
      options: { hotspot: true },
      validation: (rule) => rule.required() 
    }),
    defineField({ name: 'caption', type: 'string', title: 'Image Caption' }),
  ],
})

const listBlock = defineArrayMember({
  type: 'object',
  name: 'list',
  fields: [
    defineField({ 
      name: 'items', 
      type: 'array', 
      of: [{ type: 'string' }],
      title: 'List Items'
    }),
  ],
})

export const newsPost = defineType({
  name: 'newsPost',
  title: 'News Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'excerpt', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'author', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'category', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'hero',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'altText', type: 'string', title: 'Alt text' }),
        defineField({ name: 'caption', type: 'string', title: 'Image Caption' }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, hidden: true }),
    defineField({ 
      name: 'content', 
      type: 'array', 
      of: [
        richParagraphBlock,
        headingBlock,
        quoteBlock,
        contentImageBlock,
        listBlock,
      ]
    }),
  ],
})
