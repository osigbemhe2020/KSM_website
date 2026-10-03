import { StarIcon } from '@sanity/icons/Star'
import { defineType, defineField } from 'sanity'

/**
 * pillar — Mission / What We Do Pillar
 * Used on the landing page WhatWeDo section and on /our-mission page.
 * A "pillar" represents a core focus area of the Order.
 */
export const pillar = defineType({
  name: 'pillar',
  title: 'Pillar',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle / Sub-label', type: 'string', description: 'e.g. "& Compassion" (displayed below the main title on the mission page)' }),
    defineField({ name: 'icon', title: 'Icon Symbol', type: 'string', description: 'Unicode icon character e.g. ♥ ⚐ ✦ or a lucide icon name e.g. Heart' }),
    defineField({ name: 'href', title: 'Link URL', type: 'string', description: 'Internal link for the "Learn More" button on the homepage e.g. /charity' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({
      name: 'context',
      title: 'Context / Page',
      type: 'string',
      description: 'Where this pillar is shown',
      options: {
        list: [
          { title: 'Homepage – What We Do', value: 'homepage' },
          { title: 'Our Mission Page', value: 'mission' },
          { title: 'Both', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'both',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
