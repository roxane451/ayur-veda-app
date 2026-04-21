import { Router } from "express";
import { getAllDoshas, getDoshaById } from "../controllers/doshasController";

const router = Router();

/**
 * @openapi
 * /api/doshas:
 *   get:
 *     tags: [Doshas]
 *     summary: Récupérer les 3 doshas (Vata, Pitta, Kapha)
 *     responses:
 *       200:
 *         description: Liste des doshas triée par id alphabétique
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doshas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dosha'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getAllDoshas);

/**
 * @openapi
 * /api/doshas/{id}:
 *   get:
 *     tags: [Doshas]
 *     summary: Récupérer un dosha par son identifiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           enum: [vata, pitta, kapha]
 *         description: Identifiant du dosha
 *         example: vata
 *     responses:
 *       200:
 *         description: Détail complet du dosha
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dosha:
 *                   $ref: '#/components/schemas/Dosha'
 *       404:
 *         description: Dosha introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", getDoshaById);

export default router;
