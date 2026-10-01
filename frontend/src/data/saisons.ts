/**
 * La saison du moment, pour l'accueil.
 * Contenus repris de la page « Au quotidien » (ritucharya), en version courte.
 */
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
    assiette: "Soupes et ragoûts, légumes racines, riz, ghee. Gingembre, cannelle, cardamome, cumin.",
    onEvite: "les crudités et les boissons glacées.",
    matin: [
      "Gratter la langue, puis une tasse d'eau tiède au gingembre frais",
      "Se masser à l'huile de sésame tiède avant la douche (abhyanga)",
    ],
    journee: ["Des repas à heures régulières", "Une marche dehors, un yoga doux"],
    soir: ["Dîner léger avant 19 h", "Une tisane de camomille ou d'ashwagandha, puis lire"],
  },
  hiver: {
    id: "hiver",
    nom: "L'hiver",
    dosha: "Kapha",
    presentation:
      "De décembre à février, le froid humide fait monter Kapha. On a envie de rester sous la couette, le nez se prend et la digestion ralentit.",
    assiette: "Soupes épicées, légumes verts, millet, orge, sarrasin. Poivre noir, gingembre, ail, un peu de miel cru.",
    onEvite: "les plats lourds, le sucre et les laitages en excès.",
    matin: [
      "Se lever tôt, avant 6 h si possible",
      "Bouger franchement, avec des salutations au soleil ou une marche rapide",
    ],
    journee: ["Chercher la lumière du jour", "Éviter la sieste"],
    soir: ["Un dîner très léger", "Une tisane de gingembre et de fenouil"],
  },
  printemps: {
    id: "printemps",
    nom: "Le printemps",
    dosha: "Kapha",
    presentation:
      "De mars à mai, le Kapha accumulé pendant l'hiver fond avec la chaleur. C'est la saison des rhumes, des allergies et des coups de fatigue.",
    assiette: "Légumes verts et amers, asperges, quinoa, millet. Cumin, coriandre, fenouil, un peu de piquant.",
    onEvite: "les laitages, le sucre raffiné et les plats gras.",
    matin: ["Se lever avec le soleil", "Se frictionner à sec avec un gant de soie"],
    journee: ["Des activités en plein air", "Limiter les grignotages"],
    soir: ["Dîner léger et tôt", "Une tisane légère, puis une détente active"],
  },
  ete: {
    id: "ete",
    nom: "L'été",
    dosha: "Pitta",
    presentation:
      "De juin à août, la chaleur fait monter Pitta. La peau chauffe, on s'irrite plus vite et les nuits raccourcissent.",
    assiette: "Fruits juteux, concombre, courgette, riz basmati. Menthe, coriandre, fenouil, cardamome.",
    onEvite: "le piquant, la friture, l'alcool et les plats très acides.",
    matin: ["Bouger tôt, avant la chaleur", "Se masser à l'huile de coco"],
    journee: ["Éviter le soleil entre 11 h et 15 h", "Une courte sieste de 20 minutes"],
    soir: ["Un dîner frais et léger", "Une promenade au clair de lune"],
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
      "Avec la lumière qui baisse et le froid, Vata s'accumule. Beaucoup ressentent alors de la sécheresse, de l'anxiété ou du mal à se concentrer.",
    photo: "feuilles d'automne et tasse fumante sur un tissu block print",
    assiette: [
      "Des plats chauds, humides et nourrissants",
      "Soupes, ragoûts et bouillons",
      "Des céréales complètes comme le riz ou le quinoa",
      "Des légumes racines, carottes, patates douces ou betteraves",
      "Gingembre, cannelle, cardamome, cumin",
      "Du ghee, de l'huile de sésame",
    ],
    limiter: ["Le cru et le froid", "Les salades et crudités", "Les aliments secs comme les crackers", "Les boissons glacées"],
    matin: [
      "Se réveiller doucement, sans alarme stridente",
      "Gratter la langue",
      "Une tasse d'eau tiède au gingembre frais",
      "Un massage de 15 minutes à l'huile de sésame tiède avant la douche (abhyanga)",
    ],
    journee: ["Manger à heures régulières", "Un yoga doux, yin ou hatha", "Marcher dehors", "Limiter les écrans et le bruit"],
    soir: ["Dîner léger avant 19 h", "Une tisane de camomille ou d'ashwagandha", "Se coucher à heure fixe", "Lire ou méditer"],
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
      "Le froid humide fait monter Kapha. On se sent plus lourd, le nez se prend et la digestion ralentit.",
    photo: "bol de soupe épicée et écharpe en laine près d'une fenêtre",
    assiette: [
      "Des plats chauds, légers et épicés",
      "Soupes épicées et bouillons clairs",
      "Légumes verts et crucifères",
      "Des céréales légères comme le millet, l'orge ou le sarrasin",
      "Poivre noir, gingembre, ail, moutarde",
      "Un peu de miel cru, jamais chauffé",
    ],
    limiter: ["Les laitages en excès", "Les plats lourds et gras", "Le sucre", "Les viandes rouges"],
    matin: [
      "Se lever tôt, avant 6 h si possible",
      "Un bain de bouche à l'huile",
      "Bouger franchement, avec des salutations au soleil ou une marche rapide",
      "Une douche chaude, terminée par un peu d'eau fraîche",
    ],
    journee: ["Bouger régulièrement", "Chercher la lumière du jour", "Éviter la sieste", "Apprendre ou créer quelque chose"],
    soir: ["Un dîner très léger", "Une tisane de gingembre et de fenouil", "Ne pas se coucher trop tôt"],
    plantes: [
      { nom: "Trikatu", texte: "poivre, gingembre et poivre long, pour réveiller le feu" },
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
      "Des aliments légers, amers et astringents",
      "Des légumes verts à feuilles, épinards ou roquette",
      "Asperges, brocolis, haricots verts",
      "Des céréales anciennes comme le quinoa ou le millet",
      "Un peu de piquant, poivre ou moutarde",
      "Cumin, coriandre, fenouil",
    ],
    limiter: ["Les laitages", "Les plats lourds et huileux", "Le sucre raffiné", "L'excès de sel"],
    matin: [
      "Se lever avec le soleil",
      "Un exercice qui fait transpirer un peu",
      "Une respiration dynamique",
      "Se frictionner à sec avec un gant de soie",
    ],
    journee: ["Des activités en plein air", "Limiter les grignotages", "Rester en mouvement"],
    soir: ["Dîner léger et tôt", "Une tisane légère", "Une détente active, sans somnoler"],
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
      "La chaleur fait monter Pitta. On devient plus irritable, la peau réagit au soleil et l'acidité gagne l'estomac.",
    photo: "pastèque et menthe fraîche sur un tissu clair, à l'ombre",
    assiette: [
      "Des aliments frais, mais pas glacés",
      "Des fruits juteux, pastèque, melon, raisin ou mangue",
      "Concombre, courgette, fenouil",
      "Riz basmati, orge",
      "Lait de coco, lait d'amande",
      "Menthe et coriandre fraîches",
    ],
    limiter: ["Le piquant", "Les aliments acides comme la tomate ou le yaourt fermenté", "L'alcool", "La friture"],
    matin: [
      "Bouger tôt, avant la chaleur",
      "Un yoga doux",
      "Une méditation au frais",
      "Se masser à l'huile de coco",
    ],
    journee: ["Éviter le soleil entre 11 h et 15 h", "Une courte sieste de 20 minutes", "Marcher au bord de l'eau", "Des vêtements légers et clairs"],
    soir: ["Un dîner frais et léger", "Une promenade au clair de lune", "Un bain tiède, pas chaud"],
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
