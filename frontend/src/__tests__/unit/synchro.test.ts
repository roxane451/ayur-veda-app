import { describe, it, expect } from "vitest";
import { bilansAEnvoyer, profilDepuisServeur, versIso } from "@/lib/synchro";
import type { BilanServeur } from "@/lib/api";

const b = (id: string, type: "nature" | "etat", jour: string, vata: number): BilanServeur => ({
  id,
  type,
  date: versIso(jour),
  scores: { vata, pitta: 2, kapha: 1 },
});

describe("bilansAEnvoyer", () => {
  it("envoie la nature et l'état faits avant la création du compte", () => {
    const local = { nature: { scores: { vata: 30, pitta: 15, kapha: 5 }, date: "2026-09-01" }, etat: { scores: { vata: 9, pitta: 2, kapha: 1 }, date: "2026-10-01" } };
    const r = bilansAEnvoyer(local, { nature: null, etats: [] });
    expect(r.map((x) => x.type)).toEqual(["nature", "etat"]);
    expect(r[0].date).toBe("2026-09-01T12:00:00.000Z");
  });

  it("n'envoie rien quand le compte a déjà ces bilans", () => {
    const local = { nature: { scores: { vata: 30, pitta: 2, kapha: 1 }, date: "2026-09-01" }, etat: { scores: { vata: 9, pitta: 2, kapha: 1 }, date: "2026-10-01" } };
    const serveur = { nature: b("n", "nature", "2026-09-01", 30), etats: [b("e", "etat", "2026-10-01", 9)] };
    expect(bilansAEnvoyer(local, serveur)).toEqual([]);
  });

  it("ne remplace jamais la nature déjà enregistrée sur le compte", () => {
    const local = { nature: { scores: { vata: 5, pitta: 30, kapha: 5 }, date: "2026-10-01" } };
    const serveur = { nature: b("n", "nature", "2025-10-01", 30), etats: [] };
    expect(bilansAEnvoyer(local, serveur)).toEqual([]);
  });

  it("n'écrase pas un bilan plus récent du compte avec un ancien bilan de l'appareil", () => {
    const local = { etat: { scores: { vata: 1, pitta: 1, kapha: 1 }, date: "2026-03-01" } };
    const serveur = { nature: null, etats: [b("e", "etat", "2026-09-01", 9)] };
    expect(bilansAEnvoyer(local, serveur)).toEqual([]);
  });
});

describe("profilDepuisServeur", () => {
  it("reprend la nature et le dernier état du compte", () => {
    const p = profilDepuisServeur({ nature: b("n", "nature", "2026-01-01", 30), etats: [b("1", "etat", "2026-03-01", 4), b("2", "etat", "2026-09-01", 9)] });
    expect(p.nature?.date).toBe("2026-01-01");
    expect(p.etat?.scores.vata).toBe(9);
  });
  it("renvoie un profil vide pour un compte neuf", () => {
    expect(profilDepuisServeur({ nature: null, etats: [] })).toEqual({});
  });
});
