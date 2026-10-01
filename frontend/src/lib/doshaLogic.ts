/**
 * doshaLogic.ts — Logique pure de calcul du profil ayurvédique
 *
 * Extrait de DoshaQuiz.tsx pour :
 *  - être testable indépendamment du composant React
 *  - éviter la duplication entre le composant et le fichier de test
 *  - pouvoir être réutilisé si d'autres composants en ont besoin
 *
 * Aucune dépendance React — ce module est un ensemble de fonctions pures.
 */

// ── Types exportés ────────────────────────────────────────────────────────

export interface QuizOption {
  text: string;
  vata?: number;
  pitta?: number;
  kapha?: number;
}

export type DoshaKey = "vata" | "pitta" | "kapha";

export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface DoshaPercentages {
  vata: string;
  pitta: string;
  kapha: string;
}

export type ProfileType = "mono" | "bi" | "tri" | "dominant";

export interface DoshaProfile {
  type: ProfileType;
  primary?: DoshaKey;
  secondary?: DoshaKey;
  label: string;
}

export interface QuizResults {
  scores: DoshaScores;
  percentages: DoshaPercentages;
  profile: DoshaProfile;
}

// ── Fonctions exportées ───────────────────────────────────────────────────

/**
 * Calcule les scores bruts à partir des réponses du quiz.
 * Chaque réponse peut contribuer à un ou plusieurs doshas.
 */
export function computeScores(answers: QuizOption[]): DoshaScores {
  const scores: DoshaScores = { vata: 0, pitta: 0, kapha: 0 };

  for (const answer of answers) {
    if (answer.vata)  scores.vata  += answer.vata;
    if (answer.pitta) scores.pitta += answer.pitta;
    if (answer.kapha) scores.kapha += answer.kapha;
  }

  return scores;
}

/**
 * Convertit les scores bruts en pourcentages (1 décimale).
 * Retourne {"vata":"0.0","pitta":"0.0","kapha":"0.0"} si total = 0
 * pour éviter une division par zéro.
 */
export function computePercentages(scores: DoshaScores): DoshaPercentages {
  const total = scores.vata + scores.pitta + scores.kapha;

  if (total === 0) {
    return { vata: "0.0", pitta: "0.0", kapha: "0.0" };
  }

  return {
    vata:  ((scores.vata  / total) * 100).toFixed(1),
    pitta: ((scores.pitta / total) * 100).toFixed(1),
    kapha: ((scores.kapha / total) * 100).toFixed(1),
  };
}

/**
 * Détermine le profil de constitution à partir des pourcentages.
 *
 * Règles :
 *  - MONO     : un dosha ≥ 60 %
 *  - BI       : écart entre dominant et secondaire ≤ 15 %
 *  - TRI      : écart max–min ≤ 20 % (équilibre des trois doshas)
 *  - DOMINANT : sinon (un dosha domine mais pas assez pour "mono")
 */
export function computeProfile(percentages: DoshaPercentages): DoshaProfile {
  const sorted = (
    Object.entries(percentages) as [DoshaKey, string][]
  ).sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));

  const [dominant, secondary] = sorted;
  const domVal  = parseFloat(dominant[1]);
  const secVal  = parseFloat(secondary[1]);
  const values  = Object.values(percentages).map(Number);
  const spread  = Math.max(...values) - Math.min(...values);

  if (domVal >= 60) {
    return {
      type: "mono",
      primary: dominant[0],
      label: `${dominant[0].toUpperCase()} Dominant`,
    };
  }

if (spread <= 20) {
  return {
    type: "tri",
    label: "TRI-DOSHA (Équilibré)",
  };
}

if (domVal - secVal <= 15) {
  return {
    type: "bi",
    primary: dominant[0],
    secondary: secondary[0],
    label: `${dominant[0].toUpperCase()}-${secondary[0].toUpperCase()}`,
  };
}

  return {
    type: "dominant",
    primary: dominant[0],
    secondary: secondary[0],
    label: `${dominant[0].toUpperCase()} avec tendance ${secondary[0].toUpperCase()}`,
  };
}

/**
 * Point d'entrée principal : calcule scores + pourcentages + profil
 * à partir du tableau de réponses brutes.
 */
export function calculateResults(answers: QuizOption[]): QuizResults {
  const scores      = computeScores(answers);
  const percentages = computePercentages(scores);
  const profile     = computeProfile(percentages);

  return { scores, percentages, profile };
}

// ── Quiz en deux parties : nature (prakriti) et état du moment (vikriti) ──

export const DOSHAS: DoshaKey[] = ["vata", "pitta", "kapha"];

export const NOM_DOSHA: Record<DoshaKey, string> = {
  vata: "Vata",
  pitta: "Pitta",
  kapha: "Kapha",
};

/** Seuil au-delà duquel un dosha est dit « en excès » (en points de pourcentage). */
export const SEUIL_EXCES = 10;

/** En dessous de ce total de points, la partie 2 dit simplement « proche de l'équilibre ». */
export const SEUIL_GENE = 6;

export type Parts = Record<DoshaKey, number>;

/** Parts entières qui totalisent exactement 100 (méthode des plus grands restes). */
export function partsEntieres(scores: DoshaScores): Parts {
  const total = scores.vata + scores.pitta + scores.kapha;
  if (total === 0) return { vata: 0, pitta: 0, kapha: 0 };
  const brut = DOSHAS.map((d) => ({ d, v: (scores[d] * 100) / total }));
  const parts = Object.fromEntries(brut.map(({ d, v }) => [d, Math.floor(v)])) as Parts;
  let reste = 100 - DOSHAS.reduce((s, d) => s + parts[d], 0);
  [...brut]
    .sort((a, b) => (b.v % 1) - (a.v % 1))
    .forEach(({ d }) => {
      if (reste > 0) {
        parts[d] += 1;
        reste -= 1;
      }
    });
  return parts;
}

export interface OptionPonderee {
  dosha: DoshaKey;
  poids: number;
}

/**
 * Partie 1 : chaque réponse est la liste des options cochées (une ou deux).
 * Quand deux options sont cochées, le poids de la question est partagé.
 */
export function scoresPrakriti(reponses: OptionPonderee[][]): DoshaScores {
  const scores: DoshaScores = { vata: 0, pitta: 0, kapha: 0 };
  for (const choix of reponses) {
    if (!choix.length) continue;
    for (const o of choix) scores[o.dosha] += o.poids / choix.length;
  }
  return scores;
}

/** Partie 2 : chaque affirmation vaut de 0 (jamais) à 3 (presque tous les jours). */
export function scoresVikriti(reponses: { dosha: DoshaKey; frequence: number }[]): DoshaScores {
  const scores: DoshaScores = { vata: 0, pitta: 0, kapha: 0 };
  for (const r of reponses) scores[r.dosha] += Math.max(0, Math.min(3, r.frequence));
  return scores;
}

/** Libellé lisible de la constitution : « Vata », « Vata-Pitta », « Tridosha »… */
export function libelleProfil(parts: Parts): string {
  const profil = computeProfile({
    vata: String(parts.vata),
    pitta: String(parts.pitta),
    kapha: String(parts.kapha),
  });
  const p = profil.primary ? NOM_DOSHA[profil.primary] : "";
  const s = profil.secondary ? NOM_DOSHA[profil.secondary] : "";
  switch (profil.type) {
    case "mono":
      return p;
    case "bi":
      return `${p}-${s}`;
    case "tri":
      return "Tridosha";
    default:
      return `${p}, tendance ${s}`;
  }
}

export function doshaDominant(parts: Parts): DoshaKey {
  return [...DOSHAS].sort((a, b) => parts[b] - parts[a])[0];
}

export type EtatDuMoment =
  | { type: "equilibre" }
  | { type: "exces"; dosha: DoshaKey; ecart: number }
  | { type: "reparti" };

/**
 * Compare l'état du moment à la nature.
 * Un dosha est en excès quand sa part dépasse celle de la nature de SEUIL_EXCES points ou plus.
 * Sans nature connue, on compare à une répartition égale (33 %).
 */
export function comparerEtat(scoresEtat: DoshaScores, nature?: Parts): EtatDuMoment {
  const total = scoresEtat.vata + scoresEtat.pitta + scoresEtat.kapha;
  if (total < SEUIL_GENE) return { type: "equilibre" };
  const etat = partsEntieres(scoresEtat);
  let pire: { dosha: DoshaKey; ecart: number } | null = null;
  for (const d of DOSHAS) {
    const ecart = etat[d] - (nature ? nature[d] : 33);
    if (ecart >= SEUIL_EXCES && (!pire || ecart > pire.ecart)) pire = { dosha: d, ecart };
  }
  return pire ? { type: "exces", ...pire } : { type: "reparti" };
}

/** Phrase courte sur l'écart d'un dosha entre la nature et le moment. */
export function noteEcart(nature: number, etat: number): string {
  const e = etat - nature;
  if (e >= SEUIL_EXCES) return `+${e} pts : en excès`;
  if (e <= -SEUIL_EXCES) return `−${-e} pts : en baisse`;
  return "proche de votre nature";
}
