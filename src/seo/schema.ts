// schema.org JSON-LD builders.
//
// Only verified business facts are emitted. Deliberately NOT emitted:
// - AggregateRating / Review: current reviews are samples, and self-serving
//   reviews on a business's own site are not eligible for review snippets.
// - Offer / price / Product: the business never publishes prices.
// - FAQPage: Google limits FAQ rich results to authoritative government and
//   health sites (since Aug 2023), so the markup would add nothing here.

import { company } from "@/data/trips";
import type { Trip } from "@/data/trips";
import type { BlogPost } from "@/data/blog";
import { SITE_NAME, SITE_URL, SOCIAL_PROFILES, absoluteUrl } from "@/config/site";

export type JsonLd = Record<string, unknown>;

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const toE164 = (digits: string) => `+91-${digits}`;

function postalAddress() {
  const a = company.address;
  return {
    "@type": "PostalAddress",
    streetAddress: a.streetAddress,
    addressLocality: a.addressLocality,
    addressRegion: a.addressRegion,
    ...(a.postalCode ? { postalCode: a.postalCode } : {}),
    addressCountry: a.addressCountry
  };
}

/** TravelAgency (a LocalBusiness subtype) for the registered Latur office. */
export function travelAgencySchema(): JsonLd {
  const sameAs = [...SOCIAL_PROFILES, ...(company.googleBusinessProfileUrl ? [company.googleBusinessProfileUrl] : [])];
  return {
    "@type": "TravelAgency",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: company.name.mr,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") },
    image: absoluteUrl("/images/logo.png"),
    description: company.description.en,
    slogan: company.tagline.en,
    telephone: toE164(company.founder.phones[0]),
    address: postalAddress(),
    areaServed: { "@type": "State", name: "Maharashtra" },
    knowsLanguage: ["mr", "en", "hi"],
    founder: { "@type": "Person", name: company.founder.name.en, jobTitle: company.founder.title.en },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: toE164(company.founder.phones[0]),
        areaServed: "IN",
        availableLanguage: ["Marathi", "English", "Hindi"]
      }
    ],
    ...(sameAs.length ? { sameAs } : {})
  };
}

export function webSiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: ["mr", "en"],
    publisher: { "@id": ORG_ID }
  };
}

export function webPageSchema(opts: { path: string; title: string; description: string; type?: string }): JsonLd {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID }
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path)
    }))
  };
}

/** TouristTrip for a yatra. No offers/price (prices are never published). */
export function touristTripSchema(trip: Trip, path: string): JsonLd {
  const pointsById = new Map(trip.routePoints.map((p) => [p.id, p]));
  const orderedStops: string[] = [];
  for (const day of trip.itinerary) for (const id of day.locations) if (!orderedStops.includes(id)) orderedStops.push(id);
  const stops = (orderedStops.length ? orderedStops : trip.routePoints.map((p) => p.id))
    .map((id) => pointsById.get(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .filter((p) => p.category !== "route");

  return {
    "@type": "TouristTrip",
    "@id": `${absoluteUrl(path)}#trip`,
    name: trip.title.en,
    description: trip.description.en,
    url: absoluteUrl(path),
    image: absoluteUrl(trip.heroImage),
    touristType: ["Pilgrims", "Families", "Senior citizens"],
    provider: { "@id": ORG_ID },
    // Note: no Event markup for departure dates — Google's event guidelines
    // explicitly exclude travel packages from Event structured data.
    itinerary: {
      "@type": "ItemList",
      numberOfItems: stops.length,
      itemListElement: stops.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "TouristDestination",
          name: p.name.en,
          ...(p.lat !== undefined && p.lng !== undefined
            ? { geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng } }
            : {})
        }
      }))
    }
  };
}

/** A destination guide page. */
export function touristDestinationSchema(d: { name: string; tagline: string; image: string; attractions: { name: string }[]; country: string }, path: string): JsonLd {
  return {
    "@type": "TouristDestination",
    "@id": `${absoluteUrl(path)}#destination`,
    name: d.name,
    description: d.tagline,
    url: absoluteUrl(path),
    image: absoluteUrl(d.image),
    ...(d.country === "India" || d.country === "Multiple countries" ? {} : { containedInPlace: { "@type": "Country", name: d.country } }),
    includesAttraction: d.attractions.map((a) => ({ "@type": "TouristAttraction", name: a.name }))
  };
}

/** A tailor-made (suggested) itinerary. No offers/price — prices are never published. */
export function tailorMadeTripSchema(p: { title: string; summary: string; image: string; itinerary: { title: string }[] }, path: string): JsonLd {
  return {
    "@type": "TouristTrip",
    "@id": `${absoluteUrl(path)}#trip`,
    name: p.title,
    description: p.summary,
    url: absoluteUrl(path),
    image: absoluteUrl(p.image),
    provider: { "@id": ORG_ID },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: p.itinerary.length,
      itemListElement: p.itinerary.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: `Day ${i + 1}: ${d.title}` }))
    }
  };
}

export function serviceSchema(s: { name: string; description: string }, path: string): JsonLd {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: s.name,
    description: s.description,
    serviceType: s.name,
    url: absoluteUrl(path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "India" }
  };
}

export function blogPostingSchema(post: BlogPost, path: string): JsonLd {
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image.src),
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { "@type": "Person", name: post.author.name, jobTitle: post.author.title },
    publisher: { "@id": ORG_ID },
    inLanguage: "en"
  };
}

export function graph(nodes: JsonLd[]): JsonLd {
  return { "@context": "https://schema.org", "@graph": nodes };
}
