/**
 * Informations légales du site.
 * Les valeurs nulles sont à compléter : elles s'affichent surlignées « à compléter » sur les pages.
 */

export interface Personne {
  /** Particulier non professionnel qui ne publie pas son nom (LCEN, art. 6-III-2). */
  anonyme: boolean;
  nom: string | null;
  statut: string | null;
  adresse: string | null;
  siret: string | null;
  email: string | null;
  telephone: string | null;
  directeurPublication: string | null;
}

export interface Hebergeur {
  nom: string | null;
  adresse: string | null;
  telephone: string | null;
  /** Pays où se trouvent les serveurs. */
  pays: string | null;
}

export const EDITEUR: Personne = {
  anonyme: true,
  nom: null,
  statut: null,
  adresse: null,
  siret: null,
  email: "contact@ayur-veda.fr",
  telephone: null,
  directeurPublication: null,
};

export const HEBERGEUR: Hebergeur = {
  nom: "OVH SAS",
  adresse: "2 rue Kellermann, 59100 Roubaix, France",
  telephone: "+33 9 72 10 10 07",
  pays: "France",
};

export const SITE = "ayur-veda.fr";

/** Date de la dernière mise à jour des trois pages. */
export const MISE_A_JOUR = "2 octobre 2026";

/** Âge minimum pour créer un compte (âge du consentement numérique en France). */
export const AGE_MINIMUM = 15;

export const PAGES_LEGALES = [
  { titre: "Mentions légales", href: "/mentions-legales" },
  { titre: "Confidentialité", href: "/confidentialite" },
  { titre: "CGU", href: "/cgu" },
];
