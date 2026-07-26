import { defineCollection, z } from 'astro:content';

const industriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(), emoji: z.string().default('📁'),
    description: z.string().optional(), featured: z.boolean().default(false), order: z.number().default(99),
  }),
});

const templateCategoriesCollection = defineCollection({
  type: 'content',
  schema: z.object({ name: z.string(), emoji: z.string().default('📂'), description: z.string().optional(), order: z.number().default(99) }),
});

const blogCategoriesCollection = defineCollection({
  type: 'content',
  schema: z.object({ name: z.string(), description: z.string().optional(), order: z.number().default(99) }),
});

const templatesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(), title: z.string(), industry: z.string(),
    category: z.string().optional(), channel: z.string(), purpose: z.string(), objective: z.string(),
    tone: z.string(), language: z.string(),
    whatsapp_approved: z.boolean().default(false), draft: z.boolean().default(false),
    variables: z.array(z.string()).default([]), tags: z.array(z.string()).default([]),
    buttons: z.array(z.object({ type: z.enum(['url', 'phone', 'reply']), text: z.string() })).optional(),
    variations: z.array(z.object({ title: z.string(), text: z.string(), tone: z.string().optional(), language: z.string().optional() })).optional(),
    thumbnail: z.string().optional(), meta_title: z.string().optional(), meta_description: z.string().optional(), preview_snippet: z.string().optional(),
    related: z.array(z.string()).optional(), published_at: z.coerce.date().optional(), updated_at: z.coerce.date().optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), excerpt: z.string(), category: z.string(),
    author: z.string().default('ReplyFlow Editorial'), cover: z.string().optional(), tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false), featured: z.boolean().default(false), published_at: z.coerce.date(), updated_at: z.coerce.date().optional(),
    meta_title: z.string().optional(), meta_description: z.string().optional(),
  }),
});

export const collections = {
  templates: templatesCollection,
  industries: industriesCollection,
  'template-categories': templateCategoriesCollection,
  blog: blogCollection,
  'blog-categories': blogCategoriesCollection,
};
