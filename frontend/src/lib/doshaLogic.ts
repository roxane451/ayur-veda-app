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
