#!/usr/bin/env node
// Validates structured data on a deployed site with the official Schema.org
// Markup Validator (validator.schema.org). Run against the preview or, after
// launch, the live domain:
//
//   node scripts/validate-schema.mjs https://gurupriya-redesign.gurupriyatours.workers.dev
//
// Google's Rich Results Test (https://search.google.com/test/rich-results)
// has no public API — run it by hand on a few URLs after launch.

const base = (process.argv[2] || "https://www.gurupriyatours.com").replace(/\/+$/, "");
const paths = process.argv.slice(3).length
  ? process.argv.slice(3)
  : [
      "/",
      "/about",
      "/packages",
      "/packages/kerala-backwaters-5n-6d",
      "/tours/pilgrimage",
      "/destinations/char-dham-yatra",
      "/destinations/dubai",
      "/services/bus-coach-tours",
      "/yatras/kainchi-dham-neem-karoli-baba-ashram-divya-yatra-2027",
      "/contact",
      "/faq"
    ];

let failed = 0;
for (const p of paths) {
  const body = new URLSearchParams({ url: base + p });
  const res = await fetch("https://validator.schema.org/validate", {
    method: "POST",
    body,
    headers: { "User-Agent": "GuruPriyaSiteCheck/1.0" }
  });
  const text = (await res.text()).replace(/^\)\]\}'\s*/, "");
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.log(`✖ ${p}: validator returned an unexpected response (HTTP ${res.status})`);
    failed++;
    continue;
  }
  const types = new Set();
  const issues = [];
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (node.typeGroup) types.add(node.typeGroup);
    if (node.type && typeof node.type === "string") types.add(node.type.replace(/^https?:\/\/schema\.org\//, ""));
    for (const e of node.errors ?? []) issues.push(`${e.isSevere === false ? "warning" : "error"}: ${e.errorType ?? ""} ${e.args?.join(" ") ?? ""}`.trim());
    for (const v of Object.values(node)) if (v && typeof v === "object") walk(v);
  };
  walk(data.tripleGroups ?? []);
  const errors = data.totalNumErrors ?? issues.filter((i) => i.startsWith("error")).length;
  const warnings = data.totalNumWarnings ?? issues.filter((i) => i.startsWith("warning")).length;
  if (data.fetchError) failed++;
  if (errors) failed++;
  console.log(
    `${errors || data.fetchError ? "✖" : "✔"} ${p.padEnd(62)} errors: ${errors}  warnings: ${warnings}${data.fetchError ? `  fetch: ${data.fetchError}` : ""}  types: ${[...types].slice(0, 8).join(", ")}`
  );
  for (const i of issues.slice(0, 5)) console.log(`    ${i}`);
}
process.exit(failed ? 1 : 0);
