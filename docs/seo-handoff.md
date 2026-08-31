# Technical SEO handoff

## Page inventory

| URL | Purpose | Indexable |
|---|---|---|
| `/` | Homepage — brand/general intent | Yes |
| `/villanyszereles/` | General residential electrical work | Yes |
| `/hibaelharitas/` | Fault diagnosis/repair | Yes |
| `/biztositektabla/` | Fuse box / panel | Yes |
| `/konnektor-kapcsolo/` | Sockets/switches | Yes |
| `/vilagitas/` | Lighting | Yes |
| `/elektromos-auto-tolto/` | EV charger installation | Yes |
| `/rolunk/` | About | Yes |
| `/kapcsolat/` | Contact | Yes |
| `/koszonjuk/` | Thank-you (post-conversion) | **No** — `noindex,nofollow` |
| `/adatvedelem/` | Privacy policy | Yes |
| `/cookie-tajekoztato/` | Cookie notice | Yes |

## What's already in place

- Every page has exactly one `<h1>`, a unique `<title>`, a unique meta
  description, a `<link rel="canonical">`, and Open Graph tags.
- Semantic landmarks throughout: `<header>`, `<nav>`, `<main>`, `<section>`,
  `<footer>`.
- Breadcrumb navigation (visual + `BreadcrumbList` JSON-LD) on every
  subpage.
- `robots.txt` allows crawling of everything except `/koszonjuk/`, and
  points to `sitemap.xml`.
- `sitemap.xml` lists all indexable URLs.
- Structured data:
  - `Electrician` (LocalBusiness subtype) + `WebSite` on the homepage.
  - `Service` + `BreadcrumbList` + `FAQPage` on each of the six service
    pages.
  - `BreadcrumbList` on Rólunk and Kapcsolat.
  - **No** `Review`/`AggregateRating` structured data is included, since no
    genuine review data exists yet — do not add this schema type until
    real, verifiable reviews/ratings are available (adding it without real
    data risks a manual action for structured-data spam).
- Images use explicit `width`/`height` (prevents layout shift) and
  `loading="lazy"` below the fold.
- No render-blocking third-party scripts other than GTM (loaded async, as
  Google's own snippet does by default).
- CSS is a single compact file with no unused framework bulk; icons are
  inline SVG (no icon-font/library request).

## After you replace placeholders

1. Update `[DOMAIN]` everywhere (canonical URLs, JSON-LD `url`/`image`
   fields, `sitemap.xml`, `robots.txt`) — either via the Node generator
   (`tools/site-data.js` → `domain`) or find-and-replace.
2. Re-submit `sitemap.xml` in Google Search Console once the real domain
   and content are live.
3. Verify structured data with Google's Rich Results Test after
   placeholders are replaced (bracketed placeholder text will fail
   validation, which is expected pre-launch).
4. Once you have real customer reviews, consider adding `Review`/
   `AggregateRating` schema **only** to a page where those reviews are
   genuinely displayed — do not add it site-wide as a shortcut.

## Deliberately not done (and why)

- No per-city doorway pages — a legitimate service-area section on the
  homepage covers this without creating thin/duplicate content. See
  `docs/keyword-ad-landing-map.md` for how to add a real, distinct
  city page later if you expand.
- No invisible/hidden keyword text, no automatic keyword-based redirects.
- No fabricated ratings, review counts, or "X years experience" figures —
  these remain bracketed placeholders until confirmed.
