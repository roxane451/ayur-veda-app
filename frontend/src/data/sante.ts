/**
 * Livre IV, « Rester en bonne santé » : les saisons des textes, le sommeil, les besoins naturels.
 * D'après Charaka, Sūtrasthāna 6, 7 et 21. [À VALIDER] par une praticienne, en particulier les versets.
 */
import type { Ref } from "./sources";

/* ───────── Les six saisons (Charaka, Sū 6) ───────── */

export const SIX_SAISONS = [
  { deva: "शिशिर", sanskrit: "śiśira", nom: "La fin de l'hiver", periode: "mi-janv. – mi-mars", doshas: "Kapha s'amasse", couleur: "#E8EBD6" },
  { deva: "वसन्त", sanskrit: "vasanta", nom: "Le printemps", periode: "mi-mars – mi-mai", doshas: "Kapha déborde", couleur: "#BBD439" },
  { deva: "ग्रीष्म", sanskrit: "grīṣma", nom: "L'été", periode: "mi-mai – mi-juil.", doshas: "Vata s'amasse", couleur: "#DCBFD5" },
  { deva: "वर्षा", sanskrit: "varṣā", nom: "Les pluies", periode: "mi-juil. – mi-sept.", doshas: "Vata déborde, Pitta s'amasse", couleur: "#8DB9B0" },
  { deva: "शरद्", sanskrit: "śarad", nom: "L'automne indien", periode: "mi-sept. – mi-nov.", doshas: "Pitta déborde", couleur: "#5B2A4E" },
  { deva: "हेमन्त", sanskrit: "hemanta", nom: "Le début de l'hiver", periode: "mi-nov. – mi-janv.", doshas: "La force est au plus haut", couleur: "#FBFCF4" },
];

export const CONSEILS_SAISONS: [string, string][] = [
  ["Le début et la fin de l'hiver", "Le feu digestif est fort. Des repas nourrissants, gras, des laitages et de la viande, un massage à l'huile, des vêtements chauds."],
  ["Le printemps", "Kapha fond. Des repas légers et secs, de l'orge et du miel, de l'exercice, pas de sieste."],
  ["L'été", "La chaleur épuise. Des aliments doux, frais et liquides, du lait et du riz, la sieste permise."],
  ["Les pluies", "Le feu digestif faiblit. Des repas légers et chauds, de l'eau bouillie, un peu de miel."],
  ["L'automne indien", "Pitta déborde. Des saveurs douces, amères et astringentes, du ghee, la fraîcheur du soir."],
];

export const REFS_SAISONS: Ref[] = [
  { texte: "charaka", passage: "Sūtrasthāna 6.4 à 6.8", sujet: "Les six saisons et les deux moitiés de l'année" },
  { texte: "charaka", passage: "Sūtrasthāna 6.9 à 6.48", sujet: "La conduite de chaque saison" },
  { texte: "vagbhata", passage: "Sūtrasthāna 3.58", sujet: "La transition entre deux saisons" },
];

/* ───────── Le sommeil (Charaka, Sū 21) ───────── */

export const CE_QUI_DEPEND_DU_SOMMEIL: [string, string][] = [
  ["Le bonheur", "Le malheur"],
  ["L'embonpoint", "La maigreur"],
  ["La force", "La faiblesse"],
  ["La vigueur", "L'impuissance"],
  ["Le savoir", "L'ignorance"],
  ["La vie", "La mort"],
];

export const SIESTE = [
  { titre: "En été", texte: "Les nuits sont courtes et Vata s'amasse. La sieste est permise à tous.", trait: "border-citron" },
  {
    titre: "Pour certains",
    texte: "Les enfants, les personnes âgées, les malades, ceux qu'un effort, un voyage ou un chagrin ont épuisés.",
    trait: "border-[#8DB9B0]",
  },
  {
    titre: "Pour les autres",
    texte: "En dehors de l'été, elle alourdit et fait monter Kapha et Pitta. À éviter surtout si l'on est corpulent.",
    trait: "border-aubergine",
  },
];

export const RAMENER_LE_SOMMEIL = [
  "Un massage à l'huile, et un peu d'huile sur la tête",
  "Un bain tiède",
  "Un bol de lait le soir",
  "Un lit confortable, une chambre calme et sombre",
  "Des parfums et des sons agréables",
  "L'esprit au repos, sans soucis",
];

export const REFS_SOMMEIL: Ref[] = [
  { texte: "charaka", passage: "Sūtrasthāna 21.36", sujet: "Ce qui dépend du sommeil" },
  { texte: "charaka", passage: "Sūtrasthāna 21.39 à 21.45", sujet: "La sieste, permise et déconseillée" },
  { texte: "charaka", passage: "Sūtrasthāna 21.50", sujet: "Veiller, dormir le jour, somnoler assis" },
  { texte: "charaka", passage: "Sūtrasthāna 21.52 à 21.54", sujet: "Ce qui ramène le sommeil" },
];

/* ───────── Les besoins naturels (Charaka, Sū 7) ───────── */

export const TREIZE_BESOINS: [string, string][] = [
  ["मूत्र", "Uriner"],
  ["पुरीष", "Aller à la selle"],
  ["शुक्र", "L'émission séminale"],
  ["वात", "Les gaz"],
  ["छर्दि", "Vomir"],
  ["क्षवथु", "Éternuer"],
  ["उद्गार", "Roter"],
  ["जृम्भा", "Bâiller"],
  ["क्षुधा", "La faim"],
  ["तृष्णा", "La soif"],
  ["बाष्प", "Les larmes"],
  ["निद्रा", "Le sommeil"],
  ["श्वास", "Reprendre son souffle après l'effort"],
];

export const ELANS_A_RETENIR: [string, string][] = [
  ["Dans l'esprit", "L'avidité, le chagrin, la peur, la colère, l'orgueil, l'impudeur, la jalousie, la convoitise, la malveillance."],
  ["Dans la parole", "Les mots durs, la médisance, le mensonge, les paroles hors de propos."],
  ["Dans les gestes", "Faire du mal à autrui, prendre ce qui n'est pas à soi, les excès de toute sorte."],
];

export const REFS_BESOINS: Ref[] = [
  { texte: "charaka", passage: "Sūtrasthāna 7.3 à 7.25", sujet: "Les treize besoins à ne pas retenir" },
  { texte: "charaka", passage: "Sūtrasthāna 7.26 à 7.30", sujet: "Les élans à retenir" },
];
