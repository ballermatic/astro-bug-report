// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

const sitePath = import.meta.env.PROD
  ? 'https://gritmatters.com'
  : 'https://localhost:4321';

export default defineConfig({
  site: sitePath,
  adapter: cloudflare(),
  output: 'server',
  devToolbar: {
    enabled: false
  },
  integrations: [
    partytown({ config: { forward: ['dataLayer.push'] } }),
    sitemap(),
    icon()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
