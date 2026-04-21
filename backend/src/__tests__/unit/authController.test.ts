/**
 * Tests unitaires — authController
 *
 * On mock Mongoose (User) et jwt pour rester en pur unitaire :
 * pas de connexion DB, pas de réseau.
 */
import '../setup';
import { mockRequest, mockResponse } from '../helpers';

// ── Mocks déclarés AVANT l'import des modules testés ──────────────────────
jest.mock('../../models/User');
jest.mock('../../utils/jwt');

import { User } from '../../models/User';
import { generateToken } from '../../utils/jwt';
import {
  register,
  login,
  getProfile,
} from '../../controllers/authController';

const mockUser = jest.mocked(User);
const mockGenerateToken = jest.mocked(generateToken);

// Helpers pour les instances user fictives
const buildFakeUser = (overrides: Record<string, unknown> = {}) => ({
  _id: 'user_id_123',
  email: 'test@example.com',
  firstName: 'Alice',
  lastName: 'Test',
  password: 'hashed_password',
  save: jest.fn().mockResolvedValue(undefined),
  comparePassword: jest.fn().mockResolvedValue(true),
  ...overrides,
});

// ── register ──────────────────────────────────────────────────────────────
describe('authController — register', () => {
  beforeEach(() => jest.clearAllMocks());

  it('retourne 400 si email manquant', async () => {
    const req = mockRequest({ body: { password: 'motdepasse123A' } });
    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.any(String) })
    );
  });

  it('retourne 400 si password manquant', async () => {
    const req = mockRequest({ body: { email: 'test@example.com' } });
    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('retourne 400 si utilisateur existe déjà', async () => {
    const req = mockRequest({
      body: { email: 'test@example.com', password: 'Motdepasse123!' },
    });
    const res = mockResponse();

    // Simule un user existant en base
    mockUser.findOne = jest.fn().mockResolvedValue(buildFakeUser());

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'User already exists' })
    );
  });

  it('crée un utilisateur et retourne 201 + token', async () => {
    const req = mockRequest({
      body: {
        email: 'nouveau@example.com',
        password: 'Motdepasse123!',
        firstName: 'Bob',
        lastName: 'Dupont',
      },
    });
    const res = mockResponse();
    const fakeUser = buildFakeUser({ email: 'nouveau@example.com' });

    mockUser.findOne = jest.fn().mockResolvedValue(null);
    // @ts-expect-error — mock du constructeur
    mockUser.mockImplementation(() => fakeUser);
    mockGenerateToken.mockReturnValue('fake_jwt_token');

    await register(req, res);

    expect(fakeUser.save).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ token: 'fake_jwt_token' })
    );
  });

  it('retourne 500 en cas d\'erreur inattendue', async () => {
    const req = mockRequest({
      body: { email: 'test@example.com', password: 'Motdepasse123!' },
    });
    const res = mockResponse();

    mockUser.findOne = jest.fn().mockRejectedValue(new Error('DB error'));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// ── login ─────────────────────────────────────────────────────────────────
describe('authController — login', () => {
  beforeEach(() => jest.clearAllMocks());

  it('retourne 400 si email ou password manquant', async () => {
    const req = mockRequest({ body: { email: 'test@example.com' } });
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('retourne 401 si utilisateur introuvable', async () => {
    const req = mockRequest({
      body: { email: 'inconnu@example.com', password: 'mdp' },
    });
    const res = mockResponse();

    mockUser.findOne = jest.fn().mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'Invalid credentials' })
    );
  });

  it('retourne 401 si mot de passe incorrect', async () => {
    const req = mockRequest({
      body: { email: 'test@example.com', password: 'mauvais' },
    });
    const res = mockResponse();
    const fakeUser = buildFakeUser({
      comparePassword: jest.fn().mockResolvedValue(false),
    });

    mockUser.findOne = jest.fn().mockResolvedValue(fakeUser);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('retourne 200 + token si credentials valides', async () => {
    const req = mockRequest({
      body: { email: 'test@example.com', password: 'Correct123!' },
    });
    const res = mockResponse();
    const fakeUser = buildFakeUser();

    mockUser.findOne = jest.fn().mockResolvedValue(fakeUser);
    mockGenerateToken.mockReturnValue('valid_jwt_token');

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ token: 'valid_jwt_token' })
    );
    expect(res.status).not.toHaveBeenCalledWith(401);
  });

  it('retourne 500 en cas d\'erreur inattendue', async () => {
    const req = mockRequest({
      body: { email: 'test@example.com', password: 'mdp' },
    });
    const res = mockResponse();

    mockUser.findOne = jest.fn().mockRejectedValue(new Error('DB crash'));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// ── getProfile ────────────────────────────────────────────────────────────
describe('authController — getProfile', () => {
  beforeEach(() => jest.clearAllMocks());

  it('retourne 404 si user introuvable', async () => {
    const req = mockRequest({ userId: 'non_existent_id' });
    const res = mockResponse();

    mockUser.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    await getProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('retourne le profil utilisateur sans password', async () => {
    const req = mockRequest({ userId: 'user_id_123' });
    const res = mockResponse();
    const fakeUser = buildFakeUser();

    mockUser.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(fakeUser),
    });

    await getProfile(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ user: fakeUser })
    );
  });

  it('retourne 500 en cas d\'erreur inattendue', async () => {
    const req = mockRequest({ userId: 'user_id_123' });
    const res = mockResponse();

    mockUser.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error('DB error')),
    });

    await getProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
