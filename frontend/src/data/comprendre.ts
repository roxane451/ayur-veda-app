/**
 * Contenus de la rubrique « Comprendre », repris des maquettes validées.
 * [À VALIDER] par une praticienne avant la mise en ligne.
 */
import type { DoshaKey } from "@/lib/doshaLogic";

export type Effet = "+" | "-";

export const ELEMENTS = [
  { nom: "Éther", translit: "Ākāśa", deva: "आकाश", texte: "L'espace dans lequel tout le reste prend place." },
  { nom: "Air", translit: "Vāyu", deva: "वायु", texte: "Il fait circuler le souffle et le sang." },
  { nom: "Feu", translit: "Agni", deva: "अग्नि", texte: "Il digère et il réchauffe." },
  { nom: "Eau", translit: "Jala", deva: "जल", texte: "Elle forme les liquides du corps." },
  { nom: "Terre", translit: "Pṛthvī", deva: "पृथ्वी", texte: "Elle donne les os et les muscles." },
];

/* ───────── Les doshas ───────── */

export interface DoshaDetail {
  id: DoshaKey;
  nom: string;
  deva: string;
  elements: string;
  essence: string;
  presentation: string;
  qualites: string[];
  corps: [string, string][];
  esprit: [string, string][];
  signes: string[];
  conseils: string[];
  /** [À VALIDER] par une praticienne */
  plantes: { nom: string; texte: string }[];
}

export const DOSHAS_DETAIL: DoshaDetail[] = [
  {
    id: "vata",
    nom: "Vata",
    deva: "वात",
    elements: "l'air et l'éther",
    essence: "Le mouvement",
    presentation:
      "Vata gouverne ce qui bouge en nous, de la respiration à la circulation des idées. Équilibré, il donne de l'élan et de l'imagination. En excès, il disperse et dessèche.",
    qualites: ["Léger", "Froid", "Sec", "Mobile", "Subtil"],
    corps: [
      ["Morphologie", "Mince, prend difficilement du poids"],
      ["Peau", "Fine et sèche"],
      ["Cheveux", "Fins, souvent secs ou frisés"],
      ["Énergie", "Vive mais irrégulière"],
      ["Digestion", "Variable et sensible"],
    ],
    esprit: [
      ["Esprit", "Créatif et vif"],
      ["Émotions", "Enthousiaste, imaginatif"],
      ["Mémoire", "Apprend vite, oublie vite"],
      ["Parole", "Bavard, expressif"],
      ["En excès", "Anxiété, dispersion"],
    ],
    signes: ["Anxiété, inquiétude", "Insomnie", "Constipation", "Peau très sèche", "Difficultés de concentration"],
    conseils: [
      "Une alimentation chaude et onctueuse",
      "Des horaires réguliers",
      "Du repos et du calme",
      "Des huiles nourrissantes",
      "Se protéger du froid et du vent",
    ],
    plantes: [
      { nom: "Ashwagandha", texte: "Le tonique du système nerveux, contre le stress" },
      { nom: "Shatavari", texte: "La plante qui nourrit et apaise" },
      { nom: "Triphala", texte: "Trois fruits réunis, pour un transit régulier" },
    ],
  },
  {
    id: "pitta",
    nom: "Pitta",
    deva: "पित्त",
    elements: "le feu et l'eau",
    essence: "La transformation",
    presentation:
      "Pitta gouverne ce qui transforme, à commencer par la digestion et la chaleur du corps. Équilibré, il rend l'esprit clair et décidé. En excès, il irrite et échauffe.",
    qualites: ["Chaud", "Léger", "Intense", "Fluide", "Acide"],
    corps: [
      ["Morphologie", "Moyenne, musclée"],
      ["Peau", "Claire, sensible, rougit facilement"],
      ["Cheveux", "Fins, grisonnent tôt"],
      ["Énergie", "Forte et régulière"],
      ["Digestion", "Puissante, grand appétit"],
    ],
    esprit: [
      ["Esprit", "Intelligent et concentré"],
      ["Émotions", "Déterminé, meneur"],
      ["Mémoire", "Rapide et précise"],
      ["Parole", "Directe, persuasive"],
      ["En excès", "Irritabilité, colère"],
    ],
    signes: ["Irritabilité, colère", "Inflammations de la peau", "Brûlures d'estomac", "Transpiration excessive", "Impatience"],
    conseils: [
      "Une alimentation fraîche et modérée",
      "Éviter la chaleur forte",
      "Des activités apaisantes",
      "Un environnement frais",
      "Apprendre à lâcher prise",
    ],
    plantes: [
      { nom: "Amalaki", texte: "Le fruit acidulé qui rafraîchit, riche en vitamine C" },
      { nom: "Brahmi", texte: "La plante de la concentration" },
      { nom: "Aloe vera", texte: "Le gel qui rafraîchit, dedans comme dehors" },
    ],
  },
  {
    id: "kapha",
    nom: "Kapha",
    deva: "कफ",
    elements: "l'eau et la terre",
    essence: "La structure",
    presentation:
      "Kapha donne au corps sa structure, des os aux articulations, et soutient l'immunité. Équilibré, il apporte la force et le calme. En excès, il alourdit et ralentit.",
    qualites: ["Lourd", "Froid", "Huileux", "Lent", "Doux"],
    corps: [
      ["Morphologie", "Robuste, prend du poids facilement"],
      ["Peau", "Épaisse, douce, plutôt grasse"],
      ["Cheveux", "Épais, abondants, brillants"],
      ["Énergie", "Stable et endurante"],
      ["Digestion", "Lente mais régulière"],
    ],
    esprit: [
      ["Esprit", "Calme et stable"],
      ["Émotions", "Patient, loyal"],
      ["Mémoire", "Apprend lentement, retient longtemps"],
      ["Parole", "Posée, réfléchie"],
      ["En excès", "Léthargie, repli"],
    ],
    signes: ["Léthargie, manque d'élan", "Prise de poids", "Nez pris, mucus", "Rétention d'eau", "Résistance au changement"],
    conseils: [
      "Une alimentation légère et épicée",
      "Bouger tous les jours",
      "De la nouveauté, des stimulations",
      "Éviter de trop dormir",
      "Un environnement chaud et sec",
    ],
    plantes: [
      { nom: "Trikatu", texte: "Poivre, gingembre et poivre long, pour réveiller le feu" },
      { nom: "Guggul", texte: "Une résine traditionnelle de Kapha" },
      { nom: "Boswellia", texte: "La résine d'encens, pour les articulations" },
    ],
  },
];

export const COMPARAISON: [string, string, string, string][] = [
  ["Morphologie", "Mince, léger", "Moyenne, athlétique", "Robuste, solide"],
  ["Digestion", "Irrégulière", "Forte, rapide", "Lente, stable"],
  ["Sommeil", "Léger, interrompu", "Modéré, 6 à 7 h", "Profond, 8 h et plus"],
  ["Activité préférée", "Créative, variée", "Compétitive, intense", "Calme, régulière"],
  ["Saison difficile", "L'automne", "L'été", "Le printemps"],
  ["Saveurs à privilégier", "Sucré, salé, acide", "Sucré, amer, astringent", "Piquant, amer, astringent"],
];

/* ───────── Les six saveurs ───────── */

export interface Saveur {
  nom: string;
  translit: string;
  deva: string;
  elements: string;
  effets: [Effet, Effet, Effet]; // vata, pitta, kapha
  role: string;
  exemples: string;
  couleur: string;
}

export const SAVEURS: Saveur[] = [
  { nom: "Sucré", translit: "madhura", deva: "मधुर", elements: "terre + eau", effets: ["-", "-", "+"], role: "Le sucré nourrit et donne de la force. Trop de sucré alourdit.", exemples: "Riz, blé, lait, ghee, dattes, patate douce", couleur: "#B98AA8" },
  { nom: "Acide", translit: "amla", deva: "अम्ल", elements: "terre + feu", effets: ["-", "+", "+"], role: "L'acide ouvre l'appétit et aide à digérer. En trop, il irrite.", exemples: "Citron, yaourt, tamarin, aliments fermentés", couleur: "#BBD439" },
  { nom: "Salé", translit: "lavaṇa", deva: "लवण", elements: "eau + feu", effets: ["-", "+", "+"], role: "Le salé humidifie et relève le goût. En trop, il fait retenir l'eau.", exemples: "Sel, algues, sauce soja", couleur: "#C4DCD5" },
  { nom: "Piquant", translit: "kaṭu", deva: "कटु", elements: "feu + air", effets: ["+", "+", "-"], role: "Le piquant réchauffe et dégage. En trop, il dessèche et échauffe.", exemples: "Gingembre, poivre, piment, ail, moutarde", couleur: "#5B2A4E" },
  { nom: "Amer", translit: "tikta", deva: "तिक्त", elements: "air + éther", effets: ["+", "-", "-"], role: "L'amer rafraîchit et allège. En trop, il refroidit.", exemples: "Légumes verts à feuilles, curcuma, fenugrec, chicorée", couleur: "#0E4D47" },
  { nom: "Astringent", translit: "kaṣāya", deva: "कषाय", elements: "air + terre", effets: ["+", "-", "-"], role: "L'astringent resserre. En trop, il constipe.", exemples: "Lentilles, pois chiches, grenade, thé", couleur: "#8A6A1E" },
];

export const SAVEURS_PAR_DOSHA = [
  { dosha: "vata" as DoshaKey, saveurs: "Sucré, acide, salé", texte: "Des saveurs qui nourrissent et réchauffent." },
  { dosha: "pitta" as DoshaKey, saveurs: "Sucré, amer, astringent", texte: "Des saveurs qui rafraîchissent et apaisent." },
  { dosha: "kapha" as DoshaKey, saveurs: "Piquant, amer, astringent", texte: "Des saveurs qui allègent et stimulent." },
];

/* ───────── Agni ───────── */

export const ETATS_AGNI = [
  { translit: "Sama agni", deva: "समाग्नि", adjectif: "Équilibré", dosha: null, echelle: 1, texte: "Faim nette aux heures des repas, digestion légère, énergie stable après manger. C'est l'état à retrouver." },
  { translit: "Viṣama agni", deva: "विषमाग्नि", adjectif: "Irrégulier", dosha: "Vata", echelle: 0.8, texte: "Faim tantôt forte, tantôt absente. Ballonnements, gaz, transit capricieux." },
  { translit: "Tīkṣṇa agni", deva: "तीक्ष्णाग्नि", adjectif: "Trop vif", dosha: "Pitta", echelle: 1.2, texte: "Faim pressante, irritabilité si l'on saute un repas, brûlures, remontées acides." },
  { translit: "Manda agni", deva: "मन्दाग्नि", adjectif: "Trop lent", dosha: "Kapha", echelle: 0.6, texte: "Peu d'appétit, lourdeur et somnolence après manger, digestion longue." },
];

export const SIGNES_AMA = [
  "Une langue chargée le matin",
  "Une lourdeur ou une fatigue après les repas",
  "Peu d'appétit, l'esprit embrumé",
  "Une haleine ou des selles plus fortes que d'habitude",
];

export const GESTES_AGNI = [
  "Manger à heures régulières, et seulement quand on a faim.",
  "Faire du déjeuner le repas principal, car le feu digestif est au plus fort vers midi.",
  "Manger chaud et cuit, boire tiède. Éviter le glacé.",
  "Avant le repas, une fine tranche de gingembre frais avec un peu de citron et de sel.",
  "Laisser trois à quatre heures entre deux repas, sans grignoter.",
  "Manger assis, au calme, sans écran.",
];

/* ───────── La journée ───────── */

export const MOMENTS_JOURNEE: { debut: number; heures: string; dosha: DoshaKey; titre: string; gestes: string[] }[] = [
  { debut: 2, heures: "Avant 6 h", dosha: "vata", titre: "Se lever", gestes: ["Se lever avant le soleil, quand l'air est léger.", "Gratter la langue, se rincer la bouche.", "Boire un grand verre d'eau tiède."] },
  { debut: 6, heures: "6 h – 10 h", dosha: "kapha", titre: "Bouger", gestes: ["Se masser à l'huile tiède (abhyanga), puis prendre sa douche.", "Marcher ou faire du yoga pour réveiller un corps encore lourd.", "Un petit-déjeuner léger et chaud."] },
  { debut: 10, heures: "10 h – 14 h", dosha: "pitta", titre: "Manger et agir", gestes: ["Le moment des tâches qui demandent de la concentration.", "Le déjeuner, repas principal de la journée."] },
  { debut: 14, heures: "14 h – 18 h", dosha: "vata", titre: "Créer", gestes: ["Le moment des idées, des échanges, de l'écriture.", "Une boisson chaude plutôt qu'un grignotage."] },
  { debut: 18, heures: "18 h – 22 h", dosha: "kapha", titre: "Ralentir", gestes: ["Un dîner léger, avant 19 h si possible.", "Une marche courte, de la lecture, une tisane.", "Se coucher avant 22 h."] },
  { debut: 22, heures: "22 h – 2 h", dosha: "pitta", titre: "Dormir", gestes: ["Pendant ces heures, le corps digère et se répare. C'est le sommeil le plus utile."] },
];

/** Le moment de la journée en cours (les tranches commencent à 2 h, 6 h, 10 h…). */
export function momentEnCours(heure: number): number {
  const h = (heure + 22) % 24; // décale pour que 2 h devienne 0
  return Math.floor(h / 4);
}

/* ───────── Lexique ───────── */

export const LEXIQUE = [
  { mot: "Abhyanga", deva: "अभ्यङ्ग", sens: "Le massage à l'huile tiède, de préférence le matin avant la douche." },
  { mot: "Agni", deva: "अग्नि", sens: "Le feu digestif, qui transforme ce que l'on mange." },
  { mot: "Āma", deva: "आम", sens: "Le résidu de ce qui a été mal digéré, lourd et collant." },
  { mot: "Āyurveda", deva: "आयुर्वेद", sens: "La science de la vie, de āyus (la vie) et veda (la connaissance)." },
  { mot: "Dinacharya", deva: "दिनचर्या", sens: "La routine du jour, calée sur le rythme des doshas." },
  { mot: "Dosha", deva: "दोष", sens: "L'une des trois énergies, Vata, Pitta et Kapha, qui gouvernent le corps et l'esprit." },
  { mot: "Kapha", deva: "कफ", sens: "Le dosha de l'eau et de la terre, qui donne la structure et la stabilité." },
  { mot: "Pitta", deva: "पित्त", sens: "Le dosha du feu et de l'eau, qui gouverne la digestion." },
  { mot: "Prakriti", deva: "प्रकृति", sens: "Votre constitution de naissance, le dosage qui vous est propre." },
  { mot: "Rasa", deva: "रस", sens: "La saveur. Il y en a six." },
  { mot: "Ritucharya", deva: "ऋतुचर्या", sens: "La façon d'adapter sa vie aux saisons." },
  { mot: "Vata", deva: "वात", sens: "Le dosha de l'air et de l'éther, qui gouverne le mouvement." },
  { mot: "Vikriti", deva: "विकृति", sens: "Votre état du moment, quand l'équilibre s'est déplacé." },
  { mot: "Vipāka", deva: "विपाक", sens: "L'effet d'un aliment après la digestion." },
  { mot: "Vīrya", deva: "वीर्य", sens: "L'effet chauffant ou rafraîchissant d'un aliment." },
  { mot: "Āhāra", deva: "आहार", sens: "L'alimentation, premier des trois piliers de la santé." },
  { mot: "Dhātu", deva: "धातु", sens: "Les sept tissus du corps, du plasma aux tissus reproducteurs, chacun nourrissant le suivant." },
  { mot: "Guṇa", deva: "गुण", sens: "Une qualité. Vingt qualités décrivent la matière, et trois décrivent l'esprit." },
  { mot: "Mala", deva: "मल", sens: "Les déchets du corps, c'est-à-dire les selles, l'urine et la sueur." },
  { mot: "Nidrā", deva: "निद्रा", sens: "Le sommeil, deuxième pilier de la santé." },
  { mot: "Ojas", deva: "ओजस्", sens: "L'essence de tous les tissus, qui donne l'immunité et l'endurance." },
  { mot: "Rajas", deva: "रजस्", sens: "La qualité de l'esprit liée au mouvement et à l'agitation." },
  { mot: "Sattva", deva: "सत्त्व", sens: "La qualité de l'esprit liée à la clarté et au calme." },
  { mot: "Kriyākāla", deva: "क्रियाकाल", sens: "Les six moments où l'on peut agir sur un déséquilibre, de l'accumulation à la complication." },
  { mot: "Vayas", deva: "वयस्", sens: "L'âge. Kapha domine l'enfance, Pitta l'âge adulte, Vata la vieillesse." },
  { mot: "Tamas", deva: "तमस्", sens: "La qualité de l'esprit liée à l'inertie et à la lourdeur." },
].sort((x, y) => x.mot.localeCompare(y.mot, "fr", { sensitivity: "base" }));

/** Première lettre sans accent ni macron, pour l'index du lexique. */
export const initiale = (mot: string) => mot.normalize("NFD").replace(/[̀-ͯ]/g, "")[0].toUpperCase();
