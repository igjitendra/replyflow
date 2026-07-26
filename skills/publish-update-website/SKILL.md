# 🚀 Skill: Publish & Update Website (Templates & Blog Posts)

Goal: get any new/edited **template page** or **blog post** live on `https://replyflow.procsctools.in` safely, with search index rebuilt and nothing broken.

ReplyFlow is a **static Astro site** (content = Markdown collections) deployed via **Cloudflare Pages**, with a **Sveltia git-based CMS** at `/admin`. There is no server database — publishing = committing Markdown to the GitHub repo, which triggers an automatic build & deploy.

---

## A. Where content lives
| Content | File | Renders at |
| --- | --- | --- |
| Message template | `src/content/templates/{id}.md` | `/template/{id}` |
| Blog post | `src/content/blog/{slug}.md` | `/blog/{slug}` |
| Images | `public/images/templates/*.webp`, `public/images/blog/*.webp` | served from `/images/...` |

## B. Two ways to publish

### Option 1 — Non-technical: Sveltia CMS (`/admin`)
Best for editors. Config: `public/admin/config.yml` (backend: GitHub repo `replyflow/replyflow`, branch `main`).
1. Go to `https://replyflow.procsctools.in/admin/` and log in with GitHub.
2. **Message Templates** collection → *New* (or open an existing one). Fill the fields (they map 1:1 to the frontmatter schema).
3. Save → Sveltia commits the `.md` to `main` → Cloudflare Pages auto-builds & deploys.
> Note: the CMS `templates` collection is already configured. If you activated the blog (Blog Post Maker §0), **add a matching `blog` collection block to `public/admin/config.yml`** so editors can manage posts too.

### Option 2 — Developer: Git workflow
```bash
# 1. create/edit the markdown file (use the maker skills)
# 2. validate locally
npm run check          # Astro/Zod schema type-check (MUST pass)
npm run build          # astro build + pagefind search index
npm run preview        # sanity-check the built site

# 3. commit with Conventional Commits (see Rules.md)
git checkout -b feat/template-real-estate-welcome
git add src/content/ public/images/
git commit -m "feat(templates): add real-estate new-lead welcome (hinglish)"
git push origin HEAD
# 4. open a PR → merge to main → Cloudflare Pages auto-deploys
```

## C. Updating an existing page
- **Edit content only** — keep the `id`/`slug` (and therefore the URL) unchanged. Changing it breaks links & SEO.
- If a URL *must* change, add a redirect in `astro.config.mjs` under `redirects` (see the existing example) from old → new path.
- For blog edits, set `updatedDate` so structured data reflects the change.
- Re-run `npm run build` so Pagefind re-indexes.

## D. Pre-publish checklist (both options)
- [ ] Filename == `id`/`slug`; all required frontmatter present & enums valid.
- [ ] `npm run check` passes (no Zod schema errors).
- [ ] `npm run build` succeeds and Pagefind index regenerates (`dist/pagefind/`).
- [ ] New template appears in search, on its industry/channel pages, and `/template/{id}` renders.
- [ ] Thumbnail/cover present and correct size (Thumbnail Maker skill).
- [ ] Internal links & CTAs work; light **and** dark mode look right on mobile.
- [ ] Commit message follows Conventional Commits; no secrets committed.

## E. Rollback
Revert the offending commit on `main` (or via Pages “Rollback to this deployment”) — the previous build is restored automatically.

## F. Never do
- ❌ Edit generated routes per-post (`src/pages/template/[id].astro`, `src/pages/blog/[slug].astro`) to add content — only edit Markdown.
- ❌ Change `id`/`slug` of a live page without a redirect.
- ❌ Commit API keys or `.env`; AI keys stay client-side only (see `Rules.md`).
- ❌ Add new dependencies just to publish content.
