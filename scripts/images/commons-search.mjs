#!/usr/bin/env node
// Dev tool: search Wikimedia Commons for freely licensed landscape photos.
//   node scripts/images/commons-search.mjs "Dal Lake" ["Another query" ...]
// Prints candidates (title, size, license, author) preferring Commons
// "Quality images". Used to pick images listed in scripts/images/sources.json.

const UA = "GuruPriyaSiteImageTool/1.0 (website image import script)";
const ALLOWED = /^(cc[- ]by(-sa)?[- ]?[0-9.]*|cc0|public domain|pd.*)$/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(q, quality) {
  await sleep(2500); // be polite to the Commons API
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrnamespace: "6",
    gsrsearch: `${q} filetype:bitmap${quality ? " incategory:Quality_images" : ""}`,
    gsrlimit: "12",
    prop: "imageinfo",
    iiprop: "url|size|extmetadata",
    iiurlwidth: "1920"
  });
  let data;
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { "User-Agent": UA } });
    const text = await res.text();
    try {
      data = JSON.parse(text);
      break;
    } catch {
      await sleep(15000 * (attempt + 1)); // rate limited — back off
    }
  }
  if (!data) return [];
  return Object.values(data.query?.pages ?? {}).map((p) => {
    const ii = p.imageinfo?.[0] ?? {};
    const m = ii.extmetadata ?? {};
    const strip = (s) => (s ?? "").replace(/<[^>]+>/g, "").trim();
    return {
      title: p.title,
      w: ii.width,
      h: ii.height,
      license: strip(m.LicenseShortName?.value),
      author: strip(m.Artist?.value).slice(0, 60)
    };
  });
}

for (const q of process.argv.slice(2)) {
  let rows = await search(q, true);
  if (rows.filter((r) => r.w >= 1800).length < 3) rows = rows.concat(await search(q, false));
  const seen = new Set();
  rows = rows.filter((r) => {
    if (seen.has(r.title)) return false;
    seen.add(r.title);
    return r.w >= 1800 && r.w / r.h >= 1.25 && ALLOWED.test(r.license);
  });
  console.log(`\n### ${q}`);
  for (const r of rows.slice(0, 6)) console.log(`  ${r.title} | ${r.w}x${r.h} | ${r.license} | ${r.author}`);
}
