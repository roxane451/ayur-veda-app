/**
 * Livre I, « Les principes » : la science de la vie et les cinq éléments.
 * Versets vérifiés en octobre 2026, voir data/sources.ts.
 */
import type { DoshaKey } from "@/lib/doshaLogic";
import type { Ref } from "./sources";

/* ───────── La science de la vie ───────── */

/** La vie, union de quatre choses (Charaka, Sū 1.42). */
export const QUATRE_DE_LA_VIE = [
  { deva: "शरीर", sanskrit: "śarīra", nom: "Le corps", fond: "bg-carte text-encre" },
  { deva: "इन्द्रिय", sanskrit: "indriya", nom: "Les sens", fond: "bg-[#8DB9B0] text-encre" },
  { deva: "सत्त्व", sanskrit: "sattva", nom: "L'esprit", fond: "bg-citron text-encre" },
  { deva: "आत्मन्", sanskrit: "ātman", nom: "Le soi", fond: "bg-aubergine text-pistache" },
];

/** Les quatre sortes de vie (Charaka, Sū 30.24). */
export const SORTES_DE_VIE = [
  { deva: "हित", sanskrit: "hita", titre: "Une vie bonne", texte: "Utile aux autres, honnête, mesurée, attentive à ce qui est juste." },
  { deva: "अहित", sanskrit: "ahita", titre: "Une vie néfaste", texte: "Son contraire, qui nuit aux autres comme à soi." },
  {
    deva: "सुख",
    sanskrit: "sukha",
    titre: "Une vie heureuse",
    texte: "Sans maladie du corps ni de l'esprit, avec la force, les moyens et la liberté d'agir.",
  },
  { deva: "दुःख", sanskrit: "duḥkha", titre: "Une vie malheureuse", texte: "Son contraire, marquée par la maladie et l'empêchement." },
];

/** La santé selon Suśruta (Sū 15.41). */
export const SANTE: [string, string][] = [
  ["Les doshas", "en équilibre"],
  ["Le feu digestif", "équilibré"],
  ["Les tissus et les déchets", "qui fonctionnent bien"],
  ["Le soi, les sens et l'esprit", "sereins"],
];

export const REFS_SCIENCE_VIE: Ref[] = [
  { texte: "charaka", passage: "Sūtrasthāna 1.42", sujet: "La vie, union du corps, des sens, de l'esprit et du soi" },
  { texte: "charaka", passage: "Sūtrasthāna 1.41", sujet: "L'Ayurveda, connaissance de ce qui est bon ou mauvais pour la vie" },
  { texte: "charaka", passage: "Sūtrasthāna 30.24", sujet: "Les quatre sortes de vie" },
  { texte: "sushruta", passage: "Sūtrasthāna 15.41", sujet: "La définition de la santé" },
  { texte: "charaka", passage: "Sūtrasthāna 30.26", sujet: "Les deux buts de l'Ayurveda" },
];

/* ───────── Les cinq éléments ───────── */

export type ElementId = "ether" | "air" | "feu" | "eau" | "terre";

export const CINQ_ELEMENTS: {
  id: ElementId;
  deva: string;
  sanskrit: string;
  nom: string;
  qualite: string;
  organe: string;
  corps: string;
  fond: string;
}[] = [
  { id: "ether", deva: "आकाश", sanskrit: "ākāśa", nom: "L'éther", qualite: "Le son", organe: "l'ouïe", corps: "L'espace, les cavités et les canaux du corps.", fond: "bg-carte" },
  { id: "air", deva: "वायु", sanskrit: "vāyu", nom: "L'air", qualite: "Le toucher", organe: "la peau", corps: "Le souffle et tous les mouvements.", fond: "bg-[#8DB9B0]" },
  { id: "feu", deva: "तेजस्", sanskrit: "tejas", nom: "Le feu", qualite: "La forme", organe: "la vue", corps: "La chaleur, la digestion, l'éclat du teint.", fond: "bg-citron" },
  { id: "eau", deva: "जल", sanskrit: "jala", nom: "L'eau", qualite: "Le goût", organe: "la langue", corps: "Les liquides du corps, le plasma, la salive.", fond: "bg-[#DCBFD5]" },
  { id: "terre", deva: "पृथ्वी", sanskrit: "pṛthvī", nom: "La terre", qualite: "L'odeur", organe: "le nez", corps: "Les os, les muscles, tout ce qui est solide.", fond: "bg-surface" },
];

/** Les éléments qui dominent dans chaque saveur (Charaka, Sū 26.40). */
export const SAVEURS_ELEMENTS: [string, string][] = [
  ["Sucré", "terre et eau"],
  ["Acide", "terre et feu"],
  ["Salé", "eau et feu"],
  ["Piquant", "air et feu"],
  ["Amer", "air et éther"],
  ["Astringent", "air et terre"],
];

/** Les doshas comparés à trois forces du monde (Suśruta, Sū 21.8). */
export const TROIS_FORCES: { dosha: DoshaKey; image: string; texte: string; element: ElementId }[] = [
  { dosha: "vata", image: "comme le vent", texte: "Il disperse et met en mouvement.", element: "air" },
  { dosha: "pitta", image: "comme le soleil", texte: "Il prend et absorbe.", element: "feu" },
  { dosha: "kapha", image: "comme la lune", texte: "Il donne et nourrit.", element: "eau" },
];

export const REFS_ELEMENTS: Ref[] = [
  { texte: "charaka", passage: "Śārīrasthāna 1.27 et 1.28", sujet: "Les éléments et leurs qualités, du son à l'odeur" },
  { texte: "sushruta", passage: "Sūtrasthāna 42.3", sujet: "Les saveurs et leurs éléments" },
  { texte: "charaka", passage: "Sūtrasthāna 26.40", sujet: "Le sucré, né de l'eau seule selon Charaka" },
  { texte: "sushruta", passage: "Sūtrasthāna 21.8", sujet: "Le vent, le soleil et la lune" },
];
