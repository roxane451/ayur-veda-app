import type { Recette } from "@/data/cuisine";
import { NOM_DOSHA } from "@/lib/doshaLogic";

export const doshasTexte = (r: Recette) =>
  r.doshas.length === 3 ? "Les trois doshas" : r.doshas.map((d) => NOM_DOSHA[d]).join(", ");

export const saisonsTexte = (r: Recette) => (r.saisons === "toute l'année" ? "Toute l'année" : r.saisons.join(", "));
