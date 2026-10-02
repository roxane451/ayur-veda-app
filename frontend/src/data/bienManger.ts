/**
 * Les règles du repas et les associations à éviter.
 * D'après Charaka : Vimānasthāna 1 (règles du repas), Vimānasthāna 2 (quantité),
 * Sūtrasthāna 26 (aliments incompatibles). [À VALIDER] par une praticienne.
 */

export const REGLES_REPAS = [
  { titre: "Manger chaud", sanskrit: "uṣṇam", texte: "Un plat chaud réveille le feu digestif et se digère vite." },
  { titre: "Un peu de gras", sanskrit: "snigdham", texte: "Un filet de ghee ou d'huile rend le repas plus digeste et nourrit." },
  { titre: "En juste quantité", sanskrit: "mātrāvat", texte: "Assez pour être rassasié, jamais au point d'être lourd." },
  { titre: "Quand le repas précédent est digéré", sanskrit: "jīrṇe", texte: "Attendre d'avoir vraiment faim avant de manger à nouveau." },
  { titre: "Des aliments qui vont ensemble", sanskrit: "vīrya-aviruddham", texte: "Éviter les associations incompatibles, détaillées plus bas." },
  { titre: "Dans un lieu agréable", sanskrit: "iṣṭe deśe", texte: "Un endroit calme, avec ce qu'il faut sous la main." },
  { titre: "Ni trop vite", sanskrit: "nātidrutam", texte: "Le repas avalé en hâte se digère mal." },
  { titre: "Ni trop lentement", sanskrit: "nātivilambitam", texte: "Le repas qui traîne refroidit et se mange sans faim." },
  { titre: "Sans parler ni rire", sanskrit: "ajalpan ahasan", texte: "Pour garder l'attention sur ce qu'on mange." },
  { titre: "En pensant à soi", sanskrit: "ātmānam abhisamīkṣya", texte: "Choisir selon ce qui nous convient, à ce moment-là." },
];

export const ASSOCIATIONS = [
  { a: "Lait", b: "Poisson", texte: "Le poisson chauffe et le lait rafraîchit, leurs effets s'opposent." },
  { a: "Lait", b: "Fruits acides", texte: "L'acide fait tourner le lait dans l'estomac." },
  { a: "Miel", b: "Chaleur", texte: "Le miel chauffé ou cuit devient difficile à éliminer." },
  { a: "Miel", b: "Ghee à parts égales", texte: "Chacun est bon seul, mais à poids égal ils s'opposent." },
  { a: "Lait", b: "Radis", texte: "Une association lourde, déconseillée dans les textes." },
  { a: "Yaourt", b: "Le soir", texte: "Pris le soir, il alourdit et encombre. On le garde pour le midi." },
];
