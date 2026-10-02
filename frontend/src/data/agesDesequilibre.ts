/**
 * Contenus des pages « Les âges de la vie » (Charaka, Vimānasthāna 8)
 * et « Comment naît un déséquilibre » (Sushruta, Sūtrasthāna 21).
 * [À VALIDER] par une praticienne.
 */
import type { DoshaKey } from "@/lib/doshaLogic";

export const AGES = [
  {
    nom: "L'enfance et la jeunesse",
    sanskrit: "bāla",
    deva: "बाल",
    dosha: "kapha" as DoshaKey,
    periode: "jusqu'à 30 ans",
    part: 30,
    texte: "Le corps se construit. Jusqu'à seize ans, les tissus ne sont pas encore mûrs, puis ils continuent de se renforcer jusqu'à trente ans.",
    exces: "Rhumes, mucus, appétit irrégulier, lourdeur après les repas.",
    aide: "Nourrir sans alourdir, bouger chaque jour, préférer les épices douces au sucre.",
  },
  {
    nom: "L'âge adulte",
    sanskrit: "madhya",
    deva: "मध्य",
    dosha: "pitta" as DoshaKey,
    periode: "de 30 à 60 ans",
    part: 30,
    texte: "Le feu est au plus fort. L'énergie, l'ambition et la digestion sont solides, l'esprit décidé.",
    exces: "Irritabilité, acidité, inflammations, surmenage.",
    aide: "Garder de la fraîcheur et de la modération, ne pas sauter les repas, savoir s'arrêter.",
  },
  {
    nom: "La vieillesse",
    sanskrit: "jīrṇa",
    deva: "जीर्ण",
    dosha: "vata" as DoshaKey,
    periode: "après 60 ans",
    part: 40,
    texte: "Le corps s'allège et s'assèche. L'esprit gagne en recul, le sommeil devient plus léger.",
    exces: "Peau sèche, articulations raides, constipation, oublis, inquiétude.",
    aide: "Chaleur, régularité, huiles en cuisine et en massage, repas cuits et onctueux.",
  },
];

export const CYCLES: { echelle: string; kapha: string; pitta: string; vata: string }[] = [
  { echelle: "Dans la journée", kapha: "Le matin", pitta: "Le milieu du jour", vata: "La fin d'après-midi" },
  { echelle: "Dans l'année, sous nos climats", kapha: "Le printemps", pitta: "L'été", vata: "L'automne" },
  { echelle: "Dans la vie", kapha: "L'enfance", pitta: "L'âge adulte", vata: "La vieillesse" },
];

export const ETAPES = [
  { nom: "Accumulation", sanskrit: "sañcaya", deva: "सञ्चय", texte: "Le dosha s'amasse à sa place. Les signes sont discrets, ventre tendu pour Vata, teint jaune pour Pitta, lourdeur pour Kapha, et l'on se détourne de ce qui l'a fait monter." },
  { nom: "Aggravation", sanskrit: "prakopa", deva: "प्रकोप", texte: "Il s'échauffe dans son siège sans encore en sortir. Ballonnements, aigreurs ou dégoût des aliments apparaissent." },
  { nom: "Diffusion", sanskrit: "prasara", deva: "प्रसर", texte: "Il quitte sa place et circule dans le corps. Les signes deviennent diffus et changeants." },
  { nom: "Localisation", sanskrit: "sthāna-saṃśraya", deva: "स्थानसंश्रय", texte: "Il se fixe dans un point faible, une articulation, la peau ou un organe déjà fragile." },
  { nom: "Manifestation", sanskrit: "vyakti", deva: "व्यक्ति", texte: "Le trouble apparaît clairement, avec ses signes propres. C'est là qu'on lui donne un nom." },
  { nom: "Complication", sanskrit: "bheda", deva: "भेद", texte: "Le trouble prend sa forme propre, se complique ou devient chronique." },
];

export const EXEMPLE_VATA = [
  "La fin de l'été est sèche et venteuse. Les mains et les lèvres sèchent un peu.",
  "À l'automne, le sommeil devient léger, le ventre gonfle le soir.",
  "Les inquiétudes vont et viennent, la fatigue change de place.",
  "La sécheresse se fixe sur les articulations du genou, déjà sollicitées.",
  "Le genou devient douloureux et craque. Le trouble a désormais un nom.",
  "La douleur revient chaque hiver et s'installe.",
];
