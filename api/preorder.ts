import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handlePreorder } from "../server/preorder";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { status, json } = await handlePreorder(req.body);
    return res.status(status).json(json);
  } catch (error) {
    console.error("[preorder]", error);
    return res.status(500).json({ error: "Failed to submit your pre-order. Please try again." });
  }
}
