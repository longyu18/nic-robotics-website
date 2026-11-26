/* ==========================================================================
   NIC ROBOTICS — service, company and legal pages
   ========================================================================== */
const P = require('./partials');
const { SITE, esc, t, attr, sw, swx, ph, ICON, head, header, footer, scripts, offerModal, quickView } = P;

let B;
function ctx() { if (!B) B = require('./build'); return B; }

/* ================================================= PERSONAL OFFER PAGE == */
function buildOffer() {
  const { CATS, PRODUCTS, write } = ctx();
  const r = '../';

  const productOptions = PRODUCTS
    .slice()
    .sort((a, b) => a.category.localeCompare(b.category) || (a.order || 0) - (b.order || 0))
    .map((p) => `<option value="${attr(p.name)} (${esc(p.sku)})"` +
      ` data-de="${attr(p.title ? p.title.de : p.name)} — ${esc(p.family.de)}"` +
      ` data-en="${attr(p.title ? p.title.en : p.name)} — ${esc(p.family.en)}"` +
      ` data-zh="${attr(p.title ? (p.title.zh || p.title.de) : p.name)} — ${esc(p.family.zh || p.family.de)}">` +
      `${attr(p.title ? p.title.de : p.name)} — ${esc(p.family.de)}</option>`)
    .join('');

  const html = `${head({
    title: 'Persönliches Angebot',
    description: 'Fordern Sie ein persönliches Angebot für Vierbeiner- und Rad-Bein-Roboter an: Konfiguration, Stückzahl, Wunschpreis und Lieferzeit. Antwort innerhalb eines Werktages.',
    path: '/service/angebot.html',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main">
  <section class="page-hero page-hero--plain">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${sw('Start', 'Home')}</a></li>
        <li>${sw('Service', 'Service')}</li>
        <li>${sw('Persönliches Angebot', 'Personal quote')}</li>
      </ol>
      <h1>${sw('Persönliches Angebot', 'Personal quote')}</h1>
      <p class="t-lead" style="max-width:62ch;margin-top:.9rem">${sw(
        'Die Listenpreise auf dieser Website sind ein Ausgangspunkt, kein Endpunkt. Stückzahl, Konfiguration, Lieferzeit und Einsatzzweck verändern den Preis — und zwar häufig zu Ihren Gunsten. Sagen Sie uns Ihr Budget, auch wenn es unter dem Listenpreis liegt.',
        'The list prices on this site are a starting point, not an end point. Quantity, configuration, lead time and intended use all move the price — often in your favour. Tell us your budget, even if it sits below the list price.'
      )}</p>
    </div>
  </section>

  <section class="section section--flush-top" style="padding-top:var(--gap-l)">
    <div class="wrap">
      <div class="grid form-layout">

        <div class="form-card reveal">
          <form data-validate data-mailto="${SITE.emailSales}" novalidate>
            <div class="form-status" role="status" aria-live="polite"></div>

            <fieldset class="fset">
              <legend>${sw('1 · Worum geht es', '1 · What this is about')}</legend>
              <p class="legend-note">${sw('Wählen Sie ein Modell oder beschreiben Sie Ihre Anforderung frei.', 'Pick a model or describe your requirement in your own words.')}</p>
              <div class="field-grid field-grid--2">
                <div class="field span-2">
                  <label for="of-product">${sw('Produkt', 'Product')}</label>
                  <select class="select" id="of-product" name="produkt" data-fill="product">
                    <option value="">${sw('— Noch nicht festgelegt / Beratung gewünscht —', '— Not decided yet / advice wanted —')}</option>
                    ${productOptions}
                  </select>
                </div>
                <div class="field">
                  <label for="of-qty">${sw('Stückzahl', 'Quantity')}</label>
                  <input class="input" type="number" id="of-qty" name="stueckzahl" min="1" value="1">
                  <span class="hint">${sw('Ab zwei Einheiten gelten Staffelpreise.', 'Tiered pricing applies from two units.')}</span>
                </div>
                <div class="field">
                  <label for="of-target">${sw('Wunschpreis je Stück', 'Target price per unit')} <span class="opt">${sw('optional', 'optional')}</span></label>
                  <div class="input-group">
                    <input class="input" type="number" id="of-target" name="wunschpreis" min="0" step="100" placeholder="—">
                    <span class="unit">EUR</span>
                  </div>
                  <span class="hint">${sw('Netto, ohne USt.', 'Net, excluding VAT.')}</span>
                </div>
                <div class="field span-2">
                  <label for="of-when">${sw('Geplanter Beschaffungszeitraum', 'Planned procurement window')}</label>
                  <select class="select" id="of-when" name="zeitraum">
                    <option value="sofort">${sw('Sofort — Budget ist freigegeben', 'Now — budget approved')}</option>
                    <option value="quartal">${sw('Innerhalb dieses Quartals', 'Within this quarter')}</option>
                    <option value="jahr" selected>${sw('Innerhalb dieses Jahres', 'Within this year')}</option>
                    <option value="projekt">${sw('Noch in der Projektierung', 'Still at planning stage')}</option>
                    <option value="info">${sw('Nur Information, keine Beschaffung', 'Information only, no procurement')}</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset class="fset">
              <legend>${sw('2 · Ihr Einsatzfall', '2 · Your application')}</legend>
              <div class="field-grid">
                <div class="field">
                  <label for="of-case">${sw('Wo und wofür soll der Roboter arbeiten?', 'Where and what for will the robot work?')}</label>
                  <textarea class="textarea" id="of-case" name="einsatzfall"
                    ${ph(
                      'Zum Beispiel: Nächtliche Inspektionsrunde in einem Umspannwerk, Wärmebild an 40 Klemmstellen, Übergabe der Daten an unser Leitsystem. Treppen, Schotter, im Winter Schnee.',
                      'For example: a nightly inspection round in a substation, thermal images of 40 terminals, data handed to our control system. Stairs, gravel, snow in winter.',
                      '例如：变电站夜间巡检一圈，对 40 个接线端子做热成像，数据回传到我们的控制系统。路线上有楼梯、碎石，冬天还有积雪。'
                    )}></textarea>
                  <span class="hint">${sw(
                    'Je konkreter Sie die Aufgabe beschreiben, desto genauer wird das Angebot. Wir sagen Ihnen auch, wenn ein kleineres Modell reicht.',
                    'The more concretely you describe the task, the more accurate the quote. We will also tell you when a smaller model is enough.'
                  )}</span>
                </div>
                <div class="field">
                  <label>${sw('Was brauchen Sie zusätzlich zum Gerät?', 'What do you need beyond the machine itself?')}</label>
                  <div class="choice">
                    ${[
                      ['integration', 'Integration in unser Leitsystem', 'Integration into our control system'],
                      ['nutzlast', 'Zusätzliche Nutzlast oder Sensorik', 'Additional payload or sensors'],
                      ['schulung', 'Schulung für unser Personal', 'Training for our staff'],
                      ['wartung', 'Wartungsvertrag', 'Maintenance contract'],
                      ['miete', 'Miete statt Kauf', 'Rental instead of purchase']
                    ].map(([v, de, en]) => `
                    <label><input type="checkbox" name="bedarf" value="${v}"><span>${sw(de, en)}</span></label>`).join('')}
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset class="fset">
              <legend>${sw('3 · Ihre Kontaktdaten', '3 · Your contact details')}</legend>
              <div class="field-grid field-grid--2">
                <div class="field">
                  <label for="of-name">${sw('Name', 'Name')} <span class="req">*</span></label>
                  <input class="input" type="text" id="of-name" name="name" required autocomplete="name">
                  <span class="err-msg">${sw('Bitte Namen angeben.', 'Please enter your name.')}</span>
                </div>
                <div class="field">
                  <label for="of-company">${sw('Firma / Einrichtung', 'Company / institution')} <span class="req">*</span></label>
                  <input class="input" type="text" id="of-company" name="firma" required autocomplete="organization">
                  <span class="err-msg">${sw('Bitte Firma angeben.', 'Please enter your organisation.')}</span>
                </div>
                <div class="field">
                  <label for="of-email">E-Mail <span class="req">*</span></label>
                  <input class="input" type="email" id="of-email" name="email" required autocomplete="email">
                  <span class="err-msg">${sw('Bitte gültige E-Mail angeben.', 'Please enter a valid e-mail.')}</span>
                </div>
                <div class="field">
                  <label for="of-phone">${sw('Telefon', 'Phone')} <span class="opt">${sw('optional', 'optional')}</span></label>
                  <input class="input" type="tel" id="of-phone" name="telefon" autocomplete="tel">
                  <span class="hint">${sw('Für Rückfragen oft der schnellste Weg.', 'Often the quickest route for follow-up questions.')}</span>
                </div>
                <div class="field span-2">
                  <label for="of-country">${sw('Land', 'Country')}</label>
                  <input class="input" type="text" id="of-country" name="land" value="Deutschland" autocomplete="country-name">
                </div>
                <div class="field span-2">
                  <label class="consent">
                    <input type="checkbox" name="datenschutz" required>
                    <span>${sw(
                      'Ich willige ein, dass meine Angaben zur Bearbeitung der Anfrage gespeichert und verwendet werden.',
                      'I consent to my details being stored and used to process this enquiry.'
                    )} <a href="${r}unternehmen/datenschutz.html">${sw('Datenschutzerklärung', 'Privacy notice')}</a> <span class="req">*</span></span>
                  </label>
                  <span class="err-msg">${sw('Bitte bestätigen Sie die Datenschutzerklärung.', 'Please confirm the privacy notice.')}</span>
                </div>
              </div>
            </fieldset>

            <div class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>

            <div class="cluster mt-l">
              <button class="btn btn--lg btn--arrow" type="submit">${sw('Angebot anfordern', 'Request quote')} ${ICON.arrow}</button>
              <span class="t-small t-dim">${sw('Unverbindlich. Antwort innerhalb eines Werktages.', 'Without obligation. Reply within one working day.')}</span>
            </div>
          </form>
        </div>

        <aside class="stack reveal" data-delay="1">
          <div class="panel">
            <h3 style="font-size:var(--step-1);margin-bottom:1rem">${sw('Was Sie zurückbekommen', 'What you get back')}</h3>
            <ul class="ticks">
              <li>${sw('Ein schriftliches Angebot mit Positionspreisen, keine Preisspanne', 'A written quote with line prices, not a range')}</li>
              <li>${sw('Verbindliche Lieferzeit und Zahlungsbedingungen', 'A firm lead time and payment terms')}</li>
              <li>${sw('Eine ehrliche Einschätzung, ob das Modell zu Ihrer Aufgabe passt', 'An honest assessment of whether the model fits your task')}</li>
            </ul>
          </div>
          <div class="panel">
            <h3 style="font-size:var(--step-1);margin-bottom:.8rem">${sw('Lieber direkt sprechen?', 'Prefer to talk?')}</h3>
            <p class="t-small t-muted" style="margin-bottom:1rem">${sw(
              'Für Projekte mit mehreren Einheiten, Sonderkonfigurationen oder Ausschreibungen ist ein Telefonat meist schneller als ein Formular.',
              'For multi-unit projects, special configurations or tenders, a phone call is usually quicker than a form.'
            )}</p>
            <div class="footer-contact">
              <a href="tel:${SITE.phoneHref}">${ICON.phone} ${SITE.phone}</a>
              <a href="mailto:${SITE.emailSales}">${ICON.mail} ${SITE.emailSales}</a>
            </div>
          </div>
          <div class="panel">
            <h3 style="font-size:var(--step-1);margin-bottom:.8rem">${sw('Für öffentliche Auftraggeber', 'For public buyers')}</h3>
            <p class="t-small t-muted">${sw(
              'Hochschulen, Feuerwehren, Stadtwerke und Behörden erhalten Angebote im Format, das Ihre Beschaffung verlangt — inklusive Leistungsverzeichnis, Eignungsnachweisen und Angaben zur Bindefrist.',
              'Universities, fire services, municipal utilities and public bodies receive quotes in the format your procurement requires — including a schedule of services, suitability evidence and validity periods.'
            )}</p>
          </div>
        </aside>

      </div>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${scripts(1)}`;

  write('service/angebot.html', html);
}

/* ============================================== REPARATUR PAGE (RMA) == */
/* Formular sendet per fetch an /api/reparatur (Cloudflare Pages Function,
   functions/api/reparatur.js). Empfängeradresse wird dort per Umgebungsvariable gesetzt. */
function buildRMA() {
  const { CATS, PRODUCTS, write } = ctx();
  const r = '../';

  const productOptions = PRODUCTS
    .map((p) => `<option value="${attr((p.title ? p.title.de : p.name) + ' (' + p.sku + ')')}"${p.title ? ` data-de="${attr(p.title.de)} (${esc(p.sku)})" data-en="${attr(p.title.en)} (${esc(p.sku)})" data-zh="${attr(p.title.zh || p.title.de)} (${esc(p.sku)})"` : ''}>${attr(p.title ? p.title.de : p.name)} (${esc(p.sku)})</option>`)
    .join('');

  const FAULTS = [
    [['Software', 'Software', '软件问题'], [
      ['Software: App / Steuerung', 'App / control', 'App / 控制'],
      ['Software: Firmware / Update', 'Firmware / update', '固件 / 升级'],
      ['Software: Navigation / Lokalisierung', 'Navigation / localisation', '导航 / 定位'],
      ['Software: Fehlermeldung', 'Error message', '报错提示']
    ]],
    [['Hardware', 'Hardware', '硬件问题'], [
      ['Hardware: Antrieb / Gelenk / Motor', 'Drive / joint / motor', '驱动 / 关节 / 电机'],
      ['Hardware: Akku / Laden', 'Battery / charging', '电池 / 充电'],
      ['Hardware: Sensor / Kamera / Lidar', 'Sensor / camera / lidar', '传感器 / 摄像头 / 激光雷达'],
      ['Hardware: Mechanischer Schaden / Sturz', 'Mechanical damage / fall', '机械损伤 / 摔落']
    ]]
  ];

  const html = `${head({
    title: 'Reparatur melden',
    description: 'Reparatur- und Garantiefall online melden: Firma, Rechnungsnummer, Fehlerart, Fotos. Prüfung im Servicezentrum bei Frankfurt, Rückmeldung schnell und direkt.',
    path: '/service/reparatur.html',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main">
  <section class="page-hero page-hero--plain">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${swx('Start', 'Home', '首页')}</a></li>
        <li><a href="${r}service/index.html">${swx('Service & Support', 'Service & Support', '技术服务')}</a></li>
        <li>${swx('Reparatur melden', 'Report a repair', '返修申请')}</li>
      </ol>
      <h1>${swx('Reparatur melden', 'Report a repair', '返修申请')}</h1>
      <p class="t-lead" style="max-width:64ch;margin-top:.9rem">${swx(
        'Unsere Roboter laufen sehr zuverlässig, Reparaturen sind selten. Wenn doch etwas ist, füllen Sie dieses Formular aus — es geht direkt an unser Serviceteam, ohne E-Mail-Programm.',
        'Our robots run very reliably and repairs are rare. If something does come up, fill in this form — it goes straight to our service team, no e-mail program needed.',
        '我们的机器人质量稳定，返修率低。如确有故障，请填写此表单——提交后直接发送给我们的服务团队，无需打开邮箱。'
      )}</p>
    </div>
  </section>

  <section class="section section--tight section--flush-top" style="padding-top:var(--gap-l)">
    <div class="wrap">
      <ol class="steps reveal" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));display:grid;gap:var(--gap)">
        ${[
          ['Formular senden', 'Send the form', '提交表单',
           'Firma, Kontakt, Fehlerart und gern Fotos. Ein Klick — und der Fall liegt bei uns.',
           'Company, contact, fault type and ideally photos. One click and the case is with us.',
           '填写公司、联系人、故障类型，最好附上照片。点击发送，工单即到我们这里。'],
          ['Schnelle Rückmeldung', 'Fast reply', '快速回复',
           'Wir melden uns zügig. Oft lässt sich der Fehler per Ferndiagnose der Geräte-Logs eingrenzen: Software oder Hardware.',
           'We get back to you quickly. Often the fault can be narrowed down by remote diagnosis of the unit’s logs: software or hardware.',
           '我们会尽快回复。很多情况下可通过远程读取设备日志，判断是软件还是硬件问题。'],
          ['Einsendung, wenn nötig', 'Ship in, if needed', '必要时寄修',
           'Ist eine Reparatur vor Ort nötig, schicken Sie das Gerät an unser Servicezentrum bei Frankfurt. Die Adresse erhalten Sie mit unserer Antwort.',
           'If a hands-on repair is needed, you send the unit to our service centre near Frankfurt. You receive the address with our reply.',
           '如需实机维修，请将设备寄到我们位于法兰克福周边的维修中心，地址随回复告知。'],
          ['Bericht und Behebung', 'Report and fix', '出具报告并修复',
           'Im Garantiefall erhalten Sie in der Regel innerhalb einer Woche nach Eingang den Prüfbericht; übliche Fehler sind bis dahin behoben.',
           'For warranty cases you usually receive the inspection report within one week of receipt; common faults are fixed by then.',
           '保修期内，设备送达后一般一周内出具检测报告，并完成常规故障排查与维护。']
        ].map(([de, en, zh, bde, ben, bzh]) => `
        <li>
          <div>
            <h4>${swx(de, en, zh)}</h4>
            <p class="t-small t-muted">${swx(bde, ben, bzh)}</p>
          </div>
        </li>`).join('')}
      </ol>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <div class="grid form-layout">

        <div class="form-card reveal">
          <form data-validate data-repair action="/api/reparatur" method="post" enctype="multipart/form-data" novalidate>
            <div class="form-status" role="status" aria-live="polite"></div>

            <fieldset class="fset">
              <legend>${swx('1 · Firma und Kontakt', '1 · Company and contact', '1 · 公司与联系人')}</legend>
              <div class="field-grid field-grid--2">
                <div class="field">
                  <label for="rp-company">${swx('Firma / Einrichtung', 'Company / institution', '公司 / 机构名称')} <span class="req">*</span></label>
                  <input class="input" type="text" id="rp-company" name="firma" required autocomplete="organization" maxlength="160">
                  <span class="err-msg">${swx('Bitte Firma angeben.', 'Please enter your company.', '请填写公司名称。')}</span>
                </div>
                <div class="field">
                  <label for="rp-name">${swx('Ansprechpartner', 'Contact person', '联系人姓名')} <span class="req">*</span></label>
                  <input class="input" type="text" id="rp-name" name="name" required autocomplete="name" maxlength="120">
                  <span class="err-msg">${swx('Bitte Namen angeben.', 'Please enter your name.', '请填写联系人姓名。')}</span>
                </div>
                <div class="field">
                  <label for="rp-email">E-Mail <span class="req">*</span></label>
                  <input class="input" type="email" id="rp-email" name="email" required autocomplete="email" maxlength="160">
                  <span class="hint">${swx('An diese Adresse antworten wir.', 'We reply to this address.', '我们会回复到这个邮箱。')}</span>
                  <span class="err-msg">${swx('Bitte gültige E-Mail angeben.', 'Please enter a valid e-mail.', '请填写有效的邮箱地址。')}</span>
                </div>
                <div class="field">
                  <label for="rp-phone">${swx('Telefon', 'Phone', '电话')} <span class="opt">${swx('optional', 'optional', '选填')}</span></label>
                  <input class="input" type="tel" id="rp-phone" name="telefon" autocomplete="tel" maxlength="60">
                </div>
              </div>
            </fieldset>

            <fieldset class="fset">
              <legend>${swx('2 · Gerät und Rechnung', '2 · Unit and invoice', '2 · 设备与发票')}</legend>
              <div class="field-grid field-grid--2">
                <div class="field">
                  <label for="rp-invoice">${swx('Rechnungsnummer', 'Invoice number', '发票号')} <span class="opt">${swx('empfohlen', 'recommended', '建议填写')}</span></label>
                  <input class="input" type="text" id="rp-invoice" name="rechnungsnummer" maxlength="80">
                  <span class="hint">${swx('Damit ordnen wir den Garantiefall sofort zu.', 'Lets us match the warranty case right away.', '便于我们立即核对保修信息。')}</span>
                </div>
                <div class="field">
                  <label for="rp-serial">${swx('Seriennummer', 'Serial number', '序列号')} <span class="opt">${swx('optional', 'optional', '选填')}</span></label>
                  <input class="input" type="text" id="rp-serial" name="seriennummer" maxlength="80">
                </div>
                <div class="field span-2">
                  <label for="rp-product">${swx('Produkt', 'Product', '产品')} <span class="opt">${swx('optional', 'optional', '选填')}</span></label>
                  <select class="select" id="rp-product" name="produkt">
                    <option value="">${swx('— bitte wählen —', '— please select —', '— 请选择 —')}</option>
                    ${productOptions}
                    <option value="Anderes Produkt">${swx('Anderes Produkt', 'Other product', '其他产品')}</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset class="fset">
              <legend>${swx('3 · Art des Fehlers', '3 · Type of fault', '3 · 故障类型')}</legend>
              <p class="legend-note">${swx('Mehrfachauswahl möglich. Wenn Sie unsicher sind, wählen Sie „Weiß ich nicht“.', 'Select all that apply. If unsure, choose “Not sure”.', '可多选。不确定时请选“不确定”。')}</p>
              <div class="fault-grid">
                ${FAULTS.map(([g, items]) => `
                <div class="fault-col">
                  <p class="fault-col__h">${swx(...g)}</p>
                  <div class="choice">
                    ${items.map(([val, en, zh]) => `<label><input type="checkbox" name="fehlerart" value="${attr(val)}"><span>${swx(val.replace(/^(Software|Hardware): /, ''), en, zh)}</span></label>`).join('')}
                  </div>
                </div>`).join('')}
              </div>
              <div class="choice mt-s">
                <label><input type="checkbox" name="fehlerart" value="Weiß ich nicht"><span>${swx('Weiß ich nicht — bitte prüfen', 'Not sure — please check', '不确定，请帮忙判断')}</span></label>
              </div>
            </fieldset>

            <fieldset class="fset">
              <legend>${swx('4 · Fotos', '4 · Photos', '4 · 故障照片')} <span class="opt">${swx('optional', 'optional', '选填')}</span></legend>
              <div class="field">
                <label class="dropzone" data-list="rp-files" data-max-mb="25" for="rp-upload">
                  ${ICON.upload}
                  <strong>${swx('Fotos hierher ziehen oder auswählen', 'Drag photos here or choose them', '拖入或选择照片')}</strong>
                  <span class="hint">${swx('Bis zu 6 Fotos · JPG, PNG, WebP oder HEIC · werden vor dem Senden automatisch verkleinert', 'Up to 6 photos · JPG, PNG, WebP or HEIC · automatically reduced before sending', '最多 6 张 · JPG、PNG、WebP 或 HEIC · 发送前自动压缩')}</span>
                  <input type="file" id="rp-upload" name="fotos" multiple accept="image/*">
                </label>
                <ul class="filelist" id="rp-files"></ul>
              </div>
            </fieldset>

            <fieldset class="fset">
              <legend>${swx('5 · Beschreibung', '5 · Description', '5 · 备注说明')} <span class="opt">${swx('optional', 'optional', '选填')}</span></legend>
              <div class="field">
                <label class="sr-only" for="rp-desc">${swx('Beschreibung', 'Description', '备注说明')}</label>
                <textarea class="textarea" id="rp-desc" name="beschreibung" maxlength="4000" ${ph(
                  'Was ist passiert? Wann tritt der Fehler auf, lässt er sich wiederholen? Gab es eine Fehlermeldung, einen Sturz oder Wassereintritt?',
                  'What happened? When does the fault occur, can it be repeated? Was there an error message, a fall or water ingress?',
                  '发生了什么？故障在什么情况下出现，能否复现？是否有报错提示、摔落或进水？'
                )}></textarea>
              </div>
              <div class="field mt-s">
                <label class="consent">
                  <input type="checkbox" name="datenschutz" value="ja" required>
                  <span>${swx(
                    'Ich willige ein, dass meine Angaben und Fotos zur Bearbeitung des Reparaturfalls gespeichert und verwendet werden.',
                    'I consent to my details and photos being stored and used to process this repair case.',
                    '我同意为处理本次返修而保存和使用我提供的信息与照片。'
                  )} <a href="${r}unternehmen/datenschutz.html">${swx('Datenschutzerklärung', 'Privacy notice', '隐私政策')}</a> <span class="req">*</span></span>
                </label>
                <span class="err-msg">${swx('Bitte bestätigen Sie die Datenschutzerklärung.', 'Please confirm the privacy notice.', '请确认隐私政策。')}</span>
              </div>
            </fieldset>

            <div class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>

            <div class="cluster mt-l">
              <button class="btn btn--lg btn--arrow" type="submit">${swx('Reparatur senden', 'Send repair request', '发送返修申请')} ${ICON.arrow}</button>
              <span class="t-small t-dim">${swx('Pflichtfelder sind mit * markiert.', 'Required fields are marked *.', '带 * 为必填项。')}</span>
            </div>
          </form>
        </div>

        <aside class="stack reveal" data-delay="1">
          <div class="panel panel--glow">
            <h3 style="font-size:var(--step-1);margin-bottom:.8rem">${swx('Gut zu wissen', 'Good to know', '须知')}</h3>
            <ul class="ticks">
              <li>${swx('Bitte schicken Sie kein Gerät ohne unsere Rückmeldung — oft löst die Ferndiagnose das Problem schneller.', 'Please do not ship a unit before we reply — remote diagnosis often solves the problem faster.', '请在收到我们回复后再寄送设备——很多问题通过远程诊断就能更快解决。')}</li>
              <li>${swx('Reparatur im Servicezentrum bei Frankfurt. Ins Werk nur bei schweren Schäden, die wir hier nicht beheben können.', 'Repair at our service centre near Frankfurt. To the factory only for major faults we cannot fix here.', '在法兰克福周边的维修中心维修；仅重大故障无法在此修复时才寄回工厂。')}</li>
              <li>${swx('Akkus unterliegen der Gefahrgutvorschrift. Wir nennen Ihnen den zulässigen Versandweg.', 'Batteries are dangerous goods. We tell you the permitted shipping route.', '电池属于危险品，我们会告知合规的寄送方式。')}</li>
            </ul>
          </div>

          <div class="panel">
            <h3 style="font-size:var(--step-1);margin-bottom:.8rem">${swx('Verschleißteile', 'Wear parts', '易损件')}</h3>
            <p class="t-small t-muted">${swx(
              'Fußpads, Akkus und Schutzteile haben wir auf Lager. In der Garantie tauschen wir schnell; danach können Sie sie bei uns kaufen und mit offizieller Anleitung selbst wechseln.',
              'Foot pads, batteries and protective parts are in stock. Under warranty we replace them fast; afterwards you can buy them from us and swap them yourself with official instructions.',
              '足垫、电池和防护件均有库存。质保期内快速更换；过保后可向我们购买，并按官方指导自行更换。'
            )}</p>
            <p style="margin-top:.8rem"><a class="link" href="${r}produkte/ersatzteile.html">${swx('Zu den Ersatzteilen', 'To spare parts', '查看备件')} ${ICON.arrow}</a></p>
          </div>

          <div class="panel">
            <h3 style="font-size:var(--step-1);margin-bottom:.8rem">${swx('Lieber per E-Mail?', 'Prefer e-mail?', '更习惯用邮件？')}</h3>
            <div class="footer-contact">
              <a href="mailto:${SITE.emailService}">${ICON.mail} ${SITE.emailService}</a>
            </div>
          </div>
        </aside>

      </div>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${scripts(1)}`;

  write('service/reparatur.html', html);

  // Alte Adresse leitet weiter
  write('service/ruecksendung.html', `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><title>Reparatur melden · NIC Robotics</title>
<meta name="robots" content="noindex"><link rel="canonical" href="${SITE.domain}/service/reparatur.html">
<meta http-equiv="refresh" content="0; url=reparatur.html"></head>
<body><p><a href="reparatur.html">Reparatur melden / Report a repair</a></p></body></html>
`);
}

/* ======================================================== CONTACT PAGE == */
function buildContact() {
  const { CATS, PRODUCTS, write } = ctx();
  const r = '../';

  const html = `${head({
    title: 'Kontakt & Beratung',
    description: 'Kontakt zu NIC Robotics: Beratung, Pilotprojekte und Service. An Yuan GmbH, Schwalbach am Taunus.',
    path: '/service/kontakt.html',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main">
  <section class="page-hero">
    <div class="page-hero__media">
      <picture>
        <source srcset="${r}assets/img/scenes/x30-control.webp" type="image/webp">
        <img src="${r}assets/img/scenes/x30-control.jpg" alt="" width="1920" height="1080">
      </picture>
    </div>
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${sw('Start', 'Home')}</a></li>
        <li>${sw('Kontakt', 'Contact')}</li>
      </ol>
      <h1>${sw('Kontakt & Beratung', 'Contact & advice')}</h1>
      <p class="t-lead" style="max-width:60ch;margin-top:.9rem">${sw(
        'Schreiben Sie uns, worum es geht — nicht, welches Modell Sie suchen. Welches passt, finden wir gemeinsam heraus, und manchmal lautet die ehrliche Antwort: noch keines.',
        'Tell us what the job is — not which model you are after. Which one fits is something we work out together, and sometimes the honest answer is: none yet.'
      )}</p>
    </div>
  </section>

  <section class="section section--flush-top" style="padding-top:var(--gap-l)">
    <div class="wrap">
      <div class="grid form-layout">

        <div class="form-card reveal">
          <form data-validate data-mailto="${SITE.email}" novalidate>
            <div class="form-status" role="status" aria-live="polite"></div>
            <div class="field-grid field-grid--2">
              <div class="field span-2">
                <label for="k-subject">${sw('Worum geht es?', 'What is it about?')}</label>
                <select class="select" id="k-subject" name="anliegen">
                  <option value="beratung">${sw('Beratung — welches Gerät passt zu meiner Aufgabe?', 'Advice — which machine fits my task?')}</option>
                  <option value="technik">${swx('Technische Frage zu einem Modell', 'Technical question about a model', '产品技术问题咨询')}</option>
                  <option value="angebot">${sw('Angebot und Preise', 'Quotation and pricing')}</option>
                  <option value="pilot">${swx('Pilotprojekt', 'Pilot project', '试点项目')}</option>
                  <option value="miete">${sw('Miete für eine Projektlaufzeit', 'Rental for a project duration')}</option>
                  <option value="integration">${sw('Integration und Engineering', 'Integration and engineering')}</option>
                  <option value="service">${sw('Service, Ersatzteile, Reparatur', 'Service, spare parts, repair')}</option>
                  <option value="partner">${sw('Partnerschaft oder Wiederverkauf', 'Partnership or reselling')}</option>
                  <option value="presse">${sw('Presse und Medien', 'Press and media')}</option>
                </select>
              </div>
              <div class="field">
                <label for="k-name">${sw('Name', 'Name')} <span class="req">*</span></label>
                <input class="input" type="text" id="k-name" name="name" required autocomplete="name">
                <span class="err-msg">${sw('Bitte Namen angeben.', 'Please enter your name.')}</span>
              </div>
              <div class="field">
                <label for="k-company">${sw('Firma / Einrichtung', 'Company / institution')}</label>
                <input class="input" type="text" id="k-company" name="firma" autocomplete="organization">
              </div>
              <div class="field">
                <label for="k-email">E-Mail <span class="req">*</span></label>
                <input class="input" type="email" id="k-email" name="email" required autocomplete="email">
                <span class="err-msg">${sw('Bitte gültige E-Mail angeben.', 'Please enter a valid e-mail.')}</span>
              </div>
              <div class="field">
                <label for="k-phone">${sw('Telefon', 'Phone')} <span class="opt">${sw('optional', 'optional')}</span></label>
                <input class="input" type="tel" id="k-phone" name="telefon" autocomplete="tel">
              </div>
              <div class="field span-2">
                <label for="k-msg">${sw('Ihre Nachricht', 'Your message')} <span class="req">*</span></label>
                <textarea class="textarea" id="k-msg" name="nachricht" required
                  ${ph(
                    'Beschreiben Sie Ihre Aufgabe, Ihr Gelände, die Umgebungsbedingungen und was der Roboter leisten müsste.',
                    'Describe your task, your site, the ambient conditions and what the robot would have to achieve.',
                    '请描述您的任务、场地、环境条件，以及机器人需要达到的能力。'
                  )}></textarea>
                <span class="err-msg">${sw('Bitte eine Nachricht eingeben.', 'Please enter a message.')}</span>
              </div>
              <div class="field span-2">
                <label class="consent">
                  <input type="checkbox" name="datenschutz" required>
                  <span>${sw(
                    'Ich willige ein, dass meine Angaben zur Bearbeitung der Anfrage gespeichert und verwendet werden.',
                    'I consent to my details being stored and used to process this enquiry.'
                  )} <a href="${r}unternehmen/datenschutz.html">${sw('Datenschutzerklärung', 'Privacy notice')}</a> <span class="req">*</span></span>
                </label>
                <span class="err-msg">${sw('Bitte bestätigen Sie die Datenschutzerklärung.', 'Please confirm the privacy notice.')}</span>
              </div>
            </div>
            <div class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
            <div class="cluster mt-l">
              <button class="btn btn--lg btn--arrow" type="submit">${sw('Nachricht senden', 'Send message')} ${ICON.arrow}</button>
              <span class="t-small t-dim">${sw('Antwort innerhalb eines Werktages.', 'Reply within one working day.')}</span>
            </div>
          </form>
        </div>

        <aside class="stack reveal" data-delay="1">
          <div class="panel">
            <h3 style="font-size:var(--step-1);margin-bottom:1rem">${sw('Direkt', 'Direct')}</h3>
            <div class="footer-contact" style="gap:.8rem">
              <a href="tel:${SITE.phoneHref}">${ICON.phone} ${SITE.phone}</a>
              <a href="mailto:${SITE.email}">${ICON.mail} ${SITE.email}</a>
              <a href="mailto:${SITE.emailSales}">${ICON.tag} ${SITE.emailSales}</a>
              <a href="mailto:${SITE.emailService}">${ICON.wrench} ${SITE.emailService}</a>
            </div>
          </div>
          <div class="panel">
            <h3 style="font-size:var(--step-1);margin-bottom:1rem">${sw('Anschrift', 'Address')}</h3>
            <address style="font-style:normal;line-height:1.75;color:var(--fg-muted)">
              <strong style="color:var(--fg)">NIC Robotics</strong><br>
              ${sw('eine Marke der', 'a brand of')} ${SITE.legal}<br>
              ${SITE.street}<br>
              ${SITE.zipCity}<br>
              ${SITE.country}
            </address>
            <p class="t-small t-dim" style="margin-top:1rem">${swx('Besuche nach Vereinbarung.', 'Visits by arrangement.', '来访请提前预约。')}</p>
          </div>
          <div class="panel">
            <h3 style="font-size:var(--step-1);margin-bottom:1rem">${sw('Erreichbarkeit', 'Availability')}</h3>
            <dl class="t-small" style="display:grid;grid-template-columns:auto 1fr;gap:.45rem 1rem;color:var(--fg-muted)">
              <dt>${sw('Mo – Fr', 'Mon – Fri')}</dt><dd class="t-mono">09:00 – 18:00</dd>
              <dt>${sw('Sa', 'Sat')}</dt><dd class="t-mono">${sw('nach Vereinbarung', 'by arrangement')}</dd>
              <dt>${sw('Sprachen', 'Languages')}</dt><dd>${sw('Deutsch, Englisch, Chinesisch', 'German, English, Chinese')}</dd>
            </dl>
          </div>
        </aside>

      </div>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${scripts(1)}`;

  write('service/kontakt.html', html);
}

/* ============================================================== ABOUT === */
function buildAbout() {
  const { CATS, PRODUCTS, write } = ctx();
  const r = '../';

  const html = `${head({
    title: 'Über uns',
    description: 'NIC Robotics ist die Robotik-Marke der An Yuan GmbH: Import, Integration und Service von Vierbeiner- und Rad-Bein-Robotern für den europäischen Markt.',
    path: '/unternehmen/ueber-uns.html',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main">
  <section class="page-hero">
    <div class="page-hero__media">
      <picture>
        <source srcset="${r}assets/img/scenes/m20-forest.webp" type="image/webp">
        <img src="${r}assets/img/scenes/m20-forest.jpg" alt="" width="1600" height="700">
      </picture>
    </div>
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${sw('Start', 'Home')}</a></li>
        <li>${sw('Unternehmen', 'Company')}</li>
      </ol>
      <h1 class="t-xl" style="max-width:16ch">${sw('Robotik, die in Europa ankommt.', 'Robotics that actually lands in Europe.', 'span')}</h1>
    </div>
  </section>

  <section class="section">
    <div class="wrap-narrow">
      <div class="reveal stack" style="--gap-s:1.2rem">
        <p class="t-lead" style="color:var(--fg)">${sw(
          'NIC Robotics ist die Robotik-Marke der An Yuan GmbH. Wir bringen Laufroboter aus der Spitze der chinesischen Entwicklung nach Europa — und zwar so, dass sie hier auch wirklich in Betrieb gehen.',
          'NIC Robotics is the robotics brand of An Yuan GmbH. We bring legged robots from the leading edge of Chinese development to Europe — in a way that actually gets them into service here.'
        )}</p>
        <p class="t-muted">${sw(
          'Die An Yuan GmbH handelt seit Jahren zwischen Europa und China. Wir kennen beide Seiten des Weges: wie ein Hersteller in Hangzhou arbeitet und was eine Beschaffungsabteilung in Essen braucht, bevor sie eine Bestellung freigibt. Genau dazwischen liegt unsere Arbeit.',
          'An Yuan GmbH has traded between Europe and China for years. We know both ends of the route: how a manufacturer in Hangzhou works, and what a procurement department in Essen needs before it releases an order. Our work sits exactly in between.'
        )}</p>
        <p class="t-muted">${sw(
          'Denn ein Laufroboter ist kein Produkt, das man in einen Karton legt und verschickt. Er braucht jemanden, der die Schnittstelle zum Leitsystem baut, der aus der Ferne in die Logs schaut, wenn das Gerät am Montagmorgen nicht aus der Ladestation fährt — und der einen Gummifuß auf Lager hat, statt ihn erst beim Hersteller zu bestellen. Das ist der Teil, den wir übernehmen.',
          'Because a legged robot is not a product you put in a box and ship. It needs someone to build the interface into the control system, to check the logs remotely when the unit will not leave its dock on Monday morning — and to have a rubber foot on the shelf instead of ordering it from the manufacturer first. That is the part we take on.'
        )}</p>
      </div>

      <div class="rule mt-l mb"></div>

      <div class="grid cols-2 mt-l" style="gap:var(--gap-l)">
        ${[
          ['Was wir tun', 'What we do',
           'Import, Vertrieb, technische Integration, Fernsupport, Ersatzteilhaltung und Reparatur für Laufrobotik in Europa. Wir beliefern Industrie, Energieversorger, Feuerwehren, Hochschulen und Sicherheitsdienstleister.',
           'Import, sales, technical integration, remote support, spare-part stocking and repair for legged robotics in Europe. We supply industry, utilities, fire services, universities and security providers.'],
          ['Was wir nicht tun', 'What we do not do',
           'Wir verkaufen Ihnen kein Gerät, von dem wir wissen, dass es Ihre Aufgabe nicht löst. Wenn die ehrliche Antwort lautet, dass ein Mensch mit einer Wärmebildkamera günstiger und besser ist, sagen wir das.',
           'We will not sell you a machine we know will not solve your problem. If the honest answer is that a person with a thermal camera is cheaper and better, we say so.'],
          ['Woher die Geräte kommen', 'Where the machines come from',
           'Wir arbeiten mit Herstellern aus der Weltspitze: unser erster Partner ist weltweit die Nummer eins beim Umsatz mit Vierbeinern im Industrieeinsatz, mit über 200 Patentanmeldungen und Einsätzen in 45 Ländern und Regionen. Weitere Hersteller und Produktkategorien nehmen wir laufend auf.',
           'We work with manufacturers from the very top of the field: our first partner is world number one by revenue in industrial quadruped applications, with more than 200 patent applications and deployments in 45 countries and regions. Further manufacturers and product categories are being added continuously.'],
          ['Wohin wir liefern', 'Where we deliver',
           'Deutschland, Österreich, die Schweiz und die EU. Lieferung mit deutscher Rechnung, deutscher Gewährleistung und Unterlagen, die durch Ihre Beschaffung kommen.',
           'Germany, Austria, Switzerland and the EU. Delivery with a German invoice, German warranty and paperwork that gets through your procurement.']
        ].map(([de, en, bde, ben], i) => `
        <div class="panel reveal" data-delay="${i % 4}">
          <h3 style="font-size:var(--step-1);margin-bottom:.6rem">${sw(de, en)}</h3>
          <p class="t-small t-muted">${sw(bde, ben)}</p>
        </div>`).join('')}
      </div>

      <div class="panel panel--glow mt-l reveal">
        <h3 style="font-size:var(--step-1);margin-bottom:.7rem">${sw('Teil der An Yuan GmbH', 'Part of An Yuan GmbH')}</h3>
        <p class="t-small t-muted">${sw(
          'Die An Yuan GmbH ist ein in Deutschland eingetragenes Handelsunternehmen mit Sitz im Rhein-Main-Gebiet und Geschäftstätigkeit zwischen Europa und China. NIC Robotics ist die Marke, unter der die Robotiksparte geführt wird.',
          'An Yuan GmbH is a German-registered trading company based in the Rhine-Main region, operating between Europe and China. NIC Robotics is the brand under which the robotics division trades.'
        )}</p>
        <p class="mt"><a class="link" href="${SITE.parent}" rel="noopener">${sw('Zur An Yuan GmbH', 'Visit An Yuan GmbH')} ${ICON.arrow}</a></p>
      </div>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${scripts(1)}`;

  write('unternehmen/ueber-uns.html', html);
}

/* ============================================================== LEGAL === */
function legalPage({ file, title, titleEn, desc, body }) {
  const { CATS, PRODUCTS, write } = ctx();
  const r = '../';
  const html = `${head({ title, description: desc, path: '/unternehmen/' + file, depth: 1 })}
${header(CATS, PRODUCTS, 1)}
<main id="main">
  <section class="page-hero page-hero--plain">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${sw('Start', 'Home')}</a></li>
        <li>${sw('Unternehmen', 'Company')}</li>
        <li>${sw(title, titleEn)}</li>
      </ol>
      <h1>${sw(title, titleEn)}</h1>
    </div>
  </section>
  <section class="section section--flush-top" style="padding-top:var(--gap-l)">
    <div class="wrap-narrow">
      <div class="panel reveal" style="--step-0:1rem">${body}</div>
    </div>
  </section>
</main>
${footer(CATS, 1)}
${scripts(1)}`;
  write('unternehmen/' + file, html);
}

const H3 = (de, en) => `<h3 style="font-size:var(--step-1);margin:1.8rem 0 .6rem">${sw(de, en)}</h3>`;
const PARA = (de, en) => `<p class="t-muted" style="margin-bottom:.9rem">${sw(de, en)}</p>`;

function buildLegal() {
  /* ----- Impressum ----- */
  legalPage({
    file: 'impressum.html',
    title: 'Impressum', titleEn: 'Legal notice',
    desc: 'Impressum und Anbieterkennzeichnung der An Yuan GmbH, Marke NIC Robotics, nach § 5 DDG.',
    body: `
${PARA('Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).', 'Information pursuant to § 5 DDG (German Digital Services Act).')}
${H3('Anbieter', 'Provider')}
<address style="font-style:normal;line-height:1.8;color:var(--fg)">
  <strong>${SITE.legal}</strong><br>
  ${SITE.street}<br>
  ${SITE.zipCity}<br>
  ${SITE.country}
</address>
${PARA('NIC Robotics ist eine Marke der An Yuan GmbH und kein eigenständiges Unternehmen.', 'NIC Robotics is a brand of An Yuan GmbH and not a separate legal entity.')}
${H3('Vertreten durch', 'Represented by')}
<p class="t-muted" style="margin-bottom:.9rem">${sw('Geschäftsführerin', 'Managing Director')}: ${SITE.director}</p>
${H3('Kontakt', 'Contact')}
<dl style="display:grid;grid-template-columns:auto 1fr;gap:.5rem 1.2rem;color:var(--fg-muted);margin-bottom:.9rem">
  <dt>${sw('Telefon', 'Phone')}</dt><dd><a class="link" href="tel:${SITE.phoneHref}">${SITE.phone}</a></dd>
  <dt>E-Mail</dt><dd><a class="link" href="mailto:${SITE.email}">${SITE.email}</a></dd>
</dl>
${H3('Registereintrag', 'Register entry')}
<dl style="display:grid;grid-template-columns:auto 1fr;gap:.5rem 1.2rem;color:var(--fg-muted);margin-bottom:.9rem">
  <dt>${sw('Registergericht', 'Register court')}</dt><dd>${SITE.court}</dd>
  <dt>${sw('Registernummer', 'Register number')}</dt><dd>${SITE.hrb}</dd>
</dl>
${H3('Umsatzsteuer-Identifikationsnummer', 'VAT identification number')}
${PARA('Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: ' + SITE.vat, 'VAT identification number pursuant to § 27 a of the German VAT Act: ' + SITE.vat)}
${H3('Verantwortlich für den Inhalt', 'Responsible for content')}
${PARA(SITE.director + ', Anschrift wie oben.', SITE.director + ', address as above.')}
${H3('Streitbeilegung', 'Dispute resolution')}
${PARA(
  'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit. Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
  'The European Commission provides a platform for online dispute resolution. We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.'
)}
${H3('Haftung für Inhalte und Links', 'Liability for content and links')}
${PARA(
  'Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Für Inhalte externer Links ist stets der jeweilige Anbieter verantwortlich; zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.',
  'As a service provider we are responsible for our own content on these pages under general law. We are not, however, obliged to monitor third-party information transmitted or stored. The respective provider is always responsible for the content of external links; no legal infringements were apparent at the time of linking.'
)}
${H3('Urheberrecht und Produktabbildungen', 'Copyright and product images')}
${PARA(
  'Die Inhalte dieser Seiten unterliegen dem deutschen Urheberrecht. Produktabbildungen, technische Daten und Markenzeichen der dargestellten Geräte sind Eigentum der jeweiligen Hersteller und werden mit deren Einverständnis zu Vertriebszwecken verwendet.',
  'The content of these pages is subject to German copyright law. Product images, specifications and trade marks of the machines shown are the property of their respective manufacturers and are used for sales purposes with their consent.'
)}
${PARA(
  'Die auf dieser Website angegebenen technischen Daten beruhen auf den offiziellen Prüfdaten der Hersteller. Die tatsächliche Leistung kann je nach Einsatzbedingungen abweichen. Änderungen und Irrtümer vorbehalten.',
  'The specifications given on this website are based on the manufacturers’ official test data. Actual performance may vary with operating conditions. Subject to change and to error.'
)}`
  });

  /* ----- Datenschutz ----- */
  legalPage({
    file: 'datenschutz.html',
    title: 'Datenschutzerklärung', titleEn: 'Privacy notice',
    desc: 'Datenschutzerklärung der An Yuan GmbH (NIC Robotics) nach DSGVO: Verarbeitung, Rechtsgrundlagen, Speicherdauer und Ihre Rechte.',
    body: `
${PARA(
  'Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir Sie darüber, welche Daten wir beim Besuch dieser Website und bei der Nutzung unserer Formulare verarbeiten.',
  'Protecting your personal data matters to us. Below we explain which data we process when you visit this website and use our forms.'
)}
${H3('1 · Verantwortlicher', '1 · Controller')}
<address style="font-style:normal;line-height:1.8;color:var(--fg-muted);margin-bottom:.9rem">
  ${SITE.legal}, ${SITE.street}, ${SITE.zipCity}, ${SITE.country}<br>
  ${sw('Geschäftsführerin', 'Managing Director')}: ${SITE.director}<br>
  E-Mail: <a class="link" href="mailto:${SITE.email}">${SITE.email}</a> · ${sw('Telefon', 'Phone')}: ${SITE.phone}
</address>
${H3('2 · Aufruf der Website', '2 · Visiting the website')}
${PARA(
  'Beim Aufruf dieser Website werden durch den Hosting-Anbieter automatisch Server-Logdaten verarbeitet: IP-Adresse in gekürzter Form, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, übertragene Datenmenge, Referrer sowie Browser- und Betriebssystemkennung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; das berechtigte Interesse liegt im sicheren und störungsfreien Betrieb der Website. Diese Daten werden nach spätestens sieben Tagen gelöscht.',
  'When you visit this website, the hosting provider automatically processes server log data: truncated IP address, date and time of access, page requested, volume of data transferred, referrer, and browser and operating-system identifiers. The legal basis is Art. 6(1)(f) GDPR; the legitimate interest is the secure and trouble-free operation of the website. These data are erased after seven days at the latest.'
)}
${H3('3 · Kontakt-, Angebots- und Reparaturformulare', '3 · Contact, quotation and repair forms')}
${PARA(
  'Wenn Sie uns über eines der Formulare auf dieser Website kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten — insbesondere Name, Firma, E-Mail-Adresse, gegebenenfalls Telefonnummer, Anschrift, Auftrags- und Seriennummer sowie den Inhalt Ihrer Nachricht und hochgeladene Dateien — ausschließlich zur Bearbeitung Ihres Anliegens.',
  'When you contact us through one of the forms on this website, we process the data you provide — in particular name, company, e-mail address, where applicable telephone number, address, order and serial number, as well as the content of your message and any uploaded files — solely in order to deal with your request.'
)}
${PARA(
  'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf den Abschluss oder die Durchführung eines Vertrages gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. a und lit. f DSGVO. Die Daten werden gelöscht, sobald sie für die Zwecke ihrer Erhebung nicht mehr erforderlich sind und keine handels- oder steuerrechtlichen Aufbewahrungsfristen entgegenstehen.',
  'The legal basis is Art. 6(1)(b) GDPR where the enquiry is directed at concluding or performing a contract, and otherwise Art. 6(1)(a) and (f) GDPR. Data are erased as soon as they are no longer required for the purposes of their collection, unless commercial or tax retention periods apply.'
)}
${H3('4 · Hochgeladene Dateien', '4 · Uploaded files')}
${PARA(
  'Im Reparaturformular können Sie Fotos hochladen. Formularangaben und Fotos werden über unseren Hosting-Anbieter (Cloudflare) und einen E-Mail-Versanddienst an unser Serviceteam übermittelt und dort nicht dauerhaft gespeichert. Sie werden ausschließlich zur Beurteilung des gemeldeten Fehlers verwendet, nicht veröffentlicht und nach Abschluss des Vorgangs gelöscht, soweit keine Gewährleistungs- oder Versicherungsansprüche eine längere Aufbewahrung erfordern.',
  'In the repair form you may upload photos. Form details and photos are transmitted to our service team via our hosting provider (Cloudflare) and an e-mail delivery service, where they are not stored permanently. These are used solely to assess the reported defect, are not published, and are erased once the case is closed, unless warranty or insurance claims require longer retention.'
)}
${H3('5 · Schriftarten', '5 · Fonts')}
${PARA(
  'Diese Website bindet Schriftarten über Google Fonts ein. Dabei wird eine Verbindung zu Servern von Google aufgebaut und Ihre IP-Adresse übertragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (einheitliche Darstellung der Website). Eine lokale Einbindung der Schriftarten ist in Vorbereitung.',
  'This website loads fonts via Google Fonts. This establishes a connection to Google servers and transmits your IP address. The legal basis is Art. 6(1)(f) GDPR (consistent presentation of the website). Local hosting of the fonts is in preparation.'
)}
${H3('6 · Cookies und Analyse', '6 · Cookies and analytics')}
${PARA(
  'Diese Website setzt keine Tracking-Cookies und verwendet keine Analyse- oder Werbedienste. Ihre Sprachauswahl wird ausschließlich lokal in Ihrem Browser gespeichert und nicht an uns übertragen.',
  'This website sets no tracking cookies and uses no analytics or advertising services. Your language choice is stored only locally in your browser and is not transmitted to us.'
)}
${H3('7 · Empfänger', '7 · Recipients')}
${PARA(
  'Eine Weitergabe Ihrer Daten erfolgt nur, soweit dies zur Erfüllung Ihres Anliegens erforderlich ist — etwa an den Hersteller bei einem Gewährleistungsfall oder an Versand- und Logistikdienstleister. Mit unserem Hosting-Anbieter besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.',
  'Your data are passed on only where this is necessary to deal with your request — for example to the manufacturer in a warranty case, or to shipping and logistics providers. A data-processing agreement under Art. 28 GDPR is in place with our hosting provider.'
)}
${H3('8 · Ihre Rechte', '8 · Your rights')}
${PARA(
  'Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Wenden Sie sich dazu an die oben genannte Adresse.',
  'You have the right of access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing (Art. 21 GDPR). You may withdraw any consent given at any time with effect for the future. Please contact the address given above.'
)}
${PARA(
  'Darüber hinaus steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu. Für uns zuständig ist der Hessische Beauftragte für Datenschutz und Informationsfreiheit.',
  'You also have the right to lodge a complaint with a data protection supervisory authority. The authority responsible for us is the Hessian Commissioner for Data Protection and Freedom of Information.'
)}
<p class="t-small t-dim" style="margin-top:2rem">${sw('Stand dieser Erklärung', 'Version of this notice')}: <span data-year>2026</span></p>`
  });

  /* ----- AGB ----- */
  legalPage({
    file: 'agb.html',
    title: 'Allgemeine Geschäftsbedingungen', titleEn: 'Terms and conditions',
    desc: 'Allgemeine Geschäftsbedingungen der An Yuan GmbH (NIC Robotics) für Lieferungen und Leistungen im Bereich Robotik.',
    body: `
<div class="form-status form-status--err is-shown" style="margin-bottom:1.5rem">
  ${ICON.close}
  <span>${sw(
    'Hinweis: Dieser Text ist ein Entwurf und noch nicht anwaltlich geprüft. Vor dem Livegang der Website bitte durch Ihren Rechtsbeistand prüfen und freigeben lassen.',
    'Note: this text is a draft and has not yet been reviewed by a lawyer. Please have it checked and approved by your legal adviser before the site goes live.'
  )}</span>
</div>
${H3('§ 1 Geltungsbereich', '§ 1 Scope')}
${PARA(
  'Diese Bedingungen gelten für alle Lieferungen und Leistungen der An Yuan GmbH unter der Marke NIC Robotics gegenüber Unternehmern, juristischen Personen des öffentlichen Rechts und öffentlich-rechtlichen Sondervermögen. Abweichende Bedingungen des Bestellers werden nur wirksam, wenn wir ihnen schriftlich zustimmen.',
  'These terms apply to all deliveries and services of An Yuan GmbH under the NIC Robotics brand to businesses, legal entities under public law and special funds under public law. Deviating terms of the buyer apply only if we agree to them in writing.'
)}
${H3('§ 2 Angebot und Vertragsschluss', '§ 2 Offer and conclusion of contract')}
${PARA(
  'Die Darstellung von Produkten auf dieser Website stellt kein bindendes Angebot dar. Ein Vertrag kommt erst durch unsere schriftliche Auftragsbestätigung oder durch Auslieferung zustande. Angaben zu Preisen, Lieferzeiten und technischen Daten sind bis zur Auftragsbestätigung freibleibend.',
  'The presentation of products on this website does not constitute a binding offer. A contract is concluded only upon our written order confirmation or upon delivery. Information on prices, lead times and specifications is subject to change until order confirmation.'
)}
${H3('§ 3 Preise und Zahlung', '§ 3 Prices and payment')}
${PARA(
  'Alle Preise verstehen sich netto in Euro, zuzüglich der gesetzlichen Umsatzsteuer und Versandkosten, ab Lager. Sofern nicht anders vereinbart, sind Rechnungen innerhalb von vierzehn Tagen ab Rechnungsdatum ohne Abzug zur Zahlung fällig. Bei Erstbestellungen behalten wir uns Vorkasse oder Anzahlung vor.',
  'All prices are net in euro, plus statutory VAT and shipping, ex works. Unless agreed otherwise, invoices fall due within fourteen days of the invoice date without deduction. For first orders we reserve the right to require prepayment or a deposit.'
)}
${H3('§ 4 Lieferung und Gefahrübergang', '§ 4 Delivery and transfer of risk')}
${PARA(
  'Lieferzeiten werden in der Auftragsbestätigung genannt und sind nur dann verbindlich, wenn sie ausdrücklich als solche bezeichnet werden. Die Gefahr geht mit Übergabe an den Transportdienstleister auf den Besteller über. Transportschäden sind uns innerhalb von sieben Tagen nach Erhalt zu melden.',
  'Lead times are stated in the order confirmation and are binding only where expressly designated as such. Risk passes to the buyer on handover to the carrier. Transit damage must be reported to us within seven days of receipt.'
)}
${H3('§ 5 Eigentumsvorbehalt', '§ 5 Retention of title')}
${PARA(
  'Die gelieferte Ware bleibt bis zur vollständigen Bezahlung sämtlicher Forderungen aus der Geschäftsverbindung unser Eigentum.',
  'The goods delivered remain our property until all claims arising from the business relationship have been paid in full.'
)}
${H3('§ 6 Gewährleistung', '§ 6 Warranty')}
${PARA(
  'Es gelten die gesetzlichen Gewährleistungsrechte. Unternehmer haben gelieferte Ware unverzüglich zu untersuchen und erkennbare Mängel unverzüglich, verdeckte Mängel unverzüglich nach Entdeckung anzuzeigen. Für Verschleißteile — insbesondere Füße, Dichtungen und Akkus — gilt die Gewährleistung nur für Mängel, die bereits bei Übergabe vorlagen.',
  'Statutory warranty rights apply. Businesses must inspect delivered goods without delay and report apparent defects immediately, and latent defects immediately upon discovery. For wear parts — in particular feet, seals and batteries — the warranty covers only defects already present at handover.'
)}
${PARA(
  'Reparatur- und Garantiefälle melden Sie bitte vorab über unser Reparaturformular. Geräte senden Sie erst nach unserer Rückmeldung ein.',
  'Please report repair and warranty cases in advance via our repair form. Only ship units after we have replied.'
)}
${H3('§ 7 Haftung', '§ 7 Liability')}
${PARA(
  'Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit. Bei einfacher Fahrlässigkeit haften wir nur bei Verletzung einer wesentlichen Vertragspflicht und der Höhe nach begrenzt auf den vertragstypischen, vorhersehbaren Schaden.',
  'We are liable without limitation for intent and gross negligence and for damage arising from injury to life, body or health. In cases of simple negligence we are liable only for breach of a material contractual obligation and limited in amount to the typical, foreseeable damage.'
)}
${H3('§ 8 Betrieb', '§ 8 Operation')}
${PARA(
  'Die gelieferten Geräte sind Maschinen im Sinne der Maschinenverordnung. Der Besteller ist für den bestimmungsgemäßen Einsatz, die Gefährdungsbeurteilung am Einsatzort und die Unterweisung des Bedienpersonals verantwortlich. Die mitgelieferten Unterlagen ersetzen keine arbeitsschutzrechtliche Unterweisung durch den Betreiber.',
  'The machines supplied are machinery within the meaning of the Machinery Regulation. The buyer is responsible for intended use, the risk assessment at the place of use and the instruction of operating personnel. The documents supplied do not replace the operator’s own occupational-safety instruction.'
)}
${H3('§ 9 Ausfuhr', '§ 9 Export')}
${PARA(
  'Die Weiterveräußerung oder Ausfuhr gelieferter Geräte kann ausfuhrrechtlichen Beschränkungen unterliegen. Der Besteller verpflichtet sich, die geltenden Ausfuhrbestimmungen einzuhalten.',
  'Resale or export of the machines supplied may be subject to export-control restrictions. The buyer undertakes to comply with applicable export regulations.'
)}
${H3('§ 10 Schlussbestimmungen', '§ 10 Final provisions')}
${PARA(
  'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand für Kaufleute ist der Sitz der An Yuan GmbH. Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.',
  'The law of the Federal Republic of Germany applies, excluding the UN Convention on Contracts for the International Sale of Goods. For merchants, the place of jurisdiction is the registered office of An Yuan GmbH. Should any provision be invalid, the validity of the remaining provisions is unaffected.'
)}
<p class="t-small t-dim" style="margin-top:2rem">${sw('Stand', 'Version')}: <span data-year>2026</span></p>`
  });

  /* ----- Widerruf ----- */
  legalPage({
    file: 'widerruf.html',
    title: 'Widerrufsrecht', titleEn: 'Right of withdrawal',
    desc: 'Widerrufsbelehrung und Muster-Widerrufsformular für Verbraucher nach § 312g BGB.',
    body: `
<div class="form-status form-status--err is-shown" style="margin-bottom:1.5rem">
  ${ICON.close}
  <span>${sw(
    'Hinweis: Dieser Text ist ein Entwurf und noch nicht anwaltlich geprüft. Vor dem Livegang bitte prüfen lassen.',
    'Note: this text is a draft and has not yet been reviewed by a lawyer. Please have it checked before going live.'
  )}</span>
</div>
${PARA(
  'Das folgende Widerrufsrecht gilt ausschließlich für Verbraucher im Sinne des § 13 BGB, also für natürliche Personen, die das Geschäft zu Zwecken abschließen, die überwiegend weder ihrer gewerblichen noch ihrer selbstständigen beruflichen Tätigkeit zugerechnet werden können. Für gewerbliche Besteller besteht kein Widerrufsrecht.',
  'The following right of withdrawal applies only to consumers within the meaning of § 13 of the German Civil Code — natural persons entering into the transaction for purposes predominantly outside their trade or self-employed professional activity. Business buyers have no right of withdrawal.'
)}
${H3('Widerrufsbelehrung', 'Withdrawal instructions')}
${PARA(
  'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben beziehungsweise hat.',
  'You have the right to withdraw from this contract within fourteen days without giving any reason. The withdrawal period is fourteen days from the day on which you, or a third party named by you who is not the carrier, took possession of the goods.'
)}
${PARA(
  'Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung über Ihren Entschluss informieren. Sie können dafür das untenstehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist genügt es, dass Sie die Mitteilung vor Ablauf der Frist absenden.',
  'To exercise your right of withdrawal you must inform us by means of a clear statement of your decision. You may use the model withdrawal form below, though this is not obligatory. To meet the deadline it is sufficient that you send your communication before the period expires.'
)}
${H3('Folgen des Widerrufs', 'Consequences of withdrawal')}
${PARA(
  'Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten — mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene günstigste Standardlieferung gewählt haben —, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist.',
  'If you withdraw from this contract we shall reimburse all payments received from you, including delivery costs — except for supplementary costs arising from your choosing a type of delivery other than the least expensive standard delivery offered by us — without undue delay and at the latest within fourteen days from the day on which we receive notification of your withdrawal.'
)}
${PARA(
  'Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben. Sie tragen die unmittelbaren Kosten der Rücksendung. Bei Geräten dieser Größe und dieses Gewichts können diese Kosten erheblich sein; wir nennen Ihnen auf Anfrage eine Schätzung. Für einen Wertverlust der Waren müssen Sie nur aufkommen, wenn dieser auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise nicht notwendigen Umgang zurückzuführen ist.',
  'We may withhold reimbursement until we have received the goods back or you have supplied evidence of having sent them back. You bear the direct cost of returning the goods. For machines of this size and weight that cost may be considerable; we will give you an estimate on request. You are liable for any diminished value of the goods only where this results from handling other than what is necessary to establish their nature, characteristics and functioning.'
)}
${H3('Muster-Widerrufsformular', 'Model withdrawal form')}
${PARA(
  'Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es zurück:',
  'If you wish to withdraw from the contract, please complete this form and return it:'
)}
<div style="background:var(--ink-800);border:1px solid var(--hair);border-radius:var(--radius);padding:1.4rem;font-family:var(--font-mono);font-size:var(--step--1);line-height:2;color:var(--fg-muted);margin-bottom:1.2rem">
An ${SITE.legal}, ${SITE.street}, ${SITE.zipCity}, ${SITE.country}<br>
E-Mail: ${SITE.email}<br><br>
${sw('Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den Kauf der folgenden Waren:', 'I/we hereby give notice that I/we withdraw from my/our contract of sale of the following goods:')}<br>
_______________________________________________<br><br>
${sw('Bestellt am', 'Ordered on')}: ____________  ${sw('Erhalten am', 'Received on')}: ____________<br>
${sw('Name des/der Verbraucher(s)', 'Name of consumer(s)')}: ____________________________<br>
${sw('Anschrift des/der Verbraucher(s)', 'Address of consumer(s)')}: _________________________<br>
${sw('Unterschrift (nur bei Mitteilung auf Papier)', 'Signature (only if notified on paper)')}: ____________________<br>
${sw('Datum', 'Date')}: ____________
</div>
${PARA(
  'Alternativ können Sie uns Ihren Widerruf formlos per E-Mail oder über unser Kontaktformular mitteilen.',
  'Alternatively you may notify us of your withdrawal informally by e-mail or through our contact form.'
)}
<p><a class="link" href="../service/kontakt.html">${swx('Zum Kontaktformular', 'To the contact form', '前往联系表单')} ${ICON.arrow}</a></p>`
  });
}

/* =============================================================== RUN ==== */
/* ============================================== SERVICE & SUPPORT PAGE == */
function buildService() {
  const { CATS, PRODUCTS, write } = ctx();
  const r = '../';
  const blocks = [
    ['garantie', 'shield',
     'Garantie & Gewährleistung', 'Warranty', '保修服务',
     'Garantie vor Ort in Deutschland.', 'Warranty, handled in Germany.', '德国本地质保。',
     ['Gesetzliche Gewährleistung', 'Zentrale, schnelle Abwicklung', 'Verlängerung zu fairen Preisen', 'Ins Werk nur bei schweren Schäden'],
     ['Statutory warranty', 'Fast, central handling', 'Extension at fair prices', 'Factory return only for major faults'],
     ['德国法定质保', '统一安排，高效处理', '可延保，收费合理', '仅重大故障寄回工厂']],
    ['servicezentrum', 'wrench',
     'Servicezentrum Deutschland', 'Service centre Germany', '德国维修中心',
     'Diagnose und Reparatur bei Frankfurt.', 'Diagnosis and repair near Frankfurt.', '法兰克福周边，检测与维修。',
     ['Prüfbericht meist in 5 Werktagen', 'Reparatur mit Teilen ab Lager'],
     ['Report usually within 5 working days', 'Repairs with parts in stock'],
     ['通常 5 个工作日出报告', '库存备件维修']],
    ['ersatzteile', 'cpu',
     'Ersatzteile', 'Spare parts', '备件更换',
     'Verschleißteile ab Lager.', 'Wear parts in stock.', '易损件现货供应。',
     ['Großer Bestand im Servicezentrum', 'In der Garantie: schneller Tausch', 'Danach: kaufen und selbst tauschen, mit Anleitung'],
     ['Ample stock at our service centre', 'Under warranty: fast replacement', 'After warranty: buy and swap yourself, with our guide'],
     ['维修中心库存充足', '保内损坏，快速更换', '过保可官网购买，按官方指导自换']],
    ['fernsupport', 'clock',
     'Fernsupport & Software', 'Remote support & software', '远程支持',
     'Fehler aus der Ferne eingrenzen.', 'Faults narrowed down remotely.', '远程快速定位故障。',
     ['Ferndiagnose über Geräte-Logs', 'Software oder Hardware? Schnell geklärt', 'Firmware-Updates, Entwicklung mit SDK und ROS 1/2 (modellabhängig)'],
     ['Remote diagnosis via device logs', 'Software or hardware? Answered fast', 'Firmware updates, development with SDK and ROS 1/2 (model-dependent)'],
     ['远程读取运行日志', '快速判断软件或硬件问题', '固件升级，支持 SDK 与 ROS 1/2 二次开发（视机型）']],
    ['rma', 'upload',
     'Reparatur (RMA)', 'Repair (RMA)', '返修（RMA）',
     'Ein Formular, schnelle Antwort.', 'One form, a fast reply.', '一张表单，快速回复。',
     ['Online melden, mit Fotos', 'Garantiefall: Bericht und Behebung meist in 1 Woche', 'Selten nötig — der Ablauf steht'],
     ['Report online, with photos', 'Warranty case: report and fix usually within 1 week', 'Rarely needed — the process is ready'],
     ['在线提交，可附照片', '保内一般一周内出报告并完成维护', '返修率低，流程完善']]
  ];
  const links = { ersatzteile: 'produkte/ersatzteile.html', rma: 'service/reparatur.html', vorfuehrung: 'service/kontakt.html' };
  const linkTxt = {
    ersatzteile: ['Zu den Ersatzteilen', 'To spare parts', '查看备件'],
    rma: ['Reparatur melden', 'Report a repair', '填写返修表单'],
    vorfuehrung: ['Vorführung vereinbaren', 'Arrange a demo', '预约演示']
  };

  const html = `${head({
    title: 'Service & Support',
    description: 'Garantie, Servicezentrum bei Frankfurt, Ersatzteile, Fernsupport und Reparatur für Roboter von NIC Robotics.',
    path: '/service/index.html',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main">
  <section class="page-hero">
    <div class="page-hero__media">
      <picture>
        <source srcset="${r}assets/img/scenes/x30-control.webp" type="image/webp">
        <img src="${r}assets/img/scenes/x30-control.jpg" alt="" width="1600" height="700">
      </picture>
    </div>
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${swx('Start', 'Home', '首页')}</a></li>
        <li>${swx('Service & Support', 'Service & Support', '技术服务')}</li>
      </ol>
      <h1 class="t-xl" style="max-width:18ch"><span data-i18n-de>Service aus Deutschland. <em>Vom ersten Tag an.</em></span><span data-i18n-en>Service from Germany. <em>From day one.</em></span><span data-i18n-zh>德国本地服务，<em>从第一天开始。</em></span></h1>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="svc-grid">
        ${blocks.map(([id, icon, de, en, zh, lde, len, lzh, pde, pen, pzh], i) => `
        <article class="svc reveal" id="${id}" data-delay="${i % 3}">
          <span class="svc__icon">${ICON[icon] || ''}</span>
          <h2>${swx(de, en, zh)}</h2>
          <p class="svc__lead">${swx(lde, len, lzh)}</p>
          <ul class="ticks">${pde.map((x, k) => `<li>${swx(x, pen[k], pzh[k])}</li>`).join('')}</ul>
          ${links[id] ? `<a class="link svc__link" href="${r}${links[id]}">${swx(...linkTxt[id])} ${ICON.arrow}</a>` : ''}
        </article>`).join('')}
      </div>

      <div class="panel panel--glow mt-l reveal svc-cta">
        <div>
          <h3>${swx('Frage zum Service?', 'A service question?', '有服务方面的问题？')}</h3>
          <p class="t-muted">${swx('Schreiben Sie uns im Live-Chat oder per WhatsApp — wir antworten persönlich.', 'Message us in the live chat or on WhatsApp — we reply personally.', '在线咨询或通过 WhatsApp 联系我们，由专人回复。')}</p>
        </div>
        <div class="cluster">
          <a class="btn btn--ghost" href="faq.html">${swx('Häufige Fragen', 'FAQ', '常见问题')}</a>
          <button class="btn" type="button" data-chat-open>${swx('Live-Chat öffnen', 'Open live chat', '打开在线咨询')}</button>
          <a class="btn btn--ghost" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${scripts(1)}`;

  write('service/index.html', html);
}

/* ============================================================ v50 · FAQ == */
/* Antworten sind Entwürfe auf Basis dessen, was die Website bereits zusagt;
   modellbezogene Details (Fristen, Garantiedauer, Unterlagen) folgen vom Hersteller. */
const FAQ = [
  [['Kauf & Lieferung', 'Purchase & delivery', '购买与交付'], [
    [['Wie erhalte ich ein Angebot?', 'How do I get a quote?', '如何获得报价？'],
     ['Über „Angebot anfordern“ oder die Anfrageliste. Nennen Sie Modell, Version, Stückzahl und Einsatzzweck. Sie erhalten ein schriftliches Angebot mit Konfiguration, Nettopreis, Lieferzeit, Lieferumfang und Gewährleistung.',
      'Via “Request a quote” or the inquiry list. Tell us the model, version, quantity and purpose. You receive a written quote with configuration, net price, lead time, scope of delivery and warranty.',
      '点击“获取报价”或使用询价清单，告诉我们机型、版本、数量和用途。您会收到书面报价，包含配置、不含税价格、交货期、供货范围和质保条款。']],
    [['Wie lange dauert die Lieferung?', 'How long does delivery take?', '交货期多长？'],
     ['Das hängt von Modell, Version und Lagerbestand ab. Die verbindliche Lieferzeit steht in Ihrem Angebot.',
      'It depends on the model, version and stock. The binding lead time is stated in your quote.',
      '取决于机型、版本和库存情况。具体交货期以报价单为准。']],
    [['Liefern Sie an Hochschulen und öffentliche Einrichtungen?', 'Do you supply universities and public institutions?', '可以向高校和公共机构供货吗？'],
     ['Ja. Sie erhalten Angebot und Rechnung einer deutschen GmbH, wie es Beschaffungsstellen verlangen. Vergleichsangebote und Angaben für Vergabeunterlagen stellen wir auf Wunsch zusammen.',
      'Yes. You receive a quote and invoice from a German GmbH, as procurement offices require. On request we prepare the details needed for tender documents.',
      '可以。您会收到德国有限责任公司（GmbH）出具的报价和发票，符合采购部门的要求。如需招标文件所需的信息，我们可按需整理。']]
  ]],
  [['Unterlagen', 'Documents', '随机资料'], [
    [['Welche Unterlagen erhalte ich zum Roboter?', 'Which documents come with the robot?', '机器人会附带哪些资料？'],
     ['Zum Lieferumfang gehören Bedienungsanleitung und Datenblatt. Je nach Modell kommen Wartungshinweise, Schnittstellen- und SDK-Dokumentation hinzu. Was für Ihr Modell verfügbar ist, steht auf der Seite „Technische Ressourcen“.',
      'The delivery includes the user manual and datasheet. Depending on the model, maintenance notes, interface and SDK documentation are added. What is available for your model is listed under “Technical resources”.',
      '随机提供用户手册和数据表。部分机型另有维护说明、接口文档和 SDK 文档。各机型可提供的资料见“技术资源”页面。']],
    [['In welchen Sprachen sind die Unterlagen?', 'In which languages are the documents?', '资料是什么语言？'],
     ['Handbuch und technische Dokumentation gibt es auf Deutsch und Englisch. Andere Sprachen bereiten wir auf Anfrage vor.',
      'The manual and technical documentation are available in German and English. We prepare other languages on request.',
      '手册和技术文档提供德语和英语版本。如需其他语言，可向我们提出，我们会为您准备。']]
  ]],
  [['Garantie & Gewährleistung', 'Warranty', '保修'], [
    [['Welche Gewährleistung gilt?', 'Which warranty applies?', '质保是怎样的？'],
     ['Es gilt die gesetzliche Gewährleistung nach deutschem Recht. Dauer und Umfang einer darüber hinausgehenden Garantie stehen modellbezogen in Ihrem Angebot.',
      'The statutory warranty under German law applies. Duration and scope of any additional guarantee are stated per model in your quote.',
      '适用德国法律规定的法定质保。此外的厂家保修期限和范围，按机型写在报价中。']],
    [['Wie läuft ein Garantiefall ab?', 'How does a warranty claim work?', '保修如何办理？'],
     ['Sie melden den Fall über das Formular „Reparatur melden“, am besten mit Fotos. Wir organisieren die Garantieabwicklung zentral und melden uns schnell mit dem nächsten Schritt: Ferndiagnose anhand der Geräte-Logs, Austausch eines Verschleißteils oder Einsendung an unser Servicezentrum bei Frankfurt. Ins Werk geht ein Gerät nur bei schweren Schäden, die wir hier nicht beheben können.',
      'You report the case via the “Report a repair” form, ideally with photos. We handle the warranty centrally and quickly reply with the next step: remote diagnosis of the unit’s logs, replacement of a wear part, or shipping to our service centre near Frankfurt. A unit only goes to the factory for major faults we cannot fix here.',
      '通过“返修申请”表单提交，最好附上照片。我们统一安排保修，并尽快告知下一步：远程读取设备日志诊断、更换易损件，或寄到我们位于法兰克福周边的维修中心。只有在此无法修复的重大故障才需寄回工厂。']],
    [['Was ist von der Garantie ausgenommen?', 'What is excluded from the warranty?', '哪些情况不在保修范围内？'],
     ['Eigenmächtiges Öffnen oder Verändern beendet die Garantie: zum Beispiel Gehäuse öffnen, Siegel beschädigen, Umbauten oder selbst getauschte Teile während der Garantiezeit. Bei Problemen in der Garantie wenden Sie sich bitte direkt an NIC Robotics.',
      'Opening or modifying the unit yourself voids the warranty: for example opening the housing, breaking a seal, modifications or replacing parts yourself during the warranty period. If a problem occurs under warranty, please contact NIC Robotics directly.',
      '客户自行拆开或改装后，保修即失效，例如拆开外壳、破坏封条、进行改装，或在保修期内自行更换零件。保修期内出现问题，请直接联系 NIC Robotics。']],
    [['Kann ich die Garantie verlängern?', 'Can I extend the warranty?', '可以延长保修吗？'],
     ['Ja, zu fairen und transparenten Konditionen. Die Preise nennen wir Ihnen modellbezogen im Angebot.',
      'Yes, on fair and transparent terms. We state the price per model in the quote.',
      '可以，收费合理透明。具体价格按机型在报价中列明。']]
  ]],
  [['Service & Reparatur', 'Service & repair', '维修与备件'], [
    [['Wo wird repariert?', 'Where are repairs carried out?', '在哪里维修？'],
     ['In unserem Servicezentrum bei Frankfurt. Ins Werk muss ein Gerät nur bei schweren Schäden, die wir dort nicht beheben können.',
      'At our service centre near Frankfurt. A unit only has to go to the factory for major faults we cannot fix there.',
      '在我们位于法兰克福周边的维修中心。只有在此无法修复的重大故障，才需寄回工厂。']],
    [['Wie lange dauert eine Reparatur?', 'How long does a repair take?', '维修需要多久？'],
     ['Den Prüfbericht erhalten Sie in der Regel innerhalb von fünf Werktagen nach Eingang. Im Garantiefall sind übliche Fehler meist innerhalb einer Woche behoben; bei größeren Schäden nennen wir Ihnen mit dem Bericht die voraussichtliche Dauer.',
      'You usually receive the inspection report within five working days of receipt. In warranty cases common faults are mostly fixed within one week; for larger damage the report states the expected duration.',
      '收到设备后，通常五个工作日内出具检测报告。保修期内的常规故障一般一周内修复；较大损坏会在报告中说明预计时长。']],
    [['Welche Teile kann ich selbst tauschen?', 'Which parts can I replace myself?', '哪些部件可以自己更换？'],
     ['In der Garantie tauschen wir defekte Verschleißteile schnell aus. Nach der Garantie können Sie Verschleißteile wie Fußpads, Akkus und Schutzteile bei uns kaufen und mit unserer offiziellen Anleitung selbst wechseln. Siehe „Ersatzteile“.',
      'Under warranty we replace faulty wear parts quickly. After the warranty you can buy wear parts such as foot pads, batteries and protective parts from us and swap them yourself with our official instructions. See “Spare parts”.',
      '质保期内，易损件损坏我们会快速更换。过保后，足垫、电池、防护件等易损件可向我们购买，并按官方指导自行更换。详见“备件更换”。']]
  ]],
  [['Technischer Support', 'Technical support', '技术支持'], [
    [['Wie erreiche ich den Support?', 'How do I reach support?', '如何联系技术支持？'],
     ['Über das Formular „Reparatur melden“, per E-Mail an service@nic-robotics.de, im Live-Chat oder per WhatsApp. Bei Störungen werten wir auf Wunsch die Betriebsprotokolle (Logs) aus der Ferne aus und klären schnell, ob es an der Software oder der Hardware liegt.',
      'Via the “Report a repair” form, by e-mail to service@nic-robotics.de, in the live chat or on WhatsApp. For faults we can analyse the operating logs remotely and quickly clarify whether software or hardware is the cause.',
      '可通过“返修申请”表单、发邮件至 service@nic-robotics.de、在线咨询或 WhatsApp 联系我们。出现故障时，我们可远程读取设备运行日志，迅速判断是软件还是硬件问题。']],
    [['Wie kommen Software-Updates auf den Roboter?', 'How do software updates reach the robot?', '软件如何升级？'],
     ['Je nach Modell per OTA-Update oder über die Hersteller-Software. Funktionen, die erst per späterem Update kommen, kennzeichnen wir auf der Produktseite.',
      'Depending on the model, via OTA update or the manufacturer software. Features that arrive only with a later update are marked on the product page.',
      '视机型而定，通过 OTA 在线升级或厂家软件升级。需后续升级才提供的功能，会在产品页上标注。']],
    [['Kann ich eigene Software entwickeln (SDK, ROS)?', 'Can I develop my own software (SDK, ROS)?', '可以做二次开发吗（SDK、ROS）？'],
     ['Das ist modellabhängig. Was bestätigt ist und was wir noch mit dem Hersteller klären, zeigt die Tabelle „Entwicklung“ auf der jeweiligen Produktseite und die Seite „Forschung & Lehre“.',
      'That depends on the model. What is confirmed and what we still clarify with the manufacturer is shown in the “Development” table on each product page and under “Research & Teaching”.',
      '取决于机型。哪些能力已确认、哪些仍在与厂家核实，见各产品页的“开发能力”表和“科研与教学”页面。']],
    [['Darf der Roboter im Regen oder im Freien arbeiten?', 'May the robot work in rain or outdoors?', '可以在雨天或户外使用吗？'],
     ['Ja, innerhalb des zulässigen Einsatzbereichs. Modelle mit IP66 und IP67 sind gut gegen Wasser geschützt. IP67 hält sogar kurzes Untertauchen aus. IP66-Modelle sollten nicht längere Zeit im Wasser arbeiten, das kann sie beschädigen. Schutzart und Temperaturbereich stehen in den technischen Daten.',
      'Yes, within the permitted operating range. Models rated IP66 and IP67 are well protected against water. IP67 even withstands brief immersion. IP66 models should not work in water for longer periods, as this can damage them. Protection rating and temperature range are in the specifications.',
      '可以，在允许的工作范围内均可。IP66 和 IP67 机型都有较强的防水能力，其中 IP67 防水尤其强，短时间浸水也能正常工作。IP66 机型不适合长时间泡在水中作业，否则容易损坏。防护等级和温度范围见产品技术参数。']]
  ]]
];

function buildFaq() {
  const { CATS, PRODUCTS, write } = ctx();
  const r = '../';
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.flatMap(([, qs]) => qs.map(([q, a]) => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: a[0] } }))) };
  const html = `${head({
    title: 'Häufige Fragen',
    description: 'Antworten zu Angebot, Lieferung, Unterlagen, Gewährleistung, Reparatur und technischem Support für Roboter von NIC Robotics.',
    path: '/service/faq.html',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main" class="faqpage">
  <section class="page-hero page-hero--plain">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${swx('Start', 'Home', '首页')}</a></li>
        <li><a href="${r}service/index.html">${swx('Service & Support', 'Service & Support', '技术服务')}</a></li>
        <li>${swx('Häufige Fragen', 'FAQ', '常见问题')}</li>
      </ol>
      <p class="kicker">${swx('Häufige Fragen', 'FAQ', '常见问题')}</p>
      <h1 class="t-xl" style="max-width:20ch">${swx('Kurz gefragt, klar beantwortet.', 'Short questions, clear answers.', '常见问题，清楚回答。')}</h1>
      <ul class="rs-jump">${FAQ.map(([g], i) => `<li><a href="#faq-${i + 1}">${swx(...g)}</a></li>`).join('')}</ul>
    </div>
  </section>

  <section class="section sec-light">
    <div class="wrap faq">
      ${FAQ.map(([g, qs], i) => `
      <div class="faq__group" id="faq-${i + 1}">
        <h2>${swx(...g)}</h2>
        <div class="faq__list">${qs.map(([q, a]) => `
          <details class="faq__item">
            <summary>${swx(...q)}</summary>
            <p>${swx(...a)}</p>
          </details>`).join('')}
        </div>
      </div>`).join('')}

      <div class="cat-help">
        <div>
          <h3>${swx('Ihre Frage ist nicht dabei?', 'Your question is not listed?', '没有找到您的问题？')}</h3>
          <p>${swx('Schreiben Sie uns. Technische Fragen beantworten wir schriftlich und klären offene Punkte mit dem Hersteller.', 'Write to us. We answer technical questions in writing and clarify open points with the manufacturer.', '请直接联系我们。技术问题我们会书面答复，未确定的事项会与厂家核实。')}</p>
        </div>
        <a class="btn btn--arrow" href="${r}service/kontakt.html?thema=technik">${swx('Frage stellen', 'Ask a question', '提交问题')} ${ICON.arrow}</a>
      </div>
    </div>
  </section>
</main>

<script type="application/ld+json">${JSON.stringify(ld)}</script>
${footer(CATS, 1)}
${offerModal(1)}
${quickView()}
${scripts(1)}`;
  write('service/faq.html', html);
}

function run() {
  buildService();
  buildFaq();
  buildOffer();
  buildRMA();
  buildContact();
  buildAbout();
  buildLegal();
}

module.exports = { run };
