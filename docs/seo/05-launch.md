# Going Live: www.gurupriyatours.com

Changes go to **staging first, then production**. Both deploy from your machine with Wrangler. Pushing to GitHub does not deploy anything.

| Environment | Where | Command | Search engines |
|---|---|---|---|
| **Staging** | Worker `gurupriya-redesign`: https://gurupriya-redesign.gurupriyatours.workers.dev | `npm run deploy:staging` | `noindex` on every response |
| **Production** | Pages project `gurupriya`: https://www.gurupriyatours.com | `npm run deploy:production` | indexable, sitemap |

Both commands run the full build and its SEO checks first, and stop if anything fails.

Workflow: make changes → `npm run deploy:staging` → review on the staging URL → `npm run deploy:production`.

The staging enquiry form needs the email secrets set once (see `wrangler.staging.jsonc`). Production already has them.

## 1. What every build does

`npm run build`:

1. Builds the React app with code splitting.
2. **Prerenders every page in full** (React server rendering at build time): head tags, H1, text, internal links, breadcrumbs and hero image are all in the HTML file, and the browser hydrates it.
3. Writes the deployment files:
   - `sitemap.xml` and `robots.txt`
   - `404.html` (served with a real HTTP 404)
   - `_redirects` (`/coming-soon` → `/upcoming-yatras`, `/yatras` → `/tours/pilgrimage`)
   - `_headers` (security and caching headers, plus noindex on `*.pages.dev`)
   - `_routes.json` (Functions only run for `/api/*`)
4. Runs the automated SEO checks on the generated HTML. **Any error stops the deploy**, so a broken page can't go live.

After deploying, validate structured data with `node scripts/validate-schema.mjs https://www.gurupriyatours.com`.

Draft blog articles never reach the live site. Review them locally with `npm run dev`.

## 2. One-time Cloudflare setup (needs your login)

1. **Custom domain:** Pages → `gurupriya` → Custom domains → add `www.gurupriyatours.com` (and `gurupriyatours.com`).
2. **Apex → www:** Rules → Redirect Rules → if hostname equals `gurupriyatours.com` → `https://www.gurupriyatours.com${path}`, 301, keep the query string.
3. **HTTPS:** SSL/TLS → Edge Certificates → **Always Use HTTPS** on.
4. **Variables** (Settings → Variables and Secrets → Production):

| Variable | Value |
|---|---|
| `SITE_URL` | `https://www.gurupriyatours.com` (also the default, so optional) |
| `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` | already set (secrets) |
| `GTM_CONTAINER_ID` | optional; defaults to `GTM-TVQX9W8K` (see `04-google-setup.md`) |
| `GOOGLE_SITE_VERIFICATION` | only if you verify Search Console by HTML tag |

5. **Resend:** verify `gurupriyatours.com` in Resend and set `FROM_EMAIL` to an address on it (e.g. `GuruPriya Tours <enquiry@gurupriyatours.com>`). Until then, customer acknowledgement emails won't deliver; enquiries to you still do.

## 3. Go-live checklist

Before pushing
- [ ] `npm run build` passes with 0 errors
- [ ] Sample reviews and testimonials replaced with real ones, or hidden
- [ ] Draft article reviewed; set `status: "published"` if it should go live
- [ ] Privacy Policy mentions analytics (if GA4 is on) and the enquiry consent

After the deploy
- [ ] `https://www.gurupriyatours.com/robots.txt` and `/sitemap.xml` load
- [ ] `https://gurupriyatours.com` redirects to `https://www.gurupriyatours.com`
- [ ] A made-up URL (e.g. `/abc`) shows the Not Found page and returns **404**; `/coming-soon` returns **301**
- [ ] On a phone: Call, WhatsApp and Enquire buttons work; language toggle works; submit a test enquiry and confirm it arrives
- [ ] Paste the home page, a trip page and the contact page into Google's [Rich Results Test](https://search.google.com/test/rich-results): no errors
- [ ] Search Console: verify, submit the sitemap, request indexing for the home and trip pages (`04-google-setup.md`)
- [ ] Google Business Profile created with the same name, address and phone as the site

## 4. Still open

| Item | Notes |
|---|---|
| Your own yatra photos | Biggest remaining speed win (LCP) and removes the Wikimedia licensing issue. Then set `GALLERY_HAS_OWN_PHOTOS = true` in `src/seo/routes.ts`. |
| Real reviews | From the Char Dham 2026 pilgrims, in `src/data/reviews.ts` with `isSample: false`. |
| PIN code + Google Business Profile link | `company.address.postalCode` and `company.googleBusinessProfileUrl` in `src/data/trips.ts`. |
| Social profiles | Add real URLs to `SOCIAL_PROFILES` in `src/config/site.ts`. |
| Social share image | A 1200×630 image to replace the logo as `DEFAULT_OG_IMAGE`. |
| GitHub repo visibility | Optional: content is public anyway once the site is live. |
