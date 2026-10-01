import { Link, useSearchParams } from "react-router-dom";
import { Bande } from "@/components/brand/BrandDefs";
import { Chai, Feuille, Poudre } from "@/components/brand/Illustrations";
import { Deva } from "@/components/comprendre/Commun";
import { EffetsEpice, FilCuisine, IlluEpice, PageCuisine, Pastille } from "@/components/cuisine/Commun";
import Dabba from "@/components/cuisine/Dabba";
import Ingredients from "@/components/cuisine/Ingredients";
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
      <section className="mx-auto grid max-w-[1220px] items-center gap-8 px-4 pb-12 pt-6 sm:px-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-2 md:pb-14">
        <div className="flex flex-col gap-5">
          <FilCuisine />
          <Deva className="text-[clamp(2rem,4vw,2.5rem)] !leading-none text-aubergine">मसाला डब्बा</Deva>
          <h1 className="m-0 text-[clamp(2.6rem,6.4vw,4.75rem)] leading-[0.95]">La boîte à épices</h1>
          <p className="m-0 max-w-[36ch] text-xl text-doux">
            {fr("Avec ces huit épices, on peut cuisiner selon l'Ayurveda toute l'année. Chaque fiche dit comment les utiliser et les conserver.")}
          </p>
          <div role="group" aria-label="Filtrer les épices" className="flex flex-wrap items-center gap-2 pt-2">
            <span className="mr-1.5 font-bold">Pour apaiser</span>
            <Pastille actif={!filtre} onClick={() => choisir(null)}>
              Tous
            </Pastille>
            {DOSHAS.map((d) => (
              <Pastille key={d} actif={filtre === d} onClick={() => choisir(d)} couleur={COULEUR_DOSHA[d]}>
                {NOM_DOSHA[d]}
              </Pastille>
            ))}
          </div>
        </div>
        <Dabba actives={filtre ? new Set(epices.map((e) => e.id)) : undefined} />
      </section>
      <Bande />

      <section aria-label="Les épices" className="mx-auto max-w-[1220px] px-4 pb-20 pt-12 sm:px-10" aria-live="polite">
        <p className="m-0 mb-6 text-[15px] text-doux">↓ apaise, = neutre, ↑ fait monter</p>
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
                  La fiche complète
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <Ingredients filtre={filtre} />

      <section aria-label="Pour aller plus loin" className="bg-surface">
        <div className="mx-auto grid max-w-[1220px] gap-6 px-4 py-16 sm:px-10 md:grid-cols-3 md:py-[72px]">
          <Link to="/cuisine/melanges" className="group flex flex-col gap-3 rounded-2xl bg-carte p-7 no-underline shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
            <span className="flex justify-center">
              <Chai size={110} decorative />
            </span>
            <span className="font-display text-[1.9rem] leading-tight">Les mélanges</span>
            <span className="text-doux">Chaï masala, thé cumin-coriandre-fenouil, lait doré, et un mélange pour chaque dosha.</span>
            <span className="mt-auto inline-flex items-center gap-2 font-bold group-hover:underline">
              Voir les {MELANGES.length} mélanges
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
              Voir les recettes
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
