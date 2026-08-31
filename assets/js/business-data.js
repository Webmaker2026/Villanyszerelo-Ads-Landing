/**
 * Single source of truth for editable business data.
 * This object mirrors the placeholder tokens used across the static HTML
 * pages (e.g. [PHONE], [BRAND_NAME]). It is provided for two purposes:
 *   1. Reference for JSON-LD / future dynamic use.
 *   2. If you regenerate the site with tools/generate.mjs, this is where
 *      tools/site-data.js pulls its values from conceptually — keep both
 *      in sync, or simply find-and-replace the bracket tokens directly
 *      in the HTML files if you are not using Node.
 *
 * See README-FIRST.md for the full replacement checklist.
 */
window.BUSINESS_DATA = {
  brandName: "[BRAND_NAME]",
  domain: "[DOMAIN]",
  phoneDisplay: "[PHONE]",
  phoneTel: "[PHONE_TEL]",
  email: "[EMAIL]",
  primaryCity: "[PRIMARY_CITY]",
  serviceArea: "[PRIMARY_SERVICE_AREA]",
  region: "[COUNTY_OR_REGION]",
  address: "[ADDRESS]",
  openingHours: "[OPENING_HOURS]",
  yearsExperience: "[YEARS_EXPERIENCE]",
  responseTime: "[RESPONSE_TIME]",
  warrantyText: "[WARRANTY_TEXT]",
  googleReviewsUrl: "[GOOGLE_REVIEWS_URL]",
  facebookUrl: "[FACEBOOK_URL]",
  instagramUrl: "[INSTAGRAM_URL]",
  gtmId: "[GTM_ID]",
  formEndpoint: "[FORM_ENDPOINT]"
};
