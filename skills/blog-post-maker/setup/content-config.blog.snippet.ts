// ============================================================================
// BLOG COLLECTION — merge this into src/content/config.ts
// ============================================================================
// 1) Add the `blogCollection` definition below (alongside `templatesCollection`).
// 2) Add `blog: blogCollection` to the exported `collections` object.
// ----------------------------------------------------------------------------

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('ReplyFlow Team'),
    category: z.enum([
      'Marketing',
      'WhatsApp',
      'SEO',
      'Automation',
      'Guides',
      'Case Study',
    ]),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Final export should look like:
//
// export const collections = {
//   templates: templatesCollection,
//   blog: blogCollection,
// };
