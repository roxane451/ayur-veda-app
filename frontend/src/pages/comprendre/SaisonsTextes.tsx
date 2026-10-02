import { Link } from "react-router-dom";
import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { CONSEILS_SAISONS, REFS_SAISONS, SIX_SAISONS } from "@/data/sante";

const C = 260;
const R1 = 230;
const R0 = 120;
const point = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)].map((v) => v.toFixed(1));
};

/* Les six saisons en roue : à gauche la moitié où la lune donne, à droite celle où le soleil prend */
const Roue = () => (
  <svg viewBox="0 0 520 520" className="mx-auto h-auto w-full max-w-[460px]" role="img" aria-label="Les six saisons des textes, en deux moitiés de l'année.">
    {SIX_SAISONS.map((s, i) => {
      const a0 = -90 + i * 60;
      const a1 = a0 + 60;
      const [x0, y0] = point(R1, a0);
      const [x1, y1] = point(R1, a1);
      const [x2, y2] = point(R0, a1);
      const [x3, y3] = point(R0, a0);
      const [tx, ty] = point((R0 + R1) / 2, a0 + 30);
      const c = s.couleur === "#5B2A4E" ? "#F0F4E0" : "#13201E";
      return (
        <g key={s.sanskrit}>
          <path d={`M${x0} ${y0} A${R1} ${R1} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${R0} ${R0} 0 0 0 ${x3} ${y3} Z`} fill={s.couleur} stroke="#13201E" strokeWidth="2" />
          <text x={tx} y={Number(ty) - 4} textAnchor="middle" className="font-devanagari" fontSize="24" fill={c}>
            {s.deva}
          </text>
          <text x={tx} y={Number(ty) + 20} textAnchor="middle" fontStyle="italic" fontSize="15" fill={c}>
            {s.sanskrit}
          </text>
        </g>
      );
    })}
    <circle cx={C} cy={C} r="112" fill="#F0F4E0" stroke="#13201E" strokeWidth="2" />
    <path d="M260 148 V372" stroke="#13201E" strokeWidth="1.5" strokeDasharray="5 6" />
    {[
      [206, "VISARGA", "la lune donne"],
      [314, "ĀDĀNA", "le soleil prend"],
    ].map(([x, t, s]) => (
      <g key={t} textAnchor="middle">
        <text x={x} y="250" className="font-display" fontSize="15" fill="#13201E">
          {t}
        </text>
        <text x={x} y="272" fontStyle="italic" fontSize="14" fill="#4C5A57">
          {s}
        </text>
      </g>
    ))}
  </svg>
);

const SaisonsTextes = () => (
  <PageComprendre>
    <Frontispice deva="ऋतुचर्या" translit="ṛtucaryā, la conduite selon les saisons" titre="Les saisons">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Les textes décrivent six saisons, celles de l'Inde du Nord. Ils en tirent une règle simple, suivre la saison et changer peu à peu.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />
    <DApres>Charaka, Sūtrasthāna 6 ; Vāgbhaṭa, Sūtrasthāna 3</DApres>

    <section aria-labelledby="st-six" className="mx-auto grid max-w-[1100px] items-center gap-10 px-4 pb-20 pt-14 sm:px-10 md:pt-16 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-16">
      <Roue />
      <div className="flex flex-col gap-3.5">
        <h2 id="st-six" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Six saisons
        </h2>
        <p className="m-0 text-lg text-doux">
          L'année se partage en deux moitiés. Quand le soleil monte vers le nord, il prend la force des êtres. Quand il redescend, la lune la leur rend.
          <Renvoi n={1} />
        </p>
        <ul className="m-0 mt-1.5 list-none p-0">
          {SIX_SAISONS.map((s) => (
            <li key={s.sanskrit} className="grid grid-cols-[18px_minmax(0,1fr)] items-baseline gap-x-3 border-t border-encre/20 py-2.5 sm:grid-cols-[18px_minmax(0,1fr)_auto]">
              <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full shadow-[0_0_0_1.5px_hsl(var(--encre))]" style={{ background: s.couleur }} />
              <span className="flex flex-col">
                <span className="font-display text-[1.2rem]">{s.nom}</span>
                <i className="text-[15px] text-doux">
                  {s.sanskrit}, {s.periode}
                </i>
              </span>
              <span className="col-start-2 text-[15.5px] text-aubergine sm:col-start-3 sm:text-right">{s.doshas}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section aria-labelledby="st-conseils" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto grid max-w-[1100px] items-start gap-10 px-4 py-16 sm:px-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16 md:py-[72px]">
        <div className="flex flex-col gap-4">
          <h2 id="st-conseils" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            Ce que conseillent les textes
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Charaka consacre un chapitre entier à la conduite de chaque saison. En voici l'essentiel.
            <Renvoi n={2} clair />
          </p>
        </div>
        <ul className="m-0 list-none p-0">
          {CONSEILS_SAISONS.map(([t, x]) => (
            <li key={t} className="flex flex-col gap-1.5 border-t border-pistache/30 py-4">
              <h3 className="m-0 text-[1.25rem]">{t}</h3>
              <span className="text-[#D3E3DE]">{x}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section aria-labelledby="st-peu" className="mx-auto grid max-w-[1100px] items-start gap-10 px-4 pb-10 pt-20 sm:px-10 md:grid-cols-2 md:gap-16">
      <div className="flex flex-col gap-3.5">
        <h2 id="st-peu" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Changer peu à peu
        </h2>
        <p className="m-0 text-lg text-doux">
          Entre deux saisons, les textes conseillent deux semaines de transition, la dernière de l'une et la première de l'autre. On quitte les habitudes de la saison qui finit petit à petit, en prenant
          peu à peu celles de la suivante.
          <Renvoi n={3} />
        </p>
      </div>
      <div className="flex min-h-[280px] flex-col items-center justify-end gap-3 rounded-b-[14px] rounded-t-full bg-surface px-7 pb-8 text-center shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:min-h-[300px]">
        <h3 className="m-0 text-2xl">Et chez nous ?</h3>
        <p className="m-0 text-lg">Nos quatre saisons ne suivent pas celles de l'Inde. La rubrique Au quotidien les adapte, saison par saison.</p>
        <Link to="/au-quotidien" className="font-bold text-aubergine">
          Vivre avec les saisons
        </Link>
      </div>
    </section>

    <Sources refs={REFS_SAISONS} />
    <PiedSuite />
  </PageComprendre>
);

export default SaisonsTextes;
