/* Shared HTML partials for the NIC Robotics static build. */

const SITE = {
  name: 'NIC Robotics',
  legal: 'An Yuan GmbH',
  street: 'Ober der Röth 4',
  zipCity: '65824 Schwalbach am Taunus',
  country: 'Deutschland',
  phone: '0177 6812580',
  phoneIntl: '+4917768125 80',
  phoneHref: '+491776812580',
  email: 'info@nic-robotics.de',
  emailSales: 'sales@nic-robotics.de',
  emailService: 'service@nic-robotics.de',
  emailFallback: 'info@ayjy.de',
  director: 'Doris Du',
  court: 'Amtsgericht Gütersloh',
  hrb: 'HRB 117893',
  vat: 'DE 327608203',
  parent: 'https://www.ayjy.de',
  domain: 'https://www.nic-robotics.de',

  // WhatsApp-Nummer international OHNE "+" und Leerzeichen (Platzhalter: Telefonnummer von An Yuan).
  whatsapp: '491776812580',
  // Crisp Live-Chat: Website-ID aus Crisp → Settings → Website settings → Setup.
  // Leer lassen ("") → das Chatfenster schickt Nachrichten per WhatsApp.
  crispWebsiteId: '5d7708ec-1961-4e2c-b304-30ce137eece1'
};

/* ------------------------------------------------- Service & Support ---- */

/* v35 · Linien-Icons für die Menüs Anwendungen und Service (24er Raster, Strich 1.7) */
const MI = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const MENU_ICON = {
  energie:   MI('<path d="M12 2.5 6.5 21.5M12 2.5l5.5 19M4 7.5h16M6 12h12M9.6 7.5 12 10l2.4-2.5M8.6 12l3.4 4 3.4-4"/><path d="M3.5 21.5h17"/>'),
  industrie: MI('<path d="M3 21V10.5l5 3v-3l5 3v-3l5 3V3.5h3V21z"/><path d="M3 21h18M7 17.5h2M11.5 17.5h2M16 17.5h2"/>'),
  feuerwehr: MI('<path d="M12 21.5c-3.9 0-6.5-2.6-6.5-6.2 0-3.3 2.2-5.3 3.6-7.4.9 1.6 1.9 2.4 2.9 2.7-.4-2.9.6-5.6 2.9-8.1.3 3.2 1.9 5.2 3.4 7.2 1.1 1.5 1.7 3.4 1.7 5.6 0 3.6-2.6 6.2-6 6.2z"/><path d="M12 21.5c-1.7 0-2.9-1.2-2.9-2.9 0-1.9 1.6-2.9 2.6-4.6 1.4 1.5 3.2 2.5 3.2 4.6 0 1.7-1.2 2.9-2.9 2.9z"/>'),
  sicherheit:MI('<path d="M12 2.5 4.5 5.5v6c0 4.6 3.1 8.4 7.5 10 4.4-1.6 7.5-5.4 7.5-10v-6z"/><path d="m8.6 12 2.4 2.4 4.4-4.6"/>'),
  museum:    MI('<path d="M3 9 12 3.5 21 9z"/><path d="M5 9v9M9.7 9v9M14.3 9v9M19 9v9M3 18h18M2.5 21.5h19"/>'),
  forschung: MI('<path d="M12 4 2.5 9 12 14l9.5-5z"/><path d="M6.5 11.2v4.6c1.5 1.5 3.4 2.2 5.5 2.2s4-.7 5.5-2.2v-4.6M21.5 9v6"/>'),
  logistik:  MI('<path d="M12 2.5 3.5 7v10L12 21.5l8.5-4.5V7z"/><path d="M3.5 7 12 11.5 20.5 7M12 11.5v10M7.8 4.8l8.4 4.5"/>'),
  pflege:    MI('<path d="M3 11 12 3.5l9 7.5"/><path d="M5.5 9v11.5h13V9"/><path d="M12 18.2s-3.4-2-3.4-4.3c0-1.2.9-2 2-2 .6 0 1.1.3 1.4.8.3-.5.8-.8 1.4-.8 1.1 0 2 .8 2 2 0 2.3-3.4 4.3-3.4 4.3z"/>'),
  garantie:  MI('<circle cx="12" cy="9" r="6"/><path d="m9.4 9 1.8 1.8 3.4-3.4M8.3 13.8 7 21.5l5-2.6 5 2.6-1.3-7.7"/>'),
  servicezentrum: MI('<path d="M14.7 6.3a4 4 0 0 0-5.2 5.2l-6 6a1.8 1.8 0 0 0 2.5 2.5l6-6a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.4-.5-.5-2.4z"/>'),
  ersatzteile: MI('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/><circle cx="12" cy="12" r="6.5"/>'),
  vorfuehrung: MI('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="m10.3 7.6 4.2 2.4-4.2 2.4zM8 21l4-5 4 5"/>'),
  schulung:  MI('<path d="M4 13.5v-1.5a8 8 0 0 1 16 0v1.5"/><rect x="2.8" y="13" width="4" height="6" rx="1.5"/><rect x="17.2" y="13" width="4" height="6" rx="1.5"/><path d="M19.2 19c0 1.6-1.6 2.5-4.2 2.5h-1.5"/>'),
  rma:       MI('<path d="M3.5 8.5 12 4l8.5 4.5v7L12 20l-8.5-4.5z"/><path d="M3.5 8.5 12 13l8.5-4.5M12 13v7"/><path d="M8.5 2.8 6 5.3l2.5 2.5"/>')
};
const SVC_KEY = (href) => href.includes('garantie') ? 'garantie' : href.includes('servicezentrum') ? 'servicezentrum'
  : href.includes('ersatzteile') ? 'ersatzteile' : href.includes('vorfuehrung') ? 'vorfuehrung'
  : href.includes('schulung') ? 'schulung' : 'rma';

const SERVICE_ITEMS = [
  ['service/index.html#garantie', 'Garantie & Gewährleistung', 'Warranty', '保修服务',
   'Deutsche Gewährleistung, Garantieabwicklung', 'German warranty, claims handling', '德国本地质保与理赔'],
  ['service/index.html#servicezentrum', 'Servicezentrum Deutschland', 'Service centre Germany', '德国维修中心',
   'Diagnose, Reparatur, Wartung', 'Diagnosis, repair, maintenance', '检测、维修、保养'],
  ['produkte/ersatzteile.html', 'Ersatzteile', 'Spare parts', '备件更换',
   'Verschleißteile zum Selbsttausch', 'Wear parts you swap yourself', '易损件，客户可自行更换'],
  ['service/index.html#schulung', 'Schulung & Fernsupport', 'Training & remote support', '培训与远程支持',
   'Einweisung, Hotline, Updates', 'Instruction, hotline, updates', '操作培训、热线、软件更新'],
  ['service/ruecksendung.html', 'Rücksendung & Reparatur (RMA)', 'Returns & repair (RMA)', '退货与返修（RMA）',
   'Online-Formular mit Foto-Upload', 'Online form with photo upload', '在线表单，可上传照片']
];

/* -------------------------------------------------------------- helpers */
const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Languages the site ships. Add one here and in style.css + main.js. */
const LANGS = ['de', 'en', 'zh'];

/**
 * Multilingual text node: renders every language, CSS reveals the active one.
 * Falls back to German for a language a given entry has not been given yet.
 */
const t = (obj, tag = 'span') => {
  if (obj == null) return '';
  if (typeof obj === 'string') return esc(obj);
  if (typeof obj === 'boolean') return obj ? 'ja' : '—';
  return LANGS
    .map((l) => `<${tag} data-i18n-${l}>${esc(obj[l] || obj.de)}</${tag}>`)
    .join('');
};

/** Bilingual plain attribute value — picks German (attributes can't branch). */
const attr = (obj) => (typeof obj === 'string' ? esc(obj) : esc(obj ? obj.de : ''));

/**
 * UI string swapped by JS. German is the key; English is given inline and
 * Chinese comes from build/i18n-zh.js so the templates stay readable.
 * A missing Chinese entry is reported by the build rather than silently
 * falling back, so the three languages cannot drift apart.
 */
const ZH = require('./i18n-zh');

/* Filled once by the build so the header menu stays in step with the catalogue. */
let USECASES = [];
const setUseCases = (list) => { USECASES = list; };
const MISSING_ZH = new Set();

const sw = (de, en, tag = 'span', cls = '') => {
  const zh = ZH[de];
  if (zh === undefined) MISSING_ZH.add(de);
  const attrs = [
    `data-de="${esc(de)}"`,
    `data-en="${esc(en)}"`,
    `data-zh="${esc(zh === undefined ? de : zh)}"`
  ].join(' ');
  return `<${tag}${cls ? ` class="${cls}"` : ''} ${attrs}>${esc(de)}</${tag}>`;
};

/**
 * Like sw(), but with Chinese supplied inline. For strings composed at build
 * time (counts, numbered kickers) that no fixed dictionary key can cover.
 */
const swx = (de, en, zh, tag = 'span', cls = '') =>
  `<${tag}${cls ? ` class="${cls}"` : ''} data-de="${esc(de)}" data-en="${esc(en)}" data-zh="${esc(zh)}">${esc(de)}</${tag}>`;

/**
 * Placeholder text in three languages. An attribute cannot hold the language
 * spans, so the element carries the strings and main.js swaps the attribute.
 */
const ph = (de, en, zh) =>
  `placeholder="${esc(de)}" data-attr="placeholder" data-de="${esc(de)}" data-en="${esc(en)}" data-zh="${esc(zh)}"`;

/** Called by the build at the end to report untranslated UI strings. */
const reportMissingZh = () => {
  if (!MISSING_ZH.size) return 0;
  console.warn(`\n  ⚠ ${MISSING_ZH.size} UI-Strings ohne chinesische Übersetzung:`);
  require('fs').writeFileSync(require('path').join(__dirname, 'missing-zh.json'), JSON.stringify([...MISSING_ZH], null, 1));
  console.warn('     (vollständige Liste: build/missing-zh.json)');
  return MISSING_ZH.size;
};

const money = (n) =>
  new Intl.NumberFormat('de-DE', { minimumFractionDigits: 0 }).format(n);

/* ------------------------------------------------------------- SVG icons */
const ICON = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  caret: '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.6 13.5 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.9z"/><circle cx="7.5" cy="7.5" r="1.4" fill="currentColor"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 4 5v6c0 5.2 3.4 9.9 8 11 4.6-1.1 8-5.8 8-11V5z"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 3h13v13H1zM14 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="17.5" cy="18.5" r="2"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0 5 5.2l-9 9a2.8 2.8 0 0 1-4-4l9-9a4 4 0 0 0-1 1.1z"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v13"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 1.9"/></svg>',
  cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
};

/* ============================================================== HEAD ==== */
function head({ title, description, path = '/', image = '/assets/img/scenes/x30-climb.jpg', depth = 0 }) {
  const r = depth === 0 ? '' : '../'.repeat(depth);
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — NIC Robotics</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#07090d">
<link rel="canonical" href="${SITE.domain}${path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="NIC Robotics">
<meta property="og:title" content="${esc(title)} — NIC Robotics">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE.domain}${path}">
<meta property="og:image" content="${SITE.domain}${image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${r}assets/img/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="${r}assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400..800;1,600..800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/css/style.css">
</head>
<body>
<a class="skip" href="#main">Zum Inhalt springen</a>`;
}

/* ============================================================ HEADER ==== */
function header(categories, products, depth = 0) {
  const r = depth === 0 ? '' : '../'.repeat(depth);

  const prodItems = categories.map((c) => {
    const n = products.filter((p) => p.category === c.id).length;
    const soon = c.status !== 'live';
    const href = c.page ? r + c.page : `${r}produkte/index.html?kategorie=${c.id}`;
    const thumb = c.image
      ? `<img src="${r}assets/img/products/${c.image}.webp" alt="" loading="lazy" width="42" height="42">`
      : `<span style="color:var(--fg-dim)">${ICON.plus}</span>`;
    const count = soon
      ? sw('In Vorbereitung', 'In preparation')
      : swx(n + (n === 1 ? ' Modell' : ' Modelle'),
            n + (n === 1 ? ' model' : ' models'),
            n + ' 款机型');
    return `<li><a class="mega-item" href="${href}"${soon ? ' data-soon' : ''}>
  <span class="thumb">${thumb}</span>
  <span>
    <strong>${t(c.name)}</strong>
    <span>${count}</span>
  </span>
</a></li>`;
  }).join('\n');

  /* v34 · Produkt-Megamenü: eine Spalte je Kategorie, darunter alle Modelle mit großem Bild */
  const MENU_THUMB = { c4: 'c4-white', q1: 'q1-main' };
  const prodMenu = categories.filter((c) => c.status === 'live').map((c) => {
    const list = products.filter((p) => p.category === c.id).sort((a, b) => (a.order || 99) - (b.order || 99));
    if (!list.length) return '';
    const href = c.page ? r + c.page : `${r}produkte/index.html?kategorie=${c.id}`;
    return `<div class="pm-col${list.length > 3 ? ' pm-col--wide' : ''}">
  <a class="pm-cat" href="${href}">${t(c.name)}</a>
  <ul>${list.map((p) => {
      const img = MENU_THUMB[p.id] || (p.gallery && p.gallery[0]);
      const photo = p.photo && !MENU_THUMB[p.id];
      return `<li><a class="pm-item" href="${r}produkte/${p.slug}.html">
    <span class="pm-thumb${photo ? ' pm-thumb--photo' : ''}"><img src="${r}assets/img/products/${img}.webp" alt="" loading="lazy" width="96" height="96"></span>
    <span class="pm-txt"><strong>${p.title ? t(p.title) : esc(p.name)}</strong><small>${t(p.family)}</small></span>
  </a></li>`;
    }).join('')}</ul>
</div>`;
  }).join('\n');

  const useItems = USECASES.map((u) =>
    `<li><a class="mi-item" href="${r}einsatzbereiche/index.html#${u.slug}">
  <span class="mi-ic">${MENU_ICON[u.id] || ''}</span>
  <span class="mi-txt"><strong>${t(u.name)}</strong><span>${t(u.tagline)}</span></span>
</a></li>`
  ).join('\n');

  return `
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="${r}index.html" aria-label="NIC Robotics — Startseite">
      <img src="${r}assets/img/logo-dark-900.webp" alt="NIC Robotics" width="900" height="153" fetchpriority="high">
    </a>
    <span class="hdr-badge"><i aria-hidden="true"></i>${sw('Service in Deutschland', 'Service in Germany')}</span>

    <nav aria-label="Hauptnavigation">
      <ul class="nav">
        <li><a class="nav-link" href="${r}index.html" data-nav-home>${swx('Startseite', 'Home', '首页')}</a></li>
        <li>
          <button class="nav-link" aria-expanded="false" aria-haspopup="true">
            ${swx('Produkte', 'Products', '产品中心')} ${ICON.caret}
          </button>
          <div class="mega mega--prod">
            <div class="pm-grid">${prodMenu}</div>
            <div class="pm-foot">
              <a class="pm-all" href="${r}produkte/index.html">${swx('Alle Produkte ansehen', 'View all products', '查看全部产品')} ${ICON.arrow}</a>
            </div>
          </div>
        </li>
        <li>
          <button class="nav-link" aria-expanded="false" aria-haspopup="true">
            ${swx('Anwendungen', 'Applications', '应用场景')} ${ICON.caret}
          </button>
          <div class="mega mega--wide">
            <ul class="mi-grid mi-grid--4">${useItems}</ul>
            <div class="pm-foot">
              <a class="pm-all" href="${r}einsatzbereiche/index.html">${sw('Alle Einsatzbereiche', 'All applications')} ${ICON.arrow}</a>
            </div>
          </div>
        </li>
        <li><a class="nav-link" href="${r}referenzen/index.html">${swx('Referenzen', 'References', '客户案例')}</a></li>
        <li>
          <button class="nav-link" aria-expanded="false" aria-haspopup="true">
            ${swx('Service', 'Service', '技术服务')} ${ICON.caret}
          </button>
          <div class="mega mega--wide">
            <ul class="mi-grid mi-grid--3">
              ${SERVICE_ITEMS.map(([href, tDe, tEn, tZh, sDe, sEn, sZh]) => `
              <li><a class="mi-item" href="${r}${href}">
                <span class="mi-ic">${MENU_ICON[SVC_KEY(href)]}</span>
                <span class="mi-txt"><strong>${swx(tDe, tEn, tZh)}</strong><span>${swx(sDe, sEn, sZh)}</span></span>
              </a></li>`).join('')}
            </ul>
            <div class="pm-foot">
              <a class="pm-all" href="${r}service/index.html">${swx('Alle Serviceleistungen', 'All services', '全部技术服务')} ${ICON.arrow}</a>
            </div>
          </div>
        </li>
        <li><a class="nav-link" href="${r}unternehmen/ueber-uns.html">${swx('Über uns', 'About us', '关于我们')}</a></li>
        <li><a class="nav-link" href="${r}service/kontakt.html">${swx('Kontakt', 'Contact', '联系我们')}</a></li>
      </ul>
    </nav>

    <div class="header-actions">
      <div class="lang-pick">
        <button class="lang-globe" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Sprache / Language / 语言">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
        </button>
        <div class="lang" role="group" aria-label="Sprache / Language / 语言">
          <button type="button" data-lang="de" aria-pressed="true" lang="de">Deutsch</button>
          <button type="button" data-lang="en" aria-pressed="false" lang="en">English</button>
          <button type="button" data-lang="zh" aria-pressed="false" lang="zh">中文</button>
        </div>
      </div>
      <a class="btn btn--sm" href="${r}service/angebot.html">${swx('Angebot anfordern', 'Request a quote', '索取报价')}</a>
      <button class="burger" type="button" aria-label="Menü" aria-expanded="false" aria-controls="nav"><span></span></button>
    </div>
  </div>
</header>`;
}

/* ============================================================ FOOTER ==== */
function footer(categories, depth = 0) {
  const r = depth === 0 ? '' : '../'.repeat(depth);
  const catLinks = categories
    .filter((c) => c.id !== 'ersatzteile')          // listed separately below
    .map((c) => `<li><a href="${c.page ? r + c.page : `${r}produkte/index.html?kategorie=${c.id}`}">${t(c.name)}</a></li>`)
    .join('\n');

  return `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-main">
      <div class="footer-brand">
        <img src="${r}assets/img/logo-light-900.webp" alt="NIC Robotics" width="900" height="153" loading="lazy">
        <p>${sw(
          'Vierbeiner, Rad-Bein-Roboter und Servicerobotik für Industrie, Energieversorgung, Rettungsdienst und Forschung. Vertrieb, Integration und Service in Europa.',
          'Quadrupeds, wheel-legged robots and service robotics for industry, utilities, emergency services and research. Sales, integration and service across Europe.'
        )}</p>
        <p class="t-small t-dim" style="margin-top:1rem">
          ${sw('Eine Marke der', 'A brand of')} <a class="link" href="${SITE.parent}" rel="noopener">An Yuan GmbH</a>
        </p>
      </div>

      <div class="footer-col">
        <h4>${sw('Produkte', 'Products')}</h4>
        <ul>
          ${catLinks}
          <li><a href="${r}produkte/ersatzteile.html">${sw('Ersatzteile & Zubehör', 'Spare parts')}</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>${swx('Service & Support', 'Service & Support', '技术服务')}</h4>
        <ul>
          <li><a href="${r}service/index.html">${swx('Garantie & Servicezentrum', 'Warranty & service centre', '保修与维修中心')}</a></li>
          <li><a href="${r}service/angebot.html">${sw('Persönliches Angebot', 'Personal quote')}</a></li>
          <li><a href="${r}service/ruecksendung.html">${sw('Rücksendung & Reparatur', 'Returns & repair')}</a></li>
          <li><a href="${r}service/kontakt.html">${sw('Kontakt & Beratung', 'Contact & advice')}</a></li>
          <li><a href="${r}einsatzbereiche/index.html">${swx('Anwendungen', 'Applications', '应用场景')}</a></li>
          <li><a href="${r}referenzen/index.html">${swx('Referenzen', 'References', '客户案例')}</a></li>
          <li><a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>${sw('Unternehmen', 'Company')}</h4>
        <ul>
          <li><a href="${r}unternehmen/ueber-uns.html">${sw('Über uns', 'About us')}</a></li>
          <li><a href="${r}unternehmen/impressum.html">Impressum</a></li>
          <li><a href="${r}unternehmen/datenschutz.html">${sw('Datenschutz', 'Privacy')}</a></li>
          <li><a href="${r}unternehmen/agb.html">${sw('AGB', 'Terms')}</a></li>
          <li><a href="${r}unternehmen/widerruf.html">${sw('Widerrufsrecht', 'Right of withdrawal')}</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>${sw('Kontakt', 'Contact')}</h4>
        <div class="footer-contact">
          <address>
            ${SITE.legal}<br>
            ${SITE.street}<br>
            ${SITE.zipCity}<br>
            ${SITE.country}
          </address>
          <a href="tel:${SITE.phoneHref}">${ICON.phone} ${SITE.phone}</a>
          <a href="mailto:${SITE.email}">${SITE.email}</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© <span data-year>2026</span> ${SITE.legal}. ${sw('Alle Rechte vorbehalten.', 'All rights reserved.')}</span>
      <span class="t-mono">${sw('Alle Preise netto zzgl. USt. und Versand.', 'All prices net, plus VAT and shipping.')}</span>
      <nav aria-label="Rechtliches">
        <a href="${r}unternehmen/impressum.html">Impressum</a>
        <a href="${r}unternehmen/datenschutz.html">${sw('Datenschutz', 'Privacy')}</a>
        <a href="${r}unternehmen/agb.html">${sw('AGB', 'Terms')}</a>
      </nav>
    </div>
  </div>
</footer>`;
}

/* ============================================================ SCRIPTS === */
function scripts(depth = 0, extra = '') {
  const r = depth === 0 ? '' : '../'.repeat(depth);
  return `
<script src="${r}assets/js/catalog.js"></script>
<script src="${r}assets/js/main.js"></script>
<script>window.NIC_CONTACT = ${JSON.stringify({ whatsapp: SITE.whatsapp, crisp: SITE.crispWebsiteId, email: SITE.emailSales, root: r })};</script>
<script src="${r}assets/js/inquiry.js"></script>
${extra}
</body>
</html>`;
}

/* ===================================================== OFFER MODAL ====== */
function offerModal(depth = 0) {
  const r = depth === 0 ? '' : '../'.repeat(depth);
  return `
<div class="modal" id="offer-modal" role="dialog" aria-modal="true" aria-labelledby="offer-modal-title">
  <div class="modal__panel">
    <div class="modal__head">
      <div>
        <h2 id="offer-modal-title">${sw('Persönliches Angebot', 'Personal quote', 'span')}</h2>
        <p>${sw(
          'Sagen Sie uns, was Sie vorhaben — wir rechnen Konfiguration, Stückzahl und Lieferzeit und melden uns innerhalb eines Werktages.',
          'Tell us what you have in mind — we will price the configuration, quantity and lead time and reply within one working day.'
        )}</p>
      </div>
      <button class="modal__close" type="button" data-modal-close aria-label="${esc('Schließen')}">${ICON.close}</button>
    </div>
    <div class="modal__body">
      <form data-validate data-mailto="${SITE.emailSales}" novalidate>
        <div class="form-status" role="status" aria-live="polite"></div>
        <div class="field-grid field-grid--2">
          <div class="field span-2">
            <label for="om-product">${sw('Produkt', 'Product')}</label>
            <input class="input" type="text" id="om-product" name="produkt" data-fill="product" readonly>
          </div>
          <div class="field">
            <label for="om-name">${sw('Name', 'Name')} <span class="req">*</span></label>
            <input class="input" type="text" id="om-name" name="name" required autocomplete="name">
            <span class="err-msg">${sw('Bitte Namen angeben.', 'Please enter your name.')}</span>
          </div>
          <div class="field">
            <label for="om-company">${sw('Firma / Einrichtung', 'Company / institution')} <span class="req">*</span></label>
            <input class="input" type="text" id="om-company" name="firma" required autocomplete="organization">
            <span class="err-msg">${sw('Bitte Firma angeben.', 'Please enter your organisation.')}</span>
          </div>
          <div class="field">
            <label for="om-email">E-Mail <span class="req">*</span></label>
            <input class="input" type="email" id="om-email" name="email" required autocomplete="email">
            <span class="err-msg">${sw('Bitte gültige E-Mail angeben.', 'Please enter a valid e-mail.')}</span>
          </div>
          <div class="field">
            <label for="om-phone">${sw('Telefon', 'Phone')} <span class="opt">${sw('optional', 'optional')}</span></label>
            <input class="input" type="tel" id="om-phone" name="telefon" autocomplete="tel">
          </div>
          <div class="field">
            <label for="om-qty">${sw('Stückzahl', 'Quantity')}</label>
            <input class="input" type="number" id="om-qty" name="stueckzahl" min="1" value="1">
          </div>
          <div class="field">
            <label for="om-target">${sw('Wunschpreis je Stück', 'Target price per unit')} <span class="opt">${sw('optional', 'optional')}</span></label>
            <div class="input-group">
              <input class="input" type="number" id="om-target" name="wunschpreis" min="0" step="100" placeholder="—">
              <span class="unit">EUR</span>
            </div>
            <span class="hint">${sw('Sagen Sie offen, welches Budget Sie haben. Wir sagen Ihnen ebenso offen, was dafür geht.', 'Tell us your budget plainly. We will tell you just as plainly what fits it.')}</span>
          </div>
          <div class="field span-2">
            <label for="om-when">${sw('Geplanter Beschaffungszeitraum', 'Planned procurement window')}</label>
            <select class="select" id="om-when" name="zeitraum">
              <option value="sofort">${sw('Sofort — Budget freigegeben', 'Now — budget approved')}</option>
              <option value="quartal">${sw('Innerhalb dieses Quartals', 'Within this quarter')}</option>
              <option value="jahr" selected>${sw('Innerhalb dieses Jahres', 'Within this year')}</option>
              <option value="projekt">${sw('Noch in der Projektierung', 'Still at planning stage')}</option>
              <option value="info">${sw('Nur Information, keine Beschaffung', 'Information only, no procurement')}</option>
            </select>
          </div>
          <div class="field span-2">
            <label for="om-msg">${sw('Ihr Einsatzfall und Ihre Fragen', 'Your application and questions')}</label>
            <textarea class="textarea" id="om-msg" name="nachricht" ${ph(
              'Wo soll der Roboter arbeiten? Welche Nutzlast, welche Umgebung, welche Schnittstellen? Was muss er können, damit er für Sie infrage kommt?',
              'Where will the robot work? What payload, what environment, what interfaces? What does it have to do to be worth considering?',
              '机器人将在哪里工作？需要多大负载、什么样的环境、哪些接口？它需要具备什么能力才值得您考虑？'
            )}></textarea>
          </div>
          <div class="field span-2">
            <label class="consent">
              <input type="checkbox" name="datenschutz" required>
              <span>${sw('Ich willige ein, dass meine Angaben zur Bearbeitung der Anfrage gespeichert und verwendet werden.', 'I consent to my details being stored and used to process this enquiry.')}
                <a href="${r}unternehmen/datenschutz.html">${sw('Datenschutzerklärung', 'Privacy notice')}</a> <span class="req">*</span></span>
            </label>
            <span class="err-msg">${sw('Bitte bestätigen Sie die Datenschutzerklärung.', 'Please confirm the privacy notice.')}</span>
          </div>
        </div>
        <div class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="cluster mt">
          <button class="btn btn--lg btn--arrow" type="submit">${sw('Angebot anfordern', 'Request quote')} ${ICON.arrow}</button>
          <span class="t-small t-dim">${sw('Antwort innerhalb eines Werktages.', 'Reply within one working day.')}</span>
        </div>
      </form>
    </div>
  </div>
</div>`;
}

/* ===================================================== QUICK VIEW ======= */
/* An empty shell on every page; main.js fills it from the catalogue so one
   click on a card always answers, even where page navigation is blocked. */
function quickView() {
  return `
<div class="modal modal--wide" id="quickview" role="dialog" aria-modal="true" aria-labelledby="qv-title">
  <div class="modal__panel">
    <div class="modal__head">
      <div>
        <p class="qv-brand t-mono"></p>
        <h2 id="qv-title"></h2>
        <p class="qv-tag"></p>
      </div>
      <button class="modal__close" type="button" data-modal-close aria-label="Schließen">${ICON.close}</button>
    </div>
    <div class="modal__body qv-body"></div>
  </div>
</div>`;
}

module.exports = { SERVICE_ITEMS, SITE, LANGS, esc, t, attr, sw, swx, ph, setUseCases, money, ICON, head, header, footer, scripts, offerModal, quickView, reportMissingZh };
