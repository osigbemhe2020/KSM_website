import { DocumentIcon } from '@sanity/icons/Document'
import { defineType, defineField, defineArrayMember } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 2, description: 'Summary displayed on project listing cards' }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: [{ title: 'Completed', value: 'COMPLETED' }, { title: 'Ongoing', value: 'ONGOING' }, { title: 'Upcoming', value: 'UPCOMING' }] }, validation: (rule) => rule.required() }),
    defineField({ name: 'hero', title: 'Hero Image', type: 'image', options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: 'overview', title: 'Overview', type: 'array', of: [defineArrayMember({ type: 'text' })] }),
    defineField({ name: 'objectives', title: 'Objectives', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'milestones', title: 'Milestones', type: 'array', of: [defineArrayMember({ type: 'milestone' })] }),
  ],
})
