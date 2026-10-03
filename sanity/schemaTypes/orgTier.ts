import { SplitVerticalIcon } from '@sanity/icons/SplitVertical'
import { defineType, defineField, defineArrayMember } from 'sanity'

/**
 * orgTier — Organizational Structure Tier
 * Used on /structure page to represent each level of the KSM hierarchy
 * (Supreme Council → Metro Council → Metro Zones → Sub-Councils → Sub-Council Zones)
 */
export const orgTier = defineType({
  name: 'orgTier',
  title: 'Organizational Tier',
  type: 'document',
  icon: SplitVerticalIcon,
  fields: [
    defineField({ name: 'tier', title: 'Tier Label', type: 'string', description: 'e.g. TIER 1', validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', validation: (rule) => rule.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Description', type: 'text', rows: 4 }),
    defineField({
      name: 'roles',
      title: 'Key Roles',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  orderings: [
    {
      title: 'Tier Order',
      name: 'tierOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
