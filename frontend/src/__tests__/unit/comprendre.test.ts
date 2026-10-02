import { describe, it, expect } from "vitest";
import { momentEnCours, MOMENTS_JOURNEE, SAVEURS, DOSHAS_DETAIL } from "@/data/comprendre";

describe("momentEnCours", () => {
  it("trouve la tranche de quatre heures du moment", () => {
    expect(MOMENTS_JOURNEE[momentEnCours(3)].titre).toBe("Se lever");
    expect(MOMENTS_JOURNEE[momentEnCours(7)].titre).toBe("Bouger");
    expect(MOMENTS_JOURNEE[momentEnCours(12)].titre).toBe("Manger et agir");
    expect(MOMENTS_JOURNEE[momentEnCours(19)].titre).toBe("Ralentir");
    expect(MOMENTS_JOURNEE[momentEnCours(23)].titre).toBe("Dormir");
    expect(MOMENTS_JOURNEE[momentEnCours(1)].titre).toBe("Dormir");
  });
});

describe("contenus", () => {
  it("décrit six saveurs et trois doshas complets", () => {
    expect(SAVEURS).toHaveLength(6);
    for (const d of DOSHAS_DETAIL) {
      expect(d.corps).toHaveLength(5);
      expect(d.signes.length).toBeGreaterThan(0);
    }
  });
});
