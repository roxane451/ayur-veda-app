/**
 * Les textes anciens cités sur le site, et la forme des références.
 * Les numéros de versets suivent les éditions courantes de Chaukhambha (Yadavji Trikamji) et peuvent varier d'une édition à l'autre.
 * Vérifiés en octobre 2026 sur carakasamhitaonline.com, siva.sh, wisdomlib.org et easyayurveda.com.
 */

export type TexteId = "charaka" | "sushruta" | "vagbhata" | "bhavaprakasha";

export interface Texte {
  id: TexteId;
  /** Nom du traité */
  nom: string;
  /** Auteur, tel qu'on le cite dans les références */
  auteur: string;
  deva: string;
  /** Qui l'a écrit, d'après la tradition */
  attribution: string;
  date: string;
  texte: string;
}

export const TEXTES: Texte[] = [
  {
    id: "charaka",
    nom: "Charaka Saṃhitā",
    auteur: "Charaka",
    deva: "चरकसंहिता",
    attribution: "Charaka, d'après l'enseignement d'Agniveśa",
    date: "Rédigée entre le IIe siècle avant et le IIe siècle de notre ère",
    texte: "La médecine interne. Huit livres, cent vingt chapitres. C'est notre première source.",
  },
  {
    id: "sushruta",
    nom: "Suśruta Saṃhitā",
    auteur: "Suśruta",
    deva: "सुश्रुतसंहिता",
    attribution: "Suśruta",
    date: "Premiers siècles de notre ère",
    texte: "La chirurgie, le corps et les étapes de la maladie. Six livres. Notre seconde source.",
  },
  {
    id: "vagbhata",
    nom: "Aṣṭāṅga Hṛdaya",
    auteur: "Vāgbhaṭa",
    deva: "अष्टाङ्गहृदय",
    attribution: "Vāgbhaṭa",
    date: "Vers le VIIe siècle",
    texte: "Une synthèse des deux précédents, en vers. Citée quand elle précise un point.",
  },
  {
    id: "bhavaprakasha",
    nom: "Bhāvaprakāśa",
    auteur: "Bhāvamiśra",
    deva: "भावप्रकाश",
    attribution: "Bhāvamiśra",
    date: "XVIe siècle",
    texte: "La pharmacopée, plante par plante. Citée pour les épices et les ingrédients.",
  },
];

/** Les livres (sthāna) des traités, avec l'abréviation utilisée dans les références. */
export const LIVRES_TRAITES = [
  { abr: "Sū", nom: "Sūtrasthāna", fr: "les principes" },
  { abr: "Ni", nom: "Nidānasthāna", fr: "les causes" },
  { abr: "Vi", nom: "Vimānasthāna", fr: "les mesures" },
  { abr: "Śā", nom: "Śārīrasthāna", fr: "le corps" },
  { abr: "In", nom: "Indriyasthāna", fr: "le pronostic" },
  { abr: "Ci", nom: "Cikitsāsthāna", fr: "les traitements" },
  { abr: "Ka", nom: "Kalpasthāna", fr: "les préparations" },
  { abr: "Si", nom: "Siddhisthāna", fr: "les purifications" },
];

/** Une référence : le traité, le livre, le chapitre (et le verset), et ce qu'on y trouve. */
export interface Ref {
  texte: TexteId;
  /** « Sūtrasthāna 26.84 », « Śārīrasthāna 1 » */
  passage: string;
  sujet: string;
}

export const nomTexte = (id: TexteId) => TEXTES.find((t) => t.id === id)!.nom;
