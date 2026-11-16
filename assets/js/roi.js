/* NIC Robotics · ROI-Rechner (v48)
   Alle Werte stammen aus den Eingaben der Nutzer; nichts wird übertragen oder gespeichert.
   Formeln siehe Abschnitt „So rechnen wir“ auf der Seite. */
(function () {
  'use strict';
  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-roi]'));
  if (!panels.length) return;

  var lang = function () { var l = document.documentElement.lang; return l === 'en' || l === 'zh' ? l : 'de'; };
  var LOC = { de: 'de-DE', en: 'en-GB', zh: 'zh-CN' };
  var S = {
    payback:   { de: 'bis zur Amortisation', en: 'until payback', zh: '回本时间' },
    months:    { de: 'Monate', en: 'months', zh: '个月' },
    years:     { de: 'Jahre', en: 'years', zh: '年' },
    year:      { de: 'Jahr', en: 'Year', zh: '第' },
    yearSuf:   { de: '', en: '', zh: '年' },
    hours:     { de: 'Betriebsstunden', en: 'operating hours', zh: '运行小时' },
    days:      { de: 'Betriebstage', en: 'operating days', zh: '个运行日' },
    invest:    { de: 'Investition gesamt', en: 'Total investment', zh: '总投入' },
    net:       { de: 'Ersparnis pro Jahr (netto)', en: 'Saving per year (net)', zh: '年净节省' },
    cum:       { de: 'Überschuss nach {n} Jahren', en: 'Surplus after {n} years', zh: '{n} 年累计净收益' },
    costH:     { de: 'Personalkosten je Stunde', en: 'Staff cost per hour', zh: '每小时人工成本' },
    scen:      { de: 'Drei Szenarien', en: 'Three scenarios', zh: '三档情景' },
    low:       { de: 'Vorsichtig', en: 'Cautious', zh: '保守' },
    mid:       { de: 'Mittel', en: 'Middle', zh: '中性' },
    high:      { de: 'Optimistisch', en: 'Optimistic', zh: '乐观' },
    never:     { de: 'keine', en: 'none', zh: '无法回本' },
    noPay:     { de: 'Mit diesen Annahmen amortisiert sich die Anschaffung nicht. Prüfen Sie Betriebsstunden, Aufgabenabdeckung und Betreuungsaufwand.', en: 'With these assumptions the purchase does not pay back. Check operating hours, task coverage and supervision effort.', zh: '按当前假设无法回本。请检查运行小时、任务覆盖率和看护工时。' },
    noPrice:   { de: 'Noch kein Preis eingetragen', en: 'No price entered yet', zh: '尚未填写价格' },
    maxPrice:  { de: 'Bis zu diesem Preis je Roboter rechnet sich die Anschaffung in {n} Jahren', en: 'Up to this price per robot the purchase pays off within {n} years', zh: '单台价格在此以内，{n} 年内可回本' },
    askPrice:  { de: 'Tragen Sie Ihren Angebotspreis ein oder fragen Sie ihn bei uns an.', en: 'Enter your quoted price or request it from us.', zh: '请填入报价，或向我们询价。' },
    cumChart:  { de: 'Kumulierter Überschuss', en: 'Cumulative surplus', zh: '累计净收益' },
    savedH:    { de: 'Eingesparte Arbeitsstunden pro Monat', en: 'Working hours saved per month', zh: '每月节省工时' },
    robotRun:  { de: 'Roboterlaufzeit je Reinigung', en: 'Robot runtime per cleaning', zh: '每次清洁机器人运行时间' },
    capWarn:   { de: 'Hinweis: Für diese Fläche reicht die tägliche Laufzeit von {n} Roboter(n) voraussichtlich nicht (ca. 3 h Scheuern je Ladung, 1,5 h Laden). Bitte Anzahl erhöhen oder Fläche aufteilen.', en: 'Note: for this area the daily runtime of {n} robot(s) is probably not enough (approx. 3 h scrubbing per charge, 1.5 h charging). Please increase the number or split the area.', zh: '提示：按每次充电洗地约 3 小时、充电 1.5 小时计算，{n} 台机器人每天的运行时间可能不够清洁这个面积。请增加台数或拆分面积。' },
    stdWarn:   { de: 'Mehr als 24 Stunden pro Tag sind nicht möglich.', en: 'More than 24 hours per day is not possible.', zh: '每天不能超过 24 小时。' },
    expH:      { de: 'Personenstunden weniger im Gefahrenbereich pro Jahr', en: 'fewer person-hours in the danger zone per year', zh: '每年减少的危险区人·小时' },
    expN:      { de: 'Personeneinsätze im Gefahrenbereich vermieden pro Jahr', en: 'Person-entries into the danger zone avoided per year', zh: '每年避免的人员进入危险区次数' },
    expCost:   { de: 'Kosten je vermiedener Gefahrenstunde', en: 'Cost per hazard hour avoided', zh: '每减少 1 人·小时暴露的成本' },
    yearCost:  { de: 'Kosten pro Jahr (über Nutzungsdauer)', en: 'Cost per year (over service life)', zh: '年均成本（按使用年限）' },
    avoid:     { de: 'Vermeidbare Kosten pro Jahr', en: 'Avoidable costs per year', zh: '每年可避免的损失' },
    lifeNet:   { de: 'Saldo über {n} Jahre', en: 'Balance over {n} years', zh: '{n} 年合计结余' },
    fireNote:  { de: 'Der Wert eines Menschenlebens lässt sich nicht verrechnen. Diese Rechnung zeigt deshalb zuerst, wie viel Gefahrenzeit entfällt. Kosten erscheinen nur, wenn Sie eigene Werte eintragen.', en: 'The value of a human life cannot be offset. This calculation therefore first shows how much hazard time is removed. Costs appear only if you enter your own values.', zh: '生命的价值无法折算。因此这里首先显示减少了多少危险暴露时间；只有填入您自己的数据后才显示金额。' },
    freed:     { de: 'Stunden pro Monat für Pflege freigespielt', en: 'hours per month freed up for care', zh: '每月为护理腾出的小时数' },
    equiv:     { de: 'Entspricht Personalkosten pro Jahr', en: 'Equivalent staff cost per year', zh: '相当于每年人工成本' },
    freedCost: { de: 'Kosten je freigespielter Stunde', en: 'Cost per hour freed up', zh: '每腾出 1 小时的成本' },
    careNote:  { de: 'Personalschlüssel bleiben unberührt: Die freigespielte Zeit steht der Pflege zur Verfügung und ist keine Einsparung von Stellen.', en: 'Staffing ratios remain untouched: the time freed up is available for care and is not a saving on posts.', zh: '人员配比不变：腾出的时间用于护理本身，并不等于减少岗位。' },
    vs:        { de: 'zum Vergleich: {x} je Pflegehilfskraft-Stunde', en: 'for comparison: {x} per care-assistant hour', zh: '对比：护理助理每小时 {x}' },
    mini:      { de: 'Ergebnis', en: 'Result', zh: '结果' },
    summary:   { de: 'ROI-Rechner', en: 'ROI calculator', zh: '投资回报测算' }
  };
  var t = function (k, rep) { var s = S[k][lang()] || S[k].de; if (rep) Object.keys(rep).forEach(function (r) { s = s.replace('{' + r + '}', rep[r]); }); return s; };
  var nf = function (n, d) { return new Intl.NumberFormat(LOC[lang()], { maximumFractionDigits: d || 0, minimumFractionDigits: 0 }).format(n); };
  var eur = function (n, d) { return nf(n, d) + ' €'; };
  var esc = function (v) { return String(v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  function vals(form) {
    var o = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      if (el.type === 'radio') { if (el.checked) o[el.name] = el.value; return; }
      var n = parseFloat(String(el.value).replace(',', '.'));
      o[el.name] = isFinite(n) && n > 0 ? n : 0;
    });
    return o;
  }

  var dur = function (y) {
    if (!isFinite(y) || y <= 0) return { big: '—', unit: '' };
    var m = y * 12;
    if (m < 36) return { big: '≈ ' + nf(Math.max(1, Math.round(m))), unit: t('months') };
    return { big: '≈ ' + nf(y, 1), unit: t('years') };
  };
  var durTxt = function (y) { var d = dur(y); return y > 0 && isFinite(y) ? d.big + ' ' + d.unit : t('never'); };

  var stat = function (label, value, cls) { return '<div class="roi-stat' + (cls ? ' ' + cls : '') + '"><dt>' + esc(label) + '</dt><dd>' + value + '</dd></div>'; };
  var hero = function (big, unit, label) { return '<p class="roi-big"><b>' + esc(big) + '</b>' + (unit ? ' <span>' + esc(unit) + '</span>' : '') + '</p><p class="roi-big__l">' + esc(label) + '</p>'; };

  function chart(invest, net, years) {
    var n = Math.min(10, Math.max(1, Math.round(years))), pts = [], i;
    for (i = 0; i <= n; i++) pts.push(-invest + net * i);
    var max = Math.max.apply(null, pts.concat([0])), min = Math.min.apply(null, pts.concat([0])), span = (max - min) || 1;
    var zero = max / span * 100;
    return '<div class="roi-chart"><p>' + esc(t('cumChart')) + '</p><div class="roi-chart__plot">' + pts.map(function (p, k) {
      var h = Math.abs(p) / span * 100;
      return '<div class="roi-bar' + (p >= 0 ? ' is-pos' : '') + '" title="' + esc(eur(p)) + '"><i style="height:' + h.toFixed(1) + '%;' + (p >= 0 ? 'bottom:' + (100 - zero).toFixed(1) + '%' : 'top:' + zero.toFixed(1) + '%') + '"></i><span>' + k + '</span></div>';
    }).join('') + '<u style="top:' + zero.toFixed(1) + '%"></u></div></div>';
  }

  function scen(list) {
    return '<div class="roi-scen"><p>' + esc(t('scen')) + '</p><ul>' + list.map(function (s, i) {
      return '<li' + (i === 1 ? ' class="is-mid"' : '') + '><span>' + esc(t(['low', 'mid', 'high'][i])) + '</span><b>' + esc(s) + '</b></li>';
    }).join('') + '</ul></div>';
  }

  /* Gemeinsame Auswertung für Rechnungen mit Jahresersparnis */
  function payOut(v, invest, net, chain, extraStats, scenNets) {
    var years = v.jahre || 5, html = '';
    if (net <= 0) {
      html += hero('—', '', t('payback')) + '<p class="roi-warn">' + esc(t('noPay')) + '</p>';
      html += '<dl class="roi-stats">' + stat(t('net'), eur(net)) + (extraStats || '') + '</dl>';
      return html;
    }
    if (!v.preis) {
      var maxP = (net * years - (v.einmal || 0)) / Math.max(1, v.anzahl || 1);
      html += hero(maxP > 0 ? eur(maxP) : '—', '', t('maxPrice', { n: nf(years) }));
      html += '<p class="roi-hintout">' + esc(t('askPrice')) + '</p>';
      html += '<dl class="roi-stats">' + stat(t('net'), eur(net), 'is-good') + (extraStats || '') + '</dl>';
      return html;
    }
    var pb = invest / net, d = dur(pb);
    html += hero(d.big, d.unit, t('payback'));
    if (chain) html += '<p class="roi-chain">' + chain(pb) + '</p>';
    var cum = net * years - invest;
    html += '<dl class="roi-stats">' + stat(t('invest'), eur(invest)) + stat(t('net'), eur(net), 'is-good') +
      stat(t('cum', { n: nf(years) }), eur(cum), cum >= 0 ? 'is-good' : 'is-bad') + (extraStats || '') + '</dl>';
    if (scenNets) html += scen(scenNets.map(function (n) { return n > 0 ? durTxt(invest / n) : t('never'); }));
    html += chart(invest, net, years);
    return html;
  }

  var CALC = {
    labor: function (v) {
      var costH = v.lohn * (1 + v.faktor / 100) * (1 + (v.zuschlag || 0) / 100);
      var tempo = v.tempo ? v.tempo / 100 : 1, units = Math.max(1, v.anzahl || 1);
      var std = Math.min(24, v.std), invest = v.preis * units + v.einmal;
      var netFor = function (abd) { return std * v.tage * units * Math.min(1, abd) * tempo * costH - v.aufsicht * v.tage * costH - v.betrieb; };
      var a = v.abdeckung / 100, net = netFor(a);
      var html = payOut(v, invest, net, function (pb) {
        var days = pb * v.tage, hrs = days * std;
        return nf(hrs) + ' ' + esc(t('hours')) + ' → ' + nf(days) + ' ' + esc(t('days')) + ' → ' + esc(durTxt(pb));
      }, stat(t('costH'), eur(costH, 2)), [netFor(a * 0.75), net, netFor(a * 1.25)]);
      if (v.std > 24) html += '<p class="roi-warn">' + esc(t('stdWarn')) + '</p>';
      return { html: html, sum: { Preis: v.preis, Anzahl: units, 'h/Tag': std, 'Tage/Jahr': v.tage, 'Lohn €/h': v.lohn, 'Abdeckung %': v.abdeckung } };
    },
    clean: function (v) {
      var costH = v.lohn * (1 + v.faktor / 100), units = Math.max(1, v.anzahl || 1);
      var rest = Math.min(100, v.rest) / 100, invest = v.preis * units + v.einmal;
      var savedFor = function (rate) {
        if (!rate) return 0;
        return v.flaeche * v.freq / rate - (rest * v.flaeche * v.freq / rate + v.ruest / 60 * v.freq);
      };
      var saved = savedFor(v.leistMensch), netFor = function (h) { return h * 12 * costH - v.betrieb; };
      var net = netFor(saved);
      var run = v.leistRobot ? v.flaeche * (1 - rest) / v.leistRobot : 0;
      var extra = stat(t('savedH'), nf(Math.max(0, saved)) + ' h') + stat(t('robotRun'), nf(run, 1) + ' h');
      var html = payOut(v, invest, net, null, extra, [netFor(savedFor(v.leistMensch * 1.25)), net, netFor(savedFor(v.leistMensch * 0.8))]);
      if (run > 16 * units) html += '<p class="roi-warn">' + esc(t('capWarn', { n: nf(units) })) + '</p>';
      return { html: html, sum: { Modell: (v.modell || '').toUpperCase(), Preis: v.preis, Anzahl: units, 'Fläche m²': v.flaeche, 'Reinigungen/Monat': v.freq, 'Leistungswert m²/h': v.leistMensch } };
    },
    fire: function (v) {
      var units = Math.max(1, v.anzahl || 1), years = v.jahre || 8, share = Math.min(100, v.anteil) / 100;
      var hrs = v.einsaetze * v.personen * v.minuten / 60 * share, entries = v.einsaetze * v.personen * share;
      var invest = v.preis * units + v.einmal, yearCost = v.preis ? invest / years + v.betrieb : 0;
      var html = hero('≈ ' + nf(hrs, hrs < 10 ? 1 : 0), 'h', t('expH'));
      var st = stat(t('expN'), nf(entries));
      if (v.preis) st += stat(t('yearCost'), eur(yearCost)) + (hrs > 0 ? stat(t('expCost'), eur(yearCost / hrs)) : '');
      var avoid = v.einsaetze * (v.verl / 100) * share * (v.ausfall * v.tagkosten + Math.min(100, v.dauer) / 100 * v.ausbildung) + v.stillstand;
      if (avoid > 0) {
        st += stat(t('avoid'), eur(avoid), 'is-good');
        if (v.preis) { var bal = avoid * years - invest - v.betrieb * years; st += stat(t('lifeNet', { n: nf(years) }), eur(bal), bal >= 0 ? 'is-good' : 'is-bad'); }
      }
      html += '<dl class="roi-stats">' + st + '</dl>';
      if (!v.preis) html += '<p class="roi-hintout">' + esc(t('askPrice')) + '</p>';
      html += '<p class="roi-info">' + esc(t('fireNote')) + '</p>';
      return { html: html, sum: { Preis: v.preis, Anzahl: units, 'Einsätze/Jahr': v.einsaetze, 'Kräfte je Einsatz': v.personen, 'Minuten': v.minuten, 'Anteil Roboter %': v.anteil } };
    },
    care: function (v) {
      var units = Math.max(1, v.anzahl || 1), years = v.jahre || 5;
      var costH = v.lohn * (1 + v.faktor / 100);
      var hYear = v.bewohner * units * v.minuten / 60 * v.tage, invest = v.preis * units + v.einmal;
      var html = hero('≈ ' + nf(hYear / 12), 'h', t('freed'));
      var st = stat(t('equiv'), eur(hYear * costH), 'is-good');
      if (v.preis && hYear > 0) {
        var per = (invest / years + v.betrieb) / hYear;
        st += stat(t('freedCost'), eur(per, 2) + '<small>' + esc(t('vs', { x: eur(costH, 2) })) + '</small>', per <= costH ? 'is-good' : '');
        st += stat(t('invest'), eur(invest));
      }
      html += '<dl class="roi-stats">' + st + '</dl>';
      if (!v.preis) html += '<p class="roi-hintout">' + esc(t('askPrice')) + '</p>';
      html += '<p class="roi-info">' + esc(t('careNote')) + '</p>';
      return { html: html, sum: { Preis: v.preis, Anzahl: units, 'Personen je Roboter': v.bewohner, 'Minuten je Person/Tag': v.minuten } };
    }
  };

  function run(form) {
    var v = vals(form), res = CALC[form.dataset.roi](v);
    form.querySelector('[data-roi-result]').innerHTML = res.html;
    /* Kurzfassung für schmale Bildschirme: bleibt beim Tippen sichtbar */
    var mini = form.querySelector('[data-roi-mini]'), box = form.querySelector('[data-roi-result]');
    if (mini) {
      var b = box.querySelector('.roi-big'), l = box.querySelector('.roi-big__l');
      mini.innerHTML = '<span class="roi-mini__k">' + esc(t('mini')) + '</span><b>' + (b ? esc(b.textContent) : '—') + '</b><span class="roi-mini__l">' + (l ? esc(l.textContent) : '') + '</span><i aria-hidden="true">↓</i>';
    }
    var req = form.querySelector('.roi-f--req'); if (req) req.classList.toggle('is-empty', !v.preis);
    var cta = form.querySelector('[data-roi-cta]');
    if (cta) {
      var name = t('summary') + ' · ' + form.dataset.roiName;
      var werte = Object.keys(res.sum).filter(function (k) { return res.sum[k]; }).map(function (k) { return k + ': ' + res.sum[k]; }).join(' | ');
      cta.href = cta.getAttribute('href').split('?')[0] + '?thema=angebot&produkt=' + encodeURIComponent(name) + '&werte=' + encodeURIComponent(werte);
    }
  }

  panels.forEach(function (form) {
    form.addEventListener('input', function () { run(form); });
    form.addEventListener('change', function () { run(form); });
    run(form);
  });

  /* Reiter */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-roi-tab]'));
  function show(id, push) {
    var ok = panels.some(function (p) { return p.dataset.roiId === id; });
    if (!ok) return;
    panels.forEach(function (p) { p.hidden = p.dataset.roiId !== id; });
    tabs.forEach(function (b) { b.setAttribute('aria-selected', b.dataset.roiTab === id ? 'true' : 'false'); });
    if (push) { try { history.replaceState(null, '', '#' + id); } catch (e) {} }
  }
  tabs.forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.roiTab, true); }); });
  if (location.hash) show(location.hash.slice(1), false);

  document.addEventListener('nic:lang', function () { panels.forEach(run); });
})();
