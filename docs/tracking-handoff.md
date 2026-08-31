# Tracking / GTM handoff

## Architecture

One Google Tag Manager container is loaded on every page (in `<head>`, plus
the `<noscript>` fallback right after `<body>`). GA4 and Google Ads tags are
**not** hardcoded separately — configure them as tags inside GTM, triggered
off the `dataLayer` events below. This keeps all tag management in one
place (GTM) rather than spread across the codebase.

`assets/js/tracking.js` pushes every event to `window.dataLayer`. No PII
(name, phone, email, address, free-text message) is ever included in an
event payload — only page/placement metadata.

## Setting `[GTM_ID]`

Replace `[GTM_ID]` in `assets/js/business-data.js` and in every HTML page's
GTM snippet (head + noscript). If using the Node generator, this is one
edit in `tools/site-data.js` (`gtmId`) then `node tools/generate.mjs`.

## dataLayer events

| Event | Fired when | Payload keys |
|---|---|---|
| `phone_click` | Any `tel:` link is clicked (header, hero, mobile sticky bar, contact band, footer, service pages) | `page_type`, `page_path`, `placement`, `button_type`, `service` |
| `email_click` | Any `mailto:` link is clicked | same as above |
| `service_click` | A service-strip item, footer service link, or related-service card is clicked | + `service` (slug) |
| `sitelink_click` | Reserved for use if you add on-page sitelink-style navigation blocks beyond the service strip | `placement` |
| `cta_click` | Generic CTA buttons not covered by a more specific event (e.g. mobile sticky "Ajánlatkérés", mobile-nav quote button) | `button_type` |
| `quote_request` | Primary "Ajánlatot kérek" CTAs (hero, Rólunk page) | `placement` |
| `form_start` | First focus into any lead form | `form_id` |
| `form_submit` | Form submit attempted (before validation result is known) | `form_id` |
| `form_success` | Form submission succeeded (real endpoint) or dev-mode simulated it | `form_id`, `mode` (`dev_simulated` when no endpoint is configured) |
| `form_error` | Form submission failed (validation error shown, or the configured endpoint returned a non-OK response) | `form_id` |

Every event also automatically includes:
- `page_type` — one of `home`, `service`, `about`, `contact`, `thankyou`,
  `legal` (read from `<body data-page-type="...">`)
- `page_path` — `window.location.pathname`

## Suggested GTM configuration

1. **Trigger**: Custom Event trigger for each event name above.
2. **GA4 event tags**: one GA4 Event tag per dataLayer event, mapping
   `placement`, `button_type`, `service`, `form_id` as event parameters.
3. **Google Ads conversion tags**:
   - Primary conversion → trigger on `form_success` (or on `/koszonjuk/`
     page load, which only happens after a successful/simulated submit).
   - Secondary conversion → trigger on `phone_click`, if you're tracking
     calls as a conversion (note: this counts a *click on the number*, not
     a completed call — for real call tracking, integrate a call-tracking
     number service and swap `[PHONE_TEL]` accordingly).
4. Do not create a "successful lead" conversion off `form_submit` alone —
   that fires on every attempt, including validation failures. Use
   `form_success` only.

## Consent Mode

`assets/js/tracking.js` sets Google Consent Mode defaults to `denied` for
`ad_storage`, `ad_user_data`, `ad_personalization`, and
`analytics_storage` on every page load, before the visitor has made a
choice. The on-page consent banner (bottom of screen) updates consent to
`granted`/`denied` based on the visitor's choice and remembers it in
`localStorage` (`consent_choice_v1`).

If your GTM container includes tags that require consent (GA4, Ads
conversion tags with advertising features), configure their **built-in
Consent settings** in GTM to respect `ad_storage` / `analytics_storage` —
this site's Consent Mode signal is already wired up to work with that.

## Testing

1. Open the site with the browser console open.
2. On `localhost`, every tracked event also logs via `console.info`.
3. Use GTM's Preview mode against the deployed (or local) site to confirm
   each event above fires correctly and with the expected parameters.
4. Confirm no event payload ever contains a name, phone number, email
   address, or free-text message value.
