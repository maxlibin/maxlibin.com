import { defineCollection } from "astro:content"
import { glob, file } from "astro/loaders"
import { z } from "astro/zod"

const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      modified: z.coerce.date(),
      excerpt: z.string(),
      cover: image().optional(),
    }),
})

const projects = defineCollection({
  loader: file("./content/projects.json"),
  schema: ({ image }) =>
    z.object({
      order: z.number().int().positive(),
      title: z.string(),
      platform: z.enum(["Web", "iOS"]),
      description: z.string(),
      category: z.string(),
      url: z.url(),
      cover: image(),
    }),
})

const challenges = defineCollection({
  loader: file("./content/challenges.json"),
  schema: ({ image }) =>
    z.object({
      number: z.number().int().positive(),
      title: z.string(),
      platform: z.string(),
      description: z.string(),
      status: z.string(),
      url: z.url(),
      cover: image().optional(),
      revenue: z.string(),
      blogUrl: z.url().optional(),
      excerpt: z.string(),
      technologies: z.array(z.string()),
    }),
})

export const collections = { blog, projects, challenges }
