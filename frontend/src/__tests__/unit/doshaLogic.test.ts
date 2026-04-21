/**
 * Tests unitaires — lib/doshaLogic.ts
 *
 * Teste les fonctions pures exportées du module :
 *   computeScores      → accumulation des scores bruts
 *   computePercentages → conversion en pourcentages
 *   computeProfile     → classification du profil de constitution
 *   calculateResults   → pipeline complet
 *
 * Aucun composant React n'est rendu ici — tests rapides et stables.
 */
import { describe, it, expect } from "vitest";
import {
  computeScores,
  computePercentages,
  computeProfile,
  calculateResults,
  type QuizOption,
} from "@/lib/doshaLogic";

// ── computeScores ─────────────────────────────────────────────────────────

describe("computeScores", () => {
  it("additionne correctement les scores de chaque dosha", () => {
    const answers: QuizOption[] = [
      { text: "Q1", vata: 3 },
      { text: "Q2", vata: 2 },
      { text: "Q3", pitta: 3 },
    ];
    const scores = computeScores(answers);
    expect(scores.vata).toBe(5);
    expect(scores.pitta).toBe(3);
    expect(scores.kapha).toBe(0);
  });

  it("retourne 0 pour tous les doshas sur une liste vide", () => {
    expect(computeScores([])).toEqual({ vata: 0, pitta: 0, kapha: 0 });
  });

  it("ignore les champs undefined (réponse sans score)", () => {
    const answers: QuizOption[] = [{ text: "Sans score" }];
    expect(computeScores(answers)).toEqual({ vata: 0, pitta: 0, kapha: 0 });
  });

  it("gère une réponse qui score plusieurs doshas à la fois", () => {
    const answers: QuizOption[] = [{ text: "Q", vata: 2, pitta: 1 }];
    const scores = computeScores(answers);
    expect(scores.vata).toBe(2);
    expect(scores.pitta).toBe(1);
    expect(scores.kapha).toBe(0);
  });
});

// ── computePercentages ────────────────────────────────────────────────────

describe("computePercentages", () => {
  it("les trois pourcentages totalisent ~100 %", () => {
    const pct = computePercentages({ vata: 3, pitta: 3, kapha: 3 });
    const sum =
      parseFloat(pct.vata) + parseFloat(pct.pitta) + parseFloat(pct.kapha);
    expect(sum).toBeCloseTo(100, 0);
  });

  it("retourne '0.0' pour tous si total = 0 (protection division par zéro)", () => {
    expect(computePercentages({ vata: 0, pitta: 0, kapha: 0 })).toEqual({
      vata: "0.0",
      pitta: "0.0",
      kapha: "0.0",
    });
  });

  it("arrondit à 1 décimale", () => {
    const pct = computePercentages({ vata: 1, pitta: 1, kapha: 1 });
    expect(pct.vata).toMatch(/^\d+\.\d$/);
  });

  it("calcule 100 % vata si c'est le seul dosha présent", () => {
    const pct = computePercentages({ vata: 10, pitta: 0, kapha: 0 });
    expect(pct.vata).toBe("100.0");
    expect(pct.pitta).toBe("0.0");
    expect(pct.kapha).toBe("0.0");
  });
});

// ── computeProfile ────────────────────────────────────────────────────────

describe("computeProfile", () => {
  it("type MONO si un dosha ≥ 60 %", () => {
    const p = computeProfile({ vata: "65.0", pitta: "20.0", kapha: "15.0" });
    expect(p.type).toBe("mono");
    expect(p.primary).toBe("vata");
    expect(p.label).toBe("VATA Dominant");
  });

  it("type BI si deux doshas sont proches (écart ≤ 15 %)", () => {
    const p = computeProfile({ vata: "45.0", pitta: "40.0", kapha: "15.0" });
    expect(p.type).toBe("bi");
    expect(p.primary).toBe("vata");
    expect(p.secondary).toBe("pitta");
    expect(p.label).toBe("VATA-PITTA");
  });

  it("type TRI-DOSHA si les 3 doshas sont très proches (spread ≤ 20 %)", () => {
    const p = computeProfile({ vata: "35.0", pitta: "33.0", kapha: "32.0" });
    expect(p.type).toBe("tri");
    expect(p.label).toBe("TRI-DOSHA (Équilibré)");
  });

  it("type DOMINANT sinon (domine mais < 60 %, pas de secondaire proche)", () => {
    const p = computeProfile({ vata: "55.0", pitta: "25.0", kapha: "20.0" });
    expect(p.type).toBe("dominant");
    expect(p.primary).toBe("vata");
    expect(p.secondary).toBe("pitta");
    expect(p.label).toBe("VATA avec tendance PITTA");
  });

  it("le label contient le dosha dominant en majuscules", () => {
    const p = computeProfile({ kapha: "70.0", pitta: "20.0", vata: "10.0" });
    expect(p.label).toMatch(/KAPHA/);
  });
});

// ── calculateResults — pipeline complet ──────────────────────────────────

describe("calculateResults", () => {
  it("retourne scores + percentages + profile cohérents", () => {
    const answers: QuizOption[] = [
      ...Array(10).fill({ text: "V", vata: 3 }),
      { text: "P", pitta: 1 },
      { text: "K", kapha: 1 },
    ];
    const { scores, percentages, profile } = calculateResults(answers);
    expect(scores.vata).toBe(30);
    expect(profile.type).toBe("mono");
    expect(profile.primary).toBe("vata");
    const sum =
      parseFloat(percentages.vata) +
      parseFloat(percentages.pitta) +
      parseFloat(percentages.kapha);
    expect(sum).toBeCloseTo(100, 0);
  });

  it("gère un tableau vide sans erreur", () => {
    const { scores, percentages, profile } = calculateResults([]);
    expect(scores).toEqual({ vata: 0, pitta: 0, kapha: 0 });
    expect(percentages).toEqual({ vata: "0.0", pitta: "0.0", kapha: "0.0" });
    expect(profile).toHaveProperty("type");
    expect(profile).toHaveProperty("label");
  });

  it("répartition égale → profil TRI-DOSHA", () => {
    const answers: QuizOption[] = [
      ...Array(5).fill({ text: "V", vata: 2 }),
      ...Array(5).fill({ text: "P", pitta: 2 }),
      ...Array(5).fill({ text: "K", kapha: 2 }),
    ];
    const { profile } = calculateResults(answers);
    expect(profile.type).toBe("tri");
  });
});
