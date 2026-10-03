import { PinIcon } from '@sanity/icons/Pin'
import { defineType, defineField } from 'sanity'

export const subCouncil = defineType({
  name: 'subCouncil',
  title: 'Sub-Council',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'region', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 4 }),
    defineField({ name: 'city', type: 'string' }),
    defineField({ name: 'state', type: 'string' }),
    defineField({ name: 'area', type: 'string' }),
    defineField({ name: 'address', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'email' }),
    defineField({ name: 'latitude', type: 'number' }),
    defineField({ name: 'longitude', type: 'number' }),
    defineField({ name: 'establishedYear', type: 'number' }),
    defineField({ name: 'grandKnight', type: 'string' }),
  ],
})
