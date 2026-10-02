import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Fil, PageRubrique } from "@/components/Rubrique";
import { fr } from "@/components/quiz/conseils";
import type { Effet } from "@/data/comprendre";
import { SOUS_PAGES } from "./sousPages";



const ROMAINS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/** Le sommaire de la rubrique, comme la table d'un livre : chapitres numérotés entre deux filets. */
export const Sommaire = () => (
  <nav aria-label="Sommaire de Comprendre" className="mx-auto max-w-[1220px] px-4 sm:px-10">
    <ol className="m-0 flex list-none gap-x-7 overflow-x-auto border-y border-b-[3px] border-double border-encre px-1 py-2.5 [scrollbar-width:none] lg:flex-wrap lg:justify-center lg:gap-x-5 lg:overflow-visible lg:text-[15px]">
      {SOUS_PAGES.map((p, i) => (
        <li key={p.href} className="shrink-0">
          <NavLink
            to={p.href}
            end
            className={({ isActive }) =>
              `inline-flex min-h-10 items-baseline gap-2 whitespace-nowrap border-b-2 pt-2 text-base no-underline lg:text-[15px] ${
                isActive ? "border-aubergine font-bold" : "border-transparent hover:border-trait"
              }`
            }
          >
            <span className="font-normal italic text-aubergine">{ROMAINS[i]}</span>
            {p.titre}
          </NavLink>
        </li>
      ))}
    </ol>
  </nav>
);

/** Gabarit commun des pages « Comprendre ». */
export const PageComprendre = ({ children }: { children: ReactNode }) => (
  <PageRubrique label="Comprendre" pages={SOUS_PAGES} navigation={<Sommaire />}>
    {children}
  </PageRubrique>
);

/** Petit ornement de fin de page de garde : un filet, trois points. */
export const Ornement = () => (
  <svg width="120" height="16" viewBox="0 0 120 16" aria-hidden="true" className="block">
    <g fill="#5B2A4E">
      <circle cx="60" cy="8" r="4" />
      <circle cx="46" cy="8" r="2" />
      <circle cx="74" cy="8" r="2" />
    </g>
    <path d="M4 8 H38 M82 8 H116" stroke="#13201E" strokeWidth="1.5" />
  </svg>
);

/** Ouverture centrée des pages de Comprendre : le mot sanskrit en grand, puis le titre. */
export const Frontispice = ({ deva, translit, titre, children }: { deva: string; translit: string; titre: ReactNode; children?: ReactNode }) => (
  <section className="mx-auto flex max-w-[1060px] flex-col items-center gap-4 px-4 pb-14 pt-10 text-center sm:px-10 md:pb-[72px] md:pt-14">
    <Deva className="text-[clamp(4.25rem,11vw,8rem)] !leading-[1.05] text-paon">{deva}</Deva>
    <span className="-mt-1 italic text-doux">{translit}</span>
    <h1 className="m-0 mt-2 text-[clamp(2.5rem,7vw,5rem)] leading-[0.95]">{titre}</h1>
    {children}
  </section>
);

export const FilAriane = ({ page }: { page?: string }) => <Fil rubrique="Comprendre" href="/comprendre" page={page} />;


export const Deva = ({ children, className = "text-[30px] text-aubergine" }: { children: string; className?: string }) => (
  <span lang="sa" className={`font-devanagari leading-tight ${className}`}>
    {children}
  </span>
);

interface TitrePageProps {
  /** Nom de la page (le sommaire indique déjà où l'on est) */
  fil: string;
  /** Le fil d'Ariane, s'il ne s'agit pas de la rubrique Comprendre */
  filAriane?: ReactNode;
  titre: ReactNode;
  deva: string;
  translit: string;
  intro: string;
}

export const TitrePage = ({ filAriane, titre, deva, translit, intro }: TitrePageProps) => (
  <div className="flex flex-col gap-4 py-6 md:py-8">
    {filAriane}
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
