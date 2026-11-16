#!/usr/bin/env node
// Dev tool: resizes and encodes images to WebP (and PNG for the logo) using
// headless Chrome's built-in encoder — no image npm dependency needed.
//
//   node scripts/images/optimize.mjs
//
// Inputs:
//   brand/logo-pack/*.png                       official logo pack (never edited)
//   node_modules/.cache/gurupriya-photos/*.jpg   photos from fetch-commons.mjs
// Outputs:
//   public/brand/   logo renditions (transparency preserved, aspect ratio kept)
//   public/images/photos/<id>-800.webp, <id>-1600.webp

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const photoCache = path.join(root, "node_modules", ".cache", "gurupriya-photos");
const CHROME =
  process.env.CHROME_PATH ||
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find(
    (p) => fs.existsSync(p)
  );

const LOGO_SRC = "brand/logo-pack/gurupriya-logo-stacked-transparent-1920.png";
const jobs = [];
// Logo: square stacked logo, transparent. Sizes cover header (1x/2x), footer, favicons.
for (const w of [96, 160, 240, 320, 480]) {
  jobs.push({ src: `/${LOGO_SRC}`, out: `public/brand/gurupriya-logo-${w}.webp`, width: w, type: "image/webp", quality: 0.9 });
}
for (const w of [32, 180, 192, 512]) {
  jobs.push({ src: `/${LOGO_SRC}`, out: `public/brand/gurupriya-logo-${w}.png`, width: w, type: "image/png" });
}
// Social share image (logo centred on white, 1200x630) — the white-background
// variant from the pack is used so nothing is drawn behind a transparent logo.
jobs.push({ src: "/brand/logo-pack/gurupriya-logo-stacked-white-bg-1920.png", out: "public/brand/gurupriya-og.jpg", width: 1200, height: 630, contain: "#ffffff", type: "image/jpeg", quality: 0.9 });

if (fs.existsSync(photoCache)) {
  for (const f of fs.readdirSync(photoCache).filter((f) => f.endsWith(".jpg"))) {
    const id = f.replace(/\.jpg$/, "");
    for (const w of [800, 1600]) {
      jobs.push({ src: `/__photos/${f}`, out: `public/images/photos/${id}-${w}.webp`, width: w, type: "image/webp", quality: 0.74 });
    }
  }
}

const pending = new Set(jobs.map((j) => j.out));
const page = `<!doctype html><script>
const jobs = ${JSON.stringify(jobs)};
(async () => {
  for (const j of jobs) {
    try {
      const img = new Image();
      img.src = j.src;
      await img.decode();
      const scale = j.width / img.naturalWidth;
      const w = j.width, h = j.height || Math.round(img.naturalHeight * scale);
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      if (j.contain) {
        ctx.fillStyle = j.contain; ctx.fillRect(0, 0, w, h);
        const s = Math.min(w / img.naturalWidth, h / img.naturalHeight) * 0.92;
        const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
        ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      } else {
        // Step down in halves for sharper large reductions.
        let src = img, sw = img.naturalWidth, sh = img.naturalHeight;
        while (sw / 2 > w) {
          const t = document.createElement("canvas"); t.width = Math.round(sw / 2); t.height = Math.round(sh / 2);
          const tc = t.getContext("2d"); tc.imageSmoothingQuality = "high"; tc.drawImage(src, 0, 0, t.width, t.height);
          src = t; sw = t.width; sh = t.height;
        }
        ctx.drawImage(src, 0, 0, w, h);
      }
      const blob = await new Promise((r) => c.toBlob(r, j.type, j.quality));
      await fetch("/__save?out=" + encodeURIComponent(j.out), { method: "POST", body: blob });
    } catch (e) {
      await fetch("/__save?error=1&out=" + encodeURIComponent(j.out), { method: "POST", body: String(e) });
    }
  }
})();
</script>`;

let failures = 0;
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/") return res.end(page);
  if (url.pathname === "/__save") {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const out = url.searchParams.get("out");
      if (url.searchParams.get("error")) {
        failures++;
        console.error(`  ✖ ${out}: ${Buffer.concat(chunks)}`);
      } else {
        const file = path.join(root, out);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, Buffer.concat(chunks));
        console.log(`  ✔ ${out} (${Math.round(Buffer.concat(chunks).length / 1024)} KB)`);
      }
      pending.delete(out);
      res.end("ok");
      if (pending.size === 0) finish();
    });
    return;
  }
  const file = url.pathname.startsWith("/__photos/")
    ? path.join(photoCache, decodeURIComponent(url.pathname.slice(10)))
    : path.join(root, decodeURIComponent(url.pathname));
  if (!fs.existsSync(file)) {
    res.statusCode = 404;
    return res.end();
  }
  res.setHeader("Content-Type", file.endsWith(".png") ? "image/png" : "image/jpeg");
  fs.createReadStream(file).pipe(res);
});

let chrome;
function finish() {
  chrome?.kill();
  server.close();
  console.log(`\n${jobs.length - failures} images written, ${failures} failed.`);
  process.exitCode = failures ? 1 : 0;
}

server.listen(0, "127.0.0.1", () => {
  const { port } = server.address();
  const profile = fs.mkdtempSync(path.join(root, "node_modules", ".cache", "chrome-"));
  chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", `--user-data-dir=${profile}`, `http://127.0.0.1:${port}/`], { stdio: "ignore" });
  console.log(`Encoding ${jobs.length} images with headless Chrome…`);
});
