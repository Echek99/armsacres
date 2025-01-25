import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Product Title',
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
      name: 'image',
      type: 'image',
      title: 'Product Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
        //ONLY FOR EIGHTHS AND OUNCES
        name: 'additionalInfo',
        type: 'object',
        title: 'Additional Information',
        fields: [
          defineField({
            name: 'thcContent',
            type: 'number',
            title: 'THC Content (%)',
          }),
          defineField({
            name: 'strain',
            type: 'string',
            title: 'Strain',
          }),
          defineField({
            name: 'productDeal',
            type: 'string',
            title: 'ProductDeal',
          }),
        ],
      }),
  ],
});
