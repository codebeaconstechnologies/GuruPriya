// Blog / travel-guide articles.
//
// EDITORIAL RULE: every article starts as `status: "draft"`. Drafts are shown
// only in local preview (`npm run dev`, with a "Draft" banner) and are never included in the
// production build's routes, sitemap or navigation. An article goes live only
// after a human has reviewed it for accuracy and set `status: "published"`.
//
// Body text supports inline links written as [label](/path).

import { IS_PRODUCTION } from "@/config/site";

export type BlogCategory =
  | "pilgrimage-travel"
  | "travel-guides"
  | "travel-tips"
  | "family-travel"
  | "maharashtra-tourism"
  | "weekend-getaways";

export const blogCategories: Record<BlogCategory, string> = {
  "pilgrimage-travel": "Pilgrimage Travel",
  "travel-guides": "Travel Guides",
  "travel-tips": "Travel Tips",
  "family-travel": "Family Travel",
  "maharashtra-tourism": "Maharashtra Tourism",
  "weekend-getaways": "Weekend Getaways"
};

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string };

export interface BlogPost {
  slug: string;
  status: "draft" | "published";
  title: string;
  /** <title> tag — keep under ~60 characters. */
  seoTitle: string;
  /** Meta description — keep under ~155 characters. */
  description: string;
  category: BlogCategory;
  author: { name: string; title: string };
  /** ISO date (YYYY-MM-DD). Set when the article is actually published. */
  datePublished: string;
  dateModified: string;
  image: { src: string; alt: string };
  /** Trip slugs to cross-link from this article. */
  relatedTrips: string[];
  body: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "char-dham-yatra-from-latur-planning-guide",
    status: "draft",
    title: "Char Dham Yatra from Latur: Route, Season and Planning Guide",
    seoTitle: "Char Dham Yatra from Latur: Route & Planning Guide",
    description:
      "Planning the Char Dham Yatra from Latur or Marathwada? The route, best season, registration, fitness and packing tips from a group that runs the yatra.",
    category: "pilgrimage-travel",
    author: { name: "Shri. Guruprasad Hundekar", title: "Founder, GuruPriya Tours" },
    datePublished: "2026-11-15",
    dateModified: "2026-11-15",
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Kedarnath%20Temple%20in%20Rainy%20season.jpg?width=1600",
      alt: "Kedarnath Temple with the Himalayas behind it"
    },
    relatedTrips: ["premium-uttarakhand-char-dham-ancient-devasthan-darshan-yatra-2026"],
    body: [
      {
        type: "note",
        text: "DRAFT: check every fact against current Uttarakhand government guidance before publishing."
      },
      {
        type: "p",
        text: "The Char Dham Yatra of Uttarakhand covers four Himalayan shrines: Yamunotri, Gangotri, Kedarnath and Badrinath. For pilgrims from Latur and the rest of Marathwada, the journey is long. Most of the time goes on simply reaching Haridwar, the gateway to the hills. This guide explains how the route works, when to go, and how to prepare."
      },
      { type: "h2", text: "The traditional Char Dham route" },
      {
        type: "p",
        text: "The yatra is traditionally done west to east: Yamunotri first, then Gangotri, Kedarnath and finally Badrinath. From Haridwar or Rishikesh the road climbs to Barkot for Yamunotri, crosses to Uttarkashi for Gangotri, and then heads to Guptakashi and Gaurikund for Kedarnath. It ends via Joshimath (Jyotirmath) at Badrinath."
      },
      {
        type: "p",
        text: "Our [Char Dham yatra itinerary](/yatras/premium-uttarakhand-char-dham-ancient-devasthan-darshan-yatra-2026) shows the full day-by-day route from Latur, including the stops on the way there and back."
      },
      { type: "h2", text: "Best time to go" },
      {
        type: "p",
        text: "The four temples open around Akshaya Tritiya (April–May) and close for winter around Diwali (October–November). The exact dates are announced each year by the temple committees. May–June and September–October are the most popular windows. The monsoon months of July and August bring a higher risk of landslides and road closures."
      },
      { type: "h2", text: "Registration" },
      {
        type: "p",
        text: "The Uttarakhand government requires every Char Dham pilgrim to register before the journey. If you travel with an organised group, the organiser usually guides you through it. Keep a government photo ID with you throughout the trip."
      },
      { type: "h2", text: "Fitness and health" },
      {
        type: "ul",
        items: [
          "Kedarnath involves a long uphill trek from Gaurikund. Ponies, palkis and helicopter services are available for those who cannot walk the full distance.",
          "Start walking daily a few weeks before departure to build stamina.",
          "Senior citizens and anyone with heart, lung or blood-pressure conditions should consult their doctor before booking.",
          "Carry your regular medicines in hand luggage, with a copy of your prescriptions."
        ]
      },
      { type: "h2", text: "What to pack" },
      {
        type: "ul",
        items: [
          "Warm layers: a jacket, a sweater, a cap and gloves. Even in summer the shrines are cold in the early morning.",
          "A rain jacket or poncho and comfortable walking shoes with good grip.",
          "A small daypack, a water bottle, a torch and a power bank.",
          "Photo ID and your yatra registration documents."
        ]
      },
      { type: "h2", text: "Travelling from Latur" },
      {
        type: "p",
        text: "Pilgrims from Latur can reach Haridwar by railway, by road or by flight to Dehradun. GuruPriya yatras offer all three modes, so families can pick what suits their comfort and schedule. [Contact us](/contact) for package details, or see our [upcoming yatras](/upcoming-yatras)."
      }
    ]
  }
];

/** Blog posts visible in this build: published only in production; drafts too in local dev. */
export function getVisiblePosts(): BlogPost[] {
  return blogPosts
    .filter((p) => p.status === "published" || !IS_PRODUCTION)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}
