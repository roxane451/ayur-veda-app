/** La session (jeton et personne connectée), gardée sur l'appareil. Lectures protégées. */
import type { Utilisateur } from "@/lib/api";

const CLE = "ayurveda.session.v1";

export interface Session {
  token: string;
  user: Utilisateur;
}

export function lireSession(): Session | null {
  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return null;
    const s = JSON.parse(brut) as Session;
    return s?.token && s?.user ? s : null;
  } catch {
    return null;
  }
}

export function ecrireSession(s: Session | null): void {
  try {
    if (s) window.localStorage.setItem(CLE, JSON.stringify(s));
    else window.localStorage.removeItem(CLE);
  } catch {
    /* stockage indisponible : la session dure le temps de la visite */
  }
}
