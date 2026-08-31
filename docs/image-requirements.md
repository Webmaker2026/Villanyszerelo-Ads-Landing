# Image requirements

All three images below currently ship as clearly-labelled SVG
placeholders (dark navy background, yellow bolt icon, "KÉP HELYE" text) —
they are intentionally obvious placeholders, not stock photography of real
people, so nobody mistakes them for genuine staff/work photos. Replace each
with real, licensed photography before launch. Keep filenames the same (or
update the reference in the relevant HTML / `tools/site-data.js`).

## 1. Hero photo — `assets/images/hero-electrician.svg`

- **Used**: Homepage hero background, full-bleed behind a dark gradient
  overlay.
- **Replace with**: `hero-electrician.jpg` (or `.webp`), recommended
  **1920×1080px minimum**, 16:9-ish wide crop.
- **Composition**: electrical panel/consumer unit visible, electrician's
  hands and tools visible, subject positioned centre-right so the left
  ~60% stays readable behind the text overlay. Image should already read
  reasonably dark/moody — the site adds a further dark gradient overlay
  (left side darker) so pick a shot that isn't already washed out.
- **Format**: JPEG (quality ~75-80) or WebP for smaller file size. Since
  this is a background-image on a large hero, keep the file under ~300KB
  after compression.

## 2. About/work photo — `assets/images/about-work.svg`

- **Used**: "Rólunk" section on the homepage and the `/rolunk/` page,
  portrait-ish crop next to the about text.
- **Replace with**: recommended **1200×900px minimum** (4:3), can be
  slightly taller if needed — the container is `object-fit: cover` so
  exact aspect ratio is flexible.
- **Composition**: electrician at work near an open switchboard/consumer
  unit, natural (not overly staged) working shot.
- **Format**: JPEG/WebP, under ~200KB after compression.

## 3. EV charger photo — `assets/images/ev-charger.svg`

- **Used**: Testimonials section on the homepage, tall portrait crop.
- **Replace with**: recommended **960×1120px minimum** (portrait, roughly
  6:7).
- **Composition**: wall-mounted EV charger (wallbox), ideally showing a
  cable, in a garage or driveway setting.
- **Format**: JPEG/WebP, under ~200KB after compression.

## General guidance

- Do not use stock photography of identifiable real people presented as
  "the team" unless they are genuinely this business's staff — this
  misrepresents who the visitor will be dealing with.
- Every `<img>` already has an `alt` attribute describing the image content
  — update the `alt` text if the replacement photo's content differs from
  the description (e.g. if it shows a different scene).
- Keep total page weight in mind: this is a paid-traffic landing page, so
  every KB affects load speed and therefore Quality Score / conversion
  rate. Compress before uploading (tools like Squoosh work well), and
  prefer WebP with a JPEG fallback if your hosting supports `<picture>` —
  not required, but a good upgrade once real photos are in place.
