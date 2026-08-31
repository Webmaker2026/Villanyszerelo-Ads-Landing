# Google Ads handoff

This site was built with Google Ads traffic as the primary goal: tightly
themed landing pages so each ad group can send clicks to the most relevant
page, rather than a single generic homepage.

All URLs below are **paths on your domain** — replace `[DOMAIN]` mentally
with your real domain once configured (e.g.
`https://pelda-villanyszereles.hu/hibaelharitas/`).

## Six sitelink destinations

| # | Sitelink text | Description line 1 | Description line 2 | Destination URL |
|---|---|---|---|---|
| 1 | Villanyszerelés | Lakossági és ipari villanyszerelés | Telefonos egyeztetés, írásos ajánlat | `/villanyszereles/` |
| 2 | Hibaelhárítás | Gyors diagnosztika áramkimaradásnál | Zárlat, vibráló világítás javítása | `/hibaelharitas/` |
| 3 | Biztosítéktábla | Elavult tábla cseréje, korszerűsítés | Életvédelmi relé beépítése | `/biztositektabla/` |
| 4 | Konnektor és kapcsoló | Konnektor, kapcsoló csere, bővítés | Okos kapcsolók telepítése | `/konnektor-kapcsolo/` |
| 5 | Világítás szerelés | Lámpatest, csillár, spotlámpa | Kültéri és beltéri világítás | `/vilagitas/` |
| 6 | SOS villanyszerelés | Sürgős elektromos hiba? Hívjon most | Zárlat, áramkimaradás, FI-relé | `/sos-villanyszerelo/` |

Each destination represents a **distinct user intent** — the visible H1 and
copy on each page match its sitelink text so Ad Rank / landing-page
relevance stay aligned. This does not guarantee a lower CPC; it only
maximizes semantic/relevance alignment between the ad, the sitelink, and
the page a click lands on.

**Additional sitelink (pricing, not one of the six primary intents):**

| Sitelink text | Description line 1 | Description line 2 | Destination URL |
|---|---|---|---|
| Árak | Tekintse meg díjainkat | Kiszállási és SOS díjak egy helyen | `/arak/` |

> **Note on the former EV charger sitelink:** "Autótöltő telepítés"
> (`/elektromos-auto-tolto/`) was replaced by SOS villanyszerelés as the
> sixth primary sitelink/ad-group destination. The page itself still
> exists (do not 404 any historically-run ad pointing at it), but it is no
> longer part of the primary six-service architecture and should not be
> used for new sitelinks, callouts, or ad groups.

## Ad-group → landing-page assignment

| Ad group | Primary landing page | Notes |
|---|---|---|
| General electrician / brand | `/` (homepage) | Broadest intent, all services visible via the service strip |
| Fault repair / emergency | `/hibaelharitas/` | Highest-urgency intent — page leads with phone CTA |
| Fuse box / panel upgrade | `/biztositektabla/` | Renovation & compliance-driven searches |
| Sockets & switches | `/konnektor-kapcsolo/` | Smaller-ticket, high-volume searches |
| Lighting installation | `/vilagitas/` | Includes outdoor/motion-sensor intent |
| SOS / emergency electrician | `/sos-villanyszerelo/` | Highest-intent, highest-urgency searches — page leads with a phone CTA and a price preview, not a lead form |
| Pricing / cost research | `/arak/` | "Mennyibe kerül" / price-comparison searches — supports every ad group above as a secondary sitelink, not its own ad group |

## Suggested callout assets

Only use callouts you can factually support:
- Telefonos egyeztetés
- Írásos árajánlat
- Helyszíni felmérés
- Lakossági és ipari munkák
- SOS kiszállás

## Suggested structured snippet (Service types)

- Villanyszerelés
- Hibaelhárítás
- Biztosítéktábla
- Konnektorok és kapcsolók
- Világítás
- SOS villanyszerelés

## Recommended conversion actions

**Primary:**
1. Successful lead-form submission — fire on the `form_success` dataLayer
   event, or on `/koszonjuk/` page load (both are wired up; see
   [tracking-handoff.md](tracking-handoff.md)).
2. Qualified phone call — either call tracking on the `tel:` links
   (`phone_click` event fires on every phone CTA site-wide) or a call
   -tracking number swap, depending on what you configure in GTM/Ads.

**Secondary:**
3. Quote CTA click (`quote_request` / `cta_click` events).
4. Email click (`email_click` event), if you choose to treat email as a
   micro-conversion.

## URL tracking recommendations

- Use Google Ads auto-tagging (`gclid`) rather than manual UTM parameters
  where possible, to avoid conflicting with GA4/GTM auto-tracking.
- If you do use manual UTM parameters for non-Ads channels, avoid placing
  any personal data in query strings (the site never does this itself).
- Final URLs should point at the exact service-page paths above, not the
  homepage, for non-brand ad groups.

## Placeholders that must be replaced before this campaign goes live

- `[GTM_ID]` — see [tracking-handoff.md](tracking-handoff.md)
- `[PHONE]` / `[PHONE_TEL]` — the number that will actually ring for calls
  from these ads
- `[DOMAIN]` — final URLs / canonical URLs
- `[BRAND_NAME]`, `[PRIMARY_CITY]`, `[PRIMARY_SERVICE_AREA]` — appear
  throughout ad-relevant on-page copy

No Google Ads campaign IDs, conversion IDs, or account-level identifiers
are included in this handoff — those must be supplied by whoever manages
the live Ads account.
