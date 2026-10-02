import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { fr } from "@/components/quiz/conseils";
import { ETAPES, EXEMPLE_VATA } from "@/data/agesDesequilibre";

/* Les arches montent et s'assombrissent avec les étapes */
const ARCHES = [
  { fond: "bg-carte text-encre", h: 140 },
  { fond: "bg-surface text-encre", h: 175 },
  { fond: "bg-citron text-encre", h: 210 },
  { fond: "bg-[#8DB9B0] text-encre", h: 245 },
  { fond: "bg-aubergine text-pistache", h: 280 },
  { fond: "bg-encre text-pistache", h: 315 },
];

const GROUPES = [
  {
    titre: "On peut agir soi-même",
    texte: "Les gestes de ce site suffisent, côté assiette, rythme et saison.",
    trait: "border-citron",
    couleur: "text-citron-fonce",
    etapes: [0, 1],
  },
  {
    titre: "Il faut consulter",
    texte: "Un médecin, et une praticienne pour l'accompagnement.",
    trait: "border-aubergine",
    couleur: "text-aubergine",
    etapes: [2, 3, 4, 5],
  },
];

const Desequilibre = () => (
  <PageComprendre>
    <Frontispice deva="षट् क्रियाकाल" translit="ṣaṭ kriyākāla, les six moments pour agir" titre="Comment naît un déséquilibre">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Pour l'Ayurveda, une maladie née des doshas ne surgit pas d'un coup. Elle passe par six étapes, et plus on agit tôt, plus il est simple de revenir à
        l'équilibre.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />

    <section aria-labelledby="de-etapes" className="mx-auto flex max-w-[1180px] flex-col gap-9 px-4 pb-20 pt-16 sm:px-10 md:pt-20">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="de-etapes" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Les six étapes
        </h2>
        <p className="m-0 text-lg text-doux">
          D'après Sushruta, <i>Sūtrasthāna</i>, chapitre 21.
        </p>
      </div>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-[18px]">
        {GROUPES.map((g) => (
          <div key={g.titre} className="flex flex-col gap-6">
            <div className={`flex flex-col border-t-4 pt-2 ${g.trait}`}>
              <span className={`font-display text-[17px] ${g.couleur}`}>{g.titre}</span>
              <span className="text-[15px] text-doux">{g.texte}</span>
            </div>
            <ol start={g.etapes[0] + 1} className={`m-0 grid list-none items-start gap-3 p-0 sm:gap-[18px] ${g.etapes.length > 2 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
              {g.etapes.map((i) => {
                const e = ETAPES[i];
                const a = ARCHES[i];
                return (
                  <li key={e.nom} className="flex flex-col gap-2.5">
                    <div className="flex h-[200px] items-end sm:h-[320px]">
                      <div
                        className={`flex w-full flex-col items-center justify-end gap-1 rounded-b-md rounded-t-full px-2 pb-4 text-center shadow-[inset_0_0_0_2px_hsl(var(--encre))] ${a.fond}`}
                        style={{ height: `clamp(${Math.round(a.h * 0.6)}px, ${(a.h / 320) * 100}%, ${a.h}px)` }}
                      >
                        <span className="font-body text-[1.8rem] italic leading-none sm:text-[2.1rem]">{i + 1}</span>
                        <Deva className="text-[15px] sm:text-[19px]">{e.deva}</Deva>
                      </div>
                    </div>
                    <h3 className="m-0 hyphens-auto text-[12.5px] leading-tight [overflow-wrap:anywhere] sm:text-lg">{e.nom}</h3>
                    <span className="-mt-1.5 text-[13px] italic text-doux sm:text-sm">{e.sanskrit}</span>
                    <span className="text-[14px] leading-snug sm:text-[15.5px]">{fr(e.texte)}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </section>

    <section aria-labelledby="de-exemple" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto grid max-w-[1100px] items-start gap-10 px-4 py-16 sm:px-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14 md:py-[72px]">
        <div className="flex flex-col gap-3.5">
          <h2 id="de-exemple" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            Un exemple avec Vata
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Les mêmes six étapes, transposées à nos saisons, où l'automne joue le rôle de la saison des pluies indienne, et suivies sur plusieurs saisons. À chacune, un repas chaud, un massage à l'huile ou un coucher plus tôt aurait pu arrêter la
            suite.
          </p>
        </div>
        <ol className="m-0 list-none p-0">
          {EXEMPLE_VATA.map((t, i) => (
            <li key={t} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-t border-pistache/30 py-3">
              <span aria-hidden="true" className="font-body text-[1.6rem] italic leading-none text-citron">
                {i + 1}
              </span>
              <span className="text-[#D3E3DE]">{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <PiedSuite />
  </PageComprendre>
);

export default Desequilibre;
