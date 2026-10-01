/**
 * Accès à l'API du site (comptes et bilans).
 * En production, l'API est servie sous /api par le reverse proxy ; en développement, Vite la redirige.
 */
import type { DoshaScores } from "@/lib/doshaLogic";

const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "/api";

export class ErreurApi extends Error {
  constructor(
    public statut: number,
    message: string,
    public details?: { field: string; message: string }[],
  ) {
    super(message);
  }
}

async function appel<T>(chemin: string, options: RequestInit & { token?: string | null } = {}): Promise<T> {
  const { token, headers, ...reste } = options;
  let res: Response;
  try {
    res = await fetch(`${BASE}${chemin}`, {
      ...reste,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });
  } catch {
    throw new ErreurApi(0, "Impossible de joindre le serveur. Vérifiez votre connexion.");
  }
  const corps = await res.json().catch(() => ({}));
  if (!res.ok) throw new ErreurApi(res.status, corps.error ?? "Une erreur est survenue.", corps.details);
  return corps as T;
}

export interface Utilisateur {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ReponseAuth {
  token: string;
  user: Utilisateur;
}

export interface BilanServeur {
  id: string;
  type: "nature" | "etat";
  scores: DoshaScores;
  date: string;
}

export const api = {
  inscription: (d: { email: string; password: string; firstName?: string }) =>
    appel<ReponseAuth>("/auth/register", { method: "POST", body: JSON.stringify(d) }),
  connexion: (d: { email: string; password: string }) =>
    appel<ReponseAuth>("/auth/login", { method: "POST", body: JSON.stringify(d) }),
  profil: (token: string) => appel<{ user: Utilisateur & { _id?: string } }>("/auth/profile", { token }),
  bilans: (token: string) => appel<{ nature: BilanServeur | null; etats: BilanServeur[] }>("/bilans", { token }),
  enregistrerBilan: (token: string, b: { type: "nature" | "etat"; scores: DoshaScores; date?: string }) =>
    appel<{ bilan: BilanServeur }>("/bilans", { method: "POST", token, body: JSON.stringify(b) }),
  effacerBilans: (token: string) => appel<{ deleted: number }>("/bilans", { method: "DELETE", token }),
};
