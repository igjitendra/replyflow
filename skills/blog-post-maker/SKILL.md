# ✍️ Skill: Blog Post Maker

Goal: write & publish a blog article that renders with the **same header, cards, prose styling, dark mode, and SEO** as the rest of ReplyFlow.

> Output location: **one Markdown file** at `src/content/blog/{slug}.md`.
> The `/blog` list page and `/blog/{slug}` article page are generated automatically once the blog is activated (one-time setup below).

---

## 0. One-time setup (only if `/blog` does not exist yet)
The project ships without a blog collection. Activate it **once** by copying the ready-made files in `skills/blog-post-maker/setup/`:

1. Merge `setup/content-config.blog.snippet.ts` into `src/content/config.ts` (add the `blog` collection + include it in the exported `collections`).
2. Copy `setup/blog-index.astro` → `src/pages/blog/index.astro`.
3. Copy `setup/blog-[slug].astro` → `src/pages/blog/[slug].astro`.
4. Add a **Blog** link to `src/components/Header.astro` nav (match the existing link markup).
5. `mkdir -p src/content/blog public/images/blog`.
6. `npm run check` → must pass.

After this, adding a post = writing one `.md` file. Never edit the routes per-post.

## 1. Slug (public URL, permanent)
- lowercase, ASCII, hyphenated; file name == `{slug}.md`.
- Keep it keyword-rich (SEO): `whatsapp-marketing-tips-for-small-business`.

## 2. Frontmatter schema (source of truth = `setup/content-config.blog.snippet.ts`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | ✅ | ≤ 65 chars, compelling |
| `description` | string | ✅ | 140–160 chars; used as summary + meta |
| `publishDate` | date | ✅ | `YYYY-MM-DD` |
| `updatedDate` | date | optional | set when you materially edit |
| `author` | string | optional | defaults to `ReplyFlow Team` |
| `category` | string | ✅ | one of: `Marketing`, `WhatsApp`, `SEO`, `Automation`, `Guides`, `Case Study` |
| `tags` | string[] | optional | 2–6 lowercase keywords |
| `cover` | string | optional | `/images/blog/{slug}.webp` (see Thumbnail Maker skill) |
| `coverAlt` | string | optional | describe the cover for a11y |
| `meta_title` | string | optional | ≤ 60 chars, ends `| ReplyFlow` |
| `meta_description` | string | optional | overrides `description` for `<meta>` |
| `draft` | boolean | optional | `true` hides it from the site & lists |

## 3. Body / content rules (keeps design consistent)
- The article body is standard Markdown; the `/blog/{slug}` route wraps it in `.rf-prose` which styles headings, lists, links, quotes, code, tables and images with brand tokens. **Do not add inline styles or raw HTML wrappers** — just write clean Markdown.
- Start the body with a short intro paragraph (no H1 — the title renders from frontmatter).
- Use `##` for main sections, `###` for sub-sections.
- Use fenced code blocks with a language for any snippet.
- Add a clear CTA near the end linking to `/search` or a relevant `/industry/...` page.
- Language: English, Hindi, or Hinglish — keep it consistent within a post; Devanagari is fully supported by the font stack.

## 4. Procedure
1. Ensure the blog is activated (section 0).
2. Copy `example-post.md` → `src/content/blog/{slug}.md`; fill frontmatter + write the article.
3. (Optional) Generate a cover: `node skills/thumbnail-maker/generate-thumbnail.mjs --slug {slug} --title "..." --industry "Guide" --kind blog`, then set `cover`.
4. Keep `draft: true` while writing; set `false` to go live.
5. Validate `npm run check`, preview `npm run dev` → `/blog/{slug}`.
6. Publish → `skills/publish-update-website/SKILL.md`.

## 5. Definition of done
- [ ] `src/content/blog/{slug}.md`, filename == slug.
- [ ] All required frontmatter present; `category` from the allowed list.
- [ ] `description` 140–160 chars; body has no H1 and no inline styles.
- [ ] `draft: false` when ready; cover generated & linked (recommended).
- [ ] `npm run check` passes and `/blog/{slug}` looks on-brand in light & dark mode.
