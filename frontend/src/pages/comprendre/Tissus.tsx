import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { DHATUS, REFS_TISSUS } from "@/data/corpsEsprit";

const Tissus = () => (
  <PageComprendre>
    <Frontispice deva="धातु" translit="dhātu, ce qui soutient le corps" titre="Les tissus">
      <p className="m-0 mt-1 max-w-[44ch] text-xl text-doux">Sept tissus portent le corps. Chacun se nourrit du précédent, et de leur essence naît l'ojas.</p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />
    <DApres>Suśruta, Sūtrasthāna 14 et 15 ; Charaka, Sūtrasthāna 17</DApres>

    {/* Les sept tissus */}
    <section aria-labelledby="ce-tissus" className="relative mt-14 overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto flex max-w-[1220px] flex-col gap-10 px-4 py-16 sm:px-10 md:py-20">
        <div className="grid items-end gap-5 md:grid-cols-2 md:gap-14">
          <h2 id="ce-tissus" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            Les sept tissus
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            La nourriture digérée devient d'abord du plasma, qui nourrit le sang, qui nourrit les muscles, et ainsi de suite jusqu'au septième tissu. Selon
            Sushruta, il faut environ un mois pour parcourir la chaîne, à peu près cinq jours par tissu.<Renvoi n={1} clair />
          </p>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="absolute bottom-8 left-[45px] top-8 border-l-2 border-dashed border-pistache/50 lg:bottom-auto lg:left-[6%] lg:right-[6%] lg:top-[46px] lg:border-l-0 lg:border-t-2" />
          <ol className="relative m-0 grid list-none gap-5 p-0 lg:grid-cols-7 lg:gap-2.5">
            {DHATUS.map((d) => (
              <li key={d.nom} className="flex items-center gap-5 lg:flex-col lg:gap-2 lg:text-center">
                <span className="flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-full bg-pistache text-paon shadow-[0_0_0_2px_hsl(var(--encre))]">
                  <Deva className="text-[26px] text-paon">{d.deva}</Deva>
                </span>
                <span className="flex flex-col lg:items-center">
                  <span className="font-display text-[1.2rem] leading-none">{d.nom}</span>
                  <span className="text-[15px] leading-snug text-[#D3E3DE] lg:max-w-[12ch]">{d.fr}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <div className="flex items-center gap-5 rounded-buta bg-citron px-6 py-6 text-encre sm:px-8">
            <span className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full bg-pistache shadow-[0_0_0_2px_hsl(var(--encre))]">
              <Deva className="text-[24px] text-paon">ओजस्</Deva>
            </span>
            <span className="flex flex-col gap-1">
              <h3 className="m-0 text-2xl">Ojas</h3>
              <span>L'essence de tous les tissus. Elle donne la force de résister à la maladie, l'éclat et l'endurance. Une bonne digestion la nourrit, la colère, le chagrin, les soucis et l'épuisement l'usent.<Renvoi n={2} /></span>
            </span>
          </div>
          <div className="flex flex-col gap-2 border-t-2 border-pistache pt-4">
            <h3 className="m-0 flex items-baseline gap-2.5 text-[1.4rem]">
              Les trois déchets
              <Deva className="text-xl normal-case text-citron">मल</Deva>
            </h3>
            <p className="m-0 text-[#D3E3DE]">Les selles, l'urine et la sueur emportent ce que le corps n'utilise pas. Leur régularité est un signe d'équilibre.<Renvoi n={3} clair /></p>
          </div>
        </div>
      </div>
    </section>

    <Sources refs={REFS_TISSUS} />
    <PiedSuite />
  </PageComprendre>
);

export default Tissus;
