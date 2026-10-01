/**
 * Accorde le profil gardé sur l'appareil et les bilans du compte.
 *  - Un bilan fait avant la connexion (ou hors ligne) est envoyé sur le compte,
 *    sauf la nature si le compte en a déjà une.
 *  - Ensuite, le compte fait foi : l'appareil reprend la nature et le dernier état du compte.
 */
import type { BilanServeur } from "@/lib/api";
import type { ProfilEnregistre } from "@/lib/profilStorage";
import type { DoshaScores } from "@/lib/doshaLogic";

const jour = (iso: string) => iso.slice(0, 10);
const memesScores = (a: DoshaScores, b: DoshaScores) => a.vata === b.vata && a.pitta === b.pitta && a.kapha === b.kapha;
/** Les dates locales sont des jours (AAAA-MM-JJ) : on les place à midi pour éviter les décalages d'heure. */
export const versIso = (j: string) => `${j}T12:00:00.000Z`;

export interface AEnvoyer {
  type: "nature" | "etat";
  scores: DoshaScores;
  date: string;
}

export function bilansAEnvoyer(local: ProfilEnregistre, serveur: { nature: BilanServeur | null; etats: BilanServeur[] }): AEnvoyer[] {
  const out: AEnvoyer[] = [];
  const n = local.nature;
  // La nature du compte n'est jamais remplacée par celle de l'appareil : on ne l'envoie que si le compte n'en a pas.
  if (n && !serveur.nature) {
    out.push({ type: "nature", scores: n.scores, date: versIso(n.date) });
  }
  const e = local.etat;
  if (e) {
    const dernier = serveur.etats[serveur.etats.length - 1];
    const dejaLa = serveur.etats.some((x) => jour(x.date) === e.date && memesScores(x.scores, e.scores));
    if (!dejaLa && (!dernier || jour(dernier.date) <= e.date)) out.push({ type: "etat", scores: e.scores, date: versIso(e.date) });
  }
  return out;
}

export function profilDepuisServeur(serveur: { nature: BilanServeur | null; etats: BilanServeur[] }): ProfilEnregistre {
  const p: ProfilEnregistre = {};
  if (serveur.nature) p.nature = { scores: serveur.nature.scores, date: jour(serveur.nature.date) };
  const dernier = serveur.etats[serveur.etats.length - 1];
  if (dernier) p.etat = { scores: dernier.scores, date: jour(dernier.date) };
  return p;
}
