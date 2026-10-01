import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Bande } from "@/components/brand/BrandDefs";
import Photo from "@/components/brand/PhotoPlaceholder";
import { FilCuisine, PageCuisine } from "@/components/cuisine/Commun";
import { fr } from "@/components/quiz/conseils";
import { RECETTES, RECETTES_COMPLETES } from "@/data/cuisine";
import { doshasTexte, saisonsTexte } from "./recettesTexte";

/** Une recette : ingrédients à cocher pendant les courses ou la cuisine, étapes numérotées. */
const Recette = () => {
  const { id } = useParams();
  const r = RECETTES.find((x) => x.id === id);
  const c = id ? RECETTES_COMPLETES[id] : undefined;
  const [coches, setCoches] = useState<number[]>([]);
  if (!r || !c) return <Navigate to="/cuisine/recettes" replace />;
  const basculer = (i: number) => setCoches((x) => (x.includes(i) ? x.filter((y) => y !== i) : [...x, i]));

  return (
    <PageCuisine>
      <section className="mx-auto grid max-w-[1220px] items-center gap-10 px-4 pb-12 pt-6 sm:px-10 md:grid-cols-2 md:gap-14">
        <div className="flex flex-col gap-4">
          <FilCuisine page={r.nom} />
          <h1 className="m-0 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]">{r.nom}</h1>
          <p className="m-0 max-w-[46ch] text-xl">{fr(c.intro)}</p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0 text-[15px] font-bold">
            {[doshasTexte(r), saisonsTexte(r), `${r.minutes} min`, c.portions].map((t) => (
              <li key={t} className="rounded-full px-3.5 py-1 shadow-[inset_0_0_0_1.5px_hsl(var(--trait))]">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[280px] md:h-[400px]">
          <Photo description={`${r.nom.toLowerCase()} dans un bol, vu d'en haut`} arche />
        </div>
      </section>
      <Bande />

      <section className="mx-auto grid max-w-[1220px] gap-12 px-4 py-14 sm:px-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[2rem]">Les ingrédients</h2>
          <p className="m-0 text-[15px] text-doux">Touchez un ingrédient pour le cocher.</p>
          <ul className="m-0 list-none p-0">
            {c.ingredients.map((x, i) => {
              const pris = coches.includes(i);
              return (
                <li key={x} className="border-t border-dashed border-trait">
                  <button
                    type="button"
                    aria-pressed={pris}
                    onClick={() => basculer(i)}
                    className="flex min-h-12 w-full items-center gap-3.5 py-2.5 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[6px] ${
                        pris ? "bg-paon" : "shadow-[inset_0_0_0_2px_hsl(var(--encre))]"
                      }`}
                    >
                      {pris && <Check className="h-3.5 w-3.5 text-citron" strokeWidth={3} />}
                    </span>
                    <span className={pris ? "text-doux line-through" : ""}>{x}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[2rem]">Les étapes</h2>
          <ol className="m-0 list-none p-0">
            {c.etapes.map((t, i) => (
              <li key={t} className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-t border-dashed border-trait py-4">
                <span className="font-display text-[1.75rem] leading-none text-aubergine">{i + 1}</span>
                <span>{fr(t)}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-2xl bg-surface p-6">
            <h3 className="m-0 mb-1.5 font-body text-[1.35rem] normal-case italic tracking-normal text-aubergine">Selon votre dosha</h3>
            <p className="m-0">{fr(c.astuce)}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1220px] px-4 pb-20 sm:px-10">
        <Link to="/cuisine/recettes" className="inline-flex items-center gap-2 font-bold underline underline-offset-4">
          <ArrowLeft className="h-[18px] w-[18px]" aria-hidden="true" /> Toutes les recettes
        </Link>
      </div>
    </PageCuisine>
  );
};

export default Recette;
