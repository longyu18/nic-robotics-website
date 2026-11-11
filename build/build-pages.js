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

/* ============================================================ RMA PAGE == */
function buildRMA() {
  const { CATS, PRODUCTS, write } = ctx();
  const r = '../';

  const productOptions = PRODUCTS
    .map((p) => `<option value="${attr(p.name)}"${p.title ? ` data-de="${attr(p.title.de)} (${esc(p.sku)})" data-en="${attr(p.title.en)} (${esc(p.sku)})" data-zh="${attr(p.title.zh || p.title.de)} (${esc(p.sku)})"` : ''}>${attr(p.title ? p.title.de : p.name)} (${esc(p.sku)})</option>`)  // Modellname + SKU, sprachneutral
    .join('');

  const html = `${head({
    title: 'Rücksendung & Reparatur',
    description: 'RMA-Formular für Rücksendung, Reparatur, Austausch oder Rückgabe. Mit Auftrags- und Seriennummer, Fehlerbeschreibung und Foto-Upload bis 5 MB je Datei.',
    path: '/service/ruecksendung.html',
    depth: 1
  })}
${header(CATS, PRODUCTS, 1)}

<main id="main">
  <section class="page-hero page-hero--plain">
    <div class="wrap">
      <ol class="crumbs">
        <li><a href="${r}index.html">${sw('Start', 'Home')}</a></li>
        <li>${sw('Service', 'Service')}</li>
        <li>${sw('Rücksendung & Reparatur', 'Returns & repair')}</li>
      </ol>
      <h1>${sw('Rücksendung & Reparatur', 'Returns & repair')}</h1>
      <p class="t-lead" style="max-width:64ch;margin-top:.9rem">${sw(
        'Etwas funktioniert nicht, passt nicht oder ist beschädigt angekommen. Füllen Sie dieses Formular aus — Sie erhalten innerhalb eines Werktages eine RMA-Nummer und die Versandanweisung. Ohne RMA-Nummer können wir Rücksendungen nicht zuordnen und nehmen sie nicht an.',
        'Something does not work, does not fit, or arrived damaged. Fill in this form — you will receive an RMA number and shipping instructions within one working day. Without an RMA number we cannot allocate a return and will not accept it.'
      )}</p>
    </div>
  </section>

  <!-- process -->
  <section class="section section--tight section--flush-top" style="padding-top:var(--gap-l)">
    <div class="wrap">
      <ol class="steps reveal" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));display:grid;gap:var(--gap)">
        ${[
          ['Formular ausfüllen', 'Complete the form', 'Auftragsnummer, Seriennummer und eine kurze Fehlerbeschreibung. Fotos helfen uns, den Fall ohne Rückfragen zu beurteilen.', 'Order number, serial number and a short fault description. Photos let us assess the case without coming back to you.'],
          ['RMA-Nummer erhalten', 'Receive the RMA number', 'Innerhalb eines Werktages per E-Mail, zusammen mit der Versandadresse und dem Begleitschein zum Ausdrucken.', 'Within one working day by e-mail, together with the shipping address and a dispatch note to print.'],
          ['Gerät versenden', 'Ship the unit', 'RMA-Nummer außen gut sichtbar auf das Paket. Nach Möglichkeit in der Originalverpackung — Akkus nach Gefahrgutvorschrift.', 'RMA number clearly visible on the outside. In the original packaging where possible — batteries per dangerous-goods rules.'],
          ['Prüfung und Rückmeldung', 'Assessment and response', 'Wir prüfen, melden Befund und Kosten und führen nach Ihrer Freigabe Reparatur, Austausch oder Gutschrift aus.', 'We assess, report the finding and cost, and on your approval carry out repair, replacement or credit.']
        ].map(([de, en, bde, ben]) => `
        <li>
          <div>
            <h4>${sw(de, en)}</h4>
            <p class="t-small t-muted">${sw(bde, ben)}</p>
          </div>
        </li>`).join('')}
      </ol>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <div class="grid form-layout">

        <div class="form-card reveal">
          <form data-validate data-mailto="${SITE.emailService}" novalidate>
            <div class="form-status" role="status" aria-live="polite"></div>

            <!-- 1 contact -->
            <fieldset class="fset">
              <legend>${sw('1 · Ihre Kontaktdaten', '1 · Your contact details')}</legend>
              <div class="field-grid field-grid--2">
                <div class="field">
                  <label for="rma-name">${sw('Name', 'Name')} <span class="req">*</span></label>
                  <input class="input" type="text" id="rma-name" name="name" required autocomplete="name">
                  <span class="err-msg">${sw('Bitte Namen angeben.', 'Please enter your name.')}</span>
                </div>
                <div class="field">
                  <label for="rma-company">${sw('Firma / Einrichtung', 'Company / institution')} <span class="req">*</span></label>
                  <input class="input" type="text" id="rma-company" name="firma" required autocomplete="organization">
                  <span class="err-msg">${sw('Bitte Firma angeben.', 'Please enter your organisation.')}</span>
                </div>
                <div class="field">
                  <label for="rma-email">E-Mail <span class="req">*</span></label>
                  <input class="input" type="email" id="rma-email" name="email" required autocomplete="email">
                  <span class="hint">${sw('An diese Adresse geht die RMA-Nummer.', 'The RMA number goes to this address.')}</span>
                  <span class="err-msg">${sw('Bitte gültige E-Mail angeben.', 'Please enter a valid e-mail.')}</span>
                </div>
                <div class="field">
                  <label for="rma-phone">${sw('Telefon', 'Phone')} <span class="opt">${sw('optional', 'optional')}</span></label>
                  <input class="input" type="tel" id="rma-phone" name="telefon" autocomplete="tel">
                </div>
                <div class="field span-2">
                  <label for="rma-address">${sw('Rückversandadresse', 'Return shipping address')} <span class="opt">${sw('nur bei Abweichung', 'only if different')}</span></label>
                  <input class="input" type="text" id="rma-address" name="adresse" autocomplete="street-address" ${ph(
                    'Straße, PLZ, Ort — nur wenn die Lieferadresse abweicht',
                    'Street, postcode, town — only if different from the delivery address',
                    '街道、邮编、城市——仅在与收货地址不同时填写'
                  )}>
                </div>
              </div>
            </fieldset>

            <!-- 2 order -->
            <fieldset class="fset">
              <legend>${sw('2 · Auftrag und Gerät', '2 · Order and unit')}</legend>
              <p class="legend-note">${sw(
                'Die Seriennummer steht auf dem Typenschild an der Unterseite des Rumpfes.',
                'The serial number is on the type plate on the underside of the body.'
              )}</p>
              <div class="field-grid field-grid--2">
                <div class="field">
                  <label for="rma-order">${sw('Auftragsnummer', 'Order number')} <span class="req">*</span></label>
                  <input class="input" type="text" id="rma-order" name="auftragsnummer" required placeholder="NIC-2026-00000">
                  <span class="err-msg">${sw('Bitte Auftragsnummer angeben.', 'Please enter the order number.')}</span>
                </div>
                <div class="field">
                  <label for="rma-invoice">${sw('Rechnungsnummer', 'Invoice number')} <span class="opt">${sw('optional', 'optional')}</span></label>
                  <input class="input" type="text" id="rma-invoice" name="rechnungsnummer">
                  <span class="hint">${sw('Falls die Auftragsnummer nicht vorliegt.', 'If the order number is not to hand.')}</span>
                </div>
                <div class="field">
                  <label for="rma-product">${sw('Produkt', 'Product')} <span class="req">*</span></label>
                  <select class="select" id="rma-product" name="produkt" required>
                    <option value="">${sw('— bitte wählen —', '— please select —')}</option>
                    ${productOptions}
                    <option value="ersatzteil">${sw('Ersatzteil oder Zubehör', 'Spare part or accessory')}</option>
                    <option value="sonstiges">${sw('Anderes Produkt', 'Other product')}</option>
                  </select>
                  <span class="err-msg">${sw('Bitte Produkt wählen.', 'Please select the product.')}</span>
                </div>
                <div class="field">
                  <label for="rma-serial">${sw('Seriennummer', 'Serial number')} <span class="req">*</span></label>
                  <input class="input" type="text" id="rma-serial" name="seriennummer" required>
                  <span class="err-msg">${sw('Bitte Seriennummer angeben.', 'Please enter the serial number.')}</span>
                </div>
                <div class="field">
                  <label for="rma-qty">${sw('Anzahl betroffener Teile', 'Number of items affected')}</label>
                  <input class="input" type="number" id="rma-qty" name="anzahl" min="1" value="1">
                </div>
                <div class="field">
                  <label for="rma-date">${sw('Kaufdatum', 'Date of purchase')} <span class="opt">${sw('optional', 'optional')}</span></label>
                  <input class="input" type="date" id="rma-date" name="kaufdatum">
                </div>
              </div>
            </fieldset>

            <!-- 3 reason -->
            <fieldset class="fset">
              <legend>${sw('3 · Grund der Rücksendung', '3 · Reason for the return')}</legend>
              <div class="field-grid">
                <div class="field">
                  <label for="rma-reason">${sw('Was ist passiert?', 'What happened?')} <span class="req">*</span></label>
                  <select class="select" id="rma-reason" name="grund" required>
                    <option value="">${sw('— bitte wählen —', '— please select —')}</option>
                    <option value="defekt">${sw('Gerät defekt oder fehlerhaft', 'Unit faulty or defective')}</option>
                    <option value="transportschaden">${sw('Transportschaden — beschädigt angekommen', 'Transit damage — arrived damaged')}</option>
                    <option value="falschlieferung">${sw('Falschlieferung — falsches Produkt erhalten', 'Wrong delivery — wrong product received')}</option>
                    <option value="unvollstaendig">${sw('Lieferung unvollständig — Teile fehlen', 'Delivery incomplete — parts missing')}</option>
                    <option value="funktion">${sw('Funktion entspricht nicht der Beschreibung', 'Function does not match the description')}</option>
                    <option value="wartung">${sw('Planmäßige Wartung oder Kalibrierung', 'Scheduled maintenance or calibration')}</option>
                    <option value="widerruf">${sw('Widerruf innerhalb der Frist', 'Withdrawal within the statutory period')}</option>
                    <option value="sonstiges">${sw('Sonstiger Grund', 'Other reason')}</option>
                    <option value="unklar">${sw('Weiß ich nicht genau — bitte beraten', 'Not sure — please advise')}</option>
                  </select>
                  <span class="err-msg">${sw('Bitte einen Grund wählen.', 'Please choose a reason.')}</span>
                </div>

                <div class="field" id="rma-reason-other-field" hidden>
                  <label for="rma-reason-other">${sw('Bitte näher beschreiben', 'Please describe it')} <span class="req">*</span></label>
                  <input class="input" type="text" id="rma-reason-other" name="grund_sonstiges">
                  <span class="err-msg">${sw('Bitte kurz beschreiben.', 'Please describe it briefly.')}</span>
                </div>

                <div class="field">
                  <label for="rma-wish">${sw('Was wünschen Sie sich?', 'What would you like to happen?')} <span class="req">*</span></label>
                  <select class="select" id="rma-wish" name="wunsch" required>
                    <option value="">${sw('— bitte wählen —', '— please select —')}</option>
                    <option value="reparatur">${sw('Reparatur', 'Repair')}</option>
                    <option value="austausch">${sw('Austausch gegen ein gleiches Gerät', 'Replacement with an identical unit')}</option>
                    <option value="ersatzteil">${sw('Ersatzteil zusenden — ich tausche selbst', 'Send the part — I will swap it myself')}</option>
                    <option value="gutschrift">${sw('Gutschrift', 'Credit note')}</option>
                    <option value="rueckerstattung">${sw('Rückerstattung des Kaufpreises', 'Refund of the purchase price')}</option>
                    <option value="pruefung">${sw('Nur Prüfung und Kostenvoranschlag', 'Assessment and estimate only')}</option>
                    <option value="beratung">${sw('Ich bin mir nicht sicher — bitte beraten Sie mich', 'I am not sure — please advise me')}</option>
                  </select>
                  <span class="err-msg">${sw('Bitte einen Wunsch wählen.', 'Please choose an option.')}</span>
                </div>

                <div class="field">
                  <label for="rma-desc">${sw('Fehlerbeschreibung', 'Fault description')}</label>
                  <textarea class="textarea" id="rma-desc" name="beschreibung"
                    ${ph(
                      'Wann tritt der Fehler auf? Lässt er sich reproduzieren? Gab es eine Fehlermeldung, ein Geräusch, einen Sturz oder Wassereintritt? Welche Schritte haben Sie bereits versucht?',
                      'When does the fault occur? Can you reproduce it? Was there an error message, a noise, a fall or water ingress? What have you already tried?',
                      '故障在什么情况下出现？能否复现？是否有报错提示、异响、跌倒或进水？您已经尝试过哪些处理？'
                    )}></textarea>
                  <span class="hint">${sw(
                    'Je genauer die Beschreibung, desto seltener müssen wir nachfragen — und desto schneller ist das Gerät zurück bei Ihnen.',
                    'The more precise the description, the less often we have to come back to you — and the sooner the unit is back with you.'
                  )}</span>
                </div>

                <div class="field">
                  <label>${sw('Zustand bei Rücksendung', 'Condition on return')}</label>
                  <div class="choice">
                    <label><input type="radio" name="zustand" value="original" checked><span>${sw('Originalverpackung vorhanden, Zubehör vollständig', 'Original packaging available, accessories complete')}</span></label>
                    <label><input type="radio" name="zustand" value="teilweise"><span>${sw('Originalverpackung vorhanden, Zubehör teilweise', 'Original packaging available, accessories partial')}</span></label>
                    <label><input type="radio" name="zustand" value="ersatz"><span>${sw('Keine Originalverpackung — wird ersatzweise verpackt', 'No original packaging — will be packed otherwise')}</span></label>
                  </div>
                </div>
              </div>
            </fieldset>

            <!-- 4 evidence -->
            <fieldset class="fset">
              <legend>${sw('4 · Bilder und Nachweise', '4 · Images and evidence')}</legend>
              <p class="legend-note">${sw(
                'Ein Foto des Schadens, des Typenschilds oder der Verpackung beschleunigt die Bearbeitung erheblich — bei Transportschäden ist es für die Versicherung sogar erforderlich.',
                'A photo of the damage, the type plate or the packaging speeds things up considerably — for transit damage the insurer requires it.'
              )}</p>
              <div class="field">
                <label class="dropzone" data-list="rma-files" for="rma-upload">
                  ${ICON.upload}
                  <strong>${sw('Dateien hierher ziehen oder auswählen', 'Drag files here or choose them')}</strong>
                  <span class="hint">${sw(
                    'JPG, PNG, WebP, PDF oder MP4 · max. 5 MB je Datei · bis zu 6 Dateien',
                    'JPG, PNG, WebP, PDF or MP4 · max. 5 MB per file · up to 6 files'
                  )}</span>
                  <input type="file" id="rma-upload" name="dateien" multiple accept="image/*,application/pdf,video/mp4">
                </label>
                <ul class="filelist" id="rma-files"></ul>
              </div>
            </fieldset>

            <!-- 5 consent -->
            <fieldset class="fset">
              <legend>${sw('5 · Bestätigung', '5 · Confirmation')}</legend>
              <div class="field-grid">
                <div class="field">
                  <label class="consent">
                    <input type="checkbox" name="reset_ok">
                    <span>${sw(
                      'Mir ist bekannt, dass Geräte bei einer Reparatur auf Werkseinstellungen zurückgesetzt werden können und gespeicherte Karten, Routen und Konfigurationen dabei verloren gehen.',
                      'I understand that during repair units may be reset to factory settings and that stored maps, routes and configurations may be lost.'
                    )}</span>
                  </label>
                </div>
                <div class="field">
                  <label class="consent">
                    <input type="checkbox" name="datenschutz" required>
                    <span>${sw(
                      'Ich willige ein, dass meine Angaben zur Bearbeitung des Vorgangs gespeichert und verwendet werden.',
                      'I consent to my details being stored and used to process this case.'
                    )} <a href="${r}unternehmen/datenschutz.html">${sw('Datenschutzerklärung', 'Privacy notice')}</a> <span class="req">*</span></span>
                  </label>
                  <span class="err-msg">${sw('Bitte bestätigen Sie die Datenschutzerklärung.', 'Please confirm the privacy notice.')}</span>
                </div>
              </div>
            </fieldset>

            <div class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>

            <div class="cluster mt-l">
              <button class="btn btn--lg btn--arrow" type="submit">${sw('RMA-Nummer anfordern', 'Request RMA number')} ${ICON.arrow}</button>
              <span class="t-small t-dim">${sw('Antwort innerhalb eines Werktages.', 'Reply within one working day.')}</span>
            </div>
          </form>
        </div>

        <aside class="stack reveal" data-delay="1">
          <div class="panel panel--glow">
            <h3 style="font-size:var(--step-1);margin-bottom:.8rem">${sw('Bitte zuerst lesen', 'Please read first')}</h3>
            <ul class="ticks">
              <li>${sw('Senden Sie nichts ohne RMA-Nummer — Pakete ohne Nummer werden nicht angenommen.', 'Do not ship anything without an RMA number — parcels without one are refused.')}</li>
              <li>${sw('Die RMA-Nummer ist vier Wochen gültig.', 'The RMA number is valid for four weeks.')}</li>
              <li>${sw('Akkus unterliegen der Gefahrgutvorschrift. Wir nennen Ihnen den zulässigen Versandweg.', 'Batteries are dangerous goods. We will tell you the permitted shipping route.')}</li>
              <li>${sw('Bei Transportschäden melden Sie sich bitte innerhalb von sieben Tagen nach Erhalt.', 'For transit damage, please report within seven days of receipt.')}</li>
            </ul>
          </div>

          <div class="panel">
            <h3 style="font-size:var(--step-1);margin-bottom:.8rem">${sw('Vielleicht geht es ohne Rücksendung', 'It may not need a return')}</h3>
            <p class="t-small t-muted" style="margin-bottom:1rem">${sw(
              'Ein erheblicher Teil der gemeldeten Fehler lässt sich aus der Ferne lösen — Firmware, Kalibrierung, ein Parameter. Bevor Sie ein 60-Kilo-Gerät verpacken, lohnt sich ein Anruf.',
              'A substantial share of reported faults can be solved remotely — firmware, calibration, a parameter. Before you crate a 60-kilo machine, a phone call is worth it.'
            )}</p>
            <div class="footer-contact">
              <a href="tel:${SITE.phoneHref}">${ICON.phone} ${SITE.phone}</a>
              <a href="mailto:${SITE.emailService}">${ICON.mail} ${SITE.emailService}</a>
            </div>
          </div>

          <div class="panel">
            <h3 style="font-size:var(--step-1);margin-bottom:.8rem">${sw('Rücksendeadresse', 'Return address')}</h3>
            <p class="t-small t-muted" style="margin-bottom:.7rem">${sw('Erst nach Erhalt der RMA-Nummer versenden an:', 'Only ship after receiving the RMA number, to:')}</p>
            <address class="t-small" style="font-style:normal;line-height:1.7;color:var(--fg-muted)">
              ${SITE.legal}<br>
              NIC Robotics · ${sw('Retoure', 'Returns')}<br>
              ${SITE.street}<br>
              ${SITE.zipCity}<br>
              ${SITE.country}
            </address>
            <p class="t-small t-dim" style="margin-top:.8rem">${sw(
              'RMA-Nummer außen gut sichtbar vermerken.',
              'Mark the RMA number clearly on the outside.'
            )}</p>
          </div>

          <div class="panel">
            <h3 style="font-size:var(--step-1);margin-bottom:.8rem">${sw('Widerruf statt Reparatur?', 'Withdrawal rather than repair?')}</h3>
            <p class="t-small t-muted">${sw(
              'Verbraucher haben ein vierzehntägiges Widerrufsrecht. Die Bedingungen und das Muster-Widerrufsformular finden Sie auf der Seite zum Widerrufsrecht.',
              'Consumers have a fourteen-day right of withdrawal. The conditions and the model withdrawal form are on the right-of-withdrawal page.'
            )}</p>
            <p style="margin-top:.8rem"><a class="link" href="${r}unternehmen/widerruf.html">${sw('Zum Widerrufsrecht', 'Right of withdrawal')} ${ICON.arrow}</a></p>
          </div>
        </aside>

      </div>
    </div>
  </section>
</main>

${footer(CATS, 1)}
${scripts(1)}`;

  write('service/ruecksendung.html', html);
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
          'Denn ein Laufroboter ist kein Produkt, das man in einen Karton legt und verschickt. Er braucht jemanden, der die Schnittstelle zum Leitsystem baut, der das Personal einweist, der am Montagmorgen ans Telefon geht, wenn das Gerät nicht aus der Ladestation fährt — und der einen Gummifuß auf Lager hat, statt ihn in Asien zu bestellen. Das ist der Teil, den wir übernehmen.',
          'Because a legged robot is not a product you put in a box and ship. It needs someone to build the interface into the control system, to train the staff, to pick up the phone on Monday morning when the unit will not leave its dock — and to have a rubber foot on the shelf instead of ordering it from Asia. That is the part we take on.'
        )}</p>
      </div>

      <div class="rule mt-l mb"></div>

      <div class="grid cols-2 mt-l" style="gap:var(--gap-l)">
        ${[
          ['Was wir tun', 'What we do',
           'Import, Vertrieb, technische Integration, Schulung, Ersatzteilhaltung und Reparatur für Laufrobotik in Europa. Wir beliefern Industrie, Energieversorger, Feuerwehren, Hochschulen und Sicherheitsdienstleister.',
           'Import, sales, technical integration, training, spare-part stocking and repair for legged robotics in Europe. We supply industry, utilities, fire services, universities and security providers.'],
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
${H3('3 · Kontakt-, Angebots- und Rücksendeformulare', '3 · Contact, quotation and return forms')}
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
  'Im Rücksendeformular können Sie Bilder, PDF-Dateien oder kurze Videos hochladen. Diese werden ausschließlich zur Beurteilung des gemeldeten Mangels verwendet, nicht veröffentlicht und nach Abschluss des Vorgangs gelöscht, soweit keine Gewährleistungs- oder Versicherungsansprüche eine längere Aufbewahrung erfordern.',
  'In the return form you may upload images, PDF files or short videos. These are used solely to assess the reported defect, are not published, and are erased once the case is closed, unless warranty or insurance claims require longer retention.'
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
  'Rücksendungen bedürfen vorab einer RMA-Nummer. Sendungen ohne RMA-Nummer können wir nicht zuordnen und nehmen sie nicht an.',
  'Returns require an RMA number issued in advance. We cannot allocate consignments without an RMA number and will not accept them.'
)}
${H3('§ 7 Haftung', '§ 7 Liability')}
${PARA(
  'Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit. Bei einfacher Fahrlässigkeit haften wir nur bei Verletzung einer wesentlichen Vertragspflicht und der Höhe nach begrenzt auf den vertragstypischen, vorhersehbaren Schaden.',
  'We are liable without limitation for intent and gross negligence and for damage arising from injury to life, body or health. In cases of simple negligence we are liable only for breach of a material contractual obligation and limited in amount to the typical, foreseeable damage.'
)}
${H3('§ 8 Betrieb und Einweisung', '§ 8 Operation and instruction')}
${PARA(
  'Die gelieferten Geräte sind Maschinen im Sinne der Maschinenverordnung. Der Besteller ist für den bestimmungsgemäßen Einsatz, die Gefährdungsbeurteilung am Einsatzort und die Unterweisung des Bedienpersonals verantwortlich. Wir weisen bei Übergabe in die Bedienung ein; dies ersetzt keine arbeitsschutzrechtliche Unterweisung durch den Betreiber.',
  'The machines supplied are machinery within the meaning of the Machinery Regulation. The buyer is responsible for intended use, the risk assessment at the place of use and the instruction of operating personnel. We provide operating instruction on handover; this does not replace the operator’s own occupational-safety instruction.'
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
  'Alternativ können Sie uns Ihren Widerruf formlos per E-Mail oder über unser Rücksendeformular mitteilen.',
  'Alternatively you may notify us of your withdrawal informally by e-mail or through our return form.'
)}
<p><a class="link" href="../service/ruecksendung.html">${sw('Zum Rücksendeformular', 'To the return form')} ${ICON.arrow}</a></p>`
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
     'Deutsche Gewährleistung statt Versand nach Asien.', 'A German warranty instead of shipping to Asia.', '德国本地质保，不必寄回亚洲。',
     ['Gesetzliche Gewährleistung nach deutschem Recht', 'Garantieabwicklung direkt über uns — ein Ansprechpartner', 'Optionale Garantieverlängerung für Flotten und Dauerbetrieb'],
     ['Statutory warranty under German law', 'Warranty claims handled by us — one point of contact', 'Optional warranty extension for fleets and continuous operation'],
     ['依据德国法律提供法定质保', '由我们直接处理保修，只需对接一个联系人', '可为车队和长期运行设备延长保修']],
    ['servicezentrum', 'wrench',
     'Servicezentrum Deutschland', 'Service centre Germany', '德国维修中心',
     'Diagnose, Reparatur und Wartung im Rhein-Main-Gebiet.', 'Diagnosis, repair and maintenance in the Rhine-Main region.', '位于莱茵-美因地区，负责检测、维修与保养。',
     ['Eingangsdiagnose innerhalb weniger Werktage', 'Reparatur mit Originalteilen ab Lager', 'Jährliche Inspektion und Wartungsverträge'],
     ['Incoming diagnosis within a few working days', 'Repair with original parts from stock', 'Annual inspection and maintenance contracts'],
     ['收到设备后数个工作日内完成检测', '使用库存原厂配件维修', '年度检修与维保合同']],
    ['ersatzteile', 'cpu',
     'Ersatzteile', 'Spare parts', '备件更换',
     'Verschleißteile, die Sie selbst tauschen.', 'Wear parts you can swap yourself.', '易损件，客户可自行快速更换。',
     ['Füße, Akkus, Ladegeräte und Schutzteile ab Lager', 'Tauschanleitungen für den Selbsteinbau', 'Module für schnellen Austausch vor Ort'],
     ['Feet, batteries, chargers and protective parts from stock', 'Swap guides for self-installation', 'Modules for fast on-site exchange'],
     ['足垫、电池、充电器和防护件均有现货', '提供自行更换的操作指南', '模块化部件，可在现场快速更换']],
    ['schulung', 'clock',
     'Schulung & Fernsupport', 'Training & remote support', '培训与远程支持',
     'Ihr Team bedient den Roboter sicher — ab dem ersten Tag.', 'Your team runs the robot safely — from day one.', '从第一天起，您的团队就能安全操作。',
     ['Einweisung bei Übergabe, auf Deutsch und Englisch', 'Telefon- und Fernwartungs-Hotline', 'Software-Updates und Integrationshilfe (SDK, ROS 2)'],
     ['Instruction at handover, in German and English', 'Phone and remote-maintenance hotline', 'Software updates and integration help (SDK, ROS 2)'],
     ['交付时提供德语和英语操作培训', '电话及远程维护热线', '软件更新与二次开发支持（SDK、ROS 2）']],
    ['rma', 'upload',
     'Rücksendung & Reparatur (RMA)', 'Returns & repair (RMA)', '退货与返修（RMA）',
     'Ein Formular, ein Vorgang, klare Rückmeldung.', 'One form, one case, clear feedback.', '一张表单，一个工单，清晰回复。',
     ['Online-Formular mit Foto-Upload', 'Reparatur, Austausch oder Erstattung', 'Statusmeldung zu jedem Vorgang'],
     ['Online form with photo upload', 'Repair, replacement or refund', 'Status update on every case'],
     ['在线填写表单，可上传照片', '可选维修、更换或退款', '每个工单都有进度反馈']]
  ];
  const links = { ersatzteile: 'produkte/ersatzteile.html', rma: 'service/ruecksendung.html', vorfuehrung: 'service/kontakt.html' };
  const linkTxt = {
    ersatzteile: ['Zu den Ersatzteilen', 'To spare parts', '查看备件'],
    rma: ['Zum RMA-Formular', 'To the RMA form', '填写 RMA 表单'],
    vorfuehrung: ['Vorführung vereinbaren', 'Arrange a demo', '预约演示']
  };

  const html = `${head({
    title: 'Service & Support',
    description: 'Garantie, Servicezentrum in Deutschland, Ersatzteile, Schulung und Reparatur für Roboter von NIC Robotics.',
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

function run() {
  buildService();
  buildOffer();
  buildRMA();
  buildContact();
  buildAbout();
  buildLegal();
}

module.exports = { run };
