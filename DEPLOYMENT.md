# Deployment guide

## 1. What to upload

Upload **everything in this folder except** `tools/` and this repo's own
docs if you don't want them public (they're harmless if uploaded, just
unnecessary). Concretely, upload:

```
index.html
robots.txt
sitemap.xml
send-form.php
assets/
villanyszereles/
hibaelharitas/
biztositektabla/
konnektor-kapcsolo/
vilagitas/
sos-villanyszerelo/
elektromos-auto-tolto/
arak/
rolunk/
kapcsolat/
koszonjuk/
adatvedelem/
cookie-tajekoztato/
```

Upload via FTP/SFTP so that `index.html` and `send-form.php` land directly
in your host's document root (commonly `public_html/` or `www/`) — not
inside a subfolder. Every internal link and asset reference in this site is
root-relative (starts with `/`), so it only works correctly when the site
is served from the domain root, and every lead form POSTs to `/send-form.php`
at the root.

**PHP requirement:** the site itself is static HTML/CSS/JS and needs no
Node.js, npm, or build step on the server. The one exception is
`send-form.php`, which needs a host that runs **PHP 7.4+** (any standard
shared/cPanel hosting plan qualifies) with the built-in `mail()` function
available. Apache (or any standard shared-hosting web server) serving
static files + PHP is enough — each folder's `index.html` is served
automatically when a visitor requests that folder's URL (e.g.
`/hibaelharitas/`).

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

## 3. The lead form (`send-form.php`)

Every lead form on the site (hero + all six service pages + the contact
page) POSTs to the same fixed handler: **`/send-form.php`**, at the domain
root. There is no configurable endpoint anymore — `send-form.php` is a real,
working PHP script included in this repo (project root), not a placeholder.

**Location:** `send-form.php` (upload it to the document root alongside
`index.html`).

**Recipient email:** `veresvill24@gmail.com` (hardcoded as
`RECIPIENT_EMAIL` at the top of `send-form.php`).

**Sender email/domain requirement:** the script sends `From:
webform@veresvill0-24.hu`. It does **not** use the visitor's own email
(the form doesn't collect one) so this can never be spoofed via the form.
For the mailbox/domain to be accepted by your mail server:
- Either create the mailbox `webform@veresvill0-24.hu` in cPanel (Email
  Accounts), **or**
- Configure your host's mail server to allow sending `From:` addresses at
  that domain without a matching mailbox (common on shared hosting where
  `mail()` sends as the hosting account's domain by default).
- If your final domain differs from `veresvill0-24.hu`, update the
  `SENDER_EMAIL` constant in `send-form.php` to match a mailbox/domain you
  control on that host — an unrelated/unauthenticated sender domain is
  likely to be rejected or marked as spam by the receiving mail provider
  (Gmail, in this case).
- Reply-To is intentionally not set — the form doesn't collect a visitor
  email address.

**Server-side validation:** required fields are `name`, `phone`, and
`privacy_consent` (the checkbox); `city` and `message` are optional. All
fields are trimmed, stripped of control characters (CR/LF included — this
prevents header injection even though user input is never placed into a
mail header), and length-capped. The phone number is checked for a
plausible digit count (6–15 digits), not tied to one strict format. A
hidden honeypot field (`website`) silently discards obvious bot
submissions without emailing them. None of this can be bypassed by
disabling JavaScript — `assets/js/app.js`'s client-side checks are for fast
UX only.

**How to test submission** (on the real PHP host — this cannot be tested
on a static preview, see §9 below):
1. Submit the hero form (or any service-page/contact form) with test data.
2. Confirm an email arrives at `veresvill24@gmail.com` with the subject
   "Új ajánlatkérés – VeresVill 0–24" and the Név/Telefonszám/Település/
   Probléma/Beküldés időpontja/Oldal-forrás URL fields filled in.
3. Confirm the browser redirects to `/koszonjuk/` only after that email is
   accepted by `mail()` — not before.
4. Submit again with the required fields empty, or with the phone field
   containing garbage (e.g. `"abc"`), and confirm you get a validation
   error and are **not** redirected to `/koszonjuk/`.
5. Submit with the browser's devtools open, set the hidden `website` field
   to any non-empty value, and confirm no email is sent (the response
   still reports success, by design, so bots aren't tipped off).

**What to check if `mail()` is disabled** (some hosts disable it, or it
silently fails to deliver):
- Check your host's mail/PHP error log for `send-form.php: mail() failed`
  (the script logs failures via `error_log()`, never to the visitor).
- Confirm the `SENDER_EMAIL` domain (`veresvill0-24.hu` by default) is
  authorized to send from this server (SPF record, or matches the
  account's primary domain).
- Ask your host whether `mail()` is enabled at all — some restrict it to
  prevent spam; you may need to request it be enabled, or switch to SMTP.
- On failure, `send-form.php` never redirects to `/koszonjuk/` and always
  surfaces the phone number `+36 70 728 3434` as a fallback — no lead is
  silently lost, but delivery should still be fixed promptly.

**How to switch to SMTP/PHPMailer later, if `mail()` proves unreliable:**
`send-form.php` is deliberately structured so only one block needs to
change — look for the comment "mail() is the simplest FTP/cPanel-compatible
option" near the bottom of the file. Replace the `@mail(...)` call with an
SMTP send (e.g. via PHPMailer, installed with Composer, or a dependency-free
raw SMTP client) while keeping `$sent` as a boolean result — the
validation, sanitization, and JSON/redirect response logic above it does
not need to change. Composer is intentionally **not** a production
requirement for the default `mail()`-based setup.

After confirming the handler works:
1. Submit any lead form with valid test data.
2. Confirm your inbox receives the lead.
3. Confirm the browser redirects to `/koszonjuk/` on success.
4. Confirm a deliberately-broken submission (e.g. missing phone) shows the
   on-page error message and phone-number fallback, and does **not**
   redirect, rather than failing silently.

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

1. With `send-form.php` uploaded and working (see §3), submit any lead form.
2. Confirm you land on `/koszonjuk/` — this only happens after `send-form.php`
   confirms the email was accepted for sending.
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

- [ ] Confirm `send-form.php` actually delivers mail on the real hosting
      account (test on the live PHP host, not on Vercel — see §9) and that
      `webform@veresvill0-24.hu` is an authorized sender there (see §3).
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

## 9. Vercel preview vs. final PHP hosting

This project may also be previewed on Vercel (static hosting) for visual/
UX review. Vercel does **not** execute PHP: a form submission in the
Vercel preview will `POST` to `/send-form.php`, get a 404 (no PHP runtime
there), and the on-page JS will correctly treat that as a failure — showing
the error state with the phone-number fallback, and **not** redirecting to
`/koszonjuk/`. That is expected and correct behavior for a static preview,
not a bug: it proves the "never fake a conversion on failure" rule works.
`send-form.php` is written for, and must be tested on, the final cPanel/FTP
PHP hosting environment — that is the only place the full submit → email →
redirect flow can be verified end-to-end.
