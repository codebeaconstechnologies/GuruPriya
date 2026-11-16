// Destination guides. Facts are general, long-standing travel information.
// Anything that changes often (visa rules, fees, opening dates) is phrased
// as "we confirm when you enquire" rather than stated as fact.
// Long-form guide text is English; UI chrome is bilingual.

import type { CategorySlug } from "./categories";

export type Region = "north" | "south" | "west" | "east" | "international";

export const regionLabels: Record<Region, { en: string; mr: string }> = {
  north: { en: "North India", mr: "उत्तर भारत" },
  south: { en: "South India", mr: "दक्षिण भारत" },
  west: { en: "Maharashtra & West India", mr: "महाराष्ट्र व पश्चिम भारत" },
  east: { en: "East & North-East India", mr: "पूर्व व ईशान्य भारत" },
  international: { en: "International", mr: "आंतरराष्ट्रीय" }
};

export interface Destination {
  slug: string;
  name: string;
  region: Region;
  country: string;
  tagline: string;
  /** Photo library id (scripts/images/sources.json). */
  image: string;
  imageAlt: string;
  bestTime: string;
  idealDuration: string;
  categories: CategorySlug[];
}


export const destinations: Destination[] = [
  /* ------------------------------ NORTH ------------------------------ */
  {
    slug: "kashmir",
    name: "Kashmir",
    region: "north",
    country: "India",
    tagline: "Shikaras, Mughal gardens and snow-capped meadows",
    image: "kashmir-dal-lake",
    imageAlt: "Shikara boats on Dal Lake, Srinagar",
    bestTime: "March to October for gardens and meadows; December to February for snow",
    idealDuration: "5–7 days",
    categories: ["domestic", "family", "honeymoon", "senior-citizen"]
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    region: "north",
    country: "India",
    tagline: "Hill stations, high passes and mountain adventure",
    image: "himachal-manali",
    imageAlt: "Snow-capped mountains above Manali",
    bestTime: "March to June for pleasant weather; October to February for snow. July–August brings monsoon landslide risk",
    idealDuration: "6–8 days",
    categories: ["domestic", "family", "adventure", "honeymoon", "group"]
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    region: "north",
    country: "India",
    tagline: "Devbhoomi — lakes, rivers, forests and the Char Dham",
    image: "uttarakhand-nainital",
    imageAlt: "Nainital lake surrounded by hills",
    bestTime: "March to June and September to November. The Char Dham shrines are open from around April–May to October–November",
    idealDuration: "5–12 days",
    categories: ["domestic", "pilgrimage", "family", "adventure", "senior-citizen"]
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    region: "north",
    country: "India",
    tagline: "Forts, palaces, lakes and golden dunes",
    image: "rajasthan-hawa-mahal",
    imageAlt: "Hawa Mahal, Jaipur",
    bestTime: "October to March",
    idealDuration: "7–10 days",
    categories: ["domestic", "family", "honeymoon", "group", "educational", "senior-citizen"]
  },

  /* ------------------------------ SOUTH ------------------------------ */
  {
    slug: "kerala",
    name: "Kerala",
    region: "south",
    country: "India",
    tagline: "Backwaters, tea hills and tropical beaches",
    image: "kerala-backwaters",
    imageAlt: "Sunset over the Alleppey backwaters",
    bestTime: "September to March; the June–August monsoon is popular for Ayurveda",
    idealDuration: "5–7 days",
    categories: ["domestic", "honeymoon", "family", "senior-citizen"]
  },
  {
    slug: "karnataka",
    name: "Karnataka",
    region: "south",
    country: "India",
    tagline: "Hampi's ruins, Mysuru's palace and Coorg's coffee hills",
    image: "karnataka-hampi",
    imageAlt: "Krishna Pushkarani stepwell at Hampi",
    bestTime: "October to March",
    idealDuration: "5–8 days",
    categories: ["domestic", "educational", "family", "group"]
  },
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    region: "south",
    country: "India",
    tagline: "Great temples, coastal heritage and the Nilgiri hills",
    image: "tamilnadu-meenakshi",
    imageAlt: "Gopuram of the Meenakshi Amman Temple, Madurai",
    bestTime: "October to March; the hill stations are best from April to June",
    idealDuration: "6–9 days",
    categories: ["domestic", "pilgrimage", "educational", "family", "senior-citizen"]
  },

  /* ------------------------------ WEST ------------------------------ */
  {
    slug: "goa",
    name: "Goa",
    region: "west",
    country: "India",
    tagline: "Beaches, Portuguese heritage and easy-going charm",
    image: "goa-palolem",
    imageAlt: "Palolem beach, South Goa",
    bestTime: "November to February",
    idealDuration: "3–5 days",
    categories: ["domestic", "weekend-getaways", "family", "honeymoon", "group"]
  },
  {
    slug: "maharashtra",
    name: "Maharashtra",
    region: "west",
    country: "India",
    tagline: "Our home state: ghats, forts, caves and the Konkan coast",
    image: "maharashtra-ghats",
    imageAlt: "Western Ghats in the monsoon near Pen, Raigad",
    bestTime: "October to March; June to September for monsoon waterfalls and green ghats",
    idealDuration: "2–7 days",
    categories: ["domestic", "weekend-getaways", "pilgrimage", "educational", "family", "group", "corporate"]
  },
  {
    slug: "gujarat",
    name: "Gujarat",
    region: "west",
    country: "India",
    tagline: "The white desert, Asiatic lions and sacred shores",
    image: "gujarat-rann",
    imageAlt: "The white salt desert of the Great Rann of Kutch",
    bestTime: "October to March; the Rann Utsav festival runs in winter",
    idealDuration: "5–8 days",
    categories: ["domestic", "pilgrimage", "family", "educational"]
  },

  /* ------------------------------ EAST ------------------------------ */
  {
    slug: "meghalaya",
    name: "Meghalaya",
    region: "east",
    country: "India",
    tagline: "Living root bridges, waterfalls and the abode of clouds",
    image: "meghalaya-root-bridge",
    imageAlt: "Double-decker living root bridge in Meghalaya",
    bestTime: "October to April; the monsoon is spectacular but very wet",
    idealDuration: "5–6 days",
    categories: ["domestic", "adventure", "family"]
  },
  {
    slug: "sikkim",
    name: "Sikkim",
    region: "east",
    country: "India",
    tagline: "Monasteries, glacial lakes and Kanchenjunga views",
    image: "sikkim-tsomgo",
    imageAlt: "Tsomgo Lake, East Sikkim",
    bestTime: "March to May and October to December",
    idealDuration: "5–7 days",
    categories: ["domestic", "family", "honeymoon", "adventure"]
  },
  {
    slug: "andaman",
    name: "Andaman Islands",
    region: "east",
    country: "India",
    tagline: "Turquoise water, coral reefs and island history",
    image: "andaman-radhanagar",
    imageAlt: "Radhanagar beach on Havelock (Swaraj Dweep) before sunset",
    bestTime: "October to May",
    idealDuration: "5–7 days",
    categories: ["domestic", "honeymoon", "family", "adventure"]
  },

  /* ----------------------- PILGRIMAGE CIRCUITS ----------------------- */
  {
    slug: "char-dham-yatra",
    name: "Char Dham Yatra",
    region: "north",
    country: "India",
    tagline: "Yamunotri, Gangotri, Kedarnath and Badrinath in the Garhwal Himalaya",
    image: "kedarnath-temple-in-rainy-season",
    imageAlt: "Kedarnath Temple below the Himalaya",
    bestTime: "May to June and September to October; the shrines open around April–May and close around October–November",
    idealDuration: "10–12 days from Haridwar (longer from Maharashtra)",
    categories: ["pilgrimage", "domestic", "group", "senior-citizen"]
  },
  {
    slug: "kashi-ayodhya-prayagraj",
    name: "Kashi, Ayodhya & Prayagraj",
    region: "north",
    country: "India",
    tagline: "Three sacred cities on the Ganga, Saryu and Triveni Sangam",
    image: "varanasi-aarti",
    imageAlt: "Morning aarti at Assi Ghat, Varanasi",
    bestTime: "October to March",
    idealDuration: "5–7 days",
    categories: ["pilgrimage", "domestic", "group", "senior-citizen", "educational"]
  },
  {
    slug: "tirupati",
    name: "Tirupati & Tirumala",
    region: "south",
    country: "India",
    tagline: "Darshan of Lord Venkateswara on the Tirumala hills",
    image: "tirumala-090615",
    imageAlt: "The Sri Venkateswara Temple complex at Tirumala",
    bestTime: "September to February; festival weeks are very crowded",
    idealDuration: "2–4 days",
    categories: ["pilgrimage", "domestic", "family", "senior-citizen"]
  },

  /* -------------------------- INTERNATIONAL -------------------------- */
  {
    slug: "dubai",
    name: "Dubai",
    region: "international",
    country: "United Arab Emirates",
    tagline: "Skyscrapers, desert safaris and world-class shopping",
    image: "dubai-skyline",
    imageAlt: "Burj Khalifa and the Dubai skyline",
    bestTime: "November to March",
    idealDuration: "4–6 days",
    categories: ["international", "family", "honeymoon", "group", "corporate"]
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "international",
    country: "Thailand",
    tagline: "Temples, islands and street-food adventures",
    image: "thailand-phi-phi",
    imageAlt: "Limestone cliffs and turquoise water at Phi Phi Islands",
    bestTime: "November to February; the Andaman coast is best from November to April",
    idealDuration: "5–7 days",
    categories: ["international", "honeymoon", "family", "group", "adventure"]
  },
  {
    slug: "bali",
    name: "Bali",
    region: "international",
    country: "Indonesia",
    tagline: "Rice terraces, sea temples and tropical villas",
    image: "bali-rice-terraces",
    imageAlt: "Green rice terraces in Bali",
    bestTime: "April to October (dry season)",
    idealDuration: "5–7 days",
    categories: ["international", "honeymoon", "adventure"]
  },
  {
    slug: "singapore",
    name: "Singapore",
    region: "international",
    country: "Singapore",
    tagline: "A garden city of skylines, theme parks and food",
    image: "singapore-skyline",
    imageAlt: "Singapore's skyline at dusk",
    bestTime: "Year-round; February to April is usually driest",
    idealDuration: "4–5 days",
    categories: ["international", "family", "corporate", "educational"]
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    region: "international",
    country: "Malaysia",
    tagline: "Twin towers, highland escapes and island beaches",
    image: "malaysia-petronas",
    imageAlt: "Petronas Twin Towers, Kuala Lumpur",
    bestTime: "December to April for the west coast and Langkawi",
    idealDuration: "5–7 days",
    categories: ["international", "family", "honeymoon", "group"]
  },
  {
    slug: "maldives",
    name: "Maldives",
    region: "international",
    country: "Maldives",
    tagline: "Overwater villas and coral-reef lagoons",
    image: "maldives-water-villas",
    imageAlt: "Overwater villas in a Maldives lagoon",
    bestTime: "November to April",
    idealDuration: "3–5 days",
    categories: ["international", "honeymoon", "family"]
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    region: "international",
    country: "Vietnam",
    tagline: "Ha Long Bay, lantern towns and vibrant cities",
    image: "vietnam-ha-long",
    imageAlt: "Limestone islands in Ha Long Bay",
    bestTime: "February to April and October to December (varies by region)",
    idealDuration: "6–9 days",
    categories: ["international", "adventure", "honeymoon"]
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    region: "international",
    country: "Switzerland",
    tagline: "Alpine valleys, glacier views and scenic trains",
    image: "switzerland-lauterbrunnen",
    imageAlt: "The Lauterbrunnen valley from Männlichen",
    bestTime: "June to September for summer; December to March for snow",
    idealDuration: "6–9 days",
    categories: ["international", "honeymoon", "family", "senior-citizen"]
  },
  {
    slug: "europe",
    name: "Europe",
    region: "international",
    country: "Multiple countries",
    tagline: "Historic cities, art and multi-country journeys",
    image: "europe-prague",
    imageAlt: "Prague's Old Town",
    bestTime: "April to October",
    idealDuration: "10–15 days",
    categories: ["international", "honeymoon", "group", "senior-citizen"]
  }
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function destinationsByRegion(region: Region): Destination[] {
  return destinations.filter((d) => d.region === region);
}
