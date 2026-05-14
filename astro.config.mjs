import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://equinox.sametbasbug.dev',
  devToolbar: {
    enabled: false,
  },
  integrations: [sitemap()],
});
