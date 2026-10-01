/** Petits outils de rédaction : transformer une liste de données en texte courant. */

const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const minuscule = (t: string) => (/^[A-ZÀ-Ý][a-zà-ÿ]/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t);

/** « soupes et ragoûts » → « Soupes et ragoûts. » */
export const enPhrase = (t: string) => {
  const s = majuscule(t.trim());
  return /[.!?…]$/.test(s) ? s : `${s}.`;
};

/** Plusieurs consignes à la suite, une phrase chacune. */
export const enPhrases = (items: string[]) => items.map(enPhrase).join(" ");

/** ["Léger", "Froid", "Sec"] → « léger, froid et sec » (sans majuscule initiale). */
export const enListe = (items: string[]) => {
  const l = items.map((t) => minuscule(t.trim()));
  return l.length < 2 ? l.join("") : `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}`;
};

/** ["Anxiété", "Insomnie"] → « Anxiété et insomnie. » */
export const enListePhrase = (items: string[]) => enPhrase(enListe(items));
