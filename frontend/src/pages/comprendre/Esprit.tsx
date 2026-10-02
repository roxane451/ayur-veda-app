import { Bande } from "@/components/brand/BrandDefs";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { GUNAS_ESPRIT, REFS_ESPRIT } from "@/data/corpsEsprit";

const Esprit = () => (
  <PageComprendre>
    <Frontispice deva="मनस्" translit="manas, l'esprit" titre="L'esprit">
      <p className="m-0 mt-1 max-w-[44ch] text-xl text-doux">Sattva éclaire l'esprit. Rajas et tamas, quand ils dominent, le troublent, et Charaka les appelle les deux doshas de l'esprit.<Renvoi n={1} /></p>
      <div className="mt-5">
        <Ornement />
      </div>
      <DApres>Charaka, Sūtrasthāna 1 ; Śārīrasthāna 4</DApres>
    </Frontispice>
    <Bande />

    {/* Sattva, rajas, tamas */}
    <section aria-labelledby="ce-esprit" className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 pb-16 pt-14 sm:px-10 md:pb-[88px] md:pt-16">
      <div className="grid items-end gap-5 md:grid-cols-2 md:gap-14">
        <h2 id="ce-esprit" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Sattva, rajas et tamas
        </h2>
        <p className="m-0 text-lg text-doux">
          Les doshas décrivent le corps. L'esprit, lui, se lit à travers trois qualités, et Charaka en décrit seize types. On les a toutes les trois, et l'Ayurveda cherche à faire grandir
          la première.
          <Renvoi n={2} />
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

    <Sources refs={REFS_ESPRIT} />
    <PiedSuite />
  </PageComprendre>
);

export default Esprit;
