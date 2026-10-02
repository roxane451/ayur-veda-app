import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import { AGES, CYCLES } from "@/data/agesDesequilibre";
import { NOM_DOSHA } from "@/lib/doshaLogic";

const Ages = () => (
  <PageComprendre>
    <Frontispice deva="वयस्" translit="vayas, l'âge" titre="Les âges de la vie">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Chaque âge a son dosha dominant. Ce qui est naturel à vingt ans ne l'est plus à soixante, et les conseils changent avec lui.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />

    <section aria-labelledby="ag-trois" className="mx-auto flex max-w-[1100px] flex-col gap-10 px-4 pb-20 pt-16 sm:px-10 md:pt-20">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="ag-trois" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Trois âges, trois doshas
        </h2>
        <p className="m-0 text-lg text-doux">
          Les âges sont ceux de Charaka (<i>Vimānasthāna</i> 8.122). Ce sont des repères, pas des frontières.
        </p>
      </div>

      <div aria-hidden="true" className="flex flex-col gap-2">
        <div className="flex overflow-hidden rounded-full shadow-[0_0_0_2px_hsl(var(--encre))]">
          {AGES.map((a, i) => (
            <div
              key={a.nom}
              className={`flex flex-col gap-0.5 px-3 py-3 sm:px-5 sm:py-4 ${i === 0 ? "pl-5 sm:pl-8" : ""} ${a.dosha === "vata" ? "text-encre" : "text-pistache"}`}
              style={{ flex: a.part, background: COULEUR_DOSHA[a.dosha] }}
            >
              <span className="font-display text-base leading-none sm:text-[1.35rem]">{NOM_DOSHA[a.dosha]}</span>
              <span className="text-[13px] opacity-90 sm:text-[15px]">{a.periode}</span>
            </div>
          ))}
        </div>
        <div className="relative mx-1 h-5 text-[13px] text-doux sm:text-sm">
          <span className="absolute left-0">naissance</span>
          <span className="absolute left-[30%] -translate-x-1/2">30 ans</span>
          <span className="absolute left-[60%] -translate-x-1/2">60 ans</span>
        </div>
      </div>

      <ul className="m-0 grid list-none gap-12 p-0 md:grid-cols-3 md:gap-10">
        {AGES.map((a) => (
          <li key={a.nom} className="flex flex-col gap-3.5 border-t-4 pt-5" style={{ borderColor: COULEUR_DOSHA[a.dosha] }}>
            <p className="m-0 flex items-baseline gap-2.5">
              <Deva className="text-[30px] text-paon">{a.deva}</Deva>
              <span className="italic text-doux">{a.sanskrit}</span>
            </p>
            <h3 className="m-0 text-[2rem] leading-none">{a.nom}</h3>
            <p className="m-0">{fr(a.texte)}</p>
            <div className="flex flex-col gap-1">
              <span className="text-lg italic text-aubergine">Quand {NOM_DOSHA[a.dosha]} déborde</span>
              <span>{a.exces}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg italic text-citron-fonce">Ce qui aide</span>
              <span>{a.aide}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>

    <section aria-labelledby="ag-cycle" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto flex max-w-[1100px] flex-col gap-7 px-4 py-16 sm:px-10 md:py-[72px]">
        <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
          <h2 id="ag-cycle" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            Le même cycle
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Kapha, Pitta puis Vata se succèdent dans la journée et dans la vie. Pour l'année, les textes indiens suivent les saisons de l'Inde, avec Vata à la saison des pluies et Pitta à la fin de celle-ci. Sous nos climats, on associe plutôt l'été à Pitta et l'automne à Vata.
          </p>
        </div>
        <table className="w-full border-collapse text-left text-[15px] sm:text-lg">
          <thead>
            <tr>
              <td className="w-[28%] pb-2.5" />
              {(["kapha", "pitta", "vata"] as const).map((d) => (
                <th key={d} scope="col" className="pb-2.5 font-body font-bold">
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-3 w-3 rounded-full shadow-[0_0_0_1.5px_hsl(var(--pistache))]"
                      style={{ background: d === "pitta" ? "#DCBFD5" : COULEUR_DOSHA[d] }}
                    />
                    {NOM_DOSHA[d]}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CYCLES.map((c) => (
              <tr key={c.echelle} className="border-t border-pistache/30">
                <th scope="row" className="py-3.5 pr-3 font-display text-[13px] font-normal sm:text-[17px]">
                  {c.echelle}
                </th>
                <td className="py-3.5 pr-3">{c.kapha}</td>
                <td className="py-3.5 pr-3">{c.pitta}</td>
                <td className="py-3.5">{c.vata}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <PiedSuite precedent="La journée" suivant="Le déséquilibre" />
  </PageComprendre>
);

export default Ages;
