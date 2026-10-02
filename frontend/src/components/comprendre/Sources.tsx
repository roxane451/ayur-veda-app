import { Link } from "react-router-dom";
import { nomTexte, type Ref } from "@/data/sources";
import { Deva } from "./Commun";

/** Renvoi numéroté vers la liste des sources en bas de page. */
export const Renvoi = ({ n, clair }: { n: number; clair?: boolean }) => (
  <sup className="ml-0.5 text-[0.7em] font-bold leading-none">
    <a
      href={`#source-${n}`}
      id={`renvoi-${n}`}
      aria-label={`Source ${n}`}
      className={`no-underline hover:underline ${clair ? "text-citron" : "text-aubergine"}`}
    >
      {n}
    </a>
  </sup>
);

/** L'étiquette « d'après… », posée sur la bande sous l'ouverture de la page. */
export const DApres = ({ children }: { children: string }) => (
  <p className="relative z-10 m-0 -mt-[38px] mb-6 md:mb-8 flex justify-center px-4 text-center text-[15px] text-doux">
    <span className="rounded-full bg-carte px-4 py-1 shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
      <i className="text-aubergine">d'après</i> {children}
    </span>
  </p>
);

/** Les sources de la page, numérotées comme les renvois. */
export const Sources = ({ refs }: { refs: Ref[] }) => (
  <section aria-labelledby="sources" className="mx-auto max-w-[1100px] px-4 pb-8 pt-10 sm:px-10">
    <div className="grid gap-6 border-t-[3px] border-double border-encre pt-7 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
      <div className="flex flex-col gap-1.5">
        <Deva className="text-[30px] text-paon">प्रमाण</Deva>
        <h2 id="sources" className="m-0 text-[1.4rem]">
          Sources
        </h2>
        <Link to="/comprendre/textes#lire" className="text-[15px] text-aubergine">
          Comment lire une référence
        </Link>
      </div>
      <ol className="m-0 list-none p-0 text-base">
        {refs.map((r, i) => (
          <li
            key={`${r.texte}${r.passage}${r.sujet}`}
            id={`source-${i + 1}`}
            className="grid scroll-mt-24 grid-cols-[36px_minmax(0,1fr)] gap-2.5 border-t border-encre/20 py-3 target:bg-surface"
          >
            <a href={`#renvoi-${i + 1}`} className="font-body text-[1.35rem] italic leading-tight text-aubergine no-underline">
              {i + 1}
            </a>
            <span>
              <b>{nomTexte(r.texte)}</b>, {r.passage}
              <br />
              <span className="text-doux">{r.sujet}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
