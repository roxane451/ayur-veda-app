import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';

/**
 * Crée un mock de Request Express.
 * Utilise un cast forcé car nous n'avons pas besoin de tous les champs
 * dans les tests unitaires des controllers.
 */
export function mockRequest(overrides: Partial<AuthRequest> = {}): AuthRequest {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    ...overrides,
  } as AuthRequest;
}

/**
 * Crée un mock de Response Express avec des spies Jest.
 */
export function mockResponse(): Response {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}
