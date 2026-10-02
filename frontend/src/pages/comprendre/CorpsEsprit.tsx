import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Lotus, Poudre, SoleilLune } from "@/components/brand/Illustrations";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { DHATUS, GUNAS_ESPRIT, PILIERS } from "@/data/corpsEsprit";

const CorpsEsprit = () => (
  <PageComprendre>
    <Frontispice deva="शरीर मनस्" translit="śarīra, le corps, et manas, l'esprit" titre="Le corps et l'esprit">
      <p className="m-0 mt-1 max-w-[44ch] text-xl text-doux">Ce qui soutient la santé, ce qui nourrit le corps, et ce qui colore l'esprit.</p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />

    {/* Les trois piliers */}
    <section aria-labelledby="ce-piliers" className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 pb-20 pt-16 sm:px-10 md:pt-20">
      <div className="grid items-end gap-5 md:grid-cols-2 md:gap-14">
        <h2 id="ce-piliers" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Les trois piliers
        </h2>
        <p className="m-0 text-lg text-doux">Charaka décrit trois soutiens de la vie. Quand l'un d'eux faiblit, la santé vacille.</p>
      </div>
      <div className="relative -mx-2 hidden h-[30px] overflow-hidden rounded-md bg-paon md:block">
        <Motif id="dabu" />
        <span className="relative block text-center font-display text-[15px] leading-[30px] tracking-[0.2em] text-pistache">La santé</span>
      </div>
      <ul className="m-0 grid list-none gap-8 p-0 md:-mt-4 md:grid-cols-3 md:gap-10">
        {PILIERS.map((p, i) => {
          const Illu = [Poudre, SoleilLune, Lotus][i];
          return (
            <li
              key={p.nom}
              className="relative flex flex-col items-center gap-2 overflow-hidden rounded-t-full bg-carte px-7 pb-0 pt-12 text-center shadow-[inset_0_0_0_2px_hsl(var(--encre))] md:pt-14"
            >
              <Illu size={96} decorative className="h-auto w-20 md:w-24" />
              <Deva className="mt-2 text-[36px] text-paon">{p.deva}</Deva>
              <span className="italic text-doux">{p.sanskrit}</span>
              <h3 className="m-0 mt-1 text-[1.5rem] leading-tight">{p.nom}</h3>
              <p className="m-0 mb-7 mt-1 max-w-[28ch]">{p.texte}</p>
              <div aria-hidden="true" className="relative -mx-7 mt-auto h-6 self-stretch overflow-hidden border-t-2 border-encre bg-paon">
                <Motif id="dabu" />
              </div>
            </li>
          );
        })}
      </ul>
    </section>

    {/* Les sept tissus */}
    <section aria-labelledby="ce-tissus" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto flex max-w-[1220px] flex-col gap-10 px-4 py-16 sm:px-10 md:py-20">
        <div className="grid items-end gap-5 md:grid-cols-2 md:gap-14">
          <h2 id="ce-tissus" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            Les sept tissus
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            La nourriture digérée devient d'abord du plasma, qui nourrit le sang, qui nourrit les muscles, et ainsi de suite jusqu'au septième tissu. Selon
            Sushruta, il faut environ un mois pour parcourir la chaîne, à peu près cinq jours par tissu.
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
              <span>L'essence de tous les tissus. Elle donne la force de résister à la maladie, l'éclat et l'endurance. Une bonne digestion la nourrit, la colère, le chagrin, les soucis et l'épuisement l'usent.</span>
            </span>
          </div>
          <div className="flex flex-col gap-2 border-t-2 border-pistache pt-4">
            <h3 className="m-0 flex items-baseline gap-2.5 text-[1.4rem]">
              Les trois déchets
              <Deva className="text-xl normal-case text-citron">मल</Deva>
            </h3>
            <p className="m-0 text-[#D3E3DE]">Les selles, l'urine et la sueur emportent ce que le corps n'utilise pas. Leur régularité est un signe d'équilibre.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Sattva, rajas, tamas */}
    <section aria-labelledby="ce-esprit" className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 py-16 sm:px-10 md:py-[88px]">
      <div className="grid items-end gap-5 md:grid-cols-2 md:gap-14">
        <h2 id="ce-esprit" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Les trois qualités de l'esprit
        </h2>
        <p className="m-0 text-lg text-doux">
          Les doshas décrivent le corps. L'esprit, lui, se lit à travers trois qualités. On les a toutes les trois, et l'Ayurveda cherche à faire grandir
          la première.
        </p>
      </div>
      <ul className="m-0 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-9">
        {GUNAS_ESPRIT.map((g) => (
          <li key={g.nom} className="flex flex-col gap-4">
            <div className={`flex h-[200px] flex-col items-center justify-center gap-1 rounded-b-[14px] rounded-t-full shadow-[inset_0_0_0_2px_hsl(var(--encre))] md:h-[220px] ${g.fond}`}>
              <Deva className="text-[44px]">{g.deva}</Deva>
              <h3 className="m-0 text-[1.6rem]">{g.nom}</h3>
            </div>
            <p className="m-0 text-[1.35rem] italic text-aubergine">{g.essence}</p>
            <p className="m-0">{g.texte}</p>
          </li>
        ))}
      </ul>
    </section>

    <PiedSuite />
  </PageComprendre>
);

export default CorpsEsprit;
