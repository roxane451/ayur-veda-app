import { Bande, Motif } from "@/components/brand/BrandDefs";
import type { ReactNode } from "react";
import { Deva, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { Renvoi, Sources } from "@/components/comprendre/Sources";
import { FilCuisine, PageCuisine } from "@/components/cuisine/Commun";
import { ASSOCIATIONS, REFS_BIEN_MANGER, REGLES_REPAS } from "@/data/bienManger";

/* L'estomac en trois tiers : nourriture, liquides, vide */
const C = 170;
const R = 150;
const secteur = (a0: number, a1: number) => {
  const p = (a: number) => [C + R * Math.sin((a * Math.PI) / 180), C - R * Math.cos((a * Math.PI) / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${C} ${C} L${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`;
};

const TroisTiers = () => (
  <svg viewBox="0 0 340 340" className="h-auto w-full max-w-[340px] overflow-visible" role="img" aria-label="Un tiers solide, un tiers liquide, un tiers vide.">
    <g>
      <path d={secteur(0, 120)} fill="#D2A12A" stroke="#13201E" strokeWidth="2" />
      <path d={secteur(120, 240)} fill="#8DB9B0" stroke="#13201E" strokeWidth="2" />
      <path d={secteur(240, 360)} fill="#FBFCF4" stroke="#13201E" strokeWidth="2" strokeDasharray="6 6" />
    </g>
    <g className="font-display" fontSize="18" textAnchor="middle">
      <text x="250" y="140" fill="#13201E">
        SOLIDE
      </text>
      <text x="170" y="285" fill="#13201E">
        LIQUIDE
      </text>
      <text x="92" y="140" fill="#4C5A57">
        VIDE
      </text>
    </g>
  </svg>
);

const Cadre = ({ comprendre, children }: { comprendre: boolean; children: ReactNode }) =>
  comprendre ? <PageComprendre>{children}</PageComprendre> : <PageCuisine>{children}</PageCuisine>;

/** La page vit dans La cuisine, et dans Comprendre sous le titre « Les règles du repas ». */
const BienManger = ({ rubrique = "cuisine" }: { rubrique?: "cuisine" | "comprendre" }) => {
  const comprendre = rubrique === "comprendre";
  return (
  <Cadre comprendre={comprendre}>
    <section className="mx-auto grid max-w-[1220px] items-center gap-10 px-4 pb-14 pt-6 sm:px-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-14">
      <div className="flex flex-col gap-4">
        {!comprendre && <FilCuisine page="Bien manger" />}
        <p className="m-0 flex flex-wrap items-baseline gap-x-3.5">
          <Deva className="text-[clamp(2rem,4vw,2.5rem)] text-aubergine">आहार विधि</Deva>
          <span className="italic text-doux">āhāra vidhi</span>
        </p>
        <h1 className="m-0 text-[clamp(2.6rem,6.4vw,4.75rem)] leading-[0.95]">{comprendre ? "Les règles du repas" : "Bien manger"}</h1>
        <p className="m-0 max-w-[40ch] text-xl text-doux">
          Pour l'Ayurveda, la façon de manger compte autant que ce qu'on mange. Le traité de Charaka, rédigé il y a près de deux mille ans, en fixe les
          règles, et elles tiennent toujours.
        </p>
      </div>
      <figure className="m-0 flex flex-col items-center gap-3.5">
        <TroisTiers />
        <figcaption className="max-w-[34ch] text-center">
          Un tiers de l'estomac pour la nourriture, un tiers pour les liquides, et le dernier tiers laissé libre pour que Vata, Pitta et Kapha puissent agir.
          <Renvoi n={2} />
        </figcaption>
      </figure>
    </section>
    <Bande />

    <section aria-labelledby="bm-regles" className="mx-auto flex max-w-[1220px] flex-col gap-7 px-4 pb-20 pt-16 sm:px-10 md:pt-20">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="bm-regles" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Les dix règles du repas
        </h2>
        <p className="m-0 text-lg text-doux">
          D'après Charaka, <i>Vimānasthāna</i>, chapitre 1.
          <Renvoi n={1} />
        </p>
      </div>
      <ol className="m-0 grid list-none p-0 md:grid-cols-2 md:gap-x-16">
        {REGLES_REPAS.map((r, i) => (
          <li key={r.titre} className="grid grid-cols-[48px_minmax(0,1fr)] gap-4 border-t border-encre/20 py-[18px] sm:grid-cols-[56px_minmax(0,1fr)]">
            <span aria-hidden="true" className="font-body text-[2.5rem] italic leading-[0.9] text-aubergine">
              {i + 1}
            </span>
            <span className="flex flex-col gap-0.5">
              <h3 className="m-0 text-[1.25rem] leading-tight">{r.titre}</h3>
              <span className="text-[15px] italic text-doux">{r.sanskrit}</span>
              <span>{r.texte}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>

    <section aria-labelledby="bm-associations" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto flex max-w-[1220px] flex-col gap-8 px-4 py-16 sm:px-10 md:py-20">
        <div className="grid items-end gap-5 md:grid-cols-2 md:gap-14">
          <div className="flex flex-col gap-2.5">
            <Deva className="text-[30px] text-citron">विरुद्ध आहार</Deva>
            <h2 id="bm-associations" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
              Les associations à éviter
            </h2>
          </div>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Certains aliments, bons séparément, deviennent indigestes ensemble. Charaka en consacre un long passage au <i>Sūtrasthāna</i>, chapitre 26.<Renvoi n={3} clair /> La règle sur le yaourt vient du chapitre 7,<Renvoi n={4} clair /> celle du miel chauffé du chapitre 27.
            <Renvoi n={5} clair />
          </p>
        </div>
        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {ASSOCIATIONS.map((x) => (
            <li key={x.a + x.b} className="flex flex-col gap-3.5 rounded-buta bg-pistache px-6 py-6 text-encre">
              <p className="m-0 flex flex-wrap items-center gap-2.5">
                <span className="font-display text-[1.3rem]">{x.a}</span>
                <svg width="30" height="30" viewBox="0 0 34 34" role="img" aria-label="ne va pas avec">
                  <circle cx="17" cy="17" r="15" fill="#5B2A4E" />
                  <path d="M11 11 L23 23 M23 11 L11 23" stroke="#F0F4E0" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
                <span className="font-display text-[1.3rem]">{x.b}</span>
              </p>
              <p className="m-0 text-doux">{x.texte}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <Sources refs={REFS_BIEN_MANGER} />
    {comprendre ? <PiedSuite /> : <div className="h-10" />}
  </Cadre>
  );
};

export default BienManger;
