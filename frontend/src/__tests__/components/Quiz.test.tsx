/**
 * Le quiz : une question par écran, jamais de liste.
 */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Quiz from "@/components/quiz/Quiz";
import { PRAKRITI, VIKRITI } from "@/data/quiz";

const rendre = () =>
  render(
    <MemoryRouter>
      <Quiz />
    </MemoryRouter>,
  );

const optionsVisibles = () => screen.getAllByRole("button", { pressed: false }).concat(screen.queryAllByRole("button", { pressed: true }));

beforeEach(() => window.localStorage.clear());
afterEach(() => vi.useRealTimers());

describe("Quiz — accueil", () => {
  it("présente les deux questionnaires", () => {
    rendre();
    expect(screen.getByRole("button", { name: "Découvrir ma nature" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Faire le point" })).toBeInTheDocument();
  });
});

describe("Quiz — partie 1, ma nature", () => {
  it("n'affiche qu'une seule question à la fois", () => {
    rendre();
    fireEvent.click(screen.getByRole("button", { name: "Découvrir ma nature" }));
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(PRAKRITI[0].question.replace(" ?", ""));
    expect(optionsVisibles().filter((b) => b.hasAttribute("aria-pressed"))).toHaveLength(3);
    expect(screen.getByText("Question 1 sur 20")).toBeInTheDocument();
  });

  it("coche une réponse, puis « Suivante » passe à la question 2", () => {
    rendre();
    fireEvent.click(screen.getByRole("button", { name: "Découvrir ma nature" }));
    expect(screen.queryByRole("button", { name: /suivante/i })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: PRAKRITI[0].options[1].texte }));
    expect(screen.getByRole("button", { name: PRAKRITI[0].options[1].texte })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: /suivante/i }));
    expect(screen.getByText("Question 2 sur 20")).toBeInTheDocument();
  });

  it("accepte deux réponses au plus", () => {
    rendre();
    fireEvent.click(screen.getByRole("button", { name: "Découvrir ma nature" }));
    PRAKRITI[0].options.forEach((o) => fireEvent.click(screen.getByRole("button", { name: o.texte })));
    expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(2);
  });

  it("revient en arrière en retrouvant la réponse donnée", () => {
    rendre();
    fireEvent.click(screen.getByRole("button", { name: "Découvrir ma nature" }));
    fireEvent.click(screen.getByRole("button", { name: PRAKRITI[0].options[2].texte }));
    fireEvent.click(screen.getByRole("button", { name: /suivante/i }));
    fireEvent.click(screen.getByRole("button", { name: "Question précédente" }));
    expect(screen.getByText("Question 1 sur 20")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: PRAKRITI[0].options[2].texte })).toHaveAttribute("aria-pressed", "true");
  });

  it("donne la nature à la fin et la garde sur l'appareil", () => {
    rendre();
    fireEvent.click(screen.getByRole("button", { name: "Découvrir ma nature" }));
    for (const q of PRAKRITI) {
      const vata = q.options.find((o) => o.dosha === "vata")!;
      fireEvent.click(screen.getByRole("button", { name: vata.texte }));
      fireEvent.click(screen.getByRole("button", { name: /suivante|voir ma nature/i }));
    }
    expect(screen.getByText("Partie 1 terminée")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Vata");
    expect(window.localStorage.getItem("ayurveda.profil.v1")).toContain("nature");
  });
});

describe("Quiz — partie 2, état du moment", () => {
  it("passe tout seul à l'affirmation suivante après un choix", () => {
    vi.useFakeTimers();
    rendre();
    fireEvent.click(screen.getByRole("button", { name: "Faire le point" }));
    expect(screen.getByText("Question 1 sur 15")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { pressed: false })).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "Souvent" }));
    act(() => vi.advanceTimersByTime(400));
    expect(screen.getByText("Question 2 sur 15")).toBeInTheDocument();
  });

  it("compare l'état à la nature et signale le dosha en excès", () => {
    window.localStorage.setItem(
      "ayurveda.profil.v1",
      JSON.stringify({ nature: { scores: { vata: 30, pitta: 15, kapha: 5 }, date: "2026-09-01" } }),
    );
    vi.useFakeTimers();
    rendre();
    // Un profil existe : on arrive directement sur « Mon profil ».
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Vata");
    fireEvent.click(screen.getByRole("button", { name: "Faire le point maintenant" }));
    for (const a of VIKRITI) {
      fireEvent.click(screen.getByRole("button", { name: a.dosha === "kapha" ? "Presque tous les jours" : "Jamais" }));
      act(() => vi.advanceTimersByTime(400));
    }
    expect(screen.getByRole("heading", { name: "Kapha est en excès" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pour apaiser Kapha" })).toBeInTheDocument();
  });
});
