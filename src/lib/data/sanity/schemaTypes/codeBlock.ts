import { defineField, defineType } from 'sanity';
import { CodeBlockIcon } from '@sanity/icons';
import { BlockObjectInput } from '../components/BlockObjectInput';

export const codeBlockSchema = defineType({
  name: 'codeBlock',
  title: 'Code block',
  type: 'object',
  icon: CodeBlockIcon,
  components: { input: BlockObjectInput },
  options: {
    modal: { type: 'dialog', width: 2 }
  },
  fields: [
    defineField({
      name: 'filename',
      title: 'Filename / Path (optional)',
      type: 'string',
      placeholder: 'e.g. src/server/env.ts'
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'TypeScript', value: 'typescript' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'Astro', value: 'astro' },
          { title: 'HTML / CSS', value: 'html' },
          { title: 'Bash / Shell', value: 'bash' },
          { title: 'JSON', value: 'json' },
          { title: 'Python', value: 'python' }
        ]
      },
      initialValue: 'typescript',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'code',
      title: 'Code content',
      type: 'text',
      rows: 8,
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      filename: 'filename',
      language: 'language',
      code: 'code'
    },
    prepare({ filename, language, code }) {
      return {
        title: filename || `${language || 'code'} snippet`,
        subtitle: code ? code.slice(0, 60) : 'Empty code block'
      };
    }
  }
});
