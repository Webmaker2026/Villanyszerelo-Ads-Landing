# README FIRST

This is a static HTML/CSS/JS website built for Google Ads traffic. There is
**no framework, no build step, and no server-side code required to host it.**
Upload the contents of this folder to your webhosting document root
(`public_html/` or `www/`) and it works.

Before going live, replace every placeholder below. Nothing on the site
should still say `[BRAND_NAME]` or similar when it is public.

## 1. How content is structured

- Every page is a plain `.html` file (e.g. `villanyszereles/index.html`).
- `assets/css/styles.css` — all styling, one file.
- `assets/js/business-data.js` — the single place that lists every business
  placeholder value (phone, email, address, etc.).
- `assets/js/app.js` — mobile nav, FAQ accordion, lead-form handling.
- `assets/js/tracking.js` — GTM `dataLayer` bridge + consent banner.
- `tools/` — **not required on the live server.** This is the Node.js
  generator used to author the site (so ~13 pages share one consistent
  header/footer/design instead of being hand-copy-pasted). See "Editing the
  site" below. Do not upload `tools/` to your host — it is not needed there.

## 2. Placeholders you MUST replace

Every one of these appears as a literal bracketed token across the HTML
files, and also in `assets/js/business-data.js`. You can either:

- **Find-and-replace** the token (e.g. `[BRAND_NAME]`) across all `.html`
  files with your text editor, **or**
- Edit the single source of truth in `tools/site-data.js` and
  `assets/js/business-data.js`, then run `node tools/generate.mjs` to
  regenerate every HTML file at once (requires Node.js, only for editing —
  not for hosting).

| Placeholder | Where it's used | Example replacement |
|---|---|---|
| `[BRAND_NAME]` | Logo, titles, footer, JSON-LD | "Kovács Villanyszerelés Kft." |
| `[DOMAIN]` | Canonical URLs, JSON-LD, sitemap | "pelda-villanyszereles.hu" |
| `[PHONE]` | Every visible phone number | "+36 30 123 4567" |
| `[PHONE_TEL]` | Every `tel:` link (digits only, with country code) | "+36301234567" |
| `[EMAIL]` | Footer, contact page | "info@pelda-villanyszereles.hu" |
| `[PRIMARY_CITY]` | Headlines, meta titles, copy | "Debrecen" |
| `[PRIMARY_SERVICE_AREA]` | Headlines, copy | "Hajdú-Bihar megye" |
| `[COUNTY_OR_REGION]` | Service-area paragraphs, JSON-LD | "Hajdú-Bihar" |
| `[ADDRESS]` | Footer, contact page, JSON-LD | "4024 Debrecen, Példa utca 1." |
| `[OPENING_HOURS]` | Footer, contact page | "H-P 8:00-17:00" |
| `[YEARS_EXPERIENCE]` | Stats row, Rólunk page | "12" |
| `[WARRANTY_TEXT]` | Stats row, Rólunk page | "2 év" |
| `[RESPONSE_TIME]` | Not shown until you confirm a real value — do not invent one | — |
| `[GOOGLE_REVIEWS_URL]` | Footer Google icon | your Google Business Profile review link |
| `[FACEBOOK_URL]` | Footer social icon | your Facebook page URL |
| `[INSTAGRAM_URL]` | Footer social icon | your Instagram profile URL |
| `[GTM_ID]` | Every page `<head>`/`<body>` | "GTM-XXXXXXX" |
| `[FORM_ENDPOINT]` | Lead-form submission target | your form backend URL — see DEPLOYMENT.md |
| `[REVIEW_COUNT]` / `[AVAILABILITY]` | Stats row on homepage | only fill in with real, verifiable numbers |

**Do not invent values for these.** If a fact isn't confirmed yet (years of
experience, review count, warranty terms, response time), leave the
bracketed placeholder in place — it is intentionally visible so nobody
mistakes it for a real claim.

## 3. Testimonials and photos are placeholders on purpose

- `assets/images/*.svg` are clearly-labelled placeholder graphics, **not**
  stock photography of real people. Replace them with real business photos
  before launch — see [docs/image-requirements.md](docs/image-requirements.md).
- The three testimonial cards on the homepage say
  `[VALÓDI ÜGYFÉLVÉLEMÉNY HELYE]` ("real customer review goes here"). Do not
  replace these with invented quotes — only use real, permission-cleared
  customer reviews (e.g. copied from Google with the customer's consent, or
  collected directly).
- The stats row (`[REVIEW_COUNT]`, `[YEARS_EXPERIENCE]`, `[WARRANTY_TEXT]`,
  `[AVAILABILITY]`) must only show numbers you can stand behind.

## 4. Before you publish, also read

- [DEPLOYMENT.md](DEPLOYMENT.md) — FTP upload, GTM, form endpoint, checklist.
- [docs/google-ads-handoff.md](docs/google-ads-handoff.md) — sitelinks, ad groups, conversions.
- [docs/keyword-ad-landing-map.md](docs/keyword-ad-landing-map.md) — keyword → landing page mapping.
- [docs/tracking-handoff.md](docs/tracking-handoff.md) — GTM/dataLayer event reference.
- [docs/seo-handoff.md](docs/seo-handoff.md) — technical SEO notes.
- [docs/image-requirements.md](docs/image-requirements.md) — exact photo specs.

## 5. Legal pages need a real review

`/adatvedelem/` (privacy policy) and `/cookie-tajekoztato/` (cookie notice)
are structural templates with `[TODO: ...]` markers. They are **not** legal
advice and must be reviewed/completed by someone qualified (a lawyer or the
business owner) before publishing, especially the data-retention period and
any data-processor list (form backend, analytics).
