/* Öffentliche Ausgabe: nur die freigegebenen Sprachen (Standard: Deutsch und Englisch).
 *
 * Die Quellen behalten alle drei Sprachen. Dieser Schritt läuft nach dem Build und
 * entfernt die ausgeblendeten Sprachen vollständig aus der Auslieferung:
 *   - aus jeder erzeugten .html-Datei (Textknoten, data-Attribute, Sprachumschalter)
 *   - aus eigenen Kopien von CSS und JS (assets/css/site.css, assets/js/site-*.js),
 *     auf die die öffentlichen Seiten verweisen.
 *
 * Steuerung über die Umgebungsvariable NIC_LANGS:
 *   (nicht gesetzt)   → öffentliche Ausgabe mit PUBLIC_LANGS
 *   NIC_LANGS=all     → Vorschau mit allen Sprachen, dieser Schritt entfällt
 */
const fs = require('fs');
const path = require('path');

/** Für Besucher sichtbare Sprachen. Chinesisch wieder öffnen: 'zh' ergänzen. */
const PUBLIC_LANGS = ['de', 'en'];
const ALL = ['de', 'en', 'zh'];

const ROOT = path.resolve(__dirname, '..');
const CJK = /[　-〿㐀-鿿＀-￯]/;

function mode() {
  const v = (process.env.NIC_LANGS || '').trim();
  if (v === 'all') return null;
  const list = v ? v.split(',').map((s) => s.trim()).filter(Boolean) : PUBLIC_LANGS;
  return list.length === ALL.length ? null : list;
}

/* --------------------------------------------------------------- HTML --- */
/** Entfernt jedes Element mit data-i18n-<lang> samt Inhalt (verschachtelungssicher). */
function dropLangElements(html, l) {
  const open = new RegExp(`<([a-zA-Z][\\w-]*)\\b[^>]*\\sdata-i18n-${l}(?=[\\s>=])[^>]*>`, 'g');
  let out = '', pos = 0, m;
  while ((m = open.exec(html))) {
    const tag = m[1].toLowerCase();
    const start = m.index;
    let i = open.lastIndex, depth = 1;
    const tagRe = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
    tagRe.lastIndex = i;
    let t;
    while (depth && (t = tagRe.exec(html))) {
      if (t[1]) depth--; else if (!/\/>$/.test(t[0])) depth++;
      i = tagRe.lastIndex;
    }
    out += html.slice(pos, start);
    pos = i;
    open.lastIndex = i;
  }
  return out + html.slice(pos);
}

function publicHtml(html, hidden) {
  for (const l of hidden) {
    html = dropLangElements(html, l);
    html = html.replace(new RegExp(`\\sdata-${l}="[^"]*"`, 'g'), '');
    html = html.replace(new RegExp(`\\s*<button type="button" data-lang="${l}"[^>]*>[\\s\\S]*?</button>`, 'g'), '');
  }
  if (hidden.includes('zh')) {
    html = html.replace(/ \/ 语言/g, '');
    // Suchbegriffe und andere Attributwerte: chinesische Wörter entfernen
    html = html.replace(/="([^"]*)"/g, (m, v) => (CJK.test(v) ? '="' + v.replace(/[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]+/g, ' ').replace(/\s{2,}/g, ' ').trim() + '"' : m));
  }
  return html
    .replace(/assets\/css\/style\.css/g, 'assets/css/site.css')
    .replace(/assets\/js\/(catalog|main|inquiry)\.js/g, 'assets/js/site-$1.js');
}

/* ------------------------------------------------------------ Assets --- */
/** JS-Kopie: LANGS kürzen, Zeichenketten in ausgeblendeter Schrift leeren. */
function publicJs(src, keep) {
  src = src.replace(/var LANGS = \[[^\]]*\];/g, `var LANGS = ${JSON.stringify(keep)};`);
  // String-Literale mit CJK-Zeichen → leer (werden ohne 'zh' nie angezeigt)
  // Zuerst eingebettete data-<lang>-Attribute in HTML-Schnipseln entfernen, erst danach leeren
  src = src.replace(/'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"/g, (s) => {
    if (!CJK.test(s)) return s;
    const t = s.replace(/ data-zh=\\?"[^"\\]*\\?"/g, '').replace(/ data-q-zh=\\?"[^"\\]*\\?"/g, '');
    return CJK.test(t) ? "''" : t;
  });
  // Alternativen in regulären Ausdrücken, z. B. /techn|technical|技术/
  src = src.replace(/\|[^|/\s)]*[㐀-鿿][^|/\s)]*/g, '');
  return src;
}

function stripKey(o, hidden) {
  if (Array.isArray(o)) return o.map((x) => stripKey(x, hidden));
  if (o && typeof o === 'object') {
    const r = {};
    for (const k of Object.keys(o)) if (!hidden.includes(k)) r[k] = stripKey(o[k], hidden);
    return r;
  }
  if (typeof o === 'string' && CJK.test(o)) return '';
  return o;
}

function publicCatalog(hidden) {
  const vm = require('vm');
  const src = fs.readFileSync(path.join(ROOT, 'assets/js/catalog.js'), 'utf8');
  const sb = {}; sb.window = sb; vm.createContext(sb); vm.runInContext(src, sb);
  const data = stripKey(JSON.parse(JSON.stringify(sb.NIC)), hidden);
  const fns = ['byId', 'productsIn'].filter((k) => typeof sb.NIC[k] === 'function')
    .map((k) => `NIC.${k} = ${sb.NIC[k].toString()};`).join('\n');
  return `/* NIC Robotics · Katalog (öffentliche Ausgabe, erzeugt aus catalog.js — nicht bearbeiten) */\nwindow.NIC = ${JSON.stringify(data)};\nvar NIC = window.NIC;\n${fns}\n`;
}

function publicCss(css, hidden) {
  // Regeln, die nur für ausgeblendete Sprachen gelten, entfallen
  for (const l of hidden) {
    css = css.replace(new RegExp(`[^{}]*html\\[lang=['"]?${l}['"]?\\][^{}]*\\{[^{}]*\\}`, 'g'), (rule) => {
      const sel = rule.slice(0, rule.indexOf('{'));
      const parts = sel.split(',').filter((p) => !new RegExp(`lang=['"]?${l}`).test(p));
      return parts.length ? parts.join(',') + rule.slice(rule.indexOf('{')) : '';
    });
  }
  return css.replace(/content:\s*'[^']*[㐀-鿿][^']*'/g, "content: ''");
}

/* -------------------------------------------------------------- Lauf --- */
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === 'build') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function run() {
  const keep = mode();
  const siteFiles = ['assets/css/site.css', 'assets/js/site-catalog.js', 'assets/js/site-main.js', 'assets/js/site-inquiry.js'];
  if (!keep) {
    siteFiles.forEach((f) => { try { fs.unlinkSync(path.join(ROOT, f)); } catch (e) {} });
    console.log('Vorschau: alle Sprachen (DE · EN · ZH).');
    return;
  }
  const hidden = ALL.filter((l) => !keep.includes(l));
  const rd = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
  const wr = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);
  wr('assets/css/site.css', publicCss(rd('assets/css/style.css'), hidden));
  wr('assets/js/site-main.js', publicJs(rd('assets/js/main.js'), keep));
  wr('assets/js/site-inquiry.js', publicJs(rd('assets/js/inquiry.js'), keep));
  wr('assets/js/site-catalog.js', publicCatalog(hidden));

  const pages = walk(ROOT);
  let leaks = [];
  for (const p of pages) {
    const out = publicHtml(fs.readFileSync(p, 'utf8'), hidden);
    fs.writeFileSync(p, out);
    if (hidden.includes('zh') && CJK.test(out)) leaks.push(path.relative(ROOT, p));
  }
  if (hidden.includes('zh')) {
    siteFiles.forEach((f) => { if (CJK.test(rd(f))) leaks.push(f); });
  }
  if (leaks.length) {
    console.error('✗ Ausgeblendete Sprache noch enthalten in: ' + leaks.join(', '));
    process.exitCode = 1;
  }
  console.log(`Öffentlich: ${keep.map((l) => l.toUpperCase()).join(' · ')} (ausgeblendet: ${hidden.join(', ')}) — ${pages.length} Seiten.`);
}

module.exports = { run, PUBLIC_LANGS };
if (require.main === module) run();
