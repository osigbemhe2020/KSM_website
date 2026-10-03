import { HeartIcon } from '@sanity/icons/Heart'
import { defineType, defineField, defineArrayMember } from 'sanity'

export const charityProgram = defineType({
  name: 'charityProgram',
  title: 'Charity Program',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Heading displayed on cards and section lists',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'hero',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [defineArrayMember({ type: 'text' })],
    }),
    defineField({
      name: 'initiatives',
      title: 'Core Initiatives',
      type: 'array',
      of: [defineArrayMember({ type: 'initiative' })],
    }),
    defineField({
      name: 'impactNote',
      title: 'Impact Note',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'impactImages',
      title: 'Impact Images',
      type: 'array',
      of: [defineArrayMember({ type: 'galleryImage' })],
    }),
  ],
})
