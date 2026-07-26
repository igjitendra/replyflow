# ReplyFlow 🚀

> **Multi-Channel Business Message Template Library** — Find the perfect message in seconds.

ReplyFlow is a static, high-performance web application designed to provide small and medium-sized businesses with ready-to-use, professional message templates across WhatsApp, SMS, Email, Instagram, and more.

---

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/) (v4+, SSG, zero-JS by default)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom design system tokens
- **Type Checking:** TypeScript (strict mode)
- **Search:** Pagefind (static client-side full-text search)
- **Code Quality:** ESLint + Prettier

---

## 🎨 Design Tokens

- **Primary:** `#2563EB` (Primary Dark: `#1E40AF`)
- **Accent:** `#10B981`
- **Warning:** `#F59E0B`
- **Danger:** `#EF4444`
- **Surface:** `#F9FAFB`
- **Border:** `#E5E7EB`
- **Text:** `#111827` (Muted: `#6B7280`)
- **Fonts:**
  - `sans`: Inter + Noto Sans Devanagari
  - `devanagari`: Noto Sans Devanagari
  - `mono`: JetBrains Mono

---

## 📂 Project Structure

```text
replyflow/
├── src/
│   ├── components/     # Reusable UI components
│   ├── content/        # Content collections (markdown templates)
│   ├── data/           # Config & static datasets
│   ├── layouts/        # Base & specialized layouts
│   ├── pages/          # Astro pages & routes
│   └── styles/         # Global styles & Tailwind directives
├── public/             # Static assets & favicon
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind design token configuration
├── tsconfig.json       # Strict TypeScript configuration
├── .eslintrc.cjs       # ESLint rules
└── package.json        # Dependencies & scripts
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:4321`.

### 3. Build & Check Types

```bash
npm run check
npm run build
```

---

## 📜 License

MIT License
