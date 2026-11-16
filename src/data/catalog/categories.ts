// Travel categories (tour types). Each has its own landing page at
// /tours/<slug>. "mood" tunes the hero overlay and accent so pages feel
// different (romantic, energetic, calm…) while sharing one template.

export type CategorySlug =
  | "domestic"
  | "international"
  | "family"
  | "group"
  | "pilgrimage"
  | "adventure"
  | "honeymoon"
  | "weekend-getaways"
  | "corporate"
  | "customized"
  | "senior-citizen"
  | "educational";

export type Mood = "sunset" | "ocean" | "calm" | "energy" | "romance" | "forest";

export interface Category {
  slug: CategorySlug;
  name: { en: string; mr: string };
  /** Short label for cards and menus. */
  short: string;
  tagline: string;
  image: string;
  imageAlt: string;
  mood: Mood;
}

export const categories: Category[] = [
  {
    slug: "domestic",
    name: { en: "Domestic Holidays", mr: "देशांतर्गत सहली" },
    short: "Explore India's mountains, beaches and heritage",
    tagline: "Incredible India, planned around you",
    image: "agra-taj-mahal",
    imageAlt: "The Taj Mahal, Agra",
    mood: "sunset",
  },
  {
    slug: "international",
    name: { en: "International Holidays", mr: "आंतरराष्ट्रीय सहली" },
    short: "Dubai, Southeast Asia, the Maldives and Europe",
    tagline: "Discover the world, one journey at a time",
    image: "switzerland-lauterbrunnen",
    imageAlt: "Swiss Alps above the Lauterbrunnen valley",
    mood: "ocean",
  },
  {
    slug: "family",
    name: { en: "Family Holidays", mr: "कौटुंबिक सहली" },
    short: "Comfortable trips for every generation",
    tagline: "Holidays the whole family remembers",
    image: "nilgiri-railway",
    imageAlt: "The Nilgiri Mountain Railway crossing a bridge",
    mood: "forest",
  },
  {
    slug: "group",
    name: { en: "Group Tours", mr: "समूह सहली" },
    short: "Travel together with friends, family or community",
    tagline: "Better journeys, together",
    image: "tourist-bus",
    imageAlt: "A sightseeing coach",
    mood: "sunset",
  },
  {
    slug: "pilgrimage",
    name: { en: "Pilgrimage Tours", mr: "तीर्थयात्रा" },
    short: "Char Dham, Kainchi Dham and sacred circuits",
    tagline: "Journeys of faith, planned with care",
    image: "varanasi-aarti",
    imageAlt: "Morning aarti at Assi Ghat, Varanasi",
    mood: "calm",
  },
  {
    slug: "adventure",
    name: { en: "Adventure Tours", mr: "साहसी सहली" },
    short: "Rafting, paragliding, treks and road trips",
    tagline: "Go further. Feel more alive.",
    image: "bir-paragliding",
    imageAlt: "A paraglider over the hills of Bir Billing",
    mood: "energy",
  },
  {
    slug: "honeymoon",
    name: { en: "Honeymoon Packages", mr: "हनिमून सहली" },
    short: "Romantic escapes in India and abroad",
    tagline: "The first journey of forever",
    image: "maldives-water-villas",
    imageAlt: "Overwater villas in the Maldives",
    mood: "romance",
  },
  {
    slug: "weekend-getaways",
    name: { en: "Weekend Getaways", mr: "वीकेंड सहली" },
    short: "Short breaks from Latur, Pune and Mumbai",
    tagline: "Two days. Fresh air. Full recharge.",
    image: "maharashtra-matheran",
    imageAlt: "Monsoon view from Panorama Point, Matheran",
    mood: "forest",
  },
  {
    slug: "corporate",
    name: { en: "Corporate Travel", mr: "कॉर्पोरेट प्रवास" },
    short: "Offsites, incentive trips and business travel",
    tagline: "Business travel, handled",
    image: "mumbai-gateway",
    imageAlt: "The Gateway of India and the Taj hotel, Mumbai",
    mood: "ocean",
  },
  {
    slug: "customized",
    name: { en: "Customized Tours", mr: "तुमच्या पसंतीची सहल" },
    short: "Your destination, your dates, your way",
    tagline: "Your journey. Your preferences. Your way.",
    image: "spiti-valley",
    imageAlt: "The Spiti river valley",
    mood: "sunset",
  },
  {
    slug: "senior-citizen",
    name: { en: "Senior Citizen Tours", mr: "ज्येष्ठ नागरिक सहली" },
    short: "Gentle pace, comfort and care",
    tagline: "Travel at a pace that feels right",
    image: "kerala-houseboat",
    imageAlt: "A houseboat on the Kerala backwaters",
    mood: "calm",
  },
  {
    slug: "educational",
    name: { en: "Educational Tours", mr: "शैक्षणिक सहली" },
    short: "School and college trips that inspire",
    tagline: "Learning beyond the classroom",
    image: "karnataka-hampi",
    imageAlt: "The Krishna Pushkarani at Hampi",
    mood: "forest",
  }
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** The eight categories featured on the home page. */
export const featuredCategorySlugs: CategorySlug[] = [
  "domestic",
  "international",
  "family",
  "group",
  "pilgrimage",
  "honeymoon",
  "adventure",
  "weekend-getaways"
];
