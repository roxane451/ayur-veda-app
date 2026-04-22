/**
 * Tests unitaires — middleware/validation
 *
 * On teste les schémas Zod et le middleware validateBody
 * sans démarrer de serveur ni connexion DB.
 */
import '../setup';
import { mockRequest, mockResponse } from '../helpers';
import { NextFunction } from 'express';
import {
  validateBody,
  registerSchema,
  loginSchema,
} from '../../middleware/validation';

// Helper : simule next() en vérifiant qu'il est (ou n'est pas) appelé
const mockNext = (): NextFunction => jest.fn() as unknown as NextFunction;

// ── registerSchema ────────────────────────────────────────────────────────
describe('validation — registerSchema', () => {
  it('accepte un body valide complet', () => {
    const result = registerSchema.safeParse({
      email: 'alice@example.com',
      password: 'MotDePasse123!',
      firstName: 'Alice',
      lastName: 'Test',
    });
    expect(result.success).toBe(true);
  });

  it('accepte sans firstName/lastName (optionnels)', () => {
    const result = registerSchema.safeParse({
      email: 'bob@example.com',
      password: 'MotDePasse123!',
    });
    expect(result.success).toBe(true);
  });

  it('rejette un email invalide', () => {
    const result = registerSchema.safeParse({
      email: 'pas-un-email',
      password: 'MotDePasse123!',
    });
    expect(result.success).toBe(false);
  });

  it('rejette un password trop court (< 12 chars)', () => {
    const result = registerSchema.safeParse({
      email: 'test@example.com',
      password: 'court',
    });
    expect(result.success).toBe(false);
  });

  it('rejette un password sans majuscule ni chiffre', () => {
    const result = registerSchema.safeParse({
      email: 'test@example.com',
      password: 'sansmaajusculenichiffre!',
    });
    expect(result.success).toBe(false);
  });

  it('accepte un password avec chiffre seulement (pas de majuscule requise)', () => {
    const result = registerSchema.safeParse({
      email: 'test@example.com',
      password: 'motdepasse12345',
    });
    expect(result.success).toBe(true);
  });
});

// ── loginSchema ───────────────────────────────────────────────────────────
describe('validation — loginSchema', () => {
  it('accepte des credentials valides', () => {
    const result = loginSchema.safeParse({
      email: 'alice@example.com',
      password: 'mdp',
    });
    expect(result.success).toBe(true);
  });

  it('rejette sans email', () => {
    const result = loginSchema.safeParse({ password: 'mdp' });
    expect(result.success).toBe(false);
  });

  it('rejette un password vide', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '',
    });
    expect(result.success).toBe(false);
  });
});

// ── validateBody middleware ───────────────────────────────────────────────
describe('validateBody middleware', () => {
  it('appelle next() si le body est valide', () => {
    const req = mockRequest({
      body: { email: 'valid@example.com', password: 'MotDePasse123!' },
    });
    const res = mockResponse();
    const next = mockNext();

    validateBody(registerSchema)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('retourne 400 et ne call pas next() si body invalide', () => {
    const req = mockRequest({ body: { email: 'pas-un-email' } });
    const res = mockResponse();
    const next = mockNext();

    validateBody(registerSchema)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it('inclut le détail des erreurs dans la réponse 400', () => {
    const req = mockRequest({ body: { email: 'mauvais', password: 'court' } });
    const res = mockResponse();
    const next = mockNext();

    validateBody(registerSchema)(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String),
        details: expect.arrayContaining([
          expect.objectContaining({ field: expect.any(String) }),
        ]),
      })
    );
  });

  it('assainit le body (req.body = données parsées)', () => {
    const req = mockRequest({
      body: {
        email: 'roxane451@gmail.com', // Zod normalise via .email()
        password: 'MotDePasse123!',
        fieldInconnu: 'devrait être stripé',
      },
    });
    const res = mockResponse();
    const next = mockNext();

    validateBody(registerSchema)(req, res, next);

    // Zod strip les champs inconnus par défaut
    expect(req.body).not.toHaveProperty('fieldInconnu');
    expect(next).toHaveBeenCalled();
  });
});
