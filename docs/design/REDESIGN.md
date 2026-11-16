# GuruPriya Website: Design System & Content Guide

How the redesigned site is put together, and how to change it safely.

## Brand

- **Logo pack** (official, never edited): `brand/logo-pack/`, 4 PNGs of the stacked logo (transparent 3840/1920/1080 px, plus one on white).
- **Web renditions**: `public/brand/` (WebP 96–480 px, PNG favicons 32/180/192/512, 1200×630 share image). Regenerate with `node scripts/images/optimize.mjs`.
- The pack has **no horizontal, icon-only, SVG or dark-background version**. Navy lettering disappears on dark backgrounds, so the header and footer are light. If a designer supplies those variants, drop them in `brand/logo-pack/` and update `src/components/ui/Logo.tsx`.

## Tokens (`tailwind.config.ts`)

| Token | Value | From the logo |
|---|---|---|
| `navy` (primary) | `#0F2B57` (scale 50–950) | "Guru" lettering, the G |
| `orange` / `saffron` (secondary) | `#F26A1B`; `600` = `#C44A0C` for white-text buttons (AA contrast) | "Priya" lettering, the P |
| `sun` | `#F5A524` | sunset disc |
| `sky` | `#12A3DD` | waves under the road |
| `leaf` | `#2E8B3E` | palm trees (used sparingly) |
| `sand` | `#F8F6F2` | warm neutral background |

Legacy names (`charcoal`, `gold`, `ivory`) are aliases to the new palette.

**Type:** Plus Jakarta Sans (headings, `font-display`), Inter (body), Noto Sans Devanagari (Marathi). Fluid sizes: `text-display-xl/lg/md`.

**Component classes** (`src/index.css`): `btn-primary`, `btn-navy`, `btn-secondary`, `btn-ghost-light`, `btn-link`, `card-premium`, `eyebrow`, `chip`, `field`, `container-site`, `section-py`.

## Reusable components

| Component | File |
|---|---|
| Header (utility bar, mega menus, mobile accordion) | `components/layout/Header.tsx` |
| Footer (with the coach road) | `components/layout/Footer.tsx` |
| Logo | `components/ui/Logo.tsx` |
| **Tourist coach** (SVG) | `components/bus/TouristBus.tsx` |
| Road strip with looping coach (hero, footer) | `components/bus/RoadStrip.tsx` |
| Scroll-driven journey scene | `components/bus/JourneyScene.tsx` |
| Page hero (mood overlays) | `components/ui/PageHero.tsx` |
| Section heading / reveal / FAQ / CTA band | `components/ui/*` |
| Destination, package, category and service cards | `components/cards/Cards.tsx` |

Animation rules: CSS/SVG only, paused when off-screen, static under `prefers-reduced-motion`. Framer Motion is only loaded on the yatra pages that already used it.

## Content: where to edit

| Content | File |
|---|---|
| Navigation | `src/data/navigation.ts` (built from the catalog) |
| Destinations (card data) | `src/data/catalog/destinations.ts` |
| Destination guide text (intro, attractions, tips, FAQs, gallery) | `src/data/catalog/destinationDetails.ts` |
| Tour categories (12 pages) | `categories.ts` + `categoryDetails.ts` |
| Tailor-made itineraries | `packages.ts` + `packageDetails.ts` |
| Travel services | `services.ts` |
| Scheduled yatras (unchanged) | `src/data/trips.ts` |
| Interface strings (EN/MR) | `src/i18n/strings.ts` + `en.ts` / `mr.ts` |

The light files load on every page; the `*Details.ts` files load only on detail pages. Keep long text in the details files so the site stays fast.

New destination or package: add an entry to the light file and the matching entry (same slug) in the details file. The page, menu, sitemap and structured data are generated automatically, and the build checks fail if a photo or link is missing.

## Photos

All photos are self-hosted WebP (`public/images/photos/<id>-800.webp` and `-1600.webp`), sourced from Wikimedia Commons under free licences, with credits on `/image-credits`.

- Add or replace: list the Commons file in `scripts/images/sources.json`, then run `node scripts/images/fetch-commons.mjs` and `node scripts/images/optimize.mjs`.
- Use your own photo: overwrite the two WebP files for an id and edit/remove its entry in `src/data/imageCredits.json`.
- Find candidates: `node scripts/images/commons-search.mjs "Dal Lake"`.

## Honesty rules built into the design

- **No prices** anywhere. Cards say "Dates & package details on enquiry".
- **Tailor-made** itineraries (suggested plans) are always badged differently from **scheduled departures** (real dated yatras).
- **Sample reviews never appear on the live site.** They appear only in local dev (`npm run dev`), labelled. Add genuine reviews in `src/data/reviews.ts` with `isSample: false`.
- No company-age, customer-count or tour-count claims. The Uttarakhand connection is the founder's personal story, quoted in his own words.

## Needs owner review

1. The 12 suggested tailor-made itineraries (`packages.ts` / `packageDetails.ts`): routes and "typically included" lists.
2. Services wording (`services.ts`), especially hotel, flight and corporate travel. Remove any service GuruPriya doesn't offer.
3. Destination guide facts. These are general, long-standing information; time-sensitive items (visas, permits) say "we confirm when you enquire".
4. Long-form guide content is English; the interface chrome is bilingual. Marathi translations of the guides can be added later.
