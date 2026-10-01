/**
 * Tests unitaires — bilanController (Mongoose mocké, pas de base de données).
 */
import '../setup';
import { mockRequest, mockResponse } from '../helpers';

jest.mock('../../models/Bilan');

import { Bilan } from '../../models/Bilan';
import { getBilans, saveBilan, deleteBilans } from '../../controllers/bilanController';

const mockBilan = jest.mocked(Bilan);

const chaine = (valeur: unknown) => {
  const q: Record<string, jest.Mock> = {};
  q.sort = jest.fn().mockReturnValue(q);
  q.limit = jest.fn().mockReturnValue(q);
  q.lean = jest.fn().mockResolvedValue(valeur);
  return q;
};

const d1 = new Date('2026-03-01T10:00:00Z');
const d2 = new Date('2026-09-25T10:00:00Z');

beforeEach(() => jest.clearAllMocks());

describe('getBilans', () => {
  it('renvoie la nature et les états du plus ancien au plus récent', async () => {
    mockBilan.findOne.mockReturnValue(chaine({ _id: 'n1', type: 'nature', scores: { vata: 30, pitta: 15, kapha: 5 }, date: d1 }) as never);
    mockBilan.find.mockReturnValue(
      chaine([
        { _id: 'e2', type: 'etat', scores: { vata: 9, pitta: 2, kapha: 1 }, date: d2 },
        { _id: 'e1', type: 'etat', scores: { vata: 3, pitta: 6, kapha: 1 }, date: d1 },
      ]) as never,
    );
    const req = mockRequest({ userId: 'u1' });
    const res = mockResponse();
    await getBilans(req, res);
    expect(mockBilan.findOne).toHaveBeenCalledWith({ userId: 'u1', type: 'nature' });
    expect(mockBilan.find).toHaveBeenCalledWith({ userId: 'u1', type: 'etat' });
    const corps = (res.json as jest.Mock).mock.calls[0][0];
    expect(corps.nature.id).toBe('n1');
    expect(corps.etats.map((e: { id: string }) => e.id)).toEqual(['e1', 'e2']);
  });

  it('renvoie une nature vide quand rien n’est enregistré', async () => {
    mockBilan.findOne.mockReturnValue(chaine(null) as never);
    mockBilan.find.mockReturnValue(chaine([]) as never);
    const res = mockResponse();
    await getBilans(mockRequest({ userId: 'u1' }), res);
    expect(res.json).toHaveBeenCalledWith({ nature: null, etats: [] });
  });

  it('répond 500 si la base ne répond pas', async () => {
    mockBilan.findOne.mockImplementation(() => {
      throw new Error('panne');
    });
    const res = mockResponse();
    await getBilans(mockRequest({ userId: 'u1' }), res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('saveBilan', () => {
  it('enregistre un bilan pour la personne connectée', async () => {
    const save = jest.fn().mockResolvedValue(undefined);
    mockBilan.mockImplementation(((doc: Record<string, unknown>) => ({ ...doc, _id: 'b1', save })) as never);
    const res = mockResponse();
    await saveBilan(mockRequest({ userId: 'u1', body: { type: 'etat', scores: { vata: 9, pitta: 2, kapha: 1 } } }), res);
    expect(save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    const doc = (mockBilan as unknown as jest.Mock).mock.calls[0][0];
    expect(doc.userId).toBe('u1');
  });

  it('refuse une date dans l’avenir et garde la date du jour', async () => {
    const save = jest.fn().mockResolvedValue(undefined);
    mockBilan.mockImplementation(((doc: Record<string, unknown>) => ({ ...doc, _id: 'b1', save })) as never);
    const avenir = new Date(Date.now() + 86400000 * 30).toISOString();
    await saveBilan(mockRequest({ userId: 'u1', body: { type: 'nature', scores: { vata: 1, pitta: 1, kapha: 1 }, date: avenir } }), mockResponse());
    const doc = (mockBilan as unknown as jest.Mock).mock.calls[0][0];
    expect((doc.date as Date).getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('reprend la date d’un bilan fait avant la création du compte', async () => {
    const save = jest.fn().mockResolvedValue(undefined);
    mockBilan.mockImplementation(((doc: Record<string, unknown>) => ({ ...doc, _id: 'b1', save })) as never);
    await saveBilan(mockRequest({ userId: 'u1', body: { type: 'nature', scores: { vata: 1, pitta: 1, kapha: 1 }, date: d1.toISOString() } }), mockResponse());
    const doc = (mockBilan as unknown as jest.Mock).mock.calls[0][0];
    expect((doc.date as Date).toISOString()).toBe(d1.toISOString());
  });
});

describe('deleteBilans', () => {
  it('efface seulement les bilans de la personne connectée', async () => {
    mockBilan.deleteMany.mockResolvedValue({ deletedCount: 3 } as never);
    const res = mockResponse();
    await deleteBilans(mockRequest({ userId: 'u1' }), res);
    expect(mockBilan.deleteMany).toHaveBeenCalledWith({ userId: 'u1' });
    expect(res.json).toHaveBeenCalledWith({ deleted: 3 });
  });
});
