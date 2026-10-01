/**
 * Contenus de la rubrique « Comprendre », repris des maquettes validées.
 * [À VALIDER] par une praticienne avant la mise en ligne.
 */
import type { DoshaKey } from "@/lib/doshaLogic";

export type Effet = "+" | "-";

export const ELEMENTS = [
  { nom: "Éther", translit: "Ākāśa", deva: "आकाश", texte: "L'espace, le vide qui permet tout le reste." },
  { nom: "Air", translit: "Vāyu", deva: "वायु", texte: "Le mouvement : la respiration, la circulation." },
  { nom: "Feu", translit: "Agni", deva: "अग्नि", texte: "La transformation : la digestion, la chaleur." },
  { nom: "Eau", translit: "Jala", deva: "जल", texte: "La cohésion : les liquides du corps." },
  { nom: "Terre", translit: "Pṛthvī", deva: "पृथ्वी", texte: "La structure : les os, les muscles." },
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
  plantes: string[];
}

export const DOSHAS_DETAIL: DoshaDetail[] = [
  {
    id: "vata",
    nom: "Vata",
    deva: "वात",
    elements: "l'air et l'éther",
    essence: "Le mouvement",
    presentation:
      "Vata gouverne tout ce qui bouge en nous : la respiration, la circulation, les nerfs, les idées. Quand il est équilibré, il donne la créativité et l'élan ; en excès, il disperse et dessèche.",
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
    plantes: ["Ashwagandha", "Shatavari", "Triphala"],
  },
  {
    id: "pitta",
    nom: "Pitta",
    deva: "पित्त",
    elements: "le feu et l'eau",
    essence: "La transformation",
    presentation:
      "Pitta gouverne tout ce qui transforme : la digestion, la chaleur du corps, la vue, l'intelligence. Équilibré, il donne la clarté et la détermination ; en excès, il irrite et échauffe.",
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
    plantes: ["Amalaki", "Brahmi", "Aloe vera"],
  },
  {
    id: "kapha",
    nom: "Kapha",
    deva: "कफ",
    elements: "l'eau et la terre",
    essence: "La structure",
    presentation:
      "Kapha gouverne tout ce qui tient ensemble : les os, les muscles, les articulations, l'immunité. Équilibré, il donne la force, le calme et la fidélité ; en excès, il alourdit et ralentit.",
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
    plantes: ["Trikatu", "Guggul", "Boswellia"],
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
  { nom: "Sucré", translit: "madhura", deva: "मधुर", elements: "terre + eau", effets: ["-", "-", "+"], role: "Nourrit, apaise, donne de la force. En excès : lourdeur.", exemples: "Riz, blé, lait, ghee, dattes, patate douce", couleur: "#B98AA8" },
  { nom: "Acide", translit: "amla", deva: "अम्ल", elements: "terre + feu", effets: ["-", "+", "+"], role: "Réveille l'appétit, aide à digérer. En excès : irritation.", exemples: "Citron, yaourt, tamarin, aliments fermentés", couleur: "#BBD439" },
  { nom: "Salé", translit: "lavaṇa", deva: "लवण", elements: "eau + feu", effets: ["-", "+", "+"], role: "Humidifie, donne du goût. En excès : rétention d'eau.", exemples: "Sel, algues, sauce soja", couleur: "#C4DCD5" },
  { nom: "Piquant", translit: "kaṭu", deva: "कटु", elements: "feu + air", effets: ["+", "+", "-"], role: "Réchauffe, stimule, dégage. En excès : sécheresse, échauffement.", exemples: "Gingembre, poivre, piment, ail, moutarde", couleur: "#5B2A4E" },
  { nom: "Amer", translit: "tikta", deva: "तिक्त", elements: "air + éther", effets: ["+", "-", "-"], role: "Rafraîchit, allège. En excès : froid, sécheresse.", exemples: "Légumes verts à feuilles, curcuma, fenugrec, chicorée", couleur: "#0E4D47" },
  { nom: "Astringent", translit: "kaṣāya", deva: "कषाय", elements: "air + terre", effets: ["+", "-", "-"], role: "Resserre, assèche. En excès : constipation.", exemples: "Lentilles, pois chiches, grenade, thé", couleur: "#8A6A1E" },
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
  "Faire du déjeuner le repas principal : le feu est au plus fort vers midi.",
  "Manger chaud et cuit, boire tiède. Éviter le glacé.",
  "Avant le repas, une fine tranche de gingembre frais avec un peu de citron et de sel.",
  "Laisser trois à quatre heures entre deux repas, sans grignoter.",
  "Manger assis, au calme, sans écran.",
];

/* ───────── La journée ───────── */

export const MOMENTS_JOURNEE: { debut: number; heures: string; dosha: DoshaKey; titre: string; gestes: string[] }[] = [
  { debut: 2, heures: "Avant 6 h", dosha: "vata", titre: "Se lever", gestes: ["Se lever avant le soleil, quand l'air est léger.", "Gratter la langue, se rincer la bouche.", "Boire un grand verre d'eau tiède."] },
  { debut: 6, heures: "6 h – 10 h", dosha: "kapha", titre: "Bouger", gestes: ["Abhyanga : se masser à l'huile tiède, puis la douche.", "Marcher, faire du yoga : le corps est lourd, il faut le réveiller.", "Un petit-déjeuner léger et chaud."] },
  { debut: 10, heures: "10 h – 14 h", dosha: "pitta", titre: "Manger et agir", gestes: ["Le moment des tâches qui demandent de la concentration.", "Le déjeuner, repas principal de la journée."] },
  { debut: 14, heures: "14 h – 18 h", dosha: "vata", titre: "Créer", gestes: ["Le moment des idées, des échanges, de l'écriture.", "Une boisson chaude plutôt qu'un grignotage."] },
  { debut: 18, heures: "18 h – 22 h", dosha: "kapha", titre: "Ralentir", gestes: ["Un dîner léger, avant 19 h si possible.", "Une marche courte, de la lecture, une tisane.", "Se coucher avant 22 h."] },
  { debut: 22, heures: "22 h – 2 h", dosha: "pitta", titre: "Dormir", gestes: ["Le corps digère et répare : c'est le sommeil le plus utile."] },
];

/** Le moment de la journée en cours (les tranches commencent à 2 h, 6 h, 10 h…). */
export function momentEnCours(heure: number): number {
  const h = (heure + 22) % 24; // décale pour que 2 h devienne 0
  return Math.floor(h / 4);
}

/* ───────── Lexique ───────── */

export const LEXIQUE = [
  { mot: "Abhyanga", deva: "अभ्यङ्ग", sens: "Le massage à l'huile tiède, de préférence le matin avant la douche." },
  { mot: "Agni", deva: "अग्नि", sens: "Le feu digestif : la capacité à transformer ce que l'on mange." },
  { mot: "Āma", deva: "आम", sens: "Le résidu de ce qui a été mal digéré, lourd et collant." },
  { mot: "Āyurveda", deva: "आयुर्वेद", sens: "De āyus, la vie, et veda, la connaissance : la science de la vie." },
  { mot: "Dinacharya", deva: "दिनचर्या", sens: "La routine du jour, calée sur le rythme des doshas." },
  { mot: "Dosha", deva: "दोष", sens: "L'une des trois énergies, Vata, Pitta et Kapha, qui gouvernent le corps et l'esprit." },
  { mot: "Kapha", deva: "कफ", sens: "Le dosha de l'eau et de la terre : la structure, la stabilité." },
  { mot: "Pitta", deva: "पित्त", sens: "Le dosha du feu et de l'eau : la transformation, la digestion." },
  { mot: "Prakriti", deva: "प्रकृति", sens: "Votre constitution de naissance, le dosage qui vous est propre." },
  { mot: "Rasa", deva: "रस", sens: "La saveur. Il y en a six." },
  { mot: "Ritucharya", deva: "ऋतुचर्या", sens: "La façon d'adapter sa vie aux saisons." },
  { mot: "Vata", deva: "वात", sens: "Le dosha de l'air et de l'éther : le mouvement." },
  { mot: "Vikriti", deva: "विकृति", sens: "Votre état du moment, quand l'équilibre s'est déplacé." },
  { mot: "Vipāka", deva: "विपाक", sens: "L'effet d'un aliment après la digestion." },
  { mot: "Vīrya", deva: "वीर्य", sens: "L'effet chauffant ou rafraîchissant d'un aliment." },
];

/** Première lettre sans accent ni macron, pour l'index du lexique. */
export const initiale = (mot: string) => mot.normalize("NFD").replace(/[̀-ͯ]/g, "")[0].toUpperCase();
