#!/usr/bin/env node
// Dev tool: downloads the photos listed in scripts/images/sources.json plus
// every commonsImage("...") used in src/data/trips.ts from Wikimedia Commons,
// and records author / licence / source for each in src/data/imageCredits.json
// (rendered on the /image-credits page — required by CC BY / CC BY-SA).
//
//   node scripts/images/fetch-commons.mjs        (then: node scripts/images/optimize.mjs)
//
// Originals land in node_modules/.cache/gurupriya-photos/ (not committed).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const cacheDir = path.join(root, "node_modules", ".cache", "gurupriya-photos");
const creditsFile = path.join(root, "src", "data", "imageCredits.json");
const UA = "GuruPriyaSiteImageTool/1.0 (website image import script)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function slugifyFile(file) {
  return file
    .replace(/^File:/, "")
    .replace(/\.[a-z]+$/i, "")
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

async function api(params) {
  for (let attempt = 0; attempt < 5; attempt++) {
    await sleep(1500);
    const res = await fetch(`https://commons.wikimedia.org/w/api.php?${new URLSearchParams({ format: "json", ...params })}`, {
      headers: { "User-Agent": UA }
    });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      await sleep(15000 * (attempt + 1));
    }
  }
  throw new Error("Commons API unavailable");
}

async function download(url, file) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) {
      fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
      return;
    }
    await sleep(10000 * (attempt + 1));
  }
  throw new Error(`download failed: ${url}`);
}

const strip = (s) => (s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const sources = JSON.parse(fs.readFileSync(path.join(root, "scripts/images/sources.json"), "utf8"));
const tripsSrc = fs.readFileSync(path.join(root, "src/data/trips.ts"), "utf8");
for (const m of tripsSrc.matchAll(/commonsImage\("([^"]+)"/g)) {
  const title = `File:${m[1]}`;
  if (!Object.values(sources).includes(title)) sources[slugifyFile(title)] = title;
}

fs.mkdirSync(cacheDir, { recursive: true });
const previous = fs.existsSync(creditsFile) ? JSON.parse(fs.readFileSync(creditsFile, "utf8")) : [];
const credits = [];

for (const [id, title] of Object.entries(sources)) {
  const cached = previous.find((c) => c.id === id && c.title === title);
  const target = path.join(cacheDir, `${id}.jpg`);
  if (cached && fs.existsSync(target)) {
    credits.push(cached);
    continue;
  }
  const data = await api({ action: "query", titles: title, prop: "imageinfo", iiprop: "url|size|extmetadata", iiurlwidth: "1920" });
  const page = Object.values(data.query.pages)[0];
  const ii = page.imageinfo?.[0];
  if (!ii) {
    console.error(`  ✖ ${id}: not found (${title})`);
    continue;
  }
  const m = ii.extmetadata ?? {};
  await download(ii.thumburl ?? ii.url, target);
  credits.push({
    id,
    title,
    author: strip(m.Artist?.value) || "Unknown",
    license: strip(m.LicenseShortName?.value),
    licenseUrl: strip(m.LicenseUrl?.value),
    sourceUrl: ii.descriptionurl
  });
  console.log(`  ✔ ${id}  (${strip(m.LicenseShortName?.value)})`);
}

credits.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(creditsFile, JSON.stringify(credits, null, 2) + "\n");
console.log(`\n${credits.length} photos cached; credits → src/data/imageCredits.json`);
