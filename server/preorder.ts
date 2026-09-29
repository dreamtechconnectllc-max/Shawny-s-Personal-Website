// Shared by the Express route (server/routes.ts) and the Vercel function
// (api/preorder.ts), so it uses relative imports only.
import { book, preorderSchema, type Preorder } from "../shared/book";
import { buildNotificationHtml, deliver, emailSignature, escapeHtml, renderEmailLayout, SITE_URL, textSignature } from "./email";

export function buildPreorderEmail(order: Preorder) {
  const details: [string, string][] = [
    ["Title", `${book.title}: ${book.subtitle}`],
    ["Author", book.author],
    ["Format", order.format],
    ["Quantity", String(order.quantity)],
    ["Release", book.releaseLabel],
  ];

  const detailRows = details
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:12px 20px;font-size:13px;color:#71717a;width:110px;${i < details.length - 1 ? "border-bottom:1px solid #ececec;" : ""}">${label}</td>
          <td style="padding:12px 20px;font-size:14px;font-weight:600;color:#1a1a1a;${i < details.length - 1 ? "border-bottom:1px solid #ececec;" : ""}">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const body = `
            <tr>
              <td style="padding:40px 40px 8px;">
                <p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;">Dear ${escapeHtml(order.firstName)},</p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#333333;">
                  Thank you for pre-ordering <em>${escapeHtml(book.title)}</em>. I am delighted to confirm that your place on the pre-order list has been reserved. The details of your reservation are below.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 40px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ececec;border-radius:6px;border-collapse:separate;">
                  ${detailRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 8px;">
                <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#1a1a1a;">What happens next</p>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.65;color:#333333;">
                  No payment has been taken. As the release approaches, you will receive a personal invitation to complete your purchase, together with any pre-order benefits, before the book is made generally available.
                </p>
                <p style="margin:0 0 32px;font-size:14px;line-height:1.65;color:#333333;">
                  Should you need to change your reservation, or wish to discuss a bulk order for your team, please reply to this email. Thank you once again for your support.
                </p>
                ${emailSignature}
              </td>
            </tr>`;

  const text = [
    `Dear ${order.firstName},`,
    "",
    `Thank you for pre-ordering ${book.title}. I am delighted to confirm that your place on the pre-order list has been reserved. The details of your reservation are below.`,
    "",
    ...details.map(([k, v]) => `${k}: ${v}`),
    "",
    "WHAT HAPPENS NEXT",
    "No payment has been taken. As the release approaches, you will receive a personal invitation to complete your purchase, together with any pre-order benefits, before the book is made generally available.",
    "",
    "Should you need to change your reservation, or wish to discuss a bulk order for your team, please reply to this email. Thank you once again for your support.",
    "",
    ...textSignature,
    "",
    `You are receiving this email because you pre-ordered a book at ${SITE_URL}.`,
  ].join("\n");

  return {
    subject: `Your pre-order is confirmed: ${book.title}`,
    html: renderEmailLayout("Pre-order confirmation", body, "You are receiving this email because you pre-ordered a book"),
    text,
  };
}

export async function handlePreorder(body: unknown): Promise<{ status: number; json: object }> {
  const parsed = preorderSchema.safeParse(body);
  if (!parsed.success) {
    return { status: 400, json: { error: parsed.error.errors[0].message } };
  }
  const order = parsed.data;

  const rows: [string, string][] = [
    ["Name", `${order.firstName} ${order.lastName}`],
    ["Email", order.email],
    ["Organization", order.organization || "—"],
    ["Role", order.role || "—"],
    ["Format", order.format],
    ["Quantity", String(order.quantity)],
    ["Submitted", new Date().toUTCString()],
  ];

  return deliver(
    "preorder",
    { to: order.email, ...buildPreorderEmail(order) },
    {
      subject: `New pre-order: ${order.firstName} ${order.lastName} (${order.quantity} × ${order.format})`,
      html: buildNotificationHtml(rows),
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    },
  );
}
