// Entry point compiled by scripts/build.mjs (Vite SSR build) so the Node build
// script can read the same route manifest, metadata and business data the app
// uses — one source of truth, no duplicated route lists.

export { getSeoRoutes, NOT_FOUND_ROUTE, GALLERY_HAS_OWN_PHOTOS } from "./routes";
export { renderHeadHtml, robotsFor } from "./head";
export { travelAgencySchema, graph } from "./schema";
export { SITE_URL, SITE_ENV, IS_PRODUCTION, SITE_NAME, GTM_ID, ANALYTICS_HOST } from "@/config/site";
export { company, trips } from "@/data/trips";
export { blogPosts } from "@/data/blog";
export { render } from "@/entry-server";
export { CRUMBS_SCRIPT_ID } from "./initialCrumbs";
