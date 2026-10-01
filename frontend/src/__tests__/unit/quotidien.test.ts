import { describe, it, expect } from "vitest";
import { SAISONS_DETAIL, PROGRAMME_AUTOMNE } from "@/data/saisons";

describe("au quotidien", () => {
  it("décrit les quatre saisons, chacune avec sa journée et ses plantes", () => {
    expect(SAISONS_DETAIL.map((s) => s.id)).toEqual(["automne", "hiver", "printemps", "ete"]);
    for (const s of SAISONS_DETAIL) {
      expect(s.assiette.length).toBeGreaterThan(0);
      expect(s.matin.length).toBeGreaterThan(0);
      expect(s.plantes).toHaveLength(4);
    }
  });
  it("le programme d'automne compte trois semaines", () => {
    expect(PROGRAMME_AUTOMNE.semaines).toHaveLength(3);
  });
});
