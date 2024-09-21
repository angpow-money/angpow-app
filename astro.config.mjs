// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import tailwind from '@astrojs/tailwind';

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
  }),],
  output: "server",
});