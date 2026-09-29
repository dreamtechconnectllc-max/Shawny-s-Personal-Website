import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { handleSkillRequest } from "./skillRequest";
import { handlePreorder } from "./preorder";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const parsed = insertWaitlistSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors[0].message });
      }

      const existing = await storage.getWaitlistByEmail(parsed.data.email, parsed.data.product);
      if (existing) {
        return res.status(400).json({ error: "You're already on the waitlist for this product!" });
      }

      const entry = await storage.addToWaitlist(parsed.data);
      return res.json({ success: true, entry });
    } catch (error) {
      return res.status(500).json({ error: "Failed to join waitlist" });
    }
  });

  app.post("/api/skill-request", async (req, res) => {
    try {
      const { status, json } = await handleSkillRequest(req.body);
      return res.status(status).json(json);
    } catch (error) {
      console.error("[skill-request]", error);
      return res.status(500).json({ error: "Failed to send your skill. Please try again." });
    }
  });

  app.post("/api/preorder", async (req, res) => {
    try {
      const { status, json } = await handlePreorder(req.body);
      return res.status(status).json(json);
    } catch (error) {
      console.error("[preorder]", error);
      return res.status(500).json({ error: "Failed to submit your pre-order. Please try again." });
    }
  });

  return httpServer;
}
