import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Chai, Vent } from "@/components/brand/Illustrations";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import { PAIRES_QUALITES, VIPAKA } from "@/data/corpsEsprit";
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
              nourrit {NOM_DOSHA[v.nourrit]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const Qualites = () => (
  <PageComprendre>
    <Frontispice deva="गुण" translit="guṇa, les vingt qualités" titre="Les qualités">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Tout ce qui existe peut se décrire par vingt qualités, rangées en dix paires de contraires. Elles disent comment une chose agit sur nous.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />

    <section aria-labelledby="q-paires" className="mx-auto flex max-w-[1100px] flex-col gap-7 px-4 pb-20 pt-16 sm:px-10 md:pt-20">
      <div className="grid items-end gap-5 md:grid-cols-2 md:gap-14">
        <h2 id="q-paires" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Les dix paires
        </h2>
        <p className="m-0 text-lg text-doux">
          Chaque dosha se reconnaît à ses qualités. Vata est léger, froid, sec et mobile, Pitta chaud, vif et fluide, Kapha lourd, stable et onctueux.
        </p>
      </div>
      <p className="m-0 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-doux">
        {DOSHAS.map((d) => (
          <span key={d} className="inline-flex items-center gap-2">
            <Points doshas={[d]} align="debut" />
            {NOM_DOSHA[d]}
          </span>
        ))}
        <span>Le point indique le côté où se range chaque dosha.</span>
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
            C'est la règle qui guide tous les conseils de l'Ayurveda. Charaka l'énonce dès le premier chapitre de son traité. Ce qui partage les qualités
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

    <section className="mx-auto grid max-w-[1220px] items-start gap-12 px-4 py-16 sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-16 md:py-[88px]">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[clamp(2rem,4vw,2.75rem)] leading-none">Chaud ou froid</h2>
          <p className="m-0 flex items-baseline gap-2.5">
            <Deva className="text-[26px] text-aubergine">वीर्य</Deva>
            <span className="italic text-doux">vīrya</span>
          </p>
          <p className="m-0 text-lg">
            {fr("Un aliment ou une plante réchauffe le corps ou le rafraîchit. Le gingembre chauffe, la coriandre rafraîchit. Le chaud apaise Vata et Kapha, le froid apaise Pitta.")}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="m-0 text-[clamp(2rem,4vw,2.75rem)] leading-none">Après la digestion</h2>
          <p className="m-0 flex items-baseline gap-2.5">
            <Deva className="text-[26px] text-aubergine">विपाक</Deva>
            <span className="italic text-doux">vipāka</span>
          </p>
          <p className="m-0 text-lg">
            Une fois digérées, les six saveurs se ramènent à trois effets, qui agissent longtemps après le repas. Le schéma montre lesquels.
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
              <span className="font-display text-lg">{v.nom}, nourrit {NOM_DOSHA[v.nourrit]}</span>
              <span className="text-doux">Vient {v.saveurs.length > 1 ? "des saveurs" : "de la saveur"} {v.saveurs.join(", ").toLowerCase()}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>

    <PiedSuite precedent="Les doshas" suivant="Les six saveurs" />
  </PageComprendre>
);

export default Qualites;
