import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    category: z.enum(['Building', 'Learning', 'AI & technology', 'Life & thoughts']),
    tags: z.array(z.string()).default([]),
    artwork: z.enum(['notebook', 'code', 'garden', 'window']).default('notebook'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };