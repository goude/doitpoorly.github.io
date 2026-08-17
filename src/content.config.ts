import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const builds = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/builds" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      tags: z.array(z.string()).default([]),
      cover: image(),
      images: z.array(image()).default([]),
      draft: z.boolean().default(false),
    }),
});

const ideas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/ideas" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      cover: image(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { builds, ideas };
