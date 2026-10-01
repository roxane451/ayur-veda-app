import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Bilan } from "../models/Bilan";

/** Nombre maximum de points de saison renvoyés (une dizaine d'années). */
const MAX_ETATS = 40;

const format = (b: { _id: unknown; type: string; scores: unknown; date: Date }) => ({
  id: String(b._id),
  type: b.type,
  scores: b.scores,
  date: b.date,
});

/** GET /api/bilans : la nature la plus récente et l'historique des états, du plus ancien au plus récent. */
export const getBilans = async (req: AuthRequest, res: Response) => {
  try {
    const [nature, etats] = await Promise.all([
      Bilan.findOne({ userId: req.userId, type: "nature" }).sort({ date: -1 }).lean(),
      Bilan.find({ userId: req.userId, type: "etat" }).sort({ date: -1 }).limit(MAX_ETATS).lean(),
    ]);
    res.json({
      nature: nature ? format(nature) : null,
      etats: etats.reverse().map(format),
    });
  } catch {
    res.status(500).json({ error: "Impossible de lire les bilans" });
  }
};

/** POST /api/bilans : enregistre un bilan (nature ou état du moment). */
export const saveBilan = async (req: AuthRequest, res: Response) => {
  try {
    const { type, scores, date } = req.body;
    // Une date passée seulement : on n'enregistre pas de bilan dans l'avenir.
    const d = date ? new Date(date) : new Date();
    const bilan = new Bilan({ userId: req.userId, type, scores, date: d.getTime() <= Date.now() ? d : new Date() });
    await bilan.save();
    res.status(201).json({ bilan: format(bilan) });
  } catch {
    res.status(500).json({ error: "Impossible d'enregistrer le bilan" });
  }
};

/** DELETE /api/bilans : efface tous les bilans de la personne (« tout effacer et recommencer »). */
export const deleteBilans = async (req: AuthRequest, res: Response) => {
  try {
    const { deletedCount } = await Bilan.deleteMany({ userId: req.userId });
    res.json({ deleted: deletedCount });
  } catch {
    res.status(500).json({ error: "Impossible d'effacer les bilans" });
  }
};
