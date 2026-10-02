import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Bande } from "@/components/brand/BrandDefs";
import Photo from "@/components/brand/PhotoPlaceholder";
import Sceau from "@/components/brand/Sceau";
import { Fil, PageRubrique } from "@/components/Rubrique";
import { PAGES_QUOTIDIEN } from "@/components/quotidien/pages";
import { fr } from "@/components/quiz/conseils";
import { PROGRAMME_AUTOMNE as P } from "@/data/saisons";

/**
 * Mon programme : le programme de saison.
 * [À FAIRE] prix, paiement et accès membre ; en attendant, les boutons mènent à l'espace membre.
 */
const Programme = () => (
  <PageRubrique label="Au quotidien" pages={PAGES_QUOTIDIEN}>
    <section className="mx-auto grid max-w-[1220px] items-start gap-12 px-4 pb-16 pt-6 sm:px-10 md:grid-cols-2 md:gap-14 md:pb-[72px]">
      <div className="flex flex-col gap-5">
        <Fil rubrique="Au quotidien" href="/au-quotidien" page="Mon programme" />
        <h1 className="m-0 text-[clamp(2.6rem,6vw,4.75rem)] leading-none">{P.titre}</h1>
        <p className="m-0 text-xl text-doux">{fr(P.intro)}</p>
        <ul className="m-0 list-none p-0">
          {P.inclus.map((t) => (
            <li key={t} className="flex items-center gap-3 border-t border-dashed border-trait py-2.5">
              <span aria-hidden="true" className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[6px] bg-citron">
                <Check className="h-3.5 w-3.5 text-paon" strokeWidth={3} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <aside className="relative flex flex-col gap-4 rounded-[18px] bg-carte p-6 shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:p-8">
        <div className="absolute -top-5 right-2 sm:-right-6">
          <Sceau size={72} rotate={10} fond="hsl(var(--aubergine))" reserve="hsl(var(--pistache))" />
        </div>
        <div className="h-[200px]">
          <Photo description="tasse de chaï et couverture en laine" />
        </div>
        <p className="m-0 flex flex-wrap items-baseline gap-2.5">
          <span className="font-display text-[2.4rem] leading-none">Bientôt disponible</span>
        </p>
        <p className="m-0 text-doux">Le programme sera vendu seul, avec un accès à vie, ou inclus dans l'espace membre.</p>
        <Link
          to="/espace-membre"
          className="inline-flex min-h-[54px] self-start items-center rounded-buta bg-aubergine px-7 font-bold text-pistache no-underline hover:opacity-90"
        >
          Être prévenu de la sortie
        </Link>
        <p className="m-0 border-t border-dashed border-trait pt-3.5 text-base">
          Inclus dans l'espace membre, avec les trois autres saisons.{" "}
          <Link to="/espace-membre" className="font-bold underline underline-offset-4">
            Devenir membre
          </Link>
        </p>
      </aside>
    </section>
    <Bande />

    <section aria-labelledby="p-somm" className="mx-auto flex max-w-[900px] flex-col gap-5 px-4 pb-24 pt-16 sm:px-10 md:pt-20">
      <h2 id="p-somm" className="m-0 text-[clamp(2rem,4vw,2.5rem)]">
        Au programme
      </h2>
      <ol className="m-0 list-none p-0">
        {P.semaines.map((s) => (
          <li key={s.semaine} className="grid gap-1 border-t border-dashed border-trait py-[18px] sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-5">
            <span className="font-bold text-aubergine">{s.semaine}</span>
            <span className="flex flex-col">
              <span className="font-display text-[1.6rem]">{s.titre}</span>
              <span className="text-doux">{fr(s.texte)}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="m-0 mt-2 text-[15px] text-doux">
        Il s'adresse aux personnes Vata, ou dont Vata est en excès à l'automne.{" "}
        <Link to="/profil" className="font-bold text-encre underline underline-offset-4">
          Le test vous le dit.
        </Link>
      </p>
    </section>
  </PageRubrique>
);

export default Programme;
