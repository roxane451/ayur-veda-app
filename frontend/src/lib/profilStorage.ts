/**
 * Le profil est gardé sur l'appareil (localStorage) en attendant l'espace membre.
 * Toutes les lectures et écritures sont protégées : navigation privée, stockage
 * plein ou désactivé ne doivent jamais casser le quiz.
 */
import type { DoshaScores } from "@/lib/doshaLogic";

const CLE = "ayurveda.profil.v1";

export interface ProfilEnregistre {
  nature?: { scores: DoshaScores; date: string };
  etat?: { scores: DoshaScores; date: string };
}

export function lireProfil(): ProfilEnregistre {
  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return {};
    const p = JSON.parse(brut) as ProfilEnregistre;
    return typeof p === "object" && p ? p : {};
  } catch {
    return {};
  }
}

export function ecrireProfil(p: ProfilEnregistre): void {
  try {
    window.localStorage.setItem(CLE, JSON.stringify(p));
  } catch {
    /* stockage indisponible : le résultat reste affiché pour cette visite */
  }
}

export function effacerProfil(): void {
  try {
    window.localStorage.removeItem(CLE);
  } catch {
    /* rien à faire */
  }
}
