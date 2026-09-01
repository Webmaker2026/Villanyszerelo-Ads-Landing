(function () {
  document.documentElement.classList.remove("no-js");

  /* ---------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------- */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      mobileNav.classList.toggle("is-open", !expanded);
      document.body.style.overflow = !expanded ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------------------------------------------------
     FAQ accordion
  --------------------------------------------------------- */
  document.querySelectorAll(".faq-item__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var answer = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.classList.toggle("is-open", !expanded);
    });
  });

  /* ---------------------------------------------------------
     Lead forms (hero + service pages + contact page)
     All forms POST to the PHP handler at /send-form.php. Client-side
     checks below are for fast UX only — send-form.php re-validates
     everything server-side and is the source of truth for success/failure.
  --------------------------------------------------------- */
  var FORM_ENDPOINT = "/send-form.php";

  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    var startedTracking = false;
    var statusEl = form.querySelector("[data-form-status]");
    var pageUrlField = form.querySelector('[name="page_url"]');
    if (pageUrlField) pageUrlField.value = window.location.href;

    form.addEventListener(
      "focusin",
      function () {
        if (startedTracking) return;
        startedTracking = true;
        if (window.trackEvent) window.trackEvent("form_start", { form_id: form.id || "" });
      },
      { once: false }
    );

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var valid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var wrapper = field.closest(".form-field");
        var isEmpty = field.type === "checkbox" ? !field.checked : !field.value || !field.value.trim();
        if (wrapper) wrapper.classList.toggle("form-field--error", isEmpty);
        if (isEmpty) valid = false;
      });

      if (window.trackEvent) window.trackEvent("form_submit", { form_id: form.id || "" });

      if (!valid) {
        showStatus(statusEl, "error", "Kérjük, töltse ki a kötelező mezőket, és fogadja el az adatkezelési tájékoztatót.");
        return;
      }

      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = "Küldés...";
      }

      function resetButton() {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText || "Küldés";
        }
      }

      var formData = new FormData(form);
      fetch(FORM_ENDPOINT, { method: "POST", body: formData, headers: { Accept: "application/json" } })
        .then(function (res) {
          return res
            .json()
            .catch(function () {
              return null;
            })
            .then(function (data) {
              if (!res.ok || !data || data.success !== true) throw new Error("submit_failed");
              if (window.trackEvent) window.trackEvent("form_success", { form_id: form.id || "" });
              window.location.href = "/koszonjuk/";
            });
        })
        .catch(function () {
          if (window.trackEvent) window.trackEvent("form_error", { form_id: form.id || "" });
          showFormError(statusEl);
          resetButton();
        });
    });
  });

  function showStatus(el, type, message) {
    if (!el) return;
    el.textContent = message;
    el.className = "form-status is-visible form-status--" + type;
  }

  // Sending failed server-side: never redirect to the thank-you page, and
  // always surface the phone number as the fallback so a lead is never
  // silently lost. Uses innerHTML with static app data only (no user
  // input), to render the phone number as a clickable tel: link.
  function showFormError(el) {
    if (!el) return;
    var phoneDisplay = (window.BUSINESS_DATA && window.BUSINESS_DATA.phoneDisplay) || "";
    var phoneTel = (window.BUSINESS_DATA && window.BUSINESS_DATA.phoneTel) || "";
    el.innerHTML =
      "Hiba történt a küldés során. Kérjük, próbálja újra, vagy hívjon minket telefonon: " +
      '<a href="tel:' + phoneTel + '">' + phoneDisplay + "</a>.";
    el.className = "form-status is-visible form-status--error";
  }
})();
