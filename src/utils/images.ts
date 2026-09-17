/**
 * Builds a Wikimedia Commons image URL at a given pixel width via
 * Special:FilePath, which redirects to the actual (CDN-cached) file.
 * Centralizing this here means every destination image can be swapped
 * by changing one file name in src/data/trips.ts.
 */
export function commonsImage(file: string, width = 1600): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}
