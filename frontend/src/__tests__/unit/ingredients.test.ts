import { describe, expect, it } from "vitest";
import { INGREDIENTS, ingredientsQuiApaisent, initialeIngredient } from "@/data/ingredients";

describe("ingrédients de A à Z", () => {
  it("reprend les 30 ingrédients, rangés par ordre alphabétique", () => {
    expect(INGREDIENTS).toHaveLength(30);
    const noms = INGREDIENTS.map((i) => i.nom);
    expect([...noms].sort((a, b) => a.localeCompare(b, "fr"))).toEqual(noms);
  });
  it("lit les effets sur les doshas", () => {
    const ghee = INGREDIENTS.find((i) => i.nom === "Ghee")!;
    expect(ghee.doshas).toEqual({ vata: "diminue", pitta: "diminue", kapha: "augmente" });
    expect(INGREDIENTS.find((i) => i.nom === "Trimada")!.doshas).toEqual({ kapha: "diminue", vata: "diminue" });
  });
  it("filtre ceux qui apaisent un dosha", () => {
    const pitta = ingredientsQuiApaisent("pitta").map((i) => i.nom);
    expect(pitta).toContain("Shatavari");
    expect(pitta).toContain("Curcuma");
    expect(pitta).not.toContain("Tulsi");
    expect(ingredientsQuiApaisent(null)).toHaveLength(30);
  });
  it("donne l'initiale sans accent", () => {
    expect(initialeIngredient("Éther")).toBe("E");
  });
});
