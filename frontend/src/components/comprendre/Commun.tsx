import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Fil, PageRubrique } from "@/components/Rubrique";
import { fr } from "@/components/quiz/conseils";
import type { Effet } from "@/data/comprendre";
import { SOUS_PAGES } from "./sousPages";



/** Gabarit commun des pages « Comprendre ». */
export const PageComprendre = ({ children }: { children: ReactNode }) => (
  <PageRubrique label="Comprendre" pages={SOUS_PAGES}>
    {children}
  </PageRubrique>
);

export const FilAriane = ({ page }: { page?: string }) => <Fil rubrique="Comprendre" href="/comprendre" page={page} />;


export const Deva = ({ children, className = "text-[30px] text-aubergine" }: { children: string; className?: string }) => (
  <span lang="sa" className={`font-devanagari leading-tight ${className}`}>
    {children}
  </span>
);

interface TitrePageProps {
  fil: string;
  titre: ReactNode;
  deva: string;
  translit: string;
  intro: string;
}

export const TitrePage = ({ fil, titre, deva, translit, intro }: TitrePageProps) => (
  <div className="flex flex-col gap-4 py-6 md:py-8">
    <FilAriane page={fil} />
    <p className="m-0 flex items-baseline gap-3.5">
      <Deva>{deva}</Deva>
      <span className="italic text-doux">{translit}</span>
    </p>
    <h1 className="m-0 text-[clamp(2.6rem,6.4vw,5.25rem)] leading-none">{titre}</h1>
    <p className="m-0 max-w-[52ch] text-xl text-doux">{fr(intro)}</p>
  </div>
);

/** Pastille d'effet sur un dosha : « ↓ Vata » (l'apaise) ou « ↑ Vata » (le fait monter). */
export const EffetDosha = ({ nom, sens, couleur }: { nom: string; sens: Effet; couleur: string }) =>
  sens === "+" ? (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-bold shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
      <span aria-hidden="true">↑</span>
      <span className="sr-only">fait monter </span>
      {nom}
    </span>
  ) : (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-bold ${
        nom === "Vata" ? "text-encre" : "text-pistache"
      }`}
      style={{ background: couleur }}
    >
      <span aria-hidden="true">↓</span>
      <span className="sr-only">apaise </span>
      {nom}
    </span>
  );

export const PiedSuite = ({ precedent, suivant }: { precedent?: string; suivant?: string }) => {
  const i = (t?: string) => SOUS_PAGES.find((p) => p.titre === t);
  const prec = i(precedent);
  const suiv = i(suivant);
  return (
    <nav
      aria-label="Pages voisines"
      className="mx-auto flex max-w-[1220px] justify-between gap-6 border-t border-dashed border-trait px-4 pb-20 pt-7 sm:px-10"
    >
      {prec ? (
        <Link to={prec.href} className="flex flex-col gap-0.5 no-underline">
          <span className="inline-flex items-center gap-1 text-sm text-doux">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Précédent
          </span>
          <span className="font-display text-[1.35rem] leading-tight">{prec.titre}</span>
        </Link>
      ) : (
        <span />
      )}
      {suiv && (
        <Link to={suiv.href} className="flex flex-col items-end gap-0.5 text-right no-underline">
          <span className="inline-flex items-center gap-1 text-sm text-doux">
            Suivant <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-display text-[1.35rem] leading-tight">{suiv.titre}</span>
        </Link>
      )}
    </nav>
  );
};
