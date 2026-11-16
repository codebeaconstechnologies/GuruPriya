/**
 * Image helpers.
 *
 * All photography is self-hosted as optimised WebP in /public/images/photos
 * (800w + 1600w), imported from Wikimedia Commons under free licences by
 * scripts/images/fetch-commons.mjs + optimize.mjs. Author/licence for every
 * photo is listed in src/data/imageCredits.json and shown on /image-credits.
 *
 * Replace any photo with GuruPriya's own by overwriting the two WebP files
 * for its id (and updating imageCredits.json).
 */
import credits from "@/data/imageCredits.json";

export interface ImageCredit {
  id: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
}

export const imageCredits = credits as ImageCredit[];
const LOCAL = new Set(imageCredits.map((c) => c.id));

/** Same algorithm as slugifyFile() in scripts/images/fetch-commons.mjs. */
function slugifyFile(file: string): string {
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

/** Self-hosted photo by library id (see scripts/images/sources.json). */
export function photo(id: string, width: 800 | 1600 = 1600): string {
  return `/images/photos/${id}-${width}.webp`;
}

export function photoSrcSet(id: string): string {
  return `${photo(id, 800)} 800w, ${photo(id, 1600)} 1600w`;
}

/**
 * A Commons file by name. Resolves to the self-hosted copy when it has been
 * imported (always, for files used in src/data/trips.ts), otherwise falls
 * back to Wikimedia's Special:FilePath.
 */
export function commonsImage(file: string, width = 960): string {
  const id = slugifyFile(`File:${file}`);
  if (LOCAL.has(id)) return photo(id, width <= 800 ? 800 : 1600);
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

const LOCAL_RE = /^\/images\/photos\/(.+)-(800|1600)\.webp$/;

/** Same image at a different width. */
export function withWidth(url: string, width: number): string {
  const m = url.match(LOCAL_RE);
  if (m) return photo(m[1], width <= 800 ? 800 : 1600);
  if (url.startsWith("https://commons.wikimedia.org/wiki/Special:FilePath/")) {
    return url.replace(/([?&])width=\d+/, `$1width=${width}`);
  }
  return url;
}

/** srcset for full-width images. */
export function heroSrcSet(url: string): string | undefined {
  const m = url.match(LOCAL_RE);
  if (m) return photoSrcSet(m[1]);
  return undefined;
}

export function heroSrc(url: string): string {
  return withWidth(url, 1600);
}
