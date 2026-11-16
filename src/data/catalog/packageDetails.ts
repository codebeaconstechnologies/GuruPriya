// Itineraries and inclusions for tailor-made packages, loaded only by
// /packages/<slug> pages (and the SEO manifest at build time).

export interface PackageDetails {
  highlights: string[];
  itinerary: { title: string; text: string }[];
  inclusions: string[];
  exclusions: string[];
}

const STANDARD_INCLUSIONS = [
  "Hotel accommodation on twin/double sharing",
  "Daily breakfast (more meals on request)",
  "All transfers and sightseeing by private vehicle",
  "Sightseeing as per the itinerary"
];
const STANDARD_EXCLUSIONS = [
  "Train or air tickets to the starting point (quoted separately on request)",
  "Entry tickets, activities and personal expenses unless stated",
  "Travel insurance",
  "Anything not mentioned in your written quotation"
];
const INTL_EXCLUSIONS = [
  "International flights (quoted separately on request)",
  "Visa fees and travel insurance",
  "Personal expenses, tips and optional activities",
  "Anything not mentioned in your written quotation"
];

export const packageDetails: Record<string, PackageDetails> = {
  "kashmir-paradise-6n-7d": {
      highlights: ["Shikara ride and a houseboat night", "Mughal Gardens", "Gulmarg gondola (subject to weather)", "Betaab Valley, Pahalgam"],
      itinerary: [
        { title: "Arrive in Srinagar", text: "Transfer to your houseboat on Dal Lake, then an evening shikara ride." },
        { title: "Srinagar sightseeing", text: "Nishat and Shalimar Mughal gardens, and the old city." },
        { title: "Gulmarg", text: "Day trip to the alpine meadow; optional gondola ride." },
        { title: "Pahalgam", text: "Drive through saffron fields to the Lidder valley." },
        { title: "Pahalgam valleys", text: "Betaab Valley and Aru, or a pony ride." },
        { title: "Sonamarg", text: "Day trip to the 'meadow of gold' and the Thajiwas glacier viewpoint." },
        { title: "Depart Srinagar", text: "Transfer to the airport for your onward journey." }
      ],
      inclusions: [...STANDARD_INCLUSIONS, "One night on a Dal Lake houseboat"],
      exclusions: STANDARD_EXCLUSIONS
  },
  "shimla-manali-6n-7d": {
      highlights: ["Mall Road and the Ridge, Shimla", "Kufri", "Hadimba Temple and Old Manali", "Solang Valley and the Atal Tunnel"],
      itinerary: [
        { title: "Chandigarh to Shimla", text: "Scenic drive into the hills; evening on Mall Road." },
        { title: "Shimla & Kufri", text: "Kufri snow point and Shimla's heritage buildings." },
        { title: "Shimla to Manali", text: "Drive along the Beas river via the Kullu valley." },
        { title: "Manali", text: "Hadimba Temple, Vashisht hot springs and Old Manali." },
        { title: "Solang & Atal Tunnel", text: "Adventure activities at Solang; through the tunnel to Sissu (subject to conditions)." },
        { title: "Manali at leisure", text: "A free day for cafés, shopping or river rafting in Kullu." },
        { title: "Depart", text: "Return drive to Chandigarh for your onward journey." }
      ],
      inclusions: STANDARD_INCLUSIONS,
      exclusions: STANDARD_EXCLUSIONS
  },
  "kerala-backwaters-5n-6d": {
      highlights: ["Fort Kochi's fishing nets", "Munnar tea estates", "Periyar lake, Thekkady", "Overnight houseboat cruise"],
      itinerary: [
        { title: "Arrive in Kochi", text: "Fort Kochi, the Chinese fishing nets and an evening cultural show." },
        { title: "Kochi to Munnar", text: "Drive past waterfalls into tea country." },
        { title: "Munnar", text: "Tea estates, Mattupetty dam and Eravikulam National Park." },
        { title: "Thekkady", text: "Spice plantation walk and optional boating on Periyar lake." },
        { title: "Alleppey houseboat", text: "Board your houseboat and cruise the backwaters overnight." },
        { title: "Depart", text: "Disembark and transfer to Kochi for your onward journey." }
      ],
      inclusions: [...STANDARD_INCLUSIONS, "One night on a houseboat with meals on board"],
      exclusions: STANDARD_EXCLUSIONS
  },
  "goa-beach-break-3n-4d": {
      highlights: ["North Goa beaches", "Basilica of Bom Jesus", "Mandovi river cruise", "South Goa's quieter coves"],
      itinerary: [
        { title: "Arrive in Goa", text: "Check in and spend the evening at the beach." },
        { title: "North Goa", text: "Fort Aguada, Calangute, Baga and Anjuna." },
        { title: "Old Goa & South Goa", text: "Heritage churches, then Colva or Palolem; evening river cruise." },
        { title: "Depart", text: "Leisure time and departure." }
      ],
      inclusions: STANDARD_INCLUSIONS,
      exclusions: STANDARD_EXCLUSIONS
  },
  "royal-rajasthan-7n-8d": {
      highlights: ["Amber Fort and Hawa Mahal", "Mehrangarh Fort", "Lake Pichola boat ride", "Udaipur City Palace"],
      itinerary: [
        { title: "Arrive in Jaipur", text: "Check in; evening at a local bazaar." },
        { title: "Jaipur", text: "Amber Fort, City Palace, Jantar Mantar and Hawa Mahal." },
        { title: "Jaipur to Jodhpur", text: "Drive to the Blue City." },
        { title: "Jodhpur", text: "Mehrangarh Fort, Jaswant Thada and the clock-tower market." },
        { title: "Jodhpur to Udaipur", text: "Via the Ranakpur Jain temples." },
        { title: "Udaipur", text: "City Palace, Saheliyon ki Bari and a sunset boat ride on Lake Pichola." },
        { title: "Udaipur at leisure", text: "Free day, or a day trip to Kumbhalgarh." },
        { title: "Depart", text: "Transfer for your onward journey." }
      ],
      inclusions: STANDARD_INCLUSIONS,
      exclusions: STANDARD_EXCLUSIONS
  },
  "andaman-islands-5n-6d": {
      highlights: ["Cellular Jail light-and-sound show", "Radhanagar Beach", "Snorkelling at Elephant Beach", "Neil Island's natural bridge"],
      itinerary: [
        { title: "Arrive in Port Blair", text: "Cellular Jail and the evening light-and-sound show." },
        { title: "Havelock", text: "Ferry to Havelock; sunset at Radhanagar Beach." },
        { title: "Elephant Beach", text: "Snorkelling and water activities (subject to sea conditions)." },
        { title: "Neil Island", text: "Ferry to Neil; Laxmanpur and Bharatpur beaches." },
        { title: "Back to Port Blair", text: "Return ferry; Ross Island or Corbyn's Cove." },
        { title: "Depart", text: "Transfer to the airport." }
      ],
      inclusions: [...STANDARD_INCLUSIONS, "Inter-island ferry tickets"],
      exclusions: STANDARD_EXCLUSIONS
  },
  "mahabaleshwar-weekend-2n-3d": {
      highlights: ["Arthur's Seat and Wilson Point", "Venna Lake", "Table Land, Panchgani", "Strawberry farms (in season)"],
      itinerary: [
        { title: "Drive to Panchgani", text: "Table Land and Sydney Point on the way to Mahabaleshwar." },
        { title: "Mahabaleshwar", text: "Viewpoints, Venna Lake boating and the old temple." },
        { title: "Return", text: "Pratapgad Fort on request, then the drive home." }
      ],
      inclusions: ["Hotel stay on twin/double sharing", "Daily breakfast", "Private vehicle from your city", "Sightseeing as per the itinerary"],
      exclusions: ["Lunch and dinner unless requested", "Entry tickets and activities", "Personal expenses"]
  },
  "dubai-city-desert-4n-5d": {
      highlights: ["Burj Khalifa", "Desert safari with dinner", "Dhow cruise", "Sheikh Zayed Grand Mosque, Abu Dhabi"],
      itinerary: [
        { title: "Arrive in Dubai", text: "Transfer to your hotel; evening dhow cruise with dinner." },
        { title: "Dubai city tour", text: "Old Dubai, the souks, Dubai Mall and the Burj Khalifa." },
        { title: "Desert safari", text: "Free morning; afternoon dune drive, camel ride and camp dinner." },
        { title: "Abu Dhabi", text: "Sheikh Zayed Grand Mosque and city highlights." },
        { title: "Depart", text: "Shopping time, then transfer to the airport." }
      ],
      inclusions: ["Hotel accommodation with breakfast", "Airport and sightseeing transfers", "Sightseeing as per the itinerary", "Visa assistance"],
      exclusions: INTL_EXCLUSIONS
  },
  "thailand-phuket-krabi-5n-6d": {
      highlights: ["Phi Phi Islands by speedboat", "Phuket's Big Buddha and Old Town", "Krabi four-island tour", "Beach sunsets"],
      itinerary: [
        { title: "Arrive in Phuket", text: "Transfer to your hotel; evening at Patong." },
        { title: "Phi Phi Islands", text: "Full-day speedboat tour (subject to sea conditions)." },
        { title: "Phuket city tour", text: "Big Buddha, Wat Chalong and Old Phuket Town." },
        { title: "Phuket to Krabi", text: "Transfer to Ao Nang." },
        { title: "Krabi islands", text: "Four-island tour by longtail or speedboat." },
        { title: "Depart", text: "Transfer to the airport." }
      ],
      inclusions: ["Hotel accommodation with breakfast", "Transfers between hotels and airports", "Island tours as per the itinerary", "Visa guidance"],
      exclusions: INTL_EXCLUSIONS
  },
  "bali-escape-5n-6d": {
      highlights: ["Tegallalang rice terraces", "Kintamani volcano views", "Uluwatu temple and Kecak dance", "Beach time at Nusa Dua"],
      itinerary: [
        { title: "Arrive in Bali", text: "Transfer to Ubud." },
        { title: "Ubud", text: "Rice terraces, the Monkey Forest and art villages." },
        { title: "Kintamani", text: "Volcano views and coffee plantations." },
        { title: "To the south coast", text: "Tanah Lot, then on to your beach hotel." },
        { title: "Uluwatu", text: "Beach day, then the clifftop temple and Kecak dance at sunset." },
        { title: "Depart", text: "Transfer to the airport." }
      ],
      inclusions: ["Hotel or villa accommodation with breakfast", "Private transfers and sightseeing", "Sightseeing as per the itinerary", "Visa guidance"],
      exclusions: INTL_EXCLUSIONS
  },
  "singapore-malaysia-6n-7d": {
      highlights: ["Gardens by the Bay", "Sentosa and Universal Studios", "Petronas Twin Towers", "Genting cable car"],
      itinerary: [
        { title: "Arrive in Singapore", text: "Evening at Marina Bay and the light show." },
        { title: "Sentosa", text: "Universal Studios or Sentosa attractions." },
        { title: "Singapore city", text: "City tour, Gardens by the Bay and the Night Safari." },
        { title: "To Kuala Lumpur", text: "Coach or short flight to KL." },
        { title: "Kuala Lumpur", text: "Petronas Towers, Batu Caves and the city tour." },
        { title: "Genting Highlands", text: "Cable car and theme parks." },
        { title: "Depart", text: "Transfer to the airport." }
      ],
      inclusions: ["Hotel accommodation with breakfast", "Transfers and Singapore–KL travel", "Sightseeing as per the itinerary", "Visa assistance"],
      exclusions: INTL_EXCLUSIONS
  },
  "maldives-island-retreat-4n-5d": {
      highlights: ["Beach or overwater villa", "House-reef snorkelling", "Sunset dolphin cruise", "Candlelit beach dinner (on request)"],
      itinerary: [
        { title: "Arrive in Malé", text: "Speedboat or seaplane transfer to your resort." },
        { title: "Island day", text: "Snorkelling and leisure." },
        { title: "Excursions", text: "Sandbank picnic or dolphin cruise." },
        { title: "At leisure", text: "Spa, water sports or simply relaxing." },
        { title: "Depart", text: "Transfer back to Malé." }
      ],
      inclusions: ["Resort accommodation with your chosen meal plan", "Resort transfers (speedboat or seaplane, by resort)", "Visa guidance"],
      exclusions: INTL_EXCLUSIONS
  }
};
