import { defineArrayMember, defineField, defineType } from 'sanity';
import { ReadTimeInput } from '../components/ReadTimeInput';
import { carouselImageMember } from './carouselImage';

export const journalEntrySchema = defineType({
  name: 'journalEntry',
  title: 'Journal entry',
  type: 'document',
  fieldsets: [{ name: 'seo', title: 'Search & social', options: { collapsible: true, collapsed: true } }],
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'readTime',
      title: 'Read time',
      type: 'number',
      initialValue: 1,
      components: { input: ReadTimeInput },
      validation: (Rule) => Rule.required().integer().min(1)
    }),
    defineField({ name: 'excerpt', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({
      name: 'figures',
      title: 'Figure carousel',
      description: 'Images shown in the journal carousel, in this order. Images dropped into the Markdown body stay inline in the article.',
      type: 'array',
      of: [carouselImageMember]
    }),
    defineField({
      name: 'body',
      title: 'Journal body',
      description: 'Rich text article with custom components (Callouts, Code blocks, and Images).',
      type: 'array',
      options: {
        modal: {
          type: 'dialog',
          width: 2
        }
      },
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2 (Major Section)', value: 'h2' },
            { title: 'H3 (Subsection)', value: 'h3' },
            { title: 'H4 (Subheader)', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Strike', value: 'strike-through' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel']
                      })
                  }
                ]
              }
            ]
          }
        },
        defineArrayMember({
          type: 'callout',
          options: { modal: { type: 'dialog', width: 1 } }
        }),
        defineArrayMember({
          type: 'codeBlock',
          options: { modal: { type: 'dialog', width: 2 } }
        }),
        defineArrayMember({
          type: 'githubCard',
          options: { modal: { type: 'dialog', width: 1 } }
        }),
        defineArrayMember({
          type: 'youtubeEmbed',
          options: { modal: { type: 'dialog', width: 1 } }
        }),
        defineArrayMember({
          type: 'quoteCallout',
          options: { modal: { type: 'dialog', width: 1 } }
        }),
        defineArrayMember({
          type: 'imageGallery',
          options: { modal: { type: 'dialog', width: 2 } }
        }),
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
            modal: { type: 'dialog', width: 1 }
          },
          fields: [
            { name: 'alt', title: 'Alternative text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' }
          ]
        })
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'schemaType',
      title: 'Structured data type',
      type: 'string',
      initialValue: 'Article',
      options: { list: [{ title: 'Article', value: 'Article' }], layout: 'radio' },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'seoTitle', title: 'SEO title override', type: 'string', fieldset: 'seo', validation: (Rule) => Rule.max(70) }),
    defineField({ name: 'seoDescription', title: 'Meta description override', type: 'text', rows: 3, fieldset: 'seo', validation: (Rule) => Rule.max(180) }),
    defineField({
      name: 'seoImage',
      title: 'Social preview image',
      type: 'image',
      fieldset: 'seo',
      description: 'Recommended: 1200 × 630 px. Falls back to the first carousel figure, then the site default.',
      fields: [defineField({ name: 'alt', title: 'Alternative text', type: 'string' })]
    })
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'date' } }
});
