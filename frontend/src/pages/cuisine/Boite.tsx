import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Bande } from "@/components/brand/BrandDefs";
import { Chai, Feuille, Poudre } from "@/components/brand/Illustrations";
import { Deva } from "@/components/comprendre/Commun";
import { EffetsEpice, IlluEpice, PageCuisine, Pastille, TeteCuisine } from "@/components/cuisine/Commun";
import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import { EPICES, MELANGES, PLANTES, RECETTES } from "@/data/cuisine";
import { DOSHAS, NOM_DOSHA, type DoshaKey } from "@/lib/doshaLogic";

const INCLINAISON = [-1, 1, 0, -1, 1, 0, -1, 1];

const Boite = () => {
  const [params, setParams] = useSearchParams();
  const filtre = DOSHAS.find((d) => d === params.get("apaise")) ?? null;
  const choisir = (d: DoshaKey | null) => setParams(d ? { apaise: d } : {}, { replace: true });
  const epices = filtre ? EPICES.filter((e) => e.effets[filtre] === "diminue") : EPICES;

  return (
    <PageCuisine>
      <TeteCuisine titre="La boîte à épices" intro="Huit épices suffisent pour cuisiner selon l'Ayurveda. Voici comment les choisir, les marier et les garder.">
        <IlluEpice id="curcuma" size={150} className="h-auto w-[34%] max-w-[150px]" />
        <IlluEpice id="cardamome" size={120} className="h-auto w-[28%] max-w-[120px]" />
        <IlluEpice id="cannelle" size={130} className="h-auto w-[30%] max-w-[130px]" />
      </TeteCuisine>
      <Bande />

      <section aria-label="Filtrer les épices" className="sticky top-[calc(4.25rem+env(safe-area-inset-top))] z-10 border-b-2 border-encre bg-pistache lg:top-[5.25rem]">
        <div className="mx-auto flex max-w-[1220px] items-center gap-2 overflow-x-auto px-4 py-3.5 [scrollbar-width:none] sm:flex-wrap sm:px-10">
          <span className="mr-1.5 shrink-0 font-bold">Pour apaiser</span>
          <Pastille actif={!filtre} onClick={() => choisir(null)}>
            Tous
          </Pastille>
          {DOSHAS.map((d) => (
            <Pastille key={d} actif={filtre === d} onClick={() => choisir(d)} couleur={COULEUR_DOSHA[d]}>
              {NOM_DOSHA[d]}
            </Pastille>
          ))}
          <span className="ml-auto hidden shrink-0 text-[15px] text-doux md:inline">↓ apaise · = neutre · ↑ fait monter</span>
        </div>
      </section>

      <section aria-label="Les épices" className="mx-auto max-w-[1220px] px-4 pb-20 pt-12 sm:px-10" aria-live="polite">
        <p className="sr-only">
          {epices.length} épices{filtre ? ` qui apaisent ${NOM_DOSHA[filtre]}` : ""}.
        </p>
        <ul className="m-0 grid list-none gap-x-5 gap-y-7 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {epices.map((e) => (
            <li key={e.id}>
              <article
                className="flex h-full flex-col gap-2.5 rounded-b-[18px] rounded-t-md bg-carte p-6 shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]"
                style={{ transform: `rotate(${INCLINAISON[EPICES.indexOf(e)]}deg)` }}
              >
                <span className="flex items-baseline justify-between">
                  <span className={`text-[13px] font-bold ${e.nature.startsWith("Ré") ? "text-aubergine" : "text-paon"}`}>{e.nature}</span>
                  <Deva className="text-xl text-aubergine">{e.deva}</Deva>
                </span>
                <span className="flex h-[110px] items-center justify-center">
                  <IlluEpice id={e.id} size={100} />
                </span>
                <span className="flex flex-col">
                  <h2 className="m-0 text-[1.75rem] leading-[1.05]">{e.nom}</h2>
                  <span className="italic text-doux">
                    {e.translit} · {e.gout.toLowerCase()}
                  </span>
                </span>
                <EffetsEpice effets={e.effets} />
                <dl className="m-0 mt-1 text-[15px] leading-normal">
                  {[
                    ["En cuisine", e.enCuisine],
                    ["Avec", e.avec],
                    ["Se garde", e.seGarde],
                  ].map(([t, v]) => (
                    <div key={t} className="border-t border-dashed border-trait py-[7px]">
                      <dt className="inline font-bold">{t}&nbsp;: </dt>
                      <dd className="m-0 inline">{fr(v)}</dd>
                    </div>
                  ))}
                </dl>
                <Link to={`/cuisine/epices/${e.id}`} className="mt-auto inline-flex items-center gap-1.5 pt-1 font-bold underline underline-offset-4">
                  La fiche complète <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Pour aller plus loin" className="bg-surface">
        <div className="mx-auto grid max-w-[1220px] gap-6 px-4 py-16 sm:px-10 md:grid-cols-3 md:py-[72px]">
          <Link to="/cuisine/melanges" className="group flex flex-col gap-3 rounded-2xl bg-carte p-7 no-underline shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
            <span className="flex justify-center">
              <Chai size={110} decorative />
            </span>
            <span className="font-display text-[1.9rem] leading-tight">Les mélanges</span>
            <span className="text-doux">Chaï masala, thé cumin-coriandre-fenouil, lait doré, et un mélange pour chaque dosha.</span>
            <span className="mt-auto inline-flex items-center gap-2 font-bold group-hover:underline">
              Voir les {MELANGES.length} mélanges <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
          </Link>
          <Link to="/cuisine/recettes" className="group flex flex-col gap-3 rounded-2xl bg-carte p-7 no-underline shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
            <span className="flex justify-center">
              <Poudre size={110} decorative />
            </span>
            <span className="font-display text-[1.9rem] leading-tight">Les recettes</span>
            <span className="text-doux">
              {RECETTES.length} plats, du petit-déjeuner au dessert, classés par dosha et par saison.
            </span>
            <span className="mt-auto inline-flex items-center gap-2 font-bold group-hover:underline">
              Voir les recettes <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
          </Link>
          <div className="flex flex-col gap-2.5 rounded-2xl bg-paon p-7 text-pistache">
            <span className="flex justify-center">
              <Feuille size={100} stroke="#F3F5E6" decorative />
            </span>
            <span className="font-display text-[1.9rem] leading-tight">Les plantes</span>
            <span className="text-[#D3E3DE]">
              Ce ne sont pas des épices de cuisine. Elles auront leur page, avec leurs précautions.
            </span>
            {/* [À FAIRE] fiches plantes */}
            <ul className="m-0 list-none p-0">
              {PLANTES.map((p) => (
                <li key={p.nom} className="flex flex-col gap-1 border-t border-dashed border-[#2C6B63] py-3.5">
                  <span className="font-display text-xl">{p.nom}</span>
                  <span className="text-base text-[#D3E3DE]">{p.texte}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageCuisine>
  );
};

export default Boite;
