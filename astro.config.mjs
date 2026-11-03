import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change this to the live domain before the site is published.
const site = 'https://creativemkstudios.co.uk';

const latin = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';

export default defineConfig({
  site,
  trailingSlash: 'never',
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Sora',
      cssVariable: '--font-sora',
      weights: [700],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
      display: 'swap',
      fallbacks: ['Avenir Next', 'Segoe UI', 'sans-serif'],
      options: {
        variants: [
          {
            weight: 700,
            style: 'normal',
            display: 'swap',
            unicodeRange: [latin],
            src: ['@fontsource/sora/files/sora-latin-700-normal.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Outfit',
      cssVariable: '--font-outfit',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
      display: 'swap',
      fallbacks: ['Avenir Next', 'Segoe UI', 'sans-serif'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            display: 'swap',
            unicodeRange: [latin],
            src: ['@fontsource/outfit/files/outfit-latin-400-normal.woff2'],
          },
          {
            weight: 500,
            style: 'normal',
            display: 'swap',
            unicodeRange: [latin],
            src: ['@fontsource/outfit/files/outfit-latin-500-normal.woff2'],
          },
          {
            weight: 600,
            style: 'normal',
            display: 'swap',
            unicodeRange: [latin],
            src: ['@fontsource/outfit/files/outfit-latin-600-normal.woff2'],
          },
        ],
      },
    },
  ],
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/robots.txt') && !page.endsWith('/privacy'),
    }),
    {
      name: 'sitemap-xml-alias',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const folder = fileURLToPath(dir);
          await copyFile(`${folder}/sitemap-0.xml`, `${folder}/sitemap.xml`);
        },
      },
    },
  ],
});
