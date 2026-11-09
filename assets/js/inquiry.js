/* ==========================================================================
   NIC ROBOTICS — Anfrageliste (Inquiry list) + Live-Chat
   --------------------------------------------------------------------------
   1. Anfrageliste: Besucher sammeln Produkte ([data-inq-add]), die Liste
      liegt im localStorage und öffnet sich als Schublade vom Kopf aus.
   2. Chatfenster im NIC-Design. Ist eine Crisp-Website-ID eingetragen
      (build/partials.js → SITE.crispWebsiteId), läuft Crisp unsichtbar im
      Hintergrund: Nachrichten gehen an Crisp, Antworten erscheinen hier.
      Ohne Crisp – oder bis Crisp geladen ist – öffnet „Senden“ WhatsApp.
   3. Die Anfrageliste lässt sich per Chat, WhatsApp oder E-Mail senden.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.NIC_CONTACT || {};
  try { CFG.root = new URL(CFG.root || './', window.location.href).href; } catch (e) {}
  var NIC = window.NIC || { products: [] };
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function lang() { var l = root.getAttribute('lang'); return /^(de|en|zh)$/.test(l) ? l : 'de'; }
  function T(de, en, zh) { var l = lang(); return l === 'zh' ? zh : l === 'en' ? en : de; }
  /* Dreisprachiges Fragment, das die CSS-Sprachumschaltung selbst wechselt */
  function S(de, en, zh) {
    return '<span data-i18n-de>' + de + '</span><span data-i18n-en>' + en + '</span><span data-i18n-zh>' + zh + '</span>';
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n) { try { return new Intl.NumberFormat('de-DE').format(n); } catch (e) { return String(n); } }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function nameOf(p) { return typeof p.name === 'string' ? p.name : (p.name[lang()] || p.name.de); }
  function product(id) { for (var i = 0; i < NIC.products.length; i++) if (NIC.products[i].id === id) return NIC.products[i]; return null; }
  function waLink(text) { return 'https://wa.me/' + CFG.whatsapp + (text ? '?text=' + encodeURIComponent(text) : ''); }

  var I = {
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.5 9.5h7M8.5 12.5h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.6-1.3a.5.5 0 0 0 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12 20 4l-6 16-2.5-6.5z" fill="currentColor"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ===================================================== 1. Markup ======= */
  var logo = (CFG.root || '') + 'assets/img/logo-dark-900.webp';
  var html =
    /* --- Chat-Knopf --- */
    '<button type="button" class="nchat-launcher" data-chat-toggle aria-expanded="false" aria-controls="nchat-panel">' +
      '<span class="nchat-launcher__icon">' + I.chat + '</span>' +
      '<span class="nchat-launcher__label">' + S('Live-Beratung', 'Live advice', '在线咨询') + '</span>' +
      '<i class="nchat-dot" aria-hidden="true"></i>' +
    '</button>' +
    /* --- Chatfenster --- */
    '<section class="nchat" id="nchat-panel" hidden aria-label="Chat">' +
      '<header class="nchat__head">' +
        '<div class="nchat__who"><img class="nchat__logo" src="' + logo + '" alt="NIC Robotics" width="900" height="153"><strong>' + S('NIC Robotics Vertrieb', 'NIC Robotics Sales', 'NIC Robotics 销售顾问') + '</strong>' +
          '<small><i></i>' + S('Antwort meist innerhalb weniger Stunden', 'Usually replies within a few hours', '通常几小时内回复') + '</small></div>' +
        '<button type="button" class="nchat__x" data-chat-toggle aria-label="Schließen">' + I.close + '</button>' +
      '</header>' +
      '<div class="nchat__body" id="nchat-body">' +
        '<div class="nb nb--op">' + S('Guten Tag! 👋 Wie können wir helfen? Wählen Sie ein Thema oder schreiben Sie uns direkt.',
                                       'Hello! 👋 How can we help? Pick a topic or write to us directly.',
                                       '您好！👋 有什么可以帮您？选择一个话题，或直接给我们留言。') + '</div>' +
        '<div class="nchat__quick" id="nchat-quick">' +
          quick('Preis & Lieferzeit', 'Price & lead time', '价格与交期',
                'Ich interessiere mich für Preise und Lieferzeiten.', 'I am interested in prices and lead times.', '我想了解产品价格和交货期。') +
          quick('Ersatzteile & Reparatur', 'Parts & repair', '备件与维修',
                'Ich habe eine Frage zu Ersatzteilen oder einer Reparatur.', 'I have a question about spare parts or a repair.', '我想咨询备件或维修。') +
          quick('Projektlösung', 'Project solution', '定制方案',
                'Wir suchen eine Lösung für ein konkretes Projekt.', 'We are looking for a solution for a specific project.', '我们有具体项目，想咨询解决方案。') +
        '</div>' +
      '</div>' +
      '<form class="nchat__foot" id="nchat-form">' +
        '<textarea id="nchat-text" rows="1" data-attr="placeholder" data-de="Ihre Nachricht…" data-en="Your message…" data-zh="请输入您的问题…" placeholder="Ihre Nachricht…"></textarea>' +
        '<button type="submit" class="nchat__send" aria-label="Senden">' + I.send + '</button>' +
      '</form>' +
      '<div class="nchat__alt">' +
        '<span class="nchat__mode" data-mode-live>' + S('Wir antworten direkt hier im Chat.', 'We reply right here in the chat.', '我们会直接在这里回复您。') + '</span>' +
        '<span class="nchat__mode" data-mode-wa>' + S('Ihre Nachricht geht per WhatsApp an unser Team.', 'Your message goes to our team via WhatsApp.', '您的留言将通过 WhatsApp 发送给我们。') + '</span>' +
        '<a class="nchat__wa" href="' + waLink('') + '" target="_blank" rel="noopener">' + I.wa + S('Lieber WhatsApp', 'Prefer WhatsApp', '改用 WhatsApp') + '</a>' +
      '</div>' +
    '</section>' +
    /* --- Anfrageliste --- */
    '<div class="inq" id="inq-drawer" aria-hidden="true">' +
      '<div class="inq__scrim" data-inq-close></div>' +
      '<aside class="inq__panel" role="dialog" aria-modal="true" aria-labelledby="inq-title">' +
        '<header class="inq__head">' +
          '<div><p class="inq__kicker">' + S('Unverbindlich', 'Non-binding', '不具约束力') + '</p>' +
          '<h2 id="inq-title">' + S('Ihre Anfrageliste', 'Your inquiry list', '我的询盘清单') + '</h2></div>' +
          '<button type="button" class="inq__x" data-inq-close aria-label="Schließen">' + I.close + '</button>' +
        '</header>' +
        '<div class="inq__items" id="inq-items"></div>' +
        '<footer class="inq__foot" id="inq-foot"></footer>' +
      '</aside>' +
    '</div>' +
    '<div class="inq-toast" id="inq-toast" role="status" aria-live="polite"></div>';

  function quick(de, en, zh, qde, qen, qzh) {
    return '<button type="button" data-q-de="' + esc(qde) + '" data-q-en="' + esc(qen) + '" data-q-zh="' + esc(qzh) + '">' + S(de, en, zh) + '</button>';
  }

  document.body.insertAdjacentHTML('beforeend', html);
  /* Platzhalter sofort in der aktuellen Sprache */
  $$('[data-attr="placeholder"]', $('#nchat-panel')).forEach(function (el) { el.placeholder = el.getAttribute('data-' + lang()) || el.placeholder; });

  /* ===================================================== 2. Crisp ======== */
  if (CFG.crisp) {
    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = CFG.crisp;
    window.CRISP_RUNTIME_CONFIG = { locale: lang() };
    window.$crisp.push(['safe', true]);
    window.$crisp.push(['do', 'chat:hide']);
    window.$crisp.push(['on', 'chat:opened', function () { window.$crisp.push(['do', 'chat:close']); window.$crisp.push(['do', 'chat:hide']); }]);
    window.$crisp.push(['on', 'session:loaded', function () { root.classList.add('crisp-ready'); }]);
    var cs = document.createElement('script');
    cs.src = 'https://client.crisp.chat/l.js'; cs.async = true;
    document.head.appendChild(cs);
  }
  function live() { return root.classList.contains('crisp-ready') && window.$crisp && typeof window.$crisp.get === 'function'; }

  /* ===================================================== 3. Chat ========= */
  var panel = $('#nchat-panel'), body = $('#nchat-body'), text = $('#nchat-text'), launcher = $('.nchat-launcher');
  var KEY = 'nic-chat-log', log = [], typing = null;
  try { log = JSON.parse(sessionStorage.getItem(KEY) || '[]'); } catch (e) { log = []; }
  function saveLog() { try { sessionStorage.setItem(KEY, JSON.stringify(log.slice(-60))); } catch (e) {} }

  function bubble(m) {
    var d = document.createElement('div');
    d.className = 'nb ' + (m.who === 'me' ? 'nb--me' : 'nb--op');
    d.textContent = m.text;
    body.insertBefore(d, typing && typing.parentNode ? typing : null);
    body.scrollTop = body.scrollHeight;
  }
  log.forEach(bubble);
  function addMsg(who, txt) { var m = { who: who, text: txt }; log.push(m); saveLog(); bubble(m); }
  function showTyping(on) {
    if (on && !typing) { typing = document.createElement('div'); typing.className = 'nb nb--op nb--typing'; typing.innerHTML = '<i></i><i></i><i></i>'; body.appendChild(typing); body.scrollTop = body.scrollHeight; }
    else if (!on && typing) { typing.remove(); typing = null; }
  }

  if (window.$crisp) {
    window.$crisp.push(['on', 'message:received', function (m) {
      if (!m || m.from !== 'operator') return;
      var txt = typeof m.content === 'string' ? m.content : (m.content && (m.content.text || m.content.url)) || '';
      if (!txt) return;
      showTyping(false); addMsg('op', txt);
      if (panel.hidden) launcher.classList.add('has-unread');
    }]);
    window.$crisp.push(['on', 'message:compose:received', function (c) { showTyping(c && c.type === 'start'); }]);
  }

  var askedMail = false;
  function askEmail() {
    if (askedMail || !live() || (window.$crisp.get && window.$crisp.get('user:email'))) return;
    askedMail = true;
    var f = document.createElement('form'); f.className = 'nb nb--op nb--mail';
    f.innerHTML = '<span>' + T('Falls Sie die Seite verlassen: Unter welcher E-Mail erreichen wir Sie? (optional)',
                                'In case you leave the page: which e-mail can we reply to? (optional)',
                                '如果您离开页面，我们可以把回复发到哪个邮箱？（选填）') + '</span>' +
      '<div><input type="email" required placeholder="name@firma.de"><button type="submit">OK</button></div>';
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = f.querySelector('input').value.trim(); if (!v) return;
      window.$crisp.push(['set', 'user:email', [v]]);
      f.innerHTML = '<span>' + T('Danke! Wir antworten hier oder per E-Mail.', 'Thank you! We will reply here or by e-mail.', '谢谢！我们会在这里或通过邮件回复您。') + '</span>';
    });
    body.appendChild(f); body.scrollTop = body.scrollHeight;
  }

  function grow() { text.style.height = 'auto'; text.style.height = Math.min(Math.max(text.scrollHeight, 44), 140) + 'px'; }
  function send() {
    var msg = text.value.trim();
    if (!msg) { text.focus(); return; }
    if (live()) {
      window.$crisp.push(['do', 'message:send', ['text', msg]]);
      addMsg('me', msg);
      text.value = ''; grow(); text.focus();
      setTimeout(askEmail, 1200);
    } else {
      /* Ohne Crisp: Nachricht in WhatsApp öffnen */
      addMsg('me', msg);
      window.open(waLink(msg), '_blank', 'noopener');
      text.value = ''; grow();
    }
  }
  function toggleChat(force) {
    var open = typeof force === 'boolean' ? force : panel.hidden;
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', open ? 'true' : 'false');
    root.classList.toggle('nchat-open', open);
    if (open) { launcher.classList.remove('has-unread'); text.focus({ preventScroll: true }); body.scrollTop = body.scrollHeight; }
  }
  $$('[data-chat-toggle]').forEach(function (b) { b.addEventListener('click', function () { toggleChat(); }); });
  $('#nchat-quick').addEventListener('click', function (e) {
    var q = e.target.closest('button'); if (!q) return;
    text.value = q.getAttribute('data-q-' + lang()); grow(); text.focus();
  });
  $('#nchat-form').addEventListener('submit', function (e) { e.preventDefault(); send(); });
  text.addEventListener('input', grow);
  text.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) toggleChat(false); });
  /* Seiten können den Chat mit [data-chat-open] öffnen */
  document.addEventListener('click', function (e) { if (e.target.closest('[data-chat-open]')) { e.preventDefault(); toggleChat(true); } });

  /* ===================================================== 4. Anfrageliste = */
  var inq = { items: [], note: '' };
  try { var saved = JSON.parse(store('nic-inquiry') || 'null'); if (saved && saved.items) inq = saved; } catch (e) {}
  function saveInq() { store('nic-inquiry', JSON.stringify(inq)); }
  var drawer = $('#inq-drawer');

  function count() { return inq.items.reduce(function (a, it) { return a + it.qty; }, 0); }
  function updateBadges() {
    var n = count();
    $$('[data-inq-count]').forEach(function (b) { b.textContent = n; b.setAttribute('data-count', n); });
  }
  function inquiryText() {
    var lines = [T('Anfrage über nicrobotics.de', 'Inquiry via nicrobotics.de', '来自 nicrobotics.de 的询盘'), ''];
    inq.items.forEach(function (it) {
      var p = product(it.id); if (!p) return;
      lines.push('• ' + it.qty + ' × ' + nameOf(p) + ' (' + p.sku + ')');
    });
    if (inq.note && inq.note.trim()) { lines.push(''); lines.push(T('Anmerkung', 'Note', '备注') + ': ' + inq.note.trim()); }
    lines.push(''); lines.push(T('Bitte senden Sie mir ein Angebot.', 'Please send me a quotation.', '请给我发送报价，谢谢。'));
    return lines.join('\n');
  }

  function render() {
    updateBadges();
    var box = $('#inq-items'), foot = $('#inq-foot');
    var r = CFG.root || '';
    if (!inq.items.length) {
      box.innerHTML = '<div class="inq__empty">' +
        '<p>' + S('Ihre Anfrageliste ist noch leer.', 'Your inquiry list is still empty.', '询盘清单还是空的。') + '</p>' +
        '<p class="t-dim">' + S('Fügen Sie Produkte mit „Anfrage“ hinzu und senden Sie die Liste in einem Schritt.', 'Add products with “Inquiry” and send the list in one step.', '点击产品上的“询盘”加入清单，再一次性发送给我们。') + '</p>' +
        '<a class="btn btn--sm" href="' + r + 'produkte/index.html" data-inq-close>' + S('Produkte ansehen', 'View products', '浏览产品') + '</a></div>';
      foot.innerHTML = '';
      return;
    }
    box.innerHTML = inq.items.map(function (it, i) {
      var p = product(it.id); if (!p) return '';
      var img = p.gallery && p.gallery[0] ? '<img src="' + r + 'assets/img/products/' + p.gallery[0] + '.webp" alt="">' : '';
      return '<div class="inq__item">' +
        '<a class="inq__thumb" href="' + r + 'produkte/' + p.slug + '.html" data-inq-close>' + img + '</a>' +
        '<div class="inq__info"><strong>' + esc(nameOf(p)) + '</strong>' +
          '<small>' + esc(p.sku) + ' · ' + (p.price == null ? S('Preis auf Anfrage', 'Price on request', '价格请询盘') : money(p.price) + ' € ' + S('netto', 'net', '净价')) + '</small>' +
          '<div class="inq__qty">' +
            '<button type="button" data-qty="-1" data-i="' + i + '" aria-label="−">−</button>' +
            '<input type="number" min="1" max="999" value="' + it.qty + '" data-qty-in="' + i + '" aria-label="Menge">' +
            '<button type="button" data-qty="1" data-i="' + i + '" aria-label="+">+</button>' +
          '</div></div>' +
        '<button type="button" class="inq__rm" data-rm="' + i + '" aria-label="Entfernen">' + I.trash + '</button>' +
      '</div>';
    }).join('');
    var total = inq.items.reduce(function (a, it) { var p = product(it.id); return a + (p && p.price ? p.price * it.qty : 0); }, 0);
    var askAny = inq.items.some(function (it) { var p = product(it.id); return p && p.price == null; });
    foot.innerHTML =
      '<label class="inq__note"><span>' + S('Anmerkung (optional)', 'Note (optional)', '备注（选填）') + '</span>' +
        '<textarea rows="2" id="inq-note" data-attr="placeholder" data-de="Einsatzort, Termin, Ausstattung…" data-en="Site, timing, configuration…" data-zh="使用场所、时间、配置要求…"></textarea></label>' +
      '<div class="inq__sum"><span>' + S('Richtwert netto', 'Indicative total, net', '参考总价（净价）') + '</span><b>' + money(total) + ' €</b></div>' +
      '<p class="inq__hint">' + S('Unverbindlich. Wir bestätigen Preis, Konfiguration und Lieferzeit persönlich.', 'Non-binding. We confirm price, configuration and lead time personally.', '询盘不具约束力。我们会与您确认价格、配置和交期。') + '</p>' +
      '<button type="button" class="btn btn--block inq__go" data-inq-send="chat">' + I.chat + S('Im Live-Chat senden', 'Send in live chat', '通过在线咨询发送') + '</button>' +
      '<div class="inq__alt">' +
        '<a class="btn btn--ghost btn--sm inq__wa" target="_blank" rel="noopener" data-inq-send="wa" href="#">' + I.wa + 'WhatsApp</a>' +
        '<a class="btn btn--ghost btn--sm" data-inq-send="mail" href="#">' + I.mail + S('E-Mail', 'E-mail', '邮件') + '</a>' +
        '<button type="button" class="inq__clear" data-inq-clear>' + S('Liste leeren', 'Clear list', '清空') + '</button>' +
      '</div>';
    var note = $('#inq-note');
    note.value = inq.note || '';
    note.placeholder = note.getAttribute('data-' + lang());
    note.addEventListener('input', function () { inq.note = note.value; saveInq(); });
  }

  function openInq() { render(); drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); root.classList.add('inq-open'); }
  function closeInq() { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); root.classList.remove('inq-open'); }

  var toastT;
  function toast(msg) {
    var t = $('#inq-toast');
    t.innerHTML = msg + ' <button type="button" data-inq-open>' + T('Ansehen', 'View', '查看') + '</button>';
    t.classList.add('is-on');
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('is-on'); }, 3200);
  }
  function addItem(id) {
    var p = product(id); if (!p) return;
    var hit = null;
    inq.items.forEach(function (it) { if (it.id === id) hit = it; });
    if (hit) hit.qty = Math.min(999, hit.qty + 1); else inq.items.push({ id: id, qty: 1 });
    saveInq(); updateBadges();
    $$('[data-inq-count]').forEach(function (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); });
    toast('✓ ' + esc(nameOf(p)) + ' ' + T('zur Anfrageliste hinzugefügt', 'added to your inquiry list', '已加入询盘清单'));
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    var add = t.closest('[data-inq-add]');
    if (add) { e.preventDefault(); e.stopPropagation(); addItem(add.getAttribute('data-inq-add')); return; }
    if (t.closest('[data-inq-open]')) { e.preventDefault(); $('#inq-toast').classList.remove('is-on'); openInq(); return; }
    if (t.closest('[data-inq-close]')) { closeInq(); return; }
    var q = t.closest('[data-qty]');
    if (q) { var it = inq.items[+q.getAttribute('data-i')]; it.qty = Math.max(1, Math.min(999, it.qty + +q.getAttribute('data-qty'))); saveInq(); render(); return; }
    var rm = t.closest('[data-rm]');
    if (rm) { inq.items.splice(+rm.getAttribute('data-rm'), 1); saveInq(); render(); return; }
    if (t.closest('[data-inq-clear]')) { inq.items = []; inq.note = ''; saveInq(); render(); return; }
    var snd = t.closest('[data-inq-send]');
    if (snd) {
      var how = snd.getAttribute('data-inq-send'), msg = inquiryText();
      if (how === 'wa') { snd.href = waLink(msg); return; }               /* Link öffnet sich selbst */
      e.preventDefault();
      if (how === 'mail') {
        window.location.href = 'mailto:' + CFG.email + '?subject=' + encodeURIComponent(T('Anfrage über die Website', 'Website inquiry', '网站询盘')) + '&body=' + encodeURIComponent(msg);
        return;
      }
      closeInq(); toggleChat(true);
      text.value = msg; grow();
      if (live()) send(); else text.focus();
    }
  }, true);
  document.addEventListener('change', function (e) {
    var i = e.target.getAttribute && e.target.getAttribute('data-qty-in');
    if (i == null) return;
    inq.items[+i].qty = Math.max(1, Math.min(999, parseInt(e.target.value, 10) || 1)); saveInq(); render();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeInq(); });
  document.addEventListener('nic:lang', function () {
    if (drawer.classList.contains('is-open')) render();
    text.placeholder = text.getAttribute('data-' + lang());
  });
  updateBadges();
})();
