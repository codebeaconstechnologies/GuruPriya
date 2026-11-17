#!/usr/bin/env node
// GuruPriya build pipeline: builds the live production site.
//
//   npm run build        (= tsc --noEmit && node scripts/build.mjs)
//
// Steps:
//   1. Vite client build (code-split, with a manifest).
//   2. Compiles the central SEO manifest (src/seo/routes.ts) for Node and
//      prerenders one HTML file per route with its real <title>, description,
//      canonical, Open Graph / Twitter tags and JSON-LD in the static HTML.
//   3. Writes 404.html (served with HTTP 404), sitemap.xml, robots.txt,
//      _headers, _redirects and _routes.json for Cloudflare Pages.
//   4. Runs scripts/seo-check.mjs. Any error fails the build.
//
// Optional environment variables (Cloudflare Pages → Settings → Variables):
//   SITE_URL                   canonical origin (default https://www.gurupriyatours.com)
//   GTM_CONTAINER_ID           Google Tag Manager container (default GTM-TVQX9W8K;
//                              loads only on www.gurupriyatours.com)
//   GOOGLE_SITE_VERIFICATION   Search Console HTML-tag verification

import { build } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { runChecks } from "./seo-check.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrOut = path.join(root, "node_modules", ".cache", "gurupriya-seo");

/** Which lazily-loaded page chunk each route needs, so it can be preloaded. */
const PAGE_MODULES = [
  [/^\/yatras\/.+/, "src/pages/TripDetail.tsx"],
  [/^\/upcoming-yatras$/, "src/pages/ComingSoon.tsx"],
  [/^\/about$/, "src/pages/AboutUs.tsx"],
  [/^\/packages$/, "src/pages/Packages.tsx"],
  [/^\/packages\/.+/, "src/pages/PackageDetail.tsx"],
  [/^\/tours\/.+/, "src/pages/Category.tsx"],
  [/^\/destinations$/, "src/pages/Destinations.tsx"],
  [/^\/destinations\/.+/, "src/pages/Destination.tsx"],
  [/^\/services(\/.+)?$/, "src/pages/Services.tsx"],
  [/^\/image-credits$/, "src/pages/ImageCredits.tsx"],
  [/^\/contact$/, "src/pages/ContactUs.tsx"],
  [/^\/gallery$/, "src/pages/Gallery.tsx"],
  [/^\/faq$/, "src/pages/FAQ.tsx"],
  [/^\/terms$/, "src/pages/Terms.tsx"],
  [/^\/privacy$/, "src/pages/Privacy.tsx"],
  [/^\/blog$/, "src/pages/Blog.tsx"],
  [/^\/blog\/.+/, "src/pages/BlogPost.tsx"]
];

console.log("\n▶ Building GuruPriya (production)\n");
fs.rmSync(dist, { recursive: true, force: true });

// 1. Client build.
await build({ build: { manifest: true } });
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(dist, ".vite", "manifest.json"), "utf8"));
fs.rmSync(path.join(dist, ".vite"), { recursive: true, force: true });

// 2. SEO manifest for Node.
await build({
  logLevel: "warn",
  build: {
    ssr: "src/seo/build-entry.ts",
    outDir: ssrOut,
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: "entry.mjs" } }
  }
});
const seo = await import(pathToFileURL(path.join(ssrOut, "entry.mjs")).href);

// Prerender every route.
const verification = process.env.GOOGLE_SITE_VERIFICATION || "";
const routes = seo.getSeoRoutes();
for (const route of routes) {
  // Full page body prerendered (React SSR), hydrated in the browser.
  const body = await seo.render(route.path, route.breadcrumbs);
  const crumbsJson = `<script type="application/json" id="${seo.CRUMBS_SCRIPT_ID}">${JSON.stringify(route.breadcrumbs).replace(/</g, "\\u003c")}</script>`;
  const html = renderPage(seo.renderHeadHtml(route, { googleSiteVerification: verification }), [...preloadsFor(route.path), crumbsJson], body);
  writeFile(routeFile(route.path), html);
}
// Cloudflare Pages serves this with HTTP 404 for any unknown URL; the app
// boots inside it and shows the Not Found page.
writeFile("404.html", renderPage(seo.renderHeadHtml(seo.NOT_FOUND_ROUTE), [], await seo.render("/__not-found__")));

// 3. Sitemap (indexable pages only).
const urls = routes
  .filter((r) => r.sitemap && !r.noindex)
  .map((r) => {
    const loc = `${seo.SITE_URL}${r.path === "/" ? "/" : r.path}`;
    return `  <url>\n    <loc>${xmlEscape(loc)}</loc>${r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : ""}\n  </url>`;
  });
writeFile(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
);

writeFile("robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${seo.SITE_URL}/sitemap.xml\n`);

// Old URL → new URL.
writeFile("_redirects", "/coming-soon  /upcoming-yatras  301\n/yatras  /tours/pilgrimage  301\n");

writeFile(
  "_headers",
  [
    "/*",
    "  X-Content-Type-Options: nosniff",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "  X-Frame-Options: SAMEORIGIN",
    "  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()",
    "",
    "/assets/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
    "/images/*",
    "  Cache-Control: public, max-age=604800",
    "",
    "# The *.pages.dev address must never compete with the real domain in search.",
    "https://:project.pages.dev/*",
    "  X-Robots-Tag: noindex, nofollow",
    ""
  ].join("\n")
);

// Pages Functions only run for the API; every page is served as a static file.
writeFile("_routes.json", JSON.stringify({ version: 1, include: ["/api/*"], exclude: [] }, null, 2) + "\n");

console.log(`  prerendered ${routes.length} routes + 404.html`);

// 4. Validate. Errors fail the build.
if (!runChecks({ dist, root, siteUrl: seo.SITE_URL })) {
  console.error("\n✖ SEO checks failed — see errors above.\n");
  process.exit(1);
}
console.log(`\n✔ Build complete: dist/ (${seo.SITE_URL})\n`);

/* ------------------------------------------------------------------ */

function preloadsFor(routePath) {
  const match = PAGE_MODULES.find(([re]) => re.test(routePath));
  if (!match) return [];
  const files = new Set();
  const visit = (key) => {
    const chunk = manifest[key];
    if (!chunk || chunk.isEntry || files.has(chunk.file)) return;
    files.add(chunk.file);
    for (const imp of chunk.imports ?? []) visit(imp);
  };
  visit(match[1]);
  return [...files].map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`);
}

function renderPage(headHtml, extraHead, bodyHtml = "") {
  const start = template.indexOf("<!--seo:start-->");
  const end = template.indexOf("<!--seo:end-->");
  if (start < 0 || end < 0) throw new Error("index.html is missing the <!--seo:start--> / <!--seo:end--> markers");
  const html = template.slice(0, start) + [headHtml, ...extraHead].join("\n    ") + template.slice(end + "<!--seo:end-->".length);
  if (!html.includes('<div id="root"></div>')) throw new Error('index.html is missing <div id="root"></div>');
  return withGtm(html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`));
}

/**
 * Official Google Tag Manager container snippet, placed high in <head>.
 * Guarded to run only on the live host, so staging, *.pages.dev and local
 * previews never send analytics data.
 */
function withGtm(html) {
  if (!seo.GTM_ID) return html;
  const id = JSON.stringify(seo.GTM_ID);
  const host = JSON.stringify(seo.ANALYTICS_HOST);
  const snippet = `<!-- Google Tag Manager (live site only) -->
    <script>if(location.hostname===${host}){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${id});}</script>
    <!-- End Google Tag Manager -->`;
  const anchor = '<meta name="viewport"';
  const i = html.indexOf(anchor);
  if (i < 0) throw new Error("index.html is missing the viewport meta tag");
  const lineEnd = html.indexOf("\n", i);
  return html.slice(0, lineEnd + 1) + "    " + snippet + "\n" + html.slice(lineEnd + 1);
}

function routeFile(routePath) {
  return routePath === "/" ? "index.html" : `${routePath.replace(/^\//, "")}.html`;
}

function writeFile(rel, content) {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function xmlEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
