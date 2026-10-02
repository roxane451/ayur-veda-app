/**
 * Livre V, chapitre « Les trois causes » (trividha hetu).
 * D'après Charaka, Sūtrasthāna 11 et Śārīrasthāna 1. Versets vérifiés en octobre 2026, voir data/sources.ts.
 */
import type { Ref } from "./sources";

export const TROIS_CAUSES = [
  { deva: "असात्म्येन्द्रियार्थसंयोग", titre: "Les sens mal employés", texte: "Trop, trop peu ou de travers.", fond: "bg-[#8DB9B0] text-encre" },
  { deva: "प्रज्ञापराध", titre: "L'erreur de jugement", texte: "Faire ce que l'on sait nuisible.", fond: "bg-aubergine text-pistache" },
  { deva: "परिणाम", titre: "Le temps", texte: "Les saisons et les années.", fond: "bg-citron text-encre" },
];

/** Pour chaque sens : trop, trop peu, de travers (Charaka, Sū 11.37). */
export const SENS_MAL_EMPLOYES: [string, string, string, string][] = [
  ["La vue", "Fixer une lumière trop vive", "Ne rien regarder", "Regarder de trop près, ou ce qui effraie"],
  ["L'ouïe", "Des bruits trop forts", "Le silence complet", "Des paroles dures, de mauvaises nouvelles"],
  ["L'odorat", "Des odeurs trop fortes", "Ne rien sentir", "Des odeurs fétides ou toxiques"],
  ["Le goût", "Trop d'une même saveur", "S'en priver", "Manger contre les règles du repas"],
  ["Le toucher", "Trop de froid, de chaud, de bains", "S'en priver", "Le brusque passage du chaud au froid"],
];

export const TROIS_FACULTES = [
  { deva: "धी", sanskrit: "dhī", titre: "Le discernement", texte: "On ne voit plus ce qui est bon pour soi." },
  { deva: "धृति", sanskrit: "dhṛti", titre: "La maîtrise", texte: "On le voit, mais on ne se retient pas." },
  { deva: "स्मृति", sanskrit: "smṛti", titre: "La mémoire", texte: "On oublie ce que l'expérience avait appris." },
];

export const TEMPS = [
  { titre: "Trop", texte: "Un hiver trop froid, un été trop chaud.", trait: "border-aubergine" },
  { titre: "Trop peu", texte: "Un hiver doux, un été sans chaleur.", trait: "border-[#8DB9B0]" },
  { titre: "De travers", texte: "Le froid en été, la chaleur en hiver.", trait: "border-citron" },
];

export const REFS_CAUSES: Ref[] = [
  { texte: "charaka", passage: "Sūtrasthāna 11.37 à 11.43", sujet: "Les trois causes des maladies" },
  { texte: "charaka", passage: "Sūtrasthāna 11.37", sujet: "Les sens mal employés" },
  { texte: "charaka", passage: "Śārīrasthāna 1.98 à 1.109", sujet: "Le discernement, la maîtrise, la mémoire, et l'erreur de jugement" },
  { texte: "charaka", passage: "Sūtrasthāna 11.42", sujet: "Le temps" },
];
