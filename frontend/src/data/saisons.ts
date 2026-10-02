/**
 * La saison du moment, pour l'accueil.
 * Contenus repris de la page « Au quotidien » (ritucharya), en version courte.
 */
import type { Ref } from "./sources";

export type SaisonId = "automne" | "hiver" | "printemps" | "ete";

export interface SaisonAccueil {
  id: SaisonId;
  nom: string;
  dosha: string;
  presentation: string;
  assiette: string;
  onEvite: string;
  matin: string[];
  journee: string[];
  soir: string[];
}

export const SAISONS: Record<SaisonId, SaisonAccueil> = {
  automne: {
    id: "automne",
    nom: "L'automne",
    dosha: "Vata",
    presentation:
      "De septembre à novembre, la lumière baisse et le froid arrive. Vata s'accumule, et cela se remarque à la peau qui sèche, au sommeil plus léger ou aux pensées qui s'éparpillent.",
    assiette: "Les saveurs sucrée, acide et salée, qui apaisent Vata. Courges, patates douces, riz, avoine, lentilles corail bien cuites, dattes, amandes trempées, lait chaud, ghee. Gingembre, cumin, fenouil, cardamome, cannelle.",
    onEvite: "le cru et le glacé, ce qui est sec et croustillant, les repas sautés et le jeûne.",
    matin: [
      "Se masser à l'huile de sésame tiède, en insistant sur la tête, les oreilles et les pieds",
      "Une goutte d'huile tiède dans chaque narine (nasya)",
    ],
    journee: [
      "Le repas principal à midi, à heures fixes",
      "Bouger à la moitié de ses forces, et s'arrêter quand le front perle",
    ],
    soir: [
      "Masser la plante des pieds à l'huile, pour mieux dormir",
      "Ne pas veiller tard",
    ],
  },
  hiver: {
    id: "hiver",
    nom: "L'hiver",
    dosha: "Kapha",
    presentation:
      "De décembre à février, le froid réveille l'appétit. Les textes anciens conseillent alors une cuisine chaude et nourrissante, et Kapha commence doucement à s'accumuler.",
    assiette: "Le feu digestif est à son plus fort. Des plats nourrissants et un peu gras, aux saveurs sucrée, acide et salée. Céréales, lait et ghee, bouillons, sucre complet. Gingembre, poivre, cannelle.",
    onEvite: "les repas trop légers, le jeûne et les boissons froides. Sans nourriture assez riche, ce feu s'en prend au corps.",
    matin: [
      "Se masser à l'huile, tête comprise",
      "Prendre le soleil du matin",
    ],
    journee: [
      "Des repas copieux, à faim franche",
      "Se couvrir chaudement, pieds compris",
    ],
    soir: [
      "Se laver à l'eau chaude",
      "Une chambre chaude et une couverture épaisse",
    ],
  },
  printemps: {
    id: "printemps",
    nom: "Le printemps",
    dosha: "Kapha",
    presentation:
      "De mars à mai, le Kapha accumulé pendant l'hiver fond avec la chaleur. C'est la saison des rhumes, des allergies et des coups de fatigue.",
    assiette: "Le Kapha de l'hiver fond. Des aliments légers et secs, aux saveurs amère, piquante et astringente. Orge, millet, sarrasin, légumes verts, un peu de miel.",
    onEvite: "le lourd, le gras, le sucré, l'acide, et la sieste.",
    matin: [
      "Bouger jusqu'à transpirer un peu",
      "Frictionner le corps avec une poudre sèche, de la farine de pois chiche par exemple (udvartana)",
    ],
    journee: [
      "De l'eau tiède avec un peu de miel, jamais chaud",
      "Pas de sieste",
    ],
    soir: [
      "Un dîner léger",
      "Un moment dans un jardin ou sous les arbres",
    ],
  },
  ete: {
    id: "ete",
    nom: "L'été",
    dosha: "Pitta",
    presentation:
      "De juin à août, la chaleur fait monter Pitta. La peau chauffe, on s'irrite plus vite et les nuits raccourcissent.",
    assiette: "Des aliments doux, frais et liquides. Riz au lait, fruits juteux, lait et ghee, eau fraîche gardée dans une cruche en terre.",
    onEvite: "le salé, l'acide, le piquant, l'alcool et l'effort aux heures chaudes.",
    matin: [
      "Bouger tôt, et seulement un peu",
      "Se rafraîchir à l'eau fraîche",
    ],
    journee: [
      "Une sieste au frais, permise en cette seule saison",
      "Des vêtements légers et clairs",
    ],
    soir: [
      "Un dîner doux et frais",
      "Profiter de la fraîcheur du soir et du clair de lune",
    ],
  },
};

/** Saison selon le mois (hémisphère nord). */
export function saisonDuMoment(date: Date = new Date()): SaisonAccueil {
  const m = date.getMonth() + 1;
  if (m >= 9 && m <= 11) return SAISONS.automne;
  if (m === 12 || m <= 2) return SAISONS.hiver;
  if (m <= 5) return SAISONS.printemps;
  return SAISONS.ete;
}

/* ───────── La page « Les saisons » (ritucharya) ───────── */

export interface SaisonDetail {
  id: SaisonId;
  court: string; // « Automne »
  periode: string;
  dosha: "vata" | "pitta" | "kapha";
  qualites: string[];
  intro: string;
  photo: string;
  assiette: string[];
  limiter: string[];
  matin: string[];
  journee: string[];
  soir: string[];
  plantes: { nom: string; texte: string }[];
  /** Les passages des textes d'où viennent les conseils. */
  refs: Ref[];
}

/** [À VALIDER] par une praticienne (en particulier les plantes). */
export const SAISONS_DETAIL: SaisonDetail[] = [
  {
    id: "automne",
    court: "Automne",
    periode: "sept. – nov.",
    dosha: "vata",
    qualites: ["Sec", "Froid", "Mobile"],
    intro:
      "En Europe, l'automne est venteux, sec puis pluvieux. Ces qualités rappellent celles de Vata, et beaucoup ressentent alors de la sécheresse, de l'anxiété ou du mal à se concentrer. Dans le calendrier indien, ces mois correspondent à śarad, où les textes situent plutôt l'aggravation de Pitta.",
    photo: "feuilles d'automne et tasse fumante sur un tissu block print",
    assiette: [
      "Les saveurs sucrée, acide et salée, qui apaisent Vata",
      "Des plats chauds et onctueux, soupes, ragoûts, porridges",
      "Courges, patates douces, carottes, riz, avoine",
      "Des lentilles corail bien cuites, des amandes trempées, des dattes",
      "Du lait chaud, du ghee, de l'huile de sésame",
      "Gingembre, cumin, fenouil, cardamome, cannelle",
    ],
    limiter: [
      "Le cru et le glacé",
      "Ce qui est sec et croustillant, biscottes ou galettes de riz soufflé",
      "Les repas sautés et le jeûne",
      "Le vent froid sur la tête et le cou",
    ],
    matin: [
      "Se masser à l'huile de sésame tiède, en insistant sur la tête, les oreilles et les pieds (abhyanga)",
      "Une goutte d'huile tiède dans chaque narine (nasya), que Charaka conseille justement en automne",
      "Garder une gorgée d'huile de sésame en bouche quelques minutes (gaṇḍūṣa)",
      "Une tasse d'eau chaude",
    ],
    journee: [
      "Le repas principal à midi, à heures fixes",
      "Bouger à la moitié de ses forces, et s'arrêter quand le front perle",
      "Se couvrir le cou et la tête contre le vent",
      "Une chose à la fois, sans se disperser",
    ],
    soir: [
      "Un dîner chaud, à heure fixe",
      "Masser la plante des pieds à l'huile, pour mieux dormir",
      "Un lait chaud à la cardamome et à la muscade",
      "Ne pas veiller tard, car la veille fait monter Vata",
    ],
    refs: [
      { texte: "vagbhata", passage: "Sūtrasthāna 2.8 et 2.9", sujet: "Le massage à l'huile, sur la tête, les oreilles et les pieds" },
      { texte: "charaka", passage: "Sūtrasthāna 5.56 à 5.62", sujet: "L'huile dans les narines, conseillée à la saison des pluies, en automne et au printemps" },
      { texte: "charaka", passage: "Sūtrasthāna 5.78 à 5.80", sujet: "L'huile gardée en bouche" },
      { texte: "charaka", passage: "Sūtrasthāna 5.90 à 5.92", sujet: "Le massage des pieds et le sommeil" },
      { texte: "vagbhata", passage: "Sūtrasthāna 2.10 à 2.13", sujet: "L'exercice à la moitié de ses forces" },
      { texte: "charaka", passage: "Sūtrasthāna 1.66", sujet: "Les saveurs qui apaisent Vata" },
      { texte: "charaka", passage: "Cikitsāsthāna 28", sujet: "Ce qui aggrave Vata, dont la veille" },
    ],
    plantes: [
      { nom: "Ashwagandha", texte: "tonique nerveux, contre le stress" },
      { nom: "Tulsi", texte: "le basilic sacré, pour l'immunité" },
      { nom: "Triphala", texte: "pour un transit régulier" },
      { nom: "Chaï masala", texte: "mélange d'épices réchauffant" },
    ],
  },
  {
    id: "hiver",
    court: "Hiver",
    periode: "déc. – févr.",
    dosha: "kapha",
    qualites: ["Lourd", "Froid", "Humide"],
    intro:
      "De décembre à février, le froid réveille l'appétit. Les textes anciens conseillent alors une cuisine chaude et nourrissante, et Kapha commence doucement à s'accumuler.",
    photo: "bol de soupe épicée et écharpe en laine près d'une fenêtre",
    assiette: [
      "Des plats nourrissants et un peu gras, le feu digestif est à son plus fort",
      "Les saveurs sucrée, acide et salée",
      "Céréales, blé ou riz, bouillons et plats mijotés",
      "Lait, ghee, sucre complet",
      "Gingembre, poivre, cannelle",
    ],
    limiter: [
      "Les repas trop légers ou sautés, et le jeûne",
      "Les boissons froides",
      "Les aliments secs qui font monter Vata",
      "Le froid et le vent sans protection",
    ],
    matin: [
      "Se masser à l'huile, tête comprise",
      "Prendre le soleil du matin",
      "Bouger franchement, jusqu'à se réchauffer",
    ],
    journee: [
      "Des repas copieux, à faim franche",
      "Se couvrir chaudement, pieds compris",
      "Chercher la lumière du jour",
    ],
    soir: [
      "Se laver à l'eau chaude",
      "Une chambre chaude et une couverture épaisse",
      "Un dîner chaud, sans traîner",
    ],
    refs: [
      { texte: "charaka", passage: "Sūtrasthāna 6.9 à 6.21", sujet: "La conduite du début et de la fin de l'hiver" },
    ],
    plantes: [
      { nom: "Trikatu", texte: "poivre, gingembre et poivre long, à petites doses en fin d'hiver, quand Kapha s'alourdit" },
      { nom: "Curcuma", texte: "l'épice dorée de l'hiver" },
      { nom: "Cannelle", texte: "pour réchauffer" },
      { nom: "Guggul", texte: "une résine traditionnelle de Kapha" },
    ],
  },
  {
    id: "printemps",
    court: "Printemps",
    periode: "mars – mai",
    dosha: "kapha",
    qualites: ["Humide", "Lourd", "Doux"],
    intro:
      "Avec le réchauffement, le Kapha accumulé pendant l'hiver fond. Rhumes et allergies arrivent souvent à ce moment-là.",
    photo: "asperges et herbes fraîches sur une planche, lumière du matin",
    assiette: [
      "Des aliments légers et secs",
      "Les saveurs amère, piquante et astringente",
      "Orge, millet, sarrasin, céréales de l'an passé",
      "Légumes verts, asperges, radis",
      "Un peu de miel, dans l'eau tiède, jamais chauffé",
    ],
    limiter: [
      "Le lourd et le gras",
      "Le sucré et l'acide",
      "Les laitages en quantité",
      "La sieste, qui alourdit Kapha",
    ],
    matin: [
      "Se lever avec le soleil",
      "Bouger jusqu'à transpirer un peu",
      "Frictionner le corps avec une poudre sèche, de la farine de pois chiche par exemple (udvartana)",
    ],
    journee: [
      "De l'eau tiède avec un peu de miel, ou de l'eau bouillie au gingembre",
      "Pas de sieste",
      "Rester en mouvement",
    ],
    soir: [
      "Un dîner léger",
      "Un moment dans un jardin ou sous les arbres",
      "Se coucher sans s'attarder à table",
    ],
    refs: [
      { texte: "charaka", passage: "Sūtrasthāna 6.22 à 6.26", sujet: "La conduite du printemps" },
      { texte: "charaka", passage: "Sūtrasthāna 21", sujet: "La sieste, permise seulement en été" },
    ],
    plantes: [
      { nom: "Guduchi", texte: "la plante du renouveau, au printemps" },
      { nom: "Neem", texte: "une plante amère traditionnelle" },
      { nom: "Citron frais", texte: "dans l'eau tiède du matin" },
      { nom: "Cumin, coriandre, fenouil", texte: "pour une digestion légère" },
    ],
  },
  {
    id: "ete",
    court: "Été",
    periode: "juin – août",
    dosha: "pitta",
    qualites: ["Chaud", "Intense", "Léger"],
    intro:
      "La chaleur échauffe le corps et l'esprit, ce que l'on rattache à Pitta. Les textes anciens recommandent alors des aliments doux, frais et liquides, et le repos aux heures chaudes.",
    photo: "pastèque et menthe fraîche sur un tissu clair, à l'ombre",
    assiette: [
      "Des aliments doux, frais et liquides",
      "Riz au lait, lait et ghee",
      "Fruits juteux, pastèque, melon, raisin",
      "Une boisson à la farine d'orge et au sucre complet (mantha)",
      "De l'eau fraîche gardée dans une cruche en terre",
    ],
    limiter: [
      "Le salé, l'acide et le piquant",
      "L'alcool, ou alors très coupé d'eau",
      "L'effort aux heures chaudes",
      "Le soleil de midi",
    ],
    matin: [
      "Bouger tôt, et seulement un peu",
      "Se rafraîchir à l'eau fraîche",
      "Une pâte de santal ou une eau de rose sur la peau",
    ],
    journee: [
      "Une sieste au frais, permise en cette seule saison",
      "Des vêtements légers et clairs",
      "Rester à l'ombre aux heures chaudes",
    ],
    soir: [
      "Un dîner doux et frais",
      "Profiter de la fraîcheur du soir et du clair de lune",
      "Dormir dans une pièce aérée",
    ],
    refs: [
      { texte: "charaka", passage: "Sūtrasthāna 6.27 à 6.32", sujet: "La conduite de l'été" },
      { texte: "charaka", passage: "Sūtrasthāna 21", sujet: "La sieste, permise seulement en été" },
    ],
    plantes: [
      { nom: "Amalaki", texte: "le fruit rafraîchissant de Pitta" },
      { nom: "Brahmi", texte: "pour un esprit au calme" },
      { nom: "Rose", texte: "rafraîchit le cœur et l'humeur" },
      { nom: "Menthe", texte: "une infusion fraîche" },
    ],
  },
];

export const EQUILIBRE_DOSHA: { dosha: "vata" | "pitta" | "kapha"; conseils: string[] }[] = [
  { dosha: "vata", conseils: ["Des horaires réguliers", "Chaleur et humidité", "Un massage à l'huile chaque jour", "Des plats chauds et onctueux"] },
  { dosha: "pitta", conseils: ["Modération et fraîcheur", "Ne pas surchauffer, ni le corps ni la tête", "Du temps dans la nature", "Des plats frais et doux"] },
  { dosha: "kapha", conseils: ["Bouger, chaque jour", "Manger léger", "Se lever tôt", "De la nouveauté"] },
];

/** Le programme de saison, vendu à l'unité ou inclus dans l'espace membre. [À FAIRE] prix et autres saisons. */
export const PROGRAMME_AUTOMNE = {
  titre: "L'automne, pour apaiser Vata",
  duree: "21 jours",
  intro: "Trois semaines pour traverser l'automne sans que Vata prenne le dessus, avec un geste nouveau chaque jour.",
  inclus: [
    "21 fiches du jour, à lire en 5 minutes",
    "Les recettes d'automne pour Vata",
    "Un rappel chaque matin",
    "Le guide à télécharger et à garder",
  ],
  semaines: [
    { semaine: "Semaine 1", titre: "Ralentir", texte: "Installer des horaires réguliers, le massage à l'huile, les repas chauds." },
    { semaine: "Semaine 2", titre: "Nourrir", texte: "Les épices de l'automne, les recettes onctueuses, la cuisine au ghee." },
    { semaine: "Semaine 3", titre: "Ancrer", texte: "Le sommeil, la respiration, les plantes de Vata." },
  ],
};
