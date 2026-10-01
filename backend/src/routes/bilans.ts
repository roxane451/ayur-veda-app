import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { validateBody, bilanSchema } from "../middleware/validation";
import { deleteBilans, getBilans, saveBilan } from "../controllers/bilanController";

const router = Router();

/**
 * @openapi
 * /api/bilans:
 *   get:
 *     tags: [Bilans]
 *     summary: Nature et historique des états du moment de la personne connectée
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: "{ nature, etats }" }
 *       401: { description: Token manquant ou invalide }
 *   post:
 *     tags: [Bilans]
 *     summary: Enregistrer un bilan (nature ou état du moment)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       201: { description: Bilan enregistré }
 *       400: { description: Données invalides }
 *   delete:
 *     tags: [Bilans]
 *     summary: Effacer tous les bilans de la personne connectée
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Nombre de bilans effacés }
 */
router.get("/", authMiddleware, getBilans);
router.post("/", authMiddleware, validateBody(bilanSchema), saveBilan);
router.delete("/", authMiddleware, deleteBilans);

export default router;
