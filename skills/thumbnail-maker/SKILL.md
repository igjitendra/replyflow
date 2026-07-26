# 🖼️ Skill: Thumbnail Maker

Goal: generate a **brand-consistent 1200×675 (16:9) WebP** preview image for any template or blog post, so every card looks the same.

> Output location: `public/images/templates/{id}.webp` (templates) or `public/images/blog/{slug}.webp` (blog).
> Then set `thumbnail: "/images/templates/{id}.webp"` (or `cover:` for blog).

---

## Design spec (locked — do not deviate)
- **Size:** 1200×675 px, `.webp`, quality ~82, target < 120 KB.
- **Background:** brand gradient (blue `#2563EB` → indigo `#4F46E5`) with a soft radial glow, matching the site hero.
- **Channel pill:** top-left, channel-colored (WhatsApp `#25D366`, SMS `#2563EB`, Email `#F59E0B`, Instagram `#E1306C`, Messenger `#0084FF`, Review `#FBBF24`, Complaint `#EF4444`).
- **Title:** large `font-outfit`-style bold, white, max 3 lines, auto-wrapped.
- **Footer:** industry label (left) + `ReplyFlow` wordmark (right), semi-transparent white.
- **Fonts:** Inter / Arial for Latin, Noto Sans Devanagari for Hindi (both handled by the script via fontconfig). No color-emoji in the raster (librsvg limitation) — use shapes/text only.

## Generator (offline, deterministic)
Use the bundled script `generate-thumbnail.mjs`. It builds an SVG from the spec and rasterizes it with `sharp` — no network, no browser.

```bash
# from repo root
node skills/thumbnail-maker/generate-thumbnail.mjs \
  --id real-estate-new-lead-welcome-friendly-hinglish \
  --title "New Lead Welcome & Property Brochure" \
  --channel whatsapp \
  --industry "Real Estate"

# blog cover (writes to public/images/blog/)
node skills/thumbnail-maker/generate-thumbnail.mjs \
  --slug whatsapp-marketing-tips-2026 \
  --title "12 WhatsApp Marketing Tips for 2026" \
  --channel whatsapp \
  --industry "Guide" --kind blog
```

### Flags
| Flag | Required | Meaning |
| --- | --- | --- |
| `--id` / `--slug` | ✅ (one) | output filename (no extension) |
| `--title` | ✅ | text drawn on the image |
| `--channel` | optional | channel pill color/label (default `whatsapp`) |
| `--industry` | optional | footer-left label (default `ReplyFlow`) |
| `--kind` | optional | `template` (default) → `public/images/templates/`, or `blog` → `public/images/blog/` |
| `--out` | optional | explicit output path (overrides `--kind`) |

## Requirement
`sharp` must be installed (`npm i -D sharp`). It is already a common Astro dependency; if missing, install it once. The script fails loudly with a clear message if `sharp` is not found.

## Procedure
1. Run the script with the template `id` (or blog `slug`) and its exact `title`.
2. Confirm the file exists at the expected path and looks correct.
3. Set `thumbnail` (template) or `cover` (blog) in frontmatter to the public path.
4. Rebuild / publish per `skills/publish-update-website/SKILL.md`.

## Definition of done
- [ ] `public/images/{templates|blog}/{id}.webp` exists, 1200×675, < 120 KB.
- [ ] Frontmatter `thumbnail`/`cover` points to it.
- [ ] Channel color + wordmark match the spec.
