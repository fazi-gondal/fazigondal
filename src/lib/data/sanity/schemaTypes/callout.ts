import { defineField, defineType } from 'sanity';
import { InfoOutlineIcon } from '@sanity/icons';
import { BlockObjectInput } from '../components/BlockObjectInput';

export const calloutSchema = defineType({
  name: 'callout',
  title: 'Callout banner',
  type: 'object',
  icon: InfoOutlineIcon,
  components: { input: BlockObjectInput },
  options: {
    modal: { type: 'dialog', width: 1 }
  },
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          { title: 'Note (Blue)', value: 'note' },
          { title: 'Tip (Green)', value: 'tip' },
          { title: 'Warning (Amber)', value: 'warning' },
          { title: 'Caution (Red)', value: 'caution' }
        ],
        layout: 'radio'
      },
      initialValue: 'note',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Title (optional)',
      type: 'string'
    }),
    defineField({
      name: 'text',
      title: 'Message',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      tone: 'tone',
      title: 'title',
      text: 'text'
    },
    prepare({ tone, title, text }) {
      const label = (tone || 'note').toUpperCase();
      return {
        title: title || `[${label}] Callout`,
        subtitle: text || 'No message provided'
      };
    }
  }
});
