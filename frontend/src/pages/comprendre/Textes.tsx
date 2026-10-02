import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { LIVRES_TRAITES, TEXTES } from "@/data/sources";

const FONDS = ["bg-paon text-pistache", "bg-aubergine text-pistache", "bg-citron text-encre", "bg-carte text-encre"];

const PARTS = [
  { mot: "Charaka,", sens: "le texte" },
  { mot: "Sū", sens: "le livre" },
  { mot: "26.", sens: "le chapitre" },
  { mot: "84", sens: "le verset" },
];

const Textes = () => (
  <PageComprendre>
    <Frontispice deva="ग्रन्थ" translit="grantha, les textes" titre="Les textes">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Ce que dit ce site vient de traités écrits pour les plus anciens il y a deux mille ans. Voici lesquels, et comment lire nos références.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />

    <section aria-labelledby="tx-traites" className="mx-auto flex max-w-[1220px] flex-col gap-9 px-4 pb-20 pt-16 sm:px-10 md:pt-20">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="tx-traites" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Quatre traités
        </h2>
        <p className="m-0 text-lg text-doux">Du plus ancien au plus récent. Quand ils divergent, nous suivons le plus ancien et nous le signalons.</p>
      </div>
      <ol className="m-0 grid list-none gap-10 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {TEXTES.map((t, i) => (
          <li key={t.id} className="flex flex-col gap-3">
            <div
              className={`flex h-[200px] flex-col items-center justify-center gap-1.5 rounded-b-[10px] rounded-t-full px-4 pt-8 text-center shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:h-[230px] ${FONDS[i]}`}
            >
              <Deva className="text-[28px] text-inherit">{t.deva}</Deva>
              <h3 className="m-0 text-[1.2rem]">{t.nom}</h3>
            </div>
            <span className="italic text-aubergine">{t.attribution}</span>
            <span className="text-[15px] text-doux">{t.date}</span>
            <p className="m-0">{t.texte}</p>
          </li>
        ))}
      </ol>
      <p className="m-0 max-w-[70ch] border-l-4 border-citron bg-surface px-5 py-4">
        L'ordre des livres de Comprendre est le nôtre. Il s'inspire des regroupements de Charaka et de Vāgbhaṭa, mais le contenu de chaque chapitre
        vient des textes, au passage indiqué.
      </p>
    </section>

    <section id="lire" aria-labelledby="tx-lire" className="relative scroll-mt-20 overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto grid max-w-[1100px] items-start gap-12 px-4 py-16 sm:px-10 md:grid-cols-2 md:gap-16 md:py-[72px]">
        <div className="flex flex-col gap-6">
          <h2 id="tx-lire" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            Lire une référence
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Chaque traité est divisé en livres, eux-mêmes divisés en chapitres et en versets. La Charaka Saṃhitā en compte huit. Nos numéros suivent
            les éditions courantes. Ils peuvent varier d'un verset d'une édition à l'autre.
          </p>
          <p aria-label="Charaka, Sūtrasthāna, chapitre 26, verset 84" className="m-0 flex flex-wrap items-end gap-x-3.5 gap-y-4">
            {PARTS.map((p) => (
              <span key={p.sens} aria-hidden="true" className="flex flex-col gap-2.5">
                <span className="font-display text-[2.4rem] leading-none">{p.mot}</span>
                <span className="border-t-2 border-citron pt-1.5 text-[15px] text-[#D3E3DE]">{p.sens}</span>
              </span>
            ))}
          </p>
        </div>
        <dl className="m-0 text-[17px]">
          {LIVRES_TRAITES.map((l) => (
            <div key={l.abr} className="grid grid-cols-[48px_minmax(0,1fr)] gap-2.5 border-t border-pistache/30 py-2.5">
              <dt className="font-display text-lg text-citron">{l.abr}</dt>
              <dd className="m-0">
                <i>{l.nom}</i>, <span className="text-[#D3E3DE]">{l.fr}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    <div className="h-16" />
    <PiedSuite />
  </PageComprendre>
);

export default Textes;
