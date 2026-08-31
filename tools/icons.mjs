// Inline SVG icon set — line-style, 24x24, stroke=currentColor. No external icon library.
function svg(inner, extra) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra ? " " + extra : ""}>${inner}</svg>`;
}

export const icons = {
  bolt: svg('<path d="M12.5 2 4 14h6l-1 8 8.5-12h-6z" stroke-linejoin="round"/>'),
  phone: svg('<path d="M4 5c0-.6.4-1 1-1h3.2c.5 0 .9.3 1 .8l1 4a1 1 0 0 1-.3 1L7.6 11a13 13 0 0 0 5.4 5.4l1.2-1.3a1 1 0 0 1 1-.3l4 1c.5.1.8.5.8 1V20c0 .6-.4 1-1 1h-1C10 21 3 14 3 6V5z"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m4 6.5 8 6 8-6"/>'),
  pin: svg('<path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z"/><circle cx="12" cy="10" r="2.4"/>'),
  clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>'),
  shieldCheck: svg('<path d="M12 3l7 3v6c0 4.6-3 7.8-7 9-4-1.2-7-4.4-7-9V6z"/><path d="m9 12 2 2 4-4"/>'),
  home: svg('<path d="M4 11 12 4l8 7"/><path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9"/>'),
  building: svg('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>'),
  warningTriangle: svg('<path d="M12 4 2.5 20h19L12 4z" stroke-linejoin="round"/><path d="M12 10v4"/><path d="M12 17.2v.1"/>'),
  plug: svg('<path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0V8z"/><path d="M12 16v5"/>'),
  document: svg('<path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/>'),
  chevronDown: svg('<path d="m6 9 6 6 6-6"/>'),
  menu: svg('<path d="M3 6h18M3 12h18M3 18h18"/>', 'class="icon-open"'),
  close: svg('<path d="m5 5 14 14M19 5 5 19"/>', 'class="icon-close"'),
  check: svg('<path d="m5 12 5 5 9-10"/>'),
  checkCircle: svg('<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.5 2.5L16 9.5"/>'),
  star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.9L12 17.8 5.9 21.2l1.5-6.9-5.2-4.7 6.9-.7z"/></svg>',
  arrowRight: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  users: svg('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c.8-3.3 3-5 5.5-5s4.7 1.7 5.5 5"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 15.2c2.3.3 4 1.8 4.6 4.3"/>'),
  calendar: svg('<rect x="3.5" y="5" width="17" height="16" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>'),
  facebook: svg('<path d="M14 9h2.5V6H14c-1.9 0-3.2 1.4-3.2 3.4V11H9v3h1.8v7h3v-7h2.3l.4-3h-2.7V9.6c0-.4.2-.6.7-.6z" stroke="none" fill="currentColor"/>'),
  instagram: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none"/>'),
  google: svg('<path d="M20.5 12.2c0-.7-.06-1.4-.18-2H12v3.8h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.6-3.9 2.6-6.7z" stroke="none" fill="currentColor"/><path d="M12 21c2.4 0 4.5-.8 6-2.1l-2.9-2.2c-.8.5-1.9.9-3.1.9-2.4 0-4.4-1.6-5.1-3.7H3.9v2.3A9 9 0 0 0 12 21z" stroke="none" fill="currentColor"/><path d="M6.9 13.9a5.4 5.4 0 0 1 0-3.8V7.8H3.9a9 9 0 0 0 0 8.4z" stroke="none" fill="currentColor"/><path d="M12 6.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6C16.5 3.7 14.4 3 12 3a9 9 0 0 0-8.1 4.8l3 2.3C7.6 8.2 9.6 6.6 12 6.6z" stroke="none" fill="currentColor"/>'),
  send: svg('<path d="m4 4 16 8-16 8 3-8z"/>'),
  bulb: svg('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V16h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3z"/>'),
  car: svg('<path d="M4 16v-3.5L6 7h12l2 5.5V16"/><path d="M4 16h16v2a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-9v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><circle cx="8" cy="16" r="1.4"/><circle cx="16" cy="16" r="1.4"/><path d="M12 7v3h4"/>'),
};

export function icon(name, cls) {
  var markup = icons[name] || "";
  if (cls) markup = markup.replace("<svg ", `<svg class="${cls}" `);
  return markup;
}
