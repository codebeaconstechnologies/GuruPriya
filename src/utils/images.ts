/**
 * Builds a Wikimedia Commons image URL at a given pixel width via
 * Special:FilePath, which redirects to the actual (CDN-cached) file.
 * Centralizing this here means every destination image can be swapped
 * by changing one file name in src/data/trips.ts.
 *
 * Wikimedia serves thumbnails at fixed standard widths and rounds other
 * requests UP (asking for 1600 returns a 1920px file), so widths here are
 * snapped to those steps to avoid downloading far more than is displayed.
 *
 * NOTE: these are temporary third-party images. The long-term plan is to
 * replace them with GuruPriya's own yatra photos, self-hosted as WebP — see
 * docs/seo/01-audit.md.
 */
const STANDARD_WIDTHS = [330, 500, 960, 1280, 1920] as const;

function snap(width: number): number {
  return STANDARD_WIDTHS.find((w) => w >= width) ?? 1920;
}

export function commonsImage(file: string, width = 960): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${snap(width)}`;
}

const isCommons = (url: string) => url.startsWith("https://commons.wikimedia.org/wiki/Special:FilePath/");

/** Same image at a different width (no-op for non-Commons URLs). */
export function withWidth(url: string, width: number): string {
  if (!isCommons(url)) return url;
  return url.replace(/([?&])width=\d+/, `$1width=${snap(width)}`);
}

/** srcset for full-width hero images (empty for non-Commons URLs). */
export function heroSrcSet(url: string): string | undefined {
  if (!isCommons(url)) return undefined;
  return [500, 960, 1280, 1920].map((w) => `${withWidth(url, w)} ${w}w`).join(", ");
}

/** Default src for a hero (the srcset picks the best size per device). */
export function heroSrc(url: string): string {
  return withWidth(url, 1280);
}
