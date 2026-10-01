import { describe, it, expect } from "vitest";
import { EPICES, MELANGES, RECETTES, RECETTES_COMPLETES, filtrerRecettes } from "@/data/cuisine";

describe("la cuisine", () => {
  it("contient huit épices, six mélanges et trente recettes dont six gratuites", () => {
    expect(EPICES).toHaveLength(8);
    expect(MELANGES).toHaveLength(6);
    expect(RECETTES).toHaveLength(30);
    expect(RECETTES.filter((r) => !r.membres)).toHaveLength(6);
  });

  it("donne un identifiant unique à chaque recette", () => {
    expect(new Set(RECETTES.map((r) => r.id)).size).toBe(RECETTES.length);
    expect(RECETTES_COMPLETES.kitchari).toBeDefined();
    expect(RECETTES.some((r) => r.id === "kitchari")).toBe(true);
  });

  it("chaque fiche d'épice renvoie à des mélanges qui existent", () => {
    const ids = new Set(MELANGES.map((m) => m.id));
    for (const e of EPICES) e.dansLes.forEach((m) => expect(ids.has(m)).toBe(true));
  });

  it("filtre les recettes par dosha, saison et temps", () => {
    const pitta = filtrerRecettes(RECETTES, { dosha: "pitta" });
    expect(pitta.every((r) => r.doshas.includes("pitta"))).toBe(true);
    const ete = filtrerRecettes(RECETTES, { saison: "Été" });
    expect(ete.some((r) => r.saisons === "toute l'année")).toBe(true);
    expect(ete.every((r) => r.saisons === "toute l'année" || r.saisons.includes("Été"))).toBe(true);
    const rapides = filtrerRecettes(RECETTES, { rapide: true });
    expect(rapides.every((r) => r.minutes < 20)).toBe(true);
    expect(filtrerRecettes(RECETTES, {})).toHaveLength(30);
  });
});
