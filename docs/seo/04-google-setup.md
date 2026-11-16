# Google Integration: Setup Instructions

All of this needs **your** Google accounts and is done when the site goes live.

Every ID goes into **Cloudflare Pages → `gurupriya` → Settings → Environment variables → Production**, then redeploy. Nothing is hardcoded in the code.

| Variable | Example format | Used for |
|---|---|---|
| `GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics 4 |
| `GOOGLE_SITE_VERIFICATION` | the `content` value Google gives you | Search Console HTML-tag verification (optional if you use DNS) |

---

## 1. Google Search Console

1. Go to <https://search.google.com/search-console> → **Add property** → **Domain** → enter `gurupriyatours.com`.
2. Google shows a **TXT record**. In Cloudflare → the domain → **DNS** → add a `TXT` record at `@` with that value. Click **Verify**. A Domain property covers `www`, the apex and `https` all at once, and survives redeploys. This is the recommended method.
   *Alternative:* a URL-prefix property for `https://www.gurupriyatours.com/` with the **HTML tag** method → put the code in `GOOGLE_SITE_VERIFICATION` → redeploy.
3. **After launch only:** Sitemaps → submit `https://www.gurupriyatours.com/sitemap.xml`.
4. URL Inspection → test the home page and one trip page → **Request indexing**.
5. Check weekly for the first month: Pages (indexing errors), Core Web Vitals, Enhancements (Breadcrumbs).

Never add `*.pages.dev` as a property.

## 2. Google Analytics 4

1. <https://analytics.google.com> → Admin → **Create property** "GuruPriya Tours", time zone India, currency INR.
2. **Data stream → Web** → `https://www.gurupriyatours.com`. Turn **Enhanced measurement** on, but switch **Page views → "page changes based on browser history events" OFF**: the site sends its own SPA page views, and leaving both on double-counts.
3. Copy the **Measurement ID** (`G-…`) into `GA4_MEASUREMENT_ID` (Production) → redeploy.
4. Admin → Events → mark as **key events (conversions)**: `generate_lead`, `whatsapp_click`, `phone_call_click`.
5. Admin → Data retention → 14 months.
6. Test: open the live site with GA's **DebugView** (or the Tag Assistant extension) → submit a test enquiry → confirm `generate_lead` arrives.

Events the site already sends:

| Event | Fires when | Parameters |
|---|---|---|
| `page_view` | every route change | `page_path`, `page_title` |
| `generate_lead` | enquiry form sent successfully | `form`, `yatra`, `travel_mode` |
| `whatsapp_click` | any WhatsApp link/button | `page_path` |
| `phone_call_click` | any `tel:` link (header, footer, mobile bar, contact page) | `link_url`, `page_path` |

**Google Tag Manager isn't needed.** Direct GA4 is lighter and covers everything above. Add GTM later only if you start running Google Ads or Meta ads with several tags.

**Privacy:** the Privacy Policy should mention analytics cookies once GA4 is on. India's DPDP Act requires notice and purpose limitation. Have the owner or a lawyer review the policy text before launch.

## 3. Google Business Profile (the biggest local-SEO lever)

For "travel agency in Latur" type searches, the Maps pack usually outranks websites.

1. <https://business.google.com> → add **GuruPriya Tours**, category **Travel agency** (secondary: *Tour operator*, *Pilgrimage place*… pick only what's accurate).
2. Address: exactly as on the site: *Shri Swami Samarth Girls' Hostel, next to Ambika Temple, behind the Bus Stand, Latur, Maharashtra* (+ PIN code). **Name, address and phone must be identical** on the website, the profile and every directory listing.
3. Phone: the same primary number as the site (`9730699805`). Website: `https://www.gurupriyatours.com`.
4. Complete verification (postcard, video or phone, whichever Google offers).
5. Add real photos from your yatras, opening hours, and a short description.
6. **Ask real pilgrims from the Char Dham 2026 group for Google reviews.** That's genuine, and it's what Google shows in local results.
7. Then fill these in `src/data/trips.ts → company` and redeploy:
   - `googleBusinessProfileUrl`: the profile's Maps share link. The Contact page's "View on Google Maps" button uses it, and it's added to `sameAs` in schema.
   - `address.postalCode`: the PIN code, once confirmed.

Don't create profiles for Pune/Solapur/Naldurg etc. unless there's a real staffed office there. Those are contact numbers, not offices, and fake locations get suspended.

## 4. Google Maps on the site

The Contact page links to Google Maps (no API key or cost). An embedded map isn't recommended: it adds ~500 KB of JavaScript to the conversion page. The existing OpenStreetMap route maps on trip pages need no Google key.

## 5. Real reviews on the site

When real reviews exist, put them in `src/data/reviews.ts` with `isSample: false` and remove the samples. Reviews are intentionally **not** marked up as `Review`/`AggregateRating`: Google doesn't show star snippets for a business's own reviews of itself, and the risk of a manual action isn't worth it.

## 6. SEO monitoring dashboard: specification

Build it in **Looker Studio** (free), with the **Search Console** and **GA4** connectors. One page, refreshed daily, default range last 28 days vs. the previous period.

| Panel | Source | Metric / dimension | Why |
|---|---|---|---|
| Organic clicks (trend) | Search Console | Clicks by date | Headline traffic |
| Organic impressions (trend) | Search Console | Impressions by date | Visibility before clicks come |
| CTR | Search Console | Site CTR; table of queries with impressions > 50 and CTR < 2% | Titles to rewrite |
| Average position | Search Console | Position by query (top 25) | Progress on the P1 keywords |
| Indexed pages | Search Console → Pages (manual monthly note, no API) | Indexed vs. submitted | Catch indexing problems |
| Top landing pages | Search Console | Clicks by page | What content works |
| Enquiries | GA4 | `generate_lead` count, by landing page and source/medium = organic | The business outcome |
| WhatsApp + call clicks | GA4 | `whatsapp_click`, `phone_call_click` by page | Most leads won't use the form |
| Mobile performance | Search Console → Core Web Vitals (mobile) | Good / Needs improvement / Poor URLs | LCP/INP/CLS from real users |
| Brand vs. non-brand | Search Console | Clicks where query contains "gurupriya" vs. not | Growth beyond people who already know you |

Monthly review (30 min): pick 2 low-CTR titles to rewrite, 1 page to improve, and plan the next month's articles from real queries.
