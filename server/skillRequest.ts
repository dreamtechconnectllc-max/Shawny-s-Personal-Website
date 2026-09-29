// Shared by the Express route (server/routes.ts) and the Vercel function
// (api/skill-request.ts), so it uses relative imports only.
import { readFile } from "fs/promises";
import path from "path";
import { skills, skillRequestSchema, type Skill, type SkillRequest } from "../shared/skills";
import { buildNotificationHtml, deliver, emailSignature, escapeHtml, renderEmailLayout, SITE_URL, textSignature } from "./email";

const SKILLS_DIR = path.join(process.cwd(), "skills");

export function buildDeliveryEmail(request: SkillRequest, selected: readonly Skill[]) {
  const name = escapeHtml(request.firstName);
  const plural = selected.length > 1;

  const skillRows = selected
    .map(
      (skill) => `
        <tr>
          <td style="padding:16px 20px;border-bottom:1px solid #ececec;">
            <p style="margin:0 0 4px;font-size:15px;font-weight:600;color:#1a1a1a;">${escapeHtml(skill.title)}</p>
            <p style="margin:0 0 6px;font-size:13px;line-height:1.55;color:#5c5c5c;">${escapeHtml(skill.description)}</p>
            <p style="margin:0;font-size:12px;color:#8a8a8a;font-family:'SFMono-Regular',Consolas,monospace;">Attached: ${escapeHtml(skill.fileName)}</p>
          </td>
        </tr>`,
    )
    .join("");

  const body = `
            <tr>
              <td style="padding:40px 40px 8px;">
                <p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;">Dear ${name},</p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#333333;">
                  Thank you for your interest in my work. As requested, the following Skill.md ${plural ? "files are" : "file is"} attached to this email for your use.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 40px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ececec;border-radius:6px;border-collapse:separate;">
                  ${skillRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 8px;">
                <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#1a1a1a;">Getting started</p>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.65;color:#333333;">
                  A Skill.md is a set of written instructions that guides an AI assistant through a specific task. Save the attached ${plural ? "files" : "file"} and add ${plural ? "them" : "it"} to your AI tool&rsquo;s skills or project instructions, then ask the assistant to use ${plural ? "them" : "it"}.
                </p>
                <p style="margin:0 0 32px;font-size:14px;line-height:1.65;color:#333333;">
                  Should you have any questions, or wish to discuss how these tools could support your organization, please reply to this email. I would be glad to hear from you.
                </p>
                ${emailSignature}
              </td>
            </tr>`;

  const text = [
    `Dear ${request.firstName},`,
    "",
    `Thank you for your interest in my work. As requested, the following Skill.md ${plural ? "files are" : "file is"} attached to this email for your use.`,
    "",
    ...selected.map((s) => `- ${s.title} (${s.fileName})\n  ${s.description}`),
    "",
    "GETTING STARTED",
    `A Skill.md is a set of written instructions that guides an AI assistant through a specific task. Save the attached ${plural ? "files" : "file"} and add ${plural ? "them" : "it"} to your AI tool's skills or project instructions, then ask the assistant to use ${plural ? "them" : "it"}.`,
    "",
    "Should you have any questions, or wish to discuss how these tools could support your organization, please reply to this email. I would be glad to hear from you.",
    "",
    ...textSignature,
    "",
    `You are receiving this email because you requested a download at ${SITE_URL}.`,
  ].join("\n");

  return {
    subject: `Your Skill.md ${plural ? "files" : "file"} from Shawny Hargrove`,
    html: renderEmailLayout(`Your Skill.md ${plural ? "files" : "file"}`, body, "You are receiving this email because you requested a download"),
    text,
  };
}

export async function handleSkillRequest(body: unknown): Promise<{ status: number; json: object }> {
  const parsed = skillRequestSchema.safeParse(body);
  if (!parsed.success) {
    return { status: 400, json: { error: parsed.error.errors[0].message } };
  }
  const request = parsed.data;
  const selected = skills.filter((s) => (request.skillIds as string[]).includes(s.id));

  const attachments = await Promise.all(
    selected.map(async (skill) => ({
      filename: skill.fileName,
      content: (await readFile(path.join(SKILLS_DIR, skill.fileName))).toString("base64"),
    })),
  );

  const rows: [string, string][] = [
    ["Name", `${request.firstName} ${request.lastName}`],
    ["Email", request.email],
    ["Organization", request.organization || "—"],
    ["Role", request.role || "—"],
    ["Skills", selected.map((s) => s.title).join(", ")],
    ["Submitted", new Date().toUTCString()],
  ];

  return deliver(
    "skill-request",
    { to: request.email, ...buildDeliveryEmail(request, selected), attachments },
    {
      subject: `New Skill.md request: ${request.firstName} ${request.lastName}`,
      html: buildNotificationHtml(rows),
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    },
  );
}
