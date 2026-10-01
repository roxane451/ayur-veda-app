import { Link } from "react-router-dom";
import { Bande } from "@/components/brand/BrandDefs";
import { Deva, EffetDosha, PageComprendre, PiedSuite, TitrePage } from "@/components/comprendre/Commun";
import { lienSouligne } from "@/components/comprendre/sousPages";
import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import { SAVEURS, SAVEURS_PAR_DOSHA } from "@/data/comprendre";
import { DOSHAS, NOM_DOSHA } from "@/lib/doshaLogic";

const point = (a: number, r: number) => [200 + r * Math.cos((a * Math.PI) / 180), 200 + r * Math.sin((a * Math.PI) / 180)];

/** L'anneau des six saveurs : une assiette complète. */
const Anneau = () => (
  <svg viewBox="-24 -24 448 448" width="100%" className="max-w-[440px]" role="img" aria-label="Les six saveurs réunies dans un même repas">
    {SAVEURS.map((s, i) => {
      const a0 = -90 + i * 60;
      const a1 = a0 + 60;
      const [x0, y0] = point(a0 + 1.2, 170);
      const [x1, y1] = point(a1 - 1.2, 170);
      const [x2, y2] = point(a1 - 1.2, 96);
      const [x3, y3] = point(a0 + 1.2, 96);
      const [lx, ly] = point(a0 + 30, 196);
      return (
        <g key={s.nom}>
          <path
            d={`M${x0} ${y0} A170 170 0 0 1 ${x1} ${y1} L${x2} ${y2} A96 96 0 0 0 ${x3} ${y3} Z`}
            fill={s.couleur}
          />
          <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontFamily="Castoro, serif" fontSize="16" fill="#13201E">
            {s.nom}
          </text>
        </g>
      );
    })}
    <circle cx="200" cy="200" r="80" fill="#FBFCF4" stroke="#13201E" strokeWidth="1.5" />
    <text x="200" y="192" textAnchor="middle" fontFamily="Castoro, serif" fontSize="20" fill="#13201E">
      Un repas
    </text>
    <text x="200" y="218" textAnchor="middle" fontFamily="Castoro, serif" fontStyle="italic" fontSize="20" fill="#5B2A4E">
      les six saveurs
    </text>
  </svg>
);

const Saveurs = () => (
  <PageComprendre>
    <div className="mx-auto grid max-w-[1220px] items-center gap-6 px-4 sm:px-10 md:grid-cols-2">
      <TitrePage
        fil="Les six saveurs"
        titre="Les six saveurs"
        deva="षड्रस"
        translit="ṣaḍ rasa"
        intro="En Ayurveda, chaque saveur est faite de deux éléments. Elle fait donc monter ou descendre certains doshas. Savoir les reconnaître, c'est savoir composer une assiette qui vous équilibre."
      />
      <div className="flex justify-center pb-8 md:py-6">
        <Anneau />
      </div>
    </div>
    <Bande />

    <section aria-label="Les six saveurs" className="mx-auto flex max-w-[1220px] flex-col gap-6 px-4 py-16 sm:px-10 md:py-[72px]">
      <p className="m-0 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-doux">
        <span className="inline-flex items-center gap-2">
          <EffetDosha nom="Vata" sens="-" couleur={COULEUR_DOSHA.vata} /> apaise ce dosha
        </span>
        <span className="inline-flex items-center gap-2">
          <EffetDosha nom="Vata" sens="+" couleur={COULEUR_DOSHA.vata} /> le fait monter
        </span>
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SAVEURS.map((s) => (
          <article key={s.nom} className="flex flex-col gap-2.5 rounded-2xl bg-carte p-6 shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
            <span className="flex items-center justify-between">
              <span aria-hidden="true" className="h-[18px] w-[18px] rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,.15)]" style={{ background: s.couleur }} />
              <Deva className="text-[26px] text-aubergine">{s.deva}</Deva>
            </span>
            <h2 className="m-0 text-[1.9rem] leading-none">{s.nom}</h2>
            <p className="m-0 text-[15px] text-doux">
              <span className="italic">{s.translit}</span> · {s.elements}
            </p>
            <span className="flex flex-wrap gap-1.5">
              {DOSHAS.map((d, i) => (
                <EffetDosha key={d} nom={NOM_DOSHA[d]} sens={s.effets[i]} couleur={COULEUR_DOSHA[d]} />
              ))}
            </span>
            <p className="m-0 text-base">{fr(s.role)}</p>
            <p className="m-0 text-[15px] text-doux">
              <strong className="text-encre">{fr("On la trouve dans :")}</strong> {s.exemples}
            </p>
          </article>
        ))}
      </div>
    </section>

    <section aria-labelledby="s-dosha" className="bg-surface">
      <div className="mx-auto grid max-w-[1220px] gap-12 px-4 py-16 sm:px-10 md:grid-cols-2 md:py-[72px]">
        <div className="flex flex-col gap-3.5">
          <h2 id="s-dosha" className="m-0 text-[clamp(2.2rem,4.4vw,2.75rem)] leading-[1.05]">
            {fr("Quelles saveurs pour mon dosha ?")}
          </h2>
          <p className="m-0 text-doux">
            Un repas complet contient les six saveurs. On met simplement l'accent sur celles qui apaisent son dosha,
            surtout quand il est en excès.
          </p>
          <Link to="/profil" className={`${lienSouligne} self-start`}>
            {fr("Je ne connais pas mon dosha : faire le quiz")}
          </Link>
        </div>
        <div className="flex flex-col">
          {SAVEURS_PAR_DOSHA.map((p) => (
            <div key={p.dosha} className="flex flex-col gap-1.5 border-t border-dashed border-trait py-5">
              <span className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full" style={{ background: COULEUR_DOSHA[p.dosha] }} />
                <span className="font-display text-[1.6rem]">{NOM_DOSHA[p.dosha]}</span>
              </span>
              <span className="text-xl">{p.saveurs}</span>
              <span className="text-doux">{p.texte}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
    <div className="h-16" />
    <PiedSuite precedent="Les doshas" suivant="Agni, le feu digestif" />
  </PageComprendre>
);

export default Saveurs;
