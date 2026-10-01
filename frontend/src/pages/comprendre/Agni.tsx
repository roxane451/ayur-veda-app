import { Bande } from "@/components/brand/BrandDefs";
import { Flamme } from "@/components/brand/Illustrations";
import Photo from "@/components/brand/PhotoPlaceholder";
import { Deva, PageComprendre, PiedSuite, TitrePage } from "@/components/comprendre/Commun";
import { fr } from "@/components/quiz/conseils";
import { ETATS_AGNI, GESTES_AGNI, SIGNES_AMA } from "@/data/comprendre";

const Agni = () => (
  <PageComprendre>
    <div className="mx-auto grid max-w-[1220px] items-center gap-6 px-4 sm:px-10 md:grid-cols-2">
      <TitrePage
        fil="Agni"
        titre="Agni, le feu digestif"
        deva="अग्नि"
        translit="agni"
        intro="Agni est le feu qui transforme la nourriture. Pour l'Ayurveda, il digère aussi les émotions et les expériences, et la santé dépend de sa vigueur."
      />
      <div className="relative mx-4 mb-8 h-[300px] md:mx-10 md:mb-0 md:h-[380px]">
        <Photo description="casserole qui frémit sur le feu, épices autour" arche />
        <div className="absolute -left-3 top-6 md:-left-5 md:bottom-5 md:top-auto">
          <Flamme size={150} stroke="#13201E" decorative className="h-auto w-[110px] md:w-[150px]" />
        </div>
      </div>
    </div>
    <Bande />

    <section aria-labelledby="a-etats" className="mx-auto flex max-w-[1220px] flex-col gap-6 px-4 py-16 sm:px-10 md:py-[72px]">
      <div className="grid items-end gap-8 md:grid-cols-2">
        <h2 id="a-etats" className="m-0 text-[clamp(2.2rem,4.4vw,3.25rem)]">
          Les quatre états du feu
        </h2>
        <p className="m-0 text-doux">
          Chaque dosha en excès dérègle le feu d'une façon qui lui est propre.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ETATS_AGNI.map((e) => (
          <article key={e.translit} className="flex flex-col gap-2.5 rounded-2xl bg-carte p-6 shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
            <div className="flex h-[120px] items-end justify-center">
              <Flamme size={Math.round(100 * e.echelle)} stroke="#13201E" decorative />
            </div>
            <span className="flex items-baseline justify-between gap-2">
              <h3 className="m-0 text-[1.75rem]">{e.adjectif}</h3>
              {e.dosha ? (
                <span className="text-sm font-bold text-doux">lié à {e.dosha}</span>
              ) : (
                <span className="text-sm font-bold text-citron-fonce">l'objectif</span>
              )}
            </span>
            <p className="m-0 flex items-baseline gap-2.5">
              <Deva className="text-xl text-aubergine">{e.deva}</Deva>
              <span className="italic text-doux">{e.translit}</span>
            </p>
            <p className="m-0 text-base">{fr(e.texte)}</p>
          </article>
        ))}
      </div>
    </section>

    <section aria-labelledby="a-ama" className="bg-paon text-pistache">
      <div className="mx-auto grid max-w-[1220px] gap-12 px-4 py-16 sm:px-10 md:grid-cols-2 md:py-[72px]">
        <div className="flex flex-col gap-3">
          <p className="m-0 flex items-baseline gap-3">
            <Deva className="text-[30px] text-citron">आम</Deva>
            <span className="italic text-[#C4DCD5]">āma</span>
          </p>
          <h2 id="a-ama" className="m-0 text-[clamp(2.2rem,4.4vw,2.75rem)] leading-[1.05]">
            Āma, ce qui reste quand le feu faiblit
          </h2>
          <p className="m-0 text-[#D3E3DE]">
            Ce qui n'est pas bien digéré laisse un résidu lourd et collant, āma. Pour l'Ayurveda, c'est le point de
            départ de nombreux déséquilibres.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="m-0 mb-1.5 text-2xl">Les signes qui peuvent l'indiquer</h3>
          <ul className="m-0 list-none p-0 text-[#D3E3DE]">
            {SIGNES_AMA.map((t) => (
              <li key={t} className="border-t border-dashed border-[#2C6B63] py-2.5">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section aria-labelledby="a-gestes" className="mx-auto grid max-w-[1220px] gap-10 px-4 py-16 sm:px-10 md:grid-cols-2 md:gap-12 md:py-[72px]">
      <h2 id="a-gestes" className="m-0 text-[clamp(2.2rem,4.4vw,3.25rem)] leading-[1.05]">
        Entretenir le feu digestif
      </h2>
      <ol className="m-0 list-none p-0">
        {GESTES_AGNI.map((t, i) => (
          <li key={t} className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-t border-dashed border-trait py-3.5">
            <span className="font-display text-2xl text-aubergine">{i + 1}</span>
            <span>{fr(t)}</span>
          </li>
        ))}
      </ol>
    </section>
    <PiedSuite precedent="Les six saveurs" suivant="La journée" />
  </PageComprendre>
);

export default Agni;
