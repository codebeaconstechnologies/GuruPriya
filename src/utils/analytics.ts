// Google Analytics 4 — loaded only in production builds that set
// GA4_MEASUREMENT_ID (see vite.config.ts). The local dev server never
// load any tracking script. No IDs are hardcoded.

import { GA4_ID } from "@/config/site";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let initialised = false;

export function initAnalytics() {
  if (initialised || !GA4_ID || typeof window === "undefined") return;
  initialised = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // Page views are sent manually on route change (SPA).
  window.gtag("config", GA4_ID, { send_page_view: false });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
  document.head.appendChild(s);

  // Track every call / WhatsApp link click site-wide without touching each link.
  document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackEvent("phone_call_click", { link_url: href, page_path: location.pathname });
      } else if (/wa\.me|whatsapp\.com/.test(href)) {
        trackEvent("whatsapp_click", { page_path: location.pathname });
      }
    },
    { capture: true }
  );
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!GA4_ID || !window.gtag) return;
  window.gtag("event", name, params);
}

export function trackPageView(path: string, title: string) {
  trackEvent("page_view", { page_path: path, page_title: title, page_location: location.href });
}
