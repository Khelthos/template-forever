// Markdown content schemas. Invalid frontmatter stops the build with a
// message naming the file and the field.

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { config } from "./lib/site-config.js";

const categoryIds = config.guides.categories.map((c) => c.id) as [string, ...string[]];

/** Path in public/ ("/images/...") or https URL. */
const imagePath = z
  .string()
  .refine((v) => /^\/(?!\/)\S+$/.test(v) || /^https:\/\/\S+$/.test(v), {
    message: 'must start with "/" (a file in public/) or with https://',
  });

const tags = z
  .array(z.string().regex(/^[a-z0-9-]+$/, "tags must be lowercase, without spaces (use hyphens)"))
  .default([]);

const base = {
  title: z.string().min(1, "the title is required"),
  description: z.string().min(1, "the description is required").max(220, "220 characters max"),
  pubDate: z.coerce.date({ message: "invalid date, use the YYYY-MM-DD format" }),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default(""),
  cover: imagePath.optional(),
  coverAlt: z.string().default(""),
  draft: z.boolean().default(false),
  // true = shows the "Demo content" badge. Remove it from your own articles.
  example: z.boolean().default(false),
  tags,
};

const news = defineCollection({
  loader: glob({ base: "./src/content/news", pattern: "**/*.md" }),
  schema: z.object({
    ...base,
    category: z.string().default(""),
  }),
});

const guides = defineCollection({
  loader: glob({ base: "./src/content/guides", pattern: "**/*.md" }),
  schema: z.object({
    ...base,
    type: z.enum(categoryIds, {
      message: `invalid type. Allowed values (guides.categories in site.config.mjs): ${categoryIds.join(", ")}`,
    }),
    difficulty: z.enum(["easy", "normal", "hard", "heroic"]).optional(),
    featured: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
  }),
});

export const collections = { news, guides, pages };
