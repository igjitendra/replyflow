#!/usr/bin/env node
/**
 * ReplyFlow Thumbnail Maker
 * Generates a brand-consistent 1200x675 WebP from an SVG (offline, via `sharp`).
 * See skills/thumbnail-maker/SKILL.md for the locked design spec.
 *
 * Usage:
 *   node skills/thumbnail-maker/generate-thumbnail.mjs --id my-template-id \
 *     --title "My Title" --channel whatsapp --industry "Real Estate"
 */
import fs from 'node:fs';
import path from 'node:path';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('\n❌  `sharp` is not installed. Run:  npm i -D sharp\n');
  process.exit(1);
}

// ---- parse args ----
const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) {
    const key = a.slice(2);
    const val = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : 'true';
    args[key] = val;
  }
}

const id = args.id || args.slug;
if (!id || !args.title) {
  console.error('Usage: --id <id> --title "<title>" [--channel whatsapp] [--industry "..."] [--kind template|blog] [--out path]');
  process.exit(1);
}

const kind = args.kind || (args.slug ? 'blog' : 'template');
const channel = (args.channel || 'whatsapp').toLowerCase();
const industry = args.industry || 'ReplyFlow';
const title = String(args.title);

const CHANNEL = {
  whatsapp: { color: '#25D366', label: 'WhatsApp' },
  sms: { color: '#2563EB', label: 'SMS' },
  email: { color: '#F59E0B', label: 'Email' },
  instagram: { color: '#E1306C', label: 'Instagram DM' },
  messenger: { color: '#0084FF', label: 'Messenger' },
  review: { color: '#FBBF24', label: 'Google Review' },
  complaint: { color: '#EF4444', label: 'Complaint' },
};
const ch = CHANNEL[channel] || CHANNEL.whatsapp;

// ---- naive word-wrap (max chars per line, max 3 lines) ----
function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars) {
      lines.push(line.trim());
      line = w;
      if (lines.length === maxLines - 1) break;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  const used = lines.join(' ').split(/\s+/).length;
  const rest = words.slice(used).join(' ');
  if (rest) line = rest;
  if (line) lines.push(line.length > maxChars ? line.slice(0, maxChars - 1) + '…' : line);
  return lines.slice(0, maxLines);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const titleLines = wrap(title, 26, 3);
const startY = 300 - (titleLines.length - 1) * 42;
const titleTspans = titleLines
  .map((l, i) => `<tspan x="80" y="${startY + i * 84}">${esc(l)}</tspan>`)
  .join('');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2563EB"/>
      <stop offset="0.55" stop-color="#4F46E5"/>
      <stop offset="1" stop-color="#4338CA"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.8" cy="0.15" r="0.6">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#glow)"/>
  <!-- channel pill -->
  <g>
    <rect x="80" y="96" rx="26" ry="26" width="${120 + ch.label.length * 15}" height="52" fill="${ch.color}"/>
    <circle cx="112" cy="122" r="9" fill="#ffffff"/>
    <text x="136" y="131" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="#ffffff">${esc(ch.label)}</text>
  </g>
  <!-- title -->
  <text font-family="Inter, 'Noto Sans Devanagari', Arial, sans-serif" font-size="72" font-weight="800" fill="#ffffff" letter-spacing="-1">${titleTspans}</text>
  <!-- footer -->
  <line x1="80" y1="560" x2="1120" y2="560" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2"/>
  <text x="80" y="612" font-family="Inter, 'Noto Sans Devanagari', Arial, sans-serif" font-size="30" font-weight="600" fill="#ffffff" fill-opacity="0.85">${esc(industry)}</text>
  <text x="1120" y="612" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="#ffffff">ReplyFlow</text>
</svg>`;

// ---- output path ----
let outPath = args.out;
if (!outPath) {
  const dir = kind === 'blog' ? 'public/images/blog' : 'public/images/templates';
  outPath = path.join(process.cwd(), dir, `${id}.webp`);
}
fs.mkdirSync(path.dirname(outPath), { recursive: true });

await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(outPath);
const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
console.log(`✅ Thumbnail written: ${outPath} (${kb} KB)`);
