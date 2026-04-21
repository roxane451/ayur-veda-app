/**
 * Tests unitaires — doshasController
 */
import '../setup';
import { mockRequest, mockResponse } from '../helpers';

jest.mock('../../models/Dosha');

import { Dosha } from '../../models/Dosha';
import {
  getAllDoshas,
  getDoshaById,
} from '../../controllers/doshasController';

const mockDosha = jest.mocked(Dosha);

const FAKE_DOSHAS = [
  { id: 'vata', name: 'Vata', sanskrit: 'वात', elements: 'Air + Éther' },
  { id: 'pitta', name: 'Pitta', sanskrit: 'पित्त', elements: 'Feu + Eau' },
  { id: 'kapha', name: 'Kapha', sanskrit: 'कफ', elements: 'Eau + Terre' },
];

// ── getAllDoshas ───────────────────────────────────────────────────────────
describe('doshasController — getAllDoshas', () => {
  beforeEach(() => jest.clearAllMocks());

  it('retourne la liste des 3 doshas', async () => {
    const req = mockRequest();
    const res = mockResponse();

    mockDosha.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(FAKE_DOSHAS),
    });

    await getAllDoshas(req, res);

    expect(res.json).toHaveBeenCalledWith({ doshas: FAKE_DOSHAS });
    expect(mockDosha.find).toHaveBeenCalledTimes(1);
  });

  it('retourne une liste vide si aucun dosha en base', async () => {
    const req = mockRequest();
    const res = mockResponse();

    mockDosha.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue([]),
    });

    await getAllDoshas(req, res);

    expect(res.json).toHaveBeenCalledWith({ doshas: [] });
  });

  it('retourne 500 en cas d\'erreur DB', async () => {
    const req = mockRequest();
    const res = mockResponse();

    mockDosha.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockRejectedValue(new Error('DB error')),
    });

    await getAllDoshas(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'Failed to fetch doshas' })
    );
  });
});

// ── getDoshaById ──────────────────────────────────────────────────────────
describe('doshasController — getDoshaById', () => {
  beforeEach(() => jest.clearAllMocks());

  it('retourne vata par son id', async () => {
    const req = mockRequest({ params: { id: 'vata' } });
    const res = mockResponse();

    mockDosha.findOne = jest.fn().mockResolvedValue(FAKE_DOSHAS[0]);

    await getDoshaById(req, res);

    expect(mockDosha.findOne).toHaveBeenCalledWith({ id: 'vata' });
    expect(res.json).toHaveBeenCalledWith({ dosha: FAKE_DOSHAS[0] });
  });

  it('retourne 404 si dosha introuvable', async () => {
    const req = mockRequest({ params: { id: 'inexistant' } });
    const res = mockResponse();

    mockDosha.findOne = jest.fn().mockResolvedValue(null);

    await getDoshaById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'Dosha not found' })
    );
  });

  it('retourne 500 en cas d\'erreur DB', async () => {
    const req = mockRequest({ params: { id: 'vata' } });
    const res = mockResponse();

    mockDosha.findOne = jest.fn().mockRejectedValue(new Error('DB crash'));

    await getDoshaById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it.each(['vata', 'pitta', 'kapha'])(
    'retourne le dosha "%s" correctement',
    async (doshaId) => {
      const fakeDosha = FAKE_DOSHAS.find((d) => d.id === doshaId);
      const req = mockRequest({ params: { id: doshaId } });
      const res = mockResponse();

      mockDosha.findOne = jest.fn().mockResolvedValue(fakeDosha);

      await getDoshaById(req, res);

      expect(res.json).toHaveBeenCalledWith({ dosha: fakeDosha });
    }
  );
});
