/**
 * Tests unitaires — middleware/auth
 */
import '../setup';
import { mockRequest, mockResponse } from '../helpers';
import { NextFunction } from 'express';
import { generateToken } from '../../utils/jwt';
import { authMiddleware } from '../../middleware/auth';

const mockNext = (): NextFunction => jest.fn() as unknown as NextFunction;

describe('middleware — authMiddleware', () => {
  it('retourne 401 si aucun header Authorization', async () => {
    const req = mockRequest({ headers: {} });
    const res = mockResponse();
    const next = mockNext();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('retourne 401 si token invalide', () => {
    const req = mockRequest({
      headers: { authorization: 'Bearer token.invalide.ici' },
    });
    const res = mockResponse();
    const next = mockNext();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('appelle next() et attache userId si token valide', () => {
    const userId = 'user_middleware_test';
    const token = generateToken(userId);

    const req = mockRequest({
      headers: { authorization: `Bearer ${token}` },
    });
    const res = mockResponse();
    const next = mockNext();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.userId).toBe(userId);
  });

  it('retourne 401 si le format n\'est pas "Bearer <token>"', () => {
    const req = mockRequest({
      headers: { authorization: 'Basic dXNlcjpwYXNz' },
    });
    const res = mockResponse();
    const next = mockNext();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
