/**
 * Livre III, chapitre « L'action des aliments ».
 * [À VALIDER] par une praticienne, en particulier les numéros de versets.
 */
import type { Ref } from "./sources";

/** Les quatre façons d'agir, de la plus faible à la plus forte. */
export const QUI_L_EMPORTE = [
  { deva: "रस", sanskrit: "rasa", nom: "La saveur", texte: "Ce qu'on sent sur la langue.", fond: "bg-carte text-encre", h: 120 },
  { deva: "विपाक", sanskrit: "vipāka", nom: "L'effet après digestion", texte: "Il l'emporte sur la saveur.", fond: "bg-surface text-encre", h: 165 },
  { deva: "वीर्य", sanskrit: "vīrya", nom: "La puissance", texte: "Chauffante ou rafraîchissante, elle l'emporte sur les deux.", fond: "bg-citron text-encre", h: 210 },
  {
    deva: "प्रभाव",
    sanskrit: "prabhāva",
    nom: "L'action propre",
    texte: "Ce qu'un aliment fait sans qu'on puisse l'expliquer. Elle l'emporte sur tout.",
    fond: "bg-aubergine text-pistache",
    h: 255,
  },
];

export const EXEMPLES_CUISINE: [string, string][] = [
  ["Le miel", "Saveur douce, mais il allège et assèche."],
  ["Le gingembre sec", "Saveur piquante, effet doux après digestion."],
  ["Le ghee", "Comme le lait, il est doux et onctueux, mais lui réveille le feu digestif."],
];

export const REFS_ACTION: Ref[] = [
  { texte: "vagbhata", passage: "Sūtrasthāna 9.26", sujet: "Ce qui l'emporte, de la saveur à l'action propre" },
  { texte: "charaka", passage: "Sūtrasthāna 26.64 et 26.65", sujet: "Vīrya, chauffant ou rafraîchissant" },
  { texte: "charaka", passage: "Sūtrasthāna 26.57 et 26.58", sujet: "Les trois vipāka" },
  { texte: "sushruta", passage: "Sūtrasthāna 40", sujet: "Deux vipāka seulement, lourd et léger" },
  { texte: "charaka", passage: "Sūtrasthāna 26.67 à 26.69", sujet: "L'action propre, citraka et dantī" },
  { texte: "charaka", passage: "Sūtrasthāna 27", sujet: "Le miel, le gingembre, le ghee" },
];
