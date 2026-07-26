import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://replyflow.procsctools.in',
  compressHTML: true,
  trailingSlash: 'never',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
