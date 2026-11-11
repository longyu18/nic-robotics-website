/* ==========================================================================
   NIC ROBOTICS — main.js
   --------------------------------------------------------------------------
   Aufbau:
     1  Helfer
     2  Sprache (DE · EN · ZH)
     3  Global, einmalig gebunden: Kopfzeile, Navigation, Modals, Quick View
     4  Pro Seite, nach jedem Wechsel erneut: Reveal, Galerie, Tabs, Filter,
        Uploads, Formulare, Hero-Video
     5  Navigation: holt die Zielseite per fetch und tauscht <main> aus.
        Ohne JavaScript bleiben es ganz normale Links.
   Kein Framework, keine Abhängigkeiten.
   ========================================================================== */
(function () {
  'use strict';

  /* ============================== 1 · HELFER ============================= */
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var LANGS = ['de', 'en', 'zh'];
  var LANG_KEY = 'nic-lang';

  function lang() {
    var l = document.documentElement.getAttribute('lang');
    return LANGS.indexOf(l) === -1 ? 'de' : l;
  }

  /** Aktiven String aus einer {de,en,zh}-Tabelle holen. */
  function s(table) { return table[lang()] || table.de; }

  /** Aktiven String aus einem Katalogobjekt holen. */
  function L(o) {
    if (!o) return '';
    if (typeof o === 'string') return o;
    return o[lang()] || o.de || '';
  }

  function money(n) {
    try { return new Intl.NumberFormat('de-DE').format(n); } catch (e) { return String(n); }
  }

  function escHtml(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Pfad-Präfix zum Seitenstamm, abhängig von der aktuellen Tiefe. */
  /* Basis-URL der Website aus der Adresse von main.js ableiten - funktioniert
     auch, wenn die Seite nicht im Domain-Root liegt (Vorschau, Unterordner). */
  var SITE_ROOT = (function () {
    var s = document.currentScript || document.querySelector('script[src*="assets/js/main.js"]');
    try { return new URL('../../', s.src).href; } catch (e) { return '/'; }
  })();
  function rootPrefix() { return SITE_ROOT; }

  /* ============================= 2 · SPRACHE ============================= */
  function applyLang(l) {
    document.documentElement.setAttribute('lang', l);
    try { localStorage.setItem(LANG_KEY, l); } catch (err) {}

    $$('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === l ? 'true' : 'false');
    });

    // Attribut-basierte Strings: Platzhalter, <option>, aria-label …
    $$('[data-de]').forEach(function (el) {
      var val = el.dataset[l] || el.dataset.de;
      if (el.dataset.attr) { el.setAttribute(el.dataset.attr, val); }
      else { el.textContent = val; }
    });

    document.dispatchEvent(new CustomEvent('nic:lang', { detail: { lang: l } }));
  }

  /* ====================== 3 · GLOBAL, EINMALIG GEBUNDEN ================== */

  /* --------------------------------------------------------- Kopfzeile --- */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------- Burger-Menü --- */
  var burger = $('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function closeNav() {
    if (!document.body.classList.contains('nav-open')) return;
    document.body.classList.remove('nav-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }

  function closeAllMega() {
    $$('.nav > li.is-open').forEach(function (li) {
      li.classList.remove('is-open');
      var t = $('.nav-link[aria-expanded]', li);
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  /* --------------------------------------------------------- Mega-Menü --- */
  $$('.nav > li').forEach(function (li) {
    var trigger = $('.nav-link[aria-expanded]', li);
    var panel = $('.mega', li);
    if (!trigger || !panel) return;

    var open = function (state) {
      li.classList.toggle('is-open', state);
      trigger.setAttribute('aria-expanded', state ? 'true' : 'false');
    };

    // Auf Zeigegeräten öffnet der Hover das Panel, bevor der Klick ankommt.
    // Ohne dieses Flag läse der Klick es als "schon offen" und schlösse es
    // sofort wieder — das Menü klappte unter dem Cursor zu.
    var openedByHover = false;

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var wasOpen = li.classList.contains('is-open') && !openedByHover;
      openedByHover = false;
      $$('.nav > li.is-open').forEach(function (other) {
        if (other !== li) {
          other.classList.remove('is-open');
          var t = $('.nav-link[aria-expanded]', other);
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
      open(!wasOpen);
    });

    if (window.matchMedia('(hover: hover) and (min-width: 1081px)').matches) {
      var timer;
      li.addEventListener('mouseenter', function () {
        clearTimeout(timer);
        if (!li.classList.contains('is-open')) openedByHover = true;
        open(true);
      });
      li.addEventListener('mouseleave', function () {
        timer = setTimeout(function () { open(false); openedByHover = false; }, 160);
      });
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav > li')) closeAllMega();
  });

  /* -------------------------------------------------------- Sprachwahl --- */
  /* Sprachwahl hinter dem Globus */
  var pick = $('.lang-pick'), globe = $('.lang-globe');
  var setPick = function (open) { if (!pick) return; pick.classList.toggle('is-open', open); if (globe) globe.setAttribute('aria-expanded', open ? 'true' : 'false'); };
  if (globe) globe.addEventListener('click', function (e) { e.stopPropagation(); setPick(!pick.classList.contains('is-open')); });
  document.addEventListener('click', function (e) { if (pick && !pick.contains(e.target)) setPick(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setPick(false); });
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.dataset.lang); setPick(false); });
  });

  /* ------------------------------------------------------------ Modals --- */
  var lastFocus = null;

  function openModal(modal, context) {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (context) {
      $$('[data-fill]', modal).forEach(function (el) {
        var v = context[el.dataset.fill];
        if (v == null) return;
        if ('value' in el) el.value = v; else el.textContent = v;
      });
      /* v42 · Versionsauswahl, wenn das Produkt eine Versionstabelle hat */
      var vf = $('[data-version-field]', modal), vs = vf && $('select', vf);
      if (vf && vs) {
        var pr = context.pid && window.NIC && (NIC.products || []).filter(function (x) { return x.id === context.pid; })[0];
        var cols = pr && pr.variantTable ? pr.variantTable.cols : null;
        vf.hidden = !cols;
        vs.innerHTML = cols ? '<option value="">' + escHtml(s({ de: 'Noch offen', en: 'Not decided yet', zh: '尚未确定' })) + '</option>' +
          cols.map(function (c) { return '<option>' + escHtml(c) + '</option>'; }).join('') : '';
      }
    }
    var focusable = $('input, select, textarea, button', $('.modal__body', modal) || modal);
    if (focusable) setTimeout(function () { focusable.focus(); }, 60);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    if (!$('.modal.is-open')) document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  window.NICModal = { open: openModal, close: closeModal };

  // Delegiert, damit es einen <main>-Austausch überlebt.
  document.addEventListener('click', function (e) {
    var modal = e.target.closest('.modal');
    if (!modal) return;
    if (e.target === modal || e.target.closest('[data-modal-close]')) closeModal(modal);
  });

  // Fokusfalle
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var modal = $('.modal.is-open');
    if (!modal) return;
    var f = $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])', modal)
      .filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeAllMega();
    closeNav();
    var open = $('.modal.is-open');
    if (open) closeModal(open);
  });

  /* --------------------------------------------------------- Quick View -- */
  /* Ein Klick auf eine Produktkarte öffnet dieses Panel, gefüllt aus
     catalog.js. Das beantwortet den Klick sofort — auch dort, wo der
     Vorschaurahmen echte Seitenwechsel abfängt. */
  var currentProduct = null;

  function qvEl() { return document.getElementById('quickview'); }

  function buildQuickView(p, root) {
    var imgs = p.gallery || [];

    var gallery =
      '<div class="qv-gallery">' +
        '<div class="qv-stage">' +
          (imgs[0]
            ? '<img src="' + root + 'assets/img/products/' + imgs[0] + '.png" alt="' + escHtml(p.name) + '">'
            : '') +
        '</div>' +
        (imgs.length > 1
          ? '<div class="qv-thumbs">' + imgs.map(function (g, i) {
              return '<button type="button" aria-current="' + (i === 0) + '" data-full="' +
                root + 'assets/img/products/' + g + '.png"><img src="' + root +
                'assets/img/products/' + g + '.webp" alt=""></button>';
            }).join('') + '</div>'
          : '') +
      '</div>';

    var actions =
      (p.price == null
        ? '<div class="priceline"><b class="price--ask">' + s({ de: 'Preis auf Anfrage', en: 'Price on request', zh: '价格请询盘' }) + '</b><span>' +
          s({ de: 'Angebot mit Konfiguration', en: 'Quote with configuration', zh: '按配置报价' })
        : '<div class="priceline"><b>' + money(p.price) + ' €</b><span>' +
          s({ de: 'netto je Stück, zzgl. USt.', en: 'net per unit, excl. VAT', zh: '每台净价，不含增值税' })) +
      '</span></div>' +
      '<div class="qv-actions">' +
        '<button class="btn btn--block btn--inq" type="button" data-inq-add="' + escHtml(p.id) + '">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
          s({ de: 'Zur Anfrageliste hinzufügen', en: 'Add to inquiry list', zh: '加入询盘清单' }) + '</button>' +
        '<button class="btn btn--ghost btn--block" type="button" data-qv-offer data-product="' +
          escHtml(p.name + ' (' + p.sku + ')') + '">' +
          s({ de: 'Persönliches Angebot', en: 'Personal quote', zh: '专属报价' }) + '</button>' +
        '<a class="btn btn--ghost btn--block" href="' + root + 'produkte/' + p.slug + '.html">' +
          s({ de: 'Vollständige Produktseite', en: 'Full product page', zh: '查看完整产品页' }) + '</a>' +
      '</div>';

    var highs = (p.highlights || []).length
      ? '<ul class="highlights" style="grid-template-columns:1fr">' +
          p.highlights.map(function (h) { return '<li>' + escHtml(L(h)) + '</li>'; }).join('') + '</ul>'
      : '';

    var specs = (p.specs || []).map(function (blk) {
      return '<div class="spec-block"><h3>' + escHtml(L(blk.group)) + '</h3>' +
        '<table class="spec-table"><tbody>' +
        blk.rows.map(function (r) {
          return '<tr><th scope="row">' + escHtml(L(r.k)) + '</th><td>' + escHtml(L(r.v)) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }).join('');

    var variants = '';
    if (p.variantTable) {
      var vt = p.variantTable;
      var cell = function (v) {
        if (v === true) return '<span class="yes">&#10003;</span>';
        if (v === false) return '<span class="no">&mdash;</span>';
        return escHtml(v);
      };
      variants =
        '<h3 class="qv-h">' + escHtml(L(vt.caption)) + '</h3>' +
        '<div class="vtable-wrap"><table class="vtable"><thead><tr><th>' +
          s({ de: 'Merkmal', en: 'Specification', zh: '参数项' }) + '</th>' +
          vt.cols.map(function (c) { return '<th>' + escHtml(c) + '</th>'; }).join('') +
        '</tr></thead><tbody>' +
        vt.rows.map(function (r) {
          return '<tr><th scope="row">' + escHtml(L(r.k)) + '</th>' +
            r.v.map(function (v) { return '<td>' + cell(v) + '</td>'; }).join('') + '</tr>';
        }).join('') +
        '</tbody></table></div>';
    }

    return '<div class="qv-top">' + gallery +
      '<div class="qv-buy">' + actions + highs + '</div></div>' +
      '<div class="qv-summary"><p>' + escHtml(L(p.summary)) + '</p></div>' +
      variants +
      '<h3 class="qv-h">' + s({ de: 'Technische Daten', en: 'Specifications', zh: '技术参数' }) + '</h3>' +
      '<div class="qv-specs">' + specs + '</div>';
  }

  function openQuickView(id) {
    var qv = qvEl();
    if (!qv || !window.NIC) return false;
    var p = (NIC.products || []).filter(function (x) { return x.id === id; })[0];
    if (!p) return false;

    currentProduct = p;
    var root = rootPrefix();
    $('.qv-brand', qv).textContent = 'NIC Robotics · ' + L(p.family);
    $('#qv-title', qv).textContent = p.name;
    $('.qv-tag', qv).textContent = L(p.tagline);
    $('.qv-body', qv).innerHTML = buildQuickView(p, root);
    openModal(qv);

    var stage = $('.qv-stage img', qv);
    $$('.qv-thumbs button', qv).forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('.qv-thumbs button', qv).forEach(function (o) { o.setAttribute('aria-current', 'false'); });
        btn.setAttribute('aria-current', 'true');
        if (stage) stage.src = btn.dataset.full;
      });
    });

    var oBtn = $('[data-qv-offer]', qv);
    if (oBtn) {
      oBtn.addEventListener('click', function () {
        closeModal(qv);
        openModal(document.getElementById('offer-modal'), { product: oBtn.dataset.product });
      });
    }
    return true;
  }

  // Karte anklicken → Quick View. Capture-Phase, damit der Overlay-Link der
  // Karte nicht zuerst navigiert. Die Knöpfe der Karte sind ausgenommen.
  document.addEventListener('click', function (e) {
    var card = e.target.closest('[data-quickview]');
    if (!card) return;
    if (e.target.closest('.pcard__actions')) return;     // Angebot / Details
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (openQuickView(card.dataset.quickview)) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  // Offenes Panel bei Sprachwechsel neu aufbauen
  document.addEventListener('nic:lang', function () {
    var qv = qvEl();
    if (qv && qv.classList.contains('is-open') && currentProduct) {
      var id = currentProduct.id;
      currentProduct = null;
      openQuickView(id);
    }
  });

  /* =================== 4 · PRO SEITE — NACH JEDEM WECHSEL ================ */

  var MAX_BYTES = 5 * 1024 * 1024;   // 5 MB je Datei
  var MAX_FILES = 6;
  var OK_TYPES = /^(image\/(jpeg|png|webp|heic|heif|gif)|application\/pdf|video\/(mp4|quicktime))$/;

  function fmtSize(b) {
    return b < 1024 * 1024 ? Math.round(b / 1024) + ' KB' : (b / 1048576).toFixed(1) + ' MB';
  }

  function initReveal() {
    var reveals = $$('.reveal:not(.is-in)');
    if (!reveals.length) return;
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px 12% 0px', threshold: 0 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  function initGallery() {
    $$('[data-gallery]').forEach(function (g) {
      var stage = $('.gallery__stage img', g);
      var thumbs = $$('.gallery__thumbs button', g);
      if (!stage || !thumbs.length) return;
      stage.style.transition = 'opacity .13s linear';
      thumbs.forEach(function (b) {
        b.addEventListener('click', function () {
          thumbs.forEach(function (o) { o.setAttribute('aria-current', 'false'); });
          b.setAttribute('aria-current', 'true');
          var src = b.dataset.full || $('img', b).src;
          stage.style.opacity = '0';
          setTimeout(function () {
            stage.src = src;
            stage.alt = b.dataset.alt || stage.alt;
            stage.style.opacity = '1';
          }, 130);
        });
      });
    });
  }

  function initTabs() {
    $$('[data-tabs]').forEach(function (wrap) {
      var btns = $$('[role="tab"]', wrap);
      var panels = $$('[role="tabpanel"]', wrap);
      btns.forEach(function (btn, i) {
        btn.addEventListener('click', function () {
          btns.forEach(function (b) { b.setAttribute('aria-selected', 'false'); b.tabIndex = -1; });
          panels.forEach(function (p) { p.hidden = true; });
          btn.setAttribute('aria-selected', 'true');
          btn.tabIndex = 0;
          if (panels[i]) panels[i].hidden = false;
        });
        btn.addEventListener('keydown', function (e) {
          var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!dir) return;
          e.preventDefault();
          var next = btns[(i + dir + btns.length) % btns.length];
          next.click(); next.focus();
        });
      });
    });
  }

  function initFilters() {
    var bar = $('[data-filter-bar]');
    if (!bar) return;
    var items = $$('[data-cf-grid] > [data-cat]'); if (!items.length) items = $$('[data-cat]');
    var counter = $('.filters__count');

    var setCount = function (n) {
      if (!counter) return;
      counter.textContent = n + s({
        de: n === 1 ? ' Produkt' : ' Produkte',
        en: n === 1 ? ' product' : ' products',
        zh: ' 款产品'
      });
    };

    var search = $('[data-cf-search]', bar), use = $('[data-cf-use]', bar), sort = $('[data-cf-sort]', bar), kind = $('[data-cf-kind]', bar);
    var grid = $('[data-cf-grid]'), empty = $('[data-cf-empty]');
    var cur = 'all';
    var run = function (cat) {
      if (cat) cur = cat;
      var q = search ? search.value.trim().toLowerCase() : '';
      var u = use ? use.value : '';
      var shown = 0;
      items.forEach(function (el) {
        var match = (cur === 'all' || el.dataset.cat === cur) &&
          (!q || (el.dataset.search || el.textContent.toLowerCase()).indexOf(q) > -1) &&
          (!u || (' ' + (el.dataset.uses || '') + ' ').indexOf(' ' + u + ' ') > -1) &&
          (!kind || !kind.value || el.dataset.kind === kind.value);
        el.hidden = !match;
        if (match) shown++;
      });
      setCount(shown);
      if (empty) empty.hidden = shown > 0;
      try {
        var url = new URL(window.location);
        if (cur === 'all') url.searchParams.delete('kategorie');
        else url.searchParams.set('kategorie', cur);
        history.replaceState(history.state, '', url);
      } catch (err) {}
    };
    var order = items.slice();
    var doSort = function () {
      if (!grid || !sort) return;
      var list = order.slice();
      if (sort.value === 'az') list.sort(function (a, b) { return (a.dataset.name || '').localeCompare(b.dataset.name || ''); });
      list.forEach(function (el) { grid.appendChild(el); });
    };
    if (search) search.addEventListener('input', function () { run(); });
    if (use) use.addEventListener('change', function () { run(); });
    if (kind) kind.addEventListener('change', function () { run(); });
    if (sort) sort.addEventListener('change', doSort);
    var clear = $('[data-cf-clear]');
    if (clear) clear.addEventListener('click', function () {
      if (search) search.value = '';
      if (use) use.value = '';
      if (kind) kind.value = '';
      var all = $('.filter-btn[data-filter="all"]', bar);
      if (all) all.click(); else run('all');
    });

    $$('.filter-btn', bar).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.filter-btn', bar).forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        run(b.dataset.filter);
      });
    });

    var initial = 'all';
    try { initial = new URL(window.location).searchParams.get('kategorie') || 'all'; } catch (err) {}
    var btn = $('.filter-btn[data-filter="' + initial + '"]', bar);
    if (btn) btn.click(); else setCount(items.length);

    document.addEventListener('nic:lang', function () {
      if (!document.contains(bar)) return;
      setCount(items.filter(function (el) { return !el.hidden; }).length);
    });
  }

  function initModalTriggers() {
    $$('[data-modal-open]').forEach(function (trigger) {
      if (trigger.dataset.bound) return;
      trigger.dataset.bound = '1';
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openModal(document.getElementById(trigger.dataset.modalOpen), {
          product: trigger.dataset.product || '',
          sku: trigger.dataset.sku || '',
          pid: trigger.dataset.pid || ''
        });
      });
    });
  }

  function initDropzones() {
    $$('.dropzone').forEach(function (dz) {
      var input = $('input[type="file"]', dz);
      var list = document.getElementById(dz.dataset.list || '');
      if (!input || input.dataset.bound) return;
      input.dataset.bound = '1';
      var store = [];

      var render = function () {
        if (!list) return;
        list.innerHTML = '';
        store.forEach(function (f, i) {
          var bad = f.size > MAX_BYTES || !OK_TYPES.test(f.type);
          var li = document.createElement('li');
          if (bad) li.className = 'is-bad';
          li.innerHTML =
            '<span class="name"></span><span class="size"></span>' +
            '<button type="button" class="rm" aria-label="' +
            s({ de: 'Datei entfernen', en: 'Remove file', zh: '移除文件' }) +
            '"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';
          $('.name', li).textContent = f.name;
          $('.size', li).textContent = fmtSize(f.size) +
            (bad ? s({ de: ' · nicht zulässig', en: ' · not accepted', zh: ' · 不符合要求' }) : '');
          $('.rm', li).addEventListener('click', function () { store.splice(i, 1); sync(); });
          list.appendChild(li);
        });
      };

      var sync = function () {
        var dt = new DataTransfer();
        store.slice(0, MAX_FILES).forEach(function (f) { dt.items.add(f); });
        input.files = dt.files;
        render();
      };

      var add = function (files) {
        Array.prototype.slice.call(files).forEach(function (f) {
          if (store.length >= MAX_FILES) return;
          if (store.some(function (e) { return e.name === f.name && e.size === f.size; })) return;
          store.push(f);
        });
        sync();
      };

      input.addEventListener('change', function () {
        if (input.files && input.files.length) {
          var incoming = Array.prototype.slice.call(input.files);
          if (incoming.length !== store.length) { store = []; add(incoming); }
        }
      });

      ['dragenter', 'dragover'].forEach(function (ev) {
        dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.add('is-over'); });
      });
      ['dragleave', 'drop'].forEach(function (ev) {
        dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.remove('is-over'); });
      });
      dz.addEventListener('drop', function (e) {
        if (e.dataTransfer && e.dataTransfer.files) add(e.dataTransfer.files);
      });
    });
  }

  function fieldOf(el) { return el.closest('.field') || el.closest('.consent') || el.parentElement; }

  function isValid(el) {
    return el.type === 'checkbox' ? el.checked : (el.checkValidity() && el.value.trim() !== '');
  }

  function initForms() {
    $$('form[data-validate]').forEach(function (form) {
      if (form.dataset.bound) return;
      form.dataset.bound = '1';

      $$('[required]', form).forEach(function (el) {
        el.addEventListener('blur', function () {
          var f = fieldOf(el);
          if (f) f.classList.toggle('is-invalid', !isValid(el));
        });
        el.addEventListener('input', function () {
          var f = fieldOf(el);
          if (f && f.classList.contains('is-invalid') && isValid(el)) f.classList.remove('is-invalid');
        });
      });

      form.addEventListener('submit', function (e) {
        var status = $('.form-status', form);
        var ok = true, firstBad = null;

        $$('[required]', form).forEach(function (el) {
          var f = fieldOf(el);
          var valid = isValid(el);
          if (f) f.classList.toggle('is-invalid', !valid);
          if (!valid) { ok = false; if (!firstBad) firstBad = el; }
        });

        if (!ok) {
          e.preventDefault();
          if (firstBad) { firstBad.focus(); firstBad.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
          if (status) {
            status.className = 'form-status form-status--err is-shown';
            status.innerHTML =
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/></svg><span>' +
              s({
                de: 'Bitte füllen Sie die markierten Felder aus.',
                en: 'Please complete the highlighted fields.',
                zh: '请填写标记的必填项。'
              }) + '</span>';
            status.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
          return;
        }

        var hp = $('.hp input', form);
        if (hp && hp.value) { e.preventDefault(); return; }

        // Noch kein Backend angeschlossen → Erfolgszustand anzeigen.
        if (!form.getAttribute('action')) {
          e.preventDefault();
          var mail = form.dataset.mailto;
          if (status) {
            status.className = 'form-status form-status--ok is-shown';
            status.innerHTML =
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>' +
              s({
                de: 'Vielen Dank — Ihre Anfrage ist erfasst. Wir antworten innerhalb eines Werktages.',
                en: 'Thank you — your request has been recorded. We reply within one working day.',
                zh: '感谢您的咨询 — 我们已收到，将在一个工作日内回复。'
              }) +
              (mail ? s({ de: ' Kontakt: ', en: ' Reference: ', zh: ' 联系邮箱：' }) + mail : '') + '</span>';
            status.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
          var submitBtn = $('[type="submit"]', form);
          if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = '.55'; }
        }
      });
    });
  }

  function initRmaConditional() {
    var reasonSel = $('#rma-reason');
    if (!reasonSel || reasonSel.dataset.bound) return;
    reasonSel.dataset.bound = '1';
    var otherField = $('#rma-reason-other-field');
    var toggle = function () {
      if (!otherField) return;
      var show = reasonSel.value === 'sonstiges' || reasonSel.value === 'unklar';
      otherField.hidden = !show;
      var ta = $('textarea, input', otherField);
      if (ta) ta.required = show;
    };
    reasonSel.addEventListener('change', toggle);
    toggle();
  }

  /* Produktfilm: erst Titelbild und Knopf, Ton und Steuerung nach dem Klick.
     Kein Download-Eintrag, kein Kontextmenü „Video speichern“. */
  function initFilm() {
    $$('.film').forEach(function (fig) {
      if (fig.dataset.bound) return;
      fig.dataset.bound = '1';
      var v = $('[data-film]', fig), btn = $('[data-film-play]', fig);
      if (!v || !btn) return;
      v.addEventListener('contextmenu', function (e) { e.preventDefault(); });
      btn.addEventListener('click', function () {
        fig.classList.add('is-playing');
        v.controls = true;
        v.muted = false;
        var pr = v.play();
        if (pr && pr.catch) pr.catch(function () {});
      });
      v.addEventListener('ended', function () {
        fig.classList.remove('is-playing');
        v.controls = false;
        try { v.currentTime = 0; } catch (e) {}
        v.load();
      });
    });
  }

  /* Referenzen: nach Branche filtern */
  function initCaseFilter() {
    var bar = $('.case-filter');
    if (!bar || bar.dataset.bound) return;
    bar.dataset.bound = '1';
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-case-filter]');
      if (!b) return;
      var f = b.getAttribute('data-case-filter');
      $$('[data-case-filter]', bar).forEach(function (x) { x.classList.toggle('is-on', x === b); });
      $$('.case, .cgal').forEach(function (el) { el.hidden = !(f === 'all' || el.getAttribute('data-ind') === f); });
      $$('.case-group').forEach(function (g) { g.hidden = !$$('.case:not([hidden]), .cgal:not([hidden])', g).length; });
    });
  }

  function initHeroVideo() {
    var v = $('[data-hero-video]');
    if (!v || v.dataset.bound) return;
    v.dataset.bound = '1';

    // Nur die ausdrückliche Nutzerpräferenz schaltet das Video ab. Eine
    // langsame Verbindung tut das nicht mehr: iOS meldet im Stromsparmodus
    // teils "2g" und das Video stand dann auch im WLAN still.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.removeAttribute('autoplay');
      v.pause();
      return;
    }

    v.muted = true;              // Safari verlangt das vor play()
    v.setAttribute('playsinline', '');
    v.disableRemotePlayback = true;

    var tryPlay = function () {
      var pr = v.play();
      if (pr && pr.catch) pr.catch(function () {});
    };

    /* iOS verweigert Autoplay im Stromsparmodus und bei aktiviertem
       Datensparen. Dann bleibt nur das Standbild stehen. Deshalb wird beim
       ersten Antippen, Scrollen oder Zurückholen der Seite noch einmal
       angesetzt — danach läuft es wie überall sonst. */
    var retry = function () {
      if (!v.paused) return cleanup();
      tryPlay();
      if (!v.paused) cleanup();
    };

    var events = ['touchstart', 'pointerdown', 'click', 'scroll', 'keydown'];
    function cleanup() {
      events.forEach(function (ev) {
        window.removeEventListener(ev, retry, { passive: true, capture: true });
      });
    }
    events.forEach(function (ev) {
      window.addEventListener(ev, retry, { passive: true, capture: true });
    });

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) tryPlay();
    });

    v.addEventListener('loadeddata', tryPlay);
    v.addEventListener('canplay', tryPlay);
    tryPlay();

    // Außerhalb des Bildes anhalten spart Akku.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) tryPlay();
          else if (!v.paused) v.pause();
        });
      }, { threshold: 0.05 }).observe(v);
    }
  }

  function markCurrentNav() {
    var path = window.location.pathname.replace(/index\.html$/, '');
    $$('.nav-link[href]').forEach(function (a) {
      a.classList.remove('is-active');
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      var target;
      try { target = new URL(href, window.location.href).pathname.replace(/index\.html$/, ''); }
      catch (err) { return; }
      if (a.hasAttribute('data-nav-home')) { if (path === target) a.classList.add('is-active'); return; }
      if (target !== '/' && path.indexOf(target) === 0) a.classList.add('is-active');
    });
  }

  function initPage() {
    initReveal();
    initGallery();
    initTabs();
    initFilters();
    initModalTriggers();
    initDropzones();
    initForms();
    initRmaConditional();
    initHeroVideo();
    initFilm();
    initCaseFilter();
    markCurrentNav();
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ========================== 5 · NAVIGATION ============================= */
  /* Manche Vorschaurahmen fangen echte Seitenwechsel ab — ein Link führte
     dort ins Leere. Interne Links werden deshalb per fetch geholt und <main>
     wird ausgetauscht. Auf einem normalen Webserver ist das schlicht ein
     schnellerer Seitenwechsel; ohne JavaScript bleiben es normale Links. */

  function samePage(url) {
    return url.pathname === window.location.pathname && url.search === window.location.search;
  }

  /** Gibt die Ziel-URL zurück, wenn der Link seitenintern behandelt werden soll. */
  function internalTarget(a) {
    var href = a.getAttribute('href');
    if (!href) return null;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return null;
    if (href.charAt(0) === '#') return null;
    if (a.hasAttribute('download') || a.target === '_blank') return null;
    var url;
    try { url = new URL(a.href, window.location.href); } catch (e) { return null; }
    if (url.origin !== window.location.origin) return null;
    if (!/\.html?$/.test(url.pathname) && !/\/$/.test(url.pathname)) return null;
    return url;
  }

  /* Nach einem pushState loest der Browser relative Links gegen die NEUE
     Adresse auf. Kopfzeile und Fusszeile bleiben beim Austausch stehen, ihre
     Links zeigten danach ins Leere (/produkte/einsatzbereiche/...). Deshalb
     werden alle relativen Verweise einmal gegen ihre eigene Basis in absolute
     URLs umgeschrieben - danach ist die Seitentiefe egal. */
  var ABSOLUTE = /^(#|[a-z][a-z0-9+.-]*:)/i;

  function absolutise(root, baseHref) {
    if (!root) return;

    var fix = function (el, attr) {
      var v = el.getAttribute(attr);
      if (!v || ABSOLUTE.test(v) || v.indexOf('//') === 0) return;
      try { el.setAttribute(attr, new URL(v, baseHref).href); } catch (e) {}
    };

    $$('[href]', root).forEach(function (el) { fix(el, 'href'); });
    $$('[src]', root).forEach(function (el) { fix(el, 'src'); });

    $$('[srcset]', root).forEach(function (el) {
      var v = el.getAttribute('srcset');
      if (!v) return;
      try {
        el.setAttribute('srcset', v.split(',').map(function (part) {
          var bits = part.trim().split(/\s+/);
          if (!bits[0] || ABSOLUTE.test(bits[0]) || bits[0].indexOf('//') === 0) return part.trim();
          bits[0] = new URL(bits[0], baseHref).href;
          return bits.join(' ');
        }).join(', '));
      } catch (e) {}
    });

    if (root.hasAttribute && root.hasAttribute('href')) fix(root, 'href');
    if (root.hasAttribute && root.hasAttribute('src')) fix(root, 'src');
  }

  var navigating = false;

  function go(url, push) {
    if (navigating) return;
    navigating = true;
    document.documentElement.classList.add('is-navigating');

    var done = function () {
      navigating = false;
      document.documentElement.classList.remove('is-navigating');
    };

    fetch(url.href, { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var fresh = doc.querySelector('main');
        var here = document.querySelector('main');
        if (!fresh || !here) throw new Error('kein <main>');

        var incoming = document.importNode(fresh, true);
        absolutise(incoming, url.href);     // gegen die Zielseite, nicht die aktuelle Tiefe
        here.replaceWith(incoming);
        document.title = doc.title;

        var newDesc = doc.querySelector('meta[name="description"]');
        var oldDesc = document.querySelector('meta[name="description"]');
        if (newDesc && oldDesc) oldDesc.setAttribute('content', newDesc.getAttribute('content'));

        if (push) { try { history.pushState({ nic: 1 }, '', url.href); } catch (e) {} }

        closeAllMega();
        closeNav();
        var openEl = $('.modal.is-open');
        if (openEl) closeModal(openEl);

        initPage();
        applyLang(lang());

        var anchor = url.hash ? document.getElementById(url.hash.slice(1)) : null;
        if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo(0, 0);

        done();
      })
      .catch(function () {
        done();
        // fetch nicht möglich → echter Seitenwechsel als Rückfallebene
        window.location.href = url.href;
      });
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    var a = e.target.closest('a[href]');
    if (!a) return;
    var url = internalTarget(a);
    if (!url) return;

    e.preventDefault();

    if (samePage(url)) {
      var t = url.hash ? document.getElementById(url.hash.slice(1)) : null;
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      closeNav();
      closeAllMega();
      return;
    }

    go(url, true);
  });

  window.addEventListener('popstate', function (e) {
    if (!e.state || !e.state.nic) return;
    try { go(new URL(window.location.href), false); } catch (err) {}
  });

  /* ============================== START ================================= */
  var stored = null;
  try { stored = localStorage.getItem(LANG_KEY); } catch (err) {}
  applyLang(LANGS.indexOf(stored) === -1 ? 'de' : stored);

  // Bleibende Teile einmal festnageln, bevor die erste Navigation die Basis aendert.
  ['.site-header', '.site-footer', '.modal', '.skip'].forEach(function (sel) {
    $$(sel).forEach(function (el) { absolutise(el, document.baseURI); });
  });

  initPage();
})();

/* ============================ LIGHTBOX (v25) ============================ */
(function () {
  if (window.__nicLightbox) return; window.__nicLightbox = true;
  var SEL = '.gallery__stage img, .scene-grid img, .cs__media img, .hm__media img, .hm-hero__img img, .case__media img, .cgal img, .ucd img, .scenario__media img';
  var box, img, cap, cnt, list = [], idx = 0;
  function full(el) {
    var s = el.getAttribute('data-full') || el.currentSrc || el.src;
    return s.replace(/\.webp(\?.*)?$/, '.jpg');
  }
  function build() {
    box = document.createElement('div');
    box.className = 'lb'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.hidden = true;
    box.innerHTML = '<button class="lb__x" type="button" aria-label="Schließen">×</button>' +
      '<button class="lb__nav lb__prev" type="button" aria-label="Zurück">‹</button>' +
      '<figure class="lb__fig"><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lb__nav lb__next" type="button" aria-label="Weiter">›</button><span class="lb__cnt"></span>';
    document.body.appendChild(box);
    img = box.querySelector('img'); cap = box.querySelector('figcaption'); cnt = box.querySelector('.lb__cnt');
    box.addEventListener('click', function (e) {
      if (e.target.closest('.lb__prev')) return step(-1);
      if (e.target.closest('.lb__next')) return step(1);
      if (e.target === box || e.target.closest('.lb__x')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') step(-1); else if (e.key === 'ArrowRight') step(1);
    });
  }
  function show() {
    var it = list[idx]; img.src = it.src; img.alt = it.alt || ''; cap.textContent = it.alt || '';
    cnt.textContent = list.length > 1 ? (idx + 1) + ' / ' + list.length : '';
    box.classList.toggle('lb--single', list.length < 2);
  }
  function step(d) { if (list.length < 2) return; idx = (idx + d + list.length) % list.length; show(); }
  function close() { box.hidden = true; document.documentElement.classList.remove('lb-open'); img.src = ''; }
  function open(items, i) {
    if (!box) build(); list = items; idx = i; show();
    box.hidden = false; document.documentElement.classList.add('lb-open');
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest(SEL);
    if (!el || e.target.closest('a') && !e.target.closest('.gallery__stage')) return;
    e.preventDefault();
    var gal = el.closest('[data-gallery]');
    if (gal) {
      var btns = Array.prototype.slice.call(gal.querySelectorAll('.gallery__thumbs button'));
      if (btns.length) {
        var items = btns.map(function (b) { return { src: b.getAttribute('data-full'), alt: b.getAttribute('data-alt') }; });
        var cur = Math.max(0, btns.findIndex(function (b) { return b.getAttribute('aria-current') === 'true'; }));
        return open(items, cur);
      }
      return open([{ src: full(el), alt: el.alt }], 0);
    }
    var scope = el.closest('.scene-grid, .cs-grid, .hm-list, .cgal__grid, .case-group') || el.parentNode;
    var imgs = Array.prototype.slice.call(scope.querySelectorAll(SEL));
    open(imgs.map(function (x) { var h = x.closest('article') && x.closest('article').querySelector('h2, h3'); return { src: full(x), alt: (h && h.innerText.trim()) || x.alt }; }), Math.max(0, imgs.indexOf(el)));
  });
})();

/* v42 · Bild-Fallback, Produktvergleich, Kontakt-Vorbelegung */
(function () {
  'use strict';
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var lang = function () { var l = document.documentElement.lang; return l === 'en' || l === 'zh' ? l : 'de'; };
  var T = function (o) { if (o == null) return ''; if (typeof o !== 'object') return String(o); return o[lang()] || o.de || ''; };
  var esc = function (v) { return String(v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* Ein fehlendes Bild hinterlässt keine leere Fläche, sondern eine ruhige Platzhalterfläche. */
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG' || img.dataset.failed) return;
    img.dataset.failed = '1';
    var pic = img.closest('picture');
    if (pic) $$('source', pic).forEach(function (x) { x.remove(); });
    var alt = img.getAttribute('src') || '';
    if (/\.webp$/.test(alt)) { img.src = alt.replace(/\.webp$/, '.jpg'); return; }
    img.classList.add('img-missing');
  }, true);

  /* Sicherheitsnetz für Einblend-Animationen: bei schnellem Scrollen oder Sprungmarken
     bleibt nichts unsichtbar, was bereits im oder über dem Sichtbereich liegt. */
  var rvT = 0;
  var rvCheck = function () {
    rvT = 0;
    var lim = window.innerHeight * 1.1;
    $$('.reveal:not(.is-in)').forEach(function (el) { if (el.getBoundingClientRect().top < lim) el.classList.add('is-in'); });
  };
  window.addEventListener('scroll', function () { if (!rvT) rvT = setTimeout(rvCheck, 120); }, { passive: true });
  window.addEventListener('load', rvCheck);
  window.addEventListener('hashchange', function () { setTimeout(rvCheck, 60); });

  /* ------------------------------------------------------- Vergleich */
  var KEY = 'nic-compare', MAX = 4;
  var get = function () { try { return JSON.parse(localStorage.getItem(KEY) || '[]').slice(0, MAX); } catch (e) { return []; } };
  var put = function (a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} };
  var prod = function (id) { return ((window.NIC && NIC.products) || []).filter(function (p) { return p.id === id; })[0]; };
  var name = function (p) { return p.title ? T(p.title) : p.name; };

  function sync() {
    var sel = get();
    $$('[data-cmp]').forEach(function (cb) {
      cb.checked = sel.indexOf(cb.dataset.cmp) > -1;
      cb.disabled = !cb.checked && sel.length >= MAX;
    });
    var bar = document.querySelector('[data-cmpbar]');
    if (!bar) return;
    bar.hidden = sel.length === 0;
    var c = bar.querySelector('[data-cmp-count]'); if (c) c.textContent = sel.length;
    var l = bar.querySelector('[data-cmp-list]');
    if (l) l.innerHTML = sel.map(function (id) { var p = prod(id); return p ? '<span>' + esc(name(p)) + '<button type="button" data-cmp-del="' + esc(id) + '" aria-label="×">×</button></span>' : ''; }).join('');
    var go = bar.querySelector('[data-cmp-go]'); if (go) go.classList.toggle('is-off', sel.length < 2);
  }
  document.addEventListener('change', function (e) {
    var cb = e.target.closest && e.target.closest('[data-cmp]');
    if (!cb) return;
    var sel = get().filter(function (x) { return x !== cb.dataset.cmp; });
    if (cb.checked && sel.length < MAX) sel.push(cb.dataset.cmp);
    put(sel); sync();
  });
  document.addEventListener('click', function (e) {
    var d = e.target.closest('[data-cmp-del]');
    if (d) { put(get().filter(function (x) { return x !== d.dataset.cmpDel; })); sync(); renderTable(); return; }
    if (e.target.closest('[data-cmp-reset]')) { put([]); sync(); renderTable(); return; }
    var g = e.target.closest('[data-cmp-go]');
    if (g && get().length < 2) { e.preventDefault(); }
  });

  function rowsOf(p) {
    var out = [];
    (p.specs || []).forEach(function (g) { (g.rows || []).forEach(function (r) { out.push([T(r.k), T(r.v)]); }); });
    return out;
  }
  function renderTable() {
    var box = document.querySelector('[data-cmp-table]');
    if (!box) return;
    var url = null; try { url = new URL(window.location).searchParams.get('m'); } catch (e) {}
    var ids = url ? url.split(',').slice(0, MAX) : get();
    var ps = ids.map(prod).filter(Boolean);
    var empty = document.querySelector('[data-cmp-empty]');
    if (empty) empty.hidden = ps.length >= 2;
    if (ps.length < 2) { box.innerHTML = ''; return; }
    var root = box.dataset.root || '../';
    var keys = [], map = ps.map(function (p) {
      var m = {}; rowsOf(p).forEach(function (r) { if (keys.indexOf(r[0]) < 0) keys.push(r[0]); m[r[0]] = r[1]; }); return m;
    });
    var kindL = { platform: { de: 'Roboterplattform', en: 'Robot platform', zh: '机器人平台' }, config: { de: 'Branchenkonfiguration', en: 'Industry configuration', zh: '行业配置方案' } };
    var head = '<tr><th scope="col"></th>' + ps.map(function (p) {
      var img = p.gallery && p.gallery[0];
      return '<th scope="col"><a href="' + root + 'produkte/' + esc(p.slug) + '.html">' +
        (img ? '<img src="' + root + 'assets/img/products/' + esc(img) + '.webp" alt="" width="160" height="120">' : '') +
        '<strong>' + esc(name(p)) + '</strong></a><small>' + esc(T(p.family)) + '</small></th>';
    }).join('') + '</tr>';
    var base = [
      [T({ de: 'Typ', en: 'Type', zh: '类型' }), ps.map(function (p) { return T(kindL[p.kind || 'platform']); })],
      [T({ de: 'Versionen', en: 'Versions', zh: '版本' }), ps.map(function (p) { return p.variantTable ? p.variantTable.cols.join(' · ') : '—'; })],
      [T({ de: 'Preis', en: 'Price', zh: '价格' }), ps.map(function () { return T({ de: 'auf Anfrage', en: 'on request', zh: '询价' }); })]
    ];
    var body = base.concat(keys.map(function (k) { return [k, map.map(function (m) { return m[k] || '—'; })]; }))
      .map(function (r) {
        var diff = r[1].some(function (v) { return v !== r[1][0]; });
        return '<tr' + (diff ? '' : ' class="is-same"') + '><th scope="row">' + esc(r[0]) + '</th>' + r[1].map(function (v) { return '<td>' + esc(v) + '</td>'; }).join('') + '</tr>';
      }).join('');
    box.innerHTML = '<table class="vtable cmptable"><thead>' + head + '</thead><tbody>' + body + '</tbody></table>';
  }

  /* ------------------------------------------ Kontakt ?produkt=&thema= */
  function prefill() {
    var f = document.querySelector('form[data-validate]:not(.modal form)');
    if (!f || !/kontakt\.html/.test(location.pathname)) return;
    var q; try { q = new URL(location).searchParams; } catch (e) { return; }
    var pr = q.get('produkt'), th = q.get('thema');
    if (!pr && !th) return;
    var msg = f.querySelector('textarea');
    var subj = f.querySelector('select[name="anliegen"], select[name="thema"], select');
    if (th === 'technik' && subj) {
      var o = Array.prototype.filter.call(subj.options, function (x) { return /techn|technical|技术/i.test(x.value + ' ' + x.textContent); })[0];
      if (o) subj.value = o.value;
    }
    if (msg && !msg.value) msg.value = (th === 'technik'
      ? T({ de: 'Technische Frage zu ', en: 'Technical question about ', zh: '关于以下产品的技术问题：' })
      : T({ de: 'Anfrage zu ', en: 'Enquiry about ', zh: '咨询产品：' })) + (pr || '') + '\n\n';
  }

  function init() { sync(); renderTable(); prefill(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  document.addEventListener('nic:lang', function () { sync(); renderTable(); });
})();
