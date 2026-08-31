// Static-site generator for authoring convenience only.
// Run with `node tools/generate.mjs`. Output is plain HTML/CSS/JS —
// no Node runtime is required to host the generated site.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { icon } from "./icons.mjs";
import { biz, nav, services, stats, testimonials } from "./site-data.js";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/* ===========================================================
   Small helpers
   =========================================================== */
function findService(slug) {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service slug: ${slug}`);
  return s;
}

function gtmHead() {
  return `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${biz.gtmId}');</script>`;
}
function gtmBody() {
  return `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${biz.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;
}

/* ===========================================================
   Head / meta
   =========================================================== */
function headHTML({ title, description, canonicalPath, noindex, jsonLd }) {
  const canonical = `https://${biz.domain}${canonicalPath}`;
  const robots = noindex ? '<meta name="robots" content="noindex,nofollow">' : '<meta name="robots" content="index,follow">';
  const ld = (jsonLd || [])
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj, null, 2)}</script>`)
    .join("\n    ");
  return `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonical}">
    ${robots}
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:locale" content="hu_HU">
    <meta name="theme-color" content="#0e1420">
    <link rel="icon" href="data:,">
    <link rel="stylesheet" href="/assets/css/styles.css">
    ${gtmHead()}
    ${ld}`;
}

/* ===========================================================
   Header / nav
   =========================================================== */
function headerHTML(activeSlug) {
  const links = nav
    .map((n) => `<li><a href="${n.href}"${n.slug === activeSlug ? ' aria-current="page"' : ""}>${n.label}</a></li>`)
    .join("\n            ");
  return `<header class="site-header">
    <div class="container site-header__inner">
      <a class="brand" href="/" aria-label="${biz.brandName} - főoldal">
        ${icon("bolt", "brand__mark")}
        <span class="brand__text">
          <span class="brand__name">VILLANY<span>SZAKÉRTŐ</span></span>
          <span class="brand__sub">${biz.brandName}</span>
        </span>
      </a>
      <nav class="main-nav" aria-label="Fő navigáció">
        <ul class="main-nav__list">
            ${links}
        </ul>
      </nav>
      <div class="header-actions">
        <a class="header-phone" href="tel:${biz.phoneTel}" data-track="phone_click" data-location="header">
          ${icon("phone")}
          <span class="header-phone__text">${biz.phoneDisplay}</span>
        </a>
        <button type="button" class="nav-toggle" data-nav-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Menü megnyitása">
          ${icon("menu")}
          ${icon("close")}
        </button>
      </div>
    </div>
  </header>
  <nav id="mobile-nav" class="mobile-nav" data-mobile-nav aria-label="Mobil navigáció">
    <ul class="mobile-nav__list">
      ${links}
    </ul>
    <div class="mobile-nav__cta">
      <a class="btn btn--yellow btn--block" href="tel:${biz.phoneTel}" data-track="phone_click" data-location="mobile_nav">${icon("phone")}${biz.phoneDisplay}</a>
      <a class="btn btn--outline btn--block" href="/kapcsolat/" data-track="cta_click" data-location="mobile_nav" data-button-type="quote">Ajánlatot kérek</a>
    </div>
  </nav>`;
}

/* ===========================================================
   Breadcrumb
   =========================================================== */
function breadcrumbHTML(items) {
  const li = items
    .map((it, i) => (i === items.length - 1 ? `<li aria-current="page">${it.label}</li>` : `<li><a href="${it.href}">${it.label}</a></li><li aria-hidden="true">/</li>`))
    .join("\n        ");
  return `<div class="breadcrumb">
    <div class="container">
      <ol class="breadcrumb__list">
        ${li}
      </ol>
    </div>
  </div>`;
}

/* ===========================================================
   Lead form (used in hero + service sidebar + kapcsolat page)
   =========================================================== */
function leadFormHTML({ id, heading, headingAccent, desc, dark = true, compact = false }) {
  return `<div class="hero-panel${dark ? "" : " card--light"}">
      <p class="hero-panel__title">${heading}${headingAccent ? ` <span>${headingAccent}</span>` : ""}</p>
      ${desc ? `<p class="hero-panel__desc">${desc}</p>` : ""}
      <form class="lead-form" id="${id}" data-lead-form novalidate>
        <div class="form-field">
          <label for="${id}-name">Név</label>
          <input type="text" id="${id}-name" name="name" autocomplete="name" required>
          <span class="form-field__error">Adja meg a nevét.</span>
        </div>
        <div class="form-field">
          <label for="${id}-phone">Telefonszám</label>
          <input type="tel" id="${id}-phone" name="phone" inputmode="tel" autocomplete="tel" required>
          <span class="form-field__error">Adja meg a telefonszámát.</span>
        </div>
        ${
          compact
            ? ""
            : `<div class="form-field">
          <label for="${id}-city">Település</label>
          <input type="text" id="${id}-city" name="city" autocomplete="address-level2">
        </div>`
        }
        <div class="form-field">
          <label for="${id}-message">Probléma röviden (opcionális)</label>
          <textarea id="${id}-message" name="message" rows="3"></textarea>
        </div>
        <label class="form-consent">
          <input type="checkbox" name="consent" required>
          <span>Elfogadom az <a href="/adatvedelem/">adatkezelési tájékoztatót</a>.</span>
        </label>
        <div class="form-note" data-form-devnote>⚠ FORM_ENDPOINT nincs beállítva (assets/js/business-data.js) — a küldés csak fejlesztői szimuláció. Lásd DEPLOYMENT.md.</div>
        <div class="form-status" data-form-status role="status" aria-live="polite"></div>
        <button type="submit" class="btn btn--yellow btn--block">${icon("arrowRight")}Küldés</button>
      </form>
    </div>`;
}

/* ===========================================================
   Service strip (homepage)
   =========================================================== */
function serviceStripHTML(activeSlug) {
  const items = services
    .map(
      (s) => `<a class="service-strip__item" href="/${s.slug}/" data-track="service_click" data-service="${s.slug}" data-location="service_strip"${s.slug === activeSlug ? ' aria-current="page"' : ""}>
          ${icon(s.icon)}
          <span>${s.stripLine1}<br>${s.stripLine2}</span>
        </a>`
    )
    .join("\n        ");
  return `<section class="service-strip" id="szolgaltatasok">
    <div class="container">
      <div class="service-strip__grid">
        ${items}
      </div>
    </div>
  </section>`;
}

/* ===========================================================
   Related services (service pages)
   =========================================================== */
function relatedServicesHTML(currentService) {
  const items = currentService.relatedSlugs
    .map((slug) => {
      const s = findService(slug);
      return `<a class="related-card" href="/${s.slug}/" data-track="service_click" data-service="${s.slug}" data-location="related_services">
          ${icon(s.icon)}
          <span class="related-card__title">${s.stripLine1} ${s.stripLine2}</span>
          <span class="related-card__desc">${s.h1}</span>
          <span class="text-link text-link--dark">Részletek ${icon("arrowRight")}</span>
        </a>`;
    })
    .join("\n        ");
  return `<section class="section" aria-labelledby="related-heading">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Kapcsolódó szolgáltatások</p>
        <h2 class="section-title" id="related-heading">Ehhez is szükség lehet</h2>
      </div>
      <div class="related-services__grid">
        ${items}
      </div>
    </div>
  </section>`;
}

/* ===========================================================
   FAQ accordion
   =========================================================== */
function faqHTML(faqs, idPrefix) {
  const items = faqs
    .map((f, i) => {
      const qid = `${idPrefix}-q${i}`;
      const aid = `${idPrefix}-a${i}`;
      return `<div class="faq-item">
          <h3>
            <button type="button" class="faq-item__q" id="${qid}" aria-expanded="false" aria-controls="${aid}">
              <span>${f.q}</span>
              ${icon("chevronDown")}
            </button>
          </h3>
          <div class="faq-item__a" id="${aid}" role="region" aria-labelledby="${qid}">
            <p>${f.a}</p>
          </div>
        </div>`;
    })
    .join("\n        ");
  return `<div class="faq">
        ${items}
      </div>`;
}

function faqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function breadcrumbJsonLd(items, base) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: `https://${biz.domain}${it.href}`,
    })),
  };
}

function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: biz.brandName,
    image: `https://${biz.domain}/assets/images/hero-electrician.jpg`,
    telephone: biz.phoneTel,
    email: biz.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: biz.address,
      addressLocality: biz.primaryCity,
      addressRegion: biz.region,
      addressCountry: "HU",
    },
    areaServed: [biz.primaryCity, biz.serviceArea],
    url: `https://${biz.domain}/`,
    openingHours: biz.openingHours,
  };
}

/* ===========================================================
   Contact strip / footer / mobile bar / consent
   =========================================================== */
function contactStripHTML() {
  return `<section class="contact-strip">
    <div class="container contact-strip__inner">
      <div class="contact-strip__msg">
        ${icon("phone")}
        <div>
          <p class="contact-strip__title">Azonnali segítségre van szüksége?</p>
          <p class="contact-strip__sub">Hívjon minket, és egyeztetjük a részleteket.</p>
        </div>
      </div>
      <a class="btn btn--dark" href="tel:${biz.phoneTel}" data-track="phone_click" data-location="contact_band">
        ${icon("phone")}${biz.phoneDisplay}
      </a>
    </div>
  </section>`;
}

function footerHTML() {
  const quickLinks = [
    { label: "Főoldal", href: "/" },
    { label: "Szolgáltatások", href: "/#szolgaltatasok" },
    { label: "Hibaelhárítás", href: "/hibaelharitas/" },
    { label: "Rólunk", href: "/rolunk/" },
    { label: "Kapcsolat", href: "/kapcsolat/" },
  ]
    .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
    .join("\n              ");

  const serviceLinks = services
    .map((s) => `<li><a href="/${s.slug}/" data-track="service_click" data-service="${s.slug}" data-location="footer">${s.navLabel}</a></li>`)
    .join("\n              ");

  return `<footer class="site-footer" data-page-type-holder>
    <div class="container footer-top">
      <div class="footer-grid">
        <div>
          <a class="brand" href="/" aria-label="${biz.brandName} - főoldal">
            ${icon("bolt", "brand__mark")}
            <span class="brand__text">
              <span class="brand__name">VILLANY<span>SZAKÉRTŐ</span></span>
              <span class="brand__sub">${biz.brandName}</span>
            </span>
          </a>
          <p class="footer-brand__desc">Villanyszerelési szolgáltatások ${biz.primaryCity}en és ${biz.serviceArea} területén. Telefonos egyeztetés, helyszíni felmérés, írásos ajánlat.</p>
          <div class="footer-social">
            <a href="${biz.facebookUrl}" aria-label="Facebook">${icon("facebook")}</a>
            <a href="${biz.instagramUrl}" aria-label="Instagram">${icon("instagram")}</a>
            <a href="${biz.googleReviewsUrl}" aria-label="Google vélemények">${icon("google")}</a>
          </div>
        </div>
        <div>
          <p class="footer-heading">Gyors hivatkozások</p>
          <ul class="footer-links">
              ${quickLinks}
          </ul>
        </div>
        <div>
          <p class="footer-heading">Szolgáltatásaink</p>
          <ul class="footer-links">
              ${serviceLinks}
          </ul>
        </div>
        <div>
          <p class="footer-heading">Kapcsolat</p>
          <ul class="footer-contact">
            <li>${icon("pin")}<span>${biz.address}</span></li>
            <li>${icon("phone")}<a href="tel:${biz.phoneTel}" data-track="phone_click" data-location="footer">${biz.phoneDisplay}</a></li>
            <li>${icon("mail")}<a href="mailto:${biz.email}" data-track="email_click" data-location="footer">${biz.email}</a></li>
            <li>${icon("clock")}<span>${biz.openingHours}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom__inner">
        <p>© <span data-current-year>2026</span> ${biz.brandName} – Minden jog fenntartva.</p>
        <div class="footer-bottom__links">
          <a href="/adatvedelem/">Adatkezelési tájékoztató</a>
          <a href="/cookie-tajekoztato/">Cookie tájékoztató</a>
        </div>
      </div>
    </div>
  </footer>`;
}

function mobileStickyBarHTML() {
  return `<div class="mobile-sticky-bar">
    <a class="mobile-sticky-bar__call" href="tel:${biz.phoneTel}" data-track="phone_click" data-location="mobile_sticky">${icon("phone")}Hívás</a>
    <a class="mobile-sticky-bar__quote" href="/kapcsolat/" data-track="cta_click" data-location="mobile_sticky" data-button-type="quote">${icon("send")}Ajánlatkérés</a>
  </div>`;
}

function consentBannerHTML() {
  return `<div class="consent-banner" data-consent-banner role="dialog" aria-label="Süti beállítások">
    <p>Weboldalunk sütiket használ a működéshez és — hozzájárulása esetén — a mérésekhez/hirdetésekhez. Bővebben a <a href="/cookie-tajekoztato/">cookie tájékoztatóban</a>.</p>
    <div class="consent-banner__actions">
      <button type="button" class="btn btn--yellow btn--sm" data-consent-accept>Elfogadom</button>
      <button type="button" class="btn btn--outline btn--sm" data-consent-decline>Elutasítom</button>
    </div>
  </div>`;
}

function scriptsHTML() {
  return `<script src="/assets/js/business-data.js"></script>
  <script src="/assets/js/tracking.js"></script>
  <script src="/assets/js/app.js"></script>
  <script>var y=document.querySelector('[data-current-year]');if(y)y.textContent=new Date().getFullYear();</script>`;
}

/* ===========================================================
   Full document wrapper
   =========================================================== */
function documentHTML({ pageType, activeSlug, head, body }) {
  return `<!DOCTYPE html>
<html lang="hu" class="no-js">
<head>
    ${head}
</head>
<body data-page-type="${pageType}">
  <a class="skip-link" href="#main">Ugrás a tartalomra</a>
  ${gtmBody()}
  ${headerHTML(activeSlug)}
  <main id="main">
  ${body}
  </main>
  ${footerHTML()}
  ${mobileStickyBarHTML()}
  ${consentBannerHTML()}
  ${scriptsHTML()}
</body>
</html>
`;
}

/* ===========================================================
   HOME PAGE
   =========================================================== */
function homePage() {
  const head = headHTML({
    title: `Villanyszerelő ${biz.primaryCity} | ${biz.brandName}`,
    description: `Megbízható villanyszerelés ${biz.primaryCity}en és ${biz.serviceArea} területén. Lakossági és ipari munkák, hibaelhárítás. Kérjen ajánlatot vagy hívjon minket.`,
    canonicalPath: "/",
    jsonLd: [localBusinessJsonLd(), { "@context": "https://schema.org", "@type": "WebSite", name: biz.brandName, url: `https://${biz.domain}/` }],
  });

  const badges = ["Telefonos egyeztetés", "Írásos árajánlat", "Garanciális munkavégzés"]
    .map((b) => `<div class="hero__badge">${icon("check")}<span>${b}</span></div>`)
    .join("\n          ");

  const body = `<section class="hero">
    <div class="hero__bg" style="background-image:url('/assets/images/hero-electrician.svg')" role="img" aria-label="Villanyszerelő munka közben egy nyitott biztosítéktáblánál (csere előtti helyőrző kép)"></div>
    <div class="hero__scrim"></div>
    <div class="container hero__inner">
      <div class="hero__content">
        <p class="eyebrow">Villanyszerelés ${biz.primaryCity} és ${biz.serviceArea} területén</p>
        <h1 class="hero__headline">Megbízható villanyszerelő<br>gyorsan. <mark>biztonságosan.</mark><br><mark>korrekten.</mark></h1>
        <p class="hero__lead">Lakossági és ipari villanyszerelés, hibaelhárítás és korszerűsítés ${biz.primaryCity}en és ${biz.serviceArea} térségében — telefonos egyeztetéssel és írásos ajánlattal.</p>
        <div class="hero__badges">
          ${badges}
        </div>
        <div class="hero__ctas">
          <a class="btn btn--yellow" href="/kapcsolat/" data-track="quote_request" data-location="hero">${icon("arrowRight")}Ajánlatot kérek</a>
          <a class="btn btn--outline" href="tel:${biz.phoneTel}" data-track="phone_click" data-location="hero">${icon("phone")}${biz.phoneDisplay}</a>
        </div>
      </div>
      ${leadFormHTML({
        id: "hero-form",
        heading: "Kérjen visszahívást",
        headingAccent: "vagy ajánlatot",
        desc: "Töltse ki az űrlapot, és egyeztetett időpontban visszahívjuk.",
      })}
    </div>
  </section>

  ${serviceStripHTML()}

  <section class="section" aria-labelledby="about-heading">
    <div class="container about-grid">
      <div class="about-grid__media">
        <img src="/assets/images/about-work.svg" alt="Villanyszerelő dolgozik egy nyitott kapcsolószekrénynél" width="640" height="480" loading="lazy">
      </div>
      <div class="about-grid__body">
        <p class="eyebrow">Rólunk</p>
        <h2 class="section-title" id="about-heading">Tapasztalat. Szakértelem.<br>Megbízhatóság.</h2>
        <p>Villanyszerelési munkákat vállalunk ${biz.primaryCity}en és ${biz.serviceArea} térségében — a kisebb javítástól a teljes körű hálózatkiépítésig. Számunkra a minőség és az ügyfél tájékoztatása az elsődleges.</p>
        <ul class="check-list">
          <li>${icon("check")}<span>Telefonos egyeztetés és helyszíni felmérés</span></li>
          <li>${icon("check")}<span>Írásos árajánlat a munka megkezdése előtt</span></li>
          <li>${icon("check")}<span>${biz.warrantyText} garancia a elvégzett munkára</span></li>
        </ul>
        <a class="text-link text-link--dark" href="/rolunk/">Többet rólunk ${icon("arrowRight")}</a>
      </div>
    </div>
  </section>

  <section class="stats-row" aria-label="Számokban">
    <div class="container">
      <div class="stats-row__grid">
        ${stats
          .map(
            (s) => `<div class="stats-row__item">${icon(s.icon)}<span class="stats-row__number">${s.number}</span><span class="stats-row__label">${s.label}</span></div>`
          )
          .join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section testimonials" id="referenciak" aria-labelledby="testimonials-heading">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title section-title--light" id="testimonials-heading">Ügyfeleink mondták</h2>
      </div>
      <div class="testimonials__layout">
        <div class="testimonials__cards">
          ${testimonials
            .map(
              (t) => `<div class="testimonial-card">
              <div class="testimonial-card__stars">${icon("star")}${icon("star")}${icon("star")}${icon("star")}${icon("star")}</div>
              <p class="testimonial-card__quote">"${t.quote}"</p>
              <div class="testimonial-card__author">
                <span class="testimonial-card__avatar" aria-hidden="true">${t.name.replace("[", "").charAt(0) || "?"}</span>
                <span>
                  <span class="testimonial-card__name" style="display:block">${t.name}</span>
                  <span class="testimonial-card__loc">${t.loc}</span>
                </span>
              </div>
            </div>`
            )
            .join("\n          ")}
        </div>
        <div class="testimonials__media">
          <img src="/assets/images/ev-charger.svg" alt="Falra szerelt elektromos autó töltő" width="480" height="560" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  ${contactStripHTML()}
  `;

  return documentHTML({ pageType: "home", activeSlug: "home", head, body });
}

/* ===========================================================
   SERVICE PAGE
   =========================================================== */
function servicePage(service) {
  const head = headHTML({
    title: service.metaTitle,
    description: service.metaDescription,
    canonicalPath: `/${service.slug}/`,
    jsonLd: [
      breadcrumbJsonLd([
        { label: "Főoldal", href: "/" },
        { label: service.navLabel, href: `/${service.slug}/` },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: service.navLabel,
        provider: { "@type": "Electrician", name: biz.brandName },
        areaServed: [biz.primaryCity, biz.serviceArea],
        description: service.metaDescription,
      },
      faqJsonLd(service.faqs),
    ],
  });

  const body = `${breadcrumbHTML([
    { label: "Főoldal", href: "/" },
    { label: service.navLabel, href: `/${service.slug}/` },
  ])}
  <section class="page-hero">
    <div class="container">
      <p class="page-hero__eyebrow">${service.eyebrow}</p>
      <h1 class="page-hero__title">${service.h1}</h1>
      <p class="page-hero__lead">${service.intro}</p>
      <div class="page-hero__ctas">
        <a class="btn btn--yellow" href="tel:${biz.phoneTel}" data-track="phone_click" data-location="service_hero" data-service="${service.slug}">${icon("phone")}Hívás most</a>
        <a class="btn btn--outline" href="#ajanlatkeres" data-track="cta_click" data-location="service_hero" data-service="${service.slug}" data-button-type="quote">${icon("arrowRight")}Ajánlatot kérek</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container content-grid">
      <div class="prose">
        <h2>${service.problemsHeading}</h2>
        <ul>
          ${service.problems.map((p) => `<li>${icon("check")}<span>${p}</span></li>`).join("\n          ")}
        </ul>

        <h2>Hogyan zajlik a munka?</h2>
        <ol>
          <li>Telefonos egyeztetés — röviden átbeszéljük az igényét.</li>
          <li>Helyszíni felmérés, egyeztetett időpontban.</li>
          <li>Írásos árajánlat, majd a kivitelezés egyeztetett ütemezéssel.</li>
          <li>Átadás, szükség esetén dokumentációval.</li>
        </ol>

        <h2>Szolgáltatási terület</h2>
        <p>Ezt a szolgáltatást ${biz.primaryCity}en és ${biz.serviceArea} térségében (${biz.region}) vállaljuk. Ha nem biztos benne, hogy az Ön ingatlana a szolgáltatási területünkön van, hívjon minket telefonon.</p>

        <h2>Gyakori kérdések</h2>
        ${faqHTML(service.faqs, service.slug)}
      </div>
      <aside class="side-cta" id="ajanlatkeres">
        ${leadFormHTML({
          id: `${service.slug}-form`,
          heading: service.navLabel,
          headingAccent: "ajánlatkérés",
          desc: "Adja meg elérhetőségét, és egyeztetett időpontban visszahívjuk.",
          compact: true,
        })}
      </aside>
    </div>
  </section>

  ${relatedServicesHTML(service)}
  ${contactStripHTML()}
  `;

  return documentHTML({ pageType: "service", activeSlug: service.slug, head, body });
}

/* ===========================================================
   RÓLUNK
   =========================================================== */
function rolunkPage() {
  const head = headHTML({
    title: `Rólunk | ${biz.brandName}`,
    description: `Ismerje meg a(z) ${biz.brandName} csapatát — villanyszerelési szolgáltatások ${biz.primaryCity}en és ${biz.serviceArea} térségében.`,
    canonicalPath: "/rolunk/",
    jsonLd: [breadcrumbJsonLd([{ label: "Főoldal", href: "/" }, { label: "Rólunk", href: "/rolunk/" }])],
  });

  const body = `${breadcrumbHTML([{ label: "Főoldal", href: "/" }, { label: "Rólunk", href: "/rolunk/" }])}
  <section class="page-hero">
    <div class="container">
      <p class="page-hero__eyebrow">Rólunk</p>
      <h1 class="page-hero__title">Tapasztalat. Szakértelem. Megbízhatóság.</h1>
      <p class="page-hero__lead">A ${biz.brandName} villanyszerelési szolgáltatásokat nyújt ${biz.primaryCity}en és ${biz.serviceArea} térségében — lakossági és ipari munkákra egyaránt.</p>
    </div>
  </section>

  <section class="section">
    <div class="container about-grid">
      <div class="about-grid__media">
        <img src="/assets/images/about-work.svg" alt="Villanyszerelő munka közben" width="640" height="480" loading="lazy">
      </div>
      <div class="about-grid__body">
        <h2 class="section-title">Miért minket válasszon?</h2>
        <p>Célunk, hogy a villanyszerelési munkák átlátható folyamattal, világos kommunikációval és korrekt árazással valósuljanak meg — a telefonos egyeztetéstől az átadásig.</p>
        <ul class="check-list">
          <li>${icon("check")}<span>Telefonos egyeztetés és helyszíni felmérés minden munka előtt</span></li>
          <li>${icon("check")}<span>Írásos árajánlat, rejtett költségek nélkül</span></li>
          <li>${icon("check")}<span>${biz.warrantyText} garancia az elvégzett munkára</span></li>
          <li>${icon("check")}<span>${biz.yearsExperience} év szakmai tapasztalat</span></li>
        </ul>
        <a class="btn btn--yellow" href="/kapcsolat/" data-track="quote_request" data-location="rolunk">${icon("arrowRight")}Kérjen ajánlatot</a>
      </div>
    </div>
  </section>

  <section class="stats-row" aria-label="Számokban">
    <div class="container">
      <div class="stats-row__grid">
        ${stats
          .map((s) => `<div class="stats-row__item">${icon(s.icon)}<span class="stats-row__number">${s.number}</span><span class="stats-row__label">${s.label}</span></div>`)
          .join("\n        ")}
      </div>
    </div>
  </section>

  ${serviceStripHTML()}
  ${contactStripHTML()}
  `;

  return documentHTML({ pageType: "about", activeSlug: "rolunk", head, body });
}

/* ===========================================================
   KAPCSOLAT
   =========================================================== */
function kapcsolatPage() {
  const head = headHTML({
    title: `Kapcsolat | ${biz.brandName}`,
    description: `Vegye fel velünk a kapcsolatot telefonon, e-mailben vagy az űrlap kitöltésével. Villanyszerelés ${biz.primaryCity}en és ${biz.serviceArea} területén.`,
    canonicalPath: "/kapcsolat/",
    jsonLd: [breadcrumbJsonLd([{ label: "Főoldal", href: "/" }, { label: "Kapcsolat", href: "/kapcsolat/" }])],
  });

  const body = `${breadcrumbHTML([{ label: "Főoldal", href: "/" }, { label: "Kapcsolat", href: "/kapcsolat/" }])}
  <section class="page-hero">
    <div class="container">
      <p class="page-hero__eyebrow">Kapcsolat</p>
      <h1 class="page-hero__title">Vegye fel velünk a kapcsolatot</h1>
      <p class="page-hero__lead">Hívjon minket telefonon, vagy töltse ki az űrlapot — egyeztetett időpontban visszahívjuk.</p>
    </div>
  </section>

  <section class="section">
    <div class="container content-grid">
      <div class="prose">
        <h2>Elérhetőségeink</h2>
        <ul>
          <li>${icon("phone")}<span><a href="tel:${biz.phoneTel}" data-track="phone_click" data-location="kapcsolat_oldal">${biz.phoneDisplay}</a></span></li>
          <li>${icon("mail")}<span><a href="mailto:${biz.email}" data-track="email_click" data-location="kapcsolat_oldal">${biz.email}</a></span></li>
          <li>${icon("pin")}<span>${biz.address}</span></li>
          <li>${icon("clock")}<span>${biz.openingHours}</span></li>
        </ul>
        <h2>Szolgáltatási terület</h2>
        <p>${biz.primaryCity} és ${biz.serviceArea} térsége, ${biz.region}.</p>
      </div>
      <div>
        ${leadFormHTML({
          id: "contact-form",
          heading: "Küldjön üzenetet",
          desc: "A csillaggal jelölt mezők kitöltése kötelező.",
          dark: false,
        })}
      </div>
    </div>
  </section>
  `;

  return documentHTML({ pageType: "contact", activeSlug: "kapcsolat", head, body });
}

/* ===========================================================
   KÖSZÖNJÜK
   =========================================================== */
function koszonjukPage() {
  const head = headHTML({
    title: `Köszönjük | ${biz.brandName}`,
    description: "Köszönjük megkeresését, hamarosan felvesszük Önnel a kapcsolatot.",
    canonicalPath: "/koszonjuk/",
    noindex: true,
  });

  const body = `<section class="section thankyou">
    <div class="container">
      <div class="thankyou__box">
        ${icon("checkCircle", "thankyou__icon")}
        <h1 class="section-title">Köszönjük, megkaptuk az ajánlatkérést.</h1>
        <p class="section-subtitle" style="margin-top:16px">Hamarosan felvesszük Önnel a kapcsolatot az Ön által megadott elérhetőségen. Ha sürgős, hívjon minket most.</p>
        <div class="page-hero__ctas" style="margin-top:32px">
          <a class="btn btn--yellow" href="tel:${biz.phoneTel}" data-track="phone_click" data-location="koszonjuk">${icon("phone")}${biz.phoneDisplay}</a>
          <a class="btn btn--outline btn--outline-dark" style="color:var(--ink);border-color:#d8dbe2" href="/">${icon("arrowRight")}Vissza a főoldalra</a>
        </div>
      </div>
    </div>
  </section>`;

  return documentHTML({ pageType: "thankyou", activeSlug: "", head, body });
}

/* ===========================================================
   LEGAL PAGES
   =========================================================== */
function legalPage({ slug, title, sections }) {
  const head = headHTML({
    title: `${title} | ${biz.brandName}`,
    description: `${title} — ${biz.brandName}.`,
    canonicalPath: `/${slug}/`,
  });

  const body = `${breadcrumbHTML([{ label: "Főoldal", href: "/" }, { label: title, href: `/${slug}/` }])}
  <section class="section legal-page">
    <div class="container">
      <h1 class="section-title" style="margin-bottom:32px">${title}</h1>
      <div class="prose">
        ${sections.map((s) => `<h2>${s.h}</h2>\n        ${s.body}`).join("\n        ")}
      </div>
    </div>
  </section>`;

  return documentHTML({ pageType: "legal", activeSlug: "", head, body });
}

function adatvedelemPage() {
  return legalPage({
    slug: "adatvedelem",
    title: "Adatkezelési tájékoztató",
    sections: [
      { h: "1. Az adatkezelő", body: `<p>Adatkezelő: ${biz.brandName}, székhely/levelezési cím: ${biz.address}, e-mail: ${biz.email}, telefon: ${biz.phoneDisplay}.</p><p><strong>[TODO: ez a tartalom sablon, közzététel előtt jogi felülvizsgálat szükséges.]</strong></p>` },
      { h: "2. Kezelt adatok köre", body: `<p>Az űrlapon megadott név, telefonszám, opcionálisan település és üzenet, valamint az e-mail címre írt levelek esetén az e-mail cím és az üzenet tartalma.</p>` },
      { h: "3. Az adatkezelés célja és jogalapja", body: `<p>Az adatkezelés célja az ajánlatkéréssel / megkereséssel kapcsolatos kapcsolatfelvétel. Jogalapja az érintett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont).</p>` },
      { h: "4. Az adatok megőrzési ideje", body: `<p>[TODO: megőrzési időtartam meghatározása.]</p>` },
      { h: "5. Adattovábbítás, adatfeldolgozók", body: `<p>[TODO: az esetlegesen igénybe vett űrlap-/tárhelyszolgáltató, GTM/analitikai szolgáltató feltüntetése.]</p>` },
      { h: "6. Az érintett jogai", body: `<p>Az érintett kérelmezheti az adatkezelőtől a rá vonatkozó személyes adatokhoz való hozzáférést, azok helyesbítését, törlését vagy kezelésének korlátozását, és tiltakozhat az ilyen személyes adatok kezelése ellen.</p>` },
      { h: "7. Panasz benyújtásának lehetősége", body: `<p>Panasszal a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH) lehet élni. [TODO: elérhetőségek pontosítása.]</p>` },
    ],
  });
}

function cookiePage() {
  return legalPage({
    slug: "cookie-tajekoztato",
    title: "Cookie tájékoztató",
    sections: [
      { h: "1. Mik azok a sütik (cookie-k)?", body: `<p>A sütik olyan kisméretű szövegfájlok, amelyeket a böngésző tárol el a weboldal működése és mérése céljából.</p>` },
      { h: "2. Milyen sütiket használunk?", body: `<p>Az oldal működéséhez szükséges (essential) sütiket, valamint — az Ön hozzájárulása esetén — mérési/hirdetési célú sütiket a Google Tag Manageren (GTM) keresztül. Hozzájárulása előtt ezek a sütik alapértelmezetten letiltott (denied) állapotban vannak, a Consent Mode beállításnak megfelelően.</p>` },
      { h: "3. Hozzájárulás kezelése", body: `<p>A hozzájárulását az oldalon megjelenő süti-sávon adhatja meg vagy vonhatja vissza. [TODO: GTM/Consent Mode konkrét taghez igazítása.]</p>` },
      { h: "4. Böngésző beállítások", body: `<p>A sütik böngészőjében is korlátozhatók vagy törölhetők — ehhez a böngészője súgóját érdemes segítségül hívni.</p>` },
    ],
  });
}

/* ===========================================================
   robots.txt / sitemap.xml
   =========================================================== */
function robotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /koszonjuk/

Sitemap: https://${biz.domain}/sitemap.xml
`;
}

function sitemapXml() {
  const urls = [
    "/",
    ...services.map((s) => `/${s.slug}/`),
    "/rolunk/",
    "/kapcsolat/",
    "/adatvedelem/",
    "/cookie-tajekoztato/",
  ];
  const items = urls
    .map((u) => `  <url>\n    <loc>https://${biz.domain}${u}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

/* ===========================================================
   WRITE
   =========================================================== */
function write(relPath, content) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("wrote", relPath);
}

write("index.html", homePage());
services.forEach((s) => write(`${s.slug}/index.html`, servicePage(s)));
write("rolunk/index.html", rolunkPage());
write("kapcsolat/index.html", kapcsolatPage());
write("koszonjuk/index.html", koszonjukPage());
write("adatvedelem/index.html", adatvedelemPage());
write("cookie-tajekoztato/index.html", cookiePage());
write("robots.txt", robotsTxt());
write("sitemap.xml", sitemapXml());

console.log("\nDone.");
