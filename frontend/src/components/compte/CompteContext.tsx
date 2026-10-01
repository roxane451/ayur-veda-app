import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api, ErreurApi, type BilanServeur, type Utilisateur } from "@/lib/api";
import { ecrireSession, lireSession, type Session } from "@/lib/session";
import { ecrireProfil, effacerProfil, lireProfil } from "@/lib/profilStorage";
import { bilansAEnvoyer, profilDepuisServeur } from "@/lib/synchro";
import type { DoshaScores } from "@/lib/doshaLogic";

interface Compte {
  user: Utilisateur | null;
  connecte: boolean;
  /** La nature et l'historique des états, tels qu'enregistrés sur le compte. */
  nature: BilanServeur | null;
  etats: BilanServeur[];
  chargement: boolean;
  /** Incrémenté quand le profil local a été mis à jour depuis le compte. */
  version: number;
  connexion: (email: string, password: string) => Promise<void>;
  inscription: (email: string, password: string, firstName?: string) => Promise<void>;
  deconnexion: () => void;
  enregistrerBilan: (type: "nature" | "etat", scores: DoshaScores) => void;
  effacerTout: () => Promise<void>;
}

const Ctx = createContext<Compte | null>(null);

export const CompteProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(() => lireSession());
  const [nature, setNature] = useState<BilanServeur | null>(null);
  const [etats, setEtats] = useState<BilanServeur[]>([]);
  const [chargement, setChargement] = useState(() => Boolean(lireSession()));
  const [version, setVersion] = useState(0);

  const deconnexion = useCallback(() => {
    // Le profil de l'appareil appartenait au compte : on ne le laisse pas à la personne suivante.
    effacerProfil();
    setVersion((v) => v + 1);
    ecrireSession(null);
    setSession(null);
    setNature(null);
    setEtats([]);
  }, []);

  const synchroniser = useCallback(
    async (s: Session) => {
      try {
        let serveur = await api.bilans(s.token);
        const envois = bilansAEnvoyer(lireProfil(), serveur);
        if (envois.length) {
          for (const b of envois) await api.enregistrerBilan(s.token, b);
          serveur = await api.bilans(s.token);
        }
        setNature(serveur.nature);
        setEtats(serveur.etats);
        if (serveur.nature || serveur.etats.length) {
          ecrireProfil(profilDepuisServeur(serveur));
          setVersion((v) => v + 1);
        }
      } catch (e) {
        if (e instanceof ErreurApi && e.statut === 401) deconnexion();
        // Hors ligne : on garde le profil de l'appareil, la synchro se refera plus tard.
      } finally {
        setChargement(false);
      }
    },
    [deconnexion],
  );

  // Une fois à l'ouverture, puis à chaque nouvelle connexion (hors du rendu, pour ne pas le bloquer).
  const token = session?.token;
  useEffect(() => {
    if (!token || !session) return;
    const id = window.setTimeout(() => void synchroniser(session), 0);
    return () => window.clearTimeout(id);
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const ouvrir = useCallback((s: Session) => {
    setChargement(true);
    ecrireSession(s);
    setSession(s);
  }, []);

  const connexion = useCallback(
    async (email: string, password: string) => {
      const r = await api.connexion({ email, password });
      ouvrir({ token: r.token, user: r.user });
    },
    [ouvrir],
  );

  const inscription = useCallback(
    async (email: string, password: string, firstName?: string) => {
      const r = await api.inscription({ email, password, firstName: firstName || undefined });
      ouvrir({ token: r.token, user: r.user });
    },
    [ouvrir],
  );

  const enregistrerBilan = useCallback(
    (type: "nature" | "etat", scores: DoshaScores) => {
      if (!session) return;
      api
        .enregistrerBilan(session.token, { type, scores })
        .then(({ bilan }) => {
          if (type === "nature") setNature(bilan);
          else setEtats((x) => [...x, bilan]);
        })
        .catch((e) => {
          if (e instanceof ErreurApi && e.statut === 401) deconnexion();
        });
    },
    [session, deconnexion],
  );

  const effacerTout = useCallback(async () => {
    if (session) await api.effacerBilans(session.token);
    effacerProfil();
    setNature(null);
    setEtats([]);
    setVersion((v) => v + 1);
  }, [session]);

  const valeur = useMemo<Compte>(
    () => ({
      user: session?.user ?? null,
      connecte: Boolean(session),
      nature,
      etats,
      chargement,
      version,
      connexion,
      inscription,
      deconnexion,
      enregistrerBilan,
      effacerTout,
    }),
    [session, nature, etats, chargement, version, connexion, inscription, deconnexion, enregistrerBilan, effacerTout],
  );

  return <Ctx.Provider value={valeur}>{children}</Ctx.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCompte = (): Compte => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCompte doit être utilisé dans <CompteProvider>");
  return c;
};

/** Pour les tests et les pages hors du site : un compte « déconnecté » qui ne fait rien. */
// eslint-disable-next-line react-refresh/only-export-components
export const useCompteOptionnel = (): Compte | null => useContext(Ctx);
