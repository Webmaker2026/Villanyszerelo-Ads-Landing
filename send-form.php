<?php
/**
 * Lead-form handler for VeresVill 0-24.
 *
 * Every lead form on the site (hero + service pages + contact page) POSTs
 * here as plain HTML form data. Server-side validation here is
 * authoritative — the client-side checks in assets/js/app.js are for fast
 * UX only and must never be trusted on their own.
 *
 * Flow: validate -> sanitize -> send email -> respond.
 * - AJAX callers (assets/js/app.js sends `Accept: application/json`) get a
 *   JSON body and always HTTP 200 (the JS reads `success` instead of relying
 *   on the status code, since some hosts rewrite non-2xx error pages).
 * - Non-AJAX callers (JS disabled, form submitted as a plain POST) get a
 *   303 redirect to /koszonjuk/ on success, or an inline HTML error page
 *   (with the phone number as a fallback) on failure.
 *
 * See DEPLOYMENT.md for hosting requirements (PHP mail(), sender domain)
 * and how to switch to SMTP/PHPMailer if mail() is unreliable.
 */

declare(strict_types=1);

// Never leak PHP errors/warnings to the response body — log them instead.
error_reporting(E_ALL);
ini_set('display_errors', '0');

mb_internal_encoding('UTF-8');

// ---------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------
const RECIPIENT_EMAIL = 'veresvill24@gmail.com';
// Domain-based placeholder sender. This mailbox/domain must exist or be
// permitted to send as by the hosting mail server — see DEPLOYMENT.md.
const SENDER_EMAIL = 'webform@veresvill0-24.hu';
const SENDER_NAME = 'VeresVill 0-24 weboldal';
const SITE_NAME = 'VeresVill 0-24';
const THANK_YOU_PATH = '/koszonjuk/';

const MAX_LENGTHS = [
    'name' => 100,
    'phone' => 30,
    'city' => 100,
    'message' => 2000,
];

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

function wants_json(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    $requestedWith = $_SERVER['HTTP_X_REQUESTED_WITH'] ?? '';
    return stripos($accept, 'application/json') !== false
        || strtolower($requestedWith) === 'xmlhttprequest';
}

function client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? '';
}

// Strips control characters (CR/LF included) to make header injection via
// any field impossible, even though user input is never placed into a mail
// header in this script.
function clean_field(string $value): string
{
    $value = str_replace(["\r", "\n"], ' ', $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $value) ?? '';
    return trim($value);
}

function post_string(string $key): string
{
    $raw = $_POST[$key] ?? '';
    if (!is_string($raw)) {
        return '';
    }
    return clean_field($raw);
}

function truncate(string $value, int $maxLength): string
{
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength);
    }
    return substr($value, 0, $maxLength);
}

function is_plausible_phone(string $phone): bool
{
    // Loose validation: keep only digits/+, require a sane length. Accepts
    // Hungarian mobile/landline formats and most international formats
    // without being overly strict about a single pattern.
    $digitsOnly = preg_replace('/[^0-9+]/', '', $phone) ?? '';
    $digitCount = preg_match_all('/[0-9]/', $digitsOnly);
    return $digitCount >= 6 && $digitCount <= 15;
}

function respond(bool $success, string $message, int $httpStatus = 200): void
{
    if (wants_json()) {
        http_response_code($httpStatus);
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['success' => $success, 'error' => $success ? null : $message], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($success) {
        header('Location: ' . THANK_YOU_PATH, true, 303);
        exit;
    }

    render_error_page($message);
    exit;
}

function render_error_page(string $message): void
{
    http_response_code(200);
    header('Content-Type: text/html; charset=UTF-8');
    $safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    echo <<<HTML
<!DOCTYPE html>
<html lang="hu">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Hiba a küldés során | VeresVill 0-24</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background:#0e1420; color:#fff; margin:0; padding:48px 20px; text-align:center; }
  .box { max-width:480px; margin:0 auto; }
  h1 { font-size:22px; margin-bottom:16px; }
  p { color:#aab3c2; line-height:1.6; }
  a.phone { display:inline-block; margin-top:24px; background:#f2b705; color:#101623; font-weight:800; padding:14px 28px; border-radius:4px; text-decoration:none; }
  a.back { display:block; margin-top:16px; color:#aab3c2; }
</style>
</head>
<body>
  <div class="box">
    <h1>Hiba történt a küldés során</h1>
    <p>{$safeMessage}</p>
    <a class="phone" href="tel:+36707283434">Hívjon minket: +36 70 728 3434</a>
    <a class="back" href="/kapcsolat/">Vissza az űrlaphoz</a>
  </div>
</body>
</html>
HTML;
}

// ---------------------------------------------------------------------
// 1. Method + basic request checks
// ---------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    respond(false, 'Csak POST kéréseket fogadunk el.', 405);
}

// Reject absurdly large submissions outright (plain-text fields only,
// no file uploads on this form).
$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 200000) {
    respond(false, 'A beküldött adat túl nagy.', 413);
}

// ---------------------------------------------------------------------
// 2. Honeypot check — silently "succeed" without sending mail, so bots
//    don't learn their submission was rejected.
// ---------------------------------------------------------------------

$honeypot = post_string('website');
if ($honeypot !== '') {
    respond(true, '');
}

// ---------------------------------------------------------------------
// 3. Field validation + sanitization
// ---------------------------------------------------------------------

$name = truncate(post_string('name'), MAX_LENGTHS['name']);
$phone = truncate(post_string('phone'), MAX_LENGTHS['phone']);
$city = truncate(post_string('city'), MAX_LENGTHS['city']);
$message = truncate(post_string('message'), MAX_LENGTHS['message']);
$consentRaw = $_POST['privacy_consent'] ?? '';
$consentGiven = in_array($consentRaw, ['on', '1', 'true', 'yes'], true);

$errors = [];

if ($name === '') {
    $errors[] = 'Adja meg a nevét.';
}

if ($phone === '') {
    $errors[] = 'Adja meg a telefonszámát.';
} elseif (!is_plausible_phone($phone)) {
    $errors[] = 'Adjon meg egy érvényes telefonszámot.';
}

if (!$consentGiven) {
    $errors[] = 'Az adatkezelési tájékoztató elfogadása kötelező.';
}

if (!empty($errors)) {
    respond(false, implode(' ', $errors), 422);
}

// ---------------------------------------------------------------------
// 4. Compose + send the email
// ---------------------------------------------------------------------

$sourceUrl = post_string('page_url');
if ($sourceUrl === '') {
    $referer = $_SERVER['HTTP_REFERER'] ?? '';
    $sourceUrl = is_string($referer) ? clean_field($referer) : '';
}
$sourceUrl = truncate($sourceUrl, 300);

$submittedAt = (new DateTime('now', new DateTimeZone('Europe/Budapest')))->format('Y-m-d H:i:s');

$bodyLines = [
    'Név: ' . $name,
    'Telefonszám: ' . $phone,
    'Település: ' . ($city !== '' ? $city : '-'),
    'Probléma: ' . ($message !== '' ? $message : '-'),
    'Beküldés időpontja: ' . $submittedAt,
    'Oldal / forrás URL: ' . ($sourceUrl !== '' ? $sourceUrl : '-'),
];
$emailBody = implode("\n", $bodyLines);

$subject = 'Új ajánlatkérés – VeresVill 0–24';

// From/Sender is always the fixed domain placeholder above — never the
// visitor's own input — so this can't be abused for header injection or
// spoofing. No Reply-To: the form doesn't collect a visitor email.
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$encodedFromName = '=?UTF-8?B?' . base64_encode(SENDER_NAME) . '?=';
$headers = [
    'From: ' . $encodedFromName . ' <' . SENDER_EMAIL . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: ' . SITE_NAME . ' send-form.php',
];
$headerString = implode("\r\n", $headers);

// mail() is the simplest FTP/cPanel-compatible option and needs no
// Composer dependency. If mail() proves unreliable on the final host,
// replace the block below with an SMTP/PHPMailer call — see
// DEPLOYMENT.md for how to swap this in without touching the rest of
// the handler (validation/response logic above is unaffected).
$sent = @mail(RECIPIENT_EMAIL, $encodedSubject, $emailBody, $headerString, '-f' . SENDER_EMAIL);

if (!$sent) {
    error_log('send-form.php: mail() failed for submission from ' . client_ip());
    respond(false, 'A levél küldése jelenleg nem sikerült. Kérjük, próbálja meg később, vagy hívjon minket telefonon.', 502);
}

respond(true, '');
