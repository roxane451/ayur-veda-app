import { logger } from "../utils/logger";
import { Request, Response } from "express";
import { Spice } from "../models/Spice";

// ─── Helper : échappe les caractères spéciaux regex pour éviter le ReDoS ────
// Sans ça, un input comme "(a+)+" dans $regex peut bloquer le thread Node.js.
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Typage plus précis pour les query params
interface SpiceQueryParams {
  category?: string;
  type?: string;
  search?: string;
  q?: string;
}

export const getAllSpices = async (
  req: Request<{}, {}, {}, SpiceQueryParams>,
  res: Response,
) => {
  try {
    const { category, type, search } = req.query;

    const query: Record<string, any> = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (type && type !== "all") {
      query.type = type;
    }

    if (search) {
      // FIX : échappement avant injection dans $regex (protection ReDoS)
      const safeSearch = escapeRegex(search.slice(0, 100));
      query.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { sanskrit: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const spices = await Spice.find(query).sort({ name: 1 }).lean(); // plus rapide si on n’a pas besoin des méthodes Mongoose

    logger.debug({ count: spices.length }, "Spices fetched");

    res.json({ spices });
  } catch (error: unknown) {
    logger.error({ err: error }, "Failed to fetch spices");
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    res.status(500).json({ error: "Failed to fetch spices" });
  }
};

export const getSpiceById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const spice = await Spice.findById(req.params.id).lean();

    if (!spice) {
      return res.status(404).json({ error: "Spice not found" });
    }

    res.json({ spice });
  } catch (error: unknown) {
    logger.error({ err: error }, "Failed to fetch spice by id");
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    res.status(500).json({ error: "Failed to fetch spice" });
  }
};

export const searchSpices = async (
  req: Request<{}, {}, {}, SpiceQueryParams>,
  res: Response,
) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res
        .status(400)
        .json({ error: "Search query (q) is required and must be a string" });
    }

    // FIX : échappement avant injection dans $regex (protection ReDoS)
    const safeQ = escapeRegex(q.slice(0, 100));
    const query = {
      $or: [
        { name: { $regex: safeQ, $options: "i" } },
        { sanskrit: { $regex: safeQ, $options: "i" } },
      ],
    };

    const spices = await Spice.find(query).sort({ name: 1 }).lean();

    logger.debug({ count: spices.length }, "Spices search results");

    res.json({ spices });
  } catch (error: unknown) {
    logger.error({ err: error }, "Failed to search spices");
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    res.status(500).json({ error: "Failed to search spices" });
  }
};
