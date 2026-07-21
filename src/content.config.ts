import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Project case studies live in src/content/projects/*.mdx
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // one-line summary used on cards and meta description
    summary: z.string(),
    // primary domain label shown as the eyebrow, e.g. "Computer Vision"
    domain: z.string(),
    // longer-form kind used for filtering, e.g. ["ML", "Systems"]
    families: z.array(z.string()).default([]),
    // tech stack chips
    tags: z.array(z.string()).default([]),
    role: z.string().optional(),
    timeframe: z.string().optional(),
    // context line, e.g. "3rd place · Pekan RISTEK DS Competition 2025"
    context: z.string().optional(),
    // show on the home "Selected work" section
    featured: z.boolean().default(false),
    // sort key (lower = earlier)
    order: z.number().default(99),
    // the case-study "results readout"
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
    // evidence links: Code / Demo / Report / Kaggle / Dataset
    links: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .default([]),
    draft: z.boolean().default(false),
    updated: z.string().optional(),
  }),
});

export const collections = { projects };
