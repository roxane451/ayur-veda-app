/**
 * Installation de l'app (PWA).
 * Garde l'invitation du navigateur (Android, Chrome), compte les visites et retient si l'invitation a été fermée.
 */
import { useEffect, useState } from "react";

const CLE = "ayurveda.installation.v1";
const CLE_SESSION = "ayurveda.visite.comptee";

interface Etat {
  visites: number;
  ferme: boolean;
}

interface InvitationNavigateur extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let invitation: InvitationNavigateur | null = null;
let installee = false;
const abonnes = new Set<() => void>();
const prevenir = () => abonnes.forEach((f) => f());

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    invitation = e as InvitationNavigateur;
    prevenir();
  });
  window.addEventListener("appinstalled", () => {
    invitation = null;
    installee = true;
    prevenir();
  });
}

function lire(): Etat {
  try {
    const brut = window.localStorage.getItem(CLE);
    if (brut) return { visites: 0, ferme: false, ...JSON.parse(brut) };
  } catch {
    /* stockage indisponible */
  }
  return { visites: 0, ferme: false };
}

function ecrire(e: Etat) {
  try {
    window.localStorage.setItem(CLE, JSON.stringify(e));
  } catch {
    /* stockage indisponible */
  }
}

/** Compte une visite par session de navigation. */
function compterVisite(): Etat {
  const e = lire();
  try {
    if (!window.sessionStorage.getItem(CLE_SESSION)) {
      window.sessionStorage.setItem(CLE_SESSION, "1");
      e.visites += 1;
      ecrire(e);
    }
  } catch {
    /* stockage indisponible */
  }
  return e;
}

export function estInstallee(): boolean {
  if (installee) return true;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    nav.standalone === true
  );
}

export type NavigateurIos = "safari" | "chrome" | "autre";

/**
 * Sur iPhone et iPad, l'installation passe par le menu Partager, dans Safari
 * comme dans Chrome et les autres navigateurs (depuis iOS 16.4). Renvoie null hors iOS.
 */
export function navigateurIos(): NavigateurIos | null {
  const ua = window.navigator.userAgent;
  const ios =
    /iPad|iPhone|iPod/.test(ua) ||
    (ua.includes("Macintosh") && window.navigator.maxTouchPoints > 1);
  if (!ios) return null;
  if (/CriOS/.test(ua)) return "chrome";
  if (/FxiOS|EdgiOS|OPiOS/.test(ua)) return "autre";
  return "safari";
}

export interface Installation {
  /** L'app peut être proposée sur cet appareil. */
  possible: boolean;
  /** Sur iOS, le navigateur dont il faut montrer les gestes (sinon null). */
  ios: NavigateurIos | null;
  /** Le bandeau peut s'afficher (deuxième visite, pas encore fermé). */
  bandeau: boolean;
  installer: () => Promise<void>;
  fermer: () => void;
}

export function useInstallation(): Installation {
  const [, rafraichir] = useState(0);
  const [etat, setEtat] = useState<Etat>(() => compterVisite());

  useEffect(() => {
    const f = () => rafraichir((n) => n + 1);
    abonnes.add(f);
    return () => {
      abonnes.delete(f);
    };
  }, []);

  const ios = navigateurIos();
  const possible = !estInstallee() && (invitation !== null || ios !== null);

  const fermer = () => {
    const e = { ...lire(), ferme: true };
    ecrire(e);
    setEtat(e);
  };

  const installer = async () => {
    if (!invitation) return;
    const i = invitation;
    invitation = null;
    await i.prompt();
    await i.userChoice;
    fermer();
  };

  return {
    possible,
    ios,
    bandeau: possible && etat.visites >= 2 && !etat.ferme,
    installer,
    fermer,
  };
}
