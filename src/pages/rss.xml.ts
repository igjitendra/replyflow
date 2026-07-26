import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://replyflow.procsctools.in';
const NL = String.fromCharCode(10);
const xml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.published_at.valueOf() - a.data.published_at.valueOf()
  );

  const items = posts.map((post) => [
    '<item>',
    `<title>${xml(post.data.title)}</title>`,
    `<link>${SITE_URL}/blog/${post.slug}</link>`,
    `<guid>${SITE_URL}/blog/${post.slug}</guid>`,
    `<description>${xml(post.data.excerpt)}</description>`,
    `<pubDate>${post.data.published_at.toUTCString()}</pubDate>`,
    '</item>',
  ].join(NL)).join(NL);

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0"><channel>',
    '<title>ReplyFlow Blog</title>',
    `<link>${SITE_URL}/blog</link>`,
    '<description>Business messaging, WhatsApp marketing and template guides.</description>',
    '<language>en-IN</language>',
    items,
    '</channel></rss>',
  ].join(NL);

  return new Response(feed, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
