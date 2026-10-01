import { describe, it, expect } from "vitest";
import { saisonDuMoment } from "@/data/saisons";
import { fr } from "@/components/quiz/conseils";

describe("saisonDuMoment", () => {
  it("suit les mois de l'année", () => {
    expect(saisonDuMoment(new Date(2026, 9, 1)).id).toBe("automne");
    expect(saisonDuMoment(new Date(2026, 11, 20)).id).toBe("hiver");
    expect(saisonDuMoment(new Date(2027, 1, 10)).id).toBe("hiver");
    expect(saisonDuMoment(new Date(2027, 3, 1)).id).toBe("printemps");
    expect(saisonDuMoment(new Date(2027, 6, 14)).id).toBe("ete");
  });
});

describe("fr", () => {
  it("met une espace insécable devant la ponctuation haute et dans les guillemets", () => {
    expect(fr("Vata ?")).toBe("Vata ?");
    expect(fr("« Bonjour »")).toBe("« Bonjour »");
  });
});
