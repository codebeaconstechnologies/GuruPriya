// Cloudflare Pages Function — POST /api/contact
// Runs server-side only. The Resend API key is read from Cloudflare
// environment bindings and never reaches the browser.

interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
  FROM_EMAIL: string;
}

interface ContactPayload {
  fullName: string;
  mobile: string;
  email: string;
  yatra?: string;
  travellers?: string;
  preferredDate?: string;
  message?: string;
  company?: string; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[6-9]\d{9}$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function badRequest(message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status: 400,
    headers: { "Content-Type": "application/json" }
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return badRequest("Invalid request body.");
  }

  // Honeypot — bots that fill hidden fields are silently accepted and dropped.
  if (payload.company && payload.company.trim() !== "") {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const fullName = (payload.fullName ?? "").trim();
  const mobileDigits = (payload.mobile ?? "").replace(/\D/g, "").slice(-10);
  const email = (payload.email ?? "").trim();

  if (!fullName || fullName.length > 200) return badRequest("A valid name is required.");
  if (!MOBILE_RE.test(mobileDigits)) return badRequest("A valid 10-digit mobile number is required.");
  if (!EMAIL_RE.test(email) || email.length > 200) return badRequest("A valid email address is required.");

  const yatra = (payload.yatra ?? "").slice(0, 200);
  const travellers = (payload.travellers ?? "").slice(0, 10);
  const preferredDate = (payload.preferredDate ?? "").slice(0, 20);
  const message = (payload.message ?? "").slice(0, 2000);

  if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL || !env.FROM_EMAIL) {
    return new Response(JSON.stringify({ error: "Email service is not configured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const submittedAt = new Date().toISOString();

  const html = `
    <h2>New Yatra Enquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
      <tr><td><strong>Mobile</strong></td><td>${escapeHtml(mobileDigits)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Selected Yatra</strong></td><td>${escapeHtml(yatra || "-")}</td></tr>
      <tr><td><strong>Travellers</strong></td><td>${escapeHtml(travellers || "-")}</td></tr>
      <tr><td><strong>Preferred Date</strong></td><td>${escapeHtml(preferredDate || "-")}</td></tr>
      <tr><td><strong>Message</strong></td><td>${escapeHtml(message || "-")}</td></tr>
      <tr><td><strong>Submitted At</strong></td><td>${escapeHtml(submittedAt)}</td></tr>
    </table>
  `;

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [env.CONTACT_EMAIL],
        reply_to: email,
        subject: `New Yatra Enquiry — ${fullName}`,
        html
      })
    });

    if (!resendRes.ok) {
      const errorBody = await resendRes.text();
      console.error("Resend API error:", errorBody);
      return new Response(JSON.stringify({ error: "Failed to send enquiry." }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Best-effort acknowledgement email to the customer — failures here
    // must not fail the overall request, since the enquiry was already sent.
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL,
          to: [email],
          subject: "We've received your enquiry — GuruPriya Tours & Travels",
          html: `<p>Namaste ${escapeHtml(fullName)},</p><p>Thank you for your enquiry. Our team will contact you shortly.</p><p>GuruPriya Tours &amp; Travels</p>`
        })
      });
    } catch (ackError) {
      console.error("Acknowledgement email failed:", ackError);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return new Response(JSON.stringify({ error: "Unexpected server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const onRequestGet: PagesFunction = async () => {
  return new Response(JSON.stringify({ error: "Method not allowed." }), {
    status: 405,
    headers: { "Content-Type": "application/json" }
  });
};
