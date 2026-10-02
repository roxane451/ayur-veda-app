import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import Glyphe from "@/components/comprendre/Glyphe";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { COULEUR_DOSHA } from "@/components/quiz/conseils";
import { CINQ_ELEMENTS, REFS_ELEMENTS, SAVEURS_ELEMENTS, TROIS_FORCES } from "@/data/principes";
import { NOM_DOSHA } from "@/lib/doshaLogic";

const Elements = () => (
  <PageComprendre>
    <Frontispice deva="पञ्चमहाभूत" translit="pañca mahābhūta, les cinq grands éléments" titre="Les cinq éléments">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Tout ce qui existe, le corps comme l'assiette, est fait des cinq mêmes éléments. Chacun se reconnaît à ce qu'il fait percevoir.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />
    <DApres>Charaka, Śārīrasthāna 1 ; Suśruta, Sūtrasthāna 21</DApres>

    <section aria-labelledby="el-cinq" className="mx-auto flex max-w-[1220px] flex-col gap-9 px-4 pb-20 pt-14 sm:px-10 md:pt-16">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="el-cinq" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Du plus subtil au plus dense
        </h2>
        <p className="m-0 text-lg text-doux">
          Chaque élément est lié à un sens. L'éther se perçoit par le son, la terre par l'odeur. Les textes les rangent dans cet ordre.
          <Renvoi n={1} />
        </p>
      </div>
      <ol className="m-0 grid list-none gap-x-5 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-5">
        {CINQ_ELEMENTS.map((e) => (
          <li key={e.id} className="grid grid-cols-[120px_minmax(0,1fr)] gap-x-5 gap-y-3 sm:flex sm:flex-col">
            <div
              className={`row-span-4 flex h-[190px] flex-col items-center justify-end gap-1 rounded-b-[10px] rounded-t-full px-3 pb-4 shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:h-[250px] sm:pb-5 ${e.fond}`}
            >
              <Glyphe id={e.id} taille={64} />
              <Deva className="text-[24px] text-paon sm:text-[28px]">{e.deva}</Deva>
              <i className="text-doux">{e.sanskrit}</i>
            </div>
            <h3 className="m-0 text-[1.6rem] leading-none">{e.nom}</h3>
            <p className="m-0 flex flex-col gap-0.5 border-t border-encre/20 pt-2">
              <span className="text-sm text-doux">Ce qu'il fait percevoir</span>
              <span>
                <b>{e.qualite}</b>, par {e.organe}
              </span>
            </p>
            <p className="m-0 flex flex-col gap-0.5 border-t border-encre/20 pt-2">
              <span className="text-sm text-doux">Dans le corps</span>
              <span>{e.corps}</span>
            </p>
          </li>
        ))}
      </ol>
    </section>

    <section aria-labelledby="el-assiette" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto grid max-w-[1100px] items-start gap-10 px-4 py-16 sm:px-10 md:grid-cols-2 md:gap-16 md:py-[72px]">
        <div className="flex flex-col gap-4">
          <h2 id="el-assiette" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            Dans l'assiette
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Selon Suśruta, chaque saveur naît de deux éléments qui dominent, et agit sur le corps comme eux.<Renvoi n={2} /> Charaka, lui, attribue le sucré à l'eau seule.
            <Renvoi n={3} />
          </p>
        </div>
        <ul className="m-0 grid list-none grid-cols-2 gap-x-8 p-0">
          {SAVEURS_ELEMENTS.map(([s, e]) => (
            <li key={s} className="flex flex-col gap-1 border-t border-pistache/30 py-4">
              <span className="font-display text-[1.35rem]">{s}</span>
              <span className="text-[#D3E3DE]">{e}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section aria-labelledby="el-doshas" className="mx-auto grid max-w-[1100px] items-start gap-10 px-4 pb-10 pt-20 sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
      <div className="flex flex-col gap-4">
        <h2 id="el-doshas" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Vers les doshas
        </h2>
        <p className="m-0 text-lg text-doux">
          Suśruta compare les trois doshas à trois forces du monde. Le vent disperse, le soleil absorbe, la lune nourrit. Le corps fonctionne de la même
          façon.
          <Renvoi n={4} />
        </p>
        <p className="m-0 text-doux">
          Plus tard, les auteurs ont précisé leurs éléments. Vata tient de l'air et de l'éther, Pitta surtout du feu, Kapha de l'eau et de la terre.
        </p>
      </div>
      <ul className="m-0 list-none p-0">
        {TROIS_FORCES.map((f) => (
          <li key={f.dosha} className="flex items-center gap-5 border-t border-encre/20 py-4">
            <span
              className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full shadow-[0_0_0_2px_hsl(var(--encre))]"
              style={{ background: COULEUR_DOSHA[f.dosha] }}
            >
              <Glyphe id={f.element} taille={46} couleur={f.dosha === "vata" ? "#13201E" : "#F3F5E6"} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-display text-2xl">
                {NOM_DOSHA[f.dosha]} <i className="font-body text-[1.15rem] normal-case tracking-normal text-aubergine">{f.image}</i>
              </span>
              <span className="text-lg">{f.texte}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>

    <Sources refs={REFS_ELEMENTS} />
    <PiedSuite />
  </PageComprendre>
);

export default Elements;
