import { calloutSchema } from './callout';
import { certificationSchema } from './certification';
import { codeBlockSchema } from './codeBlock';
import { educationSchema } from './education';
import { githubCardSchema } from './githubCard';
import { imageGallerySchema } from './imageGallery';
import { journalEntrySchema } from './journalEntry';
import { projectSchema } from './project';
import { quoteCalloutSchema } from './quoteCallout';
import { siteSettingsSchema } from './siteSettings';
import { skillGroupSchema } from './skillGroup';
import { youtubeEmbedSchema } from './youtubeEmbed';

export const schemaTypes = [
  projectSchema,
  journalEntrySchema,
  siteSettingsSchema,
  calloutSchema,
  codeBlockSchema,
  githubCardSchema,
  youtubeEmbedSchema,
  quoteCalloutSchema,
  imageGallerySchema,
  certificationSchema,
  educationSchema,
  skillGroupSchema
];

export {
  calloutSchema,
  certificationSchema,
  codeBlockSchema,
  educationSchema,
  githubCardSchema,
  imageGallerySchema,
  journalEntrySchema,
  projectSchema,
  quoteCalloutSchema,
  siteSettingsSchema,
  skillGroupSchema,
  youtubeEmbedSchema
};
