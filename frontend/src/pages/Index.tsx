import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sceau from "@/components/brand/Sceau";
import Photo from "@/components/brand/PhotoPlaceholder";
import { Bande, Motif } from "@/components/brand/BrandDefs";
import {
  Cannelle,
  Cardamome,
  Chai,
  Curcuma,
  Flamme,
  Gingembre,
  Goutte,
  Poivre,
  Vent,
} from "@/components/brand/Illustrations";
import { PRAKRITI } from "@/data/quiz";
import { saisonDuMoment } from "@/data/saisons";
import { fr } from "@/components/quiz/conseils";

const lienSouligne =
  "inline-flex items-center gap-2 font-bold underline decoration-citron decoration-[3px] underline-offset-[6px]";

/* ───────────── Hero ───────────── */

const Hero = () => (
  <section className="relative overflow-hidden">
    <Motif id="buta" />
    <div className="relative mx-auto grid max-w-[1220px] items-center gap-12 px-4 pb-16 pt-8 sm:px-10 md:grid-cols-2 md:pb-[88px] md:pt-14">
      <div className="flex flex-col gap-6">
        <p className="m-0 flex items-baseline gap-3.5">
          <span lang="sa" className="font-devanagari text-[30px] text-aubergine">
            आयुर्वेद
          </span>
          <span className="italic text-doux">la science de la vie</span>
        </p>
        <h1 className="m-0 text-[clamp(2.2rem,6.2vw,3.7rem)] leading-[1.02]">
          Retrouver son équilibre, <em>une saison</em> après l'autre.
        </h1>
        <p className="m-0 max-w-[36ch] text-xl text-doux">
          {fr("Vos épices, vos rythmes, votre nature : la sagesse de l'Ayurveda, racontée simplement et à appliquer chez soi.")}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            to="/profil"
            className="inline-flex min-h-14 items-center gap-2.5 rounded-buta bg-paon px-[30px] font-bold text-pistache hover:opacity-90"
          >
            Faire le quiz dosha <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link to="/cuisine" className={lienSouligne}>
            Explorer la cuisine
          </Link>
        </div>
      </div>

      <div className="relative mx-auto h-[420px] w-full max-w-[480px] md:h-[560px]">
        <div className="absolute inset-y-0 left-8 right-4 sm:left-10 sm:right-5">
          <Photo description="épices en vrac sur un étal, lumière chaude du matin" arche />
        </div>
        <div className="absolute right-6 top-[56%] opacity-90 sm:right-9">
          <Sceau size={92} rotate={-10} />
        </div>
        <div className="absolute -left-2 bottom-16 -rotate-[8deg] sm:-left-11 sm:bottom-[90px]">
          <Curcuma size={130} decorative />
        </div>
        <div className="absolute -right-2 top-8 rotate-[10deg] sm:-right-6 sm:top-10">
          <Cardamome size={96} decorative />
        </div>
        <div className="absolute -left-1 top-14 -rotate-[20deg] sm:-left-2.5 sm:top-[70px]">
          <Cannelle size={104} decorative />
        </div>
      </div>
    </div>
  </section>
);

/* ───────────── La saison du moment ───────────── */

const Moment = ({ titre, items }: { titre: string; items: string[] }) => (
  <div className="flex flex-col gap-1.5">
    <h3 className="m-0 font-body text-[1.35rem] normal-case italic tracking-normal text-aubergine">{titre}</h3>
    <ul className="m-0 list-none p-0">
      {items.map((t) => (
        <li key={t} className="border-t border-dashed border-trait py-2.5">
          {fr(t)}
        </li>
      ))}
    </ul>
  </div>
);

const Saison = () => {
  const s = saisonDuMoment();
  return (
    <section
      aria-labelledby="accueil-saison"
      className="mx-auto grid max-w-[1220px] gap-14 px-4 py-20 sm:px-10 md:grid-cols-2 md:gap-[72px] md:py-24"
    >
      <div className="flex flex-col gap-5">
        <p className="m-0 font-bold text-aubergine">En ce moment</p>
        <h2 id="accueil-saison" className="m-0 text-[clamp(3.2rem,6.6vw,5.4rem)] leading-[0.92]">
          {s.nom}
        </h2>
        <p className="m-0 text-[19px]">{fr(s.presentation)}</p>
        <div className="flex items-end gap-6 pt-3">
          <div className="hidden shrink-0 sm:block">
            <Chai size={130} decorative />
          </div>
          <div className="flex flex-col gap-2 pb-2">
            <p className="m-0 font-bold">Dans l'assiette</p>
            <p className="m-0 text-doux">{s.assiette}</p>
            <p className="m-0 text-doux">
              <span className="font-bold text-encre">On évite</span> {s.onEvite}
            </p>
          </div>
        </div>
        <Link to={`/au-quotidien#${s.id}`} className={`${lienSouligne} self-start`}>
          {s.nom.replace(/^L'|^Le /, (m) => (m === "L'" ? "Tout l'" : "Tout le "))}, saison de {s.dosha}
          <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </Link>
      </div>
      <div className="flex flex-col gap-7 md:pt-2">
        <Moment titre="Le matin" items={s.matin} />
        <Moment titre="Dans la journée" items={s.journee} />
        <Moment titre="Le soir" items={s.soir} />
      </div>
    </section>
  );
};

/* ───────────── Les trois doshas ───────────── */

const DOSHAS = [
  {
    nom: "Vata",
    deva: "वात",
    elements: "l'air et l'éther",
    texte: "Ce qui bouge : la respiration, la circulation, les idées. En excès, il disperse et dessèche.",
    Illu: Vent,
    decal: "md:ml-0",
  },
  {
    nom: "Pitta",
    deva: "पित्त",
    elements: "le feu et l'eau",
    texte: "Ce qui transforme : la digestion, la chaleur du corps, la concentration. En excès, il irrite et échauffe.",
    Illu: Flamme,
    decal: "md:ml-[clamp(0px,14vw,220px)]",
  },
  {
    nom: "Kapha",
    deva: "कफ",
    elements: "l'eau et la terre",
    texte: "Ce qui tient ensemble : les os, les muscles, l'immunité, le calme. En excès, il alourdit et ralentit.",
    Illu: Goutte,
    decal: "md:ml-[clamp(0px,28vw,440px)]",
  },
];

const TroisDoshas = () => (
  <>
    <section aria-labelledby="accueil-doshas" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto flex max-w-[1220px] flex-col gap-11 px-4 py-20 sm:px-10 md:pb-28 md:pt-24">
        <div className="flex max-w-[560px] flex-col gap-4">
          <h2 id="accueil-doshas" className="m-0 text-[clamp(2.3rem,4.6vw,3.6rem)]">
            Les trois doshas
          </h2>
          <p className="m-0 text-[#D3E3DE]">
            Ce sont trois façons dont les cinq éléments s'organisent en nous. Tout le monde a les trois&nbsp;; c'est le
            dosage qui change d'une personne à l'autre.
          </p>
        </div>
        {DOSHAS.map(({ nom, deva, elements, texte, Illu, decal }) => (
          <div
            key={nom}
            className={`grid max-w-[640px] grid-cols-[88px_minmax(0,1fr)] items-center gap-5 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-8 ${decal}`}
          >
            <div className="flex justify-center">
              <Illu size={150} decorative className="h-auto w-[88px] sm:w-[150px]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="m-0 flex items-baseline gap-3.5">
                <span className="font-display text-[clamp(2rem,5vw,2.9rem)] leading-none">{nom}</span>
                <span lang="sa" className="font-devanagari text-[28px] text-citron">
                  {deva}
                </span>
              </p>
              <p className="m-0 italic text-[#C4DCD5]">{elements}</p>
              <p className="m-0 text-[#D3E3DE]">{fr(texte)}</p>
            </div>
          </div>
        ))}
        <Link to="/comprendre/doshas" className={`${lienSouligne} self-start text-pistache`}>
          Comprendre les doshas <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </Link>
      </div>
    </section>
    <Bande variante="paon" />
  </>
);

/* ───────────── Sur l'étagère ───────────── */

const EPICES = [
  { nom: "Curcuma", skt: "haridra", Illu: Curcuma, taille: 118, rot: -4, chute: 6 },
  { nom: "Gingembre", skt: "shunti", Illu: Gingembre, taille: 108, rot: 3, chute: 30 },
  { nom: "Cardamome", skt: "ela", Illu: Cardamome, taille: 104, rot: -2, chute: 12 },
  { nom: "Cannelle", skt: "tvak", Illu: Cannelle, taille: 116, rot: 5, chute: 38 },
  { nom: "Poivre noir", skt: "maricha", Illu: Poivre, taille: 96, rot: -3, chute: 18 },
];

const Etagere = () => (
  <section aria-labelledby="accueil-etagere" className="mx-auto flex max-w-[1220px] flex-col gap-2 px-4 pb-12 pt-20 sm:px-10 md:pt-24">
    <div className="flex flex-wrap items-baseline justify-between gap-4">
      <h2 id="accueil-etagere" className="m-0 text-[clamp(2.2rem,4.4vw,3.5rem)]">
        Sur l'étagère
      </h2>
      <Link to="/cuisine" className="inline-flex items-center gap-2 font-bold underline underline-offset-4">
        La boîte à épices <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
      </Link>
    </div>
    <div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className="relative m-0 grid min-w-[920px] list-none grid-cols-5 md:min-w-0 gap-3 p-0 pt-6">
        <svg width="100%" height="18" aria-hidden="true" className="absolute left-0 top-[184px] block overflow-visible">
          <g filter="url(#ink)">
            <rect x="0" y="2" width="100%" height="12" rx="3" fill="#A8823A" stroke="#13201E" strokeWidth="2" />
          </g>
        </svg>
        {EPICES.map(({ nom, skt, Illu, taille, rot, chute }) => (
          <li key={nom} className="relative">
            <Link to="/cuisine" className="group flex flex-col items-center no-underline">
              <span className="flex h-[140px] items-end justify-center transition-transform group-hover:-translate-y-1 motion-reduce:transition-none">
                <Illu size={taille} decorative />
              </span>
              <span className="h-3.5" />
              <span className="w-0.5 bg-encre" style={{ height: chute + 20 }} />
              <span
                className="flex origin-top flex-col items-center rounded-b-[14px] rounded-t bg-carte px-4 pb-3 pt-2.5 shadow-[0_0_0_1.5px_hsl(var(--encre))]"
                style={{ transform: `rotate(${rot}deg)` }}
              >
                <span className="font-display text-[1.3rem] leading-tight">{nom}</span>
                <span className="text-sm italic text-doux">{skt}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ───────────── Le quiz en avant-goût ───────────── */

const AvantGoutQuiz = () => {
  const q = PRAKRITI[0];
  return (
    <section aria-labelledby="accueil-quiz" className="relative overflow-hidden bg-citron">
      <div className="mx-auto grid max-w-[1220px] items-start gap-12 px-4 py-20 sm:px-10 md:grid-cols-2 md:gap-14 md:py-[88px]">
        <div className="flex flex-col gap-5">
          <Sceau size={84} rotate={-14} fond="hsl(var(--aubergine))" reserve="hsl(var(--citron))" />
          <h2 id="accueil-quiz" className="m-0 text-[clamp(2.4rem,5vw,4rem)] leading-none">
            {fr("Vata, Pitta ou Kapha ?")}
          </h2>
          <p className="m-0 max-w-[40ch]">
            Le quiz pose des questions simples sur votre corps, votre digestion, votre sommeil, votre humeur. À la
            fin, vous savez quel dosha domine chez vous et quoi en faire.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="m-0 mb-1.5 font-display text-[1.6rem] leading-tight">{fr(q.question)}</p>
          {q.options.map((o, j) => (
            <Link
              key={o.texte}
              to="/profil"
              state={{ depart: "nature", premier: j }}
              className="flex min-h-14 items-center gap-3.5 rounded-[14px] bg-pistache px-5 py-2 no-underline shadow-[inset_0_0_0_1.5px_hsl(var(--encre))] transition-colors hover:bg-carte"
            >
              <span aria-hidden="true" className="h-[18px] w-[18px] shrink-0 rounded-[5px] shadow-[inset_0_0_0_2px_hsl(var(--encre))]" />
              {o.texte}
            </Link>
          ))}
          <p className="m-0 mt-2 text-[15px]">
            Première des {PRAKRITI.length} questions sur votre nature, puis 15 sur votre état du moment.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ───────────── Photo et citation ───────────── */

const Citation = () => (
  <section className="mx-auto grid max-w-[1220px] items-end gap-12 px-4 py-20 sm:px-10 md:grid-cols-2 md:gap-14 md:pb-28 md:pt-[104px]">
    <div className="h-[340px] md:h-[520px]">
      <Photo description="mains qui pilent des épices au mortier, vue de près" />
    </div>
    <figure className="m-0 flex flex-col gap-4 md:pb-6">
      <blockquote className="m-0 font-display text-[clamp(1.6rem,3.4vw,2.75rem)] leading-[1.15]">
        {fr(
          "« Lorsque le régime alimentaire est correct, la médecine n'est pas nécessaire. Lorsqu'il est incorrect, la médecine est inutile. »",
        )}
      </blockquote>
      <figcaption className="italic text-doux">Proverbe ayurvédique</figcaption>
    </figure>
  </section>
);

const Index = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Bande />
      <Saison />
      <TroisDoshas />
      <Etagere />
      <AvantGoutQuiz />
      <Citation />
    </main>
    <Footer />
  </>
);

export default Index;
