// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ["iconify-icon"].includes(tag),
      },
    },
  }),  tailwind({
    applyBaseStyles: false,
  }), react()],

  output: "server",
  adapter: cloudflare(),
});