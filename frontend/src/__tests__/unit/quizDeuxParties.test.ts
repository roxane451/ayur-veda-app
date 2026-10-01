import { describe, it, expect } from "vitest";
import {
  comparerEtat,
  libelleProfil,
  noteEcart,
  partsEntieres,
  scoresPrakriti,
  scoresVikriti,
  SEUIL_GENE,
} from "@/lib/doshaLogic";
import { ECHELLE, PRAKRITI, VIKRITI } from "@/data/quiz";

describe("données du quiz", () => {
  it("compte 20 questions de nature et 15 affirmations d'état", () => {
    expect(PRAKRITI).toHaveLength(20);
    expect(VIKRITI).toHaveLength(15);
    expect(ECHELLE).toHaveLength(4);
  });

  it("chaque question de nature propose une option par dosha", () => {
    for (const q of PRAKRITI) {
      expect(q.options.map((o) => o.dosha).sort()).toEqual(["kapha", "pitta", "vata"]);
    }
  });

  it("la partie 2 contient cinq affirmations par dosha", () => {
    const n = { vata: 0, pitta: 0, kapha: 0 };
    VIKRITI.forEach((a) => (n[a.dosha] += 1));
    expect(n).toEqual({ vata: 5, pitta: 5, kapha: 5 });
  });
});

describe("partsEntieres", () => {
  it("totalise toujours exactement 100", () => {
    expect(partsEntieres({ vata: 1, pitta: 1, kapha: 1 })).toEqual({ vata: 34, pitta: 33, kapha: 33 });
    const p = partsEntieres({ vata: 7, pitta: 3.5, kapha: 2 });
    expect(p.vata + p.pitta + p.kapha).toBe(100);
  });

  it("renvoie 0 partout sans réponse", () => {
    expect(partsEntieres({ vata: 0, pitta: 0, kapha: 0 })).toEqual({ vata: 0, pitta: 0, kapha: 0 });
  });
});

describe("scoresPrakriti", () => {
  it("additionne les poids des options cochées", () => {
    const s = scoresPrakriti([[{ dosha: "vata", poids: 3 }], [{ dosha: "pitta", poids: 2 }]]);
    expect(s).toEqual({ vata: 3, pitta: 2, kapha: 0 });
  });

  it("partage le poids quand deux options sont cochées", () => {
    const s = scoresPrakriti([
      [
        { dosha: "vata", poids: 3 },
        { dosha: "kapha", poids: 3 },
      ],
    ]);
    expect(s).toEqual({ vata: 1.5, pitta: 0, kapha: 1.5 });
  });

  it("ignore une réponse vide", () => {
    expect(scoresPrakriti([[]])).toEqual({ vata: 0, pitta: 0, kapha: 0 });
  });
});

describe("scoresVikriti", () => {
  it("compte de 0 à 3 par affirmation et borne les valeurs", () => {
    const s = scoresVikriti([
      { dosha: "vata", frequence: 3 },
      { dosha: "vata", frequence: 9 },
      { dosha: "pitta", frequence: -2 },
      { dosha: "kapha", frequence: 1 },
    ]);
    expect(s).toEqual({ vata: 6, pitta: 0, kapha: 1 });
  });
});

describe("libelleProfil", () => {
  it("nomme les profils en français", () => {
    expect(libelleProfil({ vata: 70, pitta: 20, kapha: 10 })).toBe("Vata");
    expect(libelleProfil({ vata: 45, pitta: 40, kapha: 15 })).toBe("Vata-Pitta");
    expect(libelleProfil({ vata: 34, pitta: 33, kapha: 33 })).toBe("Tridosha");
    expect(libelleProfil({ vata: 10, pitta: 55, kapha: 35 })).toBe("Pitta, tendance Kapha");
  });
});

describe("comparerEtat", () => {
  const nature = { vata: 60, pitta: 30, kapha: 10 };

  it("dit « proche de l'équilibre » quand très peu de gênes sont signalées", () => {
    expect(comparerEtat({ vata: 2, pitta: 1, kapha: SEUIL_GENE - 4 }, nature)).toEqual({ type: "equilibre" });
  });

  it("repère le dosha qui dépasse la nature de 10 points ou plus", () => {
    // état : 40 % vata, 20 % pitta, 40 % kapha → kapha +30
    expect(comparerEtat({ vata: 4, pitta: 2, kapha: 4 }, nature)).toEqual({ type: "exces", dosha: "kapha", ecart: 30 });
  });

  it("ne signale rien sous le seuil", () => {
    // état : 62 % / 31 % / 7 % → aucun écart ≥ 10
    expect(comparerEtat({ vata: 8, pitta: 4, kapha: 1 }, nature)).toEqual({ type: "reparti" });
  });

  it("sans nature connue, compare à une répartition égale", () => {
    expect(comparerEtat({ vata: 9, pitta: 1, kapha: 0 })).toEqual({ type: "exces", dosha: "vata", ecart: 57 });
  });
});

describe("noteEcart", () => {
  it("décrit l'écart entre nature et moment", () => {
    expect(noteEcart(20, 35)).toBe("+15 pts : en excès");
    expect(noteEcart(40, 29)).toBe("−11 pts : en baisse");
    expect(noteEcart(30, 34)).toBe("proche de votre nature");
  });
});
