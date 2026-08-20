// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// The site is served from its own custom domain with no path prefix, so
// `base` is not set (Astro's own default is "/", identical to the site
// living at the domain root). `site` is driven from the single SITE_ORIGIN
// env var so a local preview and CI build against the same origin and
// cannot disagree.
export default defineConfig({
  integrations: [mdx()],
  site: process.env.SITE_ORIGIN ?? "https://proofnote.cash",
  markdown: {
    shikiConfig: {
      // `css-variables` lets the palette come from global.css rather than a
      // bundled theme, so code blocks match the page instead of fighting it.
      theme: "css-variables",
      wrap: false,
    },
  },
});
