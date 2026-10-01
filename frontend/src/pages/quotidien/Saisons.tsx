import { Link, useSearchParams } from "react-router-dom";
import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Chai } from "@/components/brand/Illustrations";
import Photo from "@/components/brand/PhotoPlaceholder";
import { Deva } from "@/components/comprendre/Commun";
import { Fil, PageRubrique } from "@/components/Rubrique";
import { PAGES_QUOTIDIEN } from "@/components/quotidien/pages";
import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import { EQUILIBRE_DOSHA, PROGRAMME_AUTOMNE, SAISONS_DETAIL, saisonDuMoment } from "@/data/saisons";
import { NOM_DOSHA } from "@/lib/doshaLogic";

const Liste = ({ titre, items, couleur }: { titre: string; items: string[]; couleur: string }) => (
  <div className="flex flex-col gap-1">
    <h3 className={`m-0 mb-1 font-body text-[1.35rem] normal-case italic tracking-normal ${couleur}`}>{titre}</h3>
    <ul className="m-0 list-none p-0">
      {items.map((t) => (
        <li key={t} className="border-t border-dashed border-trait py-2.5">
          {fr(t)}
        </li>
      ))}
    </ul>
  </div>
);

const Moment = ({ heures, titre, items }: { heures: string; titre: string; items: string[] }) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-sm font-bold text-doux">{heures}</span>
    <h4 className="m-0 mb-1 text-[1.6rem]">{titre}</h4>
    <ul className="m-0 list-none p-0">
      {items.map((t) => (
        <li key={t} className="border-t border-dashed border-trait py-2.5">
          {fr(t)}
        </li>
      ))}
    </ul>
  </div>
);

const Saisons = () => {
  const actuelle = saisonDuMoment().id;
  const [params, setParams] = useSearchParams();
  const id = SAISONS_DETAIL.find((s) => s.id === params.get("saison"))?.id ?? actuelle;
  const s = SAISONS_DETAIL.find((x) => x.id === id)!;
  const nomLong = s.id === "ete" ? "L'été" : s.id === "automne" ? "L'automne" : s.id === "hiver" ? "L'hiver" : "Le printemps";
  const deLa = s.id === "printemps" ? "du printemps" : s.id === "ete" ? "d'été" : s.id === "hiver" ? "d'hiver" : "d'automne";

  return (
    <PageRubrique label="Au quotidien" pages={PAGES_QUOTIDIEN}>
      <section className="mx-auto flex max-w-[1220px] flex-col gap-5 px-4 pb-12 pt-6 sm:px-10">
        <Fil rubrique="Au quotidien" href="/au-quotidien" page="Les saisons" />
        <div className="grid items-end gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col gap-2">
            <p className="m-0 flex items-baseline gap-3.5">
              <Deva>ऋतुचर्या</Deva>
              <span className="italic text-doux">ritucharya</span>
            </p>
            <h1 className="m-0 text-[clamp(2.6rem,6.4vw,5.25rem)] leading-none">Vivre avec les saisons</h1>
          </div>
          <p className="m-0 text-xl text-doux">
            Chaque saison réveille un dosha. On adapte l'assiette et la journée pour ne pas le laisser s'accumuler.
          </p>
        </div>
        <div role="tablist" aria-label="Les quatre saisons" className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {SAISONS_DETAIL.map((x) => {
            const choisi = x.id === id;
            return (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={choisi}
                aria-controls="detail-saison"
                onClick={() => setParams(x.id === actuelle ? {} : { saison: x.id }, { replace: true })}
                className={`flex min-w-0 flex-col gap-0.5 rounded-2xl px-4 py-4 text-left sm:px-6 lg:px-5 xl:px-6 ${
                  choisi ? "bg-encre text-pistache" : "bg-carte shadow-[inset_0_0_0_1.5px_hsl(var(--encre))] hover:bg-surface"
                }`}
              >
                <span className={`text-[13px] font-bold ${choisi ? "text-citron" : "text-aubergine"}`}>
                  {x.id === actuelle ? "En ce moment" : " "}
                </span>
                <span className="font-display text-[1.15rem] leading-tight [overflow-wrap:anywhere] min-[400px]:text-[1.3rem] sm:text-[1.75rem] lg:text-[1.45rem] xl:text-[1.75rem]">
                  {x.court}
                </span>
                <span className={`text-[15px] ${choisi ? "text-[#C5D1CC]" : "text-doux"}`}>{x.periode}</span>
                <span className="mt-1.5 inline-flex items-center gap-1.5 text-[15px] font-bold">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: COULEUR_DOSHA[x.dosha] }} />
                  {NOM_DOSHA[x.dosha]}
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <Bande />

      <section id="detail-saison" role="tabpanel" aria-labelledby="s-titre" key={id} className="mx-auto flex max-w-[1220px] flex-col gap-16 px-4 py-16 sm:px-10 md:py-[88px]">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
          <div className="flex flex-col gap-4">
            <h2 id="s-titre" className="m-0 text-[clamp(3rem,6.4vw,5.25rem)] leading-[0.9]">
              {nomLong}
            </h2>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              <li className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-[15px] font-bold shadow-[inset_0_0_0_1.5px_hsl(var(--trait))]">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: COULEUR_DOSHA[s.dosha] }} />
                Saison de {NOM_DOSHA[s.dosha]}
              </li>
              {s.qualites.map((q) => (
                <li key={q} className="inline-flex min-h-10 items-center rounded-full px-4 text-[15px] font-bold shadow-[inset_0_0_0_1.5px_hsl(var(--trait))]">
                  {q}
                </li>
              ))}
            </ul>
            <p className="m-0 max-w-[46ch] text-[19px]">{fr(s.intro)}</p>
          </div>
          <div className="relative h-[300px] md:h-[380px]">
            <Photo description={s.photo} arche />
            <div className="absolute -right-2 bottom-2 md:-right-2.5 md:bottom-2.5">
              <Chai size={150} decorative className="h-auto w-[110px] md:w-[150px]" />
            </div>
          </div>
        </div>

        <div className="grid gap-10 rounded-2xl bg-carte p-6 shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:p-10 md:grid-cols-2">
          <Liste titre="À mettre dans l'assiette" items={s.assiette} couleur="text-citron-fonce" />
          <Liste titre="À limiter" items={s.limiter} couleur="text-aubergine" />
        </div>

        <div className="flex flex-col gap-7">
          <h3 className="m-0 text-[clamp(2rem,4vw,2.75rem)]">Une journée {deLa}</h3>
          <div className="grid gap-10 md:grid-cols-3">
            <Moment heures="6 h – 10 h" titre="Le matin" items={s.matin} />
            <Moment heures="10 h – 18 h" titre="Dans la journée" items={s.journee} />
            <Moment heures="18 h – 22 h" titre="Le soir" items={s.soir} />
          </div>
          <Link to="/au-quotidien/journee" className="self-start font-bold underline underline-offset-4">
            Le rythme de la journée, heure par heure
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="m-0 text-[clamp(1.8rem,3.5vw,2.25rem)]">Les plantes de la saison</h3>
          {/* [À FAIRE] lier aux fiches plantes quand elles existeront */}
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {s.plantes.map((p) => (
              <li key={p.nom} className="flex flex-col gap-1 rounded-b-2xl rounded-t-md bg-carte p-5 shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
                <span className="font-display text-2xl">{p.nom}</span>
                <span className="text-base text-doux">{p.texte}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="s-toute" className="relative overflow-hidden bg-paon text-pistache">
        <Motif id="dabu" />
        <div className="relative mx-auto flex max-w-[1220px] flex-col gap-9 px-4 py-16 sm:px-10 md:py-[88px]">
          <h2 id="s-toute" className="m-0 text-[clamp(2.2rem,4.4vw,3.25rem)]">
            Toute l'année, selon votre dosha
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {EQUILIBRE_DOSHA.map((e) => (
              <div key={e.dosha} className="flex flex-col gap-2">
                <span className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full" style={{ background: COULEUR_DOSHA[e.dosha] }} />
                  <span className="font-display text-[1.9rem]">{NOM_DOSHA[e.dosha]}</span>
                </span>
                <ul className="m-0 list-none p-0 text-[#D3E3DE]">
                  {e.conseils.map((c) => (
                    <li key={c} className="border-t border-dashed border-[#2C6B63] py-2">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Bande variante="paon" />

      <section className="mx-auto grid max-w-[1220px] items-center gap-10 px-4 py-16 sm:px-10 md:grid-cols-2 md:py-[72px]">
        <div className="flex flex-col gap-2.5">
          <p className="m-0 font-bold text-aubergine">Espace membre</p>
          <h2 className="m-0 text-[clamp(2rem,4vw,2.5rem)] leading-[1.05]">Le programme d'automne, jour par jour</h2>
          <p className="m-0 text-doux">
            {PROGRAMME_AUTOMNE.duree} pour apaiser Vata&nbsp;: un geste par jour, les recettes de la semaine, un rappel le
            matin.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link
            to="/au-quotidien/programme"
            className="inline-flex min-h-[52px] items-center rounded-buta bg-aubergine px-6 font-bold text-pistache no-underline hover:opacity-90"
          >
            Voir le programme
          </Link>
          <Link
            to="/espace-membre"
            className="inline-flex min-h-[52px] items-center rounded-buta border-2 border-encre px-6 font-bold no-underline hover:bg-encre hover:text-pistache"
          >
            Découvrir l'espace membre
          </Link>
        </div>
      </section>
    </PageRubrique>
  );
};

export default Saisons;
