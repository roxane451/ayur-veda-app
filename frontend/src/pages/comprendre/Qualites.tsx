import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Chai, Vent } from "@/components/brand/Illustrations";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { COULEUR_DOSHA } from "@/components/quiz/conseils";
import { PAIRES_QUALITES, REFS_QUALITES } from "@/data/corpsEsprit";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { DOSHAS, NOM_DOSHA, type DoshaKey } from "@/lib/doshaLogic";

const Points = ({ doshas, align }: { doshas: DoshaKey[]; align: "debut" | "fin" }) => (
  <span className={`flex gap-1 ${align === "fin" ? "justify-end" : ""}`}>
    {doshas.map((d) => (
      <span key={d} className="h-3 w-3 rounded-full shadow-[0_0_0_1.5px_hsl(var(--encre))]" style={{ background: COULEUR_DOSHA[d] }}>
        <span className="sr-only">{NOM_DOSHA[d]}</span>
      </span>
    ))}
  </span>
);

const Balance = () => (
  <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="h-5 w-full" aria-hidden="true">
    <line x1="6" y1="10" x2="294" y2="10" stroke="#13201E" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    <circle cx="6" cy="10" r="5" fill="#13201E" />
    <circle cx="294" cy="10" r="5" fill="none" stroke="#13201E" strokeWidth="1.5" />
    <circle cx="150" cy="10" r="3" fill="#5B2A4E" />
  </svg>
);

const Qualites = () => (
  <PageComprendre>
    <Frontispice deva="गुण" translit="guṇa, les vingt qualités" titre="Les vingt qualités">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Chaque substance, aliment, plante ou climat, peut se décrire par vingt qualités, rangées en dix paires de contraires. Elles disent comment une chose agit sur nous.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
      <DApres>Charaka, Sūtrasthāna 1 et 26</DApres>
    </Frontispice>
    <Bande />

    <section aria-labelledby="q-paires" className="mx-auto flex max-w-[1100px] flex-col gap-7 px-4 pb-20 pt-16 sm:px-10 md:pt-20">
      <div className="grid items-end gap-5 md:grid-cols-2 md:gap-14">
        <h2 id="q-paires" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Les dix paires
        </h2>
        <p className="m-0 text-lg text-doux">
          Chaque dosha se reconnaît à ses qualités. Vata est léger, froid, sec et mobile, Pitta chaud, vif et fluide, Kapha lourd, stable et onctueux.
          <Renvoi n={1} />
        </p>
      </div>
      <p className="m-0 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-doux">
        {DOSHAS.map((d) => (
          <span key={d} className="inline-flex items-center gap-2">
            <Points doshas={[d]} align="debut" />
            {NOM_DOSHA[d]}
          </span>
        ))}
        <span>Le point indique le côté où se range chaque dosha. Les paires sans point ne sont rattachées à aucun dosha dans les textes. Trois points viennent de Vāgbhaṭa plutôt que de Charaka.<Renvoi n={2} /></span>
      </p>
      <ul className="m-0 list-none border-b border-encre/20 p-0">
        {PAIRES_QUALITES.map(({ gauche, droite }) => (
          <li
            key={gauche.nom}
            className="grid grid-cols-[minmax(0,1fr)_minmax(40px,0.8fr)_minmax(0,1fr)] items-center gap-3 border-t border-encre/20 py-3.5 sm:grid-cols-[48px_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_48px] sm:gap-5"
          >
            <span className="hidden sm:block">
              <Points doshas={gauche.doshas} align="fin" />
            </span>
            <span className="flex flex-col items-end text-right">
              <span className="font-display text-[1.1rem] leading-tight sm:text-2xl">{gauche.nom}</span>
              <span className="text-sm italic text-doux">{gauche.sanskrit}</span>
              <span className="mt-1 sm:hidden">
                <Points doshas={gauche.doshas} align="fin" />
              </span>
            </span>
            <Balance />
            <span className="flex flex-col">
              <span className="font-display text-[1.1rem] leading-tight sm:text-2xl">{droite.nom}</span>
              <span className="text-sm italic text-doux">{droite.sanskrit}</span>
              <span className="mt-1 sm:hidden">
                <Points doshas={droite.doshas} align="debut" />
              </span>
            </span>
            <span className="hidden sm:block">
              <Points doshas={droite.doshas} align="debut" />
            </span>
          </li>
        ))}
      </ul>
    </section>

    <section aria-labelledby="q-regle" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto grid max-w-[1220px] items-center gap-12 px-4 py-16 sm:px-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16 md:py-20">
        <div className="flex flex-col gap-4">
          <Deva className="text-[30px] text-citron">सामान्य विशेष</Deva>
          <h2 id="q-regle" className="m-0 font-body text-[clamp(2rem,4vw,2.75rem)] normal-case leading-[1.15] tracking-normal">
            Le semblable augmente le semblable, le contraire le diminue.
          </h2>
          <p className="m-0 max-w-[46ch] text-lg text-[#D3E3DE]">
            C'est la règle qui guide tous les conseils de l'Ayurveda. Charaka l'énonce dès le premier chapitre de son traité.<Renvoi n={3} /> Ce qui partage les qualités
            d'un dosha le fait monter, ce qui s'y oppose le ramène à l'équilibre.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <div className="flex flex-col items-center gap-2.5 rounded-b-[14px] rounded-t-full bg-pistache px-4 pb-6 pt-10 text-center text-encre sm:px-6">
            <Vent size={110} stroke="#13201E" decorative className="h-auto w-20 sm:w-[110px]" />
            <span className="font-display text-lg sm:text-xl">Vata monte</span>
            <span className="text-[15px] text-doux sm:text-base">Froid et sec, il monte avec le vent d'hiver et les biscuits secs.</span>
          </div>
          <div className="flex flex-col items-center gap-2.5 rounded-b-[14px] rounded-t-full bg-citron px-4 pb-6 pt-10 text-center text-encre sm:px-6">
            <Chai size={110} decorative className="h-auto w-20 sm:w-[110px]" />
            <span className="font-display text-lg sm:text-xl">Vata s'apaise</span>
            <span className="text-[15px] text-[#3B4410] sm:text-base">Une soupe chaude et un filet d'huile lui apportent l'inverse.</span>
          </div>
        </div>
      </div>
    </section>

    <Sources refs={REFS_QUALITES} />
    <PiedSuite />
  </PageComprendre>
);

export default Qualites;
