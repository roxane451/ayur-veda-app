import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { REFS_CAUSES, SENS_MAL_EMPLOYES, TEMPS, TROIS_CAUSES, TROIS_FACULTES } from "@/data/causes";

const COLONNES = [
  { titre: "Trop", couleur: "text-aubergine" },
  { titre: "Trop peu", couleur: "text-paon" },
  { titre: "De travers", couleur: "text-citron-fonce" },
];

const Causes = () => (
  <PageComprendre>
    <Frontispice deva="त्रिविध हेतु" translit="trividha hetu, les trois causes" titre="Les trois causes">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Pour Charaka, toute maladie vient de trois choses. Les connaître, c'est savoir où agir avant qu'elle ne s'installe.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />
    <DApres>Charaka, Sūtrasthāna 11 ; Śārīrasthāna 1</DApres>

    <section aria-labelledby="ca-trois" className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 pb-16 pt-14 sm:px-10 md:pt-16">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="ca-trois" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Trois causes
        </h2>
        <p className="m-0 text-lg text-doux">
          Les sens, le jugement et le temps. Chacune peut pécher par excès, par manque ou par mauvais usage.
          <Renvoi n={1} />
        </p>
      </div>
      <ol className="m-0 grid list-none gap-10 p-0 sm:grid-cols-3 sm:gap-6 lg:gap-8">
        {TROIS_CAUSES.map((c, i) => (
          <li key={c.titre} className="flex flex-col gap-2.5">
            <div
              className={`flex h-[190px] flex-col items-center justify-end gap-1.5 rounded-b-[10px] rounded-t-full px-3 pb-5 text-center shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:h-[230px] ${c.fond}`}
            >
              <span className="font-body text-[2.1rem] italic leading-none">{i + 1}</span>
              <Deva className="break-all text-[17px] text-inherit sm:text-[19px]">{c.deva}</Deva>
            </div>
            <h3 className="m-0 text-[1.4rem] leading-tight">{c.titre}</h3>
            <p className="m-0 text-lg text-doux">{c.texte}</p>
          </li>
        ))}
      </ol>
    </section>

    <section aria-labelledby="ca-sens" className="mx-auto flex max-w-[1100px] flex-col gap-6 px-4 pb-20 sm:px-10">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="ca-sens" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Les sens mal employés
        </h2>
        <p className="m-0 text-lg text-doux">
          Chaque sens a sa juste mesure. Charaka donne des exemples pour les cinq.
          <Renvoi n={2} />
        </p>
      </div>
      <table className="hidden w-full border-collapse text-left md:table">
        <thead>
          <tr>
            <td className="w-[150px]" />
            {COLONNES.map((c) => (
              <th key={c.titre} scope="col" className={`pb-2.5 pr-3 font-body text-[15px] font-bold ${c.couleur}`}>
                {c.titre}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SENS_MAL_EMPLOYES.map(([sens, ...cases]) => (
            <tr key={sens} className="border-t border-encre/20">
              <th scope="row" className="py-3.5 pr-3 font-display text-[1.15rem] font-normal">
                {sens}
              </th>
              {cases.map((x, i) => (
                <td key={i} className="py-3.5 pr-3">
                  {x}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="m-0 flex list-none flex-col p-0 md:hidden">
        {SENS_MAL_EMPLOYES.map(([sens, ...cases]) => (
          <li key={sens} className="flex flex-col gap-1.5 border-t border-encre/20 py-4">
            <h3 className="m-0 text-[1.25rem]">{sens}</h3>
            <dl className="m-0">
              {cases.map((x, i) => (
                <div key={i} className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 py-0.5">
                  <dt className={`font-bold ${COLONNES[i].couleur}`}>{COLONNES[i].titre}</dt>
                  <dd className="m-0">{x}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </section>

    <section aria-labelledby="ca-jugement" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto grid max-w-[1100px] items-start gap-10 px-4 py-16 sm:px-10 md:grid-cols-2 md:gap-16 md:py-[72px]">
        <div className="flex flex-col gap-4">
          <p className="m-0 flex flex-wrap items-baseline gap-x-3">
            <Deva className="text-[30px] text-citron">प्रज्ञापराध</Deva>
            <i className="text-[#C4DCD5]">prajñāparādha</i>
          </p>
          <h2 id="ca-jugement" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            L'erreur de jugement
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Charaka y voit la racine de bien des maladies. On sait, et l'on fait quand même. Elle naît quand l'une de ces trois facultés se trouble.
            <Renvoi n={3} clair />
          </p>
        </div>
        <ul className="m-0 list-none p-0">
          {TROIS_FACULTES.map((f) => (
            <li key={f.sanskrit} className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-3.5 border-t border-pistache/30 py-4">
              <Deva className="text-[30px] text-citron">{f.deva}</Deva>
              <span className="flex flex-col gap-0.5">
                <h3 className="m-0 text-[1.3rem]">
                  {f.titre} <i className="font-body text-base normal-case tracking-normal text-[#C4DCD5]">{f.sanskrit}</i>
                </h3>
                <span className="text-[#D3E3DE]">{f.texte}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section aria-labelledby="ca-temps" className="mx-auto flex max-w-[1100px] flex-col gap-7 px-4 pb-10 pt-20 sm:px-10">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="ca-temps" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Le temps
        </h2>
        <p className="m-0 text-lg text-doux">
          Les saisons aussi peuvent être trop marquées, trop faibles ou à contretemps. L'âge, lui, fait son œuvre quoi qu'on fasse.
          <Renvoi n={4} />
        </p>
      </div>
      <ul className="m-0 grid list-none gap-8 p-0 md:grid-cols-3">
        {TEMPS.map((t) => (
          <li key={t.titre} className={`flex flex-col gap-1.5 border-t-4 pt-3.5 ${t.trait}`}>
            <h3 className="m-0 text-[1.3rem]">{t.titre}</h3>
            <p className="m-0 text-lg">{t.texte}</p>
          </li>
        ))}
      </ul>
    </section>

    <Sources refs={REFS_CAUSES} />
    <PiedSuite />
  </PageComprendre>
);

export default Causes;
