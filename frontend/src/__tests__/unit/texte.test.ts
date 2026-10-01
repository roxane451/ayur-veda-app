import { describe, expect, it } from "vitest";
import { enListe, enListePhrase, enPhrase, enPhrases } from "@/lib/texte";

describe("texte courant", () => {
  it("met une majuscule et un point", () => {
    expect(enPhrase("soupes et ragoûts")).toBe("Soupes et ragoûts.");
    expect(enPhrase("Déjà fini !")).toBe("Déjà fini !");
  });
  it("enchaîne les consignes", () => {
    expect(enPhrases(["Des horaires réguliers", "du repos"])).toBe("Des horaires réguliers. Du repos.");
  });
  it("relie une liste par « et »", () => {
    expect(enListe(["Léger", "Froid", "Sec"])).toBe("léger, froid et sec");
    expect(enListe(["Seul"])).toBe("seul");
    expect(enListePhrase(["Anxiété", "Insomnie"])).toBe("Anxiété et insomnie.");
  });
  it("garde les sigles", () => {
    expect(enListe(["ADN", "Froid"])).toBe("ADN et froid");
  });
});
