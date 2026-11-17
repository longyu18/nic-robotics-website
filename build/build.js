/* ==========================================================================
   NIC ROBOTICS — static site generator
   node build/build.js   (run from the site root)
   ========================================================================== */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const P = require('./partials');
const { SITE, esc, t, attr, sw, swx, money, ICON, head, header, footer, scripts,
        offerModal, quickView, reportMissingZh } = P;

/* --- load catalog.js in a sandbox so there is a single source of truth --- */
const sandbox = { navigator: {}, document: {} };
sandbox.window = sandbox;              // so `window.NIC = …` creates a global NIC
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(__dirname, '../assets/js/catalog.js'), 'utf8'), sandbox);
const NIC = sandbox.NIC;
const CATS = NIC.categories.slice().sort((a, b) => a.order - b.order);
const PRODUCTS = NIC.products.slice();
const USECASES = NIC.useCases.slice().sort((a, b) => a.order - b.order);
P.setUseCases(USECASES);   // header menu reads these

const ROOT = path.join(__dirname, '..');
const write = (rel, html) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html.replace(/\n{3,}/g, '\n\n'));
  console.log('  ✓', rel, (html.length / 1024).toFixed(1) + ' kB');
};

// Ein Querformat-Bild sieht im schmalen Handy-Panel nur noch wie ein Ausschnitt
// aus der Bildmitte aus. Liegt neben "<scene>.jpg" ein "<scene>-m.jpg", wird
// dieser Hochformat-Zuschnitt unter 700px ausgespielt.
function sceneSources(scene, prefix) {
  const hasM = fs.existsSync(path.join(ROOT, 'assets/img/scenes', scene + '-m.jpg'));
  const m = hasM ? `
          <source media="(max-width: 700px)" srcset="${prefix}assets/img/scenes/${scene}-m.webp" type="image/webp">
          <source media="(max-width: 700px)" srcset="${prefix}assets/img/scenes/${scene}-m.jpg" type="image/jpeg">` : '';
  return `${m}
          <source srcset="${prefix}assets/img/scenes/${scene}.webp" type="image/webp">`;
}

// Drei große Werte ersetzen den Absatz: man soll den Einsatz in einer Sekunde
// erfassen, nicht lesen müssen.
function factRow(u) {
  if (!u.facts || !u.facts.length) return '';
  return `<dl class="facts">${u.facts.map((f) =>
    `<div><dt>${swx(f.de, f.en, f.zh)}</dt><dd>${esc(f.v)}</dd></div>`).join('')}</dl>`;
}

const prodOf = (id) => PRODUCTS.find((p) => p.id === id);
/* Model codes (X30, Lite3) are the same everywhere; the descriptive mission
   names carry a `title` object and are shown in the reader's language. */
const pTitle = (p) => (p.title ? t(p.title) : esc(p.name));
const inCat = (cid) => PRODUCTS.filter((p) => p.category === cid).sort((a, b) => (a.order || 99) - (b.order || 99));

/* --------------------------------------------------- key spec extraction */
const KEY_SPECS = {
  x30:            ['IP67', '−20…55 °C', '20 kg Nutzlast', '4 h'],
  x50:            ['50 kg Nutzlast', 'IP67', '3 m/s Dauerlauf', '25 cm Stufen'],
  'lynx-m20s':    ['IP67', '9 m/s', '35 kg Nutzlast', '−30…55 °C'],
  'lynx-m20-pro': ['IP66', '5 m/s', '15 kg Nutzlast', '3× Rechenleistung'],
  'lynx-m20':     ['IP66', '5 m/s', '15 kg Nutzlast', '2× Rechenleistung'],
  lite3:          ['12 kg', '18 cm Stufen', 'SDK', '4 ' + 'Varianten'],
  'patrol-m20':   ['33× Zoom', '5G', 'IP66', '7×24 h'],
  'fire-cannon':  ['Wurfweite 60 m', 'IP67', '85 kg Nutzlast', '4 h'],
  'fire-recon':   ['6 Gase', 'Mesh-Funknetz', '550 °C', '15 kg Nutzlast']
};
const KEY_SPECS_EN = {
  x30: ['IP67', '−20…55 °C', '20 kg payload', '4 h'],
  x50: ['50 kg payload', 'IP67', '3 m/s sustained', '25 cm steps'],
  'lynx-m20s': ['IP67', '9 m/s', '35 kg payload', '−30…55 °C'],
  'lynx-m20-pro': ['IP66', '5 m/s', '15 kg payload', '3× computing'],
  'lynx-m20': ['IP66', '5 m/s', '15 kg payload', '2× computing'],
  'patrol-m20': ['33× zoom', '5G', 'IP66', '7×24 h'],
  'fire-cannon': ['60 m throw', 'IP67', '85 kg payload', '4 h'],
  lite3: ['12 kg', '18 cm steps', 'SDK', '4 variants'],
  'fire-recon': ['6 gases', 'Mesh network', '550 °C', '15 kg payload']
};
const KEY_SPECS_ZH = {
  x30:            ['IP67', '−20…55 °C', '20 kg 负载', '4 小时'],
  x50:            ['50 kg 负载', 'IP67', '3 m/s 持续奔跑', '25 cm 台阶'],
  'lynx-m20s':    ['IP67', '9 m/s', '35 kg 负载', '−30…55 °C'],
  'lynx-m20-pro': ['IP66', '5 m/s', '15 kg 负载', '3× 算力'],
  'lynx-m20':     ['IP66', '5 m/s', '15 kg 负载', '2× 算力'],
  lite3:          ['12 kg', '18 cm 台阶', 'SDK', '4 种配置'],
  'patrol-m20':   ['33 倍变焦', '5G', 'IP66', '7×24 小时'],
  'fire-cannon':  ['射程 60 m', 'IP67', '85 kg 负载', '4 小时'],
  'fire-recon':   ['6 种气体', 'Mesh 自组网', '550 °C', '15 kg 负载']
};

function specChips(p) {
  const de = KEY_SPECS[p.id] || [];
  const en = KEY_SPECS_EN[p.id] || de;
  const zh = KEY_SPECS_ZH[p.id] || de;
  return de.map((v, i) =>
    `<span class="chip" data-de="${esc(v)}" data-en="${esc(en[i] || v)}" data-zh="${esc(zh[i] || v)}">${esc(v)}</span>`
  ).join('');
}

Object.assign(KEY_SPECS,    { c5: ['3-in-1', '1.980 m²/h', '550 mm', '25 kg Anpressdruck'], c4: ['Durchgang 600 mm', '1.400 m²/h', '380 mm', '3 h'], q1: ['88 cm', '22 Freiheitsgrade', '215 Wh', 'SDK*'], t1: ['2 Formen', '3 m/s', '3 kg Last', 'Pro: SDK'] });
Object.assign(KEY_SPECS_EN, { c5: ['3-in-1', '1,980 m²/h', '550 mm', '25 kg pressure'], c4: ['600 mm passage', '1,400 m²/h', '380 mm', '3 h'], q1: ['88 cm', '22 DoF', '215 Wh', 'SDK*'], t1: ['2 forms', '3 m/s', '3 kg load', 'Pro: SDK'] });
Object.assign(KEY_SPECS_ZH, { c5: ['三合一', '1,980 m²/h', '550 mm', '25 kg 压力'], c4: ['通道 600 mm', '1,400 m²/h', '380 mm', '3 小时'], q1: ['88 cm', '22 自由度', '215 Wh', 'SDK*'], t1: ['双形态', '3 m/s', '载物 3 kg', 'Pro: SDK'] });
const priceHTML = (p) => p.price == null
  ? `<b class="price--ask">${swx('Preis auf Anfrage', 'Price on request', '价格请询盘')}</b>`
  : `<b>${money(p.price)} €</b>`;
const imgExt = (g) => fs.existsSync(path.join(ROOT, 'assets/img/products', g + '.png')) ? 'png' : 'jpg';
const catHref = (c, r) => c && c.page ? r + c.page : `${r}produkte/index.html?kategorie=${c.id}`;

/* ---------------------------------------------------------- product card */
function productCard(p, depth = 1) {
  const r = '../'.repeat(depth);
  const img = p.gallery && p.gallery[0];
  return `
<article class="pcard reveal${p.photo ? ' pcard--photo' : ''}" data-cat="${p.category}" data-quickview="${p.id}">
  ${p.badge ? `<span class="badge">${t(p.badge)}</span>` : ''}
  <div class="pcard__media plinth">
    ${img ? `<picture>
      <source srcset="${r}assets/img/products/${img}.webp" type="image/webp">
      <img src="${r}assets/img/products/${img}.${imgExt(img)}" alt="${attr(p.name)} — ${attr(p.family)}" loading="lazy" width="600" height="450">
    </picture>` : ''}
  </div>
  <div class="pcard__body">
    <p class="pcard__brand">${t(p.family)}</p>
    <h3 class="pcard__name"><a href="${r}produkte/${p.slug}.html" data-quickview="${esc(p.id)}">${pTitle(p)}</a></h3>
    <p class="pcard__tag">${t(p.tagline)}</p>
    <div class="pcard__specs">${specChips(p)}</div>
    <div class="pcard__foot">
      <span class="price">
        ${priceHTML(p)}
        ${p.price == null ? `<small>${swx('Angebot mit Konfiguration', 'Quote with configuration', '按配置报价')}</small>` : `<small>${sw('netto, zzgl. USt.', 'net, excl. VAT')}</small>`}
      </span>
      <span class="pcard__actions">
        <button class="btn btn--sm btn--ghost btn--inq" type="button" data-inq-add="${esc(p.id)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${swx('Anfrage', 'Inquiry', '询盘')}</button>
        <a class="btn btn--sm" href="${r}produkte/${p.slug}.html">${swx('Details', 'Details', '详情')}</a>
      </span>
    </div>
  </div>
</article>`;
}

function placeholderCard(c, depth = 1) {
  const r = '../'.repeat(depth);
  return `
<article class="pcard pcard--soon reveal" data-cat="${c.id}">
  <div>
    <span class="icon">${ICON.plus}</span>
    <h4>${t(c.name)}</h4>
    <p>${t(c.tagline, 'span')}</p>
    <p style="margin-top:1rem"><a class="link" href="${r}service/kontakt.html">${sw('Verfügbarkeit anfragen', 'Ask about availability')} ${ICON.arrow}</a></p>
  </div>
</article>`;
}

/* ============================================================== HOME ==== */
/* v27 · Startseite nach Audit V1.0 (Batch 1): Hero → Kategorien → Top-Modelle
   → Einsatzbereiche → Referenzen → Warum NIC; beide Filme bleiben einzeln (Wunsch Kunde).
   Hell (Kategorien, Top-Modelle, Warum NIC) und dunkel im Wechsel. */
const HOME_CAT_TXT = {
  vierbeiner: ['Gebaut für Inspektion und schwieriges Gelände.', 'Built for inspection and challenging terrain.', '专为巡检和复杂地形打造。'],
  radbein:    ['Schnell auf Rädern. Wendig auf Beinen.', 'Fast on wheels. Agile on legs.', '轮上够快，腿上够灵。'],
  humanoid:   ['Vielseitige Plattformen für Forschung und Automatisierung.', 'Versatile platforms for research and automation.', '面向科研与自动化的多用途平台。'],
  heim:       ['Intelligente Begleiter für den Alltag.', 'Intelligent companions for everyday life.', '日常生活中的智能伙伴。'],
  reinigung:  ['Autonome Reinigung für gewerbliche Flächen.', 'Autonomous cleaning for commercial spaces.', '商用空间的自主清洁。']
};
const HOME_FEAT = {
  'lynx-m20s': {
    line: ['Rad-Bein-Mobilität für Tempo und schwieriges Gelände.', 'Wheel-legged mobility for speed and challenging terrain.', '轮足机动，兼顾速度与复杂地形。'],
    specs: [['9 m/s', '9 m/s', '9 m/s'], ['35 kg Nutzlast', '35 kg payload', '35 kg 负载'], ['IP67', 'IP67', 'IP67']]
  },
  x30: {
    line: ['Robuste Vierbeiner-Plattform für die Industrieinspektion.', 'Rugged quadruped platform for industrial inspection.', '面向工业巡检的坚固四足平台。'],
    specs: [['IP67', 'IP67', 'IP67'], ['−20…55 °C', '−20…55 °C', '−20…55 °C'], ['4 h Laufzeit', '4 h runtime', '续航 4 小时']]
  },
  lite3: {
    tags: ['forschung'],
    line: ['Flexible Vierbeiner-Plattform für Forschung und Lehre.', 'Flexible quadruped platform for research and education.', '面向科研与教育的灵活四足平台。'],
    specs: [['12 kg', '12 kg', '12 kg'], ['Offenes SDK', 'Open SDK', '开放 SDK'], ['4 Ausbaustufen', '4 build levels', '4 种配置']]
  }
};
const HOME_SCEN = {
  industrie: ['Mehr prüfen. Weniger riskieren.', 'Inspect More. Expose Less.', '多巡检，少暴露。'],
  feuerwehr: ['Roboter zuerst. Menschen sicherer.', 'Robots First. People Safer.', '机器人先上，人员更安全。'],
  energie:   ['Intelligentere Netzinspektion.', 'Smarter Power Inspections.', '更智能的电力巡检。']
};
const chip3 = ([de, en, zh]) => `<span class="chip" data-de="${esc(de)}" data-en="${esc(en)}" data-zh="${esc(zh)}">${esc(de)}</span>`;

function homeCard(p) {
  const f = HOME_FEAT[p.id];
  const img = p.gallery && p.gallery[0];
  const tags = (f.tags || p.useCases || []).slice(0, 2).map((id) => USECASES.find((u) => u.id === id)).filter(Boolean);
  return `
<article class="pcard hcard reveal" data-cat="${p.category}" data-quickview="${p.id}">
  <div class="pcard__media plinth">
    ${img ? `<picture>
      <source srcset="assets/img/products/${img}.webp" type="image/webp">
      <img src="assets/img/products/${img}.${imgExt(img)}" alt="${attr(p.name)} — ${attr(p.family)}" loading="lazy" width="600" height="450">
    </picture>` : ''}
  </div>
  <div class="pcard__body">
    <p class="hcard__tags">${tags.map((u) => `<span>${t(u.name)}</span>`).join('')}</p>
    <h3 class="pcard__name"><a href="produkte/${p.slug}.html" data-quickview="${esc(p.id)}">${pTitle(p)}</a></h3>
    <p class="pcard__tag">${swx(...f.line)}</p>
    <div class="pcard__specs">${f.specs.map(chip3).join('')}</div>
    <div class="pcard__foot">
      <span class="price"><b class="price--ask">${swx('Preis auf Anfrage', 'Request pricing', '询价')}</b></span>
      <span class="pcard__actions">
        <button class="btn btn--sm btn--ghost btn--inq" type="button" data-inq-add="${esc(p.id)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${swx('Anfrage', 'Inquiry', '询盘')}</button>
        <a class="btn btn--sm" href="produkte/${p.slug}.html">${swx('Details', 'Details', '详情')}</a>
      </span>
    </div>
  </div>
</article>`;
}

function buildHome() {
  const featured = ['lynx-m20s', 'x30', 'lite3'].map(prodOf);
  const P = NIC.partner;

  const catCards = CATS.filter((c) => c.id !== 'ersatzteile').map((c, i) => {
    const d = HOME_CAT_TXT[c.id];
    return `
<a class="hcat reveal" data-delay="${i % 5}" href="${catHref(c, '')}">
  <span class="hcat__art plinth">${c.image ? `<img src="assets/img/products/${c.image}.webp" alt="" loading="lazy" width="500" height="380">` : ''}</span>
  <span class="hcat__body">
    <h3>${t(c.name)}</h3>
    <p>${d ? swx(...d) : t(c.tagline, 'span')}</p>
    <span class="hcat__go">${swx('Ansehen', 'Explore', '查看')} ${ICON.arrow}</span>
  </span>
</a>`;
  }).join('');

  const scenarios = ['industrie', 'feuerwehr', 'energie'].map((id, i) => {
    const u = USECASES.find((x) => x.id === id);
    return `
<article class="scenario reveal${i % 2 ? ' scenario--right' : ''}">
  <div class="scenario__media">
    <picture>
${sceneSources(u.scene, '')}
      <img src="assets/img/scenes/${u.scene}.jpg" alt="${attr(u.name)}" loading="lazy" width="1600" height="900">
    </picture>
  </div>
  <div class="scenario__body">
    <p class="kicker">${t(u.name)}</p>
    <h3>${swx(...HOME_SCEN[id])}</h3>
    <div class="scenario__links">
      <a class="btn btn--sm btn--ghost btn--arrow" href="einsatzbereiche/index.html#${u.slug}">${sw('Mehr zu diesem Einsatz', 'More on this application')} ${ICON.arrow}</a>
    </div>
  </div>
</article>`;
  }).join('');

  const pillars = [
    [GLOBE, ['Globale Technologie', 'Global Technology', '全球技术'],
      ['Roboter von weltweit führenden Herstellern — ausgewählt für den Einsatz in Europa.', 'Robots from world-leading manufacturers — selected for use in Europe.', '来自全球领先厂商的机器人，为欧洲应用精选。']],
    [ICON.truck, ['Sitz in Deutschland', 'Based in Germany', '扎根德国'],
      ['Lager, Rechnung, Gewährleistung, Ersatzteile und Reparatur aus Deutschland.', 'Stock, invoicing, warranty, spare parts and repair from Germany.', '库存、发票、质保、备件和维修均在德国。']],
    [ICON.cpu, ['Fachliche Beratung', 'Expert Guidance', '专业指导'],
      ['Von der Auswahl über die Integration bis zum Service im Betrieb.', 'From selection and integration to service in operation.', '从选型、集成到运行中的服务，全程陪伴。']]
  ];

  const html = `${head({
    title: 'Vierbeiner- und Rad-Bein-Roboter für Industrie und Rettung',
    description: 'NIC Robotics liefert Vierbeiner-, Rad-Bein- und Servicerobotik für Industrieinspektion, Energieversorgung, Feuerwehr, Objektschutz und Forschung. Vertrieb, Integration und Service in Europa.',
    path: '/',
    depth: 0
  })}
${header(CATS, PRODUCTS, 0)}

<main id="main" class="home">

  <!-- ================= HERO ================= -->
  <section class="hero hero--v27">
    <div class="hero__media">
      <video data-hero-video autoplay muted loop playsinline preload="auto"
             poster="assets/img/scenes/hero-poster.jpg" aria-hidden="true">
        <source src="assets/video/hero-v48-m.mp4" type="video/mp4" media="(max-width: 900px)">
        <source src="assets/video/hero-v48-1080.mp4" type="video/mp4">
      </video>
    </div>
    <div class="wrap">
      <div class="hero__inner">
        <h1 class="t-hero">
          <span data-i18n-de>Robotik für Forschung und Industrie.<br><em>Mit Support in Deutschland.</em></span>
          <span data-i18n-en>Robots for research and industry.<br><em>Supported in Germany.</em></span>
          <span data-i18n-zh>面向科研与工业的机器人，<br><em>德国本地支持。</em></span>
        </h1>
        <p class="t-lead">${swx(
          'Vierbeiner, Rad-Bein-Roboter und Humanoide für Labore, Institute und Industrieanlagen — Beratung, Lieferung und Service aus Deutschland.',
          'Quadrupeds, wheel-legged robots and humanoids for labs, institutes and industrial sites — advice, delivery and service from Germany.',
          '四足、轮足与人形机器人，服务于实验室、科研院所与工业现场——选型、交付与售后均在德国。'
        )}</p>
        <div class="hero__cta">
          <a class="btn btn--lg btn--arrow" href="forschung/index.html">${swx('Forschung & Lehre', 'Research & Teaching', '科研与教学')} ${ICON.arrow}</a>
          <a class="btn btn--lg btn--ghost btn--arrow" href="einsatzbereiche/index.html">${swx('Industrielle Anwendungen', 'Industrial applications', '工业应用')} ${ICON.arrow}</a>
        </div>
        <p class="hero__more"><a href="#kategorien">${swx('Alle Roboter ansehen', 'See all robots', '查看全部机器人')} ↓</a></p>
      </div>
    </div>
  </section>

  <!-- ================= v42 · FORSCHUNGSRICHTUNGEN ================= -->
  <section class="section section--tight home-rs">
    <div class="wrap">
      <div class="home-rs__head reveal">
        <p class="kicker">${swx('Forschung & Lehre', 'Research & Teaching', '科研与教学')}</p>
        <h2>${swx('Woran forschen Sie?', 'What are you researching?', '您在研究什么？')}</h2>
      </div>
      <ul class="home-rs__list">${RS_NEEDS.map((n) => `<li><a class="reveal" href="forschung/index.html#${n.id}"><strong>${swx(...n.t)}</strong><span>${swx(...n.q)}</span><i>${n.models.map((id) => esc(prodOf(id).name)).join(' · ')} ${ICON.arrow}</i></a></li>`).join('')}</ul>
    </div>
  </section>

  <!-- ================= FILM ================= -->
  <section class="section section--tight" id="film">
    <div class="wrap">
      <div class="section-head reveal">
        <h2>${swx('Wasser, Wald, Steilhang. Ein Roboter.', 'Water, forest, steep slopes. One robot.', '涉水、穿林、爬坡，一台搞定。')}</h2>
      </div>
      <figure class="film film--right reveal">
        <div class="film__stage"><div class="film__frame">
          <video class="film__video" data-film playsinline preload="none"
                 controlslist="nodownload noplaybackrate" disablepictureinpicture
                 poster="assets/img/scenes/film-poster.jpg">
            <source src="assets/video/film-1080.mp4" type="video/mp4">
          </video>
          <button class="film__play" type="button" data-film-play aria-label="Film abspielen">
            <span class="film__btn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>
<span class="film__cover" aria-hidden="true"><b>${swx('Kein Weg.', 'No road.', '没有路，')}<br>${swx('Kein Problem.', 'No problem.', '也能走。')}</b><i>${swx('Lynx M20 S · 68 Sekunden im Gelände', 'Lynx M20 S · 68 seconds off-road', 'Lynx M20 S · 68 秒野外实拍')}</i></span>
            <span class="film__label">${swx('Film ansehen · 1:08', 'Watch the film · 1:08', '观看影片 · 1:08')}</span>
          </button>
          <span class="film__tag" aria-hidden="true">NIC · FILM 01</span>
        </div></div>
        <figcaption>${swx('Lynx M20 S — Wasser, Wald, Hang, Straße.', 'Lynx M20 S — water, forest, slope, road.', 'Lynx M20 S——涉水、林地、陡坡、公路。')}</figcaption>
      </figure>
    </div>
  </section>

  <!-- ================= EXPLORE OUR ROBOTS (hell) ================= -->
  <section class="section sec-light" id="kategorien">
    <div class="wrap">
      <div class="section-head section-head--center reveal">
        <p class="kicker">${swx('Produkte', 'Products', '产品')}</p>
        <h2>${swx('Unsere Roboter entdecken', 'Explore Our Robots', '探索我们的机器人')}</h2>
        <p class="t-lead">${swx('Finden Sie die passende Plattform für Ihre Anwendung.', 'Find the right platform for your application.', '为您的应用找到合适的平台。')}</p>
      </div>
      <div class="hcat-grid">${catCards}</div>
    </div>
  </section>

  <!-- ================= FEATURED ROBOTS (hell) ================= -->
  <section class="section section--tight sec-light home-feat" id="produkte">
    <div class="wrap">
      <div class="section-head section-head--split reveal">
        <div>
          <p class="kicker">${swx('Top-Modelle', 'Featured', '精选')}</p>
          <h2>${swx('Ausgewählte Roboter', 'Featured Robots', '精选机器人')}</h2>
          <p class="t-lead">${swx('Eine Auswahl an Robotern für unterschiedliche Anforderungen.', 'A selection of robots for different needs.', '满足不同需求的精选机器人。')}</p>
        </div>
        <a class="btn btn--ghost btn--arrow" href="produkte/index.html">${swx('Alle Produkte', 'All products', '全部产品')} ${ICON.arrow}</a>
      </div>
      <div class="product-grid">${featured.map(homeCard).join('')}</div>
    </div>
  </section>

  <!-- ================= FILM 2 · HUMANOID ================= -->
  <section class="section section--tight" id="film-humanoid">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${swx('Humanoid', 'Humanoid', '人形机器人')}</p>
        <h2>${swx('Zwei Beine. Volle Kontrolle.', 'Two legs. Full control.', '两条腿，全掌控。')}</h2>
      </div>
      <figure class="film film--cradle reveal">
        <div class="film__stage"><div class="film__frame">
          <video class="film__video" data-film playsinline preload="none"
                 controlslist="nodownload noplaybackrate" disablepictureinpicture
                 poster="assets/img/scenes/humanoid-poster.jpg">
            <source src="assets/video/humanoid-720.mp4" type="video/mp4" media="(max-width: 900px)">
            <source src="assets/video/humanoid-1080.mp4" type="video/mp4">
          </video>
          <button class="film__play" type="button" data-film-play aria-label="Film abspielen">
            <span class="film__btn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>
            <span class="film__cover" aria-hidden="true"><b>${swx('Balance', 'Balance', '一招一式，')}<br>${swx('in jeder Bewegung.', 'in every move.', '全靠平衡。')}</b><i>${swx('Humanoid DR02 · 49 Sekunden', 'Humanoid DR02 · 49 seconds', '人形机器人 DR02 · 49 秒')}</i></span>
            <span class="film__label">${swx('Film ansehen · 0:49', 'Watch the film · 0:49', '观看影片 · 0:49')}</span>
          </button>
          <span class="film__tag" aria-hidden="true">NIC · FILM 02</span>
        </div></div>
        <figcaption>${swx('Humanoid DR02 — IP66, für jedes Wetter. Jetzt anfragen.', 'DR02 humanoid — IP66, for any weather. Enquire now.', 'DR02 人形机器人——IP66 全天候作业，现已接受询价。')} <a class="link" href="produkte/humanoid-dr02.html">DR02 ${ICON.arrow}</a></figcaption>
      </figure>
    </div>
  </section>

  <!-- ================= v47 · LEITSATZ (wortweise) ================= -->
  <section class="section tagline" aria-label="${attr({ de: 'Leitsatz', en: 'Tagline', zh: '理念' })}">
    <div class="wrap">
      <p class="tagline__text" data-words>
        <span data-i18n-de>Roboter gehen ins Risiko.<br>Menschen bleiben in Sicherheit.</span>
        <span data-i18n-en>Robots take the risk.<br>People stay safe.</span>
        <span data-i18n-zh>危险交给机器人，<br>安全留给人。</span>
      </p>
    </div>
  </section>

  <!-- ================= APPLICATIONS (dunkel) ================= -->
  <section class="section" id="einsatz">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${swx('Einsatzbereiche', 'Applications', '应用场景')}</p>
        <h2>${swx('Einsatzbereiche entdecken', 'Explore Applications', '探索应用场景')}</h2>
        <p class="t-lead">${swx('Sehen Sie, wo Robotik den Unterschied macht.', 'Discover where robotics can make a difference.', '看看机器人能在哪些地方带来改变。')}</p>
      </div>
      <div class="grid" style="gap:var(--gap)">${scenarios}</div>
      <div class="cluster mt-l reveal">
        <a class="btn btn--arrow" href="einsatzbereiche/index.html">${sw('Alle acht Einsatzbereiche', 'All eight applications')} ${ICON.arrow}</a>
      </div>
    </div>
  </section>

${caseTeaser()}

  <!-- ================= WHY NIC (hell) ================= -->
  <section class="section section--tight sec-light" id="warum">
    <div class="wrap">
      <div class="section-head section-head--center reveal">
        <p class="kicker">${swx('Warum NIC Robotics', 'Why NIC Robotics', '为什么选择 NIC Robotics')}</p>
        <h2>${swx('Globale Technologie. Betreuung vor Ort.', 'Global Technology. Local Support.', '全球技术，本地支持。')}</h2>
      </div>
      <div class="why3">
        ${pillars.map(([icon, h, d], i) => `
        <div class="why3__item reveal" data-delay="${i}">
          <span class="why3__ic">${icon}</span>
          <h3>${swx(...h)}</h3>
          <p>${swx(...d)}</p>
        </div>`).join('')}
      </div>
      <div class="rankline reveal">
        <p class="rankline__lead">${swx('Unser erster Herstellerpartner:', 'Our first manufacturing partner:', '我们的首家制造合作伙伴：')}</p>
        <ul>${P.ranks.map(([v, l]) => `<li><b>${esc(v)}</b> ${t(l, 'span')}</li>`).join('')}</ul>
        <p class="rankline__src">${swx('Nach Umsatz 2025, nicht nach Stückzahl. Quelle: Frost & Sullivan, zitiert im Börsenprospekt des Herstellers (2026).', 'By 2025 revenue, not units shipped. Source: Frost & Sullivan, cited in the manufacturer’s IPO prospectus (2026).', '按 2025 年收入，非出货量。来源：弗若斯特沙利文，引自厂商 2026 年招股说明书。')}</p>
      </div>
    </div>
  </section>

</main>

${footer(CATS, 0)}
${offerModal(0)}
${quickView()}
${scripts(0, `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NIC Robotics",
  "url": "${SITE.domain}",
  "logo": "${SITE.domain}/assets/img/logo-dark.png",
  "parentOrganization": { "@type": "Organization", "name": "An Yuan GmbH", "url": "${SITE.parent}" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${SITE.street}",
    "postalCode": "65824",
    "addressLocality": "Schwalbach am Taunus",
    "addressCountry": "DE"
  },
  "email": "${SITE.email}",
  "telephone": "${SITE.phoneHref}"
}
</script>`)}`;

  write('index.html', html);
}

/* ======================================================= PRODUCT INDEX == */
/* v31 · Produktübersicht nach Design-Review V1.0 (Batch 1): heller Katalog,
   reduzierte Karten (Typ, Modell, 1 Satz, 2 Kernwerte, Details + Anfrageliste),
   Filter: Kategorie · Suche · Einsatzbereich · Sortierung. */
const CARD = {
  x30:            [['Vierbeiner für Industrieinspektion und schwieriges Gelände.', 'Quadruped for industrial inspection and difficult terrain.', '面向工业巡检与复杂地形作业的四足机器人。'], [['IP67', 'IP67', 'IP67'], ['20 kg Nutzlast', '20 kg payload', '20 kg 负载']]],
  x50:            [['Schwerlast-Vierbeiner für Transport, Brandschutz und Inspektion.', 'Heavy-duty quadruped for transport, firefighting and inspection.', '面向运输、消防与巡检的重载四足机器人。'], [['50 kg Nutzlast', '50 kg payload', '50 kg 负载'], ['IP67', 'IP67', 'IP67']]],
  'lynx-m20s':    [['Hohes Tempo und Geländegängigkeit in einem Roboter.', 'High speed and terrain capability in one robot.', '兼具高速移动与复杂地形通过能力。'], [['9 m/s', '9 m/s', '9 m/s'], ['IP67', 'IP67', 'IP67']]],
  'lynx-m20-pro': [['Leistungsstarker Rad-Bein-Roboter für professionelle Inspektion.', 'High-performance wheel-legged robot for professional inspection.', '面向专业巡检任务的高性能轮足机器人。'], [['3× Rechenleistung', '3× computing', '3× 算力'], ['IP66', 'IP66', 'IP66']]],
  'lynx-m20':     [['Rad-Bein-Plattform für unterschiedliches Gelände.', 'Wheel-legged platform for varied terrain.', '适用于多种地形的轮足移动平台。'], [['5 m/s', '5 m/s', '5 m/s'], ['IP66', 'IP66', 'IP66']]],
  lite3:          [['Für Robotik-Lehre, Forschung und Eigenentwicklung.', 'For robotics teaching, research and custom development.', '适用于机器人教学、科研与二次开发。'], [['12 kg', '12 kg', '12 kg'], ['Offenes SDK', 'Open SDK', '开放 SDK']]],
  'patrol-m20':   [['Robotersystem für Streife auf Gelände und Werksflächen.', 'Robot system for patrols on campuses and sites.', '面向园区与安防巡逻的机器人系统。'], [['33× Zoom', '33× zoom', '33 倍变焦'], ['5G', '5G', '5G']]],
  'fire-cannon':  [['Professionelle Roboterplattform für Brandbekämpfung.', 'Professional robot platform for firefighting.', '面向消防救援场景的专业机器人平台。'], [['Wurfweite 60 m', '60 m throw', '射程 60 m'], ['IP67', 'IP67', 'IP67']]],
  'fire-recon':   [['Erkundung von Gefahrenbereichen und Erfassung von Umgebungsdaten.', 'Reconnaissance of hazard zones and environmental data capture.', '用于危险区域侦察与环境信息采集。'], [['6 Gase', '6 gases', '6 种气体'], ['Mesh-Funknetz', 'Mesh network', 'Mesh 自组网']]],
  dr02:           [['Humanoide Plattform für industrielle Anwendungen.', 'Humanoid platform for industrial applications.', '面向工业应用的人形机器人平台。'], [['IP66', 'IP66', 'IP66'], ['−20…55 °C', '−20…55 °C', '−20…55 °C']]],
  'lynx-s10':     [['Leichter Rad-Bein-Roboter für flexible Einsätze.', 'Lightweight wheel-legged robot for agile missions.', '轻量化轮足机器人，适合灵活移动任务。'], [['< 20 kg', '< 20 kg', '< 20 kg'], ['> 8 m/s', '> 8 m/s', '> 8 m/s']]],
  q1:             [['Kleiner Humanoid für Interaktion und Robotik-Erlebnis.', 'Small humanoid for personal interaction and robotics experience.', '面向个人交互与机器人体验的小型人形机器人。'], [['88 cm', '88 cm', '88 cm'], ['22 Gelenke', '22 joints', '22 自由度']]],
  t1:             [['Rad-Bein-Roboter mit zwei umschaltbaren Bewegungsformen.', 'Wheel-legged robot with two switchable motion modes.', '可切换运动形态的轮足双形态机器人。'], [['2 Formen', '2 modes', '双形态'], ['3 m/s', '3 m/s', '3 m/s']]],
  c5:             [['Autonome Reinigung für große gewerbliche Flächen.', 'Autonomous cleaning for large commercial spaces.', '面向大型商业空间的自主清洁机器人。'], [['1.980 m²/h', '1,980 m²/h', '1,980 m²/h'], ['3-in-1', '3-in-1', '三合一']]],
  c4:             [['Gewerbliche Reinigung für schmale Gänge.', 'Commercial cleaning for narrow aisles.', '适用于狭窄通道的商用清洁机器人。'], [['Gang 600 mm', '600 mm aisle', '通道 600 mm'], ['1.400 m²/h', '1,400 m²/h', '1,400 m²/h']]]
};
const CARD_BADGE = ['Neu', 'Flaggschiff'];

function catalogCard(p) {
  const r = '../';
  const img = p.cardImg || (p.gallery && p.gallery[0]);
  const c = CARD[p.id];
  const href = `${r}produkte/${p.slug}.html`;
  const title = p.title ? `${p.title.de} ${p.title.en} ${p.title.zh}` : p.name;
  const search = `${p.name} ${title} ${p.sku || ''} ${p.family.de} ${p.family.en} ${p.family.zh}`.toLowerCase();
  return `
<article class="ccard${p.photo && !p.cardImg ? ' ccard--photo' : ''}${p.cardBlend ? ' ccard--blend' : ''}" data-cat="${p.category}" data-kind="${p.kind || 'platform'}" data-id="${esc(p.id)}" data-uses="${(p.useCases || []).join(' ')}" data-search="${attr(search)}" data-order="${p.order || 99}" data-name="${attr(p.name)}">
  <label class="ccard__cmp"><input type="checkbox" data-cmp="${esc(p.id)}"> <span>${swx('Vergleichen', 'Compare', '比较')}</span></label>
  <a class="ccard__media" href="${href}" tabindex="-1" aria-hidden="true">
    ${p.badge && CARD_BADGE.includes(p.badge.de) ? `<span class="ccard__badge">${t(p.badge)}</span>` : ''}
    ${img ? `<picture>
      <source srcset="${r}assets/img/products/${img}.webp" type="image/webp">
      <img src="${r}assets/img/products/${img}.${imgExt(img)}" alt="${attr(p.name)} — ${attr(p.family)}" loading="lazy" width="600" height="450">
    </picture>` : ''}
  </a>
  <div class="ccard__body">
    <p class="ccard__type">${t(p.family)}${p.kind === 'config' ? ` <span class="kind-tag">${swx('Branchenkonfiguration', 'Industry configuration', '行业配置方案')}</span>` : ''}</p>
    <h3 class="ccard__name"><a href="${href}">${pTitle(p)}</a></h3>
    <p class="ccard__desc">${c ? swx(...c[0]) : t(p.tagline)}</p>
    ${c ? `<p class="ccard__specs">${c[1].map((s) => `<span data-de="${esc(s[0])}" data-en="${esc(s[1])}" data-zh="${esc(s[2])}">${esc(s[0])}</span>`).join('')}</p>` : ''}
    <div class="ccard__foot">
      <p class="ccard__price">${swx('Preis auf Anfrage', 'Price on request', '询价')}</p>
      <button class="ccard__inq" type="button" data-inq-add="${esc(p.id)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${swx('Anfrageliste', 'Inquiry list', '询价清单')}</button>
    </div>
  </div>
</article>`;
}

/* v42 · Vergleichsleiste (max. 4 Modelle, Auswahl in localStorage) */
function cmpBar(r = '../') {
  return `
<div class="cmpbar" data-cmpbar hidden>
  <div class="wrap">
    <p><b data-cmp-count>0</b> ${swx('von 4 Modellen zum Vergleich gewählt', 'of 4 models selected to compare', '/ 4 款机型已加入比较')}</p>
    <div class="cmpbar__list" data-cmp-list></div>
    <button class="btn btn--sm btn--ghost" type="button" data-cmp-reset>${swx('Leeren', 'Clear', '清空')}</button>
    <a class="btn btn--sm" href="${r}produkte/vergleich.html" data-cmp-go>${swx('Vergleichen', 'Compare', '开始比较')} ${ICON.arrow}</a>
  </div>
</div>`;
}

function buildProductIndex() {
  const cats = CATS.filter((c) => inCat(c.id).length);
  const filterBtns = [
    `<button class="filter-btn" type="button" data-filter="all" aria-pressed="true">${swx('Alle', 'All', '全部')}</button>`
  ].concat(cats.map((c) =>
    `<button class="filter-btn" type="button" data-filter="${c.id}" aria-pressed="false">${t(c.short)}</button>`
  )).join('');
  const usedUses = USECASES.filter((u) => PRODUCTS.some((p) => (p.useCases || []).includes(u.id)));
  const cards = cats.map((c) => inCat(c.id).map(catalogCard).join('')).join('');

  const html = `${head({
    title: 'Produkte',
    description: 'Alle Roboter im Programm von NIC Robotics: Vierbeiner, Rad-Bein-Roboter, Humanoide, Heim- und Reinigungsroboter. Datenblätter, Vergleich und Angebotsanfrage.',
    path: '/produkte/',
    image: '/assets/img/scenes/m20s-dust.jpg',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main" class="catalog">
  <section class="page-hero page-hero--plain cat-hero">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="../index.html">${sw('Start', 'Home')}</a></li>
        <li>${sw('Produkte', 'Products')}</li>
      </ol>
      <p class="kicker">NIC Robotics / ${swx('Produkte', 'Products', '产品')}</p>
      <h1>${swx('Unsere Roboter entdecken', 'Explore our robots', '探索我们的机器人')}</h1>
      <p class="t-lead">${swx('Von der Industrieinspektion bis zum gewerblichen Service — finden Sie den passenden Roboter.', 'From industrial inspection to commercial service — find the robot that fits your needs.', '从工业巡检到商业服务，找到适合您需求的机器人。')}</p>
    </div>
  </section>

  <section class="section sec-light cat-list">
    <div class="wrap">
      <div class="cfilter" data-filter-bar>
        <div class="cfilter__top">
          <p class="cfilter__count"><b class="filters__count"></b></p>
          <div class="cfilter__tools">
            <label class="cfilter__search">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              <input type="search" data-cf-search data-attr="placeholder" data-de="Modell suchen, z. B. X30" data-en="Search model, e.g. X30" data-zh="搜索型号，例如 X30" placeholder="Modell suchen, z. B. X30" aria-label="Suche">
            </label>
            <select data-cf-use aria-label="Einsatzbereich">
              <option value="" data-de="Alle Einsatzbereiche" data-en="All applications" data-zh="全部应用">Alle Einsatzbereiche</option>
              ${usedUses.map((u) => `<option value="${u.id}" data-de="${attr(u.name.de)}" data-en="${attr(u.name.en)}" data-zh="${attr(u.name.zh)}">${esc(u.name.de)}</option>`).join('')}
            </select>
            <select data-cf-kind aria-label="Typ">
              <option value="" data-de="Plattform und Konfiguration" data-en="Platforms and configurations" data-zh="平台与配置方案">Plattform und Konfiguration</option>
              <option value="platform" data-de="Nur Roboterplattformen" data-en="Robot platforms only" data-zh="仅机器人平台">Nur Roboterplattformen</option>
              <option value="config" data-de="Nur Branchenkonfigurationen" data-en="Industry configurations only" data-zh="仅行业配置方案">Nur Branchenkonfigurationen</option>
            </select>
            <select data-cf-sort aria-label="Sortierung">
              <option value="rec" data-de="Empfohlen" data-en="Recommended" data-zh="推荐排序">Empfohlen</option>
              <option value="az" data-de="Name A–Z" data-en="Name A–Z" data-zh="名称 A–Z">Name A–Z</option>
            </select>
          </div>
        </div>
        <div class="cfilter__cats">${filterBtns}</div>
      </div>
      <div class="ccard-grid" data-cf-grid>${cards}</div>
      <div class="cf-empty" data-cf-empty hidden>
        <p>${swx('Keine Produkte gefunden.', 'No products found.', '没有找到相关产品。')}</p>
        <button class="btn btn--sm btn--ghost" type="button" data-cf-clear>${swx('Filter zurücksetzen', 'Clear filters', '清除筛选')}</button>
      </div>

      <p class="t-small t-dim mt">${swx('Branchenkonfiguration = fertig ausgestattete Lösung auf Basis einer unserer Roboterplattformen (z. B. Streife, Brandbekämpfung, Erkundung).', 'Industry configuration = a ready-equipped solution built on one of our robot platforms (e.g. patrol, firefighting, reconnaissance).', '行业配置方案 = 基于我们某一机器人平台整装的成套方案（如巡逻、灭火、侦察）。')}</p>

      <div class="cat-help reveal">
        <div>
          <h3>${swx('Nicht sicher, welcher Roboter passt?', 'Not sure which robot is right for you?', '不确定哪款机器人适合您？')}</h3>
          <p>${swx('Beschreiben Sie uns Ihre Anwendung — wir helfen bei der Auswahl des passenden Roboters und der Konfiguration.', 'Tell us about your application — we will help you choose the right robot and configuration.', '告诉我们您的应用需求，我们将协助您选择合适的机器人及配置。')}</p>
        </div>
        <a class="btn btn--arrow" href="../service/kontakt.html">${swx('Auswahlberatung anfordern', 'Get selection advice', '获取选型建议')} ${ICON.arrow}</a>
      </div>
    </div>
  </section>
</main>

${cmpBar()}
${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1)}`;

  write('produkte/index.html', html);
}

/* ====================================================== PRODUCT DETAIL == */
function buildProduct(p) {
  const cat = CATS.find((c) => c.id === p.category);
  const r = '../';

  const thumbs = (p.gallery || []).map((g, i) => `
    <button type="button" aria-current="${i === 0 ? 'true' : 'false'}"
            data-full="${r}assets/img/products/${g}.${imgExt(g)}"
            data-alt="${attr(p.name)} — Ansicht ${i + 1}">
      <img src="${r}assets/img/products/${g}.webp" alt="" loading="lazy" width="90" height="90">
    </button>`).join('');

  const specBlocks = (p.specs || []).map((blk) => `
  <div class="spec-block reveal">
    <h3>${t(blk.group)}</h3>
    <table class="spec-table">
      <tbody>
        ${blk.rows.map((row) => `<tr><th scope="row">${t(row.k)}</th><td>${t(row.v)}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>`).join('');

  let variantBlock = '';
  if (p.variantTable) {
    const vt = p.variantTable;
    const cell = (v) => {
      if (v === true) return `<span class="yes" title="${esc('enthalten')}">${ICON.check}</span>`;
      if (v === false) return '<span class="no">—</span>';
      if (v && typeof v === 'object') return t(v, 'span');
      if (v === 'Update') return `<span class="upd">${swx('per Update', 'via update', '后续 OTA')}</span>`;
      return esc(v);
    };
    variantBlock = `
  <section class="section section--tight sec-light pdp-light" id="varianten">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${sw('Varianten', 'Variants')}</p>
        <h2 style="font-size:var(--step-2)">${t(vt.caption, 'span')}</h2>
      </div>
      <div class="vtable-wrap reveal">
        <table class="vtable">
          <thead>
            <tr>
              <th scope="col">${sw('Merkmal', 'Specification')}</th>
              ${vt.cols.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${vt.rows.map((row) => `<tr><th scope="row">${t(row.k)}</th>${row.v.map((v) => `<td>${cell(v)}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>
      ${vt.rows.some((r) => /\*/.test(r.k.de)) ? `<p class="t-small t-dim mt">${swx('* Vom Hersteller angekündigt, Bereitstellung per Software-Update. Wir bestätigen den Stand bei Lieferung.', '* Announced by the manufacturer, delivered via software update. We confirm the status at delivery.', '* 厂商已公布、将通过后续 OTA 升级提供，交付时我们会确认当前状态。')}</p>` : ''}
      ${p.category === 'heim' || p.id === 'x50' ? '' : `<p class="t-small t-dim mt">${sw(
        'Ausstattungsstufen sind nachrüstbar. Sprechen Sie uns auf ein Upgrade einer vorhandenen Einheit an.',
        'Build levels can be retrofitted. Talk to us about upgrading a unit you already own.'
      )}</p>`}
    </div>
  </section>`;
  }

  const scenes = (p.scenes || []).length ? `
  <section class="section section--tight" style="background:var(--ink-850)">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${p.category === 'heim' ? swx('Im Alltag', 'Everyday life', '生活场景') : sw('Im Einsatz', 'In service')}</p>
        <h2 style="font-size:var(--step-2)">${p.category === 'heim' ? `${pTitle(p)} ${swx('zu Hause', 'at home', '在家里')}` : `${pTitle(p)} ${sw('im Feld', 'in the field')}`}</h2>
      </div>
      <div class="scene-grid reveal">
        ${(p.scenes || []).map((s, i) => `
        <figure${i === 0 && p.scenes.length > 2 ? ' class="wide"' : ''}>
          <picture>
            <source srcset="${r}assets/img/scenes/${s}.webp" type="image/webp">
            <img src="${r}assets/img/scenes/${s}.jpg" alt="${attr(p.name)} im Einsatz" loading="lazy" width="1200" height="750">
          </picture>
        </figure>`).join('')}
      </div>
      ${p.category === 'heim' ? `<p class="t-small t-dim mt">${swx('Szenenbilder des Herstellers; die Roboter sind real, Hintergründe teilweise digital gestaltet.', 'Scene images from the manufacturer; the robots are real, backgrounds are partly digitally created.', '场景图片来自厂商：机器人为实拍，部分背景为数字合成。')}</p>` : ''}
    </div>
  </section>` : '';

  const related = PRODUCTS.filter((o) => o.id !== p.id && (o.category === p.category || (p.useCases || []).some((u) => (o.useCases || []).includes(u))))
    .slice(0, 3);

  const useChips = (p.useCases || []).map((id) => {
    const u = USECASES.find((x) => x.id === id);
    return u ? `<a class="chip chip--blue" href="${r}einsatzbereiche/index.html#${u.slug}">${t(u.name)}</a>` : '';
  }).join('');

  /* v42 · Abschnittsnavigation, Entwicklungsfähigkeiten, Unterlagen */
  const navItems = [['ueberblick', swx('Überblick', 'Overview', '概要')]];
  if (p.variantTable) navItems.push(['varianten', swx('Versionen', 'Versions', '版本')]);
  navItems.push(['technische-daten', swx('Technische Daten', 'Specifications', '参数')]);
  if (p.dev) navItems.push(['entwicklung', swx('Entwicklung', 'Development', '开发能力')]);
  navItems.push(['unterlagen', swx('Unterlagen', 'Documents', '资料')]);
  const pdpNav = `<nav class="pdp-nav" aria-label="${esc(p.name)}">
    <div class="wrap">
      <strong>${pTitle(p)}</strong>
      <ul>${navItems.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join('')}</ul>
      <button class="btn btn--sm" type="button" data-modal-open="offer-modal" data-product="${attr(p.name)} (${esc(p.sku)})" data-sku="${esc(p.sku)}" data-pid="${esc(p.id)}">${swx('Angebot', 'Quote', '询价')}</button>
    </div>
  </nav>`;

  const ST = { ok: swx('bestätigt', 'confirmed', '已确认'), part: swx('teilweise', 'partly', '部分确认'), tbc: swx('offen', 'open', '待确认') };
  const devBlock = p.dev ? `
  <section class="section section--tight sec-light pdp-light" id="entwicklung">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${swx('Entwicklung', 'Development', '开发能力')}</p>
        <h2 style="font-size:var(--step-2)">${swx('Was Sie auf dieser Plattform selbst entwickeln können', 'What you can build on this platform yourself', '在这台平台上可以自行开发什么')}</h2>
      </div>
      <div class="vtable-wrap">
        <table class="vtable devtable">
          <thead><tr><th scope="col">${swx('Fähigkeit', 'Capability', '能力')}</th><th scope="col">${swx('Stand', 'Status', '说明')}</th><th scope="col">${swx('Bestätigt', 'Confirmed', '确认状态')}</th></tr></thead>
          <tbody>${p.dev.map(([k, v, st]) => `<tr><th scope="row">${t(k)}</th><td>${t(v)}</td><td><span class="dev-st dev-st--${st}">${ST[st]}</span></td></tr>`).join('')}</tbody>
        </table>
      </div>
      <p class="t-small t-dim mt">${swx('„Offen“ heißt: nicht im Datenblatt ausgewiesen. Wir klären diese Punkte vor dem Angebot schriftlich mit dem Hersteller.', '“Open” means: not stated in the datasheet. We clarify these points in writing with the manufacturer before quoting.', '“待确认”表示数据表中未列明，我们会在报价前与厂家书面确认。')}</p>
    </div>
  </section>` : '';

  const docMail = (d) => `mailto:${SITE.emailSales}?subject=${encodeURIComponent('Unterlagen ' + p.name + ': ' + d.de)}`;
  const docsBlock = `
  <section class="section section--tight" id="unterlagen">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${swx('Unterlagen', 'Documents', '资料')}</p>
        <h2 style="font-size:var(--step-2)">${swx('Datenblatt und Dokumentation auf Anfrage', 'Datasheet and documentation on request', '数据表与技术文档，按需索取')}</h2>
      </div>
      <ul class="doclist">${(p.docs || []).map(([d, ty]) => `<li><span class="doclist__ty">${esc(ty)}</span><span class="doclist__n">${t(d)}</span><a class="btn btn--sm btn--ghost" href="${docMail(d)}">${swx('Anfordern', 'Request', '索取')}</a></li>`).join('')}</ul>
      <p class="t-small t-dim mt">${swx('Wir senden die aktuelle Fassung per E-Mail. Alle Unterlagen im Überblick:', 'We send the current version by e-mail. All documents at a glance:', '我们会通过邮件发送最新版本。全部资料一览：')} <a href="${r}ressourcen/index.html">${swx('Technische Ressourcen', 'Technical resources', '技术资源')}</a></p>
    </div>
  </section>`;

  const html = `${head({
    title: `${p.name} — ${attr(p.family)}`,
    description: `${attr(p.name)}: ${attr(p.tagline)} Technische Daten, Preis und Angebotsanfrage bei NIC Robotics, Deutschland.`,
    path: `/produkte/${p.slug}.html`,
    image: `/assets/img/scenes/${p.hero}.jpg`,
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main">
  <section class="section" style="padding-top:calc(var(--header-h) + 2.5rem)">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${sw('Start', 'Home')}</a></li>
        <li><a href="${r}produkte/index.html">${sw('Produkte', 'Products')}</a></li>
        <li><a href="${catHref(cat, r)}">${t(cat.short)}</a></li>
        <li>${pTitle(p)}</li>
      </ol>

      <div class="pdp">
        <!-- gallery -->
        <div class="gallery" data-gallery>
          <div class="gallery__stage plinth">
            ${p.gallery && p.gallery[0] ? `<img src="${r}assets/img/products/${p.gallery[0]}.${imgExt(p.gallery[0])}" alt="${attr(p.name)} — ${attr(p.family)}" width="900" height="675" fetchpriority="high">` : ''}
          </div>
          ${(p.gallery || []).length > 1 ? `<div class="gallery__thumbs">${thumbs}</div>` : ''}
        </div>

        <!-- buy box -->
        <div class="buybox">
          <p class="buybox__brand">NIC Robotics · ${t(p.family)}</p>
          <h1>${pTitle(p)}</h1>
          <p class="buybox__tag">${t(p.tagline, 'span')}</p>
          ${p.kind === 'config' && prodOf(p.basedOn) ? `<p class="buybox__kind"><span class="kind-tag">${swx('Branchenkonfiguration', 'Industry configuration', '行业配置方案')}</span> ${swx('auf Basis der Plattform', 'built on the platform', '基于平台')} <a href="${r}produkte/${prodOf(p.basedOn).slug}.html">${pTitle(prodOf(p.basedOn))}</a></p>` : ''}

          <div class="priceline">
            ${priceHTML(p)}
            <span>${p.price == null ? swx('Wir senden Ihnen ein Angebot für Ihre Konfiguration.', 'We will send you a quote for your configuration.', '我们会按您的配置单独报价。') : sw('netto je Stück, zzgl. USt. und Versand', 'net per unit, plus VAT and shipping')}</span>
          </div>

          <div class="buybox__actions">
            <button class="btn btn--lg btn--block span-2 btn--inq" type="button" data-inq-add="${esc(p.id)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${swx('Zur Anfrageliste hinzufügen', 'Add to inquiry list', '加入询盘清单')}</button>
            <button class="btn btn--lg btn--ghost btn--block span-2" type="button"
              data-modal-open="offer-modal"
              data-product="${attr(p.name)} (${esc(p.sku)})"
              data-sku="${esc(p.sku)}" data-pid="${esc(p.id)}">${sw('Persönliches Angebot', 'Personal quote')}</button>
            <a class="btn btn--ghost btn--block span-2" href="mailto:${SITE.emailSales}?subject=${encodeURIComponent('Anfrage ' + p.name + ' (' + p.sku + ')')}">${ICON.mail} ${sw('Direkt per E-Mail anfragen', 'Enquire by e-mail')}</a>
          </div>

          <ul class="assurance">
            <li>${ICON.check}<span>${sw('Lieferung mit deutscher Rechnung und Gewährleistung', 'Delivered with a German invoice and warranty')}</span></li>
            <li>${ICON.check}<span>${sw('Einweisung und Fernunterstützung inklusive', 'Instruction and remote support included')}</span></li>
            <li>${ICON.check}<span>${sw('Ersatzteile ab Lager, Reparatur über unser RMA-Verfahren', 'Spare parts ex stock, repair through our RMA process')}</span></li>
            <li>${ICON.check}<span>${sw('Staffelpreise ab zwei Einheiten — im Angebot anfragen', 'Tiered pricing from two units — ask in the quote')}</span></li>
          </ul>

          <a class="buybox__tech" href="${r}service/kontakt.html?produkt=${encodeURIComponent(p.name)}&amp;thema=technik">${ICON.cpu} ${swx('Technische Frage zu diesem Modell stellen', 'Ask a technical question about this model', '技术问题咨询')}</a>

          <div class="sku-line">
            <span>${sw('Artikelnummer', 'Part number')}: ${esc(p.sku)}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${pdpNav}

  <!-- summary + highlights -->
  <section class="section section--tight section--flush-top" id="ueberblick">
    <div class="wrap">
      <div class="grid cols-2" style="align-items:start;gap:var(--gap-l)">
        <div class="reveal">
          <p class="kicker">${sw('Kurz gesagt', 'In short')}</p>
          <p class="t-lead" style="color:var(--fg)">${t(p.summary, 'span')}</p>
          ${useChips ? `<div class="cluster mt"><span class="t-small t-dim">${sw('Passt zu:', 'Fits:')}</span>${useChips}</div>` : ''}
        </div>
        <div class="reveal" data-delay="1">
          <ul class="highlights" style="grid-template-columns:1fr">
            ${(p.highlights || []).map((h) => `<li>${t(h, 'span')}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  </section>

  ${variantBlock}

  <!-- specs -->
  <section class="section section--tight sec-light pdp-light" id="technische-daten">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${sw('Technische Daten', 'Specifications')}</p>
        <h2 style="font-size:var(--step-2)">${swx('Die wichtigsten Werte. Das vollständige Datenblatt senden wir auf Anfrage.', 'The key figures. We send the full datasheet on request.', '主要参数一览，完整数据表可按需索取。')}</h2>
      </div>
      <div class="grid cols-2" style="align-items:start;gap:var(--gap-l)">
        <div>${specBlocks.split('</div>').slice(0, Math.ceil((p.specs || []).length / 2)).join('</div>') + '</div>'}</div>
        <div>${specBlocks.split('</div>').slice(Math.ceil((p.specs || []).length / 2)).join('</div>')}</div>
      </div>
      <p class="t-small t-dim mt-l">${sw(
        'Alle Angaben beruhen auf den offiziellen Prüfdaten des Herstellers. Die tatsächliche Leistung kann je nach Einsatzbedingungen abweichen. Änderungen und Irrtümer vorbehalten.',
        'All figures are based on the manufacturer’s official test data. Actual performance may vary with operating conditions. Subject to change and to error.'
      )}</p>
    </div>
  </section>

  ${devBlock}

  ${docsBlock}

  ${scenes}

  <!-- related -->
  ${related.length ? `
  <section class="section section--tight">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${sw('Ebenfalls im Programm', 'Also in the range')}</p>
        <h2 style="font-size:var(--step-2)">${sw('Alternativen und Ergänzungen', 'Alternatives and companions', 'span')}</h2>
      </div>
      <div class="product-grid">${related.map((o) => productCard(o, 1)).join('')}</div>
    </div>
  </section>` : ''}
</main>

${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1, `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": ${JSON.stringify(p.name)},
  "sku": ${JSON.stringify(p.sku)},
  "brand": { "@type": "Brand", "name": "NIC Robotics" },
  "description": ${JSON.stringify(attr(p.summary).replace(/<[^>]+>/g, ''))},
  "image": "${SITE.domain}/assets/img/products/${(p.gallery || [''])[0]}.${imgExt((p.gallery || [''])[0])}",
  "url": "${SITE.domain}/produkte/${p.slug}.html"${p.price != null ? `,
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": "${p.price}",
    "seller": { "@type": "Organization", "name": "An Yuan GmbH" },
    "url": "${SITE.domain}/produkte/${p.slug}.html"
  }` : ''}
}
</script>`)}`;

  write(`produkte/${p.slug}.html`, html);
}

/* ========================================================= SPARE PARTS == */
function buildSpareParts() {
  const groups = [
    ['Gelenkaktuatoren', 'Joint actuators',
     'Hüft-, Oberschenkel- und Kniemodule als Tauschteil. Werkseitig kalibriert, Austausch im Feld in unter einer Stunde.',
     'Hip, thigh and knee modules as exchange parts. Factory calibrated, field swap in under an hour.'],
    ['Akkupacks und Ladetechnik', 'Battery packs and charging',
     'Heißwechselakkus, Zweitakkus für Schichtbetrieb, Tischladegeräte und autonome Ladestationen.',
     'Hot-swap packs, second packs for shift operation, bench chargers and autonomous docks.'],
    ['Füße und Verschleißteile', 'Feet and wear parts',
     'Vollgummifüße verschleiß- und flammfest, Gelenkabdeckungen, Dichtungssätze, Schrauben- und Kleinteilesätze.',
     'Solid rubber feet, wear- and flame-resistant, joint covers, seal kits, fastener sets.'],
    ['Sensorik und Nutzlasten', 'Sensors and payloads',
     'LiDAR-Einheiten, Wärmebildkameras, Doppeloptik-Gimbals, Gassensorik, Lautsprechermodule und Halterungen.',
     'LiDAR units, thermal cameras, dual-optic gimbals, gas sensing, hailer modules and mounts.'],
    ['Gehäuse und Schutz', 'Shells and protection',
     'Rumpfschalen, Schutzgitter, Stoßschutz, Beinverkleidungen und Transportkoffer.',
     'Body shells, guards, bump protection, leg covers and transport cases.'],
    ['Fernbedienung und Zubehör', 'Remote and accessories',
     'Handsender, Folgemodule, Antennen, Kabelsätze, Mesh-Funkeinheiten und Ladekabel.',
     'Handsets, following modules, antennas, cable sets, mesh radio units and charge leads.']
  ];

  const html = `${head({
    title: 'Ersatzteile & Zubehör',
    description: 'Ersatzteile für Vierbeiner- und Rad-Bein-Roboter: Gelenkaktuatoren, Akkupacks, Gummifüße, Sensorik und Zubehör — ab Lager Deutschland, mit Teilenummer bestellbar.',
    path: '/produkte/ersatzteile.html',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main">
  <section class="page-hero page-hero--plain">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="../index.html">${sw('Start', 'Home')}</a></li>
        <li><a href="index.html">${sw('Produkte', 'Products')}</a></li>
        <li>${sw('Ersatzteile & Zubehör', 'Spare parts & accessories')}</li>
      </ol>
      <h1>${sw('Ersatzteile & Zubehör', 'Spare parts & accessories')}</h1>
      <p class="t-lead" style="max-width:62ch;margin-top:.9rem">${sw(
        'Ein Roboter, der wegen eines Gummifußes wochenlang steht, ist kein Betriebsmittel. Wir halten Verschleiß- und Austauschteile in Deutschland vor, damit Sie selbst tauschen können, statt das Gerät einzuschicken.',
        'A robot standing idle for weeks over a rubber foot is not a working asset. We hold wear and exchange parts in Germany so you can swap them yourself instead of shipping the machine away.'
      )}</p>
    </div>
  </section>

  <section class="section section--flush-top" style="padding-top:var(--gap-l)">
    <div class="wrap">
      <div class="panel panel--glow reveal mb">
        <div style="display:flex;flex-wrap:wrap;gap:var(--gap);align-items:center;justify-content:space-between">
          <div style="max-width:52ch">
            <p class="kicker">${sw('Teilekatalog in Aufbau', 'Parts catalogue in progress')}</p>
            <h2 style="font-size:var(--step-2);margin-bottom:.6rem">${sw('Teile mit Nummer, Preis und Bestand — in Kürze online.', 'Parts with numbers, prices and stock — online shortly.', 'span')}</h2>
            <p class="t-muted">${sw(
              'Der durchsuchbare Teilekatalog mit Explosionszeichnungen und Direktbestellung wird derzeit aufgebaut. Bis dahin genügt eine E-Mail mit Modell, Seriennummer und Teilebezeichnung — Sie erhalten Preis und Lieferzeit am selben Tag.',
              'The searchable parts catalogue with exploded views and direct ordering is being built. Until then, an e-mail with the model, serial number and part name is enough — you get price and lead time the same day.'
            )}</p>
          </div>
          <div class="stack">
            <a class="btn btn--lg btn--arrow" href="mailto:${SITE.emailService}?subject=${encodeURIComponent('Ersatzteilanfrage')}">${sw('Ersatzteil anfragen', 'Request a part')} ${ICON.arrow}</a>
            <a class="btn btn--ghost" href="../service/ruecksendung.html">${sw('Reparatur statt Teil?', 'Repair instead of a part?')}</a>
          </div>
        </div>
      </div>

      <div class="section-head reveal mt-l">
        <p class="kicker">${sw('Warengruppen', 'Part groups')}</p>
        <h2>${sw('Was wir führen', 'What we carry', 'span')}</h2>
      </div>
      <div class="grid cols-3">
        ${groups.map(([de, en, bde, ben], i) => `
        <div class="panel reveal" data-delay="${i % 4}">
          <h4 style="margin-bottom:.5rem">${sw(de, en)}</h4>
          <p class="t-small t-muted">${sw(bde, ben)}</p>
        </div>`).join('')}
      </div>

      <div class="section-head reveal mt-l">
        <p class="kicker">${sw('So bestellen Sie', 'How to order')}</p>
        <h2 style="font-size:var(--step-2)">${sw('Drei Angaben genügen', 'Three details are enough', 'span')}</h2>
      </div>
      <ol class="steps reveal" style="max-width:70ch">
        <li>
          <div>
            <h4>${sw('Modell und Seriennummer', 'Model and serial number')}</h4>
            <p class="t-small t-muted">${sw(
              'Die Seriennummer steht auf dem Typenschild an der Unterseite des Rumpfes. Sie entscheidet darüber, welche Revision eines Teils passt.',
              'The serial number is on the type plate on the underside of the body. It determines which revision of a part fits.'
            )}</p>
          </div>
        </li>
        <li>
          <div>
            <h4>${sw('Teil benennen oder zeigen', 'Name the part or show it')}</h4>
            <p class="t-small t-muted">${sw(
              'Teilebezeichnung, Teilenummer — oder schlicht ein Foto. Ein Bild des defekten Teils reicht uns in den meisten Fällen zur eindeutigen Identifikation.',
              'Part name, part number — or simply a photo. In most cases an image of the failed part is all we need to identify it.'
            )}</p>
          </div>
        </li>
        <li>
          <div>
            <h4>${sw('Preis und Lieferzeit am selben Tag', 'Price and lead time the same day')}</h4>
            <p class="t-small t-muted">${sw(
              'Lagerware verlässt uns am Folgetag. Bei Teilen, die wir beim Hersteller abrufen, nennen wir Ihnen die Lieferzeit verbindlich, bevor Sie bestellen.',
              'Stock items leave us the next day. For parts we call off from the manufacturer we give you a firm lead time before you order.'
            )}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1)}`;

  write('produkte/ersatzteile.html', html);
}

/* ======================================================== USE CASES ===== */
/* Anwendungsseite: Problem → Lösung → Nachweis unter jedem Szenario */
function ucDetail(u) {
  const col = (cls, num, de, en, zh, items) => items && items.length ? `
      <div class="ucd__col ucd__col--${cls}">
        <p class="ucd__h"><b class="ucd__n">${num}</b>${swx(de, en, zh)}</p>
        <ul>${items.map((x) => `<li>${t(x, 'span')}</li>`).join('')}</ul>
      </div>` : '';
  if (!(u.pains || []).length && !(u.solution || []).length) return '';
  return `
    <div class="ucd reveal">
      ${col('pain', '01', 'Die Herausforderung', 'The challenge', '现场难题', u.pains)}
      ${col('sol', '02', 'Unsere Lösung', 'Our solution', '解决方案', u.solution)}
      ${col('proof', '03', 'Bewährt im Einsatz', 'Proven in the field', '实际成效', u.proof)}
      ${(u.coming || []).length ? `<div class="ucd__soon">
        <span class="ucd__badge">${swx('Bald verfügbar', 'Coming soon', '即将上架')}</span>
        ${u.coming.map((x) => `<span>${t(x, 'span')}</span>`).join('')}
      </div>` : ''}
    </div>`;
}

/* ---------------------------------------------- Herstellerpartner (Startseite) */
function partnerBand() {
  const P = NIC.partner;
  return `
  <section class="section partner" id="partner">
    <div class="wrap">
      <div class="partner__head reveal">
        <p class="kicker">${swx('Unsere Herstellerpartner', 'Our manufacturing partners', '我们的制造合作伙伴')}</p>
        <h2><span data-i18n-de>Robotik aus der Weltspitze. <em>Service aus Deutschland.</em></span><span data-i18n-en>Robotics from the world’s best. <em>Service from Germany.</em></span><span data-i18n-zh>全球顶尖的机器人，<em>德国本地的服务。</em></span></h2>
      </div>
      <div class="partner__ranks reveal">
        ${P.ranks.map(([v, l, d]) => `<div class="prank"><b>${esc(v)}</b><span>${t(l, 'span')}</span>${d ? `<small>${t(d, 'span')}</small>` : ''}</div>`).join('')}
      </div>
      <p class="partner__src">${swx('Alle drei Ränge nach Umsatz im Geschäftsjahr 2025. Quelle: Frost & Sullivan, zitiert im Börsenprospekt des Herstellers (2026). Rangfolgen nach Stückzahl können abweichen.', 'All three rankings by revenue in fiscal year 2025. Source: Frost & Sullivan, cited in the manufacturer’s IPO prospectus (2026). Rankings by units shipped may differ.', '三项排名均按 2025 年收入计算。来源：弗若斯特沙利文（Frost & Sullivan），引自厂商 2026 年招股说明书。按出货量统计的排名可能不同。')}</p>
      <dl class="partner__nums reveal">
        ${P.numbers.map(([v, l]) => `<div><dd>${esc(v)}</dd><dt>${t(l, 'span')}</dt></div>`).join('')}
      </dl>
      <div class="partner__grid">
        <div class="partner__firsts reveal">
          <h3>${swx('Branchenpremieren', 'Industry firsts', '行业首创')}</h3>
          <ol>${P.firsts.map(([y, l]) => `<li><time>${y}</time><span>${t(l, 'span')}</span></li>`).join('')}</ol>
        </div>
        <div class="partner__std reveal">
          <h3>${swx('Normen mitgeschrieben', 'Helped write the standards', '参与制定标准')}</h3>
          <ul>${P.standards.map((l) => `<li>${t(l, 'span')}</li>`).join('')}</ul>
          <a class="link" href="referenzen/index.html">${swx('Referenzen weltweit ansehen', 'See references worldwide', '查看全球客户案例')} ${ICON.arrow}</a>
        </div>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------ Referenzen (Teaser) */
function caseTeaser() {
  const pick = ['sg-tunnel', 'eu-nuclear', 'worldcup'].map((id) => NIC.cases.find((c) => c.id === id));
  return `
  <section class="section section--tight" id="referenzen">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${swx('Referenzen', 'References', '客户案例')}</p>
        <h2>${swx('Im Einsatz — von Singapur bis an den Rhein.', 'In service — from Singapore to the Rhine.', '从新加坡到莱茵河畔，都在真实作业。')}</h2>
      </div>
      <div class="case-teaser">
        ${pick.map((c, i) => `
        <a class="ctile reveal" data-delay="${i}" href="referenzen/index.html#${c.id}">
          <picture><source srcset="assets/img/cases/${c.img}.webp" type="image/webp"><img src="assets/img/cases/${c.img}.jpg" alt="" loading="lazy" width="800" height="600"></picture>
          ${geoBadge(c, 'sm')}
          <strong>${t(c.client, 'span')}</strong>
          <span class="ctile__kpi"><b>${esc(c.result[0][0])}</b> ${t(c.result[0][1], 'span')}</span>
        </a>`).join('')}
      </div>
      <p class="mt" style="text-align:center"><a class="btn btn--ghost btn--arrow" href="referenzen/index.html">${swx('Alle Referenzen', 'All references', '全部客户案例')} ${ICON.arrow}</a></p>
    </div>
  </section>`;
}


/* ------------------------------------------------- Länder-Badges (v16) */
function starPts(cx, cy, r, rot = -90) {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const a = (rot + i * 36) * Math.PI / 180, rr = i % 2 ? r * 0.382 : r;
    p.push((cx + rr * Math.cos(a)).toFixed(2) + ',' + (cy + rr * Math.sin(a)).toFixed(2));
  }
  return p.join(' ');
}
const FLAG = {
  sg: `<rect width="30" height="10" fill="#EF3340"/><rect y="10" width="30" height="10" fill="#fff"/><circle cx="6.4" cy="5" r="3.3" fill="#fff"/><circle cx="7.7" cy="5" r="3.1" fill="#EF3340"/>${[[9.6,3],[11.4,4.3],[10.7,6.4],[8.5,6.4],[7.8,4.3]].map(([x, y]) => `<polygon points="${starPts(x, y, .75)}" fill="#fff"/>`).join('')}`,
  ch: `<rect width="30" height="20" fill="#DA291C"/><rect x="13" y="4" width="4" height="12" fill="#fff"/><rect x="9" y="8" width="12" height="4" fill="#fff"/>`,
  mx: `<rect width="10" height="20" fill="#006847"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#CE1126"/><circle cx="15" cy="10" r="2.6" fill="none" stroke="#8C6A2B" stroke-width="1.1"/><circle cx="15" cy="10" r="1" fill="#8C6A2B"/>`,
  cn: `<rect width="30" height="20" fill="#DE2910"/><polygon points="${starPts(5, 5, 3)}" fill="#FFDE00"/>${[[10, 2, 18], [12, 4, 45], [12, 7, 70], [10, 9, 18]].map(([x, y, r]) => `<polygon points="${starPts(x, y, 1, r)}" fill="#FFDE00"/>`).join('')}`,
  na: 'globe', sa: 'globe'
};
const GLOBE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z"/></svg>`;
const COUNTRY = {
  sg: { tint: '239,51,64', n: { de: 'Singapur', en: 'Singapore', zh: '新加坡' } },
  ch: { tint: '218,41,28', n: { de: 'Schweiz', en: 'Switzerland', zh: '瑞士' } },
  mx: { tint: '0,140,90', n: { de: 'Mexiko', en: 'Mexico', zh: '墨西哥' } },
  na: { tint: '60,152,247', n: { de: 'Nordamerika', en: 'North America', zh: '北美' } },
  sa: { tint: '0,170,120', n: { de: 'Südamerika', en: 'South America', zh: '南美' } },
  cn: { tint: '222,41,16', n: { de: 'China', en: 'China', zh: '中国' } }
};
const CASE_LOC = {
  'sg-tunnel': ['sg', null],
  'sg-park': ['sg', null],
  'eu-nuclear': ['ch', { de: 'Leibstadt · an der deutschen Grenze', en: 'Leibstadt · on the German border', zh: '莱布施塔特 · 紧邻德国边境' }],
  worldcup: ['mx', { de: 'Monterrey', en: 'Monterrey', zh: '蒙特雷' }],
  'na-delivery': ['na', null], 'na-warehouse': ['na', null], 'sa-factory': ['sa', null],
  substations: ['cn', { de: 'über 100 Standorte', en: '100+ sites', zh: '超过 100 座站点' }],
  'ningbo-steel': ['cn', { de: 'Ningbo', en: 'Ningbo', zh: '宁波' }],
  'nanchang-police': ['cn', { de: 'Nanchang', en: 'Nanchang', zh: '南昌' }],
  'flood-warrior': ['cn', { de: 'Zhejiang', en: 'Zhejiang', zh: '浙江' }],
  'confined-space': ['cn', { de: 'Zhejiang', en: 'Zhejiang', zh: '浙江' }],
  kekexili: ['cn', { de: 'Hoh Xil · Tibet-Hochebene', en: 'Hoh Xil · Tibetan Plateau', zh: '可可西里 · 青藏高原' }]
};
function flagSvg(code) {
  return FLAG[code] === 'globe'
    ? `<span class="geo__flag geo__flag--globe">${GLOBE}</span>`
    : `<span class="geo__flag"><svg viewBox="0 0 30 20" aria-hidden="true">${FLAG[code]}</svg></span>`;
}
function geoBadge(c, size = '') {
  const loc = CASE_LOC[c.id];
  if (!loc) return `<p class="case__place">${t(c.place, 'span')}</p>`;
  const [code, city] = loc, k = COUNTRY[code];
  return `<p class="geo${size ? ' geo--' + size : ''}" style="--cc:${k.tint}">${flagSvg(code)}<b class="geo__country">${t(k.n, 'span')}</b>${city ? `<span class="geo__city">${t(city, 'span')}</span>` : ''}</p>`;
}
function countryIndex(list) {
  const order = [];
  list.forEach((c) => { const code = (CASE_LOC[c.id] || [])[0]; if (code && !order.includes(code)) order.push(code); });
  return `<div class="geo-index reveal">${order.map((code) => {
    const k = COUNTRY[code], cs = list.filter((c) => (CASE_LOC[c.id] || [])[0] === code);
    return `<div class="geo-card" style="--cc:${k.tint}">
      <div class="geo-card__head">${flagSvg(code)}<b>${t(k.n, 'span')}</b><span class="geo-card__n">${cs.length}</span></div>
      <ul>${cs.map((c) => `<li><a href="#${c.id}" data-geo-jump>${t(c.client, 'span')}</a></li>`).join('')}</ul>
    </div>`;
  }).join('')}</div>`;
}

/* ---------------------------------------------------------- Referenzen-Seite */
const IND = [
  ['energie', 'Energie & Stromnetz', 'Energy & power grid', '能源电力'],
  ['feuerwehr', 'Brandschutz & Rettung', 'Firefighting & rescue', '应急消防'],
  ['sicherheit', 'Sicherheit & Streife', 'Security & patrol', '安防巡逻'],
  ['industrie', 'Industrielle Instandhaltung', 'Industrial O&M', '工业运维'],
  ['museum', 'Öffentliche Dienste', 'Public services', '民生服务'],
  ['logistik', 'Logistik', 'Logistics', '物流配送'],
  ['forschung', 'Bildung & Forschung', 'Education & research', '教育科研']
];
function indName(id) { const x = IND.find((i) => i[0] === id); return x ? swx(x[1], x[2], x[3]) : ''; }

function buildCases() {
  const r = '../';
  const card = (c, i) => {
    const p = prodOf(c.product);
    return `
<article class="case reveal${c.featured ? ' case--big' : ''}${i % 2 ? ' case--flip' : ''}" id="${c.id}" data-ind="${c.ind}" data-region="${c.region}">
  <div class="case__media">
    <picture><source srcset="${r}assets/img/cases/${c.img}.webp" type="image/webp"><img src="${r}assets/img/cases/${c.img}.jpg" alt="${attr(c.title)}" loading="lazy" width="1200" height="800"></picture>
    <span class="case__ind">${indName(c.ind)}</span>
  </div>
  <div class="case__body">
    ${geoBadge(c)}
    <p class="case__client">${t(c.client, 'span')}</p>
    <h2>${t(c.title, 'span')}</h2>
    <dl class="case__kpis">${c.result.map(([v, l]) => `<div><dd>${esc(v)}</dd><dt>${t(l, 'span')}</dt></div>`).join('')}</dl>
    <div class="case__text">
      <p><b>${swx('Ausgangslage', 'Challenge', '难题')}</b>${t(c.pain, 'span')}</p>
      <p><b>${swx('Lösung', 'Solution', '方案')}</b>${t(c.sol, 'span')}</p>
      ${c.gain ? `<p><b>${swx('Ergebnis', 'Result', '成效')}</b>${t(c.gain, 'span')}</p>` : ''}
    </div>
    ${p ? `<p class="case__prod"><span>${swx('Eingesetztes Modell', 'Model used', '使用机型')}</span><a class="chip chip--blue" href="${r}produkte/${p.slug}.html">${pTitle(p)}</a></p>` : ''}
  </div>
</article>`;
  };
  const band = (c, i) => `<div class="case-band"><div class="wrap wrap--case">${card(c, i)}</div></div>`;
  const intl = NIC.cases.filter((c) => c.region === 'intl');
  const cn = NIC.cases.filter((c) => c.region === 'cn');
  const gal = IND.filter(([id]) => NIC.caseGallery[id]).map(([id, de, en, zh]) => `
  <div class="cgal reveal" data-ind="${id}">
    <h3>${swx(de, en, zh)} <small>${NIC.caseGallery[id].length}</small></h3>
    <div class="cgal__grid">${NIC.caseGallery[id].map(([img, cap]) => `
      <figure><picture><source srcset="${r}assets/img/cases/${img}.webp" type="image/webp"><img src="${r}assets/img/cases/${img}.jpg" alt="${attr(cap)}" loading="lazy" width="600" height="440"></picture><figcaption>${t(cap, 'span')}</figcaption></figure>`).join('')}
    </div>
  </div>`).join('');

  const html = `${head({
    title: 'Referenzen',
    description: 'Robotik im echten Einsatz: Stromtunnel in Singapur, Kernkraftwerk Leibstadt, Fußball-WM 2026, Stahlwerk, Polizei, Hochwasserschutz und über 1.200 weitere Szenarien.',
    path: '/referenzen/',
    image: '/assets/img/cases/sg-tunnel.jpg',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main">
  <section class="page-hero">
    <div class="page-hero__media">
      <picture><source srcset="${r}assets/img/cases/sg-tunnel.webp" type="image/webp"><img src="${r}assets/img/cases/sg-tunnel.jpg" alt="" width="1400" height="870" fetchpriority="high"></picture>
    </div>
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${swx('Start', 'Home', '首页')}</a></li>
        <li>${swx('Referenzen', 'References', '客户案例')}</li>
      </ol>
      <h1 class="t-xl" style="max-width:18ch"><span data-i18n-de>Vom Labor <em>bis in den Einsatz.</em></span><span data-i18n-en>From the lab <em>to the field.</em></span><span data-i18n-zh>从实验室，<em>到真实现场。</em></span></h1>
      <p class="t-lead" style="max-width:60ch;margin-top:1.1rem">${swx(
        'Die Robotik-Plattformen, die wir anbieten, arbeiten heute in Stromnetzen, Kraftwerken, Stadien, Stahlwerken und bei Rettungsdiensten in 45 Ländern.',
        'The robotics platforms we offer are working today in power grids, power plants, stadiums, steelworks and rescue services in 45 countries.',
        '我们提供的机器人平台，正在 45 个国家和地区的电网、电站、体育场、钢厂和救援一线作业。')}</p>
      <dl class="case-stats">
        <div><dd>45</dd><dt>${swx('Länder und Regionen', 'Countries and regions', '国家和地区')}</dt></div>
        <div><dd>1.200+</dd><dt>${swx('reale Szenarien', 'real scenarios', '真实场景')}</dt></div>
        <div><dd>100+</dd><dt>${swx('Umspannwerke', 'Substations', '变电站')}</dt></div>
      </dl>
    </div>
  </section>

  <section class="cases">
    <div class="wrap">
      <div class="case-filter reveal" role="group" aria-label="Filter">
        <button type="button" class="chip is-on" data-case-filter="all">${swx('Alle', 'All', '全部')}</button>
        ${IND.map(([id, de, en, zh]) => `<button type="button" class="chip" data-case-filter="${id}">${swx(de, en, zh)}</button>`).join('')}
      </div>

    </div>

      <div class="case-group">
        <div class="wrap wrap--case"><p class="kicker">${swx('International', 'International', '国际案例')}</p></div>
        ${intl.map(band).join('')}
      </div>
      <div class="case-group">
        <div class="wrap wrap--case"><p class="kicker">${swx('China — Leitprojekte', 'China — flagship projects', '中国——标杆项目')}</p></div>
        ${cn.map(band).join('')}
      </div>

    <div class="cases-more"><div class="wrap wrap--case">
      <div class="case-group">
        <p class="kicker">${swx('Weitere Einsätze', 'More deployments', '更多现场')}</p>
        ${gal}
      </div>

      <p class="case-note">${swx(
        'Die gezeigten Einsätze wurden von unseren Herstellerpartnern und deren lokalen Partnern umgesetzt. NIC Robotics liefert dieselben Plattformen, Integration und Service für Kunden in Deutschland und Europa.',
        'The deployments shown were carried out by our manufacturing partners and their local partners. NIC Robotics supplies the same platforms, integration and service for customers in Germany and Europe.',
        '以上案例由我们的制造合作伙伴及其当地伙伴实施。NIC Robotics 为德国及欧洲客户提供同样的机器人平台、系统集成与本地服务。')}</p>

      <div class="panel panel--glow reveal mt-l" style="text-align:center">
        <h2 style="font-size:var(--step-2);margin-bottom:.7rem">${swx('Ihr Projekt als nächste Referenz?', 'Your project as the next reference?', '让您的项目成为下一个案例？')}</h2>
        <div class="cluster mt" style="justify-content:center">
          <a class="btn btn--lg btn--arrow" href="${r}service/kontakt.html">${swx('Kontakt aufnehmen', 'Contact us', '联系我们')} ${ICON.arrow}</a>
          <button class="btn btn--lg btn--ghost" type="button" data-chat-open>${swx('Live-Chat', 'Live chat', '在线咨询')}</button>
        </div>
      </div>
    </div></div>
  </section>
</main>

${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1)}`;
  write('referenzen/index.html', html);
}

function buildUseCases() {
  const tiles = USECASES.map((u, i) => `
<a class="scene-tile reveal${u.scene ? '' : ' scene-tile--empty'}" data-delay="${i % 4}" href="#${u.slug}">
  ${u.scene ? `<picture>
    <source srcset="../assets/img/scenes/${u.scene}.webp" type="image/webp">
    <img src="../assets/img/scenes/${u.scene}.jpg" alt="" loading="lazy" width="800" height="560">
  </picture>` : ''}
  <h3>${t(u.name)}</h3>
  <p>${t(u.tagline, 'span')}</p>
</a>`).join('');

  const blocks = USECASES.map((u, i) => {
    const prods = (u.products || []).map(prodOf).filter(Boolean);
    return `
<section class="section section--tight" id="${u.slug}">
  <div class="wrap">
    <article class="scenario reveal${i % 2 ? ' scenario--right' : ''}"${u.scene ? '' : ' style="background:linear-gradient(150deg,var(--ink-750),var(--ink-850));min-height:auto"'}>
      ${u.scene ? `<div class="scenario__media">
        <picture>
${sceneSources(u.scene, '../')}
          <img src="../assets/img/scenes/${u.scene}.jpg" alt="${attr(u.name)}" loading="lazy" width="1600" height="900">
        </picture>
      </div>` : ''}
      <div class="scenario__body">
        <p class="kicker">${(() => {
          const n = String(u.order).padStart(2, '0');
          return swx(n + ' · ' + u.name.de, n + ' · ' + u.name.en, n + ' · ' + (u.name.zh || u.name.de));
        })()}</p>
        <h2>${t(u.tagline, 'span')}</h2>
        ${factRow(u)}
        ${prods.length ? `<div class="scenario__links">
          <span class="t-small t-dim" style="width:100%">${sw('Geeignete Modelle', 'Suitable models')}</span>
          ${prods.map((p) => `<a class="chip chip--blue" href="../produkte/${p.slug}.html">${pTitle(p)}</a>`).join('')}
          ${u.id === 'forschung' ? `<a class="btn btn--sm btn--arrow" href="../forschung/index.html" style="margin-top:.4rem">${swx('Zu Forschung & Lehre', 'Go to Research & Teaching', '前往科研与教学')} ${ICON.arrow}</a>` : ''}
        </div>` : `<div class="scenario__links">
          <a class="btn btn--sm btn--ghost btn--arrow" href="../service/kontakt.html">${sw('Verfügbarkeit anfragen', 'Ask about availability')} ${ICON.arrow}</a>
        </div>`}
      </div>
    </article>
    ${ucDetail(u)}
  </div>
</section>`;
  }).join('');

  const html = `${head({
    title: 'Einsatzbereiche',
    description: 'Wo Vierbeiner- und Rad-Bein-Roboter wirklich arbeiten: Industrieinspektion, Energieversorgung, Feuerwehr und Rettung, Objektschutz, Museum, Forschung, Logistik und Pflege.',
    path: '/einsatzbereiche/',
    image: '/assets/img/scenes/m20-desert.jpg',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main" class="usepage">
  <section class="page-hero page-hero--tall">
    <div class="page-hero__media">
      <picture>
        <source srcset="../assets/img/scenes/m20-desert.webp" type="image/webp">
        <img src="../assets/img/scenes/m20-desert.jpg" alt="" width="1920" height="1080" fetchpriority="high">
      </picture>
    </div>
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="../index.html">${sw('Start', 'Home')}</a></li>
        <li>${sw('Einsatzbereiche', 'Applications')}</li>
      </ol>
      <h1 class="t-xl" style="max-width:20ch"><span data-i18n-de>Roboter ins Risiko. <em>Menschen in Sicherheit.</em></span><span data-i18n-en>Robots take the risk. <em>People stay safe.</em></span><span data-i18n-zh>危险交给机器人，<em>安全留给人。</em></span></h1>
      <p class="t-lead" style="max-width:58ch;margin-top:1.1rem">${swx(
        'Gefährlich, eintönig, anstrengend — das übernimmt der Roboter. Ihr Team arbeitet sicherer und schafft mehr.',
        'Dangerous, repetitive, exhausting — the robot takes it on. Your team works safer and gets more done.',
        '危险、重复、辛苦的工作由机器人完成，让团队更安全、更高效。'
      )}</p>
    </div>
  </section>

  <section class="section section--tight section--flush-top" style="padding-top:var(--gap-l)">
    <div class="wrap">
      <div class="scene-tiles">${tiles}</div>
    </div>
  </section>

  ${blocks}

  <section class="section section--tight">
    <div class="wrap">
      <div class="panel panel--glow reveal" style="text-align:center">
        <p class="kicker kicker--plain" style="justify-content:center">${sw('Ihr Einsatzfall fehlt?', 'Your application missing?')}</p>
        <h2 style="font-size:var(--step-2);margin-bottom:.7rem;max-width:26ch;margin-inline:auto">${sw('Dann nehmen wir ihn auf.', 'Then we will add it.', 'span')}</h2>
        <p class="t-muted mx-auto" style="max-width:52ch">${sw(
          'Diese Übersicht wächst mit jedem Projekt. Beschreiben Sie uns Ihre Aufgabe — wir sagen Ihnen offen, ob ein Roboter dafür heute schon die richtige Antwort ist oder noch nicht.',
          'This overview grows with every project. Describe your task — we will tell you plainly whether a robot is already the right answer for it or not yet.'
        )}</p>
        <div class="cluster mt" style="justify-content:center">
          <a class="btn btn--lg btn--arrow" href="../service/kontakt.html">${sw('Aufgabe beschreiben', 'Describe your task')} ${ICON.arrow}</a>
        </div>
      </div>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1)}`;

  write('einsatzbereiche/index.html', html);
}


/* ======================================================= HEIMROBOTER ==== */
const HOME_MOMENTS = [
  { img: 'home-family', models: 'T1 · Q1', status: 'live',
    t: ['Ein Gespräch mit Oma und Opa', 'A chat with grandma and grandpa', '陪爷爷奶奶聊聊天'],
    d: ['Der Roboter spricht von sich aus an, erkennt die Familie am Gesicht, merkt sich Vorlieben und Gesprächsthemen, spielt Musik und Ratespiele. Ein Gesprächspartner, der nie ungeduldig wird — kein Ersatz für Besuch, aber ein Anlass mehr zum Lachen.',
        'The robot starts conversations, recognises family members by face, remembers preferences and topics, plays music and guessing games. A conversation partner who never runs out of patience — no substitute for a visit, but one more reason to laugh.',
        '机器人会主动搭话，认得出家里每个人，记得住喜好和聊过的话题，还会放音乐、玩猜谜游戏。一个永远有耐心的聊天对象——代替不了家人探望，却能让家里多一些笑声。'] },
  { img: 'home-hand', models: 'T1 · T1 Pro', status: 'live',
    t: ['Hand in Hand unterwegs', 'Out and about, hand in hand', '牵着手一起走'],
    d: ['Der T1 lässt sich an der Hand führen und rollt im Schritttempo mit — durch die Wohnung, den Garten oder in den Park. Er begleitet, er stützt nicht: Körpergewicht trägt der Roboter nicht.',
        'The T1 can be led by the hand and rolls along at walking pace — through the flat, the garden or the park. It accompanies; it does not support: the robot does not carry a person’s weight.',
        'T1 可以牵着手，按步行速度跟着走——在家里、院子里，或者去公园。它是陪伴，不是助行：机器人不能承受人的体重。'] },
  { img: 'home-stairs', models: 'T1 Pro', status: 'live',
    t: ['Auch auf der Treppe dabei', 'Keeps up on the stairs too', '楼梯也跟得上'],
    d: ['Die Pro-Version erkennt die Treppe, verwandelt sich selbstständig vom Rad-Bein-Modus in den Vierbeiner und folgt nach oben oder unten — auf die Terrasse, in den Keller, zur Haustür.',
        'The Pro edition recognises the stairs, transforms by itself from wheel-legged mode into a quadruped and follows up or down — to the terrace, the cellar, the front door.',
        'Pro 版能识别楼梯，自动从轮足形态变成四足，跟着人上楼下楼——去露台、去地下室、到家门口。'] },
  { img: 'home-camp', models: 'T1 Pro', status: 'live',
    t: ['Die Hände frei', 'Hands free', '腾出双手'],
    d: ['Korb aufsetzen, bis zu 3 kg hinein — Getränke, eine Decke, der kleine Einkauf. Die Pro-Version folgt mit Last; ein- und ausladen tun Sie selbst.',
        'Put on the basket and load up to 3 kg — drinks, a blanket, a little shopping. The Pro edition follows with the load; you do the loading and unloading.',
        '装上载物筐，放进 3 kg 以内的东西——饮料、毯子、顺手买的小物件。Pro 版会载着东西跟随，装卸需要人来完成。'] },
  { img: 'home-night', models: 'T1 · T1 Pro', status: 'live',
    t: ['Abends mit Licht nach Hause', 'Home with a light in the evening', '晚上有灯陪着回家'],
    d: ['Der eingebaute Scheinwerfer leuchtet den Weg beim Abendspaziergang oder vom Auto bis zur Haustür aus — und macht den Roboter selbst gut sichtbar.',
        'The built-in searchlight lights the path on an evening walk or from the car to the front door — and makes the robot itself easy to see.',
        '内置探照灯照亮傍晚散步的小路，或者从停车处到家门口的那一段——也让机器人自己更显眼。'] },
  { img: 'home-study', models: 'T1 · Q1', status: 'live',
    t: ['Lernen mit Geduld', 'Learning with patience', '耐心的学习伙伴'],
    d: ['Englisch-Sprechtraining mit Untertiteln, grafisches Programmieren, ein KI-Grundkurs und Antworten auf jede „Warum?“-Frage. Der Roboter wird nicht müde — die Aufsicht bleibt bei den Eltern.',
        'Spoken-English practice with subtitles, graphical programming, an AI basics course and answers to every “why?”. The robot never tires — supervision stays with the parents.',
        '带字幕的英语口语练习、图形化编程、AI 启蒙课，还有对每一个“为什么”的回答。机器人不会累——但看护仍由家长负责。'] },
  { img: 'q1-party', models: 'Q1', status: 'live',
    t: ['Zusammen tanzen, zusammen spielen', 'Dance together, play together', '一起跳舞、一起玩'],
    d: ['Der Q1 tanzt ganze Choreografien mit 22 Gelenken, spielt Sprachspiele und lernt neue Bewegungen, wenn man ihm die Arme führt — der Mittelpunkt jedes Familienfests.',
        'The Q1 dances full choreographies with 22 joints, plays word games and learns new moves when you guide its arms — the centre of every family party.',
        'Q1 用 22 个关节跳完整支舞，陪玩语言游戏，握着它的手臂带一遍就能学会新动作——家庭聚会的焦点。'] },
  { img: 'q1-draw', models: 'Q1', status: 'live',
    t: ['Fantasie in Bewegung', 'Bring imagination to life', '让想象动起来'],
    d: ['Kinder erfinden Geschichten, der Q1 spielt sie mit Gesten und Stimme nach. Aussehen, Charakter und Bewegungen des Roboters lassen sich selbst gestalten — jedes Kind bekommt seinen eigenen Q1.',
        'Children make up stories and the Q1 acts them out with gestures and voice. The robot’s look, character and moves can be designed yourself — every child gets their own Q1.',
        '孩子编故事，Q1 用动作和声音演出来。机器人的外观、性格和动作都能自己设计——每个孩子都能拥有属于自己的 Q1。'] },
  { img: 'home-call', models: 'T1 · T1 Pro', status: 'ota',
    t: ['Kurz nach Hause schauen', 'Checking in at home', '远程看看家里'],
    d: ['Videoanrufe zwischen Roboter und Familie sowie Erinnerungen an Termine und Medikamenten-Uhrzeiten sind vom Hersteller angekündigt und kommen per Software-Update. Wir bestätigen den Stand bei Lieferung.',
        'Video calls between the robot and the family, and reminders for appointments and medication times, are announced by the manufacturer and will arrive via software update. We confirm the status at delivery.',
        '机器人与家人之间的远程音视频通话、日程和吃药时间提醒，厂商已公布，将通过后续 OTA 升级提供。交付时我们会确认当前状态。'] },
  { img: 'q1-dev', models: 'Q1 Explorer · T1 Pro', status: 'live',
    t: ['Für Tüftler und Entwickler', 'For tinkerers and developers', '给爱折腾的开发者'],
    d: ['Q1 Explorer öffnet SDK, HDK und USB-, Netzwerk- und Stromanschlüsse; T1 Pro bringt ein SDK und einen NVIDIA Orin Nano mit. Eigene Skills, eigene Bewegungen, eigene Anwendungen.',
        'Q1 Explorer opens SDK, HDK plus USB, network and power ports; T1 Pro adds an SDK and an NVIDIA Orin Nano. Your own skills, your own moves, your own applications.',
        'Q1 探索版开放 SDK、HDK 以及 USB、网口和供电接口；T1 Pro 提供 SDK 并搭载 Orin Nano。自己写技能、编动作、做应用。'] }
];

function buildHomeRobots() {
  const r = '../';
  const cat = CATS.find((c) => c.id === 'heim');
  const prods = inCat('heim');
  const q1 = prodOf('q1'), t1 = prodOf('t1');
  const pic = (s, alt, eager) => `<picture><source srcset="${r}assets/img/scenes/${s}.webp" type="image/webp"><img src="${r}assets/img/scenes/${s}.jpg" alt="${attr(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} width="1600" height="800"></picture>`;
  const X = (a) => swx(a[0], a[1], a[2]);

  const moments = HOME_MOMENTS.map((m, i) => `
    <article class="hm reveal${i === 0 ? ' hm--wide' : ''}" data-delay="${i % 3}">
      <div class="hm__media">${pic(m.img, m.t[0])}
        <span class="hm__models">${esc(m.models)}</span>
        ${m.status === 'ota' ? `<span class="hm__ota">${swx('Per Update angekündigt', 'Announced via update', '后续 OTA 升级')}</span>` : ''}
      </div>
      <div class="hm__body">
        <h3>${X(m.t)}</h3>
        <p>${X(m.d)}</p>
      </div>
    </article>`).join('');

  const cmp = [
    [['Bauform', 'Form', '形态'], ['Zweibeiniger Humanoid', 'Bipedal humanoid', '双足人形'], ['Rad-Bein ↔ Vierbeiner', 'Wheel-legged ↔ quadruped', '轮足 ↔ 四足']],
    [['Höhe / Gewicht', 'Height / weight', '身高 / 重量'], ['88 cm · ca. 16 kg', '88 cm · approx. 16 kg', '88 cm · 约 16 kg'], ['100 cm · ca. 16,3–16,8 kg', '100 cm · approx. 16.3–16.8 kg', '100 cm · 约 16.3–16.8 kg']],
    [['Geschwindigkeit', 'Speed', '速度'], ['1 m/s', '1 m/s', '1 m/s'], ['bis 3 m/s', 'up to 3 m/s', '最高 3 m/s']],
    [['Laufzeit', 'Runtime', '续航'], ['3 h', '3 h', '3 小时'], ['2–3 h', '2–3 h', '2–3 小时']],
    [['Stärke', 'Strength', '强项'], ['Gespräch, Tanz, Lernen, Gestalten', 'Conversation, dance, learning, creating', '聊天、舞蹈、学习、创作'], ['Begleiten, Folgen, Tragen, Licht', 'Accompanying, following, carrying, light', '随行、跟随、载物、照明']],
    [['Für wen', 'For whom', '适合谁'], ['Familien mit Kindern, Kreative, Entwickler', 'Families with children, makers, developers', '有孩子的家庭、创作者、开发者'], ['Familien mit Großeltern, Haus mit Garten', 'Families with grandparents, homes with gardens', '有长辈的家庭、带院子的住宅']]
  ];

  const html = `${head({
    title: 'Heimroboter',
    description: 'Heimroboter von NIC Robotics: der Humanoid Q1 und der wandelbare Begleitroboter T1 — für Gespräch, Spiel, Lernen und Spaziergang. Technische Daten, Alltagsszenen und Angebotsanfrage.',
    path: '/produkte/heimroboter.html',
    image: '/assets/img/scenes/home-living.jpg',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main">
  <section class="hm-hero">
    <div class="wrap hm-hero__grid">
      <div class="hm-hero__text">
        <ol class="crumbs">
          <li><a href="${r}index.html">${swx('Start', 'Home', '首页')}</a></li>
          <li><a href="${r}produkte/index.html">${swx('Produkte', 'Products', '产品中心')}</a></li>
          <li>${t(cat.name)}</li>
        </ol>
        <h1 class="t-xl"><span data-i18n-de>Ein neues Familienmitglied, <em>das mitdenkt.</em></span><span data-i18n-en>A new family member <em>who thinks.</em></span><span data-i18n-zh>家里多了一位<em>会思考的成员。</em></span></h1>
        <p class="t-lead">${t(cat.intro, 'span')}</p>
        <div class="cluster mt">
          <a class="btn btn--lg btn--arrow" href="#modelle">${swx('Modelle ansehen', 'See the models', '查看机型')} ${ICON.arrow}</a>
        </div>
      </div>
      <figure class="hm-hero__img">${pic('home-living', 'Familie im Wohnzimmer mit Heimroboter T1', true)}</figure>
    </div>
  </section>

  <section class="section section--tight" id="modelle">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${swx('Zwei Modelle', 'Two models', '两款机型')}</p>
        <h2>${swx('Klein und gesprächig — oder wandelbar und mobil.', 'Small and talkative — or transforming and mobile.', '小巧健谈，或者灵活多变。')}</h2>
      </div>
      <div class="product-grid hm-grid">${prods.map((p) => productCard(p, 1)).join('')}</div>

      <div class="vtable-wrap reveal mt-l">
        <table class="vtable hm-cmp">
          <thead><tr><th scope="col"></th><th scope="col"><a href="${r}produkte/${q1.slug}.html">Q1</a></th><th scope="col"><a href="${r}produkte/${t1.slug}.html">T1</a></th></tr></thead>
          <tbody>${cmp.map(([k, a, b]) => `<tr><th scope="row">${X(k)}</th><td>${X(a)}</td><td>${X(b)}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="section section--tight" style="background:var(--ink-850)">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${swx('Im Alltag', 'Everyday life', '生活场景')}</p>
        <h2>${swx('Momente, in denen ein Heimroboter den Unterschied macht.', 'Moments where a home robot makes the difference.', '这些时刻，家里有个机器人会不一样。')}</h2>
      </div>
      <div class="hm-list">${moments}</div>
      <p class="t-small t-dim mt">${swx(
        'Szenenbilder des Herstellers; die Roboter sind real, Hintergründe teilweise digital gestaltet.',
        'Scene images from the manufacturer; the robots are real, backgrounds are partly digitally created.',
        '场景图片来自厂商：机器人为实拍，部分背景为数字合成。')}</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <div class="hm-limits reveal">
        <div>
          <p class="kicker">${swx('Ehrlich gesagt', 'To be clear', '说清楚')}</p>
          <h2>${swx('Was ein Heimroboter nicht ist.', 'What a home robot is not.', '家庭机器人不是什么。')}</h2>
          <p class="t-muted">${swx(
            'Wir verkaufen Begleiter, keine Pflegekräfte. Damit niemand mit falschen Erwartungen kauft:',
            'We sell companions, not carers. So that no one buys with the wrong expectations:',
            '我们卖的是陪伴伙伴，不是护工。为了不让任何人带着错误期待购买：')}</p>
        </div>
        <ul>
          <li>${swx('Kein Medizin-, Pflege- oder Notrufgerät — keine Sturzerkennung, keine Vitalwerte, kein automatischer Notruf.', 'Not a medical, care or emergency device — no fall detection, no vital signs, no automatic emergency call.', '不是医疗、护理或紧急呼叫设备——没有跌倒检测、生命体征监测和自动呼救。')}</li>
          <li>${swx('Keine Gehhilfe: Der Roboter trägt kein Körpergewicht und hebt niemanden.', 'Not a walking aid: the robot carries no body weight and lifts no one.', '不是助行器：机器人不能承重，也不能搀扶或抱起人。')}</li>
          <li>${swx('Funktionen mit „per Update“ sind angekündigt, aber noch nicht ausgeliefert. Wir sagen Ihnen vor dem Kauf, was heute funktioniert.', 'Features marked “via update” are announced but not yet shipped. We tell you before purchase what works today.', '标注“后续 OTA”的功能已公布但尚未交付。购买前我们会告诉您现在能用的是哪些。')}</li>
          <li>${swx('Kamera, Mikrofon und Gesichtserkennung verarbeiten Daten. Wir klären mit Ihnen Speicherort, Löschung und Abschaltung — vor der Inbetriebnahme.', 'Camera, microphone and face recognition process data. We clarify storage location, deletion and switch-off with you — before commissioning.', '摄像头、麦克风和人脸识别会处理个人数据。投入使用前，我们会和您确认数据存放位置、删除和关闭方式。')}</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <div class="panel reveal" style="display:flex;flex-wrap:wrap;gap:var(--gap);align-items:center;justify-content:space-between">
        <div style="max-width:52ch">
          <h3 style="font-size:var(--step-1);margin-bottom:.4rem">${swx('Fragen zu Q1 oder T1?', 'Questions about Q1 or T1?', '想进一步了解 Q1 或 T1？')}</h3>
          <p class="t-small t-muted">${swx(
            'Schicken Sie uns Ihre Anfrage — wir melden uns mit Preis, Lieferzeit und dem aktuellen Softwarestand.',
            'Send us your inquiry — we will reply with price, lead time and the current software status.',
            '把询价发给我们，我们会回复价格、交期和当前的软件版本情况。')}</p>
        </div>
        <div class="cluster">
          <button class="btn btn--lg btn--inq" type="button" data-inq-add="t1">${swx('T1 anfragen', 'Enquire T1', '询价 T1')}</button>
          <button class="btn btn--lg btn--ghost btn--inq" type="button" data-inq-add="q1">${swx('Q1 anfragen', 'Enquire Q1', '询价 Q1')}</button>
        </div>
      </div>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1)}`;

  write('produkte/heimroboter.html', html);
}

/* ===================================================== REINIGUNGSROBOTER == */
const CLEAN_SCENES = [
  { ic: 'cart', img: 'clean-supermarket', t: ['Supermarkt & Lebensmittelhandel', 'Supermarkets & grocery', '超市与生鲜卖场'],
    p: ['Reinigung nach Ladenschluss, wenn kaum Personal zu finden ist; Fettspuren an Frischetheken, Reifenspuren der Hubwagen.', 'Cleaning after closing, when staff are hard to find; grease near fresh counters, pallet-truck tyre marks.', '闭店后清洁，夜班很难招人；生鲜区油污、地牛轮胎印。'],
    s: ['Startet zeitgesteuert nach Ladenschluss, scheuert mit 25 kg Anpressdruck in einem Durchgang und ist bis zur Öffnung wieder an der Station.', 'Starts on schedule after closing, scrubs with 25 kg down pressure in one pass and is back at the station before opening.', '闭店后定时启动，25 kg 对地压力一遍洗净，开门前自动回到工作站。'],
    k: [['bis 1.980 m²/h', 'up to 1,980 m²/h', '最高 1,980 m²/h'], ['25 kg', '25 kg', '25 kg 压力']] },
  { ic: 'mall', img: 'clean-mall', t: ['Einkaufszentrum', 'Shopping centre', '购物中心'],
    p: ['Große Laufflächen auf mehreren Ebenen, Reinigung auch während der Öffnungszeiten.', 'Large walkways on several levels, cleaning during opening hours too.', '多层大面积通道，营业时间也要保洁。'],
    s: ['Erkennt Passanten in Echtzeit und weicht aus, arbeitet mit ≤ 70 dB(A), ruft selbst den Aufzug und wechselt die Etage.', 'Recognises passers-by in real time and avoids them, runs at ≤ 70 dB(A), calls the lift itself and changes floors.', '实时识别行人并避让，噪音 ≤70 dB(A)，自行呼叫电梯跨楼层清洁。'],
    k: [['≤ 70 dB(A)', '≤ 70 dB(A)', '≤70 dB(A)'], ['Fährt Aufzug', 'Rides lifts', '乘梯']] },
  { ic: 'plane', img: 'clean-airport', t: ['Flughafen & Bahnhof', 'Airport & station', '机场与车站'],
    p: ['Wartehallen und lange Gänge rund um die Uhr in Betrieb, kurze Reinigungsfenster.', 'Waiting halls and long corridors in use around the clock, short cleaning windows.', '候车候机厅、长廊全天运转，清洁窗口很短。'],
    s: ['Trockenwischen bis zu 8 h am Stück für den Tagbetrieb, Nassreinigung in der Nacht; Lücken werden erkannt und nachgereinigt.', 'Dust mopping for up to 8 h at a stretch by day, wet scrubbing at night; missed areas are detected and re-cleaned.', '白天尘推连续 8 小时，夜间洗地；漏扫区域自动识别并补扫。'],
    k: [['8 h Trockenwischen', '8 h dust mopping', '尘推 8 小时'], ['3 h Scheuern', '3 h scrubbing', '洗地 3 小时']] },
  { ic: 'factory', img: 'clean-factory', t: ['Industrie- & Logistikhalle', 'Industrial & logistics hall', '工厂与物流仓库'],
    p: ['Beton- und Epoxidböden mit Staub, Abrieb und Ölflecken; große, offene Flächen.', 'Concrete and epoxy floors with dust, abrasion and oil stains; large open areas.', '水泥、环氧地坪上的粉尘、磨损和油渍；面积大、空间开阔。'],
    s: ['Kehren und Scheuern in einem Durchgang über 840 mm Breite inklusive Seitenbürsten; 45-L-Tanks für lange Bahnen.', 'Sweeping and scrubbing in one pass across 840 mm including side brushes; 45 L tanks for long runs.', '含边刷 840 mm 宽幅扫洗一次完成；45 L 水箱适合长距离作业。'],
    k: [['840 mm Breite', '840 mm width', '840 mm 宽幅'], ['2 × 45 L', '2 × 45 L', '清/污水各 45 L']] },
  { ic: 'clinic', img: 'clean-hospital', t: ['Klinik & Pflegeeinrichtung', 'Clinic & care facility', '医院与养老机构'],
    p: ['Lange Flure, dokumentationspflichtige Reinigung, wenig Zeit des Personals für Routineflächen.', 'Long corridors, cleaning that must be documented, little staff time for routine areas.', '走廊长、清洁需要留痕，护理人员没时间顾及日常区域。'],
    s: ['Reinigt Flure nach Plan und erstellt automatisch Berichte; die Station hält den Schmutzwassertank sauber und geruchsfrei.', 'Cleans corridors on schedule and generates reports automatically; the station keeps the dirty-water tank clean and odour-free.', '按计划清洁走廊并自动生成报告；工作站保持污水箱清洁无异味。'],
    k: [['Auto-Berichte', 'Auto reports', '自动报告'], ['4 min Selbstreinigung', '4 min self-rinse', '4 分钟自洁']] },
  { ic: 'office', img: 'clean-office', t: ['Bürogebäude & Hotel', 'Office building & hotel', '写字楼与酒店'],
    p: ['Lobbys und Erschließungsflächen über viele Etagen, Zutritt nur mit Karte.', 'Lobbies and circulation areas over many floors, access by card only.', '大堂和公共区域分布在多个楼层，进出需要门禁。'],
    s: ['Anbindung an Zutrittskontrolle und Aufzug; Start per Knopfdruck, App oder Cloud-Zeitplan.', 'Integration with access control and lifts; start by button, app or cloud schedule.', '联动门禁与电梯；一键、手机或云端定时启动。'],
    k: [['Zutrittskontrolle', 'Access control', '门禁联动'], ['App · Cloud', 'App · cloud', '手机 · 云端']] }
];
const CLEAN_IC = {
  cart: '<path d="M3 4h2l2.4 11h10.2l2-8H6.2"/><circle cx="9" cy="19" r="1.6"/><circle cx="17" cy="19" r="1.6"/>',
  mall: '<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/>',
  plane: '<path d="M2 16l20-6-3-2-6 1-5-6H6l2 7-4 1-2-1z"/>',
  factory: '<path d="M3 20V10l6 3V10l6 3V6h6v14z"/>',
  clinic: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/>',
  office: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>'
};

function buildCleaning() {
  const r = '../';
  const cat = CATS.find((c) => c.id === 'reinigung');
  const prods = inCat('reinigung');
  const X = (a) => swx(a[0], a[1], a[2]);
  const pic2 = (sc, alt) => `<picture><source srcset="${r}assets/img/scenes/${sc}.webp" type="image/webp"><img src="${r}assets/img/scenes/${sc}.jpg" alt="${attr(alt)}" fetchpriority="high" width="1920" height="1080"></picture>`;
  const scenes = CLEAN_SCENES.map((s, i) => `
    <article class="cs reveal${fs.existsSync(path.join(ROOT, 'assets/img/scenes', s.img + '.jpg')) ? ' cs--img' : ''}" data-delay="${i % 3}">
      ${fs.existsSync(path.join(ROOT, 'assets/img/scenes', s.img + '.jpg')) ? `<div class="cs__media"><picture><source srcset="${r}assets/img/scenes/${s.img}.webp" type="image/webp"><img src="${r}assets/img/scenes/${s.img}.jpg" alt="${attr(s.t[0])}" loading="lazy" width="1200" height="750"></picture></div>` : ''}
      <span class="cs__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${CLEAN_IC[s.ic]}</svg></span>
      <h3>${X(s.t)}</h3>
      <p class="cs__p"><b>${swx('Problem', 'Pain point', '痛点')}</b>${X(s.p)}</p>
      <p class="cs__s"><b>${swx('Lösung', 'Solution', '解决方式')}</b>${X(s.s)}</p>
      <div class="cs__k">${s.k.map((k) => `<span>${X(k)}</span>`).join('')}</div>
    </article>`).join('');

  const html = `${head({
    title: 'Gewerbliche Reinigungsroboter',
    description: 'Autonome Reinigungsroboter für Supermarkt, Einkaufszentrum, Flughafen, Industriehalle, Klinik und Büro: Kehren, Scheuern und Wischen mit bis zu 1.920 m²/h. Technische Daten und Angebotsanfrage.',
    path: '/produkte/reinigungsroboter.html',
    image: '/assets/img/scenes/c5-room.jpg',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main">
  <section class="hm-hero">
    <div class="wrap hm-hero__grid">
      <div class="hm-hero__text">
        <ol class="crumbs">
          <li><a href="${r}index.html">${swx('Start', 'Home', '首页')}</a></li>
          <li><a href="${r}produkte/index.html">${swx('Produkte', 'Products', '产品中心')}</a></li>
          <li>${t(cat.name)}</li>
        </ol>
        <h1 class="t-xl"><span data-i18n-de>Saubere Böden, <em>auch nachts.</em></span><span data-i18n-en>Clean floors, <em>even at night.</em></span><span data-i18n-zh>地面干净，<em>夜里也不停。</em></span></h1>
        <p class="t-lead">${t(cat.intro, 'span')}</p>
        <div class="cluster mt">
          <a class="btn btn--lg btn--arrow" href="#modelle">${swx('Modelle ansehen', 'See the models', '查看机型')} ${ICON.arrow}</a>
        </div>
      </div>
      <figure class="hm-hero__img">${pic2('c5-room', 'Reinigungsroboter C5 mit Station')}</figure>
    </div>
  </section>

  <section class="section section--tight" style="padding-top:0">
    <div class="wrap">
      <dl class="cl-facts reveal">
        <div><dd>1.980 m²/h</dd><dt>${swx('Flächenleistung theoretisch (C5)', 'Theoretical area performance (C5)', '理论清洁效率（C5）')}</dt></div>
        <div><dd>3 in 1</dd><dt>${swx('Kehren · Scheuern · Wischen', 'Sweep · scrub · mop', '扫地 · 洗地 · 尘推')}</dt></div>
        <div><dd>600 mm</dd><dt>${swx('schmalster Durchgang (C4)', 'narrowest passage (C4)', '最窄通过宽度（C4）')}</dt></div>
        <div><dd>0 ${swx('Handgriffe', 'touches', '人工')}</dd><dt>${swx('Laden, Wasser, Tankreinigung an der Station', 'charging, water, tank rinse at the station', '充电、加排水、清洗水箱全由工作站完成')}</dt></div>
      </dl>
    </div>
  </section>

  <section class="section section--tight" id="modelle">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${swx('Modelle', 'Models', '机型')}</p>
        <h2>${swx('C4 für enge Wege, C5 für große Flächen.', 'C4 for narrow routes, C5 for large areas.', '窄通道选 C4，大场地选 C5。')}</h2>
      </div>
      <div class="product-grid hm-grid">${prods.map((p) => productCard(p, 1)).join('')}

      </div>
    </div>
  </section>

  <section class="section section--tight" style="background:var(--ink-850)">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${swx('Typische Einsätze', 'Typical deployments', '典型部署场景')}</p>
        <h2>${swx('Wo ein Reinigungsroboter sich rechnet.', 'Where a cleaning robot pays off.', '清洁机器人在哪些地方最划算。')}</h2>
      </div>
      <div class="cs-grid">${scenes}</div>
      <p class="t-small t-dim mt">${swx(
        'Umgebungsbilder des Herstellers zur Veranschaulichung, keine Kundenreferenzen. Leistungsangaben nach Datenblatt des Herstellers. Die tatsächliche Flächenleistung hängt von Grundriss, Möblierung und Verschmutzungsgrad ab — wir rechnen sie für Ihre Fläche vor Ort durch.',
        'Environment images from the manufacturer for illustration, not customer references. Performance figures from the manufacturer datasheet. Actual area performance depends on layout, furnishing and soiling — we calculate it for your floor on site.',
        '场景图片为厂商提供的环境示意，并非客户案例。性能数据来自厂商参数表。实际清洁效率取决于平面布局、陈设和脏污程度——我们会到现场按您的面积测算。')}</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <div class="hm-limits reveal">
        <div>
          <p class="kicker">${swx('Vorab prüfen', 'Check first', '先确认')}</p>
          <h2>${swx('Passt C4 oder C5 zu Ihrer Fläche?', 'Does the C4 or C5 suit your floor?', 'C4 或 C5 适合您的场地吗？')}</h2>
          <p class="t-muted">${swx('Diese Punkte klären wir bei der Begehung — vor dem Angebot.', 'We clarify these points during the site visit — before the quote.', '这些问题我们会在报价前的现场勘察中确认。')}</p>
        </div>
        <ul>
          <li>${swx('Nur Innenbereich und Hartböden — nicht für Außenflächen, Kühlhäuser oder Teppich. C5: 0–40 °C, IPX3.', 'Indoors and hard floors only — not for outdoor areas, cold stores or carpet. C5: 0–40 °C, IPX3.', '仅限室内硬质地面——不适用于室外、冷库和地毯。C5：0–40 °C，IPX3。')}</li>
          <li>${swx('Durchgänge ab 600 mm (C4) bzw. 800 mm (C5); beim C5 Schwellen bis 15 mm und Steigungen bis 2 %.', 'Passages from 600 mm (C4) or 800 mm (C5); for the C5 thresholds up to 15 mm and slopes up to 2 %.', '通道宽度 C4 ≥600 mm、C5 ≥800 mm；C5 门槛 ≤15 mm、坡度 ≤2%。')}</li>
          <li>${swx('Hartböden: Beton, Marmor, Epoxid, PVC, Hartstoffestrich.', 'Hard floors: concrete, marble, epoxy, PVC, hard-aggregate screed.', '硬质地面：水泥、大理石、环氧、PVC、金刚砂。')}</li>
          <li>${swx('Station mit 230 V; Wasseranschluss oder optionaler mobiler Tank. Für Aufzug und Türen klären wir die Schnittstellen mit Ihrer Haustechnik.', 'Station on 230 V; water connection or optional mobile tank. We clarify lift and door interfaces with your building services.', '工作站需 230 V 供电；接水管或选配移动水箱。电梯和门禁接口我们会与您的物业工程部对接。')}</li>
        </ul>
      </div>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1)}`;

  write('produkte/reinigungsroboter.html', html);
}


/* ======================================================== v42 · FORSCHUNG == */
const RS_NEEDS = [
  { id: 'bewegung',
    models: ['lite3'],
    why: ['Leicht (ab 12 kg) und damit im Labor gut handhabbar; URDF- und Simulationsmodell laut Datenblatt; Low-Level-Regelung bis 1 kHz.', 'Light (from 12 kg) and easy to handle in the lab; URDF and simulation model per datasheet; low-level control up to 1 kHz.', '整机 12 kg 起，实验室内易于搬运；数据表列明 URDF 与仿真模型；底层控制最高 1 kHz。'],
    opt: ['VENTURE oder PRO, wenn ein eigener Rechner per Ethernet angebunden wird. Zugriff auf Gelenkebene und nutzbare Regelfrequenz: vom Hersteller zu bestätigen.', 'VENTURE or PRO if you connect your own computer over Ethernet. Joint-level access and usable control rate: to be confirmed by the manufacturer.', '如需通过以太网连接自有计算机，建议 VENTURE 或 PRO。关节级访问与可用控制频率：待厂家确认。'] },
  { id: 'wahrnehmung',
    models: ['lite3', 'lynx-m20-pro'],
    why: ['Lite3 LIDAR mit autonomer Navigation, PRO mit aktiver Hindernisvermeidung nach vorn; Lynx M20 Pro mit dreifachem Industrierechner, Gigabit-Ethernet und USB 3.0.', 'Lite3 LIDAR with autonomous navigation, PRO with forward active obstacle avoidance; Lynx M20 Pro with three industrial computers, Gigabit Ethernet and USB 3.0.', 'Lite3 LIDAR 版具备自主导航，PRO 版具备前向主动避障；Lynx M20 Pro 配备三台工业计算单元、千兆以太网与 USB 3.0。'],
    opt: ['Lite3 LIDAR oder PRO; beim M20 Pro eigene Sensoren über die Datenschnittstellen. SDK- und ROS-Umfang für M20: vom Hersteller zu bestätigen.', 'Lite3 LIDAR or PRO; on the M20 Pro, own sensors via the data interfaces. SDK and ROS scope for M20: to be confirmed by the manufacturer.', 'Lite3 选 LIDAR 或 PRO 版；M20 Pro 可通过数据接口接入自有传感器。M20 的 SDK 与 ROS 支持范围：待厂家确认。'] },
  { id: 'manipulation',
    models: ['x30', 'x50', 'dr02', 'q1'],
    why: ['X30 und X50 tragen 20 bzw. 50 kg dauerhaft und bieten damit Reserve für einen Arm samt Rechner. DR02: Humanoid mit 275 TOPS Rechenleistung (optional 2.070 TOPS). Q1: kleiner Humanoid mit 22 Freiheitsgraden und SDK/HDK in der Explorer-Version.', 'X30 and X50 carry 20 and 50 kg continuously, leaving reserve for an arm plus computer. DR02: humanoid with 275 TOPS computing (2,070 TOPS optional). Q1: small humanoid with 22 degrees of freedom and SDK/HDK in the Explorer edition.', 'X30 与 X50 可持续负载 20 kg 和 50 kg，为加装机械臂与计算单元留有余量。DR02：人形机器人，标配 275 TOPS 算力（可选 2070 TOPS）。Q1：22 自由度小型人形，探索版提供 SDK/HDK。'],
    opt: ['Arm, Greifer und deren mechanische und elektrische Anbindung sind nicht Teil des Datenblatts — Montagepunkte, Stromversorgung und Schnittstellen: vom Hersteller zu bestätigen.', 'Arm, gripper and their mechanical and electrical integration are not part of the datasheet — mounting points, power supply and interfaces: to be confirmed by the manufacturer.', '机械臂、夹爪及其机械与电气接入不在数据表范围内——安装位、供电与接口：待厂家确认。'] },
  { id: 'interaktion',
    models: ['lite3', 'q1'],
    why: ['Lite3: Sprachsteuerung, visuelles Folgen und Formationen mit mehreren Geräten laut Datenblatt — klein genug für Studien mit Probanden. Q1: Sprache, Bild, Berührung und Gesichtserkennung in einem 88 cm großen Humanoiden.', 'Lite3: voice control, visual following and multi-unit formations per datasheet — small enough for studies with participants. Q1: voice, vision, touch and face recognition in an 88 cm humanoid.', 'Lite3：数据表列明语音控制、视觉跟随与多机编队，体型小，适合有受试者参与的研究。Q1：88 cm 人形，集语音、视觉、触摸与人脸识别于一身。'],
    opt: ['Für Mehrroboter-Versuche mehrere Lite3 derselben Version. Zugriff auf Rohdaten von Kamera und Mikrofon sowie Datenschutz-Einstellungen: vom Hersteller zu bestätigen.', 'For multi-robot experiments, several Lite3 of the same version. Access to raw camera and microphone data and privacy settings: to be confirmed by the manufacturer.', '多机实验建议选用同一版本的多台 Lite3。摄像头与麦克风原始数据的访问方式及隐私设置：待厂家确认。'] },
  { id: 'feld',
    models: ['x30', 'x50', 'lynx-m20s'],
    why: ['X30: IP67, −20 °C bis 55 °C, 20 kg Nutzlast, SDK für C++ / Python laut Datenblatt. X50: 50 kg Dauerlast für schwere Messtechnik. Lynx M20 S: IP67, bis 35 kg Nutzlast, Gigabit-Ethernet, USB und GMSL.', 'X30: IP67, −20 °C to 55 °C, 20 kg payload, SDK for C++ / Python per datasheet. X50: 50 kg continuous payload for heavy instruments. Lynx M20 S: IP67, up to 35 kg payload, Gigabit Ethernet, USB and GMSL.', 'X30：IP67，−20 °C 至 55 °C，20 kg 负载，数据表列明 C++ / Python SDK。X50：持续负载 50 kg，可搭载较重的测量设备。Lynx M20 S：IP67，负载最高 35 kg，千兆以太网、USB 与 GMSL。'],
    opt: ['Nutzlast-Halterung und Stromversorgung für eigene Messtechnik klären wir mit Ihnen vor dem Angebot.', 'We clarify payload mounting and power for your own instruments with you before quoting.', '自有测量设备的安装与供电方案，我们会在报价前与您确认。'] },
  { id: 'lehre',
    models: ['lite3'],
    why: ['Robuste Plattform in vier Versionen; Sprachsteuerung, Bewegungsbibliothek und Mehrgeräte-Formationen laut Datenblatt; Ersatzteile und Reparatur über uns in Deutschland.', 'Robust platform in four versions; voice control, motion library and multi-unit formations per datasheet; spare parts and repair through us in Germany.', '四个版本的耐用平台；数据表列明语音控制、动作库与多机编队；备件与维修由我们在德国提供。'],
    opt: ['Staffelpreise ab zwei Einheiten. Lehrinhalte und Kurse bieten wir nicht an — wir liefern Hardware, Unterlagen und Service.', 'Tiered pricing from two units. We do not offer course content — we supply hardware, documents and service.', '两台起可享阶梯价格。我们不提供课程内容——我们提供硬件、技术资料与服务。'] }
];
/* Titel, Kurztext und Symbol stehen in partials.js (RS_MENU) — eine Quelle für Menü und Seite */
RS_NEEDS.forEach((n) => Object.assign(n, P.RS_MENU.find((m) => m.id === n.id)));

function buildResearch() {
  const r = '../';
  const ST = { ok: swx('bestätigt', 'confirmed', '已确认'), part: swx('teilweise', 'partly', '部分确认'), tbc: swx('offen', 'open', '待确认') };
  const needs = RS_NEEDS.map((n, i) => {
    const ms = n.models.map(prodOf).filter(Boolean);
    return `
<article class="rs-need reveal" id="${n.id}">
  <div class="rs-need__head">
    <span class="mi-ic">${P.MENU_ICON[n.ic] || ''}</span>
    <div><p class="kicker">${String(i + 1).padStart(2, '0')}</p><h2>${swx(...n.t)}</h2><p class="t-dim">${swx(...n.q)}</p></div>
  </div>
  <div class="rs-need__models">${ms.map((p) => `
    <a class="rs-model" href="${r}produkte/${p.slug}.html">
      <img src="${r}assets/img/products/${p.gallery[0]}.webp" alt="" loading="lazy" width="200" height="150">
      <span><strong>${pTitle(p)}</strong><small>${t(p.family)}</small></span>
    </a>`).join('')}</div>
  <dl class="rs-need__dl">
    <div><dt>${swx('Warum geeignet', 'Why it fits', '为什么合适')}</dt><dd>${swx(...n.why)}</dd></div>
    <div><dt>${swx('Version und Optionen', 'Version and options', '版本与选配')}</dt><dd>${swx(...n.opt)}</dd></div>
  </dl>
  <p class="rs-need__links"><a href="${r}ressourcen/index.html#${ms[0].slug}">${swx('Unterlagen anfordern', 'Request documents', '索取技术资料')} ${ICON.arrow}</a></p>
</article>`;
  }).join('');

  const devProds = ['lite3', 'x30', 'x50', 'lynx-m20-pro', 'lynx-m20s'].map(prodOf).filter((p) => p && p.dev);
  const devTables = devProds.map((p) => `
  <div class="rs-dev">
    <h3><a href="${r}produkte/${p.slug}.html#entwicklung">${pTitle(p)}</a></h3>
    <ul>${p.dev.map(([k, v, st]) => `<li><span class="dev-st dev-st--${st}">${ST[st]}</span><span><b>${t(k)}</b> — ${t(v)}</span></li>`).join('')}</ul>
  </div>`).join('');

  const html = `${head({
    title: 'Forschung & Lehre',
    description: 'Offene Roboterplattformen für Hochschulen und Forschungsinstitute: Lite3, X30 und Lynx M20 für Bewegungsregelung, Wahrnehmung, Feldforschung und Lehre — mit Unterlagen und Service in Deutschland.',
    path: '/forschung/',
    image: '/assets/img/scenes/lite3-hero.jpg',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main" class="rspage">
  <section class="page-hero page-hero--plain">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${swx('Start', 'Home', '首页')}</a></li>
        <li>${swx('Forschung & Lehre', 'Research & Teaching', '科研与教学')}</li>
      </ol>
      <p class="kicker">${swx('Forschung & Lehre', 'Research & Teaching', '科研与教学')}</p>
      <h1 class="t-xl" style="max-width:20ch">${swx('Offene Roboterplattformen für Labor, Feld und Hörsaal.', 'Open robot platforms for lab, field and lecture hall.', '面向实验室、野外与课堂的开放机器人平台。')}</h1>
      <p class="t-lead" style="max-width:62ch;margin-top:1rem">${swx(
        'Wählen Sie nach Ihrer Forschungsfrage, nicht nach dem Katalog. Wir liefern Hardware, Unterlagen und Service aus Deutschland — mit Angebot und Rechnung, die zu Hochschulbeschaffung passen.',
        'Choose by your research question, not by the catalogue. We supply hardware, documents and service from Germany — with quotes and invoices that fit university procurement.',
        '按研究问题选型，而不是按目录。我们从德国提供硬件、技术资料与服务，报价与发票符合高校采购流程。')}</p>
      <ul class="rs-jump">${RS_NEEDS.map((n) => `<li><a href="#${n.id}">${swx(...n.t)}</a></li>`).join('')}</ul>
    </div>
  </section>

  <section class="section sec-light">
    <div class="wrap rs-needs">${needs}</div>
  </section>

  <section class="section" id="entwicklungsfaehigkeit">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="kicker">${swx('Checkliste', 'Checklist', '开发能力清单')}</p>
        <h2 style="font-size:var(--step-2)">${swx('Was bestätigt ist — und was wir noch klären', 'What is confirmed — and what we still clarify', '哪些已确认，哪些仍在核实')}</h2>
        <p class="t-dim" style="max-width:62ch">${swx('„Bestätigt“ heißt: im Datenblatt ausgewiesen. „Offen“ klären wir vor dem Angebot schriftlich mit dem Hersteller.', '“Confirmed” means: stated in the datasheet. We clarify “open” items in writing with the manufacturer before quoting.', '“已确认”表示数据表中已列明；“待确认”的项目，我们会在报价前与厂家书面确认。')}</p>
      </div>
      <div class="rs-devgrid">${devTables}</div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <div class="cat-help">
        <div>
          <h3>${swx('Beschreiben Sie Ihr Vorhaben', 'Describe your project', '告诉我们您的研究计划')}</h3>
          <p>${swx('Forschungsfrage, geplante Sensorik, Software-Stack und Stückzahl genügen. Wir antworten mit einer Versionsempfehlung und den offenen Punkten.', 'Research question, planned sensors, software stack and quantity are enough. We reply with a version recommendation and the open points.', '告诉我们研究问题、计划使用的传感器、软件栈与数量即可。我们会回复版本建议以及仍需确认的事项。')}</p>
        </div>
        <a class="btn btn--arrow" href="${r}service/kontakt.html?thema=technik&amp;produkt=${encodeURIComponent('Forschung')}">${swx('Anfrage senden', 'Send enquiry', '发送咨询')} ${ICON.arrow}</a>
      </div>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1)}`;
  write('forschung/index.html', html);
}

/* ======================================================= v42 · RESSOURCEN == */
function buildResources() {
  const r = '../';
  const groups = CATS.filter((c) => inCat(c.id).length).map((c) => `
  <div class="res-group reveal">
    <h2>${t(c.name)}</h2>
    ${inCat(c.id).map((p) => `
    <div class="res-prod" id="${p.slug}">
      <a class="res-prod__head" href="${r}produkte/${p.slug}.html">
        <img src="${r}assets/img/products/${p.gallery[0]}.webp" alt="" loading="lazy" width="120" height="90">
        <span><strong>${pTitle(p)}</strong><small>${t(p.family)}</small></span>
      </a>
      <ul class="doclist doclist--compact">${(p.docs || []).map(([d, ty]) => `<li><span class="doclist__ty">${esc(ty)}</span><span class="doclist__n">${t(d)}</span><a class="btn btn--sm btn--ghost" href="mailto:${SITE.emailSales}?subject=${encodeURIComponent('Unterlagen ' + p.name + ': ' + d.de)}">${swx('Anfordern', 'Request', '索取')}</a></li>`).join('')}</ul>
    </div>`).join('')}
  </div>`).join('');

  const html = `${head({
    title: 'Technische Ressourcen',
    description: 'Datenblätter, Bedienungsanleitungen, SDK-Dokumentation und Simulationsmodelle zu allen Robotern von NIC Robotics — auf Anfrage per E-Mail.',
    path: '/ressourcen/',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main" class="respage">
  <section class="page-hero page-hero--plain">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${swx('Start', 'Home', '首页')}</a></li>
        <li>${swx('Technische Ressourcen', 'Technical resources', '技术资源')}</li>
      </ol>
      <p class="kicker">${swx('Technische Ressourcen', 'Technical resources', '技术资源')}</p>
      <h1 class="t-xl" style="max-width:20ch">${swx('Datenblätter und Dokumentation zu jedem Modell.', 'Datasheets and documentation for every model.', '每款机型的数据表与技术文档。')}</h1>
      <p class="t-lead" style="max-width:62ch;margin-top:1rem">${swx(
        'Wir senden Ihnen die jeweils aktuelle Fassung per E-Mail, meist am selben Werktag. Ein Klick auf „Anfordern“ öffnet eine vorbereitete Nachricht.',
        'We send you the current version by e-mail, usually the same working day. Clicking “Request” opens a prepared message.',
        '我们会通过邮件发送最新版本，通常当个工作日内回复。点击“索取”即可打开已填好的邮件。')}</p>
      <p class="mt"><a class="btn btn--ghost btn--arrow" href="${r}forschung/index.html#entwicklungsfaehigkeit">${swx('Entwicklungsfähigkeiten im Überblick', 'Development capabilities at a glance', '开发能力一览')} ${ICON.arrow}</a></p>
    </div>
  </section>
  <section class="section sec-light">
    <div class="wrap res-wrap">${groups}</div>
  </section>
</main>

${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1)}`;
  write('ressourcen/index.html', html);
}

/* ========================================================= v42 · VERGLEICH == */
function buildCompare() {
  const r = '../';
  const pick = PRODUCTS.slice().sort((a, b) => CATS.findIndex((c) => c.id === a.category) - CATS.findIndex((c) => c.id === b.category) || (a.order || 99) - (b.order || 99))
    .map((p) => `<label class="cmp-pick"><input type="checkbox" data-cmp="${esc(p.id)}"> <span>${pTitle(p)}</span></label>`).join('');
  const html = `${head({
    title: 'Produktvergleich',
    description: 'Bis zu vier Roboter von NIC Robotics nebeneinander vergleichen — technische Daten, Versionen und Typ.',
    path: '/produkte/vergleich.html',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main" class="cmppage">
  <section class="page-hero page-hero--plain cat-hero">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${swx('Start', 'Home', '首页')}</a></li>
        <li><a href="${r}produkte/index.html">${swx('Produkte', 'Products', '产品')}</a></li>
        <li>${swx('Vergleich', 'Compare', '产品比较')}</li>
      </ol>
      <h1>${swx('Modelle vergleichen', 'Compare models', '产品比较')}</h1>
      <p class="t-lead">${swx('Wählen Sie zwei bis vier Modelle. Gleiche Werte sind grau, Unterschiede bleiben hervorgehoben.', 'Choose two to four models. Identical values are greyed out, differences stay highlighted.', '选择 2–4 款机型。相同数值显示为灰色，差异保持高亮。')}</p>
    </div>
  </section>
  <section class="section sec-light">
    <div class="wrap">
      <div class="cmp-picks">${pick}</div>
      <p class="cf-empty" data-cmp-empty>${swx('Bitte mindestens zwei Modelle auswählen.', 'Please choose at least two models.', '请至少选择两款机型。')}</p>
      <div class="vtable-wrap" data-cmp-table data-root="${r}"></div>
      <p class="t-small t-dim mt">${swx('Werte laut Datenblatt des Herstellers; „—“ = für dieses Modell nicht angegeben. Preise auf Anfrage.', 'Values per manufacturer datasheet; “—” = not stated for this model. Prices on request.', '数值来自厂家数据表；“—”表示该机型未列明。价格请询价。')}</p>
    </div>
  </section>
</main>

${cmpBar()}
${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1)}`;
  write('produkte/vergleich.html', html);
}

/* ============================================================ v48 · ROI == */
/* Feld: [name, [de,en,zh], Einheit, Standardwert, [Hinweis de,en,zh] | null, Optionen]
   opt: { adv: true } = unter „Weitere Annahmen“, { ex: true } = Beispielwert-Kennzeichen */
const ROI_F = {
  preis:   ['preis',   ['Anschaffungspreis je Roboter (netto)', 'Purchase price per robot (net)', '单台采购价（不含税）'], '€', '', ['Ihr Angebotspreis. Wir zeigen bewusst keinen Platzhalterpreis.', 'Your quoted price. We deliberately show no placeholder price.', '填入您的报价。我们不显示占位价格。'], { req: true }],
  anzahl:  ['anzahl',  ['Anzahl Roboter', 'Number of robots', '机器人台数'], '', 1, null, { step: 1, min: 1 }],
  einmal:  ['einmal',  ['Einmalige Kosten', 'One-off costs', '一次性费用'], '€', 0, ['Inbetriebnahme, Schulung, Ladestation, Zubehör', 'Commissioning, training, charging station, accessories', '部署调试、培训、充电桩、配件'], { adv: true }],
  betrieb: ['betrieb', ['Betriebskosten pro Jahr', 'Operating costs per year', '每年运行成本'], '€', 0, ['Wartung, Strom, Akkutausch, Software, Versicherung', 'Maintenance, power, battery replacement, software, insurance', '维护、电费、电池更换、软件、保险'], { adv: true }],
  jahre:   ['jahre',   ['Nutzungsdauer', 'Service life', '使用年限'], ['Jahre', 'years', '年'], 5, null, { adv: true, step: 1, min: 1 }],
  faktor:  ['faktor',  ['Arbeitgeber-Zuschlag', 'Employer on-costs', '雇主附加成本'], '%', 25, ['Sozialabgaben, Urlaub, Krankheit. Beispielannahme. Bei Fremdvergabe: Verrechnungssatz oben eintragen und hier 0 setzen.', 'Social contributions, holiday, sickness. Example assumption. If outsourced: enter the billing rate above and set this to 0.', '社保、带薪假、病假。示例假设。若为外包：上面填服务商计费单价，这里填 0。'], { adv: true, ex: true }]
};
const F = (k, over = {}) => { const f = ROI_F[k].slice(); if (over.def !== undefined) f[3] = over.def; if (over.hint) f[4] = over.hint; f[5] = Object.assign({}, f[5] || {}, over.opt || {}); return f; };

const ROI_CALCS = [
  { id: 'streife', ic: 'sicherheit', kind: 'labor',
    t: ['Inspektion & Sicherheit', 'Inspection & security', '巡检与安保'],
    q: ['Streifen- und Inspektionsgänge, die ein Roboter übernimmt.', 'Patrol and inspection rounds a robot takes over.', '由机器人承担的巡逻与巡检。'],
    prods: ['patrol-m20', 'x30', 'lynx-m20-pro'],
    groups: [
      [['Investition', 'Investment', '投入'], [F('preis'), F('anzahl')]],
      [['Betrieb', 'Operation', '运行'], [
        ['std', ['Betriebsstunden pro Tag', 'Operating hours per day', '每天运行小时'], 'h', 8, ['Reine Einsatzzeit ohne Laden. Laufzeit je Akkuladung siehe Datenblatt.', 'Pure operating time without charging. Runtime per charge: see datasheet.', '不含充电的实际作业时间。单次续航见数据表。'], { max: 24 }],
        ['tage', ['Betriebstage pro Jahr', 'Operating days per year', '每年运行天数'], '', 365, null, { step: 1, max: 366 }]
      ]],
      [['Personal heute', 'Staff today', '现有人工'], [
        ['lohn', ['Stundenlohn (brutto) oder Verrechnungssatz', 'Hourly wage (gross) or billing rate', '时薪（税前）或外包单价'], '€/h', 15.15, ['Beispiel: Tarif Sicherheitsdienst Sachsen ab 02/2026. Bitte Ihren Wert eintragen.', 'Example: security services tariff, Saxony, from 02/2026. Please enter your value.', '示例：萨克森州安保行业集体工资，2026 年 2 月起。请填入您的数值。'], { ex: true }],
        ['zuschlag', ['Ø Zuschlag Nacht / Wochenende', 'Avg. night / weekend premium', '夜班/周末平均补贴'], '%', 0, ['Gemittelt über alle Betriebsstunden', 'Averaged over all operating hours', '按全部运行小时平均'], {}]
      ]],
      [['Weitere Annahmen', 'More assumptions', '更多假设'], [
        ['abdeckung', ['Aufgabenabdeckung', 'Task coverage', '任务覆盖率'], '%', 70, ['Anteil der Tätigkeit, den der Roboter übernimmt. Beispielannahme.', 'Share of the job the robot takes over. Example assumption.', '机器人能承担的工作比例。示例假设。'], { adv: true, ex: true, max: 100 }],
        ['aufsicht', ['Betreuung durch Personal', 'Supervision by staff', '人工看护'], ['h/Tag', 'h/day', '小时/天'], 1, ['Leitstand, Akkuwechsel, Störungen', 'Control room, battery swap, faults', '监控、换电、处理异常'], { adv: true, ex: true }],
        F('faktor'), F('einmal'), F('betrieb'), F('jahre')
      ]]
    ] },
  { id: 'reinigung', ic: 'garantie', kind: 'clean',
    t: ['Gewerbliche Reinigung', 'Commercial cleaning', '商业清洁'],
    q: ['Bodenreinigung großer Flächen mit C4 oder C5.', 'Floor cleaning of large areas with C4 or C5.', '用 C4 或 C5 清洁大面积地面。'],
    prods: ['c4', 'c5'],
    groups: [
      [['Investition', 'Investment', '投入'], [F('preis'), F('anzahl')]],
      [['Fläche', 'Area', '面积'], [
        ['flaeche', ['Bodenfläche je Reinigung', 'Floor area per cleaning', '每次清洁面积'], 'm²', 3000, null, { step: 50 }],
        ['freq', ['Reinigungen pro Monat', 'Cleanings per month', '每月清洁次数'], '', 22, null, { step: 1 }]
      ]],
      [['Personal heute', 'Staff today', '现有人工'], [
        ['leistMensch', ['Ihr Leistungswert heute', 'Your current performance rate', '目前的人工效率定额'], 'm²/h', 250, ['Manuell oder mit handgeführter Maschine. Beispielwert, bitte Ihren Kalkulationswert eintragen.', 'Manual or with a walk-behind machine. Example value, please enter your own rate.', '纯人工或手推洗地机。示例值，请填入您自己的定额。'], { ex: true }],
        ['lohn', ['Stundenlohn (brutto) oder Verrechnungssatz', 'Hourly wage (gross) or billing rate', '时薪（税前）或外包单价'], '€/h', 15, ['Branchenmindestlohn Gebäudereinigung, Lohngruppe 1, seit 01.01.2026', 'Sector minimum wage, building cleaning, wage group 1, since 01.01.2026', '德国清洁行业最低工资（工资组 1），2026 年 1 月 1 日起'], {}]
      ]],
      [['Weitere Annahmen', 'More assumptions', '更多假设'], [
        ['leistRobot', ['Flächenleistung Roboter (Praxis)', 'Robot area rate (in practice)', '机器人实际清洁效率'], 'm²/h', 350, ['Praxis-Richtwert 200–800 m²/h laut Branchen-Fallstudie; Herstellerangabe theoretisch bis 1.400 (C4) bzw. 1.980 m²/h (C5).', 'Practical guide value 200–800 m²/h per industry case study; manufacturer figure theoretically up to 1,400 (C4) or 1,980 m²/h (C5).', '行业实测参考 200–800 m²/h；厂家理论值最高 1,400（C4）/ 1,980 m²/h（C5）。'], { adv: true }],
        ['rest', ['Manuelle Restfläche', 'Manual remainder', '仍需人工的面积'], '%', 10, ['Ränder, Ecken, verstellte Bereiche. Laut Fallstudie mindestens 10 %.', 'Edges, corners, obstructed areas. At least 10 % per case study.', '边角与被遮挡区域。案例研究建议至少 10%。'], { adv: true, max: 100 }],
        ['ruest', ['Betreuung je Einsatz', 'Attendance per run', '每次看护时间'], ['min', 'min', '分钟'], 15, ['Wasser, Schmutztank, Start', 'Water, waste tank, start', '加水、倒污水、启动'], { adv: true, ex: true }],
        F('faktor'), F('einmal'), F('betrieb'), F('jahre')
      ]]
    ] },
  { id: 'humanoid', ic: 'industrie', kind: 'labor',
    t: ['Humanoide in der Fertigung', 'Humanoids in production', '工厂人形机器人'],
    q: ['Szenariorechnung: einfache, wiederkehrende Tätigkeiten.', 'Scenario calculation: simple, repetitive tasks.', '情景测算：简单重复性工作。'],
    prods: ['dr02'],
    groups: [
      [['Investition', 'Investment', '投入'], [F('preis'), F('anzahl')]],
      [['Betrieb', 'Operation', '运行'], [
        ['std', ['Betriebsstunden pro Tag', 'Operating hours per day', '每天运行小时'], 'h', 8, ['Reine Einsatzzeit ohne Laden', 'Pure operating time without charging', '不含充电的实际作业时间'], { max: 24 }],
        ['tage', ['Betriebstage pro Jahr', 'Operating days per year', '每年运行天数'], '', 250, null, { step: 1, max: 366 }]
      ]],
      [['Personal heute', 'Staff today', '现有人工'], [
        ['lohn', ['Stundenlohn (brutto)', 'Hourly wage (gross)', '时薪（税前）'], '€/h', 13.9, ['Untergrenze: gesetzlicher Mindestlohn seit 01.01.2026. Bitte Ihren Lohn eintragen.', 'Lower bound: statutory minimum wage since 01.01.2026. Please enter your wage.', '下限：德国法定最低工资（2026 年 1 月 1 日起）。请填入实际工资。'], {}],
        ['zuschlag', ['Ø Schichtzuschlag', 'Avg. shift premium', '平均轮班补贴'], '%', 0, null, {}]
      ]],
      [['Weitere Annahmen', 'More assumptions', '更多假设'], [
        ['abdeckung', ['Aufgabenabdeckung', 'Task coverage', '任务覆盖率'], '%', 50, ['Anteil der Tätigkeit, den der Roboter übernimmt. Beispielannahme.', 'Share of the job the robot takes over. Example assumption.', '机器人能承担的工作比例。示例假设。'], { adv: true, ex: true, max: 100 }],
        ['tempo', ['Tempo im Vergleich zum Menschen', 'Speed compared with a person', '相对人工的速度'], '%', 60, ['Beispielannahme', 'Example assumption', '示例假设'], { adv: true, ex: true }],
        ['aufsicht', ['Betreuung durch Personal', 'Supervision by staff', '人工看护'], ['h/Tag', 'h/day', '小时/天'], 1, null, { adv: true, ex: true }],
        F('faktor'), F('einmal'), F('betrieb'), F('jahre')
      ]]
    ] },
  { id: 'feuerwehr', ic: 'feuerwehr', kind: 'fire',
    t: ['Feuerwehr & Gefahrenabwehr', 'Fire & hazard response', '消防与应急'],
    q: ['Weniger Menschen im Gefahrenbereich.', 'Fewer people in the danger zone.', '让更少的人进入危险区。'],
    prods: ['fire-cannon', 'fire-recon', 'x50'],
    groups: [
      [['Investition', 'Investment', '投入'], [F('preis'), F('anzahl')]],
      [['Einsätze', 'Operations', '出动情况'], [
        ['einsaetze', ['Einsätze im Gefahrenbereich pro Jahr', 'Operations in the danger zone per year', '每年进入危险区的出动次数'], '', 20, ['Beispielwert', 'Example value', '示例值'], { ex: true, step: 1 }],
        ['personen', ['Einsatzkräfte im Gefahrenbereich je Einsatz', 'Responders in the danger zone per operation', '每次进入危险区的人数'], '', 2, ['Beispielwert', 'Example value', '示例值'], { ex: true, step: 1 }],
        ['minuten', ['Aufenthalt je Einsatz', 'Time inside per operation', '每次停留时间'], ['min', 'min', '分钟'], 30, ['Beispielwert', 'Example value', '示例值'], { ex: true }],
        ['anteil', ['Davon übernimmt der Roboter', 'Share the robot takes over', '其中由机器人承担'], '%', 50, ['Erkundung, Kühlung, Löschangriff aus der Distanz. Beispielannahme.', 'Reconnaissance, cooling, remote fire attack. Example assumption.', '侦察、冷却、远程灭火。示例假设。'], { ex: true, max: 100 }]
      ]],
      [['Vermeidbare Kosten (optional, Ihre Werte)', 'Avoidable costs (optional, your values)', '可避免的损失（选填，请用您自己的数据）'], [
        ['verl', ['Verletzungen je 100 Einsätze', 'Injuries per 100 operations', '每 100 次出动的受伤人次'], '', '', ['Aus Ihrer eigenen Unfallstatistik. Wir geben hier bewusst keinen Wert vor.', 'From your own accident statistics. We deliberately give no default here.', '来自贵单位的事故统计。此处我们不提供默认值。'], { adv: true }],
        ['ausfall', ['Ausfalltage je Verletzung', 'Days lost per injury', '每次受伤离岗天数'], '', '', null, { adv: true }],
        ['tagkosten', ['Kosten je Ausfalltag', 'Cost per day lost', '每个离岗日的成本'], '€', '', ['Lohnfortzahlung und Vertretung', 'Continued pay and cover', '工资续付与顶班'], { adv: true }],
        ['dauer', ['Anteil dauerhaft dienstunfähig', 'Share permanently unfit for duty', '其中永久离岗的比例'], '%', '', null, { adv: true, max: 100 }],
        ['ausbildung', ['Ausbildungsaufwand je Einsatzkraft', 'Training cost per responder', '每名队员的培训投入'], '€', 51264, ['Beispiel: 18 Monate Anwärterbezüge inkl. Sonderzuschlag (Berufsfeuerwehr Köln), ohne Lehrgangs- und Ausbilderkosten.', 'Example: 18 months of trainee pay incl. special allowance (Cologne fire service), excluding course and instructor costs.', '示例：18 个月见习工资含特别补贴（科隆职业消防队），不含课程与教官成本。'], { adv: true, ex: true }],
        ['stillstand', ['Vermiedener Sach- und Stillstandsschaden pro Jahr', 'Avoided property and downtime loss per year', '每年避免的财产与停产损失'], '€', '', ['Für Werkfeuerwehren: Ihre eigene Schätzung', 'For plant fire brigades: your own estimate', '适用于企业专职消防队：请自行估算'], { adv: true }],
        F('einmal'), F('betrieb'), F('jahre', { def: 8 })
      ]]
    ] },
  { id: 'pflege', ic: 'pflege', kind: 'care',
    t: ['Pflege & Betreuung', 'Care & companionship', '养老陪伴'],
    q: ['Zeit für Pflege freispielen, nicht Pflege ersetzen.', 'Free up time for care, not replace care.', '为护理腾出时间，而不是替代护理。'],
    prods: ['q1', 't1'],
    groups: [
      [['Investition', 'Investment', '投入'], [F('preis'), F('anzahl')]],
      [['Einsatz', 'Use', '使用情况'], [
        ['bewohner', ['Betreute Personen je Roboter', 'People supported per robot', '每台机器人服务的人数'], '', 10, ['Beispielwert', 'Example value', '示例值'], { ex: true, step: 1 }],
        ['minuten', ['Übernommene Zeit je Person und Tag', 'Time taken over per person and day', '每人每天由机器人承担的时间'], ['min', 'min', '分钟'], 10, ['Erinnern, Unterhaltung, Aktivierung, einfache Botengänge. Beispielannahme.', 'Reminders, conversation, activation, simple errands. Example assumption.', '提醒、陪聊、活动引导、简单跑腿。示例假设。'], { ex: true }],
        ['tage', ['Einsatztage pro Jahr', 'Days of use per year', '每年使用天数'], '', 365, null, { step: 1, max: 366 }]
      ]],
      [['Personal', 'Staff', '人员'], [
        ['lohn', ['Stundenlohn Pflegehilfskraft (brutto)', 'Hourly wage, care assistant (gross)', '护理助理时薪（税前）'], '€/h', 16.52, ['Pflegemindestlohn für Pflegehilfskräfte seit 01.07.2026', 'Care minimum wage for care assistants since 01.07.2026', '德国护理助理最低工资，2026 年 7 月 1 日起'], {}]
      ]],
      [['Weitere Annahmen', 'More assumptions', '更多假设'], [F('faktor'), F('einmal'), F('betrieb'), F('jahre')]]
    ] }
];

function buildRoi() {
  const r = '../';
  const tx = (a) => Array.isArray(a) ? swx(...a) : esc(a);
  const field = (cid, f) => {
    const [name, label, unit, def, hint, o = {}] = f;
    const id = `roi-${cid}-${name}`;
    return `<div class="roi-f${o.req ? ' roi-f--req' : ''}">
      <label for="${id}">${swx(...label)}${o.ex ? ` <span class="roi-ex">${swx('Beispiel', 'example', '示例')}</span>` : ''}</label>
      <div class="roi-in"><input id="${id}" name="${name}" type="number" inputmode="decimal" min="${o.min !== undefined ? o.min : 0}"${o.max ? ` max="${o.max}"` : ''} step="${o.step || 'any'}" value="${def}"${o.req ? ' placeholder="—"' : ''}>${unit ? `<span>${tx(unit)}</span>` : ''}</div>
      ${hint ? `<p class="roi-hint">${swx(...hint)}</p>` : ''}
    </div>`;
  };
  const panel = (c, i) => `
  <form class="roi-panel" id="rechner-${c.id}" data-roi="${c.kind}" data-roi-id="${c.id}" data-roi-name="${attr({ de: c.t[0], en: c.t[1], zh: c.t[2] })}"${i ? ' hidden' : ''} novalidate>
    <a class="roi-mini" href="#ergebnis-${c.id}" data-roi-mini aria-live="polite"></a>
    <div class="roi-inputs">
      <p class="roi-q">${swx(...c.q)}</p>
      ${c.id === 'reinigung' ? `<div class="roi-seg" role="group">
        <label><input type="radio" name="modell" value="c4" checked><span>C4</span></label>
        <label><input type="radio" name="modell" value="c5"><span>C5</span></label>
      </div>` : ''}
      ${c.groups.map(([gt, fs]) => fs.every((f) => (f[5] || {}).adv)
        ? `<details class="roi-adv"><summary>${swx(...gt)}</summary><div class="roi-grid">${fs.map((f) => field(c.id, f)).join('')}</div></details>`
        : `<fieldset><legend>${swx(...gt)}</legend><div class="roi-grid">${fs.map((f) => field(c.id, f)).join('')}</div></fieldset>`).join('')}
      <button class="btn btn--lg btn--arrow roi-go" type="button" data-roi-go>${swx('Jetzt berechnen', 'Calculate now', '立即测算')} ${ICON.arrow}</button>
      <p class="roi-models">${swx('Passende Modelle:', 'Matching models:', '对应机型：')} ${c.prods.map(prodOf).filter(Boolean).map((p) => `<a href="${r}produkte/${p.slug}.html">${pTitle(p)}</a>`).join(' · ')}</p>
    </div>
    <aside class="roi-out" id="ergebnis-${c.id}">
      <p class="roi-out__k">${swx('Ihr Ergebnis · Schätzung', 'Your result · estimate', '测算结果 · 估算')}</p>
      <div data-roi-result><p class="roi-info">${swx('Werte eintragen und „Jetzt berechnen“ drücken. Erscheint hier kein Ergebnis, bitte die Seite neu laden.', 'Enter your values and press “Calculate now”. If no result appears here, please reload the page.', '填入数值后点击“立即测算”。如果这里没有出现结果，请刷新页面。')}</p></div>
      <a class="btn btn--arrow roi-cta" data-roi-cta href="${r}service/kontakt.html">${swx('Mit diesen Werten Angebot anfragen', 'Request a quote with these values', '带着这组数值询价')} ${ICON.arrow}</a>
      <p class="roi-note">${swx('Unverbindliche Beispielrechnung auf Basis Ihrer Eingaben, alle Beträge netto. Kein Leistungsversprechen.', 'Non-binding example calculation based on your inputs, all amounts net. Not a performance promise.', '基于您输入数值的示例测算，不具约束力，金额均不含税，不构成效果承诺。')}</p>
    </aside>
  </form>`;

  const SRC = [
    [['Gesetzlicher Mindestlohn 13,90 €/h seit 01.01.2026', 'Statutory minimum wage €13.90/h since 01.01.2026', '德国法定最低工资 13.90 €/小时，2026-01-01 起'], 'Mindestlohngesetz'],
    [['Gebäudereinigung, Lohngruppe 1: 15,00 €/h seit 01.01.2026 (Verordnung gültig bis 31.12.2026)', 'Building cleaning, wage group 1: €15.00/h since 01.01.2026 (ordinance valid until 31.12.2026)', '清洁行业工资组 1：15.00 €/小时，2026-01-01 起（条例有效期至 2026-12-31）'], '10. GebäudeArbbV'],
    [['Pflegemindestlohn Pflegehilfskräfte: 16,52 €/h seit 01.07.2026', 'Care minimum wage, care assistants: €16.52/h since 01.07.2026', '护理助理最低工资：16.52 €/小时，2026-07-01 起'], 'PflegeArbbV · Bundesregierung'],
    [['Sicherheitsdienst Sachsen, unterste Vergütungsgruppe: 15,15 €/h ab 01.02.2026', 'Security services Saxony, lowest pay group: €15.15/h from 01.02.2026', '萨克森州安保行业最低工资组：15.15 €/小时，2026-02-01 起'], 'ZEFAS Sachsen'],
    [['Scheuersaugroboter in der Praxis: Ø ca. 350 m²/h im Test, Richtwert 200–800 m²/h, mind. 10 % der Fläche manuell', 'Scrubber robots in practice: avg. approx. 350 m²/h in test, guide value 200–800 m²/h, at least 10 % of the area manual', '洗地机器人实测：平均约 350 m²/h，参考范围 200–800 m²/h，至少 10% 面积需人工'], 'WKO Fallstudie Scheuersaug-Roboter'],
    [['Anwärterbezüge Brandmeister-Ausbildung, 18 Monate: ca. 1.499 € + ca. 1.349 € Sonderzuschlag pro Monat', 'Trainee pay, firefighter training, 18 months: approx. €1,499 + approx. €1,349 special allowance per month', '消防员培训 18 个月见习工资：每月约 1,499 € + 约 1,349 € 特别补贴'], 'Stadt Köln, Berufsfeuerwehr']
  ];

  const html = `${head({
    title: 'ROI-Rechner',
    description: 'Rechnen Sie selbst: Wann amortisiert sich ein Roboter für Inspektion, Reinigung, Fertigung, Feuerwehr oder Pflege? Mit Ihren Zahlen, offenen Annahmen und Quellen.',
    path: '/rechner/',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main" class="roipage">
  <section class="page-hero page-hero--plain">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${swx('Start', 'Home', '首页')}</a></li>
        <li>${swx('ROI-Rechner', 'ROI calculator', '投资回报测算')}</li>
      </ol>
      <p class="kicker">${swx('ROI-Rechner', 'ROI calculator', '投资回报测算')}</p>
      <h1 class="t-xl" style="max-width:18ch">${swx('Wann rechnet sich Ihr Roboter?', 'When does your robot pay off?', '您的机器人多久回本？')}</h1>
      <p class="t-lead" style="max-width:60ch;margin-top:1rem">${swx(
        'Einsatzbereich wählen, Preis und Ihre Zahlen eintragen, Ergebnis sofort sehen. Jede Annahme ist sichtbar und lässt sich ändern.',
        'Choose the application, enter the price and your figures, see the result at once. Every assumption is visible and can be changed.',
        '选择应用场景，填入价格和您的数据，立即看到结果。每一项假设都公开可见，并且可以修改。')}</p>
    </div>
  </section>

  <section class="section sec-light roi-sec">
    <div class="wrap">
      <div class="roi-tabs" role="tablist">${ROI_CALCS.map((c, i) => `
        <button type="button" role="tab" aria-selected="${i ? 'false' : 'true'}" data-roi-tab="${c.id}"><span class="mi-ic">${P.MENU_ICON[c.ic] || ''}</span>${swx(...c.t)}</button>`).join('')}
      </div>
      ${ROI_CALCS.map(panel).join('')}
    </div>
  </section>

  <section class="section section--tight" id="methode">
    <div class="wrap roi-method">
      <div>
        <p class="kicker">${swx('So rechnen wir', 'How we calculate', '计算方法')}</p>
        <h2 style="font-size:var(--step-2)">${swx('Offene Formeln statt Versprechen', 'Open formulas instead of promises', '公开公式，而不是承诺')}</h2>
        <ol class="roi-formula">${[
          [['Gesamtinvestition', 'Total investment', '总投入'], ['Preis × Anzahl + einmalige Kosten', 'price × units + one-off costs', '单价 × 台数 + 一次性费用']],
          [['Personalkosten je Stunde', 'Staff cost per hour', '每小时人工成本'], ['Stundenlohn × (1 + Arbeitgeber-Zuschlag) × (1 + Schichtzuschlag)', 'hourly wage × (1 + employer on-costs) × (1 + shift premium)', '时薪 ×（1 + 雇主附加成本）×（1 + 轮班补贴）']],
          [['Ersparnis pro Jahr', 'Saving per year', '年净节省'], ['Betriebsstunden × Aufgabenabdeckung × Tempo × Personalkosten − Betreuung − Betriebskosten', 'operating hours × task coverage × speed × staff cost − supervision − operating costs', '运行小时 × 任务覆盖率 × 速度系数 × 人工成本 − 看护成本 − 运行成本']],
          [['Amortisation', 'Payback', '回本时间'], ['Gesamtinvestition ÷ Ersparnis pro Jahr', 'total investment ÷ saving per year', '总投入 ÷ 年净节省']]
        ].map(([l, f]) => `<li><b>${swx(...l)}</b> = ${swx(...f)}</li>`).join('')}
        </ol>
        <p class="t-small t-dim">${swx('Reinigung: eingesparte Stunden = Fläche × Häufigkeit ÷ Ihr Leistungswert, abzüglich manueller Restfläche und Betreuung. Feuerwehr und Pflege zeigen bewusst keine Amortisation, sondern vermiedene Gefahrenstunden bzw. freigespielte Pflegezeit.', 'Cleaning: hours saved = area × frequency ÷ your performance rate, minus manual remainder and attendance. Fire and care deliberately show no payback, but avoided hazard hours and freed-up care time.', '清洁：节省工时 = 面积 × 频次 ÷ 您的效率定额，再减去人工补扫和看护时间。消防与养老不显示回本时间，而是显示减少的危险暴露小时和腾出的护理时间。')}</p>
      </div>
      <div>
        <p class="kicker">${swx('Quellen der Vorgabewerte', 'Sources of default values', '默认值来源')}</p>
        <ul class="roi-src">${SRC.map(([t3, s]) => `<li>${swx(...t3)}<small>${esc(s)}</small></li>`).join('')}</ul>
        <p class="t-small t-dim">${swx('Stand: November 2026. Als „Beispiel“ markierte Werte sind Annahmen ohne amtliche Quelle. Bitte durch Ihre eigenen Zahlen ersetzen.', 'As of November 2026. Values marked “example” are assumptions without an official source. Please replace them with your own figures.', '数据截至 2026 年 11 月。标注“示例”的数值是没有官方来源的假设，请替换为您自己的数据。')}</p>
      </div>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1)}`;
  write('rechner/index.html', html);
}

/* ============================================================ v47 · 404 == */
function build404() {
  let html = `${head({
    title: 'Seite nicht gefunden',
    description: 'Diese Seite gibt es nicht (mehr). Zurück zu Produkten, Anwendungen oder Kontakt.',
    path: '/404.html',
    depth: 0
  })}
${header(CATS, PRODUCTS, 0)}

<main id="main">
  <section class="nf">
    <div>
      <img class="nf__img" src="assets/img/products/lite3-main.webp" alt="" width="420" height="315">
      <p class="nf__code">404</p>
      <h1>${swx('Hier ist der Roboter falsch abgebogen.', 'Our robot took a wrong turn here.', '机器人在这里走错了路。')}</h1>
      <p>${swx('Die Seite gibt es nicht oder nicht mehr. Von hier aus geht es weiter:', 'This page does not exist or no longer exists. Carry on from here:', '该页面不存在或已移除。可以从这里继续：')}</p>
      <div class="nf__links">
        <a class="btn btn--arrow" href="produkte/index.html">${swx('Alle Roboter', 'All robots', '全部机器人')} ${ICON.arrow}</a>
        <a class="btn btn--ghost" href="forschung/index.html">${swx('Forschung & Lehre', 'Research & Teaching', '科研与教学')}</a>
        <a class="btn btn--ghost" href="einsatzbereiche/index.html">${swx('Anwendungen', 'Applications', '行业应用')}</a>
        <a class="btn btn--ghost" href="service/kontakt.html">${swx('Kontakt', 'Contact', '联系我们')}</a>
      </div>
    </div>
  </section>
</main>

${footer(CATS, 0)}
${offerModal(0)}
${quickView()}
${scripts(0)}`;
  html = html.replace('<head>', '<head>\n<base href="/">').replace('<meta name="robots" content="index, follow">', '');
  html = html.replace('</head>', '<meta name="robots" content="noindex">\n</head>');
  write('404.html', html);
}

module.exports = { NIC, CATS, PRODUCTS, USECASES, write, prodOf, inCat, productCard, buildHome, buildProductIndex, buildProduct, buildSpareParts, buildUseCases };

/* ============================================================== RUN ===== */
if (require.main === module) {
  console.log('Building NIC Robotics …');
  buildHome();
  buildProductIndex();
  PRODUCTS.forEach(buildProduct);
  buildSpareParts();
  buildUseCases();
  buildCases();
  buildHomeRobots();
  buildCleaning();
  buildResearch();
  buildResources();
  buildCompare();
  build404();
  buildRoi();
  require('./build-pages').run();
  const missing = reportMissingZh();
  console.log(missing ? `\nFertig — aber ${missing} UI-Strings ohne Chinesisch.` : '\nDone. DE · EN · ZH vollständig.');
}
