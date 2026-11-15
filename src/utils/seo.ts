import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { findSeoRoute, NOT_FOUND_ROUTE } from "@/seo/routes";
import { headTags, jsonLdString } from "@/seo/head";
import { trackPageView } from "@/utils/analytics";

const MANAGED = "data-seo";

/**
 * Keeps <head> in sync with the central route manifest (src/seo/routes.ts)
 * during client-side navigation. The initial HTML for every route is already
 * prerendered with the same tags at build time, so this only matters after
 * the first in-app navigation. Unknown paths get 404 metadata (noindex).
 */
export function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
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

    trackPageView(pathname, route.title);
  }, [pathname]);

  return null;
}
