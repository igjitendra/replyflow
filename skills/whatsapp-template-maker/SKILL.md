# 💬 Skill: WhatsApp / Message Template Maker

Goal: produce a **new message template** that renders identically to every existing template card & detail page, with zero schema errors.

> Output location: **one Markdown file** at `src/content/templates/{id}.md`.
> The site auto-generates the card, the `/template/{id}` detail page, search index, and industry/channel/purpose listings. You only write the `.md` file — never touch the routes.

---

## 1. Naming (ID = public URL, permanent)

```
{industry}-{purpose}-{tone}-{lang}
```
Example: `real-estate-new-lead-welcome-friendly-hinglish`

- lowercase, ASCII, hyphen-separated, **globally unique**.
- `industry`, `tone`, `language` must be valid enum values (below).
- `purpose` is a free-form kebab-case slug (e.g. `festival-offer`, `payment-reminder`, `site-visit-reminder`).
- The file name **must equal** `{id}.md`.

## 2. Allowed enum values (do NOT invent new ones)

| Field | Allowed values |
| --- | --- |
| `industry` | real-estate, clinic, salon, restaurant, retail, gym, freelancer, agency, education, e-commerce, automobile, financial-services, hospitality, event-management, legal-consulting |
| `channel` | whatsapp, sms, email, instagram, messenger, review, complaint |
| `objective` | lead-generation, follow-up, upsell, retention, support |
| `tone` | friendly, professional, luxury |
| `language` | hi, en, hinglish |
| `buttons[].type` | url, phone, reply |

## 3. Frontmatter schema (source of truth = `src/content/config.ts`)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | ✅ | must match filename & naming rule |
| `title` | string | ✅ | human title, Title Case, no trailing channel name |
| `industry` | enum | ✅ | see table |
| `channel` | enum | ✅ | see table |
| `purpose` | string | ✅ | kebab-case slug |
| `objective` | enum | ✅ | see table |
| `tone` | enum | ✅ | see table |
| `language` | enum | ✅ | must match the body language |
| `whatsapp_approved` | boolean | ✅ | `true` only if it fits Meta template rules |
| `variables` | string[] | ✅ | every `{{var}}` used in body/variations, no braces here (e.g. `- name`) |
| `tags` | string[] | ✅ | 2–5 lowercase keywords |
| `best_time` | string | optional | e.g. `"10:00-12:00"` |
| `buttons` | list | optional | `{ type, text }`; text may include an emoji |
| `variations` | list | optional | other-language versions: `{ title, text, language, tone? }` |
| `thumbnail` | string | optional | `/images/templates/{id}.webp` (see Thumbnail Maker skill) |
| `preview_snippet` | string | optional | ~120 chars, shown on the card; first line of body if omitted |
| `meta_title` | string | optional | ≤ 60 chars, ends with `| ReplyFlow` |
| `meta_description` | string | optional | 140–160 chars, action-oriented |
| `context_section` | object | optional (recommended) | `{ when_to_use, target_audience, customization_tip }` |
| `related` | string[] | optional | 1–4 existing template `id`s |

### Variable rules
- Use double curly braces in the body: `{{name}}`, `{{project}}`, `{{amount}}`, `{{date}}`.
- Every variable in the body/variations **must** be listed in `variables` (and vice-versa).
- Keep variable names lowercase snake_case (`customer_name`, not `CustomerName`).

## 4. Body rules
- Written in the declared `language`; keep it natural, warm, and professional.
- Short paragraphs, WhatsApp-friendly, 1–2 relevant emojis max per message.
- Do NOT add a heading/title inside the body — the detail page renders the title separately.
- If you provide Hindi & English versions, put the **primary** in the body and the others in `variations`.

## 5. Procedure
1. Pick a unique `id` using the naming rule; confirm no file `src/content/templates/{id}.md` exists.
2. Copy `template.example.md` in this folder and fill every required field.
3. Ensure `language` matches body; list all `{{variables}}`.
4. (Optional) Generate a thumbnail → see `skills/thumbnail-maker/SKILL.md`, then set `thumbnail`.
5. Validate: `npm run check`. Fix any Zod/type error before continuing.
6. Preview locally: `npm run dev` → open `/template/{id}`.
7. Publish → follow `skills/publish-update-website/SKILL.md`.

## 6. Definition of done
- [ ] File is `src/content/templates/{id}.md`, filename == `id`.
- [ ] All enums valid; `whatsapp_approved` set intentionally.
- [ ] Body language == `language`; every `{{var}}` is in `variables`.
- [ ] `meta_title` ≤ 60 chars, `meta_description` 140–160 chars.
- [ ] `context_section` filled (helps SEO & the detail page “When to use” block).
- [ ] `npm run check` passes.
