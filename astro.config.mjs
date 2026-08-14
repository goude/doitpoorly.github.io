// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import satteriSidenotes from "./src/plugins/satteri-sidenotes.mjs";

export default defineConfig({
  site: "https://doitpoorly.net",
  compressHTML: true,
  markdown: {
    // Astro 7's default processor, re-declared only to hang the sidenote
    // plugin off it. See src/plugins/satteri-sidenotes.mjs.
    processor: satteri({ hastPlugins: [satteriSidenotes] }),
  },
});
