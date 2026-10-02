import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import { EXEMPLES_CUISINE, QUI_L_EMPORTE, REFS_ACTION } from "@/data/action";
import { VIPAKA } from "@/data/corpsEsprit";
import { NOM_DOSHA } from "@/lib/doshaLogic";

/* Schéma du vipāka : les six saveurs reliées à leurs trois effets */
const Vipaka = () => {
  const saveurs = VIPAKA.flatMap((v, j) => v.saveurs.map((s) => ({ s, j })));
  return (
    <svg viewBox="0 0 600 400" className="h-auto w-full" role="img" aria-label="Le doux et le salé donnent un vipāka doux, l'acide un vipāka acide, le piquant, l'amer et l'astringent un vipāka piquant.">
      {saveurs.map(({ s, j }, i) => {
        const y = 30 + i * 66;
        const ty = 66 + j * 134;
        return (
          <g key={s}>
            <path d={`M150 ${y} C 250 ${y}, 270 ${ty}, 360 ${ty}`} fill="none" stroke="#13201E" strokeWidth="1.5" />
            <rect x="0" y={y - 20} width="150" height="40" rx="20" fill="#FBFCF4" stroke="#13201E" strokeWidth="1.5" />
            <text x="75" y={y + 6} textAnchor="middle" fontSize="18" fill="#13201E">
              {s}
            </text>
          </g>
        );
      })}
      {VIPAKA.map((v, j) => {
        const ty = 66 + j * 134;
        const clair = v.nourrit === "vata";
        return (
          <g key={v.nom}>
            <circle cx="400" cy={ty} r="44" fill={COULEUR_DOSHA[v.nourrit]} stroke="#13201E" strokeWidth="2" />
            <text x="400" y={ty + 6} textAnchor="middle" fontSize="18" fontStyle="italic" fill={clair ? "#13201E" : "#F3F5E6"}>
              {v.sanskrit}
            </text>
            <text x="460" y={ty - 4} fontSize="20" fill="#13201E" className="font-display">
              {v.nom.toUpperCase()}
            </text>
            <text x="460" y={ty + 20} fontSize="15" fill="#4C5A57">
              augmente {NOM_DOSHA[v.nourrit]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const Plante = ({ deva, nom, fond }: { deva: string; nom: string; fond: string }) => (
  <div
    className={`flex h-[200px] flex-col items-center justify-end gap-1 rounded-b-[10px] rounded-t-full px-3 pb-5 text-center text-encre shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:h-[250px] ${fond}`}
  >
    <Deva className="text-[26px] text-paon sm:text-[28px]">{deva}</Deva>
    <span className="font-display text-xl">{nom}</span>
    <span className="text-[15px]">Piquant, chauffant</span>
  </div>
);

const Action = () => (
  <PageComprendre>
    <Frontispice deva="द्रव्यगुण" translit="dravyaguṇa, les propriétés des substances" titre="L'action des aliments">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Un aliment n'agit pas seulement par sa saveur. Les textes lui reconnaissent quatre façons d'agir, et disent laquelle l'emporte.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />
    <DApres>Charaka, Sūtrasthāna 26 ; Suśruta, Sūtrasthāna 40</DApres>

    <section aria-labelledby="ac-emporte" className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 pb-16 pt-14 sm:px-10 md:pt-16">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="ac-emporte" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Qui l'emporte
        </h2>
        <p className="m-0 text-lg text-doux">
          Quand ces quatre forces tirent en sens contraire avec la même puissance, la plus haute décide. Sinon, c'est la plus forte qui l'emporte.
          <Renvoi n={1} />
        </p>
      </div>
      <ol className="m-0 grid list-none grid-cols-2 items-end gap-x-4 gap-y-8 p-0 lg:grid-cols-4 lg:gap-5">
        {QUI_L_EMPORTE.map((m, i) => (
          <li key={m.sanskrit} className="flex h-full flex-col gap-2">
            <div className="flex h-[270px] items-end">
              <div
                className={`flex w-full flex-col items-center justify-end rounded-b-lg rounded-t-full pb-4 shadow-[inset_0_0_0_2px_hsl(var(--encre))] ${m.fond}`}
                style={{ height: m.h }}
              >
                <span className="font-body text-[1.9rem] italic leading-none">{i + 1}</span>
                <Deva className="text-[22px] text-inherit">{m.deva}</Deva>
              </div>
            </div>
            <h3 className="m-0 text-[1.25rem] leading-tight">{m.nom}</h3>
            <i className="-mt-1 text-doux">{m.sanskrit}</i>
            <p className="m-0">{m.texte}</p>
          </li>
        ))}
      </ol>
    </section>

    <section className="mx-auto grid max-w-[1220px] items-start gap-12 px-4 pb-20 pt-4 sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-16">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[clamp(2rem,4vw,2.75rem)] leading-none">Chaud ou froid</h2>
          <p className="m-0 flex items-baseline gap-2.5">
            <Deva className="text-[26px] text-aubergine">वीर्य</Deva>
            <span className="italic text-doux">vīrya</span>
          </p>
          <p className="m-0 text-lg">
            {fr("Un aliment ou une plante réchauffe le corps ou le rafraîchit. Le gingembre chauffe, le lait rafraîchit. Le chaud apaise Vata et Kapha, le froid apaise Pitta.")}
            <Renvoi n={2} />
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[clamp(2rem,4vw,2.75rem)] leading-none">Après la digestion</h2>
          <p className="m-0 flex items-baseline gap-2.5">
            <Deva className="text-[26px] text-aubergine">विपाक</Deva>
            <span className="italic text-doux">vipāka</span>
          </p>
          <p className="m-0 text-lg">
            Une fois digérées, les six saveurs se ramènent à trois effets, qui agissent longtemps après le repas. Le schéma montre lesquels.<Renvoi n={3} /> Suśruta, lui, n'en retient que deux, le doux, qui est lourd, et le piquant, qui est léger.
            <Renvoi n={4} />
          </p>
        </div>
      </div>
      <div className="hidden sm:block md:pt-4">
        <Vipaka />
      </div>
      <ul className="m-0 flex list-none flex-col gap-3 p-0 sm:hidden">
        {VIPAKA.map((v) => (
          <li key={v.nom} className="flex items-center gap-4 border-t border-encre/20 pt-3">
            <span
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-[15px] italic shadow-[0_0_0_2px_hsl(var(--encre))] ${v.nourrit === "vata" ? "text-encre" : "text-pistache"}`}
              style={{ background: COULEUR_DOSHA[v.nourrit] }}
            >
              {v.sanskrit}
            </span>
            <span className="flex flex-col">
              <span className="font-display text-lg">{v.nom}, augmente {NOM_DOSHA[v.nourrit]}</span>
              <span className="text-doux">Vient {v.saveurs.length > 1 ? "des saveurs" : "de la saveur"} {v.saveurs.join(", ").toLowerCase()}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>

    <section aria-labelledby="ac-propre" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto grid max-w-[1100px] items-center gap-10 px-4 py-16 sm:px-10 md:grid-cols-2 md:gap-16 md:py-[72px]">
        <div className="flex flex-col gap-3.5">
          <p className="m-0 flex items-baseline gap-3">
            <Deva className="text-[30px] text-citron">प्रभाव</Deva>
            <i className="text-[#C4DCD5]">prabhāva</i>
          </p>
          <h2 id="ac-propre" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            L'action propre
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Deux plantes peuvent se ressembler en tout et ne pas agir pareil. Charaka appelle cette différence l'action propre. Elle ne s'explique pas,
            elle se constate.
            <Renvoi n={5} clair />
          </p>
        </div>
        <figure className="m-0 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-3 sm:gap-4">
          <Plante deva="चित्रक" nom="Citraka" fond="bg-pistache" />
          <span aria-hidden="true" className="pb-24 font-body text-[2rem] text-citron">
            =
          </span>
          <Plante deva="दन्ती" nom="Dantī" fond="bg-citron" />
          <figcaption className="col-span-3 mt-2 text-center text-lg italic text-[#DCBFD5]">
            Même saveur, même puissance, même effet après digestion. Seule la dantī purge.
          </figcaption>
        </figure>
      </div>
    </section>

    <section aria-labelledby="ac-cuisine" className="mx-auto grid max-w-[1100px] items-start gap-10 px-4 pb-10 pt-20 sm:px-10 md:grid-cols-2 md:gap-16">
      <div className="flex flex-col gap-3.5">
        <h2 id="ac-cuisine" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Dans la cuisine
        </h2>
        <p className="m-0 text-lg text-doux">
          Le miel est doux, et pourtant il est sec et fait baisser Kapha. C'est pour cela qu'on ne juge pas un aliment à son seul goût.
          <Renvoi n={6} />
        </p>
      </div>
      <dl className="m-0">
        {EXEMPLES_CUISINE.map(([a, b]) => (
          <div key={a} className="grid gap-1 border-t border-encre/20 py-3.5 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-4">
            <dt className="font-display text-[1.2rem]">{a}</dt>
            <dd className="m-0">{b}</dd>
          </div>
        ))}
      </dl>
    </section>

    <Sources refs={REFS_ACTION} />
    <PiedSuite />
  </PageComprendre>
);

export default Action;
