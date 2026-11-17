// Analytics via Google Tag Manager (container from GTM_ID in src/config/site.ts).
//
// The GTM container snippet is injected into every page by scripts/build.mjs
// and only runs on the live host (www.gurupriyatours.com) — never on staging,
// *.pages.dev or localhost. GA4 and its events are configured inside GTM
// (see docs/seo/04-google-setup.md).
//
// Page views: handled by GA4's built-in "page changes based on browser
// history events" (Enhanced measurement), so the site doesn't push its own.
//
// Events pushed to the dataLayer (all with `event` + the params listed):
//   form_start          form_name
//   generate_lead       form_name, tour, travel_type, travel_mode, destination, travellers, travel_month
//   trip_planner_submit destination, travel_type, travel_month, travellers
//   phone_call_click    link_url, link_text, link_location
//   whatsapp_click      link_url, link_text, link_location
//   cta_click           link_url, link_text, link_location   (any link to /contact)
//   language_change     language
//
// Testing: add ?gp_analytics_debug=1 to any URL (works on staging/local) to
// log each event to the console and push it to window.dataLayer without
// loading GTM.

import { ANALYTICS_HOST, GTM_ID } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | "form_start"
  | "generate_lead"
  | "trip_planner_submit"
  | "phone_call_click"
  | "whatsapp_click"
  | "cta_click"
  | "language_change";

/** Every custom parameter used by any event — reset on each push so values never leak between events. */
const EVENT_PARAMS = [
  "form_name",
  "tour",
  "travel_type",
  "travel_mode",
  "destination",
  "travellers",
  "travel_month",
  "link_url",
  "link_text",
  "link_location",
  "language"
] as const;

type Params = Partial<Record<(typeof EVENT_PARAMS)[number], string | number>>;

const DEBUG_KEY = "gp_analytics_debug";
let debug = false;
let initialised = false;

function liveHost(): boolean {
  return typeof window !== "undefined" && Boolean(GTM_ID) && window.location.hostname === ANALYTICS_HOST;
}

export function trackEvent(name: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined" || (!liveHost() && !debug)) return;
  const reset = Object.fromEntries(EVENT_PARAMS.map((k) => [k, undefined]));
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== "" && v !== undefined));
  (window.dataLayer = window.dataLayer || []).push({ ...reset, ...clean, event: name });
  if (debug) console.info("[analytics]", name, clean);
}

function areaOf(el: Element): string {
  const tagged = el.closest("[data-track-area]")?.getAttribute("data-track-area");
  if (tagged) return tagged;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest("[role=dialog]")) return "menu";
  return "page";
}

function onClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.("a");
  if (!a) return;
  const href = a.getAttribute("href") ?? "";
  const text = ((a.textContent ?? "").replace(/\s+/g, " ").trim() || a.getAttribute("aria-label") || "").slice(0, 100);
  const base = { link_url: href, link_text: text, link_location: areaOf(a) };

  if (href.startsWith("tel:")) return trackEvent("phone_call_click", base);
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return trackEvent("whatsapp_click", { ...base, link_url: href.split("?")[0] });
  try {
    const url = new URL(href, window.location.href);
    if (url.origin === window.location.origin && url.pathname === "/contact") trackEvent("cta_click", base);
  } catch {
    // not a URL — ignore
  }
}

export function initAnalytics() {
  if (initialised || typeof window === "undefined") return;
  initialised = true;
  try {
    if (new URLSearchParams(window.location.search).has(DEBUG_KEY)) sessionStorage.setItem(DEBUG_KEY, "1");
    debug = sessionStorage.getItem(DEBUG_KEY) === "1";
  } catch {
    debug = false;
  }
  if (!liveHost() && !debug) return;
  document.addEventListener("click", onClick, { capture: true });
}
