/**
 * Tests d'intégration — routes /api/auth
 *
 * Utilise mongodb-memory-server pour une vraie DB en mémoire :
 * pas de mock Mongoose, les controllers tournent pour de vrai.
 * Supertest monte l'app Express sans bind sur un port réseau.
 */
import '../setup';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';

// ── App Express isolée (sans le startServer qui connecte à la vraie DB) ──
// On importe directement le module app.ts après avoir patché la DB
jest.mock('../../config/database', () => ({
  connectDB: jest.fn().mockResolvedValue(undefined),
  disconnectDB: jest.fn().mockResolvedValue(undefined),
}));

// app.ts déclenche startServer() via IIFE — on doit l'isoler.
// On reconstruit l'app sans l'IIFE de démarrage en important uniquement
// ce qui est nécessaire pour supertest.
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { globalLimiter } from '../../middleware/rateLimiter';
import authRoutes from '../../routes/auth';

const buildTestApp = () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '100kb' }));
  app.use(globalLimiter);
  app.use('/api/auth', authRoutes);
  return app;
};

// ── Setup DB en mémoire ───────────────────────────────────────────────────
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Nettoie toutes les collections entre les tests
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// ── Tests ─────────────────────────────────────────────────────────────────
describe('Integration — POST /api/auth/register', () => {
  const app = buildTestApp();

  const validPayload = {
    email: 'alice@example.com',
    password: 'MotDePasse123!',
    firstName: 'Alice',
    lastName: 'Dupont',
  };

  it('crée un utilisateur et retourne 201 + token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(validPayload)
      .expect(201);

    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toMatchObject({
      email: 'alice@example.com',
      firstName: 'Alice',
    });
    // Le password ne doit jamais être exposé
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('retourne 400 si l\'utilisateur existe déjà', async () => {
    await request(app).post('/api/auth/register').send(validPayload);
    const res = await request(app)
      .post('/api/auth/register')
      .send(validPayload)
      .expect(400);

    expect(res.body.error).toMatch(/already exists/i);
  });

  it('retourne 400 si email invalide', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ ...validPayload, email: 'pas-un-email' })
      .expect(400);
  });

  it('retourne 400 si password trop court', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ ...validPayload, password: 'court' })
      .expect(400);
  });
});

describe('Integration — POST /api/auth/login', () => {
  const app = buildTestApp();

  beforeEach(async () => {
    // Crée un user de test avant chaque test de login
    await request(app).post('/api/auth/register').send({
      email: 'login@example.com',
      password: 'MotDePasse123!',
    });
  });

  it('retourne 200 + token avec credentials valides', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@example.com', password: 'MotDePasse123!' })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('login@example.com');
  });

  it('retourne 401 avec mauvais password', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@example.com', password: 'mauvaismdp' })
      .expect(401);
  });

  it('retourne 401 avec email inconnu', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({ email: 'inconnu@example.com', password: 'MotDePasse123!' })
      .expect(401);
  });
});

describe('Integration — GET /api/auth/profile', () => {
  const app = buildTestApp();
  let authToken: string;

  beforeEach(async () => {
    // Register + login pour obtenir un token valide
    await request(app).post('/api/auth/register').send({
      email: 'profile@example.com',
      password: 'MotDePasse123!',
      firstName: 'Profil',
    });
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'profile@example.com',
      password: 'MotDePasse123!',
    });
    authToken = loginRes.body.token;
  });

  it('retourne le profil avec un token valide', async () => {
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(res.body.user.email).toBe('profile@example.com');
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('retourne 401 sans token', async () => {
    await request(app).get('/api/auth/profile').expect(401);
  });

  it('retourne 401 avec token invalide', async () => {
    await request(app)
      .get('/api/auth/profile')
      .set('Authorization', 'Bearer token.faux.ici')
      .expect(401);
  });
});
