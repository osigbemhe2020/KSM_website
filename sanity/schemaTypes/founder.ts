import { UserIcon } from '@sanity/icons/User'
import { defineType, defineField, defineArrayMember } from 'sanity'

export const founder = defineType({
  name: 'founder',
  title: 'Founder Page',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'portrait', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'portraitCaption', type: 'string' }),
    defineField({ name: 'founderIntro', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'founderBio', type: 'array', of: [defineArrayMember({ type: 'text' })] }),
    defineField({ name: 'chapters', type: 'array', of: [defineArrayMember({
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'body', type: 'text', validation: (rule) => rule.required() }),
      ]
    })] }),
    defineField({ name: 'visionQuote', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'visionAttribution', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'momentImages', type: 'array', of: [defineArrayMember({ type: 'image', options: { hotspot: true } })] }),
  ],
})
