import { Router } from "express";
import {
  getAllRitucharya,
  getRitucharyaBySeason,
} from "../controllers/ritucharyaController";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     RitucharyaPlant:
 *       type: object
 *       properties:
 *         name:    { type: string, example: "Ashwagandha" }
 *         benefit: { type: string, example: "Adaptogène, réduit le stress hivernal" }
 *
 *     RitucharyaRituals:
 *       type: object
 *       properties:
 *         morning: { type: array, items: { type: string } }
 *         day:     { type: array, items: { type: string } }
 *         evening: { type: array, items: { type: string } }
 *
 *     Ritucharya:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identifiant de la saison
 *           example: hemanta
 *         name:
 *           type: string
 *           example: "Hémanta (Hiver)"
 *         period:
 *           type: string
 *           example: "Novembre – Janvier"
 *         dosha:
 *           type: string
 *           example: "Vata–Kapha"
 *         elements:
 *           type: string
 *           example: "Terre + Eau"
 *         qualities:
 *           type: string
 *           example: "Lourd, froid, huileux"
 *         challenges:
 *           type: string
 *           example: "Froid, sécheresse, baisse d'énergie"
 *         foodsGood:
 *           type: array
 *           items: { type: string }
 *         foodsBad:
 *           type: array
 *           items: { type: string }
 *         rituals:
 *           $ref: '#/components/schemas/RitucharyaRituals'
 *         plants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RitucharyaPlant'
 */

/**
 * @openapi
 * /api/ritucharya:
 *   get:
 *     tags: [Ritucharya]
 *     summary: Lister toutes les saisons ayurvédiques
 *     description: |
 *       Retourne les 6 saisons du calendrier ayurvédique (Ritucharya) triées par id.
 *       Chaque saison inclut ses rituels quotidiens, aliments recommandés/déconseillés
 *       et plantes associées.
 *     responses:
 *       200:
 *         description: Liste des saisons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ritucharyas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ritucharya'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getAllRitucharya);

/**
 * @openapi
 * /api/ritucharya/{season}:
 *   get:
 *     tags: [Ritucharya]
 *     summary: Récupérer une saison par son identifiant
 *     parameters:
 *       - in: path
 *         name: season
 *         required: true
 *         schema:
 *           type: string
 *           enum: [vasanta, grishma, varsha, sharad, hemanta, shishira]
 *         description: |
 *           Identifiant sanskrit de la saison :
 *           vasanta (Printemps), grishma (Été), varsha (Mousson),
 *           sharad (Automne), hemanta (Hiver), shishira (Hiver tardif)
 *         example: vasanta
 *     responses:
 *       200:
 *         description: Détail complet de la saison
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ritucharya:
 *                   $ref: '#/components/schemas/Ritucharya'
 *       404:
 *         description: Saison introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:season", getRitucharyaBySeason);

export default router;
