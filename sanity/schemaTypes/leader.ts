import { UserIcon } from '@sanity/icons/User'
import { defineType, defineField, defineArrayMember } from 'sanity'

export const leader = defineType({
  name: 'leader',
  title: 'Leader',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({ name: 'role', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'category',
      title: 'Category / Wing',
      type: 'string',
      options: {
        list: [
          { title: 'KSM (Knights)', value: 'ksm' },
          { title: 'LSM (Ladies)', value: 'lsm' },
          { title: 'YSM (Youths)', value: 'ysm' },
          { title: 'Executive', value: 'executive' },
        ],
        layout: 'radio',
      },
      initialValue: 'ksm',
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'served', type: 'string' }),
    defineField({ name: 'shortBio', type: 'text', rows: 3 }),
    defineField({ name: 'bioHeading', type: 'string' }),
    defineField({ name: 'bio', type: 'array', of: [defineArrayMember({ type: 'text' })] }),
    defineField({ name: 'responsibilities', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'gifts', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
  ],
})
