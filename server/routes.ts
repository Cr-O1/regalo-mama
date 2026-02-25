import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import path from "path";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Serve the 'fotos' directory as static
  app.use("/fotos", express.static(path.resolve(import.meta.dirname, "..", "fotos")));

  app.get(api.memories.list.path, async (req, res) => {
    const memoriesList = await storage.getMemories();
    res.json(memoriesList);
  });

  return httpServer;
}
