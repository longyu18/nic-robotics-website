/* Cloudflare Pages Function: POST /api/reparatur
   Nimmt das Reparaturformular (multipart/form-data) entgegen und sendet es per
   E-Mail an das Serviceteam. Versand über die Resend-API (https://resend.com).

   Umgebungsvariablen (Cloudflare → Pages-Projekt → Settings → Variables and Secrets):
     RESEND_API_KEY   API-Schlüssel von Resend (als "Secret" anlegen)
     REPAIR_MAIL_TO   Empfänger, z. B. service@nic-robotics.de (mehrere mit Komma)
     REPAIR_MAIL_FROM Absender auf einer bei Resend verifizierten Domain,
                      z. B. "NIC Robotics Website <noreply@nic-robotics.de>"
*/

const MAX_FILES = 6;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_BYTES = 30 * 1024 * 1024;

const FIELDS = [
  ['firma', 'Firma', true, 160],
  ['name', 'Ansprechpartner', true, 120],
  ['email', 'E-Mail', true, 160],
  ['telefon', 'Telefon', false, 60],
  ['rechnungsnummer', 'Rechnungsnummer', false, 80],
  ['seriennummer', 'Seriennummer', false, 80],
  ['produkt', 'Produkt', false, 200],
  ['beschreibung', 'Beschreibung', false, 4000]
];

const json = (status, data) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });

const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function toBase64(buf) {
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

function caseId() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `R-${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}-${rnd}`;
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.REPAIR_MAIL_TO || !env.REPAIR_MAIL_FROM) {
    return json(503, { ok: false, error: 'not_configured' });
  }

  let form;
  try { form = await request.formData(); } catch (e) { return json(400, { ok: false, error: 'bad_request' }); }

  // Honeypot: Bots füllen das versteckte Feld aus → still "erfolgreich" beenden.
  if ((form.get('website') || '').toString().trim()) return json(200, { ok: true, id: caseId() });

  const data = {};
  for (const [key, , required, max] of FIELDS) {
    const v = (form.get(key) || '').toString().trim().slice(0, max);
    if (required && !v) return json(400, { ok: false, error: 'missing', field: key });
    data[key] = v;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json(400, { ok: false, error: 'email', field: 'email' });
  if ((form.get('datenschutz') || '').toString() !== 'ja') return json(400, { ok: false, error: 'consent', field: 'datenschutz' });

  const faults = form.getAll('fehlerart').map((v) => v.toString().slice(0, 80)).filter(Boolean).slice(0, 12);

  const attachments = [];
  let total = 0;
  for (const f of form.getAll('fotos')) {
    if (typeof f === 'string' || !f || !f.size) continue;
    if (attachments.length >= MAX_FILES) break;
    if (!/^image\//.test(f.type || '')) continue;
    if (f.size > MAX_FILE_BYTES) return json(413, { ok: false, error: 'file_too_large' });
    total += f.size;
    if (total > MAX_TOTAL_BYTES) return json(413, { ok: false, error: 'too_large' });
    const name = (f.name || `foto-${attachments.length + 1}.jpg`).replace(/[^\w.\-]+/g, '_').slice(0, 80);
    attachments.push({ filename: name, content: toBase64(await f.arrayBuffer()) });
  }

  const id = caseId();
  const rows = FIELDS.filter(([k]) => k !== 'beschreibung')
    .map(([k, label]) => `<tr><td style="padding:6px 14px 6px 0;color:#667;vertical-align:top">${label}</td><td style="padding:6px 0">${esc(data[k] || '—')}</td></tr>`)
    .join('');
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111;line-height:1.5">
<h2 style="margin:0 0 4px">Reparaturmeldung ${id}</h2>
<p style="margin:0 0 16px;color:#667">Eingang über nic-robotics.de · ${new Date().toISOString().replace('T', ' ').slice(0, 16)} UTC</p>
<table style="border-collapse:collapse">${rows}
<tr><td style="padding:6px 14px 6px 0;color:#667;vertical-align:top">Fehlerart</td><td style="padding:6px 0">${faults.length ? faults.map(esc).join('<br>') : '—'}</td></tr>
<tr><td style="padding:6px 14px 6px 0;color:#667;vertical-align:top">Fotos</td><td style="padding:6px 0">${attachments.length} im Anhang</td></tr>
</table>
<h3 style="margin:18px 0 6px">Beschreibung</h3>
<div style="white-space:pre-wrap;background:#f4f5f7;padding:12px;border-radius:6px">${esc(data.beschreibung || '—')}</div>
<p style="margin-top:18px;color:#667">Antworten auf diese E-Mail gehen direkt an ${esc(data.email)}.</p>
</div>`;
  const text = [
    `Reparaturmeldung ${id}`, '',
    ...FIELDS.filter(([k]) => k !== 'beschreibung').map(([k, label]) => `${label}: ${data[k] || '-'}`),
    `Fehlerart: ${faults.join(', ') || '-'}`,
    `Fotos: ${attachments.length}`, '',
    'Beschreibung:', data.beschreibung || '-'
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.REPAIR_MAIL_FROM,
      to: env.REPAIR_MAIL_TO.split(',').map((s) => s.trim()).filter(Boolean),
      reply_to: data.email,
      subject: `Reparatur ${id} · ${data.firma}${data.produkt ? ' · ' + data.produkt : ''}`,
      html,
      text,
      attachments
    })
  });

  if (!res.ok) return json(502, { ok: false, error: 'send_failed' });
  return json(200, { ok: true, id });
}

export function onRequest() {
  return json(405, { ok: false, error: 'method_not_allowed' });
}
