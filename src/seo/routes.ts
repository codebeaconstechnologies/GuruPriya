// Central SEO route manifest — the single source of truth for every public
// URL's title, description, canonical, social image, breadcrumbs, JSON-LD and
// sitemap inclusion. Used by:
//   - SeoManager (client-side head updates on navigation)
//   - Breadcrumbs (visible breadcrumb trail)
//   - scripts/build.mjs (prerendered per-route HTML <head>, sitemap.xml)
//
// Metadata is English: the target search queries are English-language.
// (Body content defaults to Marathi — see docs/seo/01-audit.md, "Language".)

import { trips, isTripCompleted, getDeparture, type LocalizedText } from "@/data/trips";
import { blogPosts, type BlogPost } from "@/data/blog";
import { IS_PRODUCTION, DEFAULT_OG_IMAGE, SITE_NAME } from "@/config/site";
import {
  graph,
  travelAgencySchema,
  webSiteSchema,
  webPageSchema,
  breadcrumbSchema,
  touristTripSchema,
  blogPostingSchema,
  type JsonLd
} from "./schema";

export interface BreadcrumbItem {
  label: LocalizedText;
  path: string;
}

export interface SeoRoute {
  path: string;
  title: string;
  description: string;
  image: string;
  ogType: "website" | "article";
  /** Excluded from indexing (meta robots + sitemap). */
  noindex?: boolean;
  breadcrumbs: BreadcrumbItem[];
  jsonLd: JsonLd;
  /** Included in sitemap.xml (production only, never when noindex). */
  sitemap: boolean;
  lastmod?: string;
  /** Hero image to preload (LCP candidate). */
  preloadImage?: string;
}

/**
 * The gallery currently shows Wikimedia Commons destination photos rather
 * than GuruPriya's own yatra photos. Until real photos are added it is kept
 * out of the index (duplicate stock imagery, thin content).
 */
export const GALLERY_HAS_OWN_PHOTOS = false;

const HOME: BreadcrumbItem = { label: { en: "Home", mr: "मुख्यपृष्ठ" }, path: "/" };
const YATRAS: BreadcrumbItem = { label: { en: "Yatras", mr: "यात्रा" }, path: "/yatras" };
const BLOG: BreadcrumbItem = { label: { en: "Travel Guides", mr: "प्रवास मार्गदर्शक" }, path: "/blog" };

/** Blog posts visible in this build: published only in production; drafts too in local dev. */
export function getVisiblePosts(): BlogPost[] {
  return blogPosts
    .filter((p) => p.status === "published" || !IS_PRODUCTION)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

function page(opts: {
  path: string;
  title: string;
  description: string;
  crumbs: BreadcrumbItem[];
  image?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  extraSchema?: JsonLd[];
  pageType?: string;
  lastmod?: string;
  preloadImage?: string;
}): SeoRoute {
  const nodes: JsonLd[] = [
    webPageSchema({ path: opts.path, title: opts.title, description: opts.description, type: opts.pageType }),
    ...(opts.crumbs.length > 1 ? [breadcrumbSchema(opts.crumbs.map((c) => ({ name: c.label.en, path: c.path })))] : []),
    ...(opts.extraSchema ?? [])
  ];
  return {
    path: opts.path,
    title: opts.title,
    description: opts.description,
    image: opts.image ?? DEFAULT_OG_IMAGE,
    ogType: opts.ogType ?? "website",
    noindex: opts.noindex,
    breadcrumbs: opts.crumbs,
    jsonLd: graph(nodes),
    sitemap: !opts.noindex,
    lastmod: opts.lastmod,
    preloadImage: opts.preloadImage
  };
}

function tripDescription(slug: string, base: string): string {
  const trip = trips.find((t) => t.slug === slug)!;
  if (!isTripCompleted(trip)) return base;
  return `Completed ${trip.duration.en.replace(/\s*Days?$/i, "-day")} yatra from ${getDeparture(trip).en}. See the route, itinerary and pilgrim reviews, and enquire about our next yatra.`;
}

export function getSeoRoutes(): SeoRoute[] {
  const featured = trips.find((t) => !isTripCompleted(t)) ?? trips[0];
  const posts = getVisiblePosts();

  const routes: SeoRoute[] = [
    page({
      path: "/",
      title: "GuruPriya Tours & Travels | Pilgrimage Yatras from Latur",
      description:
        "Group pilgrimage yatras from Latur, Maharashtra: Char Dham, Kainchi Dham and more, planned by a founder with 12 years of Uttarakhand experience. Rail, bus or flight.",
      crumbs: [HOME],
      extraSchema: [travelAgencySchema(), webSiteSchema()],
      preloadImage: featured.heroImage
    }),
    page({
      path: "/yatras",
      title: "Pilgrimage Yatra Packages from Latur | GuruPriya Tours",
      description:
        "Browse GuruPriya's group pilgrimage yatras from Latur, with full routes, day-wise itineraries, inclusions and reviews. Travel by railway, bus or flight.",
      crumbs: [HOME, YATRAS],
      pageType: "CollectionPage"
    }),
    ...trips.map((trip) => {
      const path = `/yatras/${trip.slug}`;
      return page({
        path,
        title: trip.seo.title.en,
        description: tripDescription(trip.slug, trip.seo.description.en),
        crumbs: [HOME, YATRAS, { label: trip.title, path }],
        image: trip.heroImage,
        extraSchema: [touristTripSchema(trip, path)],
        preloadImage: trip.heroImage
      });
    }),
    page({
      path: "/upcoming-yatras",
      title: "Upcoming Yatras: Tirupati, Rameshwaram & Kerala | GuruPriya",
      description:
        "Yatras we're planning next: Tirupati darshan, South Indian temples, and Kanyakumari, Rameshwaram and Kerala. Register interest to hear first when dates are fixed.",
      crumbs: [HOME, { label: { en: "Upcoming Yatras", mr: "आगामी यात्रा" }, path: "/upcoming-yatras" }],
      pageType: "CollectionPage"
    }),
    page({
      path: "/about",
      title: "About GuruPriya Tours & Travels, Latur | Our Story",
      description:
        "Founded in Latur by Shri. Guruprasad Hundekar after 12 years of travel across Uttarakhand. Read the GuruPriya story, our mission and the founder's message.",
      crumbs: [HOME, { label: { en: "About Us", mr: "आमच्याबद्दल" }, path: "/about" }],
      pageType: "AboutPage",
      image: "/images/founder.jpg"
    }),
    page({
      path: "/contact",
      title: "Contact GuruPriya Tours & Travels | Yatra Enquiry, Latur",
      description:
        "Call, WhatsApp or send an enquiry to GuruPriya Tours & Travels. Office in Latur, with contact numbers in Pune, Solapur, Naldurg, Renapur and Nalegaon.",
      crumbs: [HOME, { label: { en: "Contact", mr: "संपर्क" }, path: "/contact" }],
      pageType: "ContactPage",
      extraSchema: [travelAgencySchema()]
    }),
    page({
      path: "/gallery",
      title: "Yatra Gallery | GuruPriya Tours & Travels",
      description: "Photos of the sacred destinations on GuruPriya Tours & Travels pilgrimage yatras.",
      crumbs: [HOME, { label: { en: "Gallery", mr: "गॅलरी" }, path: "/gallery" }],
      noindex: !GALLERY_HAS_OWN_PHOTOS
    }),
    page({
      path: "/faq",
      title: "Yatra FAQs: Registration, Travel Modes & Refunds | GuruPriya",
      description:
        "How to register for a GuruPriya yatra, whether the advance is refundable, choosing railway, bus or flight, and when hotel and timing details are shared.",
      crumbs: [HOME, { label: { en: "FAQ", mr: "प्रश्नोत्तरे" }, path: "/faq" }]
    }),
    page({
      path: "/terms",
      title: "Terms & Conditions | GuruPriya Tours & Travels",
      description: "Registration, payment, cancellation and itinerary terms for yatras organised by GuruPriya Tours & Travels.",
      crumbs: [HOME, { label: { en: "Terms & Conditions", mr: "नियम व अटी" }, path: "/terms" }]
    }),
    page({
      path: "/privacy",
      title: "Privacy Policy | GuruPriya Tours & Travels",
      description: "How GuruPriya Tours & Travels collects, uses and protects the details you share in an enquiry.",
      crumbs: [HOME, { label: { en: "Privacy Policy", mr: "गोपनीयता धोरण" }, path: "/privacy" }]
    })
  ];

  if (posts.length > 0) {
    routes.push(
      page({
        path: "/blog",
        title: "Pilgrimage Travel Guides & Tips | GuruPriya Tours & Travels",
        description:
          "Practical guides for pilgrims from Maharashtra: yatra routes, best seasons, registration, packing and health tips from the GuruPriya team.",
        crumbs: [HOME, BLOG],
        pageType: "CollectionPage"
      }),
      ...posts.map((post) => {
        const path = `/blog/${post.slug}`;
        return page({
          path,
          title: post.seoTitle,
          description: post.description,
          crumbs: [HOME, BLOG, { label: { en: post.title, mr: post.title }, path }],
          image: post.image.src,
          ogType: "article",
          noindex: post.status !== "published",
          extraSchema: [blogPostingSchema(post, path)],
          lastmod: post.dateModified
        });
      })
    );
  }

  return routes;
}

export const NOT_FOUND_ROUTE: SeoRoute = {
  path: "/404",
  title: `Page Not Found | ${SITE_NAME}`,
  description: "The page you are looking for could not be found.",
  image: DEFAULT_OG_IMAGE,
  ogType: "website",
  noindex: true,
  breadcrumbs: [],
  jsonLd: graph([]),
  sitemap: false
};

export function normalizePath(pathname: string): string {
  const p = pathname.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

let cache: Map<string, SeoRoute> | null = null;

export function findSeoRoute(pathname: string): SeoRoute | undefined {
  if (!cache) cache = new Map(getSeoRoutes().map((r) => [r.path, r]));
  return cache.get(normalizePath(pathname));
}

