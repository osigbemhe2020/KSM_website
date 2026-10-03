import { CogIcon } from '@sanity/icons/Cog'
import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'logo', type: 'image' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'email' }),
    defineField({ name: 'address', type: 'text', rows: 3 }),
    defineField({ name: 'officeHours', type: 'string' }),
    defineField({ name: 'mapsUrl', type: 'url' }),
    defineField({ name: 'donationUrl', type: 'url' }),
    defineField({ name: 'facebookUrl', type: 'url' }),
    defineField({ name: 'instagramUrl', type: 'url' }),
    defineField({ name: 'whatsappUrl', type: 'url' }),
  ],
})
