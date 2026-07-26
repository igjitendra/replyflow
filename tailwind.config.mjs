/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
        },
        accent: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        surface: {
          DEFAULT: '#F9FAFB',
          dark: '#1E293B',
        },
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#334155',
        },
        text: {
          DEFAULT: '#111827',
          muted: '#6B7280',
          dark: '#F1F5F9',
          'muted-dark': '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'Inter', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

    },
  },
  plugins: [],
};
