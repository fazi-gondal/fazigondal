import { defineArrayMember, defineField, defineType } from 'sanity';
import { carouselImageMember } from './carouselImage';

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fieldsets: [{ name: 'seo', title: 'Search & social', options: { collapsible: true, collapsed: true } }],
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'status', type: 'string', options: { list: ['live', 'built'], layout: 'radio' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'year', type: 'number', validation: (Rule) => Rule.required().integer().min(2000).max(2100) }),
    defineField({ name: 'order', type: 'number', initialValue: 0, validation: (Rule) => Rule.required().integer().min(0) }),
    defineField({ name: 'oneLiner', title: 'One-line summary', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'screenshots',
      title: 'Screenshot carousel',
      description: 'Images shown in the project carousel, in this order. Images dropped into the Markdown body stay inline in the case study.',
      type: 'array',
      of: [carouselImageMember]
    }),
    defineField({ name: 'techStack', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, validation: (Rule) => Rule.required().min(1) }),
    defineField({
      name: 'body',
      title: 'Project body',
      description: 'Rich text case study with custom components (Callouts, Code blocks, and Images).',
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
    defineField({ name: 'liveUrl', type: 'url' }),
    defineField({ name: 'githubUrl', type: 'url' }),
    defineField({ name: 'seoTitle', title: 'SEO title override', type: 'string', fieldset: 'seo', validation: (Rule) => Rule.max(70) }),
    defineField({ name: 'seoDescription', title: 'Meta description override', type: 'text', rows: 3, fieldset: 'seo', validation: (Rule) => Rule.max(180) }),
    defineField({
      name: 'seoImage',
      title: 'Social preview image',
      type: 'image',
      fieldset: 'seo',
      description: 'Recommended: 1200 × 630 px. Falls back to the first screenshot, then the site default.',
      fields: [defineField({ name: 'alt', title: 'Alternative text', type: 'string' })]
    })
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'status' } }
});
