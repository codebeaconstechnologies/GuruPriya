// Long-form destination guide content, loaded only by destination pages
// (and the SEO manifest at build time). Light card data is in destinations.ts.
import { commonsImage, photo } from "@/utils/images";

export interface DestinationDetails {
  /** Extra photos (full URLs). */
  gallery?: { src: string; alt: string }[];
  intro: string[];
  attractions: { name: string; note: string }[];
  experiences: string[];
  tips: string[];
  faqs: { q: string; a: string }[];
}

const CONFIRM = "We confirm the current requirements for your travel dates when you enquire.";

export const destinationDetails: Record<string, DestinationDetails> = {
  "kashmir": {
      intro: [
        "Kashmir has some of India's most celebrated scenery. You can glide across Dal Lake in a shikara, walk through terraced Mughal gardens and stand in high-altitude meadows framed by the Himalaya.",
        "A typical holiday combines Srinagar with the hill resorts of Gulmarg, Pahalgam and Sonamarg. The valley works for families, couples and first-time mountain travellers alike."
      ],
      attractions: [
        { name: "Dal Lake, Srinagar", note: "Shikara rides and an overnight stay on a traditional houseboat" },
        { name: "Mughal Gardens", note: "Nishat Bagh and Shalimar Bagh, laid out in terraces above the lake" },
        { name: "Gulmarg", note: "Alpine meadow known for its gondola and winter snow" },
        { name: "Pahalgam", note: "Lidder river valley with Betaab Valley and Aru nearby" },
        { name: "Sonamarg", note: "'Meadow of gold', the gateway to the Thajiwas glacier" }
      ],
      experiences: ["Houseboat stay on Dal Lake", "Gondola ride in Gulmarg", "Pony rides through Pahalgam's valleys", "Shopping for pashmina and dry fruits"],
      tips: [
        "Carry warm layers in every season. Evenings are cool even in summer.",
        "Prepaid mobile connections from other states do not work in Jammu & Kashmir, so carry a postpaid number.",
        "Snow activities depend on the weather, so keep a flexible day in your plan."
      ],
      faqs: [
        { q: "Is Kashmir suitable for a family holiday?", a: "Yes. Distances between Srinagar, Gulmarg and Pahalgam are manageable by road, and most sightseeing needs little walking." },
        { q: "How do we reach Kashmir from Maharashtra?", a: "Most travellers fly to Srinagar, usually with one connection. Rail and road options via Jammu are also possible." }
      ]
  },
  "himachal-pradesh": {
      gallery: [
        { src: photo("spiti-valley"), alt: "Spiti river valley" },
        { src: photo("bir-paragliding"), alt: "Paragliding over Bir Billing" },
        { src: photo("hero-spiti-road"), alt: "Mountain highway in Spiti" }
      ],
      intro: [
        "From the colonial charm of Shimla to the pine forests of Manali and the stark high desert of Spiti, Himachal Pradesh packs remarkable variety into one state.",
        "It suits families on a classic hill-station holiday as much as adventure travellers chasing paragliding, rafting and high-altitude road journeys."
      ],
      attractions: [
        { name: "Shimla & Kufri", note: "The Mall Road, the Ridge and nearby snow points" },
        { name: "Manali", note: "Hadimba Temple, Old Manali and the Beas river" },
        { name: "Solang Valley & Atal Tunnel", note: "Adventure sports and the drive to Sissu in Lahaul" },
        { name: "Dharamshala & McLeod Ganj", note: "Tibetan culture beneath the Dhauladhar range" },
        { name: "Spiti Valley", note: "Key Monastery, Chandratal and dramatic high-desert roads" },
        { name: "Bir Billing", note: "One of India's best-known paragliding sites" }
      ],
      experiences: ["Paragliding at Bir or Solang", "A road journey through the Atal Tunnel", "Monastery visits in Spiti", "Riverside camps in Kasol and Kullu"],
      tips: [
        "Spiti and Lahaul are high-altitude regions, so build in a rest day to acclimatise.",
        "Some routes, such as Rohtang Pass, need permits or have seasonal closures.",
        "Mountain roads take longer than distances suggest, so plan for shorter driving days."
      ],
      faqs: [
        { q: "Will we see snow in Himachal?", a: "Snow is most likely from December to February at Kufri, Solang and Sissu, though it depends on each season's weather." },
        { q: "Is Spiti suitable for elderly travellers?", a: "Spiti's altitude and long drives make it demanding. Shimla, Manali and Dharamshala are gentler alternatives." }
      ]
  },
  "uttarakhand": {
      gallery: [
        { src: commonsImage("Kedarnath Temple in Rainy season.jpg", 1600), alt: "Kedarnath Temple" },
        { src: commonsImage("Badrinath Temple , Uttarakhand.jpg", 1600), alt: "Badrinath Temple" },
        { src: photo("rishikesh-rafting"), alt: "River rafting near Rishikesh" },
        { src: commonsImage("Lakshman Jhula Hanging Bridge, Rishikesh, India.jpg", 1600), alt: "Lakshman Jhula, Rishikesh" },
        { src: commonsImage("Mana Village, Badrinath, Uttarakhand, India.jpeg", 1600), alt: "Mana Village near Badrinath" }
      ],
      intro: [
        "Uttarakhand is where the Ganga leaves the mountains. It is home to the Char Dham shrines, the lakes of Nainital, the ashrams of Rishikesh and some of India's finest Himalayan views.",
        "Our founder's own years of travel here shaped how GuruPriya plans journeys. It is a state we know well, whether you come for a yatra, a family break or adventure."
      ],
      attractions: [
        { name: "Rishikesh & Haridwar", note: "Ganga Aarti, ghats, ashrams and river rafting" },
        { name: "Nainital", note: "Boating on Naini Lake, Naina Devi temple and Snow View" },
        { name: "Kainchi Dham", note: "Neem Karoli Baba's ashram, near Nainital" },
        { name: "Char Dham", note: "Yamunotri, Gangotri, Kedarnath and Badrinath" },
        { name: "Mussoorie", note: "The 'Queen of the Hills' above Dehradun" },
        { name: "Jim Corbett National Park", note: "India's oldest national park, famous for tigers" }
      ],
      experiences: ["Ganga Aarti at Har Ki Pauri", "White-water rafting in Rishikesh", "Jungle safari in Corbett", "Sunrise views of the Himalaya"],
      tips: [
        "Char Dham pilgrims must register with the Uttarakhand government before travelling.",
        "Avoid July–August in the high mountains because of landslide risk.",
        "Carry warm clothing for Kedarnath and Badrinath even in summer."
      ],
      faqs: [
        { q: "Do you organise Char Dham Yatra?", a: "Yes. See our pilgrimage tours for current and upcoming yatras, all available by rail, bus or flight." },
        { q: "Can we combine Nainital with Kainchi Dham?", a: "Yes. They are close together and make an easy 4–5 day trip." }
      ]
  },
  "rajasthan": {
      gallery: [{ src: photo("udaipur-pichola-sunset"), alt: "Sunset over Lake Pichola, Udaipur" }],
      intro: [
        "Rajasthan is royal India at its most vivid: hilltop forts, lake palaces, colourful bazaars and the dunes of the Thar Desert.",
        "A classic circuit links Jaipur, Udaipur and Jodhpur, and can extend to Jaisalmer or Ranthambore for desert camps and wildlife."
      ],
      attractions: [
        { name: "Jaipur", note: "Amber Fort, Hawa Mahal and the City Palace" },
        { name: "Udaipur", note: "Lake Pichola, the City Palace and sunset boat rides" },
        { name: "Jodhpur", note: "Mehrangarh Fort above the 'Blue City'" },
        { name: "Jaisalmer", note: "The golden fort and the Sam sand dunes" },
        { name: "Pushkar", note: "The sacred lake and Brahma temple" },
        { name: "Ranthambore", note: "Tiger safaris among old fort ruins" }
      ],
      experiences: ["A desert camp under the stars", "A heritage hotel stay", "Folk music and Rajasthani thali", "Shopping for textiles and handicrafts"],
      tips: [
        "Days can be warm even in winter, while nights in the desert get cold.",
        "Many forts involve slopes and steps, so wear comfortable shoes.",
        "Distances are long, so a private vehicle or comfortable coach makes a big difference."
      ],
      faqs: [
        { q: "Which city is best for a short trip?", a: "Jaipur alone suits 2–3 days. Jaipur plus Udaipur makes an excellent 5–6 day holiday." },
        { q: "Is Rajasthan good for a honeymoon?", a: "Udaipur's lake palaces and heritage hotels make it one of India's most romantic destinations." }
      ]
  },
  "kerala": {
      gallery: [{ src: photo("kerala-houseboat"), alt: "Houseboat on the Alleppey backwaters" }],
      intro: [
        "'God's Own Country' moves at a gentler pace: houseboats drift through palm-lined backwaters, mist rolls over Munnar's tea estates and the coast is fringed with beaches.",
        "Kerala is a favourite for honeymoons, family holidays and relaxed trips for senior travellers."
      ],
      attractions: [
        { name: "Alleppey & Kumarakom", note: "Overnight houseboat cruises on the backwaters" },
        { name: "Munnar", note: "Tea gardens, viewpoints and Eravikulam National Park" },
        { name: "Thekkady", note: "Periyar lake, spice plantations and forest walks" },
        { name: "Kochi", note: "Fort Kochi, Chinese fishing nets and Kathakali" },
        { name: "Varkala & Kovalam", note: "Cliffside and crescent beaches" }
      ],
      experiences: ["A night on a backwater houseboat", "Tea estate visits in Munnar", "A Kathakali performance", "Ayurvedic treatments"],
      tips: [
        "Light cotton clothing works best, but carry a layer for Munnar's cool evenings.",
        "Houseboats are popular in peak season, so book early.",
        "Roads in the hills are winding. Carry motion-sickness medicine if you need it."
      ],
      faqs: [
        { q: "How many days are ideal for Kerala?", a: "Six days comfortably covers Kochi, Munnar, Thekkady and an Alleppey houseboat." },
        { q: "Is Kerala suitable for senior citizens?", a: "Yes. The pace is relaxed, and houseboat stays need very little walking." }
      ]
  },
  "karnataka": {
      intro: [
        "Karnataka blends history and nature: the boulder-strewn ruins of Hampi, the illuminated Mysuru Palace and the misty coffee estates of Coorg and Chikkamagaluru.",
        "Its UNESCO World Heritage sites make it an excellent destination for heritage and educational tours."
      ],
      attractions: [
        { name: "Hampi", note: "Ruins of the Vijayanagara capital, a UNESCO World Heritage Site" },
        { name: "Mysuru", note: "Mysore Palace, Chamundi Hills and the Dasara festival" },
        { name: "Coorg (Kodagu)", note: "Coffee estates, Abbey Falls and Dubare elephant camp" },
        { name: "Chikkamagaluru", note: "Hill views and coffee country" },
        { name: "Gokarna", note: "Quiet beaches and the Mahabaleshwar temple" }
      ],
      experiences: ["Sunset over Hampi's boulders", "Coffee plantation stays", "Mysuru Palace lit up at night", "Coracle rides on the Tungabhadra"],
      tips: [
        "Hampi is spread out; a full day with a guide is the minimum to do it justice.",
        "Coorg is lush in the monsoon but roads can be slow.",
        "Hampi is reachable by road from Maharashtra, making it a good road-trip destination."
      ],
      faqs: [
        { q: "Is Hampi good for a school or college tour?", a: "Yes. Its history, architecture and UNESCO status make it one of India's best educational destinations." },
        { q: "Can we combine Karnataka with Goa?", a: "Yes. Gokarna and Hampi both pair naturally with Goa." }
      ]
  },
  "tamil-nadu": {
      gallery: [
        { src: photo("nilgiri-railway"), alt: "Nilgiri Mountain Railway" },
        { src: commonsImage("Ramanathaswamy Temple, Rameshwaram, Tamil Nadu.jpg", 1600), alt: "Ramanathaswamy Temple, Rameswaram" },
        { src: commonsImage("Brihadisvara Temple during Maha Shivaratri-WUS03611 (edit).jpg", 1600), alt: "Brihadisvara Temple, Thanjavur" }
      ],
      intro: [
        "Tamil Nadu has some of India's most magnificent temple architecture, from Madurai's Meenakshi Amman Temple to the UNESCO-listed Chola temples of Thanjavur.",
        "Beyond the temples, travellers find the shore temples of Mahabalipuram, the southern tip of India at Kanyakumari and the cool hill stations of Ooty and Kodaikanal."
      ],
      attractions: [
        { name: "Madurai", note: "The Meenakshi Amman Temple and its towering gopurams" },
        { name: "Rameswaram", note: "Ramanathaswamy Temple and its famous corridors" },
        { name: "Kanyakumari", note: "Sunrise at India's southern tip and the Vivekananda Rock Memorial" },
        { name: "Thanjavur", note: "The Brihadisvara Temple, a UNESCO World Heritage Site" },
        { name: "Mahabalipuram", note: "UNESCO-listed shore temples and rock carvings" },
        { name: "Ooty", note: "The Nilgiri Mountain Railway and tea gardens" }
      ],
      experiences: ["Evening ceremonies at the great temples", "The Nilgiri toy train", "Sunrise at Kanyakumari", "Authentic South Indian meals"],
      tips: [
        "Temples have dress codes; shoulders and knees should be covered.",
        "Photography is restricted inside many temple sanctums.",
        "The coast is hot and humid, so plan sightseeing for mornings and evenings."
      ],
      faqs: [
        { q: "Do you plan South India temple tours?", a: "Yes. See our upcoming yatras, or ask us for a tailor-made temple circuit." },
        { q: "Is the Nilgiri toy train worth it?", a: "Yes. The UNESCO-listed line is a highlight for families, but seats should be booked well ahead." }
      ]
  },
  "goa": {
      intro: [
        "Goa is India's favourite beach break, with lively northern beaches, calmer coves in the south, whitewashed churches and Latin-quarter lanes.",
        "It is close enough to Maharashtra for a long weekend and relaxed enough for families, couples and groups of friends."
      ],
      attractions: [
        { name: "North Goa beaches", note: "Calangute, Baga and Anjuna" },
        { name: "South Goa beaches", note: "Palolem, Colva and Agonda" },
        { name: "Old Goa", note: "The Basilica of Bom Jesus, a UNESCO World Heritage Site" },
        { name: "Fontainhas, Panaji", note: "Colourful Portuguese-era Latin quarter" },
        { name: "Dudhsagar Falls", note: "One of India's tallest waterfalls, best after the monsoon" }
      ],
      experiences: ["Sunset at a beach shack", "A spice plantation tour", "A river cruise on the Mandovi", "Water sports at the northern beaches"],
      tips: [
        "December, especially Christmas and New Year, is the busiest and most expensive time.",
        "Swimming is unsafe in the monsoon; follow lifeguard flags.",
        "Goa is reachable overnight by road or rail from most of Maharashtra."
      ],
      faqs: [
        { q: "North or South Goa?", a: "North for nightlife and water sports, South for quieter beaches. Many itineraries include both." },
        { q: "Is Goa good for a family trip?", a: "Yes. South Goa's calmer beaches and the heritage of Old Goa suit families well." }
      ]
  },
  "maharashtra": {
      gallery: [
        { src: photo("maharashtra-dhom-lake"), alt: "Sunset at Dhom Lake near Mahabaleshwar" },
        { src: photo("mumbai-gateway"), alt: "Gateway of India and the Taj hotel, Mumbai" }
      ],
      intro: [
        "Maharashtra is home for GuruPriya. The state has misty hill stations in the Sahyadri, the UNESCO-listed caves of Ajanta and Ellora, Shivaji Maharaj's forts and the beaches of the Konkan coast.",
        "Its pilgrimage centres include Pandharpur, Shirdi, Tuljapur and five of the twelve Jyotirlingas, and they draw devotees from across India."
      ],
      attractions: [
        { name: "Mahabaleshwar & Panchgani", note: "Viewpoints, strawberry farms and Venna Lake" },
        { name: "Lonavala, Khandala & Matheran", note: "Monsoon escapes close to Pune and Mumbai" },
        { name: "Ajanta & Ellora", note: "UNESCO World Heritage cave temples near Aurangabad" },
        { name: "Raigad & Sinhagad", note: "Forts at the heart of Maratha history" },
        { name: "Konkan coast", note: "Ganpatipule, Tarkarli and quiet beaches" },
        { name: "Pilgrim centres", note: "Pandharpur, Shirdi, Tuljapur and the Jyotirlingas" }
      ],
      experiences: ["Monsoon drives through the ghats", "Fort treks", "Konkani seafood and Malvani cuisine", "Weekend family getaways"],
      tips: [
        "Hill stations are crowded on monsoon weekends; weekdays are calmer.",
        "Fort treks are slippery in the rain, so wear proper shoes.",
        "Ajanta is closed on Mondays and Ellora on Tuesdays. Check before you plan."
      ],
      faqs: [
        { q: "What are good weekend trips from Latur or Pune?", a: "Mahabaleshwar, Lonavala, Tuljapur and Pandharpur all suit 2–3 days. See our weekend getaways." },
        { q: "Do you plan Jyotirlinga tours in Maharashtra?", a: "Yes. Ask us for a tailor-made circuit by rail, bus or private vehicle." }
      ]
  },
  "gujarat": {
      intro: [
        "Gujarat is full of contrasts: the shimmering salt desert of the Rann of Kutch, the last Asiatic lions in Gir, and the coastal temples of Somnath and Dwarka.",
        "The Statue of Unity and Ahmedabad's UNESCO-listed old city make it ideal for family and educational trips."
      ],
      attractions: [
        { name: "Rann of Kutch", note: "The white desert at Dhordo, best on a full-moon night" },
        { name: "Gir National Park", note: "Home of the Asiatic lion" },
        { name: "Somnath & Dwarka", note: "Two of India's most revered coastal temples" },
        { name: "Statue of Unity", note: "The world's tallest statue, at Kevadia" },
        { name: "Ahmedabad", note: "Sabarmati Ashram and the UNESCO-listed old city" }
      ],
      experiences: ["Rann Utsav tent stay", "A lion safari at Gir", "Gujarati thali", "Kutchi handicraft villages"],
      tips: [
        "Gir safaris need permits booked in advance, and the park closes during the monsoon.",
        "Desert nights in winter are cold, so carry warm layers.",
        "Gujarat is reachable overnight by train from much of Maharashtra."
      ],
      faqs: [
        { q: "When is the Rann Utsav?", a: "It is a winter festival, usually from November to February. We confirm dates and tent availability for your trip." },
        { q: "Can we combine Somnath and Dwarka?", a: "Yes. They make a popular 5–6 day pilgrimage circuit." }
      ]
  },
  "meghalaya": {
      intro: [
        "Meghalaya, the 'abode of clouds', is one of the greenest corners of India, with roaring waterfalls, crystal-clear rivers, caves and the famous living root bridges grown by Khasi communities.",
        "It rewards travellers who enjoy nature and gentle trekking."
      ],
      attractions: [
        { name: "Shillong", note: "Ward's Lake, Police Bazaar and the Shillong Peak viewpoint" },
        { name: "Sohra (Cherrapunji)", note: "Nohkalikai and Seven Sisters falls" },
        { name: "Nongriat", note: "The double-decker living root bridge" },
        { name: "Mawlynnong", note: "Often called Asia's cleanest village" },
        { name: "Dawki", note: "Boating on the glass-clear Umngot river" }
      ],
      experiences: ["The root bridge trek", "Boating at Dawki", "Cave exploration", "Khasi food and culture"],
      tips: [
        "The trek to the double-decker root bridge involves a few thousand steps each way.",
        "Carry rain gear in any season.",
        "Guwahati is the usual gateway by air or rail."
      ],
      faqs: [
        { q: "Is Meghalaya suitable for families?", a: "Yes. Most sights are a short walk from the road; only the Nongriat trek is demanding." },
        { q: "Can we add Kaziranga or Guwahati?", a: "Yes. Both combine well with Meghalaya on a North-East itinerary." }
      ]
  },
  "sikkim": {
      intro: [
        "Sikkim is a small Himalayan state with big views: Kanchenjunga at sunrise, high glacial lakes, rhododendron valleys and peaceful Buddhist monasteries.",
        "Gangtok makes a comfortable base, with day trips to Tsomgo Lake and longer journeys north to Lachung and Yumthang."
      ],
      attractions: [
        { name: "Gangtok", note: "MG Marg, Rumtek Monastery and city viewpoints" },
        { name: "Tsomgo (Changu) Lake", note: "A high-altitude glacial lake" },
        { name: "Nathula Pass", note: "The historic border pass (permit required)" },
        { name: "Pelling", note: "Kanchenjunga views and Pemayangtse Monastery" },
        { name: "Lachung & Yumthang", note: "The 'Valley of Flowers' of North Sikkim" }
      ],
      experiences: ["Sunrise over Kanchenjunga", "Monastery visits", "Snow at high passes", "Momos and Sikkimese cuisine"],
      tips: [
        `Restricted areas such as Nathula and North Sikkim need permits, which are arranged through registered operators. ${CONFIRM}`,
        "High lakes and passes are cold and windy, so carry warm layers.",
        "Mountain roads can close after heavy rain or snow; keep a buffer day."
      ],
      faqs: [
        { q: "How do we reach Sikkim?", a: "Fly to Bagdogra or take the train to New Jalpaiguri, then continue by road to Gangtok." },
        { q: "Can we combine Sikkim with Darjeeling?", a: "Yes. Darjeeling is a natural addition on the same route." }
      ]
  },
  "andaman": {
      intro: [
        "The Andaman Islands offer some of India's clearest water and whitest sand, along with coral reefs for snorkelling and diving and the moving history of the Cellular Jail.",
        "It is a favourite with honeymooners and families who want a tropical island holiday without leaving India."
      ],
      attractions: [
        { name: "Port Blair", note: "The Cellular Jail and its light-and-sound show" },
        { name: "Havelock (Swaraj Dweep)", note: "Radhanagar Beach, often ranked among Asia's best" },
        { name: "Elephant Beach", note: "Snorkelling over coral reefs" },
        { name: "Neil Island (Shaheed Dweep)", note: "Natural rock formations and quiet beaches" },
        { name: "Ross Island", note: "Colonial-era ruins reclaimed by the forest" }
      ],
      experiences: ["Snorkelling or scuba diving", "Sunset at Radhanagar", "Inter-island ferries", "A glass-bottom boat ride"],
      tips: [
        "Ferries between islands fill up, so we book them with your package.",
        "Water activities depend on sea conditions.",
        "Carry reef-safe sunscreen, a hat and light clothing."
      ],
      faqs: [
        { q: "Do Indians need a passport for the Andamans?", a: "No. A government photo ID is enough for Indian citizens." },
        { q: "Is scuba diving possible for beginners?", a: "Yes. Introductory dives with certified instructors are available on Havelock." }
      ]
  },
  "char-dham-yatra": {
    gallery: [
      { src: photo("yamunotri-temple-and-ashram"), alt: "Yamunotri temple" },
      { src: photo("gangotri-ganga-river"), alt: "The Bhagirathi at Gangotri" },
      { src: photo("badrinath-temple-uttarakhand"), alt: "Badrinath Temple" },
      { src: photo("mana-village-badrinath-uttarakhand-india"), alt: "Mana Village near Badrinath" }
    ],
    intro: [
      "The Char Dham Yatra of Uttarakhand links four Himalayan shrines: Yamunotri, the source of the Yamuna; Gangotri, where the Ganga is worshipped; Kedarnath, one of the twelve Jyotirlingas; and Badrinath, the abode of Lord Vishnu.",
      "The traditional route runs west to east from Haridwar or Rishikesh, through Barkot, Uttarkashi, Guptakashi and Joshimath. For pilgrims from Maharashtra it is a once-in-a-lifetime journey that needs careful planning, which is exactly where an experienced group helps."
    ],
    attractions: [
      { name: "Yamunotri", note: "A trek of about 6 km from Janki Chatti, with ponies and palkis available" },
      { name: "Gangotri", note: "The Gangotri temple on the banks of the Bhagirathi, reachable by road" },
      { name: "Kedarnath", note: "The Jyotirlinga shrine, reached by a long uphill trek from Gaurikund, or by pony, palki or helicopter" },
      { name: "Badrinath", note: "The Vishnu temple beside the Alaknanda, with Tapt Kund and Mana Village nearby" },
      { name: "On the way", note: "Haridwar's Ganga Aarti, Rishikesh, and the Panch Prayag confluences" }
    ],
    experiences: ["Ganga Aarti at Har Ki Pauri, Haridwar", "Darshan at all four dhams", "The Kedarnath trek", "Mana, the village near the Indo-Tibetan border"],
    tips: [
      "Registration with the Uttarakhand government is mandatory for every Char Dham pilgrim.",
      "Book Kedarnath helicopter seats only through the official government-authorised portal; fake booking websites are common.",
      "Senior pilgrims should have a medical check-up before travelling; the shrines are at high altitude.",
      "Carry warm layers and rain protection in every month of the season."
    ],
    faqs: [
      { q: "Does GuruPriya organise the Char Dham Yatra?", a: "Yes. Our Char Dham yatra departs from Latur and is available by railway, bus or flight. See the yatra page for the route and itinerary." },
      { q: "Can elderly pilgrims do Kedarnath?", a: "Yes, many do, using ponies, palkis or helicopters for the climb. A doctor's advice before booking is essential." },
      { q: "How many days does the full yatra take?", a: "About 10–12 days from Haridwar. From Maharashtra, allow extra days for travel to and from Haridwar." }
    ]
  },
  "kashi-ayodhya-prayagraj": {
    gallery: [{ src: photo("shri-ram-janambhoomi-mandir-ayodhya-dham"), alt: "Shri Ram Janmabhoomi Mandir, Ayodhya" }],
    intro: [
      "Kashi (Varanasi), Ayodhya and Prayagraj are three of India's most revered pilgrimage cities, close enough to combine in one journey of about a week.",
      "Kashi is home to the Kashi Vishwanath Jyotirlinga and the ghats of the Ganga; Ayodhya is the birthplace of Lord Ram; and Prayagraj holds the Triveni Sangam, the meeting point of the Ganga, Yamuna and the mythical Saraswati."
    ],
    attractions: [
      { name: "Kashi Vishwanath Temple", note: "The Jyotirlinga shrine in Varanasi, approached through the Kashi Vishwanath corridor" },
      { name: "The ghats of Varanasi", note: "The evening Ganga Aarti at Dashashwamedh Ghat and a sunrise boat ride" },
      { name: "Sarnath", note: "Where the Buddha gave his first sermon, near Varanasi" },
      { name: "Shri Ram Janmabhoomi, Ayodhya", note: "The Ram Mandir, with Hanuman Garhi and the Saryu ghats nearby" },
      { name: "Triveni Sangam, Prayagraj", note: "A boat ride to the confluence for a holy dip" }
    ],
    experiences: ["Ganga Aarti at dusk", "A sunrise boat ride past the ghats", "Snan at the Triveni Sangam", "Saryu Aarti in Ayodhya"],
    tips: [
      "October to March is the most comfortable season; summers in the Gangetic plains are very hot.",
      "Large festivals and the Magh Mela at Prayagraj bring huge crowds, so plan and book early.",
      "Temples have security checks; carry minimal belongings and a photo ID."
    ],
    faqs: [
      { q: "Is this circuit part of any GuruPriya yatra?", a: "Yes. Our Char Dham yatra visits Ayodhya, Prayagraj and Kashi on its return route. We also plan this circuit on its own." },
      { q: "How do we travel between the three cities?", a: "By road or rail. Distances are a few hours each, so a 5–7 day plan is comfortable." }
    ]
  },
  "tirupati": {
    intro: [
      "The Sri Venkateswara Temple on the Tirumala hills above Tirupati is one of the most visited pilgrimage sites in the world. Devotees come to seek the blessings of Lord Venkateswara (Balaji).",
      "A typical visit combines darshan at Tirumala with the Sri Padmavathi Ammavari Temple at Tiruchanur, and often Srikalahasti nearby."
    ],
    attractions: [
      { name: "Sri Venkateswara Temple, Tirumala", note: "Darshan of Lord Venkateswara" },
      { name: "Sri Padmavathi Ammavari Temple", note: "At Tiruchanur, near Tirupati" },
      { name: "Kapila Theertham", note: "A Shiva temple and waterfall at the foot of the hills" },
      { name: "Srikalahasti", note: "The Vayu Linga temple, a short drive away" }
    ],
    experiences: ["Darshan at Tirumala", "Walking the traditional footpath up the hills (for the fit)", "Tirumala laddu prasadam", "Temple visits around Tirupati"],
    tips: [
      "Darshan tickets and accommodation at Tirumala should be booked only through the temple trust's official channels.",
      "A traditional dress code applies for darshan.",
      "Weekends, holidays and the Brahmotsavam festival are extremely crowded; weekdays are calmer."
    ],
    faqs: [
      { q: "Is a Tirupati yatra planned?", a: "Yes. Tirupati darshan is one of our upcoming yatras. Register your interest and we'll share dates when they are fixed." },
      { q: "How do we reach Tirupati from Maharashtra?", a: "Direct and connecting trains reach Tirupati, and Tirupati airport (Renigunta) has flights from major cities." }
    ]
  },
  "dubai": {
      intro: [
        "Dubai is a short flight from India and packs record-breaking architecture, desert adventures, theme parks and shopping into a compact, family-friendly city.",
        "Many travellers add a day trip to Abu Dhabi for the Sheikh Zayed Grand Mosque."
      ],
      attractions: [
        { name: "Burj Khalifa", note: "Observation decks in the world's tallest building" },
        { name: "Dubai Mall & Fountain", note: "Shopping, aquarium and the evening fountain show" },
        { name: "Desert safari", note: "Dune drives, camel rides and a camp dinner" },
        { name: "Dhow cruise", note: "Dinner cruises on the Creek or at the Marina" },
        { name: "Abu Dhabi", note: "The Sheikh Zayed Grand Mosque and Ferrari World" }
      ],
      experiences: ["A desert safari with dinner", "Sunset from the Burj Khalifa", "Gold and spice souks", "Theme parks for the family"],
      tips: [
        `Indian passport holders need a visa for the UAE. ${CONFIRM}`,
        "Summer, from June to August, is extremely hot.",
        "Modest clothing is expected at religious sites and some public places."
      ],
      faqs: [
        { q: "Is Dubai good for a first international trip?", a: "Yes. Short flights, vegetarian-friendly food and easy sightseeing make it ideal." },
        { q: "Can we visit Abu Dhabi in the same trip?", a: "Yes. It is about a 90-minute drive and makes an easy day trip." }
      ]
  },
  "thailand": {
      intro: [
        "Thailand combines the energy of Bangkok with the limestone islands of the Andaman Sea, so a city break and a beach holiday fit into one trip.",
        "Popular routes for Indian travellers include Bangkok with Pattaya, or Phuket with Krabi and the Phi Phi Islands."
      ],
      attractions: [
        { name: "Bangkok", note: "The Grand Palace, Wat Arun and floating markets" },
        { name: "Pattaya", note: "Coral Island and family attractions" },
        { name: "Phuket", note: "Beaches, Big Buddha and Old Town" },
        { name: "Krabi & Phi Phi", note: "Island hopping among limestone cliffs" },
        { name: "Chiang Mai", note: "Temples, night markets and elephant sanctuaries" }
      ],
      experiences: ["Island hopping by speedboat", "A Chao Phraya river cruise", "Thai cooking classes", "Night markets"],
      tips: [
        `Visa rules for Indian travellers have changed several times in recent years. ${CONFIRM}`,
        "Dress modestly at temples, covering shoulders and knees.",
        "Sea conditions limit island trips in the monsoon months."
      ],
      faqs: [
        { q: "Is vegetarian food easy to find?", a: "Yes, especially in Bangkok and Phuket, where Indian restaurants are common." },
        { q: "Bangkok–Pattaya or Phuket–Krabi?", a: "Bangkok–Pattaya suits a shorter city break; Phuket–Krabi is better for beaches and islands." }
      ]
  },
  "bali": {
      intro: [
        "Bali's mix of Hindu culture, emerald rice terraces, clifftop temples and private pool villas makes it one of Asia's favourite honeymoon islands.",
        "Ubud offers culture and nature; the south coast offers beaches and sunsets."
      ],
      attractions: [
        { name: "Ubud", note: "The Tegallalang rice terraces and the Monkey Forest" },
        { name: "Uluwatu", note: "A clifftop temple and the Kecak fire dance at sunset" },
        { name: "Tanah Lot", note: "A sea temple on a rocky outcrop" },
        { name: "Nusa Penida", note: "Dramatic cliffs and Kelingking Beach" },
        { name: "Mount Batur", note: "A sunrise trek on an active volcano" }
      ],
      experiences: ["A private pool villa stay", "A Kecak dance at Uluwatu", "Balinese spa treatments", "A swing over the rice terraces"],
      tips: [
        `Entry rules and tourist levies for Indian travellers can change. ${CONFIRM}`,
        "Traffic in the south is slow, so base yourself in two areas rather than one.",
        "Wear a sarong at temples; most temples lend or hire them."
      ],
      faqs: [
        { q: "Is Bali good for a honeymoon?", a: "Yes. Pool villas, sunset temples and spas make it one of the best honeymoon choices." },
        { q: "How many days do we need?", a: "Six days lets you split time between Ubud and the beaches." }
      ]
  },
  "singapore": {
      intro: [
        "Singapore is clean, safe and easy to explore, with world-class attractions for every age, from Gardens by the Bay to Universal Studios on Sentosa.",
        "It is often combined with Malaysia for a 6–8 day holiday."
      ],
      attractions: [
        { name: "Marina Bay", note: "Marina Bay Sands, the SkyPark and the evening light show" },
        { name: "Gardens by the Bay", note: "Supertrees, the Cloud Forest and the Flower Dome" },
        { name: "Sentosa Island", note: "Universal Studios, the aquarium and beaches" },
        { name: "Night Safari", note: "The world's first nocturnal zoo" },
        { name: "Little India & Chinatown", note: "Heritage streets, temples and food" }
      ],
      experiences: ["Universal Studios", "The Night Safari", "Hawker-centre food trails", "The cable car to Sentosa"],
      tips: [
        `Indian passport holders need a visa for Singapore. ${CONFIRM}`,
        "Public transport is excellent; a travel card saves time.",
        "Short tropical showers are common, so carry an umbrella."
      ],
      faqs: [
        { q: "Is Singapore good with young children?", a: "Yes. It is one of the most family-friendly cities in the world." },
        { q: "Can we add Malaysia?", a: "Yes. Kuala Lumpur and Genting combine easily by road or a short flight." }
      ]
  },
  "malaysia": {
      intro: [
        "Malaysia blends a modern capital, cool highlands and island beaches, with a strong Indian cultural presence that makes travellers feel at home.",
        "It pairs naturally with Singapore."
      ],
      attractions: [
        { name: "Kuala Lumpur", note: "The Petronas Twin Towers and Merdeka Square" },
        { name: "Batu Caves", note: "A Hindu temple complex reached by colourful steps" },
        { name: "Genting Highlands", note: "Cable car, theme parks and a cool climate" },
        { name: "Langkawi", note: "The Sky Bridge, mangroves and beaches" },
        { name: "Penang", note: "George Town's UNESCO-listed heritage and street art" }
      ],
      experiences: ["The Petronas Skybridge", "The Genting cable car", "Island hopping in Langkawi", "Street food in Penang"],
      tips: [
        `Entry requirements for Indian travellers have changed recently. ${CONFIRM}`,
        "Batu Caves involves a long staircase.",
        "Indian vegetarian food is widely available."
      ],
      faqs: [
        { q: "Singapore and Malaysia in one trip?", a: "Yes. A 6–7 day combined itinerary is one of our most requested international plans." },
        { q: "Is Langkawi good for a honeymoon?", a: "Yes. Its beaches and resorts are quieter than Southeast Asia's busier islands." }
      ]
  },
  "maldives": {
      intro: [
        "The Maldives is the definitive island escape: private resorts on coral islands, overwater villas above turquoise lagoons and some of the world's best snorkelling.",
        "It is about a two-hour flight from South India, which makes it ideal for honeymoons and special occasions."
      ],
      attractions: [
        { name: "Overwater villas", note: "Resort stays above the lagoon" },
        { name: "House reefs", note: "Snorkelling with turtles and tropical fish" },
        { name: "Sandbank picnics", note: "Private excursions to tiny islands" },
        { name: "Sunset cruises", note: "Dolphin-spotting at dusk" },
        { name: "Malé", note: "The compact capital and local markets" }
      ],
      experiences: ["A seaplane transfer", "Snorkelling and diving", "Sunset dolphin cruises", "Candlelit beach dinners"],
      tips: [
        `Indian passport holders currently receive a visa on arrival, subject to entry conditions. ${CONFIRM}`,
        "Resort transfers (speedboat or seaplane) are a significant part of the cost and depend on the resort.",
        "Most resorts are self-contained; choose one that suits your food preferences."
      ],
      faqs: [
        { q: "How do we choose a resort?", a: "Tell us your budget, food preferences and whether you want a beach or water villa, and we will shortlist options." },
        { q: "Is the Maldives only for couples?", a: "No. Many resorts welcome families and have kids' clubs." }
      ]
  },
  "vietnam": {
      intro: [
        "Vietnam is one of Asia's most rewarding destinations, with the limestone seascape of Ha Long Bay, lantern-lit Hoi An, bustling Hanoi and Ho Chi Minh City, and great food.",
        "Good value and improving flight connections from India have made it increasingly popular."
      ],
      attractions: [
        { name: "Ha Long Bay", note: "Overnight cruises among limestone islands, a UNESCO site" },
        { name: "Hanoi", note: "The Old Quarter, Hoan Kiem Lake and street food" },
        { name: "Hoi An", note: "A UNESCO-listed ancient town lit by lanterns" },
        { name: "Da Nang", note: "Beaches and the Golden Bridge at Ba Na Hills" },
        { name: "Ho Chi Minh City", note: "The Cu Chi tunnels and Mekong Delta day trips" }
      ],
      experiences: ["An overnight Ha Long cruise", "Lantern-making in Hoi An", "Mekong Delta boat rides", "Vietnamese coffee culture"],
      tips: [
        `Vietnam offers an e-visa for Indian passport holders. ${CONFIRM}`,
        "Weather differs sharply between north and south, so we plan routes around your travel month.",
        "Carry a light jacket for Hanoi in winter."
      ],
      faqs: [
        { q: "Is vegetarian food available?", a: "Yes. Vegetarian Vietnamese food exists, and Indian restaurants are found in the main cities." },
        { q: "North or South Vietnam?", a: "A 7–9 day trip can cover both by flying between Hanoi and Da Nang or Ho Chi Minh City." }
      ]
  },
  "switzerland": {
      intro: [
        "Switzerland is the Europe of postcards, with turquoise lakes, waterfall-lined valleys, snow-capped peaks and some of the world's most scenic train journeys.",
        "Interlaken and Lucerne are the most popular bases for travellers from India."
      ],
      attractions: [
        { name: "Jungfraujoch", note: "The 'Top of Europe' high in the Bernese Alps" },
        { name: "Interlaken & Lauterbrunnen", note: "A valley of waterfalls between two lakes" },
        { name: "Lucerne & Mount Titlis", note: "The Chapel Bridge and a revolving cable car" },
        { name: "Zermatt", note: "Views of the Matterhorn" },
        { name: "Scenic trains", note: "Glacier Express and Bernina Express routes" }
      ],
      experiences: ["Scenic panoramic train rides", "Snow at Jungfraujoch or Titlis", "Lake cruises", "Swiss chocolate and cheese"],
      tips: [
        `Switzerland requires a Schengen visa for Indian passport holders; apply well in advance. ${CONFIRM}`,
        "A Swiss travel pass can make trains and boats simpler.",
        "Pack layers, as mountain weather changes quickly."
      ],
      faqs: [
        { q: "Can we combine Switzerland with other countries?", a: "Yes. France, Italy and Austria combine easily by train within the Schengen area." },
        { q: "Is Switzerland suitable for senior citizens?", a: "Yes. Trains and cable cars take you to the views with little walking." }
      ]
  },
  "europe": {
      gallery: [{ src: photo("switzerland-lauterbrunnen"), alt: "Swiss Alps" }],
      intro: [
        "A European holiday can link several countries in one journey, such as Paris, the Swiss Alps, Italy's art cities and the fairy-tale streets of Prague and Vienna.",
        "Group departures and tailor-made itineraries both work well, depending on how much independence you want."
      ],
      attractions: [
        { name: "Paris", note: "The Eiffel Tower, the Louvre and Seine cruises" },
        { name: "Swiss Alps", note: "Interlaken, Lucerne and Jungfraujoch" },
        { name: "Italy", note: "Rome, Venice and Florence" },
        { name: "Prague & Vienna", note: "Old towns, castles and classical music" },
        { name: "Amsterdam", note: "Canals and, in spring, tulip gardens" }
      ],
      experiences: ["Multi-country rail journeys", "River and canal cruises", "Museums and historic old towns", "Café culture"],
      tips: [
        `Most of Western Europe needs a Schengen visa for Indian passport holders. ${CONFIRM}`,
        "Summer is the busiest season; spring and early autumn are calmer.",
        "Walking on cobbled streets is common, so pack comfortable shoes."
      ],
      faqs: [
        { q: "How many countries can we cover?", a: "On a 12-day trip, three or four countries is comfortable without feeling rushed." },
        { q: "Group tour or tailor-made?", a: "Group tours are simpler and social; tailor-made trips give flexibility. We plan both." }
      ]
  }
};
