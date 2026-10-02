import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { ELANS_A_RETENIR, REFS_BESOINS, TREIZE_BESOINS } from "@/data/sante";

const Besoins = () => (
  <PageComprendre>
    <Frontispice deva="वेग" translit="vega, l'élan du corps" titre="Les besoins naturels">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Certains élans du corps ne doivent jamais être retenus. D'autres, ceux de l'esprit, doivent l'être. Charaka les range dans un même chapitre.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
      <DApres>Charaka, Sūtrasthāna 7</DApres>
    </Frontispice>
    <Bande />

    <section aria-labelledby="be-treize" className="mx-auto flex max-w-[1180px] flex-col gap-9 px-4 pb-20 pt-14 sm:px-10 md:pt-16">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="be-treize" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Treize élans à laisser faire
        </h2>
        <p className="m-0 text-lg text-doux">
          Les retenir dérègle Vata, et chacun a ses troubles propres, du mal de tête aux douleurs du ventre.
          <Renvoi n={1} />
        </p>
      </div>
      <ol className="m-0 grid list-none grid-cols-3 gap-x-3 gap-y-7 p-0 sm:grid-cols-4 lg:grid-cols-7">
        {TREIZE_BESOINS.map(([d, t], i) => (
          <li key={t} className="flex flex-col items-center gap-2 text-center">
            <span
              className={`flex h-[84px] w-[84px] items-center justify-center rounded-full shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:h-[104px] sm:w-[104px] ${i % 2 ? "bg-surface" : "bg-carte"}`}
            >
              <Deva className="text-[21px] text-paon sm:text-2xl">{d}</Deva>
            </span>
            <span className="text-[15px] leading-tight sm:text-base">{t}</span>
          </li>
        ))}
      </ol>
    </section>

    <section aria-labelledby="be-retenir" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto grid max-w-[1100px] items-start gap-10 px-4 py-16 sm:px-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16 md:py-[72px]">
        <div className="flex flex-col gap-4">
          <h2 id="be-retenir" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            Ceux qu'il faut retenir
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Les élans de l'esprit, eux, sont à contenir. Celui qui les maîtrise, dit Charaka, est heureux en ce monde comme dans l'autre.
            <Renvoi n={2} clair />
          </p>
        </div>
        <ul className="m-0 list-none p-0">
          {ELANS_A_RETENIR.map(([t, x]) => (
            <li key={t} className="flex flex-col gap-1.5 border-t border-pistache/30 py-4">
              <h3 className="m-0 text-[1.3rem]">{t}</h3>
              <span className="text-[#D3E3DE]">{x}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <p className="mx-auto mb-0 mt-16 max-w-[1100px] px-4 text-[1.2rem] italic text-aubergine sm:px-10">
      Ces conseils décrivent la santé ordinaire. Un besoin qui devient pressant, douloureux ou anormal demande l'avis d'un médecin.
    </p>

    <Sources refs={REFS_BESOINS} />
    <PiedSuite />
  </PageComprendre>
);

export default Besoins;
