import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Flamme, Goutte, Vent } from "@/components/brand/Illustrations";
import { Deva, FilAriane, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import { COMPARAISON, DOSHAS_DETAIL, type DoshaDetail } from "@/data/comprendre";
import type { DoshaKey } from "@/lib/doshaLogic";

const ILLU: Record<DoshaKey, typeof Vent> = { vata: Vent, pitta: Flamme, kapha: Goutte };

const Liste = ({ titre, items, couleur }: { titre: string; items: string[]; couleur: string }) => (
  <div className="flex flex-col gap-1">
    <h3 className={`m-0 mb-1 font-body text-[1.35rem] normal-case italic tracking-normal ${couleur}`}>{titre}</h3>
    <ul className="m-0 list-none p-0">
      {items.map((t) => (
        <li key={t} className="border-t border-dashed border-trait py-2.5">
          {t}
        </li>
      ))}
    </ul>
  </div>
);

const Tableau = ({ titre, lignes }: { titre: string; lignes: [string, string][] }) => (
  <div className="flex flex-col">
    <h3 className="m-0 mb-2 text-[1.6rem]">{titre}</h3>
    <dl className="m-0">
      {lignes.map(([a, b]) => (
        <div key={a} className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-t border-dashed border-trait py-2.5 sm:grid-cols-[140px_minmax(0,1fr)]">
          <dt className="text-doux">{a}</dt>
          <dd className="m-0">{b}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const Detail = ({ d }: { d: DoshaDetail }) => {
  const Illu = ILLU[d.id];
  return (
    <section aria-labelledby={`d-${d.id}`} className="mx-auto flex max-w-[1220px] flex-col gap-14 px-4 py-16 sm:px-10 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
        <div className="flex flex-col gap-4">
          <p className="m-0 flex items-baseline gap-4">
            <Deva className="text-[44px] text-aubergine">{d.deva}</Deva>
            <span className="italic text-doux">{d.elements}</span>
          </p>
          <h2 id={`d-${d.id}`} className="m-0 text-[clamp(4rem,8vw,6.5rem)] leading-[0.9]">
            {d.nom}
          </h2>
          <p className="m-0 text-[1.9rem] italic text-aubergine">{d.essence}</p>
          <p className="m-0 max-w-[42ch]">{fr(d.presentation)}</p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Ses qualités">
            {d.qualites.map((q) => (
              <li key={q} className="rounded-full bg-carte px-3.5 py-1 text-[15px] font-bold shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
                {q}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-b-2xl rounded-t-full bg-paon md:h-[380px]">
          <Motif id="dabu" />
          <div className="relative">
            <Illu size={240} stroke="#F3F5E6" decorative className="h-auto w-[180px] md:w-[240px]" />
          </div>
        </div>
      </div>
      <div className="grid gap-12 md:grid-cols-2 md:gap-14">
        <Tableau titre="Le corps" lignes={d.corps} />
        <Tableau titre="L'esprit" lignes={d.esprit} />
      </div>
      <div className="grid gap-10 rounded-2xl bg-carte p-6 shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:p-10 md:grid-cols-3">
        <Liste titre={`Quand ${d.nom} est en excès`} items={d.signes} couleur="text-aubergine" />
        <Liste titre="Pour le rééquilibrer" items={d.conseils} couleur="text-citron-fonce" />
        <div className="flex flex-col gap-3">
          <h3 className="m-0 font-body text-[1.35rem] normal-case italic tracking-normal text-paon">Les plantes de {d.nom}</h3>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {d.plantes.map((p) => (
              <li key={p} className="inline-flex min-h-10 items-center rounded-full bg-surface px-4 text-[15px] font-bold">
                {p}
              </li>
            ))}
          </ul>
          <p className="m-0 mt-2 text-base text-doux">
            {/* [À FAIRE] fiches plantes à rédiger, avec leurs précautions d'emploi */}
            Leurs fiches, avec les précautions d'emploi, arrivent dans la rubrique La cuisine.
          </p>
        </div>
      </div>
    </section>
  );
};

const Resume = ({ d, onChoisir }: { d: DoshaDetail; onChoisir: () => void }) => {
  const Illu = ILLU[d.id];
  return (
    <button
      type="button"
      onClick={onChoisir}
      className="grid w-full grid-cols-[72px_minmax(0,1fr)] items-center gap-5 rounded-2xl bg-paon px-6 py-6 text-left text-pistache hover:opacity-95 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:gap-7 sm:px-8 sm:py-7"
    >
      <Illu size={110} stroke="#F3F5E6" decorative className="h-auto w-[72px] sm:w-[110px]" />
      <span className="flex flex-col gap-2">
        <span className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
          <span className="font-display text-[2.2rem] leading-none sm:text-[2.6rem]">{d.nom}</span>
          <Deva className="text-[26px] text-citron">{d.deva}</Deva>
          <span className="italic text-[#C4DCD5]">
            {d.essence.toLowerCase()} · {d.elements}
          </span>
        </span>
        <span className="flex flex-wrap gap-1.5">
          {d.qualites.map((q) => (
            <span key={q} className="rounded-full px-3 py-0.5 text-sm shadow-[inset_0_0_0_1.5px_hsl(var(--pistache))]">
              {q}
            </span>
          ))}
        </span>
      </span>
      <span className="col-span-2 inline-flex items-center gap-2 font-bold sm:col-span-1">
        Lire <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
    </button>
  );
};

const Doshas = () => {
  const [params, setParams] = useSearchParams();
  const choisi = (DOSHAS_DETAIL.find((d) => d.id === params.get("dosha")) ?? DOSHAS_DETAIL[0]).id;
  const actif = DOSHAS_DETAIL.find((d) => d.id === choisi)!;
  const choisir = (id: DoshaKey) => {
    setParams({ dosha: id }, { replace: true });
    document.getElementById("detail-dosha")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageComprendre>
      <section className="relative overflow-hidden">
        <Motif id="buta" />
        <div className="relative mx-auto grid max-w-[1220px] items-end gap-10 px-4 pb-14 pt-6 sm:px-10 md:grid-cols-2 md:pb-20">
          <div className="flex flex-col gap-5">
            <FilAriane page="Les doshas" />
            <h1 className="m-0 text-[clamp(2.6rem,6.4vw,5.25rem)] leading-none">Les trois doshas</h1>
            <p className="m-0 max-w-[40ch] text-xl text-doux">
              Ce sont les trois énergies qui gouvernent le corps et l'esprit. Chacun de nous les porte toutes, dans un
              dosage qui lui est propre&nbsp;: sa <em className="font-body normal-case">prakriti</em>.
            </p>
            <div role="tablist" aria-label="Choisir un dosha" className="flex flex-wrap gap-2">
              {DOSHAS_DETAIL.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={d.id === choisi}
                  aria-controls="detail-dosha"
                  onClick={() => choisir(d.id)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-[15px] font-bold ${
                    d.id === choisi ? "bg-encre text-pistache" : "shadow-[inset_0_0_0_1.5px_hsl(var(--trait))] hover:bg-surface"
                  }`}
                >
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: COULEUR_DOSHA[d.id] }} />
                  {d.nom}
                </button>
              ))}
              <a href="#d-comparer" className="inline-flex min-h-10 items-center rounded-full px-4 text-[15px] font-bold no-underline shadow-[inset_0_0_0_1.5px_hsl(var(--trait))] hover:bg-surface">
                Comparer les trois
              </a>
            </div>
          </div>
          <div className="flex items-end justify-center gap-2">
            <Vent size={150} stroke="#13201E" decorative className="h-auto w-[30%] max-w-[150px]" />
            <Flamme size={170} stroke="#13201E" decorative className="h-auto w-[34%] max-w-[170px]" />
            <Goutte size={150} stroke="#13201E" decorative className="h-auto w-[30%] max-w-[150px]" />
          </div>
        </div>
      </section>
      <Bande />

      <div id="detail-dosha" role="tabpanel" className="scroll-mt-20" key={choisi}>
        <Detail d={actif} />
      </div>

      <section aria-label="Les deux autres doshas" className="mx-auto flex max-w-[1220px] flex-col gap-4 px-4 pb-24 sm:px-10">
        {DOSHAS_DETAIL.filter((d) => d.id !== choisi).map((d) => (
          <Resume key={d.id} d={d} onChoisir={() => choisir(d.id)} />
        ))}
      </section>

      <section aria-labelledby="d-comparer" id="d-comparer" className="scroll-mt-20 bg-surface">
        <div className="mx-auto flex max-w-[1220px] flex-col gap-7 px-4 py-16 sm:px-10 md:py-[88px]">
          <h2 className="m-0 text-[clamp(2.2rem,4.4vw,3.25rem)]">Les trois, côte à côte</h2>
          <div className="overflow-x-auto rounded-2xl bg-carte shadow-[inset_0_0_0_2px_hsl(var(--encre))]">
            <table className="w-full min-w-[640px] border-collapse text-[17px]">
              <thead>
                <tr>
                  <td className="p-4" />
                  {DOSHAS_DETAIL.map((d) => (
                    <th key={d.id} scope="col" className="p-4 text-left font-display text-[1.6rem] font-normal">
                      <span aria-hidden="true" className="mr-2.5 inline-block h-3 w-3 rounded-full" style={{ background: COULEUR_DOSHA[d.id] }} />
                      {d.nom}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARAISON.map(([c, ...v]) => (
                  <tr key={c}>
                    <th scope="row" className="border-t border-dashed border-trait px-4 py-3.5 text-left font-bold">
                      {c}
                    </th>
                    {v.map((x, i) => (
                      <td key={i} className="border-t border-dashed border-trait px-4 py-3.5">
                        {x}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-citron">
        <div className="mx-auto flex max-w-[1220px] flex-wrap items-center justify-between gap-8 px-4 py-16 sm:px-10 md:py-[72px]">
          <div className="flex max-w-[560px] flex-col gap-2.5">
            <h2 className="m-0 text-[clamp(2.2rem,5vw,3rem)] leading-none">{fr("Et vous, quel est votre dosha ?")}</h2>
            <p className="m-0">{fr("Le quiz se fait en deux parties : votre nature, puis votre état du moment.")}</p>
          </div>
          <Link
            to="/profil"
            className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-aubergine px-6 font-bold text-pistache no-underline hover:opacity-90"
          >
            Faire le quiz <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <div className="h-16" />
      <PiedSuite precedent="L'essentiel" suivant="Les six saveurs" />
    </PageComprendre>
  );
};

export default Doshas;
