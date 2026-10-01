/**
 * Contenus de la rubrique « La cuisine », repris des maquettes validées.
 * [À VALIDER] par une praticienne avant la mise en ligne, en particulier les fiches
 * (rasa, vīrya, vipāka, usages traditionnels et précautions).
 */
import type { DoshaKey } from "@/lib/doshaLogic";

/** Effet d'une épice sur chaque dosha. */
export type EffetEpice = "diminue" | "equilibre" | "augmente";

export interface Epice {
  id: string;
  nom: string;
  translit: string;
  deva: string;
  latin: string;
  nature: "Réchauffant" | "Réchauffante" | "Rafraîchissant" | "Rafraîchissante";
  gout: string;
  effets: Record<DoshaKey, EffetEpice>;
  enCuisine: string;
  avec: string;
  seGarde: string;
  /** La fiche complète */
  accroche: string;
  rasa: string;
  virya: string;
  vipaka: string;
  usage: string;
  cuisine: string[];
  avecQuoi: string[];
  garder: string[];
  precautions: string;
  dansLes: string[];
}

const PRECAUTION_GENERALE =
  "En cuisine, aux doses habituelles, aucune. En grande quantité ou en complément alimentaire, demandez conseil à un professionnel de santé, surtout enceinte, allaitante ou sous traitement.";

export const EPICES: Epice[] = [
  {
    id: "curcuma",
    nom: "Curcuma",
    translit: "haridra",
    deva: "हरिद्रा",
    latin: "Curcuma longa",
    nature: "Réchauffant",
    gout: "Amer, piquant",
    effets: { vata: "diminue", pitta: "equilibre", kapha: "diminue" },
    enCuisine: "Dans les currys, les soupes, le riz, le lait doré.",
    avec: "Poivre noir et un peu de gras, pour qu'il se révèle.",
    seGarde: "En poudre, à l'abri de la lumière : six mois.",
    accroche:
      "La racine jaune de la cuisine indienne. On l'utilise presque tous les jours, en petite quantité, toujours avec un peu de gras et de poivre.",
    rasa: "Amère, piquante",
    virya: "Chauffant",
    vipaka: "Piquant",
    usage:
      "En Ayurveda, on l'utilise traditionnellement pour soutenir la digestion, pour la peau, et pour les articulations. C'est un usage traditionnel, pas une promesse de soin.",
    cuisine: [
      "Une demi-cuillère à café revenue dans le ghee, au début de la cuisson",
      "Dans le dal, le riz, les soupes de légumes",
      "Dans le lait doré, le soir",
    ],
    avecQuoi: ["Le poivre noir, toujours", "Un corps gras : ghee, huile, lait", "Le cumin, le gingembre, la coriandre"],
    garder: ["En poudre : six mois, à l'abri de la lumière", "Frais : deux semaines au réfrigérateur", "Il tache : planche et mains"],
    precautions:
      "En cuisine, aucune. En grande quantité ou en complément : à éviter en cas de calculs biliaires, et à demander à son médecin si l'on prend des anticoagulants.",
    dansLes: ["lait-dore", "melange-pitta", "melange-kapha"],
  },
  {
    id: "gingembre",
    nom: "Gingembre",
    translit: "śuṇṭhī",
    deva: "शुण्ठी",
    latin: "Zingiber officinale",
    nature: "Réchauffant",
    gout: "Piquant, doux",
    effets: { vata: "diminue", pitta: "augmente", kapha: "diminue" },
    enCuisine: "Frais en début de cuisson, sec dans les mélanges et le chaï.",
    avec: "Citron, miel, cannelle.",
    seGarde: "Frais : trois semaines au réfrigérateur.",
    accroche:
      "L'épice que l'Ayurveda appelle volontiers « le remède universel ». Frais, il est plus doux ; sec, il chauffe davantage.",
    rasa: "Piquante",
    virya: "Chauffant",
    vipaka: "Doux",
    usage:
      "Traditionnellement, on l'utilise pour réveiller l'appétit et soutenir la digestion, en particulier quand le feu digestif est lent. C'est un usage traditionnel, pas une promesse de soin.",
    cuisine: [
      "Râpé frais au début de la cuisson des légumes et du dal",
      "Une fine tranche avec citron et sel, avant le repas",
      "En poudre dans le chaï et les mélanges",
    ],
    avecQuoi: ["Le citron et le miel", "La cannelle et la cardamome", "Le curcuma et le poivre"],
    garder: ["Frais : trois semaines au réfrigérateur", "En poudre : six mois", "Se congèle très bien, râpé"],
    precautions: PRECAUTION_GENERALE,
    dansLes: ["chai", "melange-vata", "melange-kapha"],
  },
  {
    id: "cumin",
    nom: "Cumin",
    translit: "jīraka",
    deva: "जीरक",
    latin: "Cuminum cyminum",
    nature: "Réchauffant",
    gout: "Piquant, amer",
    effets: { vata: "diminue", pitta: "equilibre", kapha: "diminue" },
    enCuisine: "Torréfié à sec ou revenu dans le ghee, au début de la cuisson.",
    avec: "Coriandre, fenouil, lentilles et légumes secs.",
    seGarde: "En graines : un an. Moudre au dernier moment.",
    accroche:
      "La première graine qui crépite dans le ghee. Il donne leur parfum aux lentilles et rend les légumes secs plus faciles à digérer.",
    rasa: "Piquante, amère",
    virya: "Chauffant",
    vipaka: "Piquant",
    usage:
      "Traditionnellement, on l'associe aux plats de légumineuses pour limiter les ballonnements. C'est un usage traditionnel, pas une promesse de soin.",
    cuisine: [
      "Une cuillère à café de graines dans le ghee chaud, jusqu'à ce qu'elles crépitent",
      "Torréfié à sec puis moulu, sur le riz et les yaourts",
      "Dans le thé cumin, coriandre, fenouil",
    ],
    avecQuoi: ["La coriandre et le fenouil", "Les lentilles, le riz", "Le yaourt et le babeurre"],
    garder: ["En graines : un an", "Moulu : trois mois", "Moudre au dernier moment"],
    precautions: PRECAUTION_GENERALE,
    dansLes: ["the-ccf", "melange-vata", "melange-pitta", "melange-kapha"],
  },
  {
    id: "coriandre",
    nom: "Coriandre",
    translit: "dhānyaka",
    deva: "धान्यक",
    latin: "Coriandrum sativum",
    nature: "Rafraîchissante",
    gout: "Douce, amère",
    effets: { vata: "equilibre", pitta: "diminue", kapha: "equilibre" },
    enCuisine: "Graines moulues dans les plats, feuilles fraîches à la fin.",
    avec: "Cumin, fenouil, menthe, yaourt.",
    seGarde: "En graines : un an.",
    accroche:
      "L'épice douce de l'été. Ses graines parfument sans chauffer, et ses feuilles fraîches terminent les plats.",
    rasa: "Astringente, amère, douce",
    virya: "Rafraîchissant",
    vipaka: "Doux",
    usage:
      "Traditionnellement, c'est l'épice qu'on choisit quand il fait chaud ou quand Pitta s'échauffe, notamment en eau de coriandre. C'est un usage traditionnel, pas une promesse de soin.",
    cuisine: [
      "Graines moulues en fin de cuisson",
      "Feuilles fraîches ciselées sur le dal et le riz",
      "En eau de coriandre, l'été",
    ],
    avecQuoi: ["Le cumin et le fenouil", "La menthe", "Le yaourt, la noix de coco"],
    garder: ["En graines : un an", "Feuilles : quelques jours, la tige dans l'eau"],
    precautions: PRECAUTION_GENERALE,
    dansLes: ["the-ccf", "melange-vata", "melange-pitta"],
  },
  {
    id: "fenouil",
    nom: "Fenouil",
    translit: "śatapuṣpā",
    deva: "शतपुष्पा",
    latin: "Foeniculum vulgare",
    nature: "Rafraîchissant",
    gout: "Doux, piquant",
    effets: { vata: "diminue", pitta: "diminue", kapha: "equilibre" },
    enCuisine: "En infusion, ou quelques graines à croquer après le repas.",
    avec: "Coriandre, cumin, cardamome.",
    seGarde: "En graines : un an.",
    accroche:
      "Les petites graines qu'on croque à la fin du repas dans les restaurants indiens. Douces et anisées, elles conviennent à presque tout le monde.",
    rasa: "Douce, piquante",
    virya: "Rafraîchissant",
    vipaka: "Doux",
    usage:
      "Traditionnellement, on le croque après le repas pour faciliter la digestion et rafraîchir l'haleine. C'est un usage traditionnel, pas une promesse de soin.",
    cuisine: [
      "Une demi-cuillère à café à croquer après le repas",
      "En infusion, seul ou avec cumin et coriandre",
      "Torréfié dans les légumes racines",
    ],
    avecQuoi: ["La coriandre et le cumin", "La cardamome", "Les légumes racines"],
    garder: ["En graines : un an", "Torréfié : quelques semaines, dans un bocal"],
    precautions: PRECAUTION_GENERALE,
    dansLes: ["the-ccf", "melange-vata", "melange-pitta"],
  },
  {
    id: "cardamome",
    nom: "Cardamome",
    translit: "elā",
    deva: "एला",
    latin: "Elettaria cardamomum",
    nature: "Réchauffante",
    gout: "Piquante, douce",
    effets: { vata: "diminue", pitta: "equilibre", kapha: "diminue" },
    enCuisine: "Gousses écrasées dans le riz, le chaï, les desserts.",
    avec: "Lait, cannelle, safran, rose.",
    seGarde: "En gousses : un an. La poudre s'évente vite.",
    accroche:
      "La reine des épices douces. Quelques gousses écrasées suffisent pour parfumer un riz, un lait, un dessert.",
    rasa: "Piquante, douce",
    virya: "Chauffant léger",
    vipaka: "Doux",
    usage:
      "Traditionnellement, on l'ajoute au lait et au café pour les rendre plus digestes. C'est un usage traditionnel, pas une promesse de soin.",
    cuisine: [
      "Deux ou trois gousses écrasées dans le riz ou le lait",
      "Les graines moulues dans le chaï et les desserts",
      "Une gousse à mâcher après le repas",
    ],
    avecQuoi: ["Le lait et le riz", "La cannelle et le safran", "L'eau de rose"],
    garder: ["En gousses : un an", "Moulue : quelques semaines seulement"],
    precautions: PRECAUTION_GENERALE,
    dansLes: ["chai", "melange-pitta"],
  },
  {
    id: "cannelle",
    nom: "Cannelle",
    translit: "tvak",
    deva: "त्वक्",
    latin: "Cinnamomum verum",
    nature: "Réchauffante",
    gout: "Piquante, douce",
    effets: { vata: "diminue", pitta: "augmente", kapha: "diminue" },
    enCuisine: "En bâton dans les boissons chaudes, en poudre sur les fruits cuits.",
    avec: "Pomme, cardamome, gingembre.",
    seGarde: "En bâtons : deux ans.",
    accroche:
      "L'écorce douce et chaude des boissons d'hiver. Préférez la cannelle de Ceylan, plus fine que la cannelle de Chine.",
    rasa: "Piquante, douce, amère",
    virya: "Chauffant",
    vipaka: "Piquant",
    usage:
      "Traditionnellement, on l'utilise pour réchauffer et aider la digestion des plats sucrés. C'est un usage traditionnel, pas une promesse de soin.",
    cuisine: [
      "Un bâton dans le chaï, le lait, les compotes",
      "Une pincée de poudre sur les fruits cuits et le porridge",
      "Dans le riz pilaf, avec la cardamome",
    ],
    avecQuoi: ["La pomme et la poire", "La cardamome et le gingembre", "Le lait"],
    garder: ["En bâtons : deux ans", "En poudre : six mois"],
    precautions:
      "En cuisine, aucune. La cannelle de Chine (casse) est riche en coumarine : en grande quantité, préférez la cannelle de Ceylan et demandez conseil à un professionnel de santé.",
    dansLes: ["chai", "lait-dore", "melange-vata"],
  },
  {
    id: "poivre",
    nom: "Poivre noir",
    translit: "marica",
    deva: "मरिच",
    latin: "Piper nigrum",
    nature: "Réchauffant",
    gout: "Piquant",
    effets: { vata: "diminue", pitta: "augmente", kapha: "diminue" },
    enCuisine: "Moulu au dernier moment, en fin de cuisson.",
    avec: "Curcuma, gingembre, miel.",
    seGarde: "En grains : deux ans.",
    accroche:
      "Le plus piquant de la boîte. Une pincée suffit : il réveille les plats et accompagne toujours le curcuma.",
    rasa: "Piquante",
    virya: "Chauffant",
    vipaka: "Piquant",
    usage:
      "Traditionnellement, on l'associe au curcuma et au gingembre pour stimuler un feu digestif paresseux. C'est un usage traditionnel, pas une promesse de soin.",
    cuisine: [
      "Moulu au dernier moment, en fin de cuisson",
      "Une pincée avec le curcuma, toujours",
      "Dans le rasam, le bouillon poivré",
    ],
    avecQuoi: ["Le curcuma", "Le gingembre", "Le miel"],
    garder: ["En grains : deux ans", "Moulu : il perd vite son parfum"],
    precautions: PRECAUTION_GENERALE,
    dansLes: ["chai", "lait-dore", "melange-kapha"],
  },
];

export interface Melange {
  id: string;
  nom: string;
  sousTitre: string;
  illu: string; // id d'une épice, pour l'illustration
  ingredients: string[];
  methode: string;
}

export const MELANGES: Melange[] = [
  {
    id: "chai",
    nom: "Chaï masala",
    sousTitre: "Pour deux tasses · Vata et Kapha",
    illu: "chai",
    ingredients: ["1 bâton de cannelle", "4 gousses de cardamome, écrasées", "3 clous de girofle", "2 cm de gingembre frais, en lamelles", "4 grains de poivre noir"],
    methode:
      "Faire frémir les épices 10 minutes dans 300 ml d'eau. Ajouter 1 cuillère de thé noir, puis 200 ml de lait. Laisser monter, filtrer, sucrer si l'on veut.",
  },
  {
    id: "the-ccf",
    nom: "Thé cumin, coriandre, fenouil",
    sousTitre: "Pour la journée · les trois doshas",
    illu: "fenouil",
    ingredients: ["½ cuillère à café de graines de cumin", "½ cuillère à café de graines de coriandre", "½ cuillère à café de graines de fenouil"],
    methode:
      "Infuser 10 minutes dans 1 litre d'eau chaude. Filtrer, garder dans une bouteille isotherme et boire tiède, par petites gorgées, au fil de la journée.",
  },
  {
    id: "lait-dore",
    nom: "Lait doré",
    sousTitre: "Pour une tasse · le soir",
    illu: "curcuma",
    ingredients: ["250 ml de lait, ou de lait d'amande", "½ cuillère à café de curcuma", "1 pincée de poivre noir", "1 pincée de cannelle et de gingembre", "1 cuillère à café de miel"],
    methode:
      "Chauffer le lait avec les épices sans faire bouillir. Laisser tiédir avant d'ajouter le miel : l'Ayurveda déconseille de le chauffer.",
  },
  {
    id: "melange-vata",
    nom: "Mélange pour Vata",
    sousTitre: "À saupoudrer · chaud et doux",
    illu: "cumin",
    ingredients: ["2 parts de cumin", "2 parts de coriandre", "1 part de fenouil", "1 part de gingembre en poudre", "½ part de cannelle", "Une pincée de sel"],
    methode: "Torréfier les graines à sec, laisser refroidir, moudre avec le reste. Une cuillère à café dans les soupes, le riz, les légumes.",
  },
  {
    id: "melange-pitta",
    nom: "Mélange pour Pitta",
    sousTitre: "À saupoudrer · frais et doux",
    illu: "coriandre",
    ingredients: ["2 parts de coriandre", "2 parts de fenouil", "1 part de cumin", "½ part de cardamome", "½ part de curcuma"],
    methode: "Moudre sans torréfier. Une cuillère à café en fin de cuisson, ou sur un yaourt, une salade de légumes cuits.",
  },
  {
    id: "melange-kapha",
    nom: "Mélange pour Kapha",
    sousTitre: "À saupoudrer · piquant et léger",
    illu: "poivre",
    ingredients: ["1 part de gingembre en poudre", "1 part de curcuma", "1 part de cumin", "½ part de poivre noir", "½ part de graines de moutarde"],
    methode: "Torréfier cumin et moutarde, moudre avec le reste. Une cuillère à café dans les légumes, les lentilles, les soupes.",
  },
];

export const PLANTES = [
  { nom: "Ashwagandha", texte: "Le tonique du système nerveux, contre le stress." },
  { nom: "Tulsi", texte: "Le basilic sacré, pour l'immunité." },
  { nom: "Triphala", texte: "Trois fruits réunis, pour un transit régulier." },
  { nom: "Brahmi", texte: "La plante de la concentration." },
  { nom: "Shatavari", texte: "Le tonique de la femme." },
];

/* ───────── Les recettes ───────── */

export type Saison = "Automne" | "Hiver" | "Printemps" | "Été";

export interface Recette {
  id: string;
  nom: string;
  rubrique: string;
  doshas: DoshaKey[];
  saisons: Saison[] | "toute l'année";
  minutes: number;
  membres: boolean;
  teinte: string;
}

const T = (d: string): DoshaKey[] => (d === "Les trois" ? ["vata", "pitta", "kapha"] : (d.toLowerCase().split(", ") as DoshaKey[]));
const S = (s: string): Saison[] | "toute l'année" => (s === "Toute l'année" ? "toute l'année" : (s.split(", ") as Saison[]));
const slug = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .slice(0, 5)
    .join("-");

const CARNET: [string, [string, string, string, number, boolean, string][]][] = [
  ["Le matin", [
    ["Porridge d'avoine, dattes et cardamome", "Vata", "Automne, Hiver", 15, false, "#E8DFB8"],
    ["Compote de pommes à la cannelle et au ghee", "Vata, Pitta", "Toute l'année", 15, true, "#DDE3D6"],
    ["Upma de semoule aux légumes", "Kapha", "Printemps", 20, true, "#DCE3DF"],
    ["Crêpes de sarrasin au gingembre", "Kapha", "Hiver, Printemps", 25, true, "#E2D6DE"],
    ["Riz au lait de coco et à la mangue", "Pitta", "Été", 25, true, "#E8DFB8"],
  ]],
  ["Les plats", [
    ["Kitchari", "Les trois", "Toute l'année", 40, false, "#E8DFB8"],
    ["Dal de lentilles corail au cumin", "Vata, Kapha", "Automne, Hiver", 30, true, "#DDE3D6"],
    ["Dal de mungo jaune à la coriandre", "Pitta", "Été", 35, true, "#DCE3DF"],
    ["Curry de patate douce et épinards", "Vata", "Automne", 35, true, "#DDE3D6"],
    ["Riz basmati au cumin et aux petits pois", "Les trois", "Toute l'année", 20, true, "#D6E2DD"],
    ["Courgettes sautées à la coriandre", "Pitta", "Été", 20, true, "#D6E2DD"],
    ["Quinoa aux légumes racines et au fenouil", "Vata", "Automne, Hiver", 35, true, "#E2D6DE"],
    ["Chou-fleur au curcuma et à la moutarde", "Kapha", "Printemps", 30, true, "#E8DFB8"],
    ["Légumes rôtis au curcuma et au poivre", "Kapha", "Printemps, Hiver", 40, true, "#DCE3DF"],
  ]],
  ["Les soupes", [
    ["Velouté de courge au gingembre", "Vata", "Automne", 35, false, "#DDE3D6"],
    ["Velouté de fenouil et de courgette", "Pitta", "Été", 30, true, "#D6E2DD"],
    ["Rasam, le bouillon poivré du sud de l'Inde", "Kapha, Vata", "Hiver", 25, true, "#E2D6DE"],
    ["Bouillon de légumes au gingembre et au poivre", "Kapha", "Printemps", 30, true, "#DCE3DF"],
  ]],
  ["À côté", [
    ["Raïta concombre et menthe", "Pitta", "Été", 10, false, "#D6E2DD"],
    ["Chutney de coriandre fraîche", "Pitta", "Été", 10, true, "#DCE3DF"],
    ["Chutney de dattes et de gingembre", "Vata", "Hiver", 20, true, "#DDE3D6"],
    ["Ghee maison", "Vata, Pitta", "Toute l'année", 40, false, "#E8DFB8"],
  ]],
  ["Les boissons", [
    ["Takra, le lassi digestif au cumin", "Les trois", "Toute l'année", 5, false, "#E2D6DE"],
    ["Lassi à la menthe", "Pitta", "Été", 5, true, "#D6E2DD"],
    ["Eau de coriandre", "Pitta", "Été", 5, true, "#DCE3DF"],
    ["Infusion gingembre et citron", "Kapha", "Printemps, Hiver", 10, true, "#E8DFB8"],
  ]],
  ["Les douceurs", [
    ["Kheer, le riz au lait à la cardamome", "Vata, Pitta", "Hiver", 45, true, "#E2D6DE"],
    ["Poires pochées à la cannelle", "Vata", "Automne", 25, true, "#DDE3D6"],
    ["Boules de dattes et d'amandes", "Vata", "Automne, Hiver", 15, true, "#E8DFB8"],
    ["Halwa de carottes", "Vata", "Hiver", 40, true, "#DDE3D6"],
  ]],
];

export const RUBRIQUES = CARNET.map(([titre]) => titre);

export const RECETTES: Recette[] = CARNET.flatMap(([rubrique, liste]) =>
  liste.map(([nom, d, s, minutes, membres, teinte]) => ({
    id: slug(nom.split(",")[0]),
    nom,
    rubrique,
    doshas: T(d),
    saisons: S(s),
    minutes,
    membres,
    teinte,
  })),
);

/** Filtre des recettes : dosha apaisé, saison, et « moins de 20 minutes ». */
export function filtrerRecettes(
  recettes: Recette[],
  f: { dosha?: DoshaKey | null; saison?: Saison | null; rapide?: boolean },
): Recette[] {
  return recettes.filter(
    (r) =>
      (!f.dosha || r.doshas.includes(f.dosha)) &&
      (!f.saison || r.saisons === "toute l'année" || r.saisons.includes(f.saison)) &&
      (!f.rapide || r.minutes < 20),
  );
}

/** Une recette complète : la seule rédigée pour l'instant, le kitchari. [À FAIRE] rédiger les autres. */
export interface RecetteComplete {
  id: string;
  intro: string;
  portions: string;
  ingredients: string[];
  etapes: string[];
  astuce: string;
}

export const RECETTES_COMPLETES: Record<string, RecetteComplete> = {
  kitchari: {
    id: "kitchari",
    intro:
      "Riz et lentilles jaunes mijotés au ghee, au cumin et au curcuma. Le plat de base de l'Ayurveda : doux pour la digestion, il convient aux trois doshas.",
    portions: "Pour 4 personnes",
    ingredients: [
      "150 g de riz basmati",
      "100 g de haricots mungo jaunes cassés (moong dal)",
      "1 cuillère à soupe de ghee",
      "1 cuillère à café de graines de cumin",
      "1 cuillère à café de curcuma",
      "1 cuillère à café de coriandre moulue",
      "2 cm de gingembre frais, râpé",
      "1 litre d'eau",
      "1 cuillère à café de sel",
      "Des légumes de saison en dés : courgette, carotte, épinards…",
      "Coriandre fraîche et un filet de citron, pour servir",
    ],
    etapes: [
      "Rincer le riz et les mungo jusqu'à ce que l'eau soit claire.",
      "Chauffer le ghee dans une cocotte. Y jeter le cumin et attendre qu'il crépite.",
      "Ajouter le gingembre, le curcuma et la coriandre, remuer 30 secondes.",
      "Ajouter le riz et les mungo, bien les enrober d'épices, puis verser l'eau et le sel.",
      "Porter à ébullition, couvrir et laisser mijoter 25 minutes à feu doux.",
      "Ajouter les légumes, poursuivre 10 minutes. Le kitchari doit être fondant, presque comme un porridge.",
      "Servir avec la coriandre fraîche et un filet de citron.",
    ],
    astuce:
      "Pour Vata, ajoutez un peu plus de ghee. Pour Pitta, plus de coriandre et moins de gingembre. Pour Kapha, moins de ghee et une pincée de poivre noir.",
  },
};
