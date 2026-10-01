/**
 * Les questions du quiz, en deux parties.
 *  - Partie 1, ma nature (prakriti) : comment je suis depuis toujours, quand tout va bien.
 *  - Partie 2, mon état du moment (vikriti) : ce que je vis ces dernières semaines.
 *
 * [À VALIDER] par une praticienne avant la mise en ligne.
 */
import type { DoshaKey } from "@/lib/doshaLogic";

export interface PrakritiOption {
  texte: string;
  dosha: DoshaKey;
  /** Poids de la question (2 ou 3) : certaines questions disent plus que d'autres. */
  poids: number;
}

export interface PrakritiQuestion {
  etape: string;
  question: string;
  options: PrakritiOption[];
}

export interface VikritiAffirmation {
  etape: string;
  texte: string;
  dosha: DoshaKey;
}

export const ECHELLE = ["Jamais", "Parfois", "Souvent", "Presque tous les jours"] as const;

export const PRAKRITI: PrakritiQuestion[] = [
  {
    etape: "Le corps",
    question: "Votre morphologie générale ?",
    options: [
      { texte: "Mince, ossature fine, difficile de prendre du poids", dosha: "vata", poids: 3 },
      { texte: "Moyenne, musclée, poids stable", dosha: "pitta", poids: 3 },
      { texte: "Forte, tendance à prendre du poids facilement", dosha: "kapha", poids: 3 },
    ],
  },
  {
    etape: "Le corps",
    question: "Vos articulations ?",
    options: [
      { texte: "Fines, craquent souvent, saillantes", dosha: "vata", poids: 2 },
      { texte: "Moyennes, souples", dosha: "pitta", poids: 2 },
      { texte: "Larges, bien lubrifiées", dosha: "kapha", poids: 2 },
    ],
  },
  {
    etape: "Le corps",
    question: "Votre poids ?",
    options: [
      { texte: "Difficile de prendre du poids", dosha: "vata", poids: 3 },
      { texte: "Fluctue facilement selon alimentation", dosha: "pitta", poids: 2 },
      { texte: "Prend du poids facilement, difficile de perdre", dosha: "kapha", poids: 3 },
    ],
  },
  {
    etape: "Le corps",
    question: "Votre température corporelle ?",
    options: [
      { texte: "Toujours froid(e), mains/pieds glacés", dosha: "vata", poids: 3 },
      { texte: "Souvent chaud(e), transpire facilement", dosha: "pitta", poids: 3 },
      { texte: "Température stable, résiste au froid", dosha: "kapha", poids: 2 },
    ],
  },
  {
    etape: "Le corps",
    question: "Votre peau ?",
    options: [
      { texte: "Sèche, fine, rides précoces", dosha: "vata", poids: 3 },
      { texte: "Sensible, rougit facilement, imperfections", dosha: "pitta", poids: 3 },
      { texte: "Épaisse, douce, plutôt grasse", dosha: "kapha", poids: 3 },
    ],
  },
  {
    etape: "Le corps",
    question: "Vos cheveux ?",
    options: [
      { texte: "Secs, fins, cassants, frisottent", dosha: "vata", poids: 3 },
      { texte: "Fins, souples, grisonnent tôt", dosha: "pitta", poids: 3 },
      { texte: "Épais, abondants, brillants", dosha: "kapha", poids: 3 },
    ],
  },
  {
    etape: "La digestion",
    question: "Votre appétit ?",
    options: [
      { texte: "Irrégulier, parfois oublie de manger", dosha: "vata", poids: 3 },
      { texte: "Fort, faim intense, irritable si repas sauté", dosha: "pitta", poids: 3 },
      { texte: "Modéré, peut sauter des repas sans problème", dosha: "kapha", poids: 2 },
    ],
  },
  {
    etape: "La digestion",
    question: "Votre digestion ?",
    options: [
      { texte: "Irrégulière, ballonnements, gaz", dosha: "vata", poids: 3 },
      { texte: "Forte, rapide, brûlures possibles", dosha: "pitta", poids: 3 },
      { texte: "Lente, lourdeur après repas", dosha: "kapha", poids: 3 },
    ],
  },
  {
    etape: "La digestion",
    question: "Après un gros repas ?",
    options: [
      { texte: "Ballonné(e), inconfortable", dosha: "vata", poids: 2 },
      { texte: "Digère bien mais soif intense", dosha: "pitta", poids: 2 },
      { texte: "Lourd(e), envie de sieste", dosha: "kapha", poids: 3 },
    ],
  },
  {
    etape: "La digestion",
    question: "Votre transit ?",
    options: [
      { texte: "Tendance constipation, selles sèches", dosha: "vata", poids: 3 },
      { texte: "Régulier, 1-2x/jour, selles molles", dosha: "pitta", poids: 2 },
      { texte: "Lent, selles épaisses", dosha: "kapha", poids: 2 },
    ],
  },
  {
    etape: "La digestion",
    question: "Votre soif ?",
    options: [
      { texte: "Variable, oublie de boire", dosha: "vata", poids: 2 },
      { texte: "Grande soif, boit beaucoup", dosha: "pitta", poids: 3 },
      { texte: "Faible soif", dosha: "kapha", poids: 2 },
    ],
  },
  {
    etape: "L'esprit",
    question: "Votre mental ?",
    options: [
      { texte: "Rapide, créatif, dispersé", dosha: "vata", poids: 3 },
      { texte: "Vif, concentré, analytique", dosha: "pitta", poids: 3 },
      { texte: "Calme, lent, méthodique", dosha: "kapha", poids: 2 },
    ],
  },
  {
    etape: "L'esprit",
    question: "Votre mémoire ?",
    options: [
      { texte: "Apprend vite, oublie vite", dosha: "vata", poids: 3 },
      { texte: "Mémoire précise et claire", dosha: "pitta", poids: 2 },
      { texte: "Apprend lentement, retient longtemps", dosha: "kapha", poids: 3 },
    ],
  },
  {
    etape: "L'esprit",
    question: "Face au stress ?",
    options: [
      { texte: "Anxiété, inquiétude, panique", dosha: "vata", poids: 3 },
      { texte: "Irritabilité, colère, frustration", dosha: "pitta", poids: 3 },
      { texte: "Retrait, déni, léthargie", dosha: "kapha", poids: 2 },
    ],
  },
  {
    etape: "L'esprit",
    question: "Votre humeur ?",
    options: [
      { texte: "Change rapidement, imprévisible", dosha: "vata", poids: 3 },
      { texte: "Stable mais intense émotionnellement", dosha: "pitta", poids: 2 },
      { texte: "Très stable, égale", dosha: "kapha", poids: 2 },
    ],
  },
  {
    etape: "L'esprit",
    question: "Face aux changements ?",
    options: [
      { texte: "Adore la nouveauté mais angoisse", dosha: "vata", poids: 3 },
      { texte: "Accepte si logique", dosha: "pitta", poids: 2 },
      { texte: "Résiste, préfère routine", dosha: "kapha", poids: 3 },
    ],
  },
  {
    etape: "Les rythmes",
    question: "Votre niveau d'énergie ?",
    options: [
      { texte: "En dents de scie, pics et creux", dosha: "vata", poids: 3 },
      { texte: "Élevé, constant dans la journée", dosha: "pitta", poids: 2 },
      { texte: "Stable mais lent au démarrage", dosha: "kapha", poids: 2 },
    ],
  },
  {
    etape: "Les rythmes",
    question: "Votre sommeil ?",
    options: [
      { texte: "Léger, entrecoupé, insomnie", dosha: "vata", poids: 3 },
      { texte: "Moyen, dort 6-7h, se réveille facilement", dosha: "pitta", poids: 2 },
      { texte: "Profond, long (8-10h), difficile de se lever", dosha: "kapha", poids: 3 },
    ],
  },
  {
    etape: "Les rythmes",
    question: "Le matin au réveil ?",
    options: [
      { texte: "Difficile, brouillard mental", dosha: "vata", poids: 2 },
      { texte: "Éveillé(e) rapidement", dosha: "pitta", poids: 2 },
      { texte: "Très difficile, besoin de 30min+", dosha: "kapha", poids: 3 },
    ],
  },
  {
    etape: "Les rythmes",
    question: "Votre rythme préféré ?",
    options: [
      { texte: "Irrégulier, spontané", dosha: "vata", poids: 2 },
      { texte: "Structuré, planifié", dosha: "pitta", poids: 2 },
      { texte: "Lent, sans pression", dosha: "kapha", poids: 2 },
    ],
  },
];

export const VIKRITI: VikritiAffirmation[] = [
  { etape: "Le sommeil et l'énergie", texte: "Vous avez du mal à vous endormir, ou vous vous réveillez la nuit", dosha: "vata" },
  { etape: "Le sommeil et l'énergie", texte: "Vous vous réveillez la nuit parce que vous avez trop chaud", dosha: "pitta" },
  { etape: "Le sommeil et l'énergie", texte: "Vous dormez longtemps et vous êtes encore fatigué(e) au réveil", dosha: "kapha" },
  { etape: "Le sommeil et l'énergie", texte: "Vous vous sentez épuisé(e) nerveusement, à bout", dosha: "vata" },
  { etape: "La digestion", texte: "Vous avez des ballonnements, des gaz ou de la constipation", dosha: "vata" },
  { etape: "La digestion", texte: "Vous avez des brûlures d'estomac ou des remontées acides", dosha: "pitta" },
  { etape: "La digestion", texte: "Vous vous sentez lourd(e) et somnolent(e) après les repas", dosha: "kapha" },
  { etape: "La digestion", texte: "Vous avez une faim pressante, et devenez irritable si vous sautez un repas", dosha: "pitta" },
  { etape: "La peau et le corps", texte: "Votre peau ou vos lèvres sont sèches, vos articulations craquent ou vous font mal", dosha: "vata" },
  { etape: "La peau et le corps", texte: "Vous avez des rougeurs, des boutons ou des inflammations", dosha: "pitta" },
  { etape: "La peau et le corps", texte: "Vous avez le nez bouché, du mucus, ou vous êtes souvent enrhumé(e)", dosha: "kapha" },
  { etape: "La peau et le corps", texte: "Vous prenez du poids, ou vous gonflez (rétention d'eau)", dosha: "kapha" },
  { etape: "L'humeur", texte: "Vous vous sentez anxieux(se), vos pensées s'éparpillent", dosha: "vata" },
  { etape: "L'humeur", texte: "Vous êtes impatient(e), irritable ou vite en colère", dosha: "pitta" },
  { etape: "L'humeur", texte: "Vous manquez de motivation, vous avez du mal à vous mettre en route", dosha: "kapha" },
];
