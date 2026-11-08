import { defineArrayMember, defineField, defineType } from 'sanity';
import { ImagesIcon } from '@sanity/icons';
import { BlockObjectInput } from '../components/BlockObjectInput';

export const imageGallerySchema = defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  icon: ImagesIcon,
  components: { input: BlockObjectInput },
  options: {
    modal: { type: 'dialog', width: 2 }
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'E.g., System Architecture & Wireframes, App Walkthrough'
    }),
    defineField({
      name: 'layout',
      title: 'Display Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Interactive Carousel with Lightbox', value: 'carousel' },
          { title: '2-Column Grid', value: 'grid-2' },
          { title: '3-Column Grid', value: 'grid-3' }
        ],
        layout: 'radio'
      },
      initialValue: 'carousel'
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
            modal: { type: 'dialog', width: 1 }
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption'
            })
          ]
        })
      ],
      validation: (rule) => rule.min(1).error('At least one image is required in a gallery.')
    })
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
      layout: 'layout'
    },
    prepare({ title, images = [], layout }) {
      return {
        title: title || 'Image Gallery',
        subtitle: `${images.length} image${images.length === 1 ? '' : 's'} (${layout || 'carousel'})`
      };
    }
  }
});
