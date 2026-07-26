# Rules.md

> AI coding assistant ke liye rules — kya kare, kya na kare. Har AI session mein yeh file context mein rakho.

## 1. Golden Rules
- [DO] **Pehle plan, phir code.** Bina architecture confirm kiye feature coding shuru mat karo.
- [DO] Har change ke baad `Memory.md` update karo.
- [DO] Existing folder structure aur naming convention follow karo (dekho `Architecture.md`).
- [DON'T] Architecture ya schema bina permission ke mat badlo.
- [DON'T] Naye dependencies bina justify kiye add mat karo.

## 2. AI Ko Kya Karna Hai (DO)
- Astro + Tailwind conventions follow karo
- Content schema (frontmatter) strictly validate karo
- Reusable components banao (DRY principle)
- Mobile-first, accessible (a11y) code likho
- SEO best practices (meta tags, semantic HTML, OG images)
- Har template ka `id` convention follow kare: `{industry}-{purpose}-{tone}-{lang}`
- Comments sirf jab zaroori ho — clean, self-explanatory code

## 3. AI Ko Kya NAHI Karna (DON'T)
- User ki API key kabhi hardcode ya server par store mat karo — sirf local (browser)
- Bina bataye bulk files delete/rename mat karo
- Placeholder / fake content commit mat karo
- Ek hi kaam ke liye multiple libraries mat lao
- Inline styles se Tailwind override mat karo
- Breaking changes bina warning ke mat karo

## 4. Content Rules
- Har template professional, grammatically correct ho
- Variables `{{name}}`, `{{date}}`, `{{amount}}` format mein
- Language field aur actual message language match karein
- WhatsApp templates ke liye `whatsapp_approved` format respect karo
- Culturally appropriate (Indian context) content

## 5. Code Conventions
- **Naming:** components `PascalCase`, files `kebab-case`, variables `camelCase`
- **Commits:** Conventional Commits — `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- **Branches:** `feature/`, `fix/`, `docs/`
- **Formatting:** Prettier + ESLint enforced

## 6. Decision Protocol
Jab bhi koi bada decision aaye (naya library, schema change, architecture shift):
1. Options aur trade-offs likho
2. Recommendation do
3. User se confirm karo
4. Decision `Memory.md` mein log karo

## 7. Security & Privacy
- User data collect na karo jab tak zaroori na ho
- AI API keys sirf client-side (localStorage/sessionStorage)
- No secrets in Git — `.env` + `.gitignore`
