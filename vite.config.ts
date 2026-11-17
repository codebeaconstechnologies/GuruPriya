import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  // Builds are the live production site (indexable, sitemap, analytics if
  // configured). The local dev server (`npm run dev`) is treated as
  // non-production: noindex, no analytics, and draft blog posts are visible
  // there for review.
  const siteEnv = command === "serve" || process.env.SITE_ENV === "development" ? "development" : "production";
  const siteUrl = (process.env.SITE_URL || "https://www.gurupriyatours.com").replace(/\/+$/, "");

  const siteConfig = {
    env: siteEnv,
    url: siteUrl,
    // Google Tag Manager container (owner-supplied). Loaded only on the live
    // host by the snippet scripts/build.mjs injects; override with GTM_CONTAINER_ID.
    gtmId: siteEnv === "production" ? process.env.GTM_CONTAINER_ID ?? "GTM-TVQX9W8K" : "",
    analyticsHost: new URL(siteUrl).hostname,
    buildDate: new Date().toISOString().slice(0, 10)
  };

  return {
    plugins: [react()],
    define: {
      __SITE_CONFIG__: JSON.stringify(siteConfig)
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    build: {
      outDir: "dist",
      sourcemap: false
    }
  };
});
