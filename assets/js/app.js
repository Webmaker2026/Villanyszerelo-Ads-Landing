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
     Lead forms (hero + contact page)
  --------------------------------------------------------- */
  var endpoint = (window.BUSINESS_DATA && window.BUSINESS_DATA.formEndpoint) || "";
  var endpointConfigured = /^https?:\/\//i.test(endpoint);
  var contactEmail = (window.BUSINESS_DATA && window.BUSINESS_DATA.email) || "";

  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    var startedTracking = false;
    var statusEl = form.querySelector("[data-form-status]");

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
        var isEmpty = !field.value || !field.value.trim();
        if (wrapper) wrapper.classList.toggle("form-field--error", isEmpty);
        if (isEmpty) valid = false;
      });

      if (window.trackEvent) window.trackEvent("form_submit", { form_id: form.id || "" });

      if (!valid) {
        showStatus(statusEl, "error", "Kérjük, töltse ki a kötelező mezőket.");
        return;
      }

      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = "Küldés...";
      }

      // No form backend configured yet: fall back to a pre-filled mailto
      // so the lead is never silently lost, and be upfront that the visitor
      // still needs to hit send in their own mail app (with the phone
      // number offered as the reliable alternative).
      if (!endpointConfigured) {
        if (window.trackEvent) window.trackEvent("form_success", { form_id: form.id || "", mode: "mailto_fallback" });
        if (contactEmail) {
          var data = new FormData(form);
          var lines = [
            "Név: " + (data.get("name") || ""),
            "Telefonszám: " + (data.get("phone") || ""),
          ];
          if (data.has("city")) lines.push("Település: " + (data.get("city") || ""));
          lines.push("Üzenet: " + (data.get("message") || ""));
          var mailto =
            "mailto:" + contactEmail +
            "?subject=" + encodeURIComponent("Ajánlatkérés a weboldalról") +
            "&body=" + encodeURIComponent(lines.join("\n"));
          window.location.href = mailto;
        }
        showStatus(
          statusEl,
          "success",
          "Megnyitottuk az e-mail programját a kitöltött adatokkal — kérjük, küldje el az üzenetet. Ha nem nyílt meg, hívjon minket telefonon: " + (window.BUSINESS_DATA ? window.BUSINESS_DATA.phoneDisplay : "") + "."
        );
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText || "Küldés";
        }
        return;
      }

      var formData = new FormData(form);
      fetch(endpoint, { method: "POST", body: formData, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("submit_failed");
          if (window.trackEvent) window.trackEvent("form_success", { form_id: form.id || "" });
          window.location.href = "/koszonjuk/";
        })
        .catch(function () {
          if (window.trackEvent) window.trackEvent("form_error", { form_id: form.id || "" });
          showStatus(statusEl, "error", "Hiba történt a küldés során. Kérjük, hívjon minket telefonon.");
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || "Küldés";
          }
        });
    });
  });

  function showStatus(el, type, message) {
    if (!el) return;
    el.textContent = message;
    el.className = "form-status is-visible form-status--" + type;
  }
})();
