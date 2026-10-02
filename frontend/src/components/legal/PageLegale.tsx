import type { ReactNode } from "react";
import { PageRubrique } from "@/components/Rubrique";
import { MISE_A_JOUR, PAGES_LEGALES } from "@/data/legal";

/** Une valeur pas encore fournie : bien visible pour ne pas l'oublier. */
export const Valeur = ({ v }: { v: string | null }) =>
  v ? (
    <>{v}</>
  ) : (
    <mark className="rounded-sm bg-citron px-1.5 py-0.5 text-encre">
      à compléter
    </mark>
  );

export const Section = ({
  id,
  titre,
  children,
}: {
  id: string;
  titre: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-t`}
    className="flex scroll-mt-24 flex-col gap-4 border-t border-trait pt-8"
  >
    <h2
      id={`${id}-t`}
      className="m-0 text-[clamp(1.6rem,3vw,2rem)] leading-tight"
    >
      {titre}
    </h2>
    <div className="flex flex-col gap-4 [&_a]:underline [&_a]:decoration-citron [&_a]:decoration-2 [&_a]:underline-offset-4 [&_li]:pl-1 [&_ul]:m-0 [&_ul]:list-disc [&_li]:marker:text-citron-fonce [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_p]:m-0">
      {children}
    </div>
  </section>
);

/** Ligne « intitulé, valeur » des fiches d'identité. */
export const Ligne = ({
  intitule,
  children,
}: {
  intitule: string;
  children: ReactNode;
}) => (
  <div className="grid gap-1 border-b border-dashed border-trait py-2.5 sm:grid-cols-[220px_1fr] sm:gap-6">
    <dt className="font-bold">{intitule}</dt>
    <dd className="m-0">{children}</dd>
  </div>
);

export const PageLegale = ({
  titre,
  intro,
  sommaire,
  children,
}: {
  titre: string;
  intro: ReactNode;
  sommaire: { id: string; titre: string }[];
  children: ReactNode;
}) => (
  <PageRubrique label="Informations légales" pages={PAGES_LEGALES}>
    <div className="mx-auto grid max-w-[1220px] grid-cols-[minmax(0,1fr)] gap-10 px-4 pb-24 pt-10 sm:px-10 md:grid-cols-[240px_minmax(0,1fr)] md:gap-16 md:pt-14">
      <header className="flex flex-col gap-4 md:col-span-2">
        <h1 className="m-0 text-[clamp(1.9rem,6vw,4rem)] leading-none [overflow-wrap:anywhere]">
          {titre}
        </h1>
        <p className="m-0 max-w-[58ch] text-xl text-doux">{intro}</p>
        <p className="m-0 text-[15px] italic text-doux">
          Dernière mise à jour le {MISE_A_JOUR}
        </p>
      </header>
      <nav aria-label="Sur cette page" className="hidden md:block">
        <ol className="sticky top-24 m-0 flex list-none flex-col gap-2 border-l-2 border-citron p-0 pl-4 text-[15px]">
          {sommaire.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-doux hover:text-aubergine">
                {s.titre}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="flex max-w-[70ch] flex-col gap-10 text-[18px]">
        {children}
      </div>
    </div>
  </PageRubrique>
);
