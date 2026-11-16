// Cloudflare Pages Function — POST /api/contact
// Runs server-side only. The Resend API key is read from Cloudflare
// environment bindings and never reaches the browser.
//
// Required Pages secrets:
//   RESEND_API_KEY  — from resend.com → API Keys
//   CONTACT_EMAIL   — inbox that receives enquiries (comma-separate for several)
//   FROM_EMAIL      — sender. Until a domain is verified in Resend use
//                     "GuruPriya Tours & Travels <onboarding@resend.dev>"
//                     (Resend then only delivers to the Resend account's own email).

interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
  FROM_EMAIL: string;
}

interface ContactPayload {
  fullName: string;
  mobile: string;
  email?: string;
  destination?: string;
  category?: string;
  categoryLabel?: string;
  yatra?: string;
  yatraTitle?: string;
  travellers?: string;
  preferredDate?: string;
  travelMode?: string;
  travelModeLabel?: string;
  message?: string;
  language?: string;
  pageUrl?: string;
  consent?: boolean;
  startedAt?: number; // time-trap: when the form was rendered (ms epoch)
  company?: string; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const MAX_BODY_BYTES = 16 * 1024;
// People need more than a few seconds to fill the form; simple bots don't.
const MIN_FILL_MS = 3000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function badRequest(message: string) {
  return json({ error: message }, 400);
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function rowsToHtml(rows: [string, string][]): string {
  return rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;white-space:nowrap;vertical-align:top"><strong>${escapeHtml(label)}</strong></td>` +
        `<td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${value}</td></tr>`
    )
    .join("");
}

function wrapEmail(title: string, inner: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#222">
    <div style="background:#7A1F2B;color:#fff;padding:16px 20px;border-radius:10px 10px 0 0">
      <strong style="font-size:18px">${escapeHtml(title)}</strong><br/>
      <span style="font-size:13px;opacity:.8">GuruPriya Tours &amp; Travels</span>
    </div>
    <div style="border:1px solid #eee;border-top:0;border-radius:0 0 10px 10px;padding:16px 8px">${inner}</div>
  </div>`;
}

async function sendEmail(env: Env, body: Record<string, unknown>): Promise<Response> {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.FROM_EMAIL, ...body })
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Only accept same-origin browser submissions.
  const origin = request.headers.get("Origin");
  if (origin) {
    let sameHost = false;
    try {
      sameHost = new URL(origin).host === new URL(request.url).host;
    } catch {
      sameHost = false;
    }
    if (!sameHost) return json({ error: "Forbidden." }, 403);
  }
  if (!(request.headers.get("Content-Type") ?? "").includes("application/json")) {
    return json({ error: "Unsupported content type." }, 415);
  }

  let payload: ContactPayload;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ error: "Request too large." }, 413);
    payload = JSON.parse(raw);
  } catch {
    return badRequest("Invalid request body.");
  }

  // Honeypot — bots that fill hidden fields are silently accepted and dropped.
  if (payload.company && payload.company.trim() !== "") {
    return json({ ok: true });
  }

  // Time-trap: submitted too fast to be a person. Accept silently and drop.
  if (typeof payload.startedAt === "number" && Date.now() - payload.startedAt < MIN_FILL_MS) {
    return json({ ok: true });
  }

  const fullName = clean(payload.fullName, 200);
  const mobileDigits = (payload.mobile ?? "").replace(/\D/g, "").slice(-10);
  const email = clean(payload.email, 200);

  if (!fullName) return badRequest("A valid name is required.");
  if (!MOBILE_RE.test(mobileDigits)) return badRequest("A valid 10-digit mobile number is required.");
  if (email && !EMAIL_RE.test(email)) return badRequest("Please enter a valid email address.");
  if (payload.consent !== true) return badRequest("Consent to be contacted is required.");

  const yatraSlug = clean(payload.yatra, 200);
  const yatraTitle = clean(payload.yatraTitle, 300) || yatraSlug;
  const destination = clean(payload.destination, 120);
  const category = clean(payload.categoryLabel, 60) || clean(payload.category, 40);
  const travellers = clean(payload.travellers, 10);
  const preferredDate = clean(payload.preferredDate, 20);
  const travelMode = clean(payload.travelModeLabel, 50) || clean(payload.travelMode, 20);
  const message = clean(payload.message, 2000);
  const language = clean(payload.language, 5) === "mr" ? "Marathi" : "English";
  const pageUrl = clean(payload.pageUrl, 500);

  if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL || !env.FROM_EMAIL) {
    console.error("Contact form: RESEND_API_KEY / CONTACT_EMAIL / FROM_EMAIL secret missing.");
    return json({ error: "Email service is not configured." }, 500);
  }

  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

  const enquiryRows: [string, string][] = [
    ["Name", escapeHtml(fullName)],
    ["Mobile", `<a href="tel:+91${mobileDigits}">${mobileDigits}</a> &nbsp;·&nbsp; <a href="https://wa.me/91${mobileDigits}">WhatsApp</a>`],
    ["Email", email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : "Not provided"],
    ["Destination", escapeHtml(destination || "-")],
    ["Travel Type", escapeHtml(category || "-")],
    ["Tour / Package", escapeHtml(yatraTitle || "Not selected")],
    ["Travel Mode", escapeHtml(travelMode || "Not decided")],
    ["Travellers", escapeHtml(travellers || "-")],
    ["Travel Month / Date", escapeHtml(preferredDate || "-")],
    ["Message", escapeHtml(message || "-")],
    ["Language", language],
    ["Submitted", `${escapeHtml(submittedAt)} IST`],
    ["Page", pageUrl ? escapeHtml(pageUrl) : "-"]
  ];

  const enquiryText = [
    `New Travel Enquiry — ${fullName}`,
    "",
    `Name: ${fullName}`,
    `Mobile: ${mobileDigits}`,
    `Email: ${email || "Not provided"}`,
    `Destination: ${destination || "-"}`,
    `Travel Type: ${category || "-"}`,
    `Tour / Package: ${yatraTitle || "Not selected"}`,
    `Travel Mode: ${travelMode || "Not decided"}`,
    `Travellers: ${travellers || "-"}`,
    `Travel Month / Date: ${preferredDate || "-"}`,
    `Message: ${message || "-"}`,
    `Language: ${language}`,
    `Submitted: ${submittedAt} IST`,
    `Page: ${pageUrl || "-"}`
  ].join("\n");

  try {
    const resendRes = await sendEmail(env, {
      to: env.CONTACT_EMAIL.split(",").map((s) => s.trim()).filter(Boolean),
      ...(email ? { reply_to: email } : {}),
      subject: `New Travel Enquiry — ${fullName}${yatraTitle ? ` — ${yatraTitle}` : destination ? ` — ${destination}` : ""}`,
      html: wrapEmail("New Travel Enquiry", `<table style="border-collapse:collapse;width:100%;font-size:14px">${rowsToHtml(enquiryRows)}</table>`),
      text: enquiryText
    });

    if (!resendRes.ok) {
      console.error("Resend API error:", resendRes.status, await resendRes.text());
      return json({ error: "Failed to send enquiry." }, 502);
    }

    // Best-effort acknowledgement to the customer. Without a verified sending
    // domain Resend rejects this (it only delivers to the account owner), so a
    // failure here must not fail the request — the enquiry was already sent.
    if (email) try {
      const ackRows: [string, string][] = enquiryRows.filter(([label]) =>
        ["Destination", "Travel Type", "Tour / Package", "Travel Mode", "Travellers", "Travel Month / Date", "Message"].includes(label)
      );
      const ackRes = await sendEmail(env, {
        to: [email],
        subject: "We've received your enquiry — GuruPriya Tours & Travels",
        html: wrapEmail(
          "Thank you for your enquiry",
          `<p style="padding:0 12px">Namaste ${escapeHtml(fullName)},</p>
           <p style="padding:0 12px">Thank you for contacting GuruPriya Tours &amp; Travels. Our team will call you shortly on <strong>${mobileDigits}</strong>.</p>
           <table style="border-collapse:collapse;width:100%;font-size:14px">${rowsToHtml(ackRows)}</table>
           <p style="padding:0 12px">For anything urgent, call or WhatsApp us on 7498132640 / 9730699805.</p>
           <p style="padding:0 12px">🙏 GuruPriya Tours &amp; Travels</p>`
        )
      });
      if (!ackRes.ok) console.warn("Acknowledgement email not sent:", ackRes.status, await ackRes.text());
    } catch (ackError) {
      console.error("Acknowledgement email failed:", ackError);
    }

    return json({ ok: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return json({ error: "Unexpected server error." }, 500);
  }
};

export const onRequestGet: PagesFunction = async () => json({ error: "Method not allowed." }, 405);
