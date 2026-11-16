// Central SEO route manifest — the single source of truth for every public
// URL's title, description, canonical, social image, breadcrumbs, JSON-LD and
// sitemap inclusion. Used by:
//   - SeoManager (client-side head updates on navigation)
//   - Breadcrumbs (visible breadcrumb trail)
//   - scripts/build.mjs (prerendered per-route HTML <head>, sitemap.xml)
//
// Metadata is English (English is the default site language; Marathi is a
// visitor toggle on the same URLs).

import { trips, isTripCompleted, getDeparture, type LocalizedText } from "@/data/trips";
import { getVisiblePosts } from "@/data/blog";
export { getVisiblePosts };
import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/config/site";
import {
  graph,
  travelAgencySchema,
  webSiteSchema,
  webPageSchema,
  breadcrumbSchema,
  touristTripSchema,
  blogPostingSchema,
  touristDestinationSchema,
  tailorMadeTripSchema,
  serviceSchema,
  type JsonLd
} from "./schema";
import { categories } from "@/data/catalog/categories";
import { categoryDetails } from "@/data/catalog/categoryDetails";
import { destinationDetails } from "@/data/catalog/destinationDetails";
import { packageDetails } from "@/data/catalog/packageDetails";
import { destinations } from "@/data/catalog/destinations";
import { tailorMadePackages } from "@/data/catalog/packages";
import { services } from "@/data/catalog/services";
import { photo } from "@/utils/images";

/** Keep meta descriptions within ~158 characters, cutting at a word. */
function clip(text: string, max = 158): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

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
const PILGRIMAGE: BreadcrumbItem = { label: { en: "Pilgrimage Tours", mr: "तीर्थयात्रा" }, path: "/tours/pilgrimage" };
const PACKAGES: BreadcrumbItem = { label: { en: "Tour Packages", mr: "टूर पॅकेजेस" }, path: "/packages" };
const DESTINATIONS: BreadcrumbItem = { label: { en: "Destinations", mr: "पर्यटन स्थळे" }, path: "/destinations" };
const SERVICES: BreadcrumbItem = { label: { en: "Travel Services", mr: "प्रवास सेवा" }, path: "/services" };
const BLOG: BreadcrumbItem = { label: { en: "Travel Guides", mr: "प्रवास मार्गदर्शक" }, path: "/blog" };


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
  const posts = getVisiblePosts();
  const hasPublished = posts.some((p) => p.status === "published");

  const routes: SeoRoute[] = [
    page({
      path: "/",
      title: "GuruPriya Tours | Holidays, Group Tours & Yatras",
      description:
        "Domestic and international holidays, family trips, honeymoons, group tours and pilgrimage yatras from Latur, Maharashtra. Tailor-made plans by rail, coach or flight.",
      crumbs: [HOME],
      extraSchema: [travelAgencySchema(), webSiteSchema()],
      preloadImage: photo("switzerland-lauterbrunnen")
    }),
    page({
      path: "/about",
      title: "About GuruPriya Tours, Latur | Our Story",
      description:
        "How one traveller's years on Uttarakhand's mountain roads became GuruPriya Tours: our story, vision, mission and the founder's message.",
      crumbs: [HOME, { label: { en: "About Us", mr: "आमच्याबद्दल" }, path: "/about" }],
      pageType: "AboutPage",
      image: "/images/founder.jpg",
      preloadImage: photo("uttarakhand-nainital")
    }),
    page({
      path: "/packages",
      title: "Tour Packages from Latur & Pune | India & International",
      description:
        "Scheduled group departures and tailor-made itineraries: Kashmir, Kerala, Goa, Rajasthan, Andaman, Dubai, Thailand, Bali, Singapore, the Maldives and yatras.",
      crumbs: [HOME, PACKAGES],
      pageType: "CollectionPage",
      preloadImage: photo("thailand-phi-phi")
    }),
    ...tailorMadePackages.map((p) => {
      const path = `/packages/${p.slug}`;
      return page({
        path,
        title: `${p.title} ${p.nights}N/${p.days}D Itinerary | GuruPriya`,
        description: clip(`${p.summary} Tailor-made ${p.nights}-night itinerary: ${p.route}. Details and quotation on enquiry.`),
        crumbs: [HOME, PACKAGES, { label: { en: p.title, mr: p.title }, path }],
        image: photo(p.image),
        extraSchema: [tailorMadeTripSchema({ ...p, ...packageDetails[p.slug], image: photo(p.image) }, path)],
        preloadImage: photo(p.image)
      });
    }),
    ...categories.map((c) => {
      const path = `/tours/${c.slug}`;
      return page({
        path,
        title: categoryDetails[c.slug].seoTitle,
        description: categoryDetails[c.slug].seoDescription,
        crumbs: [HOME, PACKAGES, { label: c.name, path }],
        image: photo(c.image),
        pageType: "CollectionPage",
        preloadImage: photo(c.image)
      });
    }),
    ...trips.map((trip) => {
      const path = `/yatras/${trip.slug}`;
      return page({
        path,
        title: trip.seo.title.en,
        description: tripDescription(trip.slug, trip.seo.description.en),
        crumbs: [HOME, PILGRIMAGE, { label: trip.title, path }],
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
      crumbs: [HOME, PILGRIMAGE, { label: { en: "Upcoming Yatras", mr: "आगामी यात्रा" }, path: "/upcoming-yatras" }],
      pageType: "CollectionPage",
      preloadImage: photo("tamilnadu-meenakshi")
    }),
    page({
      path: "/destinations",
      title: "Travel Destinations in India & Abroad | GuruPriya Guides",
      description:
        "Destination guides for Kashmir, Himachal, Uttarakhand, Kerala, Goa, Rajasthan, Maharashtra, Dubai, Thailand, Bali, Singapore, the Maldives, Europe and more.",
      crumbs: [HOME, DESTINATIONS],
      pageType: "CollectionPage",
      preloadImage: photo("switzerland-lauterbrunnen")
    }),
    ...destinations.map((d) => {
      const path = `/destinations/${d.slug}`;
      return page({
        path,
        // Keep titles within ~60 characters so Google doesn't truncate them.
        title: `${d.name} Travel Guide & Tour Packages | GuruPriya`.length <= 60 ? `${d.name} Travel Guide & Tour Packages | GuruPriya` : `${d.name} Travel Guide | GuruPriya`,
        description: clip(`${d.tagline}. Best time: ${d.bestTime.split(";")[0]}. Ideal trip: ${d.idealDuration}. Attractions, tips and tailor-made trips.`),
        crumbs: [HOME, DESTINATIONS, { label: { en: d.name, mr: d.name }, path }],
        image: photo(d.image),
        extraSchema: [touristDestinationSchema({ ...d, ...destinationDetails[d.slug], image: photo(d.image) }, path)],
        preloadImage: photo(d.image)
      });
    }),
    page({
      path: "/services",
      title: "Travel Services | Coaches, Hotels, Flights & Itineraries",
      description:
        "Bus and coach tours, hotel reservations, flight assistance, customized itineraries, group and corporate travel, and travel consultation from GuruPriya.",
      crumbs: [HOME, SERVICES],
      pageType: "CollectionPage",
      preloadImage: photo("tourist-bus")
    }),
    ...services.map((sv) => {
      const path = `/services/${sv.slug}`;
      return page({
        path,
        title: sv.seoTitle,
        description: sv.seoDescription,
        crumbs: [HOME, SERVICES, { label: sv.name, path }],
        image: photo(sv.image),
        extraSchema: [serviceSchema({ name: sv.name.en, description: sv.seoDescription }, path)],
        preloadImage: photo(sv.image)
      });
    }),
    page({
      path: "/contact",
      title: "Contact GuruPriya Tours | Plan Your Trip, Latur",
      description:
        "Call, WhatsApp or send an enquiry to GuruPriya Tours. Office in Latur, with contact numbers in Pune, Solapur, Naldurg, Renapur and Nalegaon.",
      crumbs: [HOME, { label: { en: "Contact", mr: "संपर्क" }, path: "/contact" }],
      pageType: "ContactPage",
      extraSchema: [travelAgencySchema()],
      preloadImage: photo("kerala-houseboat")
    }),
    page({
      path: "/gallery",
      title: "Travel Gallery: Mountains, Beaches & Journeys | GuruPriya",
      description: "Photographs of mountains, beaches, road trips, pilgrim towns and international destinations we can take you to.",
      crumbs: [HOME, { label: { en: "Gallery", mr: "गॅलरी" }, path: "/gallery" }],
      noindex: !GALLERY_HAS_OWN_PHOTOS
    }),
    page({
      path: "/faq",
      title: "Travel FAQs: Booking, Travel Modes & Refunds | GuruPriya",
      description:
        "How to book a GuruPriya tour or yatra, whether the advance is refundable, choosing railway, bus or flight, and when hotel and timing details are shared.",
      crumbs: [HOME, { label: { en: "FAQ", mr: "प्रश्नोत्तरे" }, path: "/faq" }]
    }),
    page({
      path: "/terms",
      title: "Terms & Conditions | GuruPriya Tours",
      description: "Registration, payment, cancellation and itinerary terms for tours and yatras organised by GuruPriya Tours.",
      crumbs: [HOME, { label: { en: "Terms & Conditions", mr: "नियम व अटी" }, path: "/terms" }]
    }),
    page({
      path: "/privacy",
      title: "Privacy Policy | GuruPriya Tours",
      description: "How GuruPriya Tours collects, uses and protects the details you share in an enquiry.",
      crumbs: [HOME, { label: { en: "Privacy Policy", mr: "गोपनीयता धोरण" }, path: "/privacy" }]
    }),
    page({
      path: "/image-credits",
      title: "Image Credits | GuruPriya Tours",
      description: "Photographers and licences for the destination photographs used on the GuruPriya Tours website.",
      crumbs: [HOME, { label: { en: "Image credits", mr: "छायाचित्र श्रेय" }, path: "/image-credits" }],
      noindex: true
    }),
    // The blog index always exists (it is in the main menu); it stays out of
    // the index until at least one reviewed article is published.
    page({
      path: "/blog",
      title: "Travel Guides & Tips | GuruPriya Tours",
      description:
        "Practical travel guides from the GuruPriya team: routes, best seasons, packing, health and planning tips for holidays and yatras.",
      crumbs: [HOME, BLOG],
      pageType: "CollectionPage",
      noindex: !hasPublished
    })
  ];

  routes.push(
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

