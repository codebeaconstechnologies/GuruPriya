import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const MANAGED = "data-seo";

/**
 * Keeps <head> in sync with the central route manifest (src/seo/routes.ts)
 * during client-side navigation. Every route's HTML is prerendered with the
 * same tags at build time, so the manifest is loaded lazily here and stays
 * out of the main JavaScript bundle. Unknown paths get 404 metadata (noindex).
 */
export function SeoManager() {
  const { pathname } = useLocation();
  const firstPage = useRef(true);

  useEffect(() => {
    // The first page's <head> is already prerendered — nothing to do.
    if (firstPage.current) {
      firstPage.current = false;
      return;
    }
    let cancelled = false;
    Promise.all([import("@/seo/routes"), import("@/seo/head")]).then(([{ findSeoRoute, NOT_FOUND_ROUTE }, { headTags, jsonLdString }]) => {
      if (cancelled) return;
      const route = findSeoRoute(pathname) ?? NOT_FOUND_ROUTE;
      document.title = route.title;

      // Replace all managed tags (including the prerendered ones) in one pass.
      document.head
        .querySelectorAll(
          `[${MANAGED}], meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]`
        )
        .forEach((el) => el.remove());

      for (const t of headTags(route)) {
        const el = document.createElement(t.tag);
        for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
        el.setAttribute(MANAGED, "");
        document.head.appendChild(el);
      }

      let ld = document.getElementById("seo-jsonld");
      if (!ld) {
        ld = document.createElement("script");
        ld.id = "seo-jsonld";
        ld.setAttribute("type", "application/ld+json");
        document.head.appendChild(ld);
      }
      ld.textContent = jsonLdString(route);

    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
