// Long-form category page content, loaded only by /tours/<slug> pages
// (and the SEO manifest at build time). Light card data is in categories.ts.

export interface CategoryDetails {
  intro: string;
  benefits: { title: string; text: string }[];
  planning: string[];
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
}

export const categoryDetails: Record<string, CategoryDetails> = {
  "domestic": {
      intro:
        "From Himalayan valleys and Rajasthan's forts to Kerala's backwaters and the beaches of Goa and the Andamans, India has a holiday for every traveller. We plan domestic journeys by rail, road or air, starting from Latur, Pune or wherever you are.",
      benefits: [
        { title: "Your choice of travel mode", text: "Railway, coach or flight, whichever suits your budget, time and comfort." },
        { title: "Itineraries that make sense", text: "Realistic travel times, sensible overnight stops and no rushed days." },
        { title: "Help on the road", text: "A phone and WhatsApp line to our team throughout your trip." },
        { title: "Clear details upfront", text: "Inclusions, hotels and timings are confirmed in writing before you pay." }
      ],
      planning: [
        "The best season varies widely across India, so tell us your month and we will suggest the right region.",
        "Long weekends and school holidays sell out early; plan 6–8 weeks ahead.",
        "Rail journeys are economical and comfortable for longer distances."
      ],
      faqs: [
        { q: "Do your tours start from Latur only?", a: "Group yatras usually depart from Latur. Tailor-made holidays can start from any city." },
        { q: "Can we change a suggested itinerary?", a: "Yes. Every suggested itinerary is a starting point that we adjust to your dates and interests." }
      ],
      seoTitle: "Domestic Holiday Packages from Latur & Pune | GuruPriya",
      seoDescription: "Holidays across India, from Kashmir, Kerala, Rajasthan and Goa to Himachal, Uttarakhand and the Andamans, planned by rail, coach or flight."
  },
  "international": {
      intro:
        "Whether it is a first trip abroad to Dubai or Singapore, a beach escape to Thailand, Bali or the Maldives, or a multi-country journey through Europe, we help you plan every step, including flights, hotels, sightseeing and visa guidance.",
      benefits: [
        { title: "Visa guidance", text: "We explain the current visa requirements and help you prepare your documents." },
        { title: "Flights and hotels", text: "Flight options and hotel choices that match your budget." },
        { title: "Indian food and comfort", text: "Itineraries planned with vegetarian and Indian meal options in mind." },
        { title: "Support while abroad", text: "Our team stays reachable on WhatsApp throughout your trip." }
      ],
      planning: [
        "Apply for visas early. Schengen and some Asian visas need several weeks.",
        "Check that your passport is valid for at least six months beyond your return date.",
        "Travel insurance is strongly recommended for international trips."
      ],
      faqs: [
        { q: "Do you arrange visas?", a: "We guide you on requirements and documents; the visa itself is issued by the embassy or its official service." },
        { q: "Is a group or private tour better abroad?", a: "Group tours are social and simple; private tours are flexible. We plan both." }
      ],
      seoTitle: "International Holiday Packages | Dubai, Thailand, Bali & Europe",
      seoDescription: "International holidays from India: Dubai, Thailand, Bali, Singapore, Malaysia, the Maldives, Vietnam, Switzerland and Europe, with visa guidance."
  },
  "family": {
      intro:
        "Family holidays need a different kind of planning: a gentler pace, comfortable rooms, food everyone enjoys and activities for every age. We design trips that work for children, parents and grandparents together.",
      benefits: [
        { title: "A pace that suits everyone", text: "Fewer hotel changes, rest time built in and short travel days." },
        { title: "Family-friendly stays", text: "Hotels with family rooms or connecting rooms, where available." },
        { title: "Something for every age", text: "Toy trains, boat rides, safaris and easy sightseeing." },
        { title: "Food you trust", text: "Vegetarian and Jain meal preferences planned in advance." }
      ],
      planning: [
        "School holidays (April–June, Diwali and December) are peak season, so book early.",
        "For young children or elders, limit road journeys to about 5–6 hours a day.",
        "Tell us about any mobility or dietary needs when you enquire."
      ],
      faqs: [
        { q: "Which destinations are best for families?", a: "Kashmir, Kerala, Himachal, Goa, Singapore and Dubai are all excellent family choices." },
        { q: "Can grandparents travel comfortably?", a: "Yes. We adjust walking, travel times and hotel choice for senior members." }
      ],
      seoTitle: "Family Holiday Packages | Comfortable Trips for All Ages",
      seoDescription: "Family holidays in India and abroad, planned for children, parents and grandparents: comfortable stays, a gentle pace and meals everyone enjoys."
  },
  "group": {
      intro:
        "Group journeys are at the heart of GuruPriya. From our scheduled yatras to private tours for families, friends, housing societies and community groups, we handle transport, stays, meals and coordination so everyone can enjoy the trip.",
      benefits: [
        { title: "Coaches and rail blocks", text: "Comfortable coaches or group rail bookings, depending on the route." },
        { title: "A tour coordinator", text: "One point of contact who keeps the group on schedule." },
        { title: "Group meals", text: "Pure vegetarian meals on our yatras, and group menus on request." },
        { title: "Simple for organisers", text: "We handle the details so the group leader can travel too." }
      ],
      planning: [
        "Groups of 15 or more are best planned 2–3 months ahead.",
        "Share the group's age range and mobility so we plan the right pace.",
        "One person should act as the group's main contact with our team."
      ],
      faqs: [
        { q: "What size groups do you handle?", a: "From small family groups to full coach loads. Tell us your number and we will plan accordingly." },
        { q: "Do you run scheduled group departures?", a: "Yes. See our pilgrimage yatras and upcoming departures." }
      ],
      seoTitle: "Group Tours from Latur | Coach & Rail Group Travel",
      seoDescription: "Group tours for families, friends, societies and communities, with coach or rail travel, a tour coordinator and group meals. Scheduled departures from Latur."
  },
  "pilgrimage": {
      intro:
        "Pilgrimage was where GuruPriya began, and it remains close to our heart. Our yatras combine darshan with the history and significance of each place, pure vegetarian food and the care that elders and families deserve.",
      benefits: [
        { title: "Planned from experience", text: "Our founder has travelled these routes for over a decade." },
        { title: "Spiritual guidance", text: "Background on each tirth on selected yatras." },
        { title: "Pure vegetarian meals", text: "Satvik, home-style food throughout the journey." },
        { title: "Care for elders", text: "A comfortable pace, with ponies, palkis or helicopters arranged where needed." }
      ],
      planning: [
        "Char Dham pilgrims must register with the Uttarakhand government.",
        "Senior pilgrims should have a medical check-up before high-altitude yatras.",
        "Every yatra is available by railway, bus or flight."
      ],
      faqs: [
        { q: "Which yatras do you run?", a: "See the scheduled yatras below and our upcoming South India circuits. We also plan private yatras." },
        { q: "Where do yatras depart from?", a: "Our group yatras depart from Latur unless stated otherwise." }
      ],
      seoTitle: "Pilgrimage Tours & Yatras from Latur | Char Dham, Kainchi Dham",
      seoDescription: "Group pilgrimage yatras from Latur, including Char Dham, Kainchi Dham and South India temple circuits, with pure vegetarian meals and care for elders."
  },
  "adventure": {
      intro:
        "For travellers who want more than sightseeing: white-water rafting in Rishikesh, paragliding over Bir Billing, Himalayan road journeys through Spiti, reef dives in the Andamans and volcano sunrises in Bali.",
      benefits: [
        { title: "Licensed operators", text: "Activities are booked through established, licensed operators." },
        { title: "Matched to your level", text: "Options for first-timers through to experienced adventurers." },
        { title: "Acclimatisation built in", text: "High-altitude routes include the rest days they need." },
        { title: "Flexible days", text: "Buffer time for weather-dependent activities." }
      ],
      planning: [
        "Adventure activities depend on weather; we keep alternatives ready.",
        "Travel insurance that covers adventure sports is recommended.",
        "Tell us about any health conditions before booking high-altitude trips."
      ],
      faqs: [
        { q: "Are adventure activities safe for beginners?", a: "Rafting, tandem paragliding and introductory dives are all designed for beginners with trained instructors." },
        { q: "What is the minimum age?", a: "It varies by activity and operator; we confirm age limits when planning." }
      ],
      seoTitle: "Adventure Tours | Rafting, Paragliding, Spiti & Andaman Diving",
      seoDescription: "Adventure holidays for every level: rafting in Rishikesh, paragliding at Bir Billing, Spiti road trips, Andaman diving and more."
  },
  "honeymoon": {
      intro:
        "Your honeymoon deserves unhurried days, beautiful stays and small touches that make it memorable. Choose the lake palaces of Udaipur, Kerala's backwaters, Kashmir's meadows or the islands of the Maldives, Bali and Thailand.",
      benefits: [
        { title: "Handpicked romantic stays", text: "Houseboats, heritage hotels, pool villas and overwater rooms." },
        { title: "Private transfers", text: "Your own vehicle, so the journey stays private." },
        { title: "Special touches", text: "Candlelit dinners and room decoration, arranged on request." },
        { title: "A relaxed pace", text: "Late starts and free time, not a packed schedule." }
      ],
      planning: [
        "Wedding season (November–February) is peak time, so book as soon as dates are fixed.",
        "For international honeymoons, check passport names match after marriage if they are changing.",
        "Tell us your budget early; it shapes the hotel choices more than anything else."
      ],
      faqs: [
        { q: "Which honeymoon destination is best?", a: "Kerala, Kashmir and Udaipur in India; the Maldives, Bali and Thailand abroad. It depends on your month and budget." },
        { q: "Can you arrange surprises?", a: "Yes. Cake, flower decoration and candlelit dinners can be arranged at most hotels." }
      ],
      seoTitle: "Honeymoon Packages | Kerala, Kashmir, Maldives, Bali",
      seoDescription: "Romantic honeymoon packages in India and abroad: Kerala houseboats, Kashmir, Udaipur, the Maldives, Bali and Thailand, with private transfers and special touches."
  },
  "weekend-getaways": {
      intro:
        "Not every journey needs a week. Maharashtra's hill stations, forts, beaches and pilgrim towns are perfect for two- or three-day breaks, and Goa is an easy long weekend away.",
      benefits: [
        { title: "Close to home", text: "Destinations within a comfortable drive or overnight journey." },
        { title: "Ready-made plans", text: "Hotel, transport and sightseeing sorted in one call." },
        { title: "Monsoon specials", text: "The ghats at their greenest from June to September." },
        { title: "Good for small groups", text: "Ideal for friends, couples and families." }
      ],
      planning: [
        "Monsoon weekends are busy at Lonavala and Mahabaleshwar; weekdays are quieter.",
        "Book long weekends 3–4 weeks ahead.",
        "Carry rain gear from June to September."
      ],
      faqs: [
        { q: "What are good weekend trips from Latur?", a: "Tuljapur, Pandharpur, Mahabaleshwar and Aundha Nagnath–Parli Vaijnath are all easy trips." },
        { q: "And from Pune or Mumbai?", a: "Lonavala, Mahabaleshwar, Matheran, Malshej Ghat and the Konkan coast." }
      ],
      seoTitle: "Weekend Getaways from Pune, Latur & Mumbai | GuruPriya",
      seoDescription: "Two- and three-day weekend trips to Mahabaleshwar, Lonavala, Matheran, the Konkan coast, Goa and pilgrim towns near Latur."
  },
  "corporate": {
      intro:
        "From team offsites in Lonavala to incentive trips to Goa, Dubai or Singapore, we coordinate travel, venues and stays for organisations of every size, so your team can focus on the occasion.",
      benefits: [
        { title: "One point of contact", text: "A single coordinator for the whole group." },
        { title: "Offsites and incentives", text: "Resorts, venues and team activities." },
        { title: "Group logistics", text: "Coaches, rail and flight bookings for teams." },
        { title: "Clear quotations", text: "Itemised quotes for approval and billing." }
      ],
      planning: [
        "Share the headcount, dates and purpose (offsite, incentive or conference) when you enquire.",
        "Venue availability is the main constraint for large groups; plan 2–3 months ahead.",
        "We can include team activities and themed dinners on request."
      ],
      faqs: [
        { q: "Do you handle small teams?", a: "Yes, from small teams to large groups." },
        { q: "Can you plan international incentive trips?", a: "Yes. Dubai, Thailand and Singapore are popular choices." }
      ],
      seoTitle: "Corporate Travel, Offsites & Incentive Trips | GuruPriya",
      seoDescription: "Corporate offsites, incentive trips and group business travel, with venues, stays, transport and one coordinator for your team."
  },
  "customized": {
      intro:
        "Tell us where you want to go, how you like to travel and what matters most to you. We will build an itinerary around your interests, pace and budget, with no fixed package to squeeze into.",
      benefits: [
        { title: "Built from scratch", text: "Itineraries designed around you, not a brochure." },
        { title: "Any starting city", text: "Start and end wherever suits you." },
        { title: "Your pace, your stays", text: "Choose budget, comfort or luxury stays." },
        { title: "Revisions included", text: "We refine the plan until it is right." }
      ],
      planning: [
        "Share your dates, number of travellers, budget range and must-see places.",
        "The more flexible your dates, the better the options we can find.",
        "We send a day-by-day plan before anything is booked."
      ],
      faqs: [
        { q: "How do we start?", a: "Send an enquiry or WhatsApp us. We will call to understand what you want, then share a draft plan." },
        { q: "Is there a minimum group size?", a: "No. We plan trips for solo travellers, couples, families and groups." }
      ],
      seoTitle: "Customized Tour Packages | Tailor-Made Holidays",
      seoDescription: "Tailor-made holidays built around your dates, interests and budget, in India or abroad, from any starting city."
  },
  "senior-citizen": {
      intro:
        "Travel should get easier, not harder, with age. Our senior-friendly journeys keep walking manageable, travel days short and support close at hand, whether it is a yatra, a houseboat in Kerala or a train through the Swiss Alps.",
      benefits: [
        { title: "Comfortable pace", text: "Shorter travel days and plenty of rest." },
        { title: "Accessible choices", text: "Hotels and sights chosen with mobility in mind." },
        { title: "Help on hand", text: "A coordinator and our phone line throughout the trip." },
        { title: "Familiar food", text: "Simple vegetarian meals planned in advance." }
      ],
      planning: [
        "A medical check-up is advisable before high-altitude or long trips.",
        "Carry regular medicines with prescriptions in your hand luggage.",
        "Tell us about any mobility needs so we can plan transfers and rooms."
      ],
      faqs: [
        { q: "Can wheelchair users join?", a: "Many destinations can be adapted; tell us your needs and we will advise honestly." },
        { q: "Which destinations are easiest?", a: "Kerala, Rajasthan, Kashmir and Switzerland, where trains and cable cars do the climbing, are all good choices." }
      ],
      seoTitle: "Senior Citizen Tours | Comfortable, Gentle-Paced Holidays",
      seoDescription: "Holidays and yatras for senior citizens with a gentle pace, comfortable stays, simple vegetarian meals and support throughout."
  },
  "educational": {
      intro:
        "Heritage sites, science centres, wildlife parks and historic cities bring textbooks to life. We plan safe, well-supervised educational tours for schools and colleges, with transport, stays and meals handled end to end.",
      benefits: [
        { title: "Curriculum-linked ideas", text: "History, geography, science and culture destinations." },
        { title: "Safety first", text: "Vetted stays, group transport and clear schedules." },
        { title: "Simple for teachers", text: "Rooming lists, meal plans and documents prepared for you." },
        { title: "Value for students", text: "Group rail fares and coach options to keep costs sensible." }
      ],
      planning: [
        "Share the class level, student numbers and number of teachers accompanying.",
        "Plan around exams; October–February suits most institutions.",
        "We help with consent and medical information forms on request."
      ],
      faqs: [
        { q: "Which destinations suit educational tours?", a: "Hampi, Ajanta–Ellora, Rajasthan, Gujarat, Delhi–Agra and Singapore are all excellent choices." },
        { q: "Do you handle overnight rail journeys for students?", a: "Yes. Group rail bookings are often the most practical option." }
      ],
      seoTitle: "Educational Tours for Schools & Colleges | GuruPriya",
      seoDescription: "Safe, well-planned educational tours for schools and colleges to Hampi, Ajanta–Ellora, Rajasthan, Gujarat, Singapore and more."
  }
};
