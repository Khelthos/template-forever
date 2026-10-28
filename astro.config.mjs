// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { validateConfig } from "./src/lib/config-schema.mjs";
import { astroFontEntries } from "./src/lib/theme.js";
import rawConfig from "./src/config/site.config.mjs";

const { config } = validateConfig(rawConfig);

// The public address comes from site.config.mjs. In the GitHub Actions
// workflow the SITE_URL variable overrides it with the real GitHub Pages URL.
const publicUrl = new URL(process.env.SITE_URL || config.site.url);

export default defineConfig({
  site: publicUrl.origin,
  base: publicUrl.pathname,
  trailingSlash: "ignore",
  output: "static",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  fonts: astroFontEntries(config.appearance, fontProviders, config.site.language),
  vite: {
    plugins: [tailwindcss()],
  },
});
