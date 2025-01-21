import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Category Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'A brief description of this category (optional).',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Category Image',
      options: {
        hotspot: true,
      },
      description: 'An optional image to represent this category.',
    }),
  ],
});
