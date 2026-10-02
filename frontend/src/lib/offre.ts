/**
 * Le contenu payant (livres IV et V de Comprendre, programmes, recettes réservées, contenus à l'unité)
 * est affiché par défaut. La version publique sans paiement le masque avec VITE_CONTENU_PAYANT=false.
 */
export const CONTENU_PAYANT = import.meta.env.VITE_CONTENU_PAYANT !== "false";
