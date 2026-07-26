import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://replyflow.procsctools.in';
const NEW_LINE = String.fromCharCode(10);

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const templates = await getCollection(
    'templates',
    ({ data }) => !data.draft
  );
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const industries = await getCollection('industries');
  const blogCategories = await getCollection('blog-categories');

  const staticPaths = [
    '',
    'search',
    'ai',
    'blog',
    'about',
    'privacy',
    'terms',
    'disclaimer',
  ];

  const urls = [
    ...staticPaths.map((path) => `${SITE_URL}/${path}`),
    ...industries.map(
      (industry) => `${SITE_URL}/industry/${industry.slug}`
    ),
    ...templates.map(
      (template) =>
        `${SITE_URL}/template/${template.slug || template.data.id}`
    ),
    ...posts.map((post) => `${SITE_URL}/blog/${post.slug}`),
    ...blogCategories.map(
      (category) => `${SITE_URL}/blog/category/${category.slug}`
    ),
  ];

  const urlEntries = [...new Set(urls)]
    .map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`)
    .join(NEW_LINE);

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    '</urlset>',
  ].join(NEW_LINE);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
