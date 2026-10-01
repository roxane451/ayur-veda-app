import type { DoshaKey } from "@/lib/doshaLogic";

/** Repères simples, sans promesse de soin. [À VALIDER] par une praticienne. */
export const PORTRAITS: Record<DoshaKey, string> = {
  vata: "Vata domine chez vous. On vous dit vif et inventif. La régularité vous aide, tout comme la chaleur et les moments calmes.",
  pitta: "Pitta domine chez vous. Vous êtes concentré et vous allez au bout des choses. La fraîcheur et la modération vous équilibrent.",
  kapha: "Kapha domine chez vous. Vous êtes calme et endurant. Bouger et manger léger vous équilibrent, et un peu de nouveauté vous réveille.",
};

export const PORTRAIT_TRIDOSHA =
  "Les trois doshas sont presque à égalité chez vous. Suivre le rythme des saisons suffit le plus souvent à garder l'équilibre.";

export const CONSEILS: Record<DoshaKey, string[]> = {
  vata: [
    "Des plats chauds et cuits, comme une soupe, un dal ou un riz au ghee",
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
    "Changer d'itinéraire ou d'horaires de temps en temps",
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
