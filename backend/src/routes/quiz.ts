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

// FIX : validation Zod sur la création — limite answers à 50, types stricts
router.post(
  "/results",
  authMiddleware,
  validateBody(quizResultSchema),
  saveQuizResult,
);
router.get("/results", authMiddleware, getUserQuizResults);
router.get("/results/:id", authMiddleware, getQuizResult);
router.delete("/results/:id", authMiddleware, deleteQuizResult);

export default router;
