import { Bande, Motif } from "@/components/brand/BrandDefs";
import { ListeButa } from "@/components/brand/Listes";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { CE_QUI_DEPEND_DU_SOMMEIL, RAMENER_LE_SOMMEIL, REFS_SOMMEIL, SIESTE } from "@/data/sante";

const Sommeil = () => (
  <PageComprendre>
    <Frontispice deva="निद्रा" translit="nidrā, le sommeil" titre="Le sommeil">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        On dort quand l'esprit et les sens, fatigués, se retirent de ce qui les occupe. Charaka en fait le deuxième pilier de la vie.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />
    <DApres>Charaka, Sūtrasthāna 21</DApres>

    <section aria-labelledby="so-depend" className="relative mt-10 overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto grid max-w-[1100px] items-center gap-10 px-4 py-16 sm:px-10 md:grid-cols-2 md:gap-16 md:py-[72px]">
        <div className="flex flex-col gap-4">
          <h2 id="so-depend" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            Ce qui en dépend
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Pour Charaka, tout dépend du sommeil. Bien dormir donne le premier, mal dormir le second.
            <Renvoi n={1} clair />
          </p>
        </div>
        <ul className="m-0 list-none p-0">
          {CE_QUI_DEPEND_DU_SOMMEIL.map(([a, b]) => (
            <li key={a} className="grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)] items-baseline border-t border-pistache/30 py-3">
              <span className="text-right font-display text-[1.05rem] sm:text-[1.2rem]">{a}</span>
              <i className="text-center text-citron">ou</i>
              <span className="font-display text-[1.05rem] text-[#DCBFD5] sm:text-[1.2rem]">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section aria-labelledby="so-sieste" className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 pb-16 pt-20 sm:px-10">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="so-sieste" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          La sieste
        </h2>
        <p className="m-0 text-lg text-doux">
          Dormir le jour n'est ni bon ni mauvais en soi. Tout dépend de la saison et de la personne.
          <Renvoi n={2} />
        </p>
      </div>
      <ul className="m-0 grid list-none gap-8 p-0 md:grid-cols-3">
        {SIESTE.map((s) => (
          <li key={s.titre} className={`flex flex-col gap-2 border-t-4 pt-4 ${s.trait}`}>
            <h3 className="m-0 text-[1.4rem]">{s.titre}</h3>
            <p className="m-0 text-lg">{s.texte}</p>
          </li>
        ))}
      </ul>
      <p className="m-0 text-lg text-doux">
        Veiller la nuit assèche le corps, dormir le jour l'alourdit. Somnoler assis ne fait ni l'un ni l'autre.
        <Renvoi n={3} />
      </p>
    </section>

    <section aria-label="L'insomnie" className="mx-auto grid max-w-[1100px] items-start gap-10 px-4 pb-10 sm:px-10 md:grid-cols-2 md:gap-16">
      <div className="flex min-h-[280px] flex-col items-center justify-end gap-2 rounded-b-[14px] rounded-t-full bg-carte px-7 pb-8 text-center shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:min-h-[300px]">
        <Deva className="text-[34px] text-paon">अनिद्रा</Deva>
        <i className="text-doux">anidrā, l'insomnie</i>
        <p className="m-0 text-lg">Quand le sommeil ne vient pas, Charaka propose de quoi l'appeler.</p>
      </div>
      <div className="flex flex-col gap-2">
        <ListeButa titre="Pour retrouver le sommeil" items={RAMENER_LE_SOMMEIL} couleur="#6E7F1A" classeTitre="text-citron-fonce" />
        <span className="text-[15px] text-doux">
          D'après Charaka.
          <Renvoi n={4} />
        </span>
      </div>
    </section>

    <Sources refs={REFS_SOMMEIL} />
    <PiedSuite />
  </PageComprendre>
);

export default Sommeil;
