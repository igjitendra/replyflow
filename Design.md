# Design.md

> Design system — colors, typography, spacing, components. Proposed starting point; Phase 0 mein finalize karo.

## 1. Brand Personality
Modern, trustworthy, fast, friendly. Ek professional tool jo simple lage — clutter-free, content-first. Emoji-friendly (business context), lekin clean.

## 2. Color Palette (Proposed)
| Token | Hex | Use |
| --- | --- | --- |
| Primary | #2563EB | Buttons, links, brand |
| Primary Dark | #1E40AF | Hover, active |
| Accent | #10B981 | Copy success, positive |
| Warning | #F59E0B | Reminders, alerts |
| Danger | #EF4444 | Errors, complaints |
| Background | #FFFFFF | Page bg (light) |
| Surface | #F9FAFB | Cards, sections |
| Border | #E5E7EB | Dividers, outlines |
| Text Primary | #111827 | Headings, body |
| Text Secondary | #6B7280 | Meta, captions |

**Dark mode:** bg #0F172A, surface #1E293B, text #F1F5F9.

## 3. Typography
| Role | Font | Size / Weight |
| --- | --- | --- |
| Display / H1 | Inter / Satoshi | 36-48px, 700 |
| H2 | Inter | 28-32px, 600 |
| H3 | Inter | 20-24px, 600 |
| Body | Inter | 16px, 400 |
| Caption / Meta | Inter | 13-14px, 400 |
| Code / Message | JetBrains Mono / mono | 14px, 400 |

- Devanagari support ke liye: **Noto Sans Devanagari** (Hindi content ke liye)
- Line height: body 1.6, headings 1.2

## 4. Spacing Scale (Tailwind-based, 4px base)
```text
0.5 = 2px    3 = 12px    8  = 32px
1   = 4px    4 = 16px    12 = 48px
2   = 8px    6 = 24px    16 = 64px
```
Consistent rhythm: sections `py-16`, cards `p-6`, gaps `gap-4`.

## 5. Layout
- Max content width: `1200px` (`max-w-6xl`)
- Grid: 12-col responsive; industry grid 2/3/4 cols (mobile/tablet/desktop)
- Border radius: `rounded-xl` (12px) cards, `rounded-lg` buttons
- Shadows: subtle — `shadow-sm` default, `shadow-md` on hover

## 6. Core Components
| Component | Description |
| --- | --- |
| `SearchBar` | Large, central, autofocus on homepage |
| `TemplateCard` | Title, channel badge, tone tag, preview snippet |
| `CopyButton` | One-click copy + success toast |
| `ChannelBadge` | Colored pill per channel |
| `ToneTag` | Small tag (friendly/professional/luxury) |
| `ChatPreview` | WhatsApp-style bubble preview |
| `IndustryCard` | Icon + name + template count |
| `FilterBar` | Channel / tone / language filters |

## 7. Iconography & Imagery
- Icons: Lucide (consistent, open-source)
- Industry icons: emoji ya custom line icons
- OG images: auto-generated per template (title + branding)

## 8. Motion
- Subtle only: `transition-colors`, `hover:scale-[1.02]` cards
- Copy success: quick toast fade
- No heavy animations (performance-first)

## 9. Accessibility
- WCAG AA contrast
- Keyboard navigable
- Focus states visible
- Alt text on all images
- Semantic HTML
