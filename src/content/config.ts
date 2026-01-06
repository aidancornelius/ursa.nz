import { defineCollection, z } from 'astro:content';

const films = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    videoUrl: z.string(),
    videoType: z.enum(['vimeo', 'bunny']),
    showTitle: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    showInNav: z.boolean().default(true),
    navOrder: z.number().default(100),
    showTitle: z.boolean().default(true),
  }),
});

const site = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    defaultEmptyRoute: z.string().optional(),
    navLinks: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
          newTab: z.boolean().optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = { films, pages, site };
