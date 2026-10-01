import { Fragment } from "react";
import { Motif } from "./BrandDefs";
import { Feuille } from "./Illustrations";
import { fr } from "@/components/quiz/conseils";

const BUTA = "M22 6 C17 10 8 14 8 23 C8 30 13 34 19 34 C26 34 29 29 28 23 C27 17 22 15 19 18 C21 13 23 10 22 6 Z";

/** Petit buta servant de puce : plein pour ce qu'on recommande, creux pour ce qu'on limite. */
export const PuceButa = ({ couleur, creux = false }: { couleur: string; creux?: boolean }) => (
  <svg width="14" height="19" viewBox="6 4 24 32" aria-hidden="true" className="mt-[5px] shrink-0">
    <path d={BUTA} fill={creux ? "none" : couleur} stroke={creux ? couleur : "none"} strokeWidth={creux ? 2.6 : 0} />
  </svg>
);

/** Fleur de dabu, le séparateur de la frise. */
const Fleur = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
    <g fill="#5B2A4E">
      <circle cx="8" cy="8" r="2" />
      <circle cx="8" cy="3" r="2.4" />
      <circle cx="13" cy="8" r="2.4" />
      <circle cx="8" cy="13" r="2.4" />
      <circle cx="3" cy="8" r="2.4" />
    </g>
  </svg>
);

/** Les qualités en frise : des mots en capitales, séparés par une fleur, entre deux filets. */
export const Frise = ({ mots, label }: { mots: string[]; label: string }) => (
  <ul aria-label={label} className="m-0 flex list-none flex-wrap items-center gap-x-4 gap-y-2.5 border-y border-encre p-0 py-3.5">
    {mots.map((m, i) => (
      <Fragment key={m}>
        {i > 0 && (
          <li aria-hidden="true" className="flex">
            <Fleur />
          </li>
        )}
        <li className="font-display text-[1.15rem] leading-none tracking-[0.06em] sm:text-[1.3rem]">{m}</li>
      </Fragment>
    ))}
  </ul>
);

interface ListeButaProps {
  titre: string;
  items: string[];
  couleur: string;
  /** Classe de couleur du titre */
  classeTitre: string;
  creux?: boolean;
}

/** Une liste courte, chaque ligne marquée d'un buta. */
export const ListeButa = ({ titre, items, couleur, classeTitre, creux }: ListeButaProps) => (
  <div className="flex flex-col gap-4">
    <h3 className={`m-0 font-body text-[1.5rem] normal-case italic leading-tight tracking-normal sm:text-[1.65rem] ${classeTitre}`}>{titre}</h3>
    <ul className="m-0 flex list-none flex-col gap-3 p-0 text-lg">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3.5">
          <PuceButa couleur={couleur} creux={creux} />
          <span>{fr(t)}</span>
        </li>
      ))}
    </ul>
  </div>
);

/** Les plantes, présentées comme des étiquettes de bocaux sur une bande vert paon. */
export const BandePlantes = ({ titre, note, plantes }: { titre: string; note: string; plantes: { nom: string; texte: string }[] }) => (
  <section aria-label={titre} className="relative overflow-hidden bg-paon text-pistache">
    <Motif id="dabu" />
    <div className="relative mx-auto grid max-w-[1220px] items-center gap-8 px-4 py-14 sm:px-10 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="m-0 text-[clamp(2rem,3.6vw,2.6rem)] leading-none">{titre}</h2>
        <p className="m-0 text-[#D3E3DE]">{fr(note)}</p>
      </div>
      <ul className={`m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-[18px] ${plantes.length > 3 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
        {plantes.map((p) => (
          <li
            key={p.nom}
            className="flex flex-col items-center gap-2.5 bg-carte px-4 pb-8 pt-5 text-center text-encre shadow-[inset_0_0_0_2px_hsl(var(--encre)),inset_0_0_0_6px_hsl(var(--carte)),inset_0_0_0_7.5px_hsl(var(--encre))] [border-radius:14px_14px_46%_46%/14px_14px_22%_22%] sm:px-5"
          >
            <Feuille size={64} decorative className="h-auto w-12 sm:w-16" />
            <span className="font-display text-[1.15rem] leading-tight [overflow-wrap:anywhere] sm:text-[1.35rem]">{p.nom}</span>
            <span className="text-[15px] leading-snug text-doux sm:text-base">{fr(p.texte)}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
