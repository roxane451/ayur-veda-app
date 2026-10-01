import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Flamme, Poudre, SoleilLune, Vent } from "@/components/brand/Illustrations";
import { Deva, FilAriane, PageComprendre } from "@/components/comprendre/Commun";
import { lienSouligne } from "@/components/comprendre/sousPages";
import { fr } from "@/components/quiz/conseils";
import { ELEMENTS } from "@/data/comprendre";

const NOTIONS = [
  { n: "I", titre: "Les doshas", texte: "Vata, Pitta, Kapha : les trois énergies qui naissent des cinq éléments.", href: "/comprendre/doshas", Illu: Vent },
  { n: "II", titre: "Les six saveurs", texte: "Sucré, acide, salé, piquant, amer, astringent : la clé pour composer son assiette.", href: "/comprendre/saveurs", Illu: Poudre },
  { n: "III", titre: "Agni, le feu digestif", texte: "Ce qui transforme ce que l'on mange. Quand il va bien, tout va mieux.", href: "/comprendre/agni", Illu: Flamme },
  { n: "IV", titre: "La journée", texte: "Chaque moment du jour a son dosha : quand se lever, manger, se reposer.", href: "/comprendre/journee", Illu: SoleilLune },
];

const Essentiel = () => (
  <PageComprendre>
    <section className="relative overflow-hidden">
      <Motif id="buta" />
      <div className="relative mx-auto grid max-w-[1220px] items-end gap-12 px-4 pb-16 pt-6 sm:px-10 md:grid-cols-2 md:pb-[72px]">
        <div className="flex flex-col gap-4">
          <FilAriane />
          <p className="m-0 flex flex-wrap items-baseline gap-x-3.5">
            <Deva>आयुर्वेद</Deva>
            <span className="italic text-doux">āyus, la vie · veda, la connaissance</span>
          </p>
          <h1 className="m-0 text-[clamp(2.6rem,6.4vw,5.25rem)] leading-none">Comprendre l'Ayurveda</h1>
          <p className="m-0 max-w-[46ch] text-xl text-doux">
            {fr(
              "La médecine traditionnelle de l'Inde repose sur quelques idées simples. Les voici dans l'ordre où elles s'enchaînent : les éléments forment les doshas, les saveurs les nourrissent, le feu digestif fait le reste.",
            )}
          </p>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl bg-carte px-8 py-7 shadow-[inset_0_0_0_2px_hsl(var(--encre))]">
          <span className="font-display text-2xl">L'idée de départ</span>
          <p className="m-0">
            Tout ce qui existe, nous compris, est fait des cinq mêmes éléments. Être en bonne santé, c'est garder leur
            équilibre propre à chacun, et le retrouver quand il se dérègle.
          </p>
        </div>
      </div>
    </section>

    <section aria-labelledby="h-elements" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto flex max-w-[1220px] flex-col gap-9 px-4 py-16 sm:px-10 md:py-20">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <h2 id="h-elements" className="m-0 text-[clamp(2.2rem,4.4vw,3.25rem)]">
            Les cinq éléments
          </h2>
          <p className="m-0 text-[#D3E3DE]">
            {fr(
              "Les pañca mahābhūta. Ils se combinent deux à deux pour former les trois doshas : l'air et l'éther font Vata, le feu et l'eau font Pitta, l'eau et la terre font Kapha.",
            )}
          </p>
        </div>
        <ul className="m-0 grid list-none grid-cols-2 p-0 sm:grid-cols-3 lg:grid-cols-5">
          {ELEMENTS.map((e) => (
            <li key={e.nom} className="flex flex-col gap-1.5 border-l border-[#2C6B63] px-5 py-5">
              <Deva className="text-[30px] text-citron">{e.deva}</Deva>
              <span className="font-display text-[1.6rem]">{e.nom}</span>
              <span className="italic text-[#C4DCD5]">{e.translit}</span>
              <span className="text-base text-[#D3E3DE]">{fr(e.texte)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <Bande variante="paon" />

    <section aria-labelledby="h-suite" className="mx-auto flex max-w-[1220px] flex-col gap-3 px-4 pb-24 pt-16 sm:px-10 md:pt-20">
      <h2 id="h-suite" className="m-0 mb-3 text-[clamp(2.2rem,4.4vw,3.25rem)]">
        Quatre notions pour tout comprendre
      </h2>
      <ol className="m-0 list-none p-0">
        {NOTIONS.map(({ n, titre, texte, href, Illu }) => (
          <li key={n}>
            <Link
              to={href}
              className="group grid grid-cols-[44px_minmax(0,1fr)_64px] items-center gap-4 border-t border-dashed border-trait py-6 no-underline sm:grid-cols-[70px_minmax(0,1fr)_110px] sm:gap-6"
            >
              <span className="font-display text-[1.6rem] text-aubergine sm:text-3xl">{n}</span>
              <span className="flex flex-col gap-1">
                <span className="font-display text-[1.6rem] leading-tight group-hover:text-aubergine sm:text-[2rem]">
                  {titre}
                </span>
                <span className="text-doux">{fr(texte)}</span>
              </span>
              <span className="flex justify-end">
                <Illu size={96} stroke="#13201E" decorative className="h-auto w-16 sm:w-24" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <Link to="/comprendre/lexique" className={`${lienSouligne} mt-4 self-start`}>
        Les mots sanskrits du site, dans le lexique <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
      </Link>
    </section>
  </PageComprendre>
);

export default Essentiel;
