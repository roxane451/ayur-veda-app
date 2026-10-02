/**
 * Contenus des pages « Les qualités » et « Le corps et l'esprit ».
 * D'après Charaka (Sūtrasthāna 1, 11 et 26 ; Vimānasthāna 1) et la tradition classique.
 * [À VALIDER] par une praticienne.
 */
import type { DoshaKey } from "@/lib/doshaLogic";
import type { Ref } from "./sources";

/* ───────── Les vingt qualités, en dix paires ───────── */

export interface PaireQualites {
  gauche: { nom: string; sanskrit: string; doshas: DoshaKey[] };
  droite: { nom: string; sanskrit: string; doshas: DoshaKey[] };
}

export const PAIRES_QUALITES: PaireQualites[] = [
  { gauche: { nom: "Lourd", sanskrit: "guru", doshas: ["kapha"] }, droite: { nom: "Léger", sanskrit: "laghu", doshas: ["vata", "pitta"] } },
  { gauche: { nom: "Lent", sanskrit: "manda", doshas: ["kapha"] }, droite: { nom: "Vif", sanskrit: "tīkṣṇa", doshas: ["pitta"] } },
  { gauche: { nom: "Froid", sanskrit: "śīta", doshas: ["vata", "kapha"] }, droite: { nom: "Chaud", sanskrit: "uṣṇa", doshas: ["pitta"] } },
  { gauche: { nom: "Onctueux", sanskrit: "snigdha", doshas: ["kapha", "pitta"] }, droite: { nom: "Sec", sanskrit: "rūkṣa", doshas: ["vata"] } },
  { gauche: { nom: "Lisse", sanskrit: "ślakṣṇa", doshas: ["kapha"] }, droite: { nom: "Rugueux", sanskrit: "khara", doshas: ["vata"] } },
  { gauche: { nom: "Dense", sanskrit: "sāndra", doshas: [] }, droite: { nom: "Fluide", sanskrit: "drava", doshas: ["pitta"] } },
  { gauche: { nom: "Mou", sanskrit: "mṛdu", doshas: ["kapha"] }, droite: { nom: "Dur", sanskrit: "kaṭhina", doshas: [] } },
  { gauche: { nom: "Stable", sanskrit: "sthira", doshas: ["kapha"] }, droite: { nom: "Mobile", sanskrit: "cala", doshas: ["vata"] } },
  { gauche: { nom: "Grossier", sanskrit: "sthūla", doshas: [] }, droite: { nom: "Subtil", sanskrit: "sūkṣma", doshas: ["vata"] } },
  { gauche: { nom: "Gluant", sanskrit: "picchila", doshas: ["kapha"] }, droite: { nom: "Clair", sanskrit: "viśada", doshas: ["vata"] } },
];

/* ───────── Vipāka : les six saveurs ramenées à trois effets ───────── */

export const VIPAKA = [
  { nom: "Doux", sanskrit: "madhura", saveurs: ["Doux", "Salé"], nourrit: "kapha" as DoshaKey },
  { nom: "Acide", sanskrit: "amla", saveurs: ["Acide"], nourrit: "pitta" as DoshaKey },
  { nom: "Piquant", sanskrit: "kaṭu", saveurs: ["Piquant", "Amer", "Astringent"], nourrit: "vata" as DoshaKey },
];

/* ───────── Les trois piliers (trayopastambha) ───────── */

export const PILIERS = [
  { nom: "L'alimentation", sanskrit: "āhāra", deva: "आहार", texte: "Manger selon sa nature, à heures régulières, et seulement quand on a faim." },
  { nom: "Le sommeil", sanskrit: "nidrā", deva: "निद्रा", texte: "Dormir la nuit, à heures régulières. Pour Charaka, un bon sommeil donne force, embonpoint et clarté." },
  { nom: "La maîtrise de soi", sanskrit: "brahmacarya", deva: "ब्रह्मचर्य", texte: "La maîtrise des sens et des désirs, à commencer par une sexualité mesurée." },
];

/* ───────── Les sept tissus (dhātu) ───────── */

export const DHATUS = [
  { nom: "Rasa", deva: "रस", fr: "Le plasma" },
  { nom: "Rakta", deva: "रक्त", fr: "Le sang" },
  { nom: "Māṃsa", deva: "मांस", fr: "Les muscles" },
  { nom: "Meda", deva: "मेद", fr: "La graisse" },
  { nom: "Asthi", deva: "अस्थि", fr: "Les os" },
  { nom: "Majjā", deva: "मज्जा", fr: "La moelle" },
  { nom: "Śukra", deva: "शुक्र", fr: "Les tissus reproducteurs" },
];

/* ───────── Les trois qualités de l'esprit (triguṇa) ───────── */

export const GUNAS_ESPRIT = [
  {
    nom: "Sattva",
    deva: "सत्त्व",
    essence: "La clarté",
    texte: "Un esprit pur et bienveillant, maître de lui, attaché à ce qui est vrai et juste.",
    fond: "bg-carte text-encre",
  },
  {
    nom: "Rajas",
    deva: "रजस्",
    essence: "Le mouvement",
    texte: "Un esprit actif mais agité, prompt à la colère, à l'orgueil et au désir.",
    fond: "bg-aubergine text-pistache",
  },
  {
    nom: "Tamas",
    deva: "तमस्",
    essence: "L'inertie",
    texte: "Un esprit lourd et confus, porté à la paresse et au sommeil.",
    fond: "bg-encre text-pistache",
  },
];

export const REFS_QUALITES: Ref[] = [
  { texte: "charaka", passage: "Sūtrasthāna 1.59 à 1.61", sujet: "Les qualités de chaque dosha" },
  { texte: "vagbhata", passage: "Sūtrasthāna 1.11 et 1.12", sujet: "Pitta léger, Kapha lent et lisse, qualités ajoutées par Vāgbhaṭa" },
  { texte: "charaka", passage: "Sūtrasthāna 1.44", sujet: "Le semblable augmente le semblable, le contraire le diminue" },
];

export const REFS_TISSUS: Ref[] = [
  { texte: "sushruta", passage: "Sūtrasthāna 14.10 à 14.14", sujet: "La chaîne des sept tissus, et le mois qu'il faut pour la parcourir" },
  { texte: "charaka", passage: "Sūtrasthāna 17.73 à 17.77", sujet: "L'ojas, son siège au cœur, et ce qui l'use" },
  { texte: "sushruta", passage: "Sūtrasthāna 15.3 à 15.5", sujet: "Les doshas, les tissus et les déchets" },
];

export const REFS_ESPRIT: Ref[] = [
  { texte: "charaka", passage: "Sūtrasthāna 1.57", sujet: "Rajas et tamas, les deux doshas de l'esprit" },
  { texte: "charaka", passage: "Śārīrasthāna 4.36 à 4.39", sujet: "Les trois sortes d'esprit, et leurs seize types" },
];

export const REFS_PILIERS: Ref[] = [{ texte: "charaka", passage: "Sūtrasthāna 11.35", sujet: "Les trois soutiens de la vie" }];
