import { PackageIcon } from '@sanity/icons/Package'
import { defineType, defineField, defineArrayMember } from 'sanity'

export const venture = defineType({
  name: 'venture',
  title: 'Venture',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'tagline', type: 'text', rows: 3 }),
    defineField({ name: 'industry', type: 'string' }),
    defineField({ name: 'areaOfOperation', type: 'string' }),
    defineField({ name: 'registered', type: 'string' }),
    defineField({ name: 'aboutShort', type: 'string' }),
    defineField({ name: 'aboutLong', type: 'text', rows: 8 }),
    defineField({ name: 'stats', type: 'array', of: [defineArrayMember({ type: 'stat' })] }),
    defineField({ name: 'impactText', type: 'text', rows: 8 }),
    defineField({ name: 'leaders', type: 'array', of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'role', type: 'string' }), defineField({ name: 'name', type: 'string' })] })] }),
  ],
})
