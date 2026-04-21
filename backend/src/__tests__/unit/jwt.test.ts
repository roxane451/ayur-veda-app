/**
 * Tests unitaires — utils/jwt
 */
import '../setup';
import { generateToken, verifyToken } from '../../utils/jwt';

describe('utils/jwt', () => {
  const testUserId = 'user_abc_123';

  describe('generateToken', () => {
    it('génère un string non vide', () => {
      const token = generateToken(testUserId);
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('génère un JWT en 3 parties séparées par des points', () => {
      const token = generateToken(testUserId);
      const parts = token.split('.');
      expect(parts).toHaveLength(3);
    });

    it('génère des tokens différents pour des userId différents', () => {
      const token1 = generateToken('user_1');
      const token2 = generateToken('user_2');
      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyToken', () => {
    it('retourne le userId pour un token valide', () => {
      const token = generateToken(testUserId);
      const decoded = verifyToken(token);

      expect(decoded).not.toBeNull();
      expect(decoded?.userId).toBe(testUserId);
    });

    it('retourne null pour un token invalide', () => {
      const result = verifyToken('token.invalide.ici');
      expect(result).toBeNull();
    });

    it('retourne null pour un token vide', () => {
      const result = verifyToken('');
      expect(result).toBeNull();
    });

    it('retourne null pour un token trafiqué', () => {
      const token = generateToken(testUserId);
      const tampered = token.slice(0, -5) + 'XXXXX';
      const result = verifyToken(tampered);
      expect(result).toBeNull();
    });

    it('round-trip : génère puis vérifie le même userId', () => {
      const userId = 'round_trip_user_999';
      const token = generateToken(userId);
      const decoded = verifyToken(token);
      expect(decoded?.userId).toBe(userId);
    });
  });
});
