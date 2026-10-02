/**
 * Les règles du repas et les associations à éviter.
 * D'après Charaka : Vimānasthāna 1 (règles du repas), Vimānasthāna 2 (quantité),
 * Sūtrasthāna 26 (aliments incompatibles), Sūtrasthāna 7 (lait caillé). [À VALIDER] par une praticienne.
 */
import type { Ref } from "./sources";

export const REGLES_REPAS = [
  { titre: "Manger chaud", sanskrit: "uṣṇam", texte: "Un plat chaud réveille le feu digestif et se digère vite." },
  { titre: "Un peu de gras", sanskrit: "snigdham", texte: "Un filet de ghee ou d'huile rend le repas plus digeste et nourrit." },
  { titre: "En juste quantité", sanskrit: "mātrāvat", texte: "Assez pour être rassasié, sans lourdeur. Pris en juste quantité, le repas ne dérange pas les doshas." },
  { titre: "Quand le repas précédent est digéré", sanskrit: "jīrṇe", texte: "Attendre d'avoir faim. Un repas pris trop tôt se mêle au précédent, encore mal digéré, et dérange les doshas." },
  { titre: "Des aliments qui vont ensemble", sanskrit: "vīrya-aviruddham", texte: "Éviter les associations incompatibles, détaillées plus bas." },
  { titre: "Dans un lieu agréable", sanskrit: "iṣṭe deśe, iṣṭasarvopakaraṇam", texte: "Un endroit agréable, avec tout ce qu'il faut sous la main, pour manger l'esprit tranquille." },
  { titre: "Ni trop vite", sanskrit: "nātidrutam", texte: "Avalé trop vite, le repas peut passer de travers, et l'on ne sent ni son goût ni ses défauts." },
  { titre: "Ni trop lentement", sanskrit: "nātivilambitam", texte: "Le repas qui traîne ne rassasie pas, on mange trop, et les plats refroidissent et se digèrent mal." },
  { titre: "Sans parler ni rire, l'esprit tout entier à son assiette", sanskrit: "ajalpan ahasan tanmanā", texte: "Parler ou rire en mangeant expose aux mêmes troubles que manger trop vite." },
  { titre: "En pensant à soi", sanskrit: "ātmānam abhisamīkṣya", texte: "Choisir selon ce qui nous convient, à ce moment-là." },
];

export const ASSOCIATIONS = [
  { a: "Lait", b: "Poisson", texte: "Le poisson est chauffant, le lait rafraîchissant. Pris ensemble, ils encrassent les canaux du corps et vicient le sang, dit Charaka." },
  { a: "Lait", b: "Fruits acides", texte: "Charaka déconseille de prendre du lait avec tout ce qui est acide, fruits compris." },
  { a: "Miel", b: "Chaleur", texte: "Chauffé, ou mêlé à des aliments brûlants, le miel devient toxique. Les textes le comparent à un poison." },
  { a: "Miel", b: "Ghee à parts égales", texte: "Chacun est bon seul, mais mêlés à poids égal, ils deviennent nocifs." },
  { a: "Lait", b: "Radis", texte: "Charaka déconseille le lait après le radis, l'ail et d'autres légumes verts, qui exposent aux maladies de peau." },
  { a: "Yaourt", b: "Le soir", texte: "Charaka déconseille le lait caillé le soir, comme pris chaud ou sans accompagnement. Mal consommé, il expose à la fièvre, aux troubles du sang et aux maladies de peau." },
];

export const REFS_BIEN_MANGER: Ref[] = [
  { texte: "charaka", passage: "Vimānasthāna 1.24 et 1.25", sujet: "Les règles du repas" },
  { texte: "charaka", passage: "Vimānasthāna 2.3", sujet: "Les trois parts de l'estomac" },
  { texte: "charaka", passage: "Sūtrasthāna 26.81 à 26.101", sujet: "Les aliments incompatibles" },
  { texte: "charaka", passage: "Sūtrasthāna 7.61 et 7.62", sujet: "Le lait caillé" },
  { texte: "charaka", passage: "Sūtrasthāna 27", sujet: "Le miel chauffé, comparé à un poison" },
];
