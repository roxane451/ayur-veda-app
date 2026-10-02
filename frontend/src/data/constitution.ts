/**
 * Livre II, chapitre « La constitution » (prakṛti).
 * D'après Charaka, Vimānasthāna 8, et Suśruta, Śārīrasthāna 4.
 * Versets vérifiés en octobre 2026, voir data/sources.ts.
 */
import type { DoshaKey } from "@/lib/doshaLogic";
import type { Ref } from "./sources";

/** Ce qui fixe la nature au moment de la conception (Charaka, Vi 8.95). */
export const FACTEURS_PRAKRITI = [
  { deva: "शुक्रशोणित", titre: "La semence des parents", texte: "Ce que chacun des deux transmet.", trait: "border-citron" },
  { deva: "काल गर्भाशय", titre: "Le moment et la matrice", texte: "Le moment de la conception, ou la durée de la grossesse selon les lectures, et l'état de l'utérus.", trait: "border-[#8DB9B0]" },
  { deva: "आहार विहार", titre: "La vie de la mère", texte: "Ce qu'elle mange et la façon dont elle vit.", trait: "border-[#DCBFD5]" },
  { deva: "महाभूत", titre: "Les éléments", texte: "Ceux qui dominent au moment de la conception.", trait: "border-aubergine" },
];

export const SEPT_NATURES = [
  { n: "1", titre: "La nature équilibrée", texte: "Les trois doshas à parts égales. Pour Charaka, elle réunit toutes les qualités." },
  { n: "3", titre: "Les natures simples", texte: "Un dosha domine, Vata, Pitta ou Kapha." },
  { n: "3", titre: "Les natures doubles", texte: "Deux doshas dominent ensemble." },
];

/** Les portraits de Charaka, dans son ordre (Vi 8.96 à 8.98). */
export const PORTRAITS: { dosha: DoshaKey; deva: string; image: string; traits: string[] }[] = [
  {
    dosha: "kapha",
    deva: "कफ",
    image: "comme la lune",
    traits: [
      "Un corps solide, bien bâti, aux articulations fermes",
      "Une peau douce et lisse, un regard clair",
      "Des gestes lents, une parole posée, une voix claire",
      "Peu de faim, peu de soif, peu de transpiration",
      "Calme, lent à s'émouvoir et à se fâcher",
      "La plus grande force et la plus longue vie, d'après Charaka",
    ],
  },
  {
    dosha: "pitta",
    deva: "पित्त",
    image: "comme le soleil",
    traits: [
      "Un corps chaud, qui supporte mal la chaleur",
      "Une peau claire et fine, des grains de beauté",
      "Des cheveux qui grisonnent ou tombent tôt",
      "Beaucoup de faim et de soif",
      "Courageux, vif, l'esprit pénétrant",
      "Une force et une vie moyennes",
    ],
  },
  {
    dosha: "vata",
    deva: "वात",
    image: "comme le vent",
    traits: [
      "Un corps sec, fin, qui craque aux articulations",
      "Des gestes rapides, une démarche légère",
      "Parle beaucoup, dort peu et légèrement",
      "Supporte mal le froid",
      "Commence vite, retient peu, change souvent d'avis",
      "La force et la vie les plus fragiles, d'après Charaka",
    ],
  },
];

export const REFS_CONSTITUTION: Ref[] = [
  { texte: "charaka", passage: "Vimānasthāna 8.95", sujet: "Ce qui fixe la nature à la conception" },
  { texte: "sushruta", passage: "Śārīrasthāna 4.62", sujet: "Les sept natures" },
  { texte: "charaka", passage: "Vimānasthāna 8.99 et 8.100", sujet: "La nature équilibrée, qui réunit toutes les qualités" },
  { texte: "charaka", passage: "Vimānasthāna 8.96 à 8.98", sujet: "Les portraits de Kapha, Pitta et Vata" },
];
