import type { DoshaKey } from "@/lib/doshaLogic";

/** Repères simples, sans promesse de soin. [À VALIDER] par une praticienne. */
export const PORTRAITS: Record<DoshaKey, string> = {
  vata: "Le mouvement : vif, créatif, léger. Vous avez besoin de régularité, de chaleur et de calme.",
  pitta: "Le feu : concentré, déterminé, chaleureux. Vous avez besoin de fraîcheur et de modération.",
  kapha: "La stabilité : calme, endurant, fidèle. Vous avez besoin de mouvement, de légèreté et de nouveauté.",
};

export const PORTRAIT_TRIDOSHA =
  "Les trois doshas sont presque à parts égales : une nature souple, qui demande surtout de suivre le rythme des saisons.";

export const CONSEILS: Record<DoshaKey, string[]> = {
  vata: [
    "Des plats chauds, cuits, un peu gras : soupes, dal, riz au ghee",
    "Des horaires réguliers pour les repas et le coucher",
    "Un massage à l'huile de sésame tiède le matin",
    "Gingembre, cannelle, cardamome, cumin",
  ],
  pitta: [
    "Des plats frais et doux, peu épicés",
    "Éviter la chaleur forte et les efforts aux heures chaudes",
    "Coriandre, fenouil, menthe, eau de coriandre",
    "Du temps dans la nature, sans objectif",
  ],
  kapha: [
    "Des repas légers et épicés, un dîner tôt",
    "Bouger tous les jours, de préférence le matin",
    "Gingembre, poivre, curcuma, infusions chaudes",
    "De la nouveauté : changer d'itinéraire, de rythme",
  ],
};

export const COULEUR_DOSHA: Record<DoshaKey, string> = {
  vata: "hsl(var(--vata))",
  pitta: "hsl(var(--pitta))",
  kapha: "hsl(var(--kapha))",
};

/** Espace insécable devant « ? : ! ; » (typographie française). */
export const fr = (t: string) =>
  t.replace(/ ([?:!;»])/g, "\u00a0$1").replace(/« /g, "«\u00a0");
