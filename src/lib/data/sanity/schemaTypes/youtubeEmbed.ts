import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons';
import { BlockObjectInput } from '../components/BlockObjectInput';

export const youtubeEmbedSchema = defineType({
  name: 'youtubeEmbed',
  title: 'YouTube Video',
  type: 'object',
  icon: PlayIcon,
  components: { input: BlockObjectInput },
  options: {
    modal: { type: 'dialog', width: 1 }
  },
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description: 'Enter a YouTube video URL (e.g., https://www.youtube.com/watch?v=... or https://youtu.be/...)',
      validation: (rule) =>
        rule.required().custom((url) => {
          if (!url) return true;
          const isYouTube = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)/i.test(url);
          return isYouTube ? true : 'Please enter a valid YouTube video URL';
        })
    }),
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'Optional label or accessibility title for the video'
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed beneath the video'
    })
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url'
    },
    prepare({ title, url }) {
      return {
        title: title || 'YouTube Video',
        subtitle: url || 'No URL specified'
      };
    }
  }
});
