import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

// ─── Schémas ───────────────────────────────────────────────────────────────

export const registerSchema = z.object({
  email: z
    .string({ error: "Email requis" })
    .email("Email invalide")
    .max(254, "Email trop long"),

  password: z
    .string({ error: "Mot de passe requis" })
    .min(12, "Le mot de passe doit comporter au moins 12 caractères")
    .max(128, "Mot de passe trop long")
    .refine(
      (val) => /[A-Z]/.test(val) || /[0-9]/.test(val),
      "Le mot de passe doit contenir au moins une majuscule ou un chiffre",
    ),

  firstName: z.string().max(100, "Prénom trop long").optional(),
  lastName: z.string().max(100, "Nom trop long").optional(),
});

export const loginSchema = z.object({
  email: z.string({ error: "Email requis" }).email("Email invalide"),
  password: z.string({ error: "Mot de passe requis" }).min(1),
});

const answerSchema = z.object({
  question: z.string().max(500),
  selectedOption: z.string().max(200),
  vataScore: z.number().int().min(0).max(10),
  pittaScore: z.number().int().min(0).max(10),
  kaphaScore: z.number().int().min(0).max(10),
});

export const quizResultSchema = z.object({
  answers: z
    .array(answerSchema)
    .min(1, "Au moins une réponse requise")
    .max(50, "Trop de réponses"),

  scores: z.object({
    vata: z.number().min(0),
    pitta: z.number().min(0),
    kapha: z.number().min(0),
  }),

  percentages: z.object({
    vata: z.string().max(10),
    pitta: z.string().max(10),
    kapha: z.string().max(10),
  }),

  profile: z.object({
    type: z.enum(["mono", "bi", "tri", "dominant"]),
    primary: z.string().max(50).optional(),
    secondary: z.string().max(50).optional(),
    label: z.string().max(200),
  }),
});

export const searchQuerySchema = z.object({
  q: z
    .string()
    .min(1, "La recherche ne peut pas être vide")
    .max(100, "Recherche trop longue"),
});

export const spicesQuerySchema = z.object({
  category: z.string().max(50).optional(),
  type: z.string().max(50).optional(),
  search: z.string().max(100).optional(),
});

// ─── Factory de middleware ─────────────────────────────────────────────────

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: "Données invalides",
        details: result.error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
      return;
    }
    req.body = result.data;
    next();
  };
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      res.status(400).json({
        error: "Paramètres invalides",
        details: result.error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
      return;
    }
    next();
  };
}
