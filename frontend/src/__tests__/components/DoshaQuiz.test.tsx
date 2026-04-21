/**
 * Tests — DoshaQuiz
 *
 * Couvre : affichage initial, navigation entre questions,
 * calcul des scores, affichage des résultats, reset du quiz.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DoshaQuiz from '../../components/DoshaQuiz';

// ── Helpers ───────────────────────────────────────────────────────────────

/** Démarre le quiz depuis l'écran d'accueil. */
const startQuiz = () => {
  render(<DoshaQuiz />);
  fireEvent.click(screen.getByRole('button', { name: /commencer le quiz/i }));
};

/**
 * Répond à N questions en choisissant toujours la 1ère option
 * (option A = vata dans la plupart des cas).
 */
const answerNQuestions = (n: number) => {
  for (let i = 0; i < n; i++) {
    const options = screen.getAllByRole('button');
    // Le bouton "Question précédente" peut être présent — on prend les options A/B/C
    const answerButtons = options.filter((btn) =>
      btn.textContent?.trim().length && !btn.textContent?.includes('précédente')
    );
    if (answerButtons.length > 0) {
      fireEvent.click(answerButtons[0]);
    }
  }
};

// ── Écran d'accueil ───────────────────────────────────────────────────────
describe('DoshaQuiz — écran d\'accueil', () => {
  it('affiche le titre du quiz', () => {
    render(<DoshaQuiz />);
    expect(
      screen.getByText(/quiz dosha ayurveda/i)
    ).toBeInTheDocument();
  });

  it('affiche les 3 doshas (Vata, Pitta, Kapha)', () => {
    render(<DoshaQuiz />);
    expect(screen.getByText('VATA')).toBeInTheDocument();
    expect(screen.getByText('PITTA')).toBeInTheDocument();
    expect(screen.getByText('KAPHA')).toBeInTheDocument();
  });

  it('affiche le bouton "Commencer le Quiz"', () => {
    render(<DoshaQuiz />);
    expect(
      screen.getByRole('button', { name: /commencer le quiz/i })
    ).toBeInTheDocument();
  });

  it('n\'affiche pas encore de question au démarrage', () => {
    render(<DoshaQuiz />);
    expect(screen.queryByText(/question 1 sur/i)).not.toBeInTheDocument();
  });
});

// ── Navigation dans le quiz ───────────────────────────────────────────────
describe('DoshaQuiz — navigation', () => {
  it('affiche la première question après avoir cliqué sur "Commencer"', () => {
    startQuiz();
    expect(screen.getByText(/question 1 sur/i)).toBeInTheDocument();
  });

  it('avance à la question suivante après une réponse', () => {
    startQuiz();
    const firstOption = screen.getAllByRole('button')[0];
    fireEvent.click(firstOption);
    expect(screen.getByText(/question 2 sur/i)).toBeInTheDocument();
  });

  it('affiche le bouton "Question précédente" après la 1ère réponse', () => {
    startQuiz();
    const firstOption = screen.getAllByRole('button')[0];
    fireEvent.click(firstOption);
    expect(
      screen.getByText(/question précédente/i)
    ).toBeInTheDocument();
  });

  it('revient à la question précédente quand on clique sur "Précédente"', () => {
    startQuiz();
    // Répond à la Q1
    fireEvent.click(screen.getAllByRole('button')[0]);
    // On est en Q2 — clique sur "précédente"
    fireEvent.click(screen.getByText(/question précédente/i));
    expect(screen.getByText(/question 1 sur/i)).toBeInTheDocument();
  });

  it('affiche la barre de progression', () => {
    startQuiz();
    expect(screen.getByText(/0%/i)).toBeInTheDocument();
  });
});

// ── Calcul des résultats ──────────────────────────────────────────────────
describe('DoshaQuiz — résultats', () => {
  /**
   * Pour tester les résultats on doit répondre à TOUTES les questions.
   * On compte le nombre total à partir du texte "X questions" sur l'écran
   * d'accueil, puis on répond à chacune.
   */
  const completeQuiz = (alwaysPickIndex = 0) => {
    render(<DoshaQuiz />);
    // Lire le nb de questions depuis l'écran d'accueil
    const countText = screen.getByText(/\d+ questions/i);
    const total = parseInt(countText.textContent?.match(/\d+/)?.[0] ?? '30');

    fireEvent.click(screen.getByRole('button', { name: /commencer/i }));

    for (let i = 0; i < total; i++) {
      const buttons = screen
        .getAllByRole('button')
        .filter(
          (b) =>
            b.textContent &&
            b.textContent.trim().length > 0 &&
            !b.textContent.includes('précédente') &&
            !b.textContent.includes('Commencer')
        );
      if (buttons[alwaysPickIndex]) {
        fireEvent.click(buttons[alwaysPickIndex]);
      } else if (buttons[0]) {
        fireEvent.click(buttons[0]);
      }
    }
  };

  it('affiche l\'écran de résultats après toutes les réponses', () => {
    completeQuiz();
    expect(screen.getByText(/vos résultats/i)).toBeInTheDocument();
  });

  it('affiche les 3 pourcentages de doshas dans les résultats', () => {
    completeQuiz();
    // Chaque dosha doit avoir un pourcentage (ex : "45.2%")
    const percentTexts = screen.getAllByText(/%/);
    expect(percentTexts.length).toBeGreaterThanOrEqual(3);
  });

  it('affiche le profil (type de constitution)', () => {
    completeQuiz();
    // Le label de profil doit contenir VATA, PITTA ou KAPHA
    const body = document.body.textContent ?? '';
    const hasDoshaLabel =
      /VATA|PITTA|KAPHA|TRI-DOSHA/i.test(body);
    expect(hasDoshaLabel).toBe(true);
  });

  it('affiche le bouton "Refaire le Quiz"', () => {
    completeQuiz();
    expect(
      screen.getByRole('button', { name: /refaire le quiz/i })
    ).toBeInTheDocument();
  });

  it('"Refaire le Quiz" remet à zéro l\'écran d\'accueil', () => {
    completeQuiz();
    fireEvent.click(screen.getByRole('button', { name: /refaire le quiz/i }));
    expect(
      screen.getByRole('button', { name: /commencer le quiz/i })
    ).toBeInTheDocument();
  });
});
