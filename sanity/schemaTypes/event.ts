import { CalendarIcon } from '@sanity/icons/Calendar'
import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({ name: 'title', title: 'Event Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'startDate', title: 'Start Date & Time', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'endDate', title: 'End Date & Time', type: 'datetime' }),
    defineField({ name: 'time', title: 'Display Time', type: 'string', description: 'e.g. "11:00 AM" or "10:00 AM - 2:00 PM"' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Mass & Liturgy', value: 'Mass & Liturgy' },
          { title: 'Leadership & Council', value: 'Leadership & Council' },
          { title: 'Charity & Outreach', value: 'Charity & Outreach' },
          { title: 'Youth & LSM', value: 'Youth & LSM' },
          { title: 'General', value: 'General' },
        ],
      },
    }),
    
    defineField({ name: 'isFeatured', title: 'Featured Event', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'startDate',
      location: 'location',
    },
    prepare({ title, subtitle, location }) {
      const formattedDate = subtitle ? new Date(subtitle).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
      return {
        title,
        subtitle: `${formattedDate}${location ? ` · ${location}` : ''}`,
      };
    },
  },
})
