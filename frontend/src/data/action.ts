/**
 * Livre III, chapitre « L'action des aliments ».
 * Versets vérifiés en octobre 2026, voir data/sources.ts.
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
  ["Le miel", "Saveur douce, mais il est sec et fait baisser Kapha."],
  ["Le ghee", "Comme le lait, il est doux et onctueux, mais lui réveille le feu digestif."],
];

export const REFS_ACTION: Ref[] = [
  { texte: "vagbhata", passage: "Sūtrasthāna 9.23 à 9.25", sujet: "Ce qui l'emporte, de la saveur à l'action propre, à force égale" },
  { texte: "charaka", passage: "Sūtrasthāna 26.64 et 26.65", sujet: "Vīrya, chauffant ou rafraîchissant" },
  { texte: "charaka", passage: "Sūtrasthāna 26.57 et 26.58", sujet: "Les trois vipāka" },
  { texte: "sushruta", passage: "Sūtrasthāna 40.10 à 40.12", sujet: "Deux vipāka seulement, le doux et le piquant" },
  { texte: "charaka", passage: "Sūtrasthāna 26.67 à 26.69", sujet: "L'action propre, citraka et dantī" },
  { texte: "charaka", passage: "Sūtrasthāna 27", sujet: "Le miel et le ghee" },
];
