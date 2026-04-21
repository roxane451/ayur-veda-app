import { Router } from "express";
import {
  getAllSpices,
  getSpiceById,
  searchSpices,
} from "../controllers/spicesController";
import {
  validateQuery,
  spicesQuerySchema,
  searchQuerySchema,
} from "../middleware/validation";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     DoshaEffect:
 *       type: object
 *       properties:
 *         vata:  { type: string, example: "↓ Équilibre" }
 *         pitta: { type: string, example: "↑ Aggrave" }
 *         kapha: { type: string, example: "↓ Réduit" }
 *
 *     Spice:
 *       type: object
 *       properties:
 *         _id:       { type: string }
 *         name:      { type: string, example: "Curcuma" }
 *         sanskrit:  { type: string, example: "Haridra" }
 *         type:
 *           type: string
 *           enum: [épice, plante]
 *         nature:
 *           type: string
 *           enum: [réchauffante, rafraîchissante, neutre]
 *         taste:
 *           type: array
 *           items: { type: string }
 *           example: [amer, astringent]
 *         doshaEffect:
 *           $ref: '#/components/schemas/DoshaEffect'
 *         benefits:
 *           type: array
 *           items: { type: string }
 *         uses:
 *           type: array
 *           items: { type: string }
 *         contraindications:
 *           type: array
 *           items: { type: string }
 *         category:
 *           type: array
 *           items: { type: string }
 *         description: { type: string }
 */

/**
 * @openapi
 * /api/spices:
 *   get:
 *     tags: [Épices & Plantes]
 *     summary: Lister les épices et plantes ayurvédiques
 *     description: |
 *       Retourne toutes les épices triées par nom.
 *       Supporte le filtrage par `category`, `type` et une recherche textuelle `search`
 *       (nom, sanskrit, description). La recherche est protégée contre les injections ReDoS.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *         description: Filtre par catégorie (ex. digestif, immunitaire). "all" = pas de filtre.
 *         example: digestif
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [épice, plante]
 *         description: Filtre par type. "all" = pas de filtre.
 *       - in: query
 *         name: search
 *         schema: { type: string, maxLength: 100 }
 *         description: Recherche textuelle sur nom, sanskrit et description.
 *         example: curcuma
 *     responses:
 *       200:
 *         description: Liste des épices filtrée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 spices:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Spice'
 *       400:
 *         description: Paramètres de filtre invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 */
router.get("/", validateQuery(spicesQuerySchema), getAllSpices);

/**
 * @openapi
 * /api/spices/search:
 *   get:
 *     tags: [Épices & Plantes]
 *     summary: Recherche rapide par nom ou sanskrit
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string, minLength: 1, maxLength: 100 }
 *         description: Terme de recherche (nom ou nom sanskrit)
 *         example: ashwa
 *     responses:
 *       200:
 *         description: Résultats correspondants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 spices:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Spice'
 *       400:
 *         description: Paramètre q manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 */
router.get("/search", validateQuery(searchQuerySchema), searchSpices);

/**
 * @openapi
 * /api/spices/{id}:
 *   get:
 *     tags: [Épices & Plantes]
 *     summary: Récupérer une épice par son identifiant MongoDB
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ObjectId MongoDB de l'épice
 *         example: 64f1a2b3c4d5e6f7a8b9c0d2
 *     responses:
 *       200:
 *         description: Détail de l'épice
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 spice:
 *                   $ref: '#/components/schemas/Spice'
 *       404:
 *         description: Épice introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", getSpiceById);

export default router;
