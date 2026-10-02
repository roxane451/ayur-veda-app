import { CONTENU_PAYANT } from "@/lib/offre";

/** Les pages de la rubrique « Au quotidien ». */
export const PAGES_QUOTIDIEN = [
  { titre: "Les saisons", href: "/au-quotidien" },
  { titre: "La journée", href: "/au-quotidien/journee" },
  { titre: "Mon programme", href: "/au-quotidien/programme" },
].filter((p) => CONTENU_PAYANT || p.href !== "/au-quotidien/programme");
