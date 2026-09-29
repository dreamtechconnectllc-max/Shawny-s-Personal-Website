import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

const insertWaitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  product: z.string(),
  wantsDiscount: z.string().optional().default("no"),
});

const entries = new Map<string, object>();

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = insertWaitlistSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const key = `${parsed.data.email}:${parsed.data.product}`;
  if (entries.has(key)) {
    return res.status(400).json({ error: "You're already on the waitlist for this product!" });
  }

  const entry = { ...parsed.data, id: crypto.randomUUID() };
  entries.set(key, entry);
  return res.json({ success: true, entry });
}
