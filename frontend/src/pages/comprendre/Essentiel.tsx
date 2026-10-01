import { Link } from "react-router-dom";
import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Flamme, Poudre, SoleilLune, Vent } from "@/components/brand/Illustrations";
import { Deva, Frontispice, Ornement, PageComprendre } from "@/components/comprendre/Commun";
import { lienSouligne } from "@/components/comprendre/sousPages";
import { fr } from "@/components/quiz/conseils";
import { ELEMENTS } from "@/data/comprendre";

const NOTIONS = [
  { n: "I", titre: "Les doshas", texte: "Les trois énergies qui naissent des cinq éléments.", href: "/comprendre/doshas", Illu: Vent },
  { n: "II", titre: "Les six saveurs", texte: "Chaque saveur agit sur les doshas. Les connaître aide à composer une assiette.", href: "/comprendre/saveurs", Illu: Poudre },
  { n: "III", titre: "Agni, le feu digestif", texte: "Le feu qui transforme ce que l'on mange. Pour l'Ayurveda, la santé commence par lui.", href: "/comprendre/agni", Illu: Flamme },
  { n: "IV", titre: "La journée", texte: "Chaque moment du jour a son dosha, ce qui guide l'heure du lever, des repas et du coucher.", href: "/comprendre/journee", Illu: SoleilLune },
];

const Essentiel = () => (
  <PageComprendre>
    <Frontispice deva="आयुर्वेद" translit="āyus, la vie, et veda, la connaissance" titre="Comprendre l'Ayurveda">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        {fr(
          "La médecine traditionnelle de l'Inde part de cinq éléments. Ils forment les doshas, que les saveurs nourrissent et que le feu digestif entretient.",
        )}
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
      <p className="m-0 mt-4 max-w-[40ch] font-body text-[1.45rem] italic leading-snug">
        Pour l'Ayurveda, tout ce qui existe est fait des cinq mêmes éléments, nous compris. La santé tient à leur équilibre, qui est propre à chacun.
      </p>
    </Frontispice>

    <section aria-labelledby="h-elements" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto flex max-w-[1220px] flex-col gap-9 px-4 py-16 sm:px-10 md:py-20">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <h2 id="h-elements" className="m-0 text-[clamp(2.2rem,4.4vw,3.25rem)]">
            Les cinq éléments
          </h2>
          <p className="m-0 text-[#D3E3DE]">
            {fr(
              "En sanskrit, les pañca mahābhūta. Combinés deux à deux, ils forment les doshas. L'air et l'éther donnent Vata, le feu et l'eau donnent Pitta, l'eau et la terre donnent Kapha.",
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

    <section aria-labelledby="h-suite" className="mx-auto flex max-w-[1220px] flex-col gap-3 px-4 pb-24 pt-16 sm:px-10 md:pt-20">
      <h2 id="h-suite" className="m-0 mb-3 text-[clamp(2.2rem,4.4vw,3.25rem)]">
        Les notions de base
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
        Le lexique des mots sanskrits
      </Link>
    </section>
  </PageComprendre>
);

export default Essentiel;
