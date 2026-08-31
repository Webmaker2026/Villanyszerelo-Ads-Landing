# Keyword → ad group → landing page map

This table is the basis for structuring tightly themed Google Ads ad
groups. Each row's keyword theme should become its own ad group, with ads
whose headlines closely mirror the landing page's H1, so relevance stays
high from search query → ad → page.

`[PRIMARY_CITY]` below should be replaced with the real city once
configured — keyword lists should also include city-modified variants
(e.g. "villanyszerelő debrecen") once you know the target city.

| Search intent | Keyword theme (examples) | Ad group | Suggested ad headline | Landing URL | Landing H1 | Primary CTA |
|---|---|---|---|---|---|---|
| General electrician | villanyszerelő [PRIMARY_CITY], villanyszerelés [PRIMARY_CITY] | General electrician | "Villanyszerelő [PRIMARY_CITY] – Gyors Kiszállás" | `/villanyszereles/` | Villanyszerelés [PRIMARY_CITY] területén | Ajánlatot kérek |
| Fault repair | villany hibaelhárítás, elektromos hiba javítás, nincs áram | Fault repair | "Villany Hibaelhárítás – Hívjon Minket" | `/hibaelharitas/` | Villany hibaelhárítás [PRIMARY_CITY] területén | Hívás most |
| Fuse box | biztosítéktábla csere, kismegszakító csere, elosztó korszerűsítés | Fuse box | "Biztosítéktábla Csere [PRIMARY_CITY]" | `/biztositektabla/` | Biztosítéktábla csere és korszerűsítés [PRIMARY_CITY] | Ajánlatot kérek |
| Sockets / switches | konnektor szerelés, kapcsoló csere, aljzat szerelés | Socket/switch | "Konnektor és Kapcsoló Szerelés" | `/konnektor-kapcsolo/` | Konnektor és kapcsoló szerelés [PRIMARY_CITY] | Ajánlatot kérek |
| Lighting | lámpa felszerelés, világítás szerelés, csillár bekötés | Lighting | "Világítás Szerelés [PRIMARY_CITY]" | `/vilagitas/` | Világítás szerelés [PRIMARY_CITY] | Ajánlatot kérek |
| SOS / emergency electrician | sos villanyszerelő, sürgős villanyszerelő, villanyszerelő azonnal, villany hibaelhárítás, nincs áram, lecsap a biztosíték, leold a fi relé, elektromos hiba, zárlat villanyszerelő | SOS / emergency | "SOS Villanyszerelő – Hívjon" | `/sos-villanyszerelo/` | Sürgős elektromos hiba? Hívjon most. | Hívás most |
| Pricing / cost research | villanyszerelés árak, villanyszerelő díjak, mennyibe kerül egy villanyszerelő | Pricing | "Villanyszerelési Árak [PRIMARY_CITY]" | `/arak/` | Villanyszerelési árak | Hívás most |

## Notes on natural-language alignment

- On-page terminology matches these keyword themes without keyword
  stuffing — each service page's H1, intro paragraph, and FAQ section use
  the same natural phrasing a searcher would use.
- Do not create additional near-duplicate city-specific pages purely for
  keyword coverage (this would create thin/doorway content). If a second
  city genuinely needs its own landing page later, model it on one of the
  six service pages, with real, distinct content for that service area.
- Broad "villanyszerelő [PRIMARY_CITY]" traffic should go to the homepage
  or `/villanyszereles/` depending on whether the ad group is
  brand/general or specifically about new installation work.
- The SOS / emergency ad group intentionally bundles several urgent-intent
  phrasings ("sos villanyszerelő", "sürgős villanyszerelő",
  "villanyszerelő azonnal", "villany hibaelhárítás", "nincs áram",
  "lecsap a biztosíték", "leold a fi relé", "elektromos hiba", "zárlat
  villanyszerelő") into **one** ad group, because they all express the
  same underlying intent (an active electrical fault, right now) and
  should land on the same page (`/sos-villanyszerelo/`). Do not split
  these into separate near-duplicate ad groups just because the surface
  wording differs.
- `/elektromos-auto-tolto/` (EV charger installation) is no longer one of
  the six primary landing pages or ad groups — see
  [google-ads-handoff.md](google-ads-handoff.md) for the current sitelink
  set. The page still exists and resolves; do not point new campaigns at
  it, but do not need to 404 it either.
- `/arak/` is not its own high-volume ad group, but is useful for
  explicit price-research queries ("mennyibe kerül egy villanyszerelő")
  and as a secondary sitelink across every ad group above.
