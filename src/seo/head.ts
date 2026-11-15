// Builds the <head> tags for a route. The same tag set is produced as an HTML
// string at build time (prerendered into every route's .html file, so all
// crawlers — including social-preview bots that don't run JavaScript — see it)
// and applied to the live DOM on client-side navigation (SeoManager).

import { absoluteUrl, DEFAULT_OG_IMAGE, IS_PRODUCTION, SITE_NAME } from "@/config/site";
import type { SeoRoute } from "./routes";
import { heroSrc, heroSrcSet } from "@/utils/images";

export interface HeadTag {
  tag: "meta" | "link";
  attrs: Record<string, string>;
}

/** Non-production builds (local dev) are never indexable. */
export function robotsFor(route: SeoRoute): string {
  if (!IS_PRODUCTION || route.noindex) return "noindex, nofollow";
  return "index, follow, max-image-preview:large";
}

export function headTags(route: SeoRoute): HeadTag[] {
  const url = absoluteUrl(route.path === "/" ? "/" : route.path);
  const image = absoluteUrl(route.image);
  const largeImage = route.image !== DEFAULT_OG_IMAGE;
  const tags: HeadTag[] = [
    { tag: "meta", attrs: { name: "description", content: route.description } },
    { tag: "meta", attrs: { name: "robots", content: robotsFor(route) } },
    { tag: "meta", attrs: { property: "og:site_name", content: SITE_NAME } },
    { tag: "meta", attrs: { property: "og:type", content: route.ogType } },
    { tag: "meta", attrs: { property: "og:title", content: route.title } },
    { tag: "meta", attrs: { property: "og:description", content: route.description } },
    { tag: "meta", attrs: { property: "og:image", content: image } },
    { tag: "meta", attrs: { property: "og:locale", content: "en_IN" } },
    { tag: "meta", attrs: { property: "og:locale:alternate", content: "mr_IN" } },
    { tag: "meta", attrs: { name: "twitter:card", content: largeImage ? "summary_large_image" : "summary" } },
    { tag: "meta", attrs: { name: "twitter:title", content: route.title } },
    { tag: "meta", attrs: { name: "twitter:description", content: route.description } },
    { tag: "meta", attrs: { name: "twitter:image", content: image } }
  ];
  // A 404 has no canonical URL of its own.
  if (route.path !== "/404") {
    tags.push({ tag: "meta", attrs: { property: "og:url", content: url } });
    tags.push({ tag: "link", attrs: { rel: "canonical", href: url } });
  }
  return tags;
}

const escapeAttr = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** JSON for embedding inside <script type="application/ld+json">. */
export function jsonLdString(route: SeoRoute): string {
  return JSON.stringify(route.jsonLd).replace(/</g, "\\u003c");
}

/** Static HTML for prerendering (build time). */
export function renderHeadHtml(route: SeoRoute, extra: { googleSiteVerification?: string } = {}): string {
  const lines = [`<title>${escapeAttr(route.title)}</title>`];
  for (const t of headTags(route)) {
    const attrs = Object.entries(t.attrs)
      .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
      .join(" ");
    lines.push(`<${t.tag} ${attrs} />`);
  }
  if (extra.googleSiteVerification && IS_PRODUCTION) {
    lines.push(`<meta name="google-site-verification" content="${escapeAttr(extra.googleSiteVerification)}" />`);
  }
  if (route.preloadImage) {
    const srcset = heroSrcSet(route.preloadImage);
    lines.push(
      srcset
        ? `<link rel="preload" as="image" href="${escapeAttr(heroSrc(route.preloadImage))}" imagesrcset="${escapeAttr(srcset)}" imagesizes="100vw" fetchpriority="high" />`
        : `<link rel="preload" as="image" href="${escapeAttr(route.preloadImage)}" fetchpriority="high" />`
    );
  }
  if (Array.isArray((route.jsonLd as { "@graph"?: unknown[] })["@graph"]) && (route.jsonLd as { "@graph": unknown[] })["@graph"].length) {
    lines.push(`<script type="application/ld+json" id="seo-jsonld">${jsonLdString(route)}</script>`);
  }
  return lines.join("\n    ");
}
