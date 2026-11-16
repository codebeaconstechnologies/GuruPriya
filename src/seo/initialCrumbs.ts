// Breadcrumbs for the page being prerendered / first loaded.
//
// At build time scripts/build.mjs passes each route's breadcrumbs to the SSR
// render (so the trail is real HTML) and embeds the same data as JSON in the
// page; the browser reads it before hydrating, so the first render matches
// without downloading the full SEO manifest. Later navigations load the
// manifest lazily (see components/layout/Breadcrumbs.tsx).

import type { LocalizedText } from "@/data/trips";

export interface Crumb {
  label: LocalizedText;
  path: string;
}

let initial: { path: string; crumbs: Crumb[] } | null = null;

export function setInitialCrumbs(path: string, crumbs: Crumb[]) {
  initial = { path, crumbs };
}

export function getInitialCrumbs(path: string): Crumb[] | null {
  return initial && initial.path === path ? initial.crumbs : null;
}

export const CRUMBS_SCRIPT_ID = "gp-crumbs";
