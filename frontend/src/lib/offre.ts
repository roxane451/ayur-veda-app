/**
 * Branche release/gratuit : le contenu payant (livres IV et V de Comprendre, programmes,
 * recettes réservées, contenus à l'unité) est masqué par défaut.
 * Pour l'afficher malgré tout, définir VITE_CONTENU_PAYANT=true au moment du build.
 */
export const CONTENU_PAYANT = import.meta.env.VITE_CONTENU_PAYANT === "true";
