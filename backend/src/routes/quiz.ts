import { Router } from "express";
import {
  saveQuizResult,
  getUserQuizResults,
  getQuizResult,
  deleteQuizResult,
} from "../controllers/quizController";
import { authMiddleware } from "../middleware/auth";
import { validateBody, quizResultSchema } from "../middleware/validation";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     QuizAnswer:
 *       type: object
 *       required: [question, selectedOption, vataScore, pittaScore, kaphaScore]
 *       properties:
 *         question:       { type: string, maxLength: 500 }
 *         selectedOption: { type: string, maxLength: 200 }
 *         vataScore:      { type: integer, minimum: 0, maximum: 10 }
 *         pittaScore:     { type: integer, minimum: 0, maximum: 10 }
 *         kaphaScore:     { type: integer, minimum: 0, maximum: 10 }
 *
 *     QuizScores:
 *       type: object
 *       properties:
 *         vata:  { type: number, minimum: 0 }
 *         pitta: { type: number, minimum: 0 }
 *         kapha: { type: number, minimum: 0 }
 *
 *     QuizProfile:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [mono, bi, tri, dominant]
 *         primary:   { type: string, example: vata }
 *         secondary: { type: string, example: pitta }
 *         label:     { type: string, example: "VATA-PITTA" }
 *
 *     QuizResult:
 *       type: object
 *       properties:
 *         _id:       { type: string }
 *         userId:    { type: string }
 *         answers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuizAnswer'
 *         scores:
 *           $ref: '#/components/schemas/QuizScores'
 *         percentages:
 *           type: object
 *           properties:
 *             vata:  { type: string, example: "45.2" }
 *             pitta: { type: string, example: "33.1" }
 *             kapha: { type: string, example: "21.7" }
 *         profile:
 *           $ref: '#/components/schemas/QuizProfile'
 *         createdAt: { type: string, format: date-time }
 *
 *     SaveQuizResultRequest:
 *       type: object
 *       required: [answers, scores, percentages, profile]
 *       properties:
 *         answers:
 *           type: array
 *           minItems: 1
 *           maxItems: 50
 *           items:
 *             $ref: '#/components/schemas/QuizAnswer'
 *         scores:
 *           $ref: '#/components/schemas/QuizScores'
 *         percentages:
 *           type: object
 *           properties:
 *             vata:  { type: string }
 *             pitta: { type: string }
 *             kapha: { type: string }
 *         profile:
 *           $ref: '#/components/schemas/QuizProfile'
 */

/**
 * @openapi
 * /api/quiz/results:
 *   post:
 *     tags: [Quiz]
 *     summary: Sauvegarder un résultat de quiz
 *     description: |
 *       Enregistre les réponses et le profil calculé pour l'utilisateur connecté.
 *       Validation Zod : 1–50 réponses, scores entiers 0–10.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveQuizResultRequest'
 *     responses:
 *       201:
 *         description: Résultat sauvegardé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 result:
 *                   $ref: '#/components/schemas/QuizResult'
 *       400:
 *         description: Données invalides (Zod)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     tags: [Quiz]
 *     summary: Lister tous les résultats de quiz de l'utilisateur connecté
 *     description: Retourne l'historique trié par date décroissante.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des résultats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/QuizResult'
 *       401:
 *         description: Token manquant ou invalide
 */
router.post(
  "/results",
  authMiddleware,
  validateBody(quizResultSchema),
  saveQuizResult,
);
router.get("/results", authMiddleware, getUserQuizResults);

/**
 * @openapi
 * /api/quiz/results/{id}:
 *   get:
 *     tags: [Quiz]
 *     summary: Récupérer un résultat de quiz spécifique
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ObjectId MongoDB du résultat
 *     responses:
 *       200:
 *         description: Détail du résultat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   $ref: '#/components/schemas/QuizResult'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Ce résultat appartient à un autre utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Résultat introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     tags: [Quiz]
 *     summary: Supprimer un résultat de quiz
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ObjectId MongoDB du résultat à supprimer
 *     responses:
 *       200:
 *         description: Résultat supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Ce résultat appartient à un autre utilisateur
 *       404:
 *         description: Résultat introuvable
 */
router.get("/results/:id", authMiddleware, getQuizResult);
router.delete("/results/:id", authMiddleware, deleteQuizResult);

export default router;
