// Central site / deployment configuration. Values come from the build
// environment (see vite.config.ts and scripts/build.mjs) — never hardcode
// domains or tracking IDs elsewhere.

export const SITE_ENV = __SITE_CONFIG__.env;
export const IS_PRODUCTION = SITE_ENV === "production";

/** Canonical origin, no trailing slash, e.g. https://www.gurupriyatours.com */
export const SITE_URL = __SITE_CONFIG__.url;

export const GA4_ID = __SITE_CONFIG__.ga4Id;

export const BUILD_DATE = __SITE_CONFIG__.buildDate;

export const SITE_NAME = "GuruPriya Tours";

/** Default social-share image (1200x630 recommended; replace with a real one). */
export const DEFAULT_OG_IMAGE = "/images/logo.png";

/**
 * Official social profiles, used for Organization `sameAs`.
 * Add only profiles the business actually owns — leave empty otherwise.
 */
export const SOCIAL_PROFILES: string[] = [];

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
