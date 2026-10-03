import { UsersIcon } from '@sanity/icons/Users'
import { defineType, defineField, defineArrayMember } from 'sanity'

export const committee = defineType({
  name: 'committee',
  title: 'Committee',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'ministry', type: 'string' }),
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'purpose', type: 'text', rows: 4 }),
    defineField({ name: 'responsibilities', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'recentActivity', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'leadership', type: 'object', fields: [defineField({ name: 'chair', type: 'string' }), defineField({ name: 'secretary', type: 'string' })] }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
  ],
})
