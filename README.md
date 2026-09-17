# GuruPriya Tours & Travels — Website

A bilingual (English / Marathi) pilgrimage travel website built as a static
React + TypeScript application, designed to deploy on **Cloudflare Pages**
with a single Cloudflare Pages Function handling the contact form via
**Resend**. There is no database — all business content lives in typed
data files under `src/data/`.

---

## 1. Technology

| Layer        | Choice                                   |
|--------------|-------------------------------------------|
| Frontend     | React 18 + TypeScript + Vite              |
| Styling      | Tailwind CSS                              |
| Animation    | Framer Motion                             |
| Icons        | lucide-react                              |
| Routing      | React Router v6                           |
| Map          | Leaflet + OpenStreetMap (via react-leaflet) |
| Email        | Resend API (server-side only)             |
| Hosting      | Cloudflare Pages / Pages Functions        |
| Database     | None                                       |
| Auth / CMS   | None                                       |

---

## 2. Folder Structure

```
functions/
  api/
    contact.ts        Cloudflare Pages Function — sends enquiries via Resend
  env.d.ts             Ambient PagesFunction type (no workers-types dependency)

public/
  favicon.svg, robots.txt, sitemap.xml

src/
  components/
    layout/            Header, Footer, AnnouncementBar, Layout
    ui/                 Button, Badge, SectionHeading, LanguageToggle, WhatsAppButton
    home/               Hero, FeaturedYatra, WhyTravelWithUs, HowItWorks, Philosophy,
                        Testimonials, FounderMessage, CTASection, ComingSoonPreview
    trips/              TripCard, ComingSoonCard
    trip-detail/        TripHero, QuickInfo, PricingCards, Features, RouteVisualization,
                        RouteMap, ItineraryTimeline, InclusionsExclusions,
                        RegistrationInfo, SpiritualGuidance, TripGallery, TripFAQ, EnquiryCTA
    contact/            ContactForm
  data/                 trips.ts, testimonials.ts, faqs.ts  ← single source of truth
  i18n/                 en.ts, mr.ts, I18nContext.tsx
  hooks/                useReducedMotion, useScrollPosition
  utils/                seo.ts, validation.ts, whatsapp.ts, format.ts
  pages/                One file per route (see App.tsx)
```

---

## 3. Local Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build       # type-check + production build to dist/
npm run preview     # preview the production build locally
```

The contact form calls `/api/contact`. Locally that endpoint is not served
by Vite — use `wrangler pages dev` (see below) if you need to exercise the
full form end-to-end, or run the frontend alone and confirm the request is
built correctly (it will 404 against the Vite dev server, which is expected).

```bash
npx wrangler pages dev -- npm run dev
```

---

## 4. Environment Variables

Copy `.env.example` and configure these **as Cloudflare Pages secrets**,
never as `VITE_`-prefixed variables and never in client code:

```
RESEND_API_KEY=   # from resend.com
CONTACT_EMAIL=    # where enquiries are delivered
FROM_EMAIL=       # a sender verified in your Resend domain
```

In the Cloudflare dashboard: **Pages → your project → Settings →
Environment variables → Production/Preview**, add all three as
**secret** (not plaintext) values. Because `functions/api/contact.ts`
runs server-side only, the key is never bundled into browser JavaScript.

---

## 5. Cloudflare Deployment

**Build command:** `npm run build`
**Build output directory:** `dist`
**Root directory:** repository root (contains both `dist` output and the
`functions/` folder, which Cloudflare Pages picks up automatically as
Pages Functions).

Steps:
1. Push this repository to GitHub/GitLab.
2. In Cloudflare dashboard → Workers & Pages → Create → Pages → connect
   the repository.
3. Set build command `npm run build`, output directory `dist`.
4. Add the three environment variables above as secrets.
5. Deploy. Every push to the main branch redeploys automatically.

No Workers KV, D1, or other bindings are required.

---

## 6. Editing Content (no code changes needed for data)

### Company details
`src/data/trips.ts` → `company` object (name, phones, office address,
WhatsApp number, per-city contact numbers).

### WhatsApp number
`company.whatsapp` in `src/data/trips.ts` (digits only, country code
first, e.g. `919730699805`).

### Founder story / About page
`src/data/trips.ts` → `founderStory` object.

### Adding a new yatra
1. Duplicate the shape of `featuredTrip` in `src/data/trips.ts`.
2. Push the new `Trip` object into the `trips` array at the bottom of the
   file.
3. The same `TripDetail` page and `TripCard` component automatically
   render it — no component changes required.
4. Add real coordinates to `routePoints` only for locations you can
   verify; the map gracefully falls back to a "map coming soon" message
   otherwise (see `RouteMap.tsx`).

### Editing the itinerary
Each `Trip.itinerary` entry is a day with `title`, `description` and a
list of `locations` (ids referencing `routePoints`). Do not add invented
hotel names or exact timings — leave `overnight` / `timings` unset until
confirmed, and the UI shows a "details will be shared" note instead.

### Coming Soon trips
`src/data/trips.ts` → `comingSoonTrips` array. These intentionally have no
`prices`/`itinerary` fields — do not add fake dates or prices.

### English content
`src/i18n/en.ts` — one flat, typed dictionary.

### Marathi content
`src/i18n/mr.ts` — must match the exact shape of `en.ts` (TypeScript will
error if a key is missing).

### Images
Each trip has a `heroImage` and a `gallery` array of `{ src, alt,
searchQuery }`. Replace `src` with your own licensed image URL or a local
path under `public/images/...`. `searchQuery` is kept as a hint for
sourcing a replacement image later.

---

## 7. Resend Email Flow

```
Browser (ContactForm.tsx)
   → POST /api/contact  (Cloudflare Pages Function)
      → validates input server-side (name, 10-digit Indian mobile, email)
      → checks honeypot field
      → POST https://api.resend.com/emails  (enquiry → CONTACT_EMAIL)
      → best-effort acknowledgement email → the customer
   ← { ok: true } or { error: "..." }
```

The Resend API key is read from `context.env.RESEND_API_KEY` inside the
Pages Function and is never present in any file served to the browser.

### Spam protection
- A hidden honeypot field (`company`) — bots that fill every field trip it;
  humans never see it (`display:none`, `tabIndex={-1}`).
- Server-side validation of name, email and Indian mobile number format,
  independent of the client-side checks in `utils/validation.ts`.
- Field length caps to reject unreasonably large payloads.

---

## 8. Map & Route Visualization

- `RouteVisualization.tsx` renders each of the three route sections as a
  horizontally scrollable strip of stops with a looping, purely decorative
  bus animation. It is explicitly labelled as illustrative, not a live
  tracker, and is disabled under `prefers-reduced-motion`.
- `RouteMap.tsx` renders an actual Leaflet + OpenStreetMap map using the
  verified coordinates stored on each `routePoints` entry, with a
  polyline, markers with popups, and a decorative animated marker. No
  Google Maps API key is required.
- If a future trip has route points without coordinates, the map section
  automatically shows a "map coming soon" message instead of guessing
  coordinates.

---

## 9. Accessibility & Motion

- `useReducedMotion()` reads `prefers-reduced-motion` and is used to
  disable the animated bus in both the route graphic and the map.
- Global CSS additionally shortens all animation/transition durations to
  near-zero when the OS-level reduced-motion setting is on.
- Forms use associated `<label>` elements, visible focus rings
  (`:focus-visible`), and inline error text tied to each field.

---

## 10. Troubleshooting

**Contact form always fails locally.** The Vite dev server does not run
Pages Functions. Use `npx wrangler pages dev -- npm run dev`, or test
against a deployed Preview environment.

**Map tiles don't load.** Confirm outbound requests to
`tile.openstreetmap.org` aren't blocked by your network/firewall.

**Marathi text looks like tofu/boxes.** Confirm the Google Fonts
`Noto Sans Devanagari` stylesheet in `index.html` is loading — check for
network/CSP restrictions blocking `fonts.googleapis.com`.

**Build fails with a module resolution error for `@/...` imports.**
Ensure both `tsconfig.json` (`paths`) and `vite.config.ts`
(`resolve.alias`) map `@` to `./src` — they must be kept in sync.

**TypeScript error after adding a new Marathi key.** `mr.ts` is typed as
`TranslationDictionary` (inferred from `en.ts`), so a missing or
mistyped key fails the build immediately rather than silently falling
back to English.
