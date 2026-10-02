import { describe, expect, it } from "vitest";
import { ANNEXES, LIVRES, SOUS_PAGES, livreDe, numeroChapitre } from "@/components/comprendre/sousPages";
import { REFS_DOSHAS, DOSHAS_DETAIL } from "@/data/comprendre";
import { REFS_QUALITES } from "@/data/corpsEsprit";
import { REFS_ELEMENTS, REFS_SCIENCE_VIE } from "@/data/principes";
import { TEXTES } from "@/data/sources";

describe("Comprendre rangé en livres", () => {
  it("numérote les chapitres à la suite d'un livre à l'autre", () => {
    expect(numeroChapitre("/comprendre")).toBe(1);
    expect(numeroChapitre("/comprendre/doshas")).toBe(4);
    expect(numeroChapitre(LIVRES[1].chapitres[0].href)).toBe(5);
    expect(numeroChapitre("/comprendre/textes")).toBe(0);
  });

  it("retrouve le livre d'une page, et aucun pour les annexes", () => {
    expect(livreDe("/comprendre/elements")?.num).toBe("I");
    expect(livreDe(ANNEXES[0].href)).toBeUndefined();
  });

  it("n'a pas deux pages à la même adresse", () => {
    expect(new Set(SOUS_PAGES.map((p) => p.href)).size).toBe(SOUS_PAGES.length);
  });
});

describe("Les sources", () => {
  it("ne citent que des traités connus", () => {
    const ids = new Set(TEXTES.map((t) => t.id));
    for (const r of [...REFS_SCIENCE_VIE, ...REFS_ELEMENTS, ...REFS_QUALITES, ...REFS_DOSHAS]) expect(ids.has(r.texte)).toBe(true);
  });

  it("donnent cinq formes à chaque dosha", () => {
    for (const d of DOSHAS_DETAIL) expect(d.formes).toHaveLength(5);
  });
});
