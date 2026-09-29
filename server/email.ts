// Email helpers shared by the Express routes and the Vercel functions in api/,
// so this file uses relative imports only. Configured via .env (see .env.example).
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.SKILL_EMAIL_FROM || "Shawny Hargrove <onboarding@resend.dev>";
export const NOTIFY_EMAIL = process.env.SKILL_NOTIFY_EMAIL;
export const SITE_URL = "https://shawnyhargrove.com";

export type Attachment = { filename: string; content: string };
export type Email = { to: string; subject: string; html: string; text: string; attachments?: Attachment[]; replyTo?: string };

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Branded, table-based shell (dark header, pink rule, grey footer) that renders
// consistently across email clients. `body` is inserted as table rows.
export function renderEmailLayout(title: string, body: string, footerNote: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e4e4e7;">
            <tr>
              <td style="background:#1a1a1a;padding:28px 40px;">
                <p style="margin:0;font-size:22px;font-weight:700;letter-spacing:0.5px;color:#f85aed;">SH</p>
                <p style="margin:6px 0 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a1a1aa;">Shawny Hargrove &middot; Learning &amp; Development</p>
              </td>
            </tr>
            <tr>
              <td style="height:4px;background:#f85aed;line-height:4px;font-size:0;">&nbsp;</td>
            </tr>
            ${body}
            <tr>
              <td style="background:#fafafa;border-top:1px solid #ececec;padding:20px 40px;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#8a8a8a;">
                  ${footerNote} at
                  <a href="${SITE_URL}" style="color:#c026d3;text-decoration:none;">shawnyhargrove.com</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export const emailSignature = `
                <p style="margin:0 0 4px;font-size:15px;color:#333333;">Kind regards,</p>
                <p style="margin:0 0 2px;font-size:15px;font-weight:600;color:#1a1a1a;">Shawny Hargrove</p>
                <p style="margin:0 0 40px;font-size:13px;color:#71717a;">L&amp;D Strategist &amp; Instructional Designer</p>`;

export const textSignature = ["Kind regards,", "Shawny Hargrove", "L&D Strategist & Instructional Designer"];

// Simple key/value table for the owner notification emails.
export function buildNotificationHtml(rows: [string, string][]) {
  return `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">${rows
    .map(([k, v]) => `<tr><td style="color:#71717a;">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("")}</table>`;
}

export function isEmailConfigured() {
  return Boolean(RESEND_API_KEY);
}

export async function sendEmail(email: Email) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [email.to],
      subject: email.subject,
      html: email.html,
      text: email.text,
      attachments: email.attachments,
      reply_to: email.replyTo,
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

// Sends the visitor's email, then (best effort) the owner notification.
// Without an API key in development, logs instead of sending.
export async function deliver(
  label: string,
  visitorEmail: Email,
  notification: Omit<Email, "to">,
): Promise<{ status: number; json: object }> {
  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error(`[${label}] RESEND_API_KEY is not set; cannot send email`);
      return { status: 500, json: { error: "Email delivery is not available right now. Please try again later." } };
    }
    console.log(`[${label}] (not sent, no RESEND_API_KEY) to=${visitorEmail.to} subject="${visitorEmail.subject}"${visitorEmail.attachments ? ` files=${visitorEmail.attachments.map((a) => a.filename).join(",")}` : ""}`);
    return { status: 200, json: { success: true } };
  }

  try {
    await sendEmail({ ...visitorEmail, replyTo: NOTIFY_EMAIL });
  } catch (error) {
    console.error(`[${label}] delivery failed`, error);
    return { status: 502, json: { error: "We couldn't send the email. Please check your address and try again." } };
  }

  if (NOTIFY_EMAIL) {
    await sendEmail({ ...notification, to: NOTIFY_EMAIL, replyTo: visitorEmail.to }).catch((error) =>
      console.error(`[${label}] owner notification failed`, error),
    );
  }

  return { status: 200, json: { success: true } };
}
