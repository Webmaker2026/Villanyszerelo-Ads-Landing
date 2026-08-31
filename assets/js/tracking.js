/**
 * Minimal GTM/dataLayer bridge. No PII is ever pushed — only page/placement
 * metadata. See docs/tracking-handoff.md for the GTM container setup.
 */
(function () {
  window.dataLayer = window.dataLayer || [];

  function trackEvent(eventName, params) {
    var payload = Object.assign(
      {
        event: eventName,
        page_type: document.body.getAttribute("data-page-type") || "",
        page_path: window.location.pathname
      },
      params || {}
    );
    window.dataLayer.push(payload);
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      console.info("[tracking]", payload);
    }
  }
  window.trackEvent = trackEvent;

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (!el) return;
    trackEvent(el.getAttribute("data-track"), {
      placement: el.getAttribute("data-location") || "",
      button_type: el.getAttribute("data-button-type") || el.tagName.toLowerCase(),
      service: el.getAttribute("data-service") || ""
    });
  });

  /* ---------------------------------------------------------
     Minimal consent banner + Consent Mode default.
     Advertising/analytics storage default to "denied" until the
     visitor accepts, per docs/tracking-handoff.md.
  --------------------------------------------------------- */
  function gtag() { window.dataLayer.push(arguments); }
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied"
  });

  document.addEventListener("DOMContentLoaded", function () {
    var STORAGE_KEY = "consent_choice_v1";
    var banner = document.querySelector("[data-consent-banner]");
    if (!banner) return;

    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) { /* storage unavailable */ }

    function applyConsent(granted) {
      gtag("consent", "update", {
        ad_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied",
        analytics_storage: granted ? "granted" : "denied"
      });
    }

    if (saved === "granted" || saved === "denied") {
      applyConsent(saved === "granted");
      return;
    }

    banner.classList.add("is-visible");
    banner.querySelectorAll("[data-consent-accept]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyConsent(true);
        try { localStorage.setItem(STORAGE_KEY, "granted"); } catch (err) {}
        banner.classList.remove("is-visible");
      });
    });
    banner.querySelectorAll("[data-consent-decline]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyConsent(false);
        try { localStorage.setItem(STORAGE_KEY, "denied"); } catch (err) {}
        banner.classList.remove("is-visible");
      });
    });
  });
})();
