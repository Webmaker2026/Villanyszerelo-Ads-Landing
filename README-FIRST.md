# README FIRST

This is a static HTML/CSS/JS website built for Google Ads traffic. There is
**no framework, no build step, and no server-side code required to host it.**
Upload the contents of this folder to your webhosting document root
(`public_html/` or `www/`) and it works.

Business data (brand, phone, email, domain, service area) is filled in —
see `tools/site-data.js` / `assets/js/business-data.js`. Nothing on the
public site should say `[BRAND_NAME]` or similar bracketed token; if you
ever see one, it's a regression — see §2.

## 1. How content is structured

- Every page is a plain `.html` file (e.g. `villanyszereles/index.html`).
- `assets/css/styles.css` — all styling, one file.
- `assets/js/business-data.js` — the single place that lists every business
  placeholder value (phone, email, address, etc.).
- `assets/js/app.js` — mobile nav, FAQ accordion, lead-form handling.
- `assets/js/tracking.js` — GTM `dataLayer` bridge + consent banner.
- `send-form.php` — **the one server-side file in this project.** Every
  lead form POSTs here; it validates, sanitizes, emails the lead to
  `veresvill24@gmail.com`, and redirects to `/koszonjuk/` on success. It
  requires a PHP host (standard cPanel/shared hosting qualifies) — see
  [DEPLOYMENT.md](DEPLOYMENT.md) §3.
- `tools/` — **not required on the live server.** This is the Node.js
  generator used to author the site (so ~13 pages share one consistent
  header/footer/design instead of being hand-copy-pasted). See "Editing the
  site" below. Do not upload `tools/` to your host — it is not needed there.

## 2. Business data — how to change it

Business values (brand, phone, email, domain, service area) live in one
place, `tools/site-data.js` (mirrored into `assets/js/business-data.js` for
the client-side scripts). To change any of them:

- Edit `tools/site-data.js` and `assets/js/business-data.js`, then run
  `node tools/generate.mjs` to regenerate every HTML file at once (requires
  Node.js, only for editing — not for hosting), **or**
- If you're not using Node, find-and-replace the value directly across all
  `.html` files.

| Field | Where it's used | Current value |
|---|---|---|
| `brandName` | Logo, titles, footer, JSON-LD | "VeresVill 0–24" |
| `domain` | Canonical URLs, JSON-LD, sitemap | "villanyszerelo-ads-landing.vercel.app" |
| `phoneDisplay` | Every visible phone number | "+36 70 728 3434" |
| `phoneTel` | Every `tel:` link | "+36707283434" |
| `email` | Footer, contact page, legal pages | "veresvill24@gmail.com" |
| `primaryCity` | Headlines, meta titles, copy | "Budapest" |
| `serviceArea` | Headlines, copy | "Pest vármegye" |
| `gtmId` | Every page `<head>`/`<body>` | empty — snippet omitted until set, see DEPLOYMENT.md §4 |

Lead-form submission is **not** a configurable placeholder anymore — every
form POSTs to the fixed `/send-form.php` handler (see
[DEPLOYMENT.md](DEPLOYMENT.md) §3 for the recipient email and sender-domain
requirement).

**Do not invent values for facts not listed above** (years of experience,
review count, warranty terms, response time, street address, opening
hours) — the site is written to communicate benefits without needing
those numbers. If you get a real, verifiable value later, add it
deliberately rather than guessing.

## 3. Testimonials and photos still need real content

- `assets/images/*.svg` are stylised placeholder illustrations, **not**
  stock photography. Replace them with real business photos before launch
  — see [docs/image-requirements.md](docs/image-requirements.md).
- The three "Miért érdemes minket választania" cards on the homepage
  (`testimonials` in `tools/site-data.js`) are marked as **SAMPLE CONTENT**
  — benefit statements, not real customer testimonials, and they
  deliberately carry no star ratings or customer names. Replace with real,
  permission-cleared customer reviews when available; do not fabricate
  names, quotes, or ratings.
- The stats row (`stats` in `tools/site-data.js`) is written as benefit
  statements for the same reason — swap in real numbers only once you can
  stand behind them.

## 4. Before you publish, also read

- [DEPLOYMENT.md](DEPLOYMENT.md) — FTP upload, GTM, form endpoint, checklist.
- [docs/google-ads-handoff.md](docs/google-ads-handoff.md) — sitelinks, ad groups, conversions.
- [docs/keyword-ad-landing-map.md](docs/keyword-ad-landing-map.md) — keyword → landing page mapping.
- [docs/tracking-handoff.md](docs/tracking-handoff.md) — GTM/dataLayer event reference.
- [docs/seo-handoff.md](docs/seo-handoff.md) — technical SEO notes.
- [docs/image-requirements.md](docs/image-requirements.md) — exact photo specs.

## 5. Legal pages need a real review

`/adatvedelem/` (privacy policy) and `/cookie-tajekoztato/` (cookie notice)
are written as clean, no-TODO templates (see `adatvedelemPage()` /
`cookiePage()` in `tools/generate.mjs`), but they are **not** legal advice.
Have someone qualified (a lawyer or the business owner) review them before
relying on them — in particular, `/adatvedelem/` currently has no company
registration number, tax number, or street address on file, since none was
provided; add these once available.
