# Content Plan: 30 Articles + First 30 Days

## Editorial rules (built into the site)

1. Every article is added to `src/data/blog.ts` with `status: "draft"`. Drafts appear **only in the local preview** (`npm run dev`), with a red Draft banner. They're never on the live site.
2. **A person who knows the facts reviews every article before publishing.** Ideally that's the founder, for anything about routes, seasons, health and registration. Check government sources for dates and rules: they change every year.
3. Publish by setting `status: "published"` and setting `datePublished` / `dateModified` to the real dates. The sitemap, nav link and `BlogPosting` schema update automatically on the next build.
4. Write from first-hand experience (what the group actually does, real photos from your yatras). This is what lets a small operator outrank aggregators. Never copy text from other sites.
5. **No prices**, and no claims about trips that aren't real. End every article with the enquiry CTA (built in).

## First 30 days after launch (publishing pace: 2 per week)

Quality over volume: 8 genuinely useful, reviewed articles beat 30 thin ones. Week numbers count from launch day.

| Week | Publish | Why first |
|---|---|---|
| 1 | #1 Char Dham Yatra from Latur (draft exists) · #4 Kainchi Dham travel guide | Directly support the two live trip pages |
| 2 | #2 Char Dham for senior citizens · #11 Jyotirlingas near Latur | Highest-converting audience · local relevance and trust |
| 3 | #3 Char Dham packing list · #5 Char Dham registration guide | Pre-season planning searches |
| 4 | #13 Rail, bus or flight: choosing your yatra mode · #6 Altitude sickness on Himalayan yatras | Explains a GuruPriya differentiator (all 3 modes) · safety trust |

**Seasonality:** Char Dham searches climb from about **January to May** before the April/May opening. Get #1–#6 published by February. Kainchi Dham interest peaks around the ashram's **15 June foundation day**. Publish #4 and #19 by May.

The remaining 22 articles form the backlog. Publish 1–2 a week after month one, in the order listed.

---

## The 30 articles

Each entry: **SEO title** · target keyword · intent · URL · meta description · outline (H2s) · internal links.

### Pilgrimage Travel

**#1 Char Dham Yatra from Latur: Route, Season and Planning Guide** *(draft in repo)*
- Keyword: char dham yatra from latur · Intent: informational → commercial · URL: `/blog/char-dham-yatra-from-latur-planning-guide`
- Meta: Planning the Char Dham Yatra from Latur or Marathwada? The route, best season, registration, fitness and packing tips from a group that runs the yatra.
- Outline: The traditional route · Best time to go · Registration · Fitness and health · What to pack · Travelling from Latur
- Links → Char Dham trip page, `/contact`, `/upcoming-yatras`, #2, #3, #5

**#2 Char Dham Yatra for Senior Citizens: A Practical Guide for Families**
- Keyword: char dham yatra for senior citizens · Intent: informational/commercial · URL: `/blog/char-dham-yatra-senior-citizens`
- Meta: Taking parents on the Char Dham Yatra? Health checks, pony, palki and helicopter options, pacing, food and what a well-run group does differently.
- Outline: Is Char Dham suitable for seniors? · Medical check before booking · Kedarnath: walking, pony, palki or helicopter · Pacing the itinerary · Food, rest and warm clothing · Choosing an organised group
- Links → Char Dham trip page, #6, #3, `/about` (founder's experience)

**#3 Char Dham Yatra Packing List: What to Carry (and What to Leave)**
- Keyword: things to carry for char dham yatra · Intent: informational · URL: `/blog/char-dham-yatra-packing-list`
- Meta: A tested packing list for Char Dham: layers, rain gear, shoes, medicines, documents and small things pilgrims forget, from a team that does the route.
- Outline: Clothing in layers · Footwear · Rain protection · Medicines and first aid · Documents and money · Small essentials · What not to bring
- Links → #1, #2, #6, Char Dham trip page

**#4 Kainchi Dham Travel Guide: Neem Karoli Baba Ashram, Timings and How to Reach**
- Keyword: kainchi dham travel guide · Intent: informational · URL: `/blog/kainchi-dham-travel-guide`
- Meta: Visiting Kainchi Dham, Neem Karoli Baba's ashram near Nainital? How to reach it from Maharashtra, darshan etiquette, crowds, and nearby temples.
- Outline: About Kainchi Dham · Reaching from Maharashtra (rail, road, air) · Darshan and ashram etiquette · Avoiding the crowds · Nearby: Nainital, Hanuman Garhi, Bhimtal · Travelling with a group
- Links → Kainchi Dham trip page, #19, `/contact`

**#5 Char Dham Yatra Registration: Step-by-Step Guide**
- Keyword: char dham yatra registration · Intent: informational · URL: `/blog/char-dham-yatra-registration-guide`
- Meta: Every Char Dham pilgrim must register with the Uttarakhand government. Here's who needs to, what documents to keep, and how group travel handles it.
- Outline: Why registration is mandatory · Who must register · Documents needed · Online vs. on-the-spot · How we handle it for our groups · Common mistakes
- Links → #1, Char Dham trip page, `/faq`
- ⚠ Verify against the official Uttarakhand Tourism portal before each season.

**#6 Altitude Sickness on Himalayan Yatras: Prevention and Warning Signs**
- Keyword: altitude sickness kedarnath · Intent: informational · URL: `/blog/altitude-sickness-himalayan-yatra`
- Meta: Kedarnath and Badrinath sit at high altitude. Learn how to acclimatise, the early warning signs, and when to descend. Written for pilgrims, not climbers.
- Outline: Why altitude matters · Who is at higher risk · Acclimatising on a yatra itinerary · Warning signs · What to do · Talk to your doctor first
- Links → #2, #3, Char Dham trip page
- ⚠ Have a doctor review this article.

**#7 Kedarnath Yatra Guide: Trek, Pony, Palki or Helicopter?**
- Keyword: kedarnath yatra guide · Intent: informational · URL: `/blog/kedarnath-yatra-guide`
- Meta: The Kedarnath climb explained: the trek from Gaurikund, pony and palki options, and how to book helicopter seats safely through official channels only.
- Outline: The route from Gaurikund · Walking: what to expect · Pony and palki · Helicopter: official booking only (scam warning) · Darshan · Where Kedarnath fits in Char Dham
- Links → Char Dham trip page, #2, #6

**#8 Badrinath and Mana Village: A Pilgrim's Guide**
- Keyword: badrinath yatra guide · Intent: informational · URL: `/blog/badrinath-mana-village-guide`
- Meta: What to see around Badrinath Dham, from Tapt Kund to Mana Village, and how Badrinath fits into a full Char Dham yatra from Maharashtra.
- Outline: Significance of Badrinath · Darshan and Tapt Kund · Mana Village · Panch Prayag on the way · Best season
- Links → Char Dham trip page, #1

**#9 Panch Prayag: The Five Sacred Confluences of Uttarakhand**
- Keyword: panch prayag uttarakhand · Intent: informational · URL: `/blog/panch-prayag-uttarakhand`
- Meta: Devprayag, Rudraprayag, Karnaprayag, Nandprayag and Vishnuprayag: the significance of each confluence, and where they fall on the Char Dham route.
- Outline: What a prayag is · The five, in route order · Significance of each · Seeing them on a Char Dham yatra
- Links → Char Dham trip page (itinerary days 6, 9, 10, 12)

**#10 Ayodhya, Prayagraj and Kashi: Combining Three Sacred Cities**
- Keyword: ayodhya prayagraj varanasi itinerary · Intent: informational · URL: `/blog/ayodhya-prayagraj-kashi-yatra`
- Meta: How pilgrims combine Ayodhya, Prayagraj and Kashi in one journey: route order, time needed, and highlights of each city.
- Outline: Why these three together · Ayodhya · Prayagraj: Triveni Sangam · Kashi Vishwanath and the ghats · Suggested route order · Joining a group yatra
- Links → Char Dham trip page (return route), `/upcoming-yatras`

### Maharashtra Tourism (local authority)

**#11 Jyotirlingas Near Latur: Parli Vaijnath and Aundha Nagnath**
- Keyword: jyotirlinga near latur · Intent: informational · URL: `/blog/jyotirlingas-near-latur`
- Meta: Two of the twelve Jyotirlingas are a short drive from Latur. A guide to Parli Vaijnath and Aundha Nagnath: significance, darshan tips, and how to plan a day trip.
- Outline: The 12 Jyotirlingas and Maharashtra's five · Parli Vaijnath · Aundha Nagnath · Planning a day trip from Latur · Combining with other temples
- Links → #12, `/destinations/maharashtra`, `/contact`

**#12 The Five Jyotirlingas of Maharashtra: A Complete Guide**
- Keyword: jyotirlinga in maharashtra · Intent: informational · URL: `/blog/jyotirlingas-of-maharashtra`
- Meta: Bhimashankar, Trimbakeshwar, Grishneshwar, Parli Vaijnath and Aundha Nagnath: where each is, its significance, and the best way to plan visits from Latur.
- Outline: Overview map · One section per Jyotirlinga · Suggested circuits · Best season
- Links → #11, `/upcoming-yatras`

**#13 Rail, Bus or Flight? Choosing How to Travel on Your Yatra**
- Keyword: yatra by train or bus · Intent: commercial · URL: `/blog/yatra-travel-mode-rail-bus-flight`
- Meta: Every GuruPriya yatra runs by railway, bus or flight. How the three compare on comfort, time, fatigue and suitability for elders, so you can choose well.
- Outline: Why we offer all three · Railway · Travels / bus · Flight · Which suits whom (elders, families, short leave) · How to enquire for your mode
- Links → `/packages`, both trip pages, `/services/bus-coach-tours`, `/contact?mode=…`

**#14 Tuljapur Tulja Bhavani Darshan from Latur: Guide**
- Keyword: tuljapur darshan · Intent: informational · URL: `/blog/tuljapur-tulja-bhavani-darshan`
- Meta: Planning Tulja Bhavani darshan at Tuljapur from Latur? Temple history, darshan tips, festival crowds and nearby places to include.
- Outline: Significance · Darshan tips · Navratri crowds · Nearby: Naldurg fort · Getting there from Latur
- Links → #11, `/contact`

**#15 Pandharpur Vitthal Darshan and the Wari: A Pilgrim's Guide**
- Keyword: pandharpur darshan guide · Intent: informational · URL: `/blog/pandharpur-vitthal-darshan`
- Meta: Vitthal–Rukmini darshan at Pandharpur: the Wari tradition, Ashadhi and Kartiki Ekadashi crowds, darshan queues and planning tips.
- Outline: Significance · The Wari · Ekadashi crowds · Darshan types · Planning tips
- Links → #11, #12

**#16 Akkalkot Shri Swami Samarth Darshan: Guide**
- Keyword: akkalkot swami samarth darshan · Intent: informational · URL: `/blog/akkalkot-swami-samarth-darshan`
- Meta: A guide to Shri Swami Samarth's Akkalkot: the samadhi math, darshan, annachhatra, and combining it with Ganagapur and Pandharpur.
- Outline: Significance · Darshan and annachhatra · Combining Ganagapur and Pandharpur · Getting there
- Links → #15, `/contact`

**#17 Mahur Renuka Devi: Shaktipeeth Guide**
- Keyword: mahur renuka devi · Intent: informational · URL: `/blog/mahur-renuka-devi-guide`
- Meta: Mahur's Renuka Devi temple is one of Maharashtra's Shaktipeeths, and the last stop of our Char Dham return route. History, darshan and travel tips.
- Outline: Significance · Temple and darshan · Nearby Dattatreya shrine · Getting there · On our Char Dham route
- Links → Char Dham trip page (day 17–18)

**#18 Ashtavinayak Yatra: Route and Planning Guide**
- Keyword: ashtavinayak yatra route · Intent: informational · URL: `/blog/ashtavinayak-yatra-route`
- Meta: The eight Ashtavinayak Ganpati temples: traditional order, a practical route, how many days to allow and the best season.
- Outline: The eight temples · Traditional order · Practical route · Days needed · Season
- Links → #12, `/upcoming-yatras`

### North India guides

**#19 Nainital, Hanuman Garhi and Bhimtal: What to See Around Kainchi Dham**
- Keyword: places near kainchi dham · Intent: informational · URL: `/blog/places-near-kainchi-dham`
- Meta: Make the most of a Kainchi Dham yatra: Naina Devi, Naini Lake, Hanuman Garhi, Bhimtal and more, and how much time each needs.
- Outline: Naina Devi temple · Naini Lake · Hanuman Garhi · Bhimtal · Suggested day plan
- Links → Kainchi Dham trip page, #4

**#20 Haridwar and Rishikesh: The Gateway to the Char Dham**
- Keyword: haridwar rishikesh guide · Intent: informational · URL: `/blog/haridwar-rishikesh-guide`
- Meta: Ganga Aarti at Har Ki Pauri, the ghats of Rishikesh, and why every Char Dham yatra begins and ends here.
- Outline: Haridwar: Har Ki Pauri and Ganga Aarti · Rishikesh: ghats and ashrams · Role in the Char Dham route · Tips
- Links → Char Dham trip page, #1

**#21 Tungnath and Chopta: The Highest Shiva Temple Explained**
- Keyword: tungnath temple guide · Intent: informational · URL: `/blog/tungnath-chopta-guide`
- Meta: Tungnath, often called the world's highest Shiva temple, and the meadows of Chopta: the trek, the season, and how we include it on our Char Dham yatra.
- Outline: Significance · The trek from Chopta · Season and weather · Panch Kedar context
- Links → Char Dham trip page (day 8), #6
- ⚠ Verify the superlative claim before publishing.

**#22 Ujjain and Omkareshwar: Two Jyotirlingas on the Way North**
- Keyword: ujjain omkareshwar darshan · Intent: informational · URL: `/blog/ujjain-omkareshwar-darshan`
- Meta: Mahakaleshwar at Ujjain and Omkareshwar on the Narmada: why many Maharashtra yatras stop here on the way north, and darshan tips.
- Outline: Mahakaleshwar · Bhasma Aarti · Omkareshwar · Fitting both into a route
- Links → Char Dham trip page (day 1)

### South India (publish when those yatras get dates)

**#23 Tirupati Darshan from Maharashtra: A Planning Guide**
- Keyword: tirupati darshan from maharashtra · Intent: informational/commercial · URL: `/blog/tirupati-darshan-guide`
- Meta: Planning Tirumala darshan from Latur or Solapur? Darshan types, booking through official TTD channels, dress code and travel options.
- Outline: Darshan types (official TTD booking only) · Dress code and rules · Getting there · Group travel
- Links → `/upcoming-yatras`, `/contact`

**#24 Rameshwaram, Kanyakumari and Kerala: A Southern Pilgrimage Circuit**
- Keyword: rameshwaram kanyakumari tour · Intent: informational · URL: `/blog/rameshwaram-kanyakumari-kerala-circuit`
- Meta: Ramanathaswamy at Rameshwaram, sunrise at Kanyakumari and Kerala's temples: a southern circuit explained for pilgrims from Maharashtra.
- Outline: Rameshwaram · Kanyakumari · Kerala temples · Route and season
- Links → `/upcoming-yatras`

**#25 Great Temples of South India: A First-Timer's Guide**
- Keyword: famous temples of south india · Intent: informational · URL: `/blog/south-india-temples-guide`
- Meta: From Thanjavur's Brihadeeswara to Madurai's Meenakshi: the great temples of South India and how to plan a pilgrimage circuit.
- Links → `/upcoming-yatras`, #24

### Travel tips & family travel

**#26 First Pilgrimage With Your Parents? 10 Things to Plan Ahead**
- Keyword: pilgrimage with elderly parents · Intent: informational · URL: `/blog/pilgrimage-with-elderly-parents`
- Meta: Practical tips for taking elderly parents on a yatra: medical prep, seat choice, food, rest days, documents and staying together in crowds.
- Links → #2, #13, `/tours/family`, `/tours/senior-citizen`

**#27 Group Yatra vs. Travelling on Your Own: An Honest Comparison**
- Keyword: group pilgrimage tour benefits · Intent: commercial · URL: `/blog/group-yatra-vs-solo`
- Meta: Is an organised group yatra right for you? An honest look at planning effort, safety, darshan arrangements and flexibility.
- Links → `/tours/group`, `/about`, `/contact`

**#28 Pure Vegetarian Food on Yatra: What to Expect**
- Keyword: pure veg food char dham · Intent: informational · URL: `/blog/pure-vegetarian-food-on-yatra`
- Meta: How pure vegetarian meals are handled on a long yatra: on the road, in the mountains, and on fasting days.
- Links → Char Dham trip page (inclusions)

**#29 How to Choose a Pilgrimage Tour Operator: 8 Questions to Ask**
- Keyword: how to choose pilgrimage tour operator · Intent: commercial · URL: `/blog/choosing-pilgrimage-tour-operator`
- Meta: Before you pay an advance, ask these 8 questions about itinerary, stays, meals, medical support, refunds and who leads the group.
- Links → `/faq`, `/terms`, `/about`

**#30 Yatra Documents Checklist: ID, Registration and Medical Papers**
- Keyword: documents for char dham yatra · Intent: informational · URL: `/blog/yatra-documents-checklist`
- Meta: A one-page checklist of the documents to carry on any yatra: photo ID, registrations, medical prescriptions, emergency contacts and copies.
- Links → #5, #3, `/faq`

---

### Internal-linking rules
- Every article links to **at least one trip page** and to **`/contact`** (the CTA block does this automatically).
- Trip pages should link back to their 2–3 best guides. Add a "Planning guides" block on `TripDetail` once ≥2 related articles are published (`post.relatedTrips` already holds the mapping).
- Use descriptive anchor text ("Char Dham itinerary from Latur"), not "click here".
