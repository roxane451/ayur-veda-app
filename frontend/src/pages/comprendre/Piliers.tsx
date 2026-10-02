import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Lotus, Poudre, SoleilLune } from "@/components/brand/Illustrations";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { PILIERS, REFS_PILIERS } from "@/data/corpsEsprit";

const Piliers = () => (
  <PageComprendre>
    <Frontispice deva="त्रयोपस्तम्भ" translit="trayopastambha, les trois soutiens" titre="Les trois piliers">
      <p className="m-0 mt-1 max-w-[44ch] text-xl text-doux">La nourriture, le sommeil et la maîtrise de soi. Charaka les compare aux piliers d'une maison.</p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />
    <DApres>Charaka, Sūtrasthāna 11</DApres>

    {/* Les trois piliers */}
    <section aria-labelledby="ce-piliers" className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 pb-20 pt-14 sm:px-10 md:pt-20">
      <div className="grid items-end gap-5 md:grid-cols-2 md:gap-14">
        <h2 id="ce-piliers" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Les trois piliers
        </h2>
        <p className="m-0 text-lg text-doux">Charaka décrit trois soutiens de la vie. Quand l'un d'eux faiblit, la santé vacille.<Renvoi n={1} /></p>
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

    <Sources refs={REFS_PILIERS} />
    <PiedSuite />
  </PageComprendre>
);

export default Piliers;
