// Tour packages.
//
// Two kinds exist and are always labelled differently in the UI:
//   - "scheduled": real GuruPriya departures with fixed dates (the yatras in
//     src/data/trips.ts, shown at /yatras/<slug>).
//   - "tailor-made": SUGGESTED itineraries (below). They have no fixed dates
//     and no prices; each is a starting point that the team customises on
//     enquiry. Inclusions are phrased as "typically included" and are always
//     confirmed in writing in the customer's quotation.
//
// OWNER REVIEW: these suggested itineraries were drafted for the website
// redesign. Review routes and inclusions against what GuruPriya can deliver;
// remove or edit any you don't want to offer.

import { trips, isTripCompleted, getDeparture, type Trip } from "@/data/trips";
import type { CategorySlug } from "./categories";

export interface TailorMadePackage {
  slug: string;
  title: string;
  destination: string; // destination slug
  image: string; // photo id
  nights: number;
  days: number;
  categories: CategorySlug[];
  route: string;
  summary: string;
}


export const tailorMadePackages: TailorMadePackage[] = [
  {
    slug: "kashmir-paradise-6n-7d",
    title: "Kashmir Paradise",
    destination: "kashmir",
    image: "kashmir-dal-lake",
    nights: 6,
    days: 7,
    categories: ["domestic", "family", "honeymoon", "senior-citizen"],
    route: "Srinagar · Gulmarg · Pahalgam · Sonamarg",
    summary: "Houseboats on Dal Lake, the gondola at Gulmarg and the valleys of Pahalgam and Sonamarg, at a comfortable pace.",
  },
  {
    slug: "shimla-manali-6n-7d",
    title: "Shimla & Manali Hills",
    destination: "himachal-pradesh",
    image: "himachal-manali",
    nights: 6,
    days: 7,
    categories: ["domestic", "family", "honeymoon", "group"],
    route: "Chandigarh · Shimla · Manali · Solang",
    summary: "Himachal's classic hill-station circuit: colonial Shimla, Kufri's snow points and the valleys around Manali.",
  },
  {
    slug: "kerala-backwaters-5n-6d",
    title: "Kerala Hills & Backwaters",
    destination: "kerala",
    image: "kerala-backwaters",
    nights: 5,
    days: 6,
    categories: ["domestic", "honeymoon", "family", "senior-citizen"],
    route: "Kochi · Munnar · Thekkady · Alleppey",
    summary: "Tea hills, spice gardens and a night on a backwater houseboat: Kerala's best-loved journey.",
  },
  {
    slug: "goa-beach-break-3n-4d",
    title: "Goa Beach Break",
    destination: "goa",
    image: "goa-palolem",
    nights: 3,
    days: 4,
    categories: ["domestic", "weekend-getaways", "family", "honeymoon", "group"],
    route: "North Goa · Old Goa · South Goa",
    summary: "Beaches, Portuguese heritage and sunset cruises: an easy long weekend from Maharashtra.",
  },
  {
    slug: "royal-rajasthan-7n-8d",
    title: "Royal Rajasthan",
    destination: "rajasthan",
    image: "rajasthan-hawa-mahal",
    nights: 7,
    days: 8,
    categories: ["domestic", "family", "group", "educational", "senior-citizen"],
    route: "Jaipur · Jodhpur · Udaipur",
    summary: "Three royal cities: Jaipur's pink palaces, Jodhpur's blue lanes beneath Mehrangarh and Udaipur's lakes.",
  },
  {
    slug: "andaman-islands-5n-6d",
    title: "Andaman Island Escape",
    destination: "andaman",
    image: "andaman-radhanagar",
    nights: 5,
    days: 6,
    categories: ["domestic", "honeymoon", "family", "adventure"],
    route: "Port Blair · Havelock · Neil Island",
    summary: "Turquoise water, coral reefs and island history across three Andaman islands.",
  },
  {
    slug: "mahabaleshwar-weekend-2n-3d",
    title: "Mahabaleshwar & Panchgani Weekend",
    destination: "maharashtra",
    image: "maharashtra-dhom-lake",
    nights: 2,
    days: 3,
    categories: ["domestic", "weekend-getaways", "family", "group"],
    route: "Pune / Latur · Panchgani · Mahabaleshwar",
    summary: "A refreshing hill-station weekend of viewpoints, strawberry farms and Venna Lake.",
  },
  {
    slug: "dubai-city-desert-4n-5d",
    title: "Dubai City & Desert",
    destination: "dubai",
    image: "dubai-skyline",
    nights: 4,
    days: 5,
    categories: ["international", "family", "honeymoon", "group"],
    route: "Dubai · Abu Dhabi",
    summary: "Skyscrapers, souks, a desert safari and a day in Abu Dhabi: an ideal first trip abroad.",
  },
  {
    slug: "thailand-phuket-krabi-5n-6d",
    title: "Thailand Islands: Phuket & Krabi",
    destination: "thailand",
    image: "thailand-phi-phi",
    nights: 5,
    days: 6,
    categories: ["international", "honeymoon", "family", "adventure"],
    route: "Phuket · Phi Phi · Krabi",
    summary: "Island hopping in the Andaman Sea, with limestone cliffs, clear lagoons and beach sunsets.",
  },
  {
    slug: "bali-escape-5n-6d",
    title: "Bali Escape",
    destination: "bali",
    image: "bali-rice-terraces",
    nights: 5,
    days: 6,
    categories: ["international", "honeymoon", "adventure"],
    route: "Ubud · Kintamani · Uluwatu · Nusa Dua",
    summary: "Rice terraces and temples in Ubud, then clifftop sunsets and beaches in the south.",
  },
  {
    slug: "singapore-malaysia-6n-7d",
    title: "Singapore & Malaysia",
    destination: "singapore",
    image: "singapore-skyline",
    nights: 6,
    days: 7,
    categories: ["international", "family", "group", "educational"],
    route: "Singapore · Kuala Lumpur · Genting",
    summary: "Two countries in one trip: Singapore's attractions, Kuala Lumpur's towers and the cool Genting Highlands.",
  },
  {
    slug: "maldives-island-retreat-4n-5d",
    title: "Maldives Island Retreat",
    destination: "maldives",
    image: "maldives-water-villas",
    nights: 4,
    days: 5,
    categories: ["international", "honeymoon"],
    route: "Malé · Resort island",
    summary: "Four nights on a coral island: lagoon villas, snorkelling and sunset cruises at a resort chosen for you.",
  }
];

/* ---------------- Unified card model (scheduled + tailor-made) -------------- */

export interface PackageCardData {
  key: string;
  href: string;
  title: string;
  image: string; // URL
  duration: string;
  location: string;
  summary: string;
  categories: CategorySlug[];
  kind: "scheduled" | "tailor-made" | "completed";
  startDate?: string;
  endDate?: string;
}

function tripCategories(trip: Trip): CategorySlug[] {
  return ["pilgrimage", "group", "domestic", "senior-citizen"];
}

export function scheduledTripCards(): PackageCardData[] {
  return trips.map((trip) => ({
    key: trip.id,
    href: `/yatras/${trip.slug}`,
    title: trip.title.en,
    image: trip.heroImage,
    duration: trip.duration.en,
    location: `From ${getDeparture(trip).en}`,
    summary: trip.subtitle.en,
    categories: tripCategories(trip),
    kind: isTripCompleted(trip) ? "completed" : "scheduled",
    startDate: trip.startDate,
    endDate: trip.endDate
  }));
}

export function tailorMadeCards(): PackageCardData[] {
  return tailorMadePackages.map((p) => ({
    key: p.slug,
    href: `/packages/${p.slug}`,
    title: p.title,
    image: `/images/photos/${p.image}-800.webp`,
    duration: `${p.nights}N / ${p.days}D`,
    location: p.route,
    summary: p.summary,
    categories: p.categories,
    kind: "tailor-made"
  }));
}

/** Upcoming scheduled departures first, then tailor-made, then completed. */
export function allPackageCards(): PackageCardData[] {
  const scheduled = scheduledTripCards();
  return [...scheduled.filter((c) => c.kind === "scheduled"), ...tailorMadeCards(), ...scheduled.filter((c) => c.kind === "completed")];
}

export function packagesForCategory(slug: CategorySlug): PackageCardData[] {
  return allPackageCards().filter((c) => c.categories.includes(slug));
}

export function packagesForDestination(slug: string): PackageCardData[] {
  const tm = tailorMadePackages.filter((p) => p.destination === slug).map((p) => tailorMadeCards().find((c) => c.key === p.slug)!);
  // Real scheduled yatras, listed on the destinations they genuinely cover.
  const TRIP_DESTINATIONS: Record<string, string[]> = {
    "uttarakhand-char-dham-2026": ["uttarakhand", "char-dham-yatra", "kashi-ayodhya-prayagraj"],
    "kainchi-dham-2027": ["uttarakhand"]
  };
  const yatra = scheduledTripCards().filter((c) => (TRIP_DESTINATIONS[c.key] ?? []).includes(slug));
  return [...yatra, ...tm];
}

export function getTailorMadePackage(slug: string): TailorMadePackage | undefined {
  return tailorMadePackages.find((p) => p.slug === slug);
}
