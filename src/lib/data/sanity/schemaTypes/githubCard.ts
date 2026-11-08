import { defineField, defineType } from 'sanity';
import { TerminalIcon } from '@sanity/icons';
import { BlockObjectInput } from '../components/BlockObjectInput';

export const githubCardSchema = defineType({
  name: 'githubCard',
  title: 'GitHub Repository Card',
  type: 'object',
  icon: TerminalIcon,
  components: { input: BlockObjectInput },
  options: {
    modal: { type: 'dialog', width: 1 }
  },
  fields: [
    defineField({
      name: 'repo',
      title: 'Repository Name',
      type: 'string',
      description: 'Format: "owner/repo" (e.g., fazi-gondal/vidsaver)',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Brief summary of the repository'
    }),
    defineField({
      name: 'language',
      title: 'Primary Language',
      type: 'string',
      description: 'E.g., Python, TypeScript, Dart, Go, Rust'
    }),
    defineField({
      name: 'stars',
      title: 'Stars / Stats',
      type: 'string',
      description: 'Optional display metric, e.g., "120+" or "Featured"'
    }),
    defineField({
      name: 'url',
      title: 'Custom URL Override',
      type: 'url',
      description: 'Optional override (defaults to https://github.com/{repo})'
    })
  ],
  preview: {
    select: {
      repo: 'repo',
      language: 'language',
      stars: 'stars'
    },
    prepare({ repo, language, stars }) {
      const details = [language, stars ? `★ ${stars}` : null].filter(Boolean).join(' · ');
      return {
        title: repo || 'GitHub Repository',
        subtitle: details || 'GitHub Repo Card'
      };
    }
  }
});
