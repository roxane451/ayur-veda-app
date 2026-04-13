import { Router } from "express";
import { register, login, getProfile } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
import { loginLimiter, registerLimiter } from "../middleware/rateLimiter";
import {
  validateBody,
  loginSchema,
  registerSchema,
} from "../middleware/validation";

const router = Router();

// FIX : rate limiting ciblé + validation Zod avant les controllers
router.post(
  "/register",
  registerLimiter,
  validateBody(registerSchema),
  register,
);
router.post("/login", loginLimiter, validateBody(loginSchema), login);
router.get("/profile", authMiddleware, getProfile);

export default router;
