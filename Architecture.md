# Architecture.md

> Technical architecture — folder structure, tech stack, data flow aur scaling. Yeh document coding se pehle lock hona zaroori hai.

## 1. Tech Stack
| Layer | Choice | Reason |
| --- | --- | --- |
| Framework | Astro | Content-heavy, SSG, zero-JS by default, fast |
| Styling | Tailwind CSS | Utility-first, consistent design tokens |
| Search | Pagefind | Static, client-side, scales to 10k+ pages |
| Content | Markdown (.md) + frontmatter / JSON | Git-friendly, structured |
| Deployment | GitHub + Cloudflare Pages | Free, global CDN, auto-deploy |
| Analytics | Google Analytics + Cloudflare Analytics | Traffic + privacy-friendly metrics |

## 2. Core Principle
**Static-first.** Har template build time par ek static HTML page ban jaye. Isse hosting sasti, speed max, aur SEO strong. AI features client-side / user's own API key par.

## 3. Folder Structure
```text
replyflow/
 ├── src/
 │    ├── pages/           # Routes (index, industry, template, search)
 │    ├── layouts/         # Base, Industry, Template layouts
 │    ├── components/      # SearchBar, TemplateCard, CopyButton, ChatPreview
 │    ├── content/         # Content collections (typed)
 │    │     ├── industries/
 │    │     │     ├── real-estate/
 │    │     │     ├── clinic/
 │    │     │     ├── salon/
 │    │     │     └── restaurant/
 │    │     ├── festivals/
 │    │     └── personal/
 │    ├── data/            # Static config: industries.json, channels.json, tones.json
 │    └── styles/          # Global CSS, Tailwind config
 ├── public/               # Static assets, favicon, OG images
 ├── astro.config.mjs
 └── package.json
```

## 4. Content Schema (Frontmatter)
Har template ek .md file, frontmatter ke saath. Astro Content Collections se type-safe validation.
```yaml
id: real-estate-new-lead-friendly-hi
title: New Lead Welcome
industry: real-estate
channel: whatsapp        # whatsapp | sms | email | instagram | messenger | review | complaint
purpose: follow-up
objective: lead-generation
tone: friendly           # friendly | professional | luxury
language: hi             # hi | en | hinglish
best_time: "10:00-12:00"
whatsapp_approved: true
variables: [name, project, price]
tags: [welcome, new-lead]
related: [real-estate-site-visit, real-estate-price-update]
---
Namaste {{name}}, {{project}} mein aapki ruchi ke liye dhanyavaad...
```

## 5. Data Flow
```text
[.md content files]
       |  (build time)
       v
Astro Content Collections (schema validation)
       |
       v
Static HTML pages  -->  Pagefind index (search)
       |
       v
Cloudflare Pages (CDN)  -->  User browser
       |
       v
Client-side JS: Copy, Search, AI Rewrite (user's API key)
```

## 6. Routing / URL Strategy
| Route | Example | Purpose |
| --- | --- | --- |
| `/` | Homepage | Hero + search + industry grid |
| `/industry/[slug]` | `/industry/real-estate` | Industry landing |
| `/industry/[slug]/[purpose]` | `/industry/clinic/appointment-reminder` | Purpose list |
| `/template/[id]` | `/template/real-estate-new-lead-friendly-hi` | Single template |
| `/channel/[slug]` | `/channel/whatsapp` | Channel-based browse |
| `/festivals/[slug]` | `/festivals/diwali` | Festival campaigns |
| `/search` | Search results | Pagefind UI |

## 7. Scaling to 10,000+ Templates
- Content Collections se build-time type safety
- Consistent `id` naming: `{industry}-{purpose}-{tone}-{lang}`
- Pagefind index chunked + lazy-loaded
- Pagination / virtualized lists on industry pages
- Incremental builds where possible
- Flat, predictable folder + slug convention (restructure avoid)

## 8. Performance Targets
- Lighthouse 95+ (mobile)
- First load JS < 50KB
- LCP < 1.5s on 4G
- Fully static, edge-cached
