import { HeartIcon } from '@sanity/icons/Heart'
import { defineType, defineField, defineArrayMember } from 'sanity'

export const donationPage = defineType({
  name: 'donationPage',
  title: 'Donation Page',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'impactsTitle', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'impactsSubtitle', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'impactsDescription', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'impacts', type: 'array', of: [defineArrayMember({
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'description', type: 'text', validation: (rule) => rule.required() }),
        defineField({ name: 'metric', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'subtext', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
      ]
    })] }),
    defineField({ name: 'donationTitle', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'donationDescription', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'presets', type: 'array', of: [defineArrayMember({ type: 'number' })] }),
    defineField({ name: 'testimonialsTitle', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'testimonialQuote', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'testimonialAuthor', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'testimonialRole', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'testimonialImage', type: 'image', options: { hotspot: true } }),
  ],
})
