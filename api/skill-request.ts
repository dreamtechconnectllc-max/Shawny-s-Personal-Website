import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleSkillRequest } from "../server/skillRequest";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { status, json } = await handleSkillRequest(req.body);
    return res.status(status).json(json);
  } catch (error) {
    console.error("[skill-request]", error);
    return res.status(500).json({ error: "Failed to send your skill. Please try again." });
  }
}
