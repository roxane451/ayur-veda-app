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
      "De septembre à novembre, la lumière baisse, le froid arrive et Vata s'accumule. On le sent : peau sèche, sommeil plus léger, pensées qui s'éparpillent.",
    assiette: "Soupes et ragoûts, légumes racines, riz, ghee. Gingembre, cannelle, cardamome, cumin.",
    onEvite: "les crudités et les boissons glacées.",
    matin: [
      "Gratter la langue, puis une tasse d'eau tiède au gingembre frais",
      "Abhyanga : se masser à l'huile de sésame tiède avant la douche",
    ],
    journee: ["Des repas à heures régulières", "Une marche dehors, un yoga doux"],
    soir: ["Dîner léger avant 19 h", "Une tisane de camomille ou d'ashwagandha, puis lire"],
  },
  hiver: {
    id: "hiver",
    nom: "L'hiver",
    dosha: "Kapha",
    presentation:
      "De décembre à février, le froid et l'humidité font monter Kapha. On le sent : lourdeur, envie de rester sous la couette, nez pris, digestion lente.",
    assiette: "Soupes épicées, légumes verts, millet, orge, sarrasin. Poivre noir, gingembre, ail, un peu de miel cru.",
    onEvite: "les plats lourds, le sucre et les laitages en excès.",
    matin: [
      "Se lever tôt, avant 6 h si possible",
      "Bouger franchement : salutations au soleil, marche rapide",
    ],
    journee: ["Chercher la lumière du jour", "Éviter la sieste"],
    soir: ["Un dîner très léger", "Une tisane de gingembre et de fenouil"],
  },
  printemps: {
    id: "printemps",
    nom: "Le printemps",
    dosha: "Kapha",
    presentation:
      "De mars à mai, le Kapha accumulé pendant l'hiver fond avec la chaleur. On le sent : rhumes, allergies, fatigue, digestion paresseuse.",
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
      "De juin à août, la chaleur et le soleil font monter Pitta. On le sent : irritabilité, peau qui chauffe, acidité, sommeil court.",
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
