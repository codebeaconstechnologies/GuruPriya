// Travel services. Worded as assistance GuruPriya arranges; availability
// and pricing are always confirmed in the written quotation.

export interface Service {
  slug: string;
  name: { en: string; mr: string };
  icon: "bus" | "hotel" | "plane" | "route" | "users" | "briefcase" | "messages";
  image: string;
  imageAlt: string;
  short: string;
  intro: string;
  points: string[];
  relatedCategory?: string;
  seoTitle: string;
  seoDescription: string;
}

export const services: Service[] = [
  {
    slug: "bus-coach-tours",
    name: { en: "Bus & Coach Tours", mr: "बस व कोच सहली" },
    icon: "bus",
    image: "tourist-bus",
    imageAlt: "A sightseeing coach",
    short: "Comfortable coach journeys for yatras and group tours",
    intro:
      "Road journeys are part of GuruPriya's story. Many of our yatras run by travels/bus, and we arrange comfortable coaches for private groups, families and organisations, from short pilgrim-town trips to long multi-state routes.",
    points: [
      "Coaches and tempo travellers sized to your group",
      "Experienced drivers familiar with long routes",
      "Planned rest and meal stops",
      "Coordination for multi-day itineraries"
    ],
    relatedCategory: "group",
    seoTitle: "Bus & Coach Tours from Latur | Group Coach Travel",
    seoDescription: "Coach and bus tours for yatras, families and groups from Latur, with comfortable vehicles, experienced drivers and planned stops."
  },
  {
    slug: "hotel-reservations",
    name: { en: "Hotel Reservations", mr: "हॉटेल आरक्षण" },
    icon: "hotel",
    image: "udaipur-pichola-sunset",
    imageAlt: "Lake Pichola and the City Palace, Udaipur",
    short: "Stays matched to your budget and style",
    intro:
      "From simple, clean rooms near pilgrim sites to heritage palaces, houseboats and beach resorts, we shortlist stays that fit your budget, location and travel style, and book them for you.",
    points: ["Budget, comfort and premium options", "Family rooms and group blocks", "Houseboats, homestays and heritage hotels", "Written confirmation before you travel"],
    seoTitle: "Hotel Reservations for Holidays & Groups | GuruPriya",
    seoDescription: "Hotel bookings matched to your budget and travel style: family rooms, group blocks, houseboats, heritage hotels and beach resorts."
  },
  {
    slug: "flight-assistance",
    name: { en: "Flight Assistance", mr: "विमान प्रवास सहाय्य" },
    icon: "plane",
    image: "maldives-water-villas",
    imageAlt: "Island resort seen from the water",
    short: "Help choosing and booking flights",
    intro:
      "Flight options can be confusing, especially for first-time flyers and senior travellers. We compare routes and timings, book tickets as part of your package and guide you through check-in and baggage rules.",
    points: ["Domestic and international flight options", "Group bookings", "Guidance for first-time and senior flyers", "Flights combined with your holiday plan"],
    seoTitle: "Flight Booking Assistance | Domestic & International",
    seoDescription: "Help choosing and booking domestic and international flights as part of your holiday, with guidance for first-time and senior flyers."
  },
  {
    slug: "customized-itineraries",
    name: { en: "Customized Itineraries", mr: "पसंतीनुसार प्रवासक्रम" },
    icon: "route",
    image: "spiti-valley",
    imageAlt: "The Spiti valley",
    short: "Day-by-day plans built around you",
    intro:
      "Share your interests, dates and budget, and we will create a day-by-day plan with realistic travel times, the right stays and the experiences that matter to you, then refine it with you until it is right.",
    points: ["Built from your preferences", "Realistic, unhurried pacing", "Revisions until you are happy", "Any destination in India or abroad"],
    relatedCategory: "customized",
    seoTitle: "Customized Travel Itineraries | Tailor-Made Trip Planning",
    seoDescription: "Day-by-day travel itineraries built around your interests, dates and budget, for India and international destinations."
  },
  {
    slug: "group-travel",
    name: { en: "Group Travel", mr: "समूह प्रवास" },
    icon: "users",
    image: "varanasi-aarti",
    imageAlt: "Pilgrims at the Ganga aarti in Varanasi",
    short: "Families, societies, communities and friends",
    intro:
      "Travelling as a group is about the shared experience. We take care of the logistics, including transport, stays, meals and timings, so organisers can enjoy the journey too.",
    points: ["Rail blocks and coaches", "Group meals and rooming plans", "A single coordinator", "Scheduled yatras and private group tours"],
    relatedCategory: "group",
    seoTitle: "Group Travel Planning | Societies, Families & Communities",
    seoDescription: "Group travel for families, housing societies, communities and friends, with transport, stays, meals and one coordinator."
  },
  {
    slug: "corporate-travel",
    name: { en: "Corporate Travel", mr: "कॉर्पोरेट प्रवास" },
    icon: "briefcase",
    image: "mumbai-gateway",
    imageAlt: "Mumbai's waterfront",
    short: "Offsites, incentives and team travel",
    intro:
      "We coordinate team offsites, incentive trips and group business travel, covering venues, stays, transport and activities, with itemised quotations for approval.",
    points: ["Offsite venues and resorts", "Incentive trips in India and abroad", "Team transport and rooming", "Itemised quotations"],
    relatedCategory: "corporate",
    seoTitle: "Corporate Travel Services | Offsites & Incentive Trips",
    seoDescription: "Corporate travel services for team offsites, incentive trips and group business travel, with venues, transport and itemised quotes."
  },
  {
    slug: "travel-consultation",
    name: { en: "Travel Consultation", mr: "प्रवास सल्ला" },
    icon: "messages",
    image: "kashmir-dal-lake",
    imageAlt: "Shikaras on Dal Lake",
    short: "Honest advice before you decide",
    intro:
      "Not sure where to go, when, or how? Talk to us. We will recommend destinations for your month, budget and group, and explain the trade-offs honestly, with no obligation to book.",
    points: ["Where to go for your month and budget", "Train vs bus vs flight advice", "Visa and document checklists", "No-obligation advice by phone or WhatsApp"],
    seoTitle: "Travel Consultation | Free Holiday Planning Advice",
    seoDescription: "No-obligation travel advice: where to go, the best time, how to travel and what documents you need, by phone or WhatsApp."
  }
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
