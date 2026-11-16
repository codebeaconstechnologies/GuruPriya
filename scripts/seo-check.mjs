#!/usr/bin/env node
// Automated SEO / deployment-safety checks over the built dist/ folder.
// Runs automatically at the end of scripts/build.mjs; can also be run alone:
//   node scripts/seo-check.mjs
// Exits non-zero on any error. Warnings are printed but don't fail the build.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function runChecks({ dist, root, siteUrl }) {
  const errors = [];
  const warnings = [];
  const err = (m) => errors.push(m);
  const warn = (m) => warnings.push(m);
  const read = (rel) => fs.readFileSync(path.join(dist, rel), "utf8");
  const exists = (rel) => fs.existsSync(path.join(dist, rel));

  if (fs.existsSync(path.join(dist, "node_modules"))) {
    err("dist/node_modules exists — dependency files would be published");
    return report(errors, warnings);
  }
  const allFiles = walk(dist).map((f) => path.relative(dist, f).split(path.sep).join("/"));
  const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));

  // ---- deployment config ---------------------------------------------------
  for (const f of ["robots.txt", "_headers", "_routes.json", "sitemap.xml", "index.html", "404.html"]) {
    if (!exists(f)) err(`missing dist/${f}`);
  }
  if (errors.length) return report(errors, warnings);

  const robots = read("robots.txt");
  if (/^Disallow:\s*\/\s*$/m.test(robots)) err("robots.txt blocks the whole site (Disallow: /)");

  const routesJson = JSON.parse(read("_routes.json"));
  if (routesJson.include.includes("/*")) warn("_routes.json routes every request through Functions");

  // ---- no preview hosts / placeholders in the output -------------------------
  for (const f of allFiles.filter((f) => /\.(html|js|css|xml|txt|json)$/.test(f))) {
    const c = read(f);
    if (/\.pages\.dev(?!\/\*)/.test(c) && f !== "_headers") err(`${f} references a *.pages.dev host`);
    if (/example\.com/.test(c) && !/you@example\.com/.test(c)) warn(`${f} contains an example.com placeholder`);
  }

  // ---- per-page head checks --------------------------------------------------
  const titles = new Map();
  const descriptions = new Map();
  for (const f of htmlFiles) {
    const html = read(f);
    const is404 = f === "404.html";
    const titleMatches = html.match(/<title>([\s\S]*?)<\/title>/g) ?? [];
    if (titleMatches.length !== 1) err(`${f}: expected exactly 1 <title>, found ${titleMatches.length}`);
    const title = decodeEntities((html.match(/<title>([\s\S]*?)<\/title>/) ?? [])[1]?.trim() ?? "");
    if (!title) err(`${f}: empty <title>`);
    if (title.length > 65) warn(`${f}: title is ${title.length} chars (may be truncated in results): "${title}"`);

    const desc = metaContent(html, "name", "description");
    if (!desc) err(`${f}: missing meta description`);
    else if (desc.length > 165) warn(`${f}: meta description is ${desc.length} chars`);

    const robotsMeta = metaContent(html, "name", "robots") ?? "";
    if (is404 && !/noindex/.test(robotsMeta)) err(`${f}: 404 page must be noindex`);

    const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) ?? [])[1];
    if (!is404) {
      if (!canonical) err(`${f}: missing canonical`);
      else {
        if (!canonical.startsWith(siteUrl)) err(`${f}: canonical ${canonical} is not on ${siteUrl}`);
        const expected = siteUrl + (f === "index.html" ? "/" : "/" + f.replace(/\.html$/, ""));
        if (canonical !== expected) err(`${f}: canonical ${canonical} ≠ expected ${expected}`);
      }
      if (!metaContent(html, "property", "og:title")) err(`${f}: missing og:title`);
      if (!metaContent(html, "name", "twitter:card")) err(`${f}: missing twitter:card`);
    }

    // Titles/descriptions must be unique across all real pages.
    if (!is404) {
      pushMap(titles, title, f);
      if (desc) pushMap(descriptions, desc, f);
    }

    // Structured data must parse and carry required properties.
    for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      let data;
      try {
        data = JSON.parse(m[1]);
      } catch (e) {
        err(`${f}: invalid JSON-LD (${e.message})`);
        continue;
      }
      validateJsonLd(data, f, err);
    }
  }
  for (const [t, files] of titles) if (files.length > 1) err(`duplicate <title> "${t}" on: ${files.join(", ")}`);
  for (const [d, files] of descriptions) if (files.length > 1) err(`duplicate meta description on: ${files.join(", ")}`);

  {
    // Sitemap
    const xml = read("sitemap.xml");
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (!locs.length) err("sitemap.xml has no URLs");
    for (const loc of locs) {
      if (!loc.startsWith(siteUrl + "/")) err(`sitemap URL not on ${siteUrl}: ${loc}`);
      const rel = loc.slice(siteUrl.length) || "/";
      const file = rel === "/" ? "index.html" : rel.slice(1) + ".html";
      if (!exists(file)) err(`sitemap URL has no page: ${loc}`);
      else if (/name="robots" content="noindex/.test(read(file))) err(`sitemap lists a noindex page: ${loc}`);
    }
    if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) err("robots.txt does not reference the sitemap");
    // Indexable pages: every page except 404 and pages the manifest marks noindex.
    if (/name="robots" content="noindex/.test(read("index.html"))) err("home page is noindex");

    // Internal links in source must resolve to a generated route.
    const routeSet = new Set(htmlFiles.filter((f) => f !== "404.html").map((f) => (f === "index.html" ? "/" : "/" + f.replace(/\.html$/, ""))));
    const srcFiles = walk(path.join(root, "src")).filter((f) => /\.(tsx?|ts)$/.test(f));
    const linkRe = /(?:to|href)=["{`]+(\/[a-z0-9\-/]*)[?#"`}]|\]\((\/[a-z0-9\-/]*)[?#)]/g;
    for (const file of srcFiles) {
      // Ignore comments (they contain example links like [label](/path)).
      const code = fs
        .readFileSync(file, "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
      for (const m of code.matchAll(linkRe)) {
        const p = (m[1] ?? m[2]).replace(/\/$/, "") || "/";
        if (p.startsWith("/images") || p.startsWith("/api") || p.endsWith("/")) continue;
        // Dynamic prefixes like `/yatras/${slug}` capture as "/yatras/" — skipped above.
        if (!routeSet.has(p) && !(p === "/blog" && !routeSet.has("/blog"))) {
          err(`${path.relative(root, file)} links to ${p}, which is not a built page`);
        }
      }
    }

    // Local images referenced in source exist.
    for (const file of srcFiles) {
      const code = fs.readFileSync(file, "utf8");
      for (const m of code.matchAll(/["'`](\/(?:images|brand)\/[^"'`?]+)["'`]/g)) {
        if (m[1].includes("${")) continue; // template path — covered by the photo-id check
        if (!fs.existsSync(path.join(root, "public", m[1]))) err(`${path.relative(root, file)} references missing image ${m[1]}`);
      }
    }

    // Rendered pages (bodies are prerendered): exactly one <h1>, every <img>
    // has an alt attribute, and every internal link resolves to a built page
    // or file.
    const brokenLinks = new Map();
    for (const f of htmlFiles) {
      const html = read(f);
      const bodyStart = html.indexOf('<div id="root">');
      const body = bodyStart >= 0 ? html.slice(bodyStart) : "";
      if (!body.includes("<")) {
        err(`${f}: page body was not prerendered`);
        continue;
      }
      const h1s = (body.match(/<h1[\s>]/g) ?? []).length;
      if (h1s !== 1) err(`${f}: expected exactly 1 <h1> in the rendered page, found ${h1s}`);
      for (const m of body.matchAll(/<img\b[^>]*>/g)) {
        if (!/\salt="/.test(m[0])) err(`${f}: <img> without alt: ${m[0].slice(0, 90)}`);
      }
      for (const m of body.matchAll(/href="(\/[^"]*)"/g)) {
        const target = m[1].split(/[?#]/)[0].replace(/\/$/, "") || "/";
        if (/^\/(assets|images|brand|api)\//.test(target) || /\.(png|webp|jpe?g|svg|xml|txt|ico)$/.test(target)) continue;
        if (routeSet.has(target)) continue;
        if (["/coming-soon", "/yatras"].includes(target)) continue; // served as 301 redirects
        brokenLinks.set(target, [...(brokenLinks.get(target) ?? []), f]);
      }
    }
    for (const [target, files] of brokenLinks) err(`broken internal link ${target} (on ${files.slice(0, 3).join(", ")}${files.length > 3 ? ` +${files.length - 3} more` : ""})`);

    // Every photo id referenced in source has its optimised files.
    for (const file of srcFiles) {
      const code = fs.readFileSync(file, "utf8");
      const rel = path.relative(root, file).split(path.sep).join("/");
      const ids = new Set([...code.matchAll(/photo\("([a-z0-9-]+)"/g)].map((m) => m[1]));
      if (rel.startsWith("src/data/catalog/")) for (const m of code.matchAll(/\bimage: "([a-z0-9-]+)"/g)) ids.add(m[1]);
      if (/src\/(pages\/Gallery|components\/home\/HomeHero)\.tsx$/.test(rel)) for (const m of code.matchAll(/\bid: "([a-z0-9-]+)"/g)) ids.add(m[1]);
      for (const id of ids) {
        if (!fs.existsSync(path.join(root, "public", "images", "photos", `${id}-800.webp`))) err(`${rel} references photo "${id}", which has no file in public/images/photos`);
      }
    }

    // Every page component renders an <h1> (itself or via a directly imported component).
    for (const page of walk(path.join(root, "src", "pages"))) {
      const code = fs.readFileSync(page, "utf8");
      const sources = [code];
      for (const m of code.matchAll(/from "@\/components\/([^"]+)"/g)) {
        const p = path.join(root, "src", "components", m[1] + ".tsx");
        if (fs.existsSync(p)) sources.push(fs.readFileSync(p, "utf8"));
      }
      const hasH1 = sources.some((s) => /<h1[\s>]|motion\.h1|as="h1"/.test(s)) || /<NotFound \/>/.test(code) && /<h1/.test(fs.readFileSync(path.join(root, "src/pages/NotFound.tsx"), "utf8"));
      if (!hasH1) err(`${path.relative(root, page)} has no <h1>`);
    }

    // The Vite build must not inline the old SPA catch-all (soft-404s).
    if (exists("_redirects") && /\/\*\s+\/index\.html\s+200/.test(read("_redirects"))) err("_redirects contains an SPA catch-all (/* /index.html 200) — unknown URLs would return 200");
  }

  return report(errors, warnings);
}

function validateJsonLd(data, f, err) {
  if (data["@context"] !== "https://schema.org") err(`${f}: JSON-LD @context must be https://schema.org`);
  const nodes = data["@graph"] ?? [data];
  for (const n of nodes) {
    const type = n["@type"];
    const need = {
      TravelAgency: ["name", "url", "logo", "address"],
      WebSite: ["name", "url"],
      BreadcrumbList: ["itemListElement"],
      TouristTrip: ["name", "description", "provider"],
      BlogPosting: ["headline", "datePublished", "author", "image"]
    }[type];
    if (!type) err(`${f}: JSON-LD node without @type`);
    for (const k of need ?? []) if (n[k] === undefined || n[k] === "") err(`${f}: ${type} is missing "${k}"`);
    if (type === "BreadcrumbList") {
      n.itemListElement.forEach((it, i) => {
        if (it.position !== i + 1 || !it.name || !/^https?:\/\//.test(it.item)) err(`${f}: invalid BreadcrumbList item ${i + 1}`);
      });
    }
    const json = JSON.stringify(n);
    if (/aggregateRating|"review"|"offers"|"price"/i.test(json)) err(`${f}: ${type} contains rating/review/price markup (not allowed — no verified data)`);
  }
}

function metaContent(html, attr, name) {
  const re = new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`);
  const v = (html.match(re) ?? [])[1];
  return v === undefined ? undefined : decodeEntities(v);
}

function decodeEntities(s) {
  return s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&amp;/g, "&");
}

function pushMap(map, key, val) {
  map.set(key, [...(map.get(key) ?? []), val]);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

function report(errors, warnings) {
  for (const w of warnings) console.warn(`  ⚠ ${w}`);
  for (const e of errors) console.error(`  ✖ ${e}`);
  console.log(`  SEO checks: ${errors.length} error(s), ${warnings.length} warning(s)`);
  return errors.length === 0;
}

// CLI: node scripts/seo-check.mjs
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const dist = path.join(root, "dist");
  const html = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) ?? [])[1] ?? "";
  const siteUrl = canonical.replace(/\/$/, "") || "https://www.gurupriyatours.com";
  process.exit(runChecks({ dist, root, siteUrl }) ? 0 : 1);
}
