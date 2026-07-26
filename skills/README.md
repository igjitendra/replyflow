# ReplyFlow Skills

Reusable “playbooks” that guarantee **consistent output design & schema** whenever anyone (a human or an AI assistant) generates content for ReplyFlow.

Each skill is self-contained: it embeds the exact schema, design tokens, file locations, naming rules, and step-by-step instructions. Follow the matching `SKILL.md` **verbatim** — do not invent new fields, folders, or styles.

| Skill | Use it when you want to… | Folder |
| --- | --- | --- |
| 💬 **WhatsApp Template Maker** | Add a new message template (WhatsApp / SMS / Email / DM / Review / Complaint) | `skills/whatsapp-template-maker/` |
| ✍️ **Blog Post Maker** | Write & publish a blog article | `skills/blog-post-maker/` |
| 🖼️ **Thumbnail Maker** | Generate a brand-consistent preview image for a template or blog post | `skills/thumbnail-maker/` |
| 🚀 **Publish & Update Website** | Add / edit any template page or blog post and push it live | `skills/publish-update-website/` |

## Golden rules (apply to every skill)

1. **Never change the schema or architecture** without explicit permission (see `Rules.md`).
2. **Match the existing design system** — tokens live in `tailwind.config.mjs` + `Design.md` and are summarised in every SKILL.md.
3. **Content-collection files only** — templates go in `src/content/templates/`, blog posts in `src/content/blog/`. Never hand-edit generated routes.
4. **IDs / slugs are ASCII, lowercase, hyphenated** — unique and permanent (they are the public URL).
5. **Validate before publishing:** `npm run check` (Astro type-check) then `npm run build`.
6. **Indian, multi-language context** — Hindi / English / Hinglish; keep it culturally appropriate and grammatically clean.

## Shared design tokens (quick reference)

| Token | Light | Dark | Tailwind class |
| --- | --- | --- | --- |
| Primary | `#2563EB` | `#1E40AF` | `text-primary` / `bg-primary` |
| Accent (success) | `#10B981` | – | `text-accent` |
| Surface | `#F9FAFB` | `#1E293B` | `bg-surface` |
| Border | `#E5E7EB` | `#334155` | `border-border` |
| Text | `#111827` | `#F1F5F9` | `text-text` |
| Text muted | `#6B7280` | `#94A3B8` | `text-text-muted` |

- **Fonts:** body `font-sans` (Inter + Noto Sans Devanagari) · headings `font-outfit` · accent display `font-serif` (Playfair) · code `font-mono` (JetBrains Mono).
- **Cards:** `rounded-3xl border border-border/80 dark:border-slate-700/70 bg-white dark:bg-slate-800/80 shadow-sm hover:-translate-y-1`.
- **Banners / hero panels:** `rounded-[2rem]` + subtle blue→indigo gradient accent.
- **Dark mode:** class-based (`.dark` on `<html>`), toggled via `localStorage 'rf_theme'`.
- **Spacing:** 4px base scale; page sections use `space-y-8` (content) / `space-y-24` (marketing).
