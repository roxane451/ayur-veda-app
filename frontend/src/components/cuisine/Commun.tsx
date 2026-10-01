import type { ReactNode } from "react";
import { Fil, PageRubrique } from "@/components/Rubrique";
import {
  Cannelle,
  Cardamome,
  Chai,
  Coriandre,
  Cumin,
  Curcuma,
  Fenouil,
  Gingembre,
  Poivre,
} from "@/components/brand/Illustrations";
import { fr } from "@/components/quiz/conseils";
import { COULEUR_DOSHA } from "@/components/quiz/conseils";
import type { EffetEpice } from "@/data/cuisine";
import { DOSHAS, NOM_DOSHA, type DoshaKey } from "@/lib/doshaLogic";
import { PAGES_CUISINE } from "./pages";

export const PageCuisine = ({ children }: { children: ReactNode }) => (
  <PageRubrique label="La cuisine" pages={PAGES_CUISINE}>
    {children}
  </PageRubrique>
);

export const FilCuisine = ({ page }: { page?: string }) => <Fil rubrique="La cuisine" href="/cuisine" page={page} />;

/** L'illustration d'une épice (ou du chaï), par son identifiant. */
const ILLUS = {
  curcuma: Curcuma,
  gingembre: Gingembre,
  cumin: Cumin,
  coriandre: Coriandre,
  fenouil: Fenouil,
  cardamome: Cardamome,
  cannelle: Cannelle,
  poivre: Poivre,
  chai: Chai,
} as const;

export const IlluEpice = ({ id, size = 100, className }: { id: string; size?: number; className?: string }) => {
  const C = ILLUS[id as keyof typeof ILLUS] ?? Curcuma;
  return <C size={size} decorative className={className} />;
};

/** Les trois pastilles d'effet d'une épice : ↓ apaise, = neutre, ↑ fait monter. */
export const EffetsEpice = ({ effets }: { effets: Record<DoshaKey, EffetEpice> }) => (
  <span className="flex flex-wrap gap-1.5">
    {DOSHAS.map((d) => {
      const e = effets[d];
      const nom = NOM_DOSHA[d];
      if (e === "equilibre")
        return (
          <span key={d} className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-bold text-doux shadow-[inset_0_0_0_1.5px_hsl(var(--trait))]">
            <span aria-hidden="true">=</span>
            <span className="sr-only">neutre pour </span>
            {nom}
          </span>
        );
      if (e === "augmente")
        return (
          <span key={d} className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-bold shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
            <span aria-hidden="true">↑</span>
            <span className="sr-only">fait monter </span>
            {nom}
          </span>
        );
      return (
        <span
          key={d}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-bold ${d === "vata" ? "text-encre" : "text-pistache"}`}
          style={{ background: COULEUR_DOSHA[d] }}
        >
          <span aria-hidden="true">↓</span>
          <span className="sr-only">apaise </span>
          {nom}
        </span>
      );
    })}
  </span>
);

interface TeteProps {
  page?: string;
  titre: ReactNode;
  intro: string;
  children: ReactNode;
}

/** En-tête d'une page de la cuisine : titre à gauche, illustrations à droite. */
export const TeteCuisine = ({ page, titre, intro, children }: TeteProps) => (
  <div className="mx-auto grid max-w-[1220px] items-center gap-8 px-4 pb-10 pt-6 sm:px-10 md:grid-cols-2 md:gap-10">
    <div className="flex flex-col gap-4">
      <FilCuisine page={page} />
      <h1 className="m-0 text-[clamp(2.6rem,6.4vw,5.25rem)] leading-none">{titre}</h1>
      <p className="m-0 max-w-[48ch] text-xl text-doux">{fr(intro)}</p>
    </div>
    <div className="flex items-end justify-center">{children}</div>
  </div>
);

/** Une pastille de filtre (dosha, saison…). */
export const Pastille = ({
  actif,
  onClick,
  couleur,
  children,
}: {
  actif: boolean;
  onClick: () => void;
  couleur?: string;
  children: ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={actif}
    onClick={onClick}
    className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[15px] font-bold ${
      actif ? "bg-encre text-pistache" : "shadow-[inset_0_0_0_1.5px_hsl(var(--trait))] hover:bg-surface"
    }`}
  >
    {couleur && <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: couleur }} />}
    {children}
  </button>
);
