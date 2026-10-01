import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fr } from "@/components/quiz/conseils";
import type { Effet } from "@/data/comprendre";
import { SOUS_PAGES } from "./sousPages";



/** Sous-navigation de la rubrique : défile au doigt sur téléphone. */
const SousNav = () => (
  <nav aria-label="Comprendre" className="mx-auto max-w-[1220px] px-4 pb-2 sm:px-10">
    <ul className="-mx-4 m-0 flex list-none gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
      {SOUS_PAGES.map((p) => (
        <li key={p.href} className="shrink-0">
          <NavLink
            to={p.href}
            end
            className={({ isActive }) =>
              `inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-4 text-[15px] font-bold ${
                isActive ? "bg-encre text-pistache" : "text-encre shadow-[inset_0_0_0_1.5px_hsl(var(--trait))] hover:bg-surface"
              }`
            }
          >
            {p.titre}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

/** Gabarit commun des pages « Comprendre ». */
export const PageComprendre = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <SousNav />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export const FilAriane = ({ page }: { page?: string }) => (
  <nav aria-label="Fil d'Ariane" className="text-[15px] text-doux">
    <Link to="/">Accueil</Link> <span aria-hidden="true" className="text-trait">/</span>{" "}
    {page ? (
      <>
        <Link to="/comprendre">Comprendre</Link> <span aria-hidden="true" className="text-trait">/</span>{" "}
        <span aria-current="page">{page}</span>
      </>
    ) : (
      <span aria-current="page">Comprendre</span>
    )}
  </nav>
);

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
