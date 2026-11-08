import { defineField, defineType } from 'sanity';
import { BlockquoteIcon } from '@sanity/icons';

export const quoteCalloutSchema = defineType({
  name: 'quoteCallout',
  title: 'Quote / Takeaway',
  type: 'object',
  icon: BlockquoteIcon,
  options: {
    modal: { type: 'dialog', width: 1 }
  },
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote / Key Principle',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author / Speaker',
      type: 'string',
      description: 'E.g., Faizan Gondal, Rob Pike, Linus Torvalds'
    }),
    defineField({
      name: 'roleOrSource',
      title: 'Role / Source Context',
      type: 'string',
      description: 'E.g., Creator of Go, Architecture Principle, Personal Notebook'
    })
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author'
    },
    prepare({ quote, author }) {
      return {
        title: quote ? `"${quote.slice(0, 50)}${quote.length > 50 ? '...' : ''}"` : 'Quote Block',
        subtitle: author ? `— ${author}` : 'No author specified'
      };
    }
  }
});
