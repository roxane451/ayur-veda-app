/**
 * Tests d'intégration — routes /api/bilans (base Mongo en mémoire, comme pour /api/auth).
 */
import '../setup';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';

jest.mock('../../config/database', () => ({
  connectDB: jest.fn().mockResolvedValue(undefined),
  disconnectDB: jest.fn().mockResolvedValue(undefined),
}));

import express from 'express';
import authRoutes from '../../routes/auth';
import bilanRoutes from '../../routes/bilans';

const buildTestApp = () => {
  const app = express();
  app.use(express.json({ limit: '100kb' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/bilans', bilanRoutes);
  return app;
};

let mongoServer: MongoMemoryServer;
const app = buildTestApp();

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const inscrire = async (email: string) => {
  const res = await request(app).post('/api/auth/register').send({ email, password: 'MotDePasse2026' });
  return res.body.token as string;
};

describe('/api/bilans', () => {
  it('refuse sans connexion', async () => {
    const res = await request(app).get('/api/bilans');
    expect(res.status).toBe(401);
  });

  it('enregistre la nature puis les états, et les relit dans l’ordre', async () => {
    const token = await inscrire('bilans@example.com');
    const auth = { Authorization: `Bearer ${token}` };
    await request(app).post('/api/bilans').set(auth).send({ type: 'nature', scores: { vata: 30, pitta: 15, kapha: 5 } }).expect(201);
    await request(app)
      .post('/api/bilans')
      .set(auth)
      .send({ type: 'etat', scores: { vata: 3, pitta: 6, kapha: 1 }, date: '2026-03-01T10:00:00.000Z' })
      .expect(201);
    await request(app).post('/api/bilans').set(auth).send({ type: 'etat', scores: { vata: 9, pitta: 2, kapha: 1 } }).expect(201);

    const res = await request(app).get('/api/bilans').set(auth).expect(200);
    expect(res.body.nature.scores).toEqual({ vata: 30, pitta: 15, kapha: 5 });
    expect(res.body.etats).toHaveLength(2);
    expect(res.body.etats[0].scores.pitta).toBe(6);
  });

  it('ne montre jamais les bilans d’une autre personne, et efface seulement les siens', async () => {
    const a = await inscrire('a@example.com');
    const b = await inscrire('b@example.com');
    await request(app).post('/api/bilans').set({ Authorization: `Bearer ${a}` }).send({ type: 'nature', scores: { vata: 1, pitta: 1, kapha: 1 } });
    const vuParB = await request(app).get('/api/bilans').set({ Authorization: `Bearer ${b}` });
    expect(vuParB.body.nature).toBeNull();
    await request(app).delete('/api/bilans').set({ Authorization: `Bearer ${b}` }).expect(200);
    const vuParA = await request(app).get('/api/bilans').set({ Authorization: `Bearer ${a}` });
    expect(vuParA.body.nature).not.toBeNull();
  });

  it('refuse des données invalides', async () => {
    const token = await inscrire('invalide@example.com');
    const res = await request(app).post('/api/bilans').set({ Authorization: `Bearer ${token}` }).send({ type: 'nature', scores: { vata: 'beaucoup' } });
    expect(res.status).toBe(400);
  });
});
