# GuruPriya Tours & Travels: SEO Audit & Implementation Report

Date: 15 Nov 2026 · Scope: full repository audit and technical SEO implementation.

> **Owner decisions applied (15 Nov 2026):** domain is **www.gurupriyatours.com** · the site goes **live directly**, so the Coming Soon page and the staging password layer were removed · **English is the default language** (what Google indexes) and visitors can still switch to Marathi · phone numbers are shown, but the **email address is not**: visitors are asked to submit the enquiry form instead.

## Update: SEO pass on the redesigned site

This section is current. Sections 1–5 below describe the original audit and remain as history.

**Site now:** 71 indexable-or-intentionally-noindexed URLs, comprising:
- home and about
- package listing, plus 12 tailor-made and 2 scheduled packages
- 12 tour categories
- 25 destination guides, including the new Char Dham Yatra, Kashi–Ayodhya–Prayagraj and Tirupati guides
- 7 services
- contact, FAQ, gallery, blog, terms, privacy and credits

It is previewed (noindex) at `gurupriya-redesign.gurupriyatours.workers.dev` until launch.

| Area | Status (measured) |
|---|---|
| Crawlable rendering | **Full page body prerendered** (React SSR at build time, then hydrated): H1, text, internal links, breadcrumbs and hero image are in the static HTML. No hydration errors in the browser console. |
| Head metadata | Unique title, description, canonical, Open Graph, Twitter and JSON-LD per page, prerendered. Titles ≤ 60 chars. |
| Structured data | Schema.org validator: **0 errors / 0 warnings on all 11 pages tested** (`node scripts/validate-schema.mjs <url>`). Types: TravelAgency, WebSite, WebPage/AboutPage/ContactPage/CollectionPage, BreadcrumbList, TouristTrip, TouristDestination (+ TouristAttraction), Service, BlogPosting. Still no Review/Rating/Offer/Event/FAQPage, deliberately. |
| Automated build checks | Now also inspect the rendered HTML: exactly one H1 per page, alt on every image, every internal link resolves. Verified to catch deliberately broken pages. |
| Lighthouse (mobile, simulated slow 4G) | SEO **100**, Accessibility **100**, Best Practices **100** on all pages tested. Performance 80–93. FCP 0.8–2.2 s. CLS ≈ 0. TBT ≤ 120 ms. |
| LCP | **3.2–4.7 s lab: target of 2.5 s not yet met.** Remaining cost: ~112 KB of JavaScript and photo weight on a simulated 1.6 Mbps link. Real-visitor (CrUX) data in Search Console after launch is what Google uses. |
| Local SEO | Consistent name, address and phone (Latur office) in footer, contact page and TravelAgency schema. New local FAQs (office location; travellers from Pune, Solapur and nearby). No fake offices or location pages. |
| Content | Pilgrimage hubs added where there is genuine content. Kedarnath, Badrinath, Rishikesh, Haridwar, Manali, Hampi and Gokarna stay as sections of their state guides, because separate pages would be thin duplicates. |

Performance work in this pass:
- full-body prerendering, which cut FCP from about 2 s to 0.8 s
- the SEO manifest and detail data are no longer loaded on first page view
- breadcrumbs are prerendered
- hero slides 2–3 are deferred until after load
- the font preload was removed, so fonts no longer compete with the hero image

---

## 1. What the site is (architecture as found)

| Area | Finding |
|---|---|
| Frontend | React 18 + TypeScript + Vite 5, Tailwind CSS, Framer Motion, React Router v6 (client-side SPA) |
| Backend | One Cloudflare Pages Function, `POST /api/contact` (emails via Resend). No database, no CMS |
| Hosting | Cloudflare Pages, project `gurupriya`, GitHub-connected (`.node-version` = 20) |
| Content | Typed data files in `src/data/` (2 yatras, 3 "coming soon" circuits, FAQs, sample reviews) |
| Language | Bilingual EN/MR on **the same URLs**, toggled client-side; **default = Marathi** |
| Public pages | `/`, `/yatras`, `/yatras/:slug` (×2), `/coming-soon`, `/about`, `/contact`, `/gallery`, `/faq`, `/terms`, `/privacy` |

---

## 2. Audit findings (before changes)

### Critical
| # | Issue | Impact |
|---|---|---|
| C1 | **All SEO metadata was set by JavaScript after load** (`useSeo` hook); every URL served the identical `index.html` head. | Social previews (WhatsApp, Facebook) and non-JS crawlers saw the same generic title/description for every page. |
| C2 | **`/* /index.html 200` catch-all**: every URL, including nonsense, returned HTTP 200. | Soft-404s; Google can index junk URLs. |
| C3 | **Sitemap and robots.txt pointed at `gurupriyatravels.example.com`**. | Sitemap unusable; wrong host. |
| C4 | **Canonical = `window.location.href`**, so query strings (`?yatra=…`) and the `*.pages.dev` host became canonicals. | Duplicate URLs; pages.dev could compete with the real domain. |
| C6 | Footer and Contact page showed a fake email `enquiry@gurupriyatravels.example.com`. | Lost enquiries; looks broken. |

### High
| # | Issue |
|---|---|
| H1 | No structured data at all (no TravelAgency, WebSite, BreadcrumbList, TouristTrip). |
| H2 | 6 pages had **no `<h1>`** (Yatras, Contact, Gallery, FAQ, Terms, Privacy). |
| H3 | **Images**: all photos hotlinked from Wikimedia Commons at 1920px (650 KB–1.4 MB each), behind a redirect; the hero was a CSS background (not discoverable early). Home LCP measured **10.4 s** (Lighthouse mobile). |
| H4 | **Image licensing**: Wikimedia images are mostly CC BY / CC BY-SA and **require attribution**, which the site doesn't show. The Gallery presents stock photos as "glimpses from our pilgrimage journeys". |
| H5 | **Reviews and testimonials are samples** (labelled "Sample" in the UI). Acceptable pre-launch; must be real (or removed) at launch. They are never put in structured data. |
| H6 | `public/node_modules/` (an accidental `npm install` inside `public/`) would be published by any local build or `wrangler` deploy. |
| H7 | Enquiry form required email (most pilgrims prefer phone/WhatsApp), had no consent checkbox, and no bot protection beyond a honeypot. |

### Medium
| # | Issue |
|---|---|
| M1 | Trip titles 70–78 chars (truncated in results); no titles were keyword-led. |
| M2 | No breadcrumbs (UI or schema). |
| M3 | Leaflet map CSS loaded render-blocking on every page; Google Fonts CSS render-blocking. |
| M4 | Layout shift (CLS 0.11–0.16) on lazily-loaded pages. |
| M5 | Accessibility: white-on-orange buttons 3.66:1, white-on-WhatsApp-green 1.98:1, several grey text tokens below 4.5:1, unnamed map marker "button", heading-order skips. |
| M6 | `/coming-soon` URL for the *upcoming yatras* list reads as a placeholder page to users and Google. |
| M7 | No analytics / conversion tracking; no Search Console verification path. |

### Low
| # | Issue |
|---|---|
| L1 | No blog / content-marketing architecture. |
| L2 | No `Call` shortcut on mobile; phone numbers weren't tappable links. |
| L3 | No security headers; no cache headers for hashed assets. |

### Language (decided)
English and Marathi share the same URLs and visitors switch with the toggle. **English is now the default**, so Google indexes the English version that the titles and descriptions target. A visitor who picks Marathi gets Marathi on later visits too (remembered in the browser). Search engines see one consistent language, and there's no cloaking.

---

## 3. What was implemented

### Technical SEO (Phase 2)
| Requirement | Implementation |
|---|---|
| Central metadata | `src/seo/routes.ts`: one manifest of every URL (title, description, canonical, OG image, breadcrumbs, JSON-LD, sitemap inclusion). |
| Crawlable head | `scripts/build.mjs` **prerenders a real HTML file per route** (`about.html`, `yatras/<slug>.html`, …) with unique `<title>`, description, canonical, robots, Open Graph, Twitter card and JSON-LD in the static HTML. No JavaScript is needed to read them. |
| Client navigation | `SeoManager` (`src/utils/seo.ts`) swaps the same tags on in-app navigation. Verified: exactly one title/canonical/description/robots/JSON-LD after hydration. |
| Canonicals | Absolute, on `SITE_URL`, no query strings. pages.dev host gets `X-Robots-Tag: noindex`. |
| HTTP status | SPA catch-all removed. Unknown URLs → `404.html` with **HTTP 404** + noindex. Unknown trip slugs show the 404 page (previously redirected). Verified locally. |
| Redirects | `/coming-soon` → `/upcoming-yatras` (301). |
| Sitemap | Generated at build from the manifest, **production only**, indexable pages only. |
| robots.txt | Generated per environment (see §5). |
| Headings | Every page has exactly one `<h1>` (build check enforces it). |
| Breadcrumbs | Visible trail on all inner pages + `BreadcrumbList` JSON-LD, same source. |
| Images | Responsive `srcset` heroes as real `<img fetchpriority=high>` + matching `<link rel=preload imagesrcset>`; cards at 960px; thumbnails at 330px; alt text on gallery lightbox. |
| 404 | Branded page, noindex, correct status. |
| Pagination | Not applicable (≤ 2 trips; blog has no pagination yet). |
| Mobile | Sticky Call / WhatsApp / Enquire bar under 1024px; tappable phone numbers. |

### Structured data (Phase 3)
| Type | Where | Notes |
|---|---|---|
| `TravelAgency` (LocalBusiness) | Home, Contact | Name, alt names (EN/MR), logo, phone, email, Latur street address, founder, contact point, languages. **No postal code** (not verified). `sameAs` empty until real profiles exist. |
| `WebSite` | Home | |
| `WebPage` / `AboutPage` / `ContactPage` / `CollectionPage` | Every page | |
| `BreadcrumbList` | Every inner page | |
| `TouristTrip` | Each yatra | Itinerary as an `ItemList` of `TouristDestination`s with verified coordinates; provider = the agency. |
| `BlogPosting` | Each article | Author, published/modified dates, image. |
| **Deliberately not used** | | **AggregateRating/Review** (samples; self-serving reviews aren't eligible anyway), **Offer/Product/price** (no prices published), **Event** (Google's event guidelines exclude travel packages), **FAQPage** (rich results restricted to government/health sites since Aug 2023). |

Validation: every JSON-LD block is parsed and checked for required properties on every build. **Still to do once live:** test each page URL in Google's [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/). I can't run those from here.

### Conversion (Phase 10)
- Email is now **optional**; the team calls back by phone.
- **Consent checkbox** (required, links to the Privacy Policy), validated client- and server-side.
- Spam: honeypot (existing) + **time-trap** (submissions under 3 s are silently dropped) + same-origin check + JSON-only + 16 KB body cap.
- Acknowledgement email is sent only when the customer gives an email.
- Mobile CTA bar; WhatsApp floating button kept on desktop.
- No booking or payment added.

### Analytics (Phase 11)
`src/utils/analytics.ts`: GA4 loads **only** in production builds with `GA4_MEASUREMENT_ID` set. Events: `page_view` (SPA), `generate_lead` (form success), `phone_call_click`, `whatsapp_click` (all `tel:` / WhatsApp links site-wide). Search Console verification via `GOOGLE_SITE_VERIFICATION`. No IDs are hardcoded.

### Blog (Phase 8)
`/blog` and `/blog/:slug` with author, published/updated dates, featured image, `BlogPosting` schema, breadcrumbs, related yatras, related articles, WhatsApp/Facebook/copy-link sharing. **Drafts render only in the local preview, `npm run dev`** (red "Draft" banner, noindex) and are excluded from production routes, nav and sitemap. One draft is included as a template: *Char Dham Yatra from Latur: Route, Season and Planning Guide*. It needs your review before publishing.

### Performance & accessibility (Phase 9). Measured, not assumed
Lighthouse 13.6 mobile (simulated slow 4G, 4× CPU), production build served locally with gzip. Wikimedia images were fetched live.

| Page | Before: Perf / LCP / CLS | **After: Perf / LCP / CLS / TBT** | A11y | SEO |
|---|---|---|---|---|
| Home | 69 / 10.4 s / 0 | **76 / 6.3 s / 0.001 / 70 ms** | 93 → **100** | 100 |
| Kainchi Dham trip | 67 / 5.7 s / 0.157 | **72 / 7.0 s / 0.002 / 170 ms** | 93 → **100** | 100 |
| Contact | 84 / 3.9 s / 0.114 | **87 / 3.9 s / 0.006 / 90 ms** | 95 → **100** | 100 |
| Yatras | — | **81 / 5.1 s / 0.055 / 60 ms** | 91 → 96 → fixed* | 100 |

\* the last contrast item was fixed after this run.

**Targets: CLS ≤ 0.1 ✅ and INP/TBT ✅ are met. LCP ≤ 2.5 s ❌ is not met on image-heavy pages.** The remaining LCP is almost entirely the hotlinked Wikimedia photos (≈200 KB hero JPEG behind a cross-site redirect; trip pages load a further ~1.3 MB of gallery images). Lab numbers are pessimistic estimates; real-user Core Web Vitals will come from Search Console after launch. To hit 2.5 s:
1. **Replace stock photos with GuruPriya's own yatra photos**, self-hosted as WebP/AVIF at 500/960/1280/1920 widths (≈60–90 KB for a mobile hero). This also fixes H4 (licensing) and the "third-party cookies" Best-Practices failure, which comes from Wikimedia.
2. Optionally reduce JavaScript: Framer Motion is ~40 KB gz of the 129 KB main bundle.

Other performance work done: route-level code splitting with per-route `modulepreload`; Leaflet CSS moved into the lazy map chunk; Google Fonts made non-blocking; immutable caching for `/assets/*`; CLS fixed (full-height lazy placeholder).

---

## 4. Automated validation (Phase 13)

`scripts/seo-check.mjs` runs at the end of **every build** and fails it on any error:

- exactly one non-empty `<title>`; meta description present; titles/descriptions unique; length warnings
- canonical present, on `SITE_URL`, equal to the page's own URL
- home page indexable; robots.txt never blocks the site
- sitemap present, every URL resolves to a page, no noindex pages listed
- no `*.pages.dev` hosts or `example.com` placeholders in the output
- every JSON-LD block parses, has required properties, contains **no ratings/reviews/prices**
- every internal link in the source resolves to a built page; every `/images/...` reference exists
- every page component renders an `<h1>`
- no SPA catch-all in `_redirects`; no `node_modules` in `dist/`

I sabotaged builds on purpose to confirm each class of failure is caught: duplicate title, broken JSON-LD, fake `aggregateRating`, `Disallow: /`, preview-host link. The enquiry API passed 12 unit tests (consent, origin, content-type, size cap, time-trap, honeypot, optional email).

---

## 5. Deliberately NOT done (and why)

- **No pages for International tours, Goa, Kashmir, Kerala holidays, weekend getaways, etc.** GuruPriya doesn't sell these. Pages for them would invent offerings and be thin content, which the brief rules out. Add each when a real departure exists.
- **No destination pages for Kedarnath/Badrinath/Varanasi yet.** The Char Dham trip page already carries the full itinerary; evergreen guides are planned as blog articles (see content calendar) and can graduate into destination hubs once there are repeat departures.
- **No Event, Product, Offer, Review or FAQPage markup** (see §3).
- **No keyword search volumes or difficulty scores**: no keyword tool was available, and the brief forbids inventing them. See `02-keywords.md` for how to get real numbers.
- **No deploy, DNS change or Google submission yet.** Go-live steps are in `05-launch.md`.
