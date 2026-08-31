# Deployment guide

## 1. What to upload

Upload **everything in this folder except** `tools/` and this repo's own
docs if you don't want them public (they're harmless if uploaded, just
unnecessary). Concretely, upload:

```
index.html
robots.txt
sitemap.xml
assets/
villanyszereles/
hibaelharitas/
biztositektabla/
konnektor-kapcsolo/
vilagitas/
elektromos-auto-tolto/
rolunk/
kapcsolat/
koszonjuk/
adatvedelem/
cookie-tajekoztato/
```

Upload via FTP/SFTP so that `index.html` lands directly in your host's
document root (commonly `public_html/` or `www/`) — not inside a
subfolder. Every internal link and asset reference in this site is
root-relative (starts with `/`), so it only works correctly when the site
is served from the domain root.

No Node.js, npm, or build step is required on the server. Apache (or any
standard shared-hosting web server) serving static files is enough — each
folder's `index.html` is served automatically when a visitor requests that
folder's URL (e.g. `/hibaelharitas/`).

## 2. Replace business placeholders

See [README-FIRST.md](README-FIRST.md) for the full placeholder table.
Fastest path if you don't have Node.js: open your editor's "Find in Files"
across all `.html` files and replace each `[TOKEN]` with the real value.

If you do have Node.js installed, instead edit `tools/site-data.js` and
`assets/js/business-data.js`, then run:

```bash
node tools/generate.mjs
```

This regenerates all HTML pages from the one data file, so you never have
to hand-edit the same phone number in 13 different files.

## 3. Configure the lead form (`[FORM_ENDPOINT]`)

The hero form and the two service-page/contact-page forms all submit to
one endpoint, read from `assets/js/business-data.js` →
`BUSINESS_DATA.formEndpoint`.

This site has **no built-in backend** (by design — it's plain static
files). Point `formEndpoint` at a form-handling service of your choice,
for example:
- A serverless form backend (Formspree, Getform, Basin, etc.)
- Your own API endpoint that accepts a `POST` with `FormData` and returns
  JSON
- A hosting-provider form handler, if your host offers one

Until `formEndpoint` is set to a real URL, the form falls back to opening a
pre-filled `mailto:` draft addressed to `BUSINESS_DATA.email`, with an
on-page status message telling the visitor to send it (or call instead) —
see `assets/js/app.js`. This keeps the public UI professional and avoids
losing leads silently, but it is **not a substitute for a real endpoint**:
the visitor must still hit send in their own mail client. Configure a real
`formEndpoint` as soon as possible for a frictionless submit.

After configuring the endpoint:
1. Submit the hero form with test data.
2. Confirm your endpoint receives `name`, `phone`, and optionally `city`
   and `message`.
3. Confirm the browser redirects to `/koszonjuk/` on success.
4. Confirm a deliberately-broken endpoint (e.g. wrong URL) shows the
   on-page error message rather than failing silently.

## 4. Configure Google Tag Manager (`gtmId`)

`gtmId` is currently empty in `tools/site-data.js`, and `generate.mjs`
deliberately skips emitting the GTM `<head>`/`<body>` snippet whenever it's
empty (see `gtmHead()`/`gtmBody()`) — no broken/placeholder GTM request
ships to visitors. To enable it, set `gtmId` in `tools/site-data.js` (and
mirror it in `assets/js/business-data.js`), then re-run
`node tools/generate.mjs`.

See [docs/tracking-handoff.md](docs/tracking-handoff.md) for the full event
list to wire up inside GTM.

## 5. Replace placeholder images

`assets/images/hero-electrician.svg`, `about-work.svg`, and
`ev-charger.svg` are clearly-labelled placeholder graphics — not stock
photography. Replace them with real, licensed photography before launch.
Keep the same filenames (or update the `<img>`/`background-image`
references in `tools/site-data.js` / the relevant HTML files if you rename
them). Exact size/crop/format guidance:
[docs/image-requirements.md](docs/image-requirements.md).

## 6. Test the thank-you conversion

1. With the form endpoint configured, submit any lead form.
2. Confirm you land on `/koszonjuk/`.
3. Confirm `/koszonjuk/` has `<meta name="robots" content="noindex,nofollow">`
   (already included — don't remove it, it keeps the thank-you page out of
   search results while still being usable as a conversion-tracking page
   inside GTM/Google Ads).
4. In GTM, set your "form success" conversion trigger to fire on this
   page load (or on the `form_success` dataLayer event — see
   [docs/tracking-handoff.md](docs/tracking-handoff.md)).

## 7. FTP upload steps (typical shared hosting)

1. Connect to your host via FTP/SFTP (FileZilla, Cyberduck, or your host's
   file manager).
2. Navigate to the document root of your domain (often `public_html/`).
3. Upload the folders/files listed in section 1.
4. Confirm `https://yourdomain/` loads the homepage, and
   `https://yourdomain/hibaelharitas/` (etc.) load each service page.
5. Confirm HTTPS is active (most hosts provide a free SSL certificate —
   enable it in your hosting control panel if not already active).

## 8. What must NOT remain TODO before production

Business data (brand, phone, email, domain, service area) is filled in —
see `tools/site-data.js`. Still outstanding:

- [ ] `formEndpoint` — a real form backend URL (site currently falls back
      to a `mailto:` draft, see §3).
- [ ] `gtmId` — a real GTM container ID (tracking snippet is omitted
      entirely until this is set, see §4).
- [ ] Placeholder SVG illustrations (`assets/images/*.svg`) replaced with
      real, licensed photography — see docs/image-requirements.md.
- [ ] Homepage trust cards (`testimonials` in `tools/site-data.js`) are
      SAMPLE CONTENT (benefit statements, not real reviews) — replace with
      real, permission-cleared customer reviews once available. Do not
      fabricate names, quotes, or star ratings.
- [ ] `/adatvedelem/` reviewed by someone qualified (lawyer or business
      owner) to confirm legal accuracy — in particular it currently has no
      company registration number, tax number, or street address on file.
- [ ] HTTPS active on the live domain.
