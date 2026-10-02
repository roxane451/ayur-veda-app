/**
 * La rubrique « Comprendre », rangée en livres comme les traités anciens.
 * Les chapitres sont numérotés à la suite d'un livre à l'autre.
 */
import { CONTENU_PAYANT } from "@/lib/offre";

export interface Chapitre {
  titre: string;
  href: string;
}

export interface Livre {
  num: string;
  titre: string;
  chapitres: Chapitre[];
  /** Réservé à l'abonnement */
  payant?: boolean;
}

const TOUS_LIVRES: Livre[] = [
  {
    num: "I",
    titre: "Les principes",
    chapitres: [
      { titre: "La science de la vie", href: "/comprendre" },
      { titre: "Les cinq éléments", href: "/comprendre/elements" },
      { titre: "Les vingt qualités", href: "/comprendre/qualites" },
      { titre: "Les trois doshas", href: "/comprendre/doshas" },
    ],
  },
  {
    num: "II",
    titre: "Le corps",
    chapitres: [
      { titre: "La constitution", href: "/comprendre/constitution" },
      { titre: "Les tissus", href: "/comprendre/tissus" },
      { titre: "L'esprit", href: "/comprendre/esprit" },
    ],
  },
  {
    num: "III",
    titre: "La nourriture",
    chapitres: [
      { titre: "Les six saveurs", href: "/comprendre/saveurs" },
      { titre: "L'action des aliments", href: "/comprendre/action-des-aliments" },
      { titre: "Agni, le feu digestif", href: "/comprendre/agni" },
      { titre: "Les règles du repas", href: "/comprendre/regles-du-repas" },
    ],
  },
  {
    num: "IV",
    payant: true,
    titre: "Rester en bonne santé",
    chapitres: [
      { titre: "Les trois piliers", href: "/comprendre/trois-piliers" },
      { titre: "La journée", href: "/comprendre/journee" },
      { titre: "Les saisons", href: "/comprendre/saisons" },
      { titre: "Le sommeil", href: "/comprendre/sommeil" },
      { titre: "Les besoins naturels", href: "/comprendre/besoins-naturels" },
      { titre: "Les âges de la vie", href: "/comprendre/ages-de-la-vie" },
    ],
  },
  {
    num: "V",
    payant: true,
    titre: "Le déséquilibre",
    chapitres: [
      { titre: "Les trois causes", href: "/comprendre/trois-causes" },
      { titre: "Les six étapes", href: "/comprendre/desequilibre" },
    ],
  },
];

/** Les livres affichés : sans les livres réservés quand le contenu payant est masqué. */
export const LIVRES: Livre[] = TOUS_LIVRES.filter((l) => CONTENU_PAYANT || !l.payant);

/** Les adresses des chapitres réservés à l'abonnement. */
export const CHAPITRES_PAYANTS = TOUS_LIVRES.filter((l) => l.payant).flatMap((l) => l.chapitres.map((c) => c.href));

/** Les pages de fin de rubrique, hors livres. */
export const ANNEXES: Chapitre[] = [
  { titre: "Les textes", href: "/comprendre/textes" },
];

/** Toutes les pages de la rubrique, dans l'ordre de lecture. */
export const SOUS_PAGES: Chapitre[] = [...LIVRES.flatMap((l) => l.chapitres), ...ANNEXES];

/** Le livre auquel appartient une adresse, s'il y en a un. */
export const livreDe = (href: string) => LIVRES.find((l) => l.chapitres.some((c) => c.href === href));

/** Le numéro d'un chapitre, compté sur l'ensemble des livres (1 pour le premier). */
export const numeroChapitre = (href: string) => LIVRES.flatMap((l) => l.chapitres).findIndex((c) => c.href === href) + 1;

export const lienSouligne =
  "inline-flex items-center gap-2 font-bold underline decoration-citron decoration-[3px] underline-offset-[6px]";
