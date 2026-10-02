import { Link, useSearchParams } from "react-router-dom";
import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Flamme, Goutte, Vent } from "@/components/brand/Illustrations";
import {
  Deva,
  Frontispice,
  Ornement,
  PageComprendre,
  PiedSuite,
} from "@/components/comprendre/Commun";
import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import { enListe } from "@/lib/texte";
import { BandePlantes, Frise, ListeButa } from "@/components/brand/Listes";
import {
  COMPARAISON,
  DOSHAS_DETAIL,
  REFS_DOSHAS,
  SIEGES_DOSHAS,
  type DoshaDetail,
} from "@/data/comprendre";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { NOM_DOSHA } from "@/lib/doshaLogic";
import type { DoshaKey } from "@/lib/doshaLogic";

const ILLU: Record<DoshaKey, typeof Vent> = {
  vata: Vent,
  pitta: Flamme,
  kapha: Goutte,
};

const Tableau = ({
  titre,
  lignes,
}: {
  titre: string;
  lignes: [string, string][];
}) => (
  <div className="flex flex-col">
    <h3 className="m-0 mb-2 text-[1.6rem]">{titre}</h3>
    <dl className="m-0">
      {lignes.map(([a, b]) => (
        <div
          key={a}
          className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-t border-dashed border-trait py-2.5 sm:grid-cols-[140px_minmax(0,1fr)]"
        >
          <dt className="text-doux">{a}</dt>
          <dd className="m-0">{b}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const Detail = ({ d }: { d: DoshaDetail }) => {
  const Illu = ILLU[d.id];
  return (
    <>
      <section
        aria-labelledby={`d-${d.id}`}
        className="mx-auto flex max-w-[1220px] flex-col gap-14 px-4 py-16 sm:px-10 md:py-24"
      >
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
          <div className="flex flex-col gap-4">
            <p className="m-0 flex items-baseline gap-4">
              <Deva className="text-[44px] text-aubergine">{d.deva}</Deva>
              <span className="italic text-doux">{d.elements}</span>
            </p>
            <h2
              id={`d-${d.id}`}
              className="m-0 text-[clamp(4rem,8vw,6.5rem)] leading-[0.9]"
            >
              {d.nom}
            </h2>
            <p className="m-0 text-[1.9rem] italic text-aubergine">
              {d.essence}
            </p>
            <p className="m-0 max-w-[42ch]">{fr(d.presentation)}</p>
            <div className="mt-1.5 flex flex-col gap-1.5">
              <Frise mots={d.qualites} label={`Les qualités de ${d.nom}`} />
              <span className="text-[15px] text-doux">
                Ses qualités, selon Charaka.
                <Renvoi n={1} />
              </span>
            </div>
          </div>
          <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-b-2xl rounded-t-full bg-paon md:h-[380px]">
            <Motif id="dabu" />
            <div className="relative">
              <Illu
                size={240}
                stroke="#F3F5E6"
                decorative
                className="h-auto w-[180px] md:w-[240px]"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-12 md:grid-cols-2 md:gap-14">
          <Tableau titre="Le corps" lignes={d.corps} />
          <Tableau titre="L'esprit" lignes={d.esprit} />
        </div>
        <div className="grid gap-10 border-t-2 border-encre pt-8 lg:grid-cols-[minmax(0,1fr)_2px_minmax(0,1fr)_2px_minmax(0,1fr)] lg:gap-10">
          <div className="flex flex-col gap-3">
            <ListeButa
              titre="Quand il est équilibré"
              items={d.fonctions}
              couleur={COULEUR_DOSHA[d.id]}
              classeTitre="text-paon"
            />
            <span className="text-[15px] text-doux">
              D'après Charaka.
              <Renvoi n={2} />
            </span>
          </div>
          <div aria-hidden="true" className="hidden bg-encre lg:block" />
          <ListeButa
            titre={`Quand ${d.nom} est en excès`}
            items={d.signes}
            couleur="#5B2A4E"
            classeTitre="text-aubergine"
          />
          <div aria-hidden="true" className="hidden bg-encre lg:block" />
          <ListeButa
            titre="Pour le rééquilibrer"
            items={d.conseils}
            couleur="#6E7F1A"
            classeTitre="text-citron-fonce"
          />
        </div>
        <div className="flex flex-col gap-6 border-t-2 border-encre pt-8">
          <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
            <h3 className="m-0 text-[clamp(1.9rem,3.6vw,2.5rem)] leading-none">Ses cinq formes</h3>
            <p className="m-0 text-lg text-doux">
              {d.nom} agit de cinq façons, chacune à sa place.
              <Renvoi n={d.id === "vata" ? 3 : 4} /> On les cite aujourd'hui dans l'ordre de Vāgbhaṭa.
              <Renvoi n={5} />
            </p>
          </div>
          <ol className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-8 p-0 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {d.formes.map((f, i) => (
              <li key={f.nom} className="flex flex-col gap-2">
                <div
                  className={`flex h-[140px] flex-col items-center justify-end rounded-b-[10px] rounded-t-full pb-4 shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:h-[150px] ${i % 2 ? "bg-surface" : "bg-carte"}`}
                >
                  <Deva className="text-[26px] text-paon sm:text-[30px]">{f.deva}</Deva>
                  <span className="font-display text-lg">{f.nom}</span>
                </div>
                <span className="text-[15.5px] italic text-aubergine">{f.siege}</span>
                <span>{f.role}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {/* [À FAIRE] fiches plantes à rédiger, avec leurs précautions d'emploi */}
      <BandePlantes
        titre={`Les plantes de ${d.nom}`}
        note="Leurs fiches, avec les précautions d'emploi, arrivent dans la rubrique La cuisine."
        plantes={d.plantes}
      />
    </>
  );
};

/* Les sièges : une arche coupée en trois, Kapha en haut, Vata en bas */
const Sieges = () => (
  <svg viewBox="0 0 360 470" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label="Kapha au-dessus du cœur, Pitta entre le cœur et le nombril, Vata sous le nombril.">
    <defs>
      <clipPath id="arche-sieges">
        <path d="M30 460 V180 A150 150 0 0 1 330 180 V460 Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#arche-sieges)">
      <rect x="0" y="0" width="360" height="200" fill="#6E7F1A" />
      <rect x="0" y="200" width="360" height="120" fill="#5B2A4E" />
      <rect x="0" y="320" width="360" height="140" fill="#8DB9B0" />
    </g>
    <path d="M30 460 V180 A150 150 0 0 1 330 180 V460 Z" fill="none" stroke="#13201E" strokeWidth="2.5" />
    <path d="M30 200 H330 M30 320 H330" stroke="#13201E" strokeWidth="2" strokeDasharray="6 6" />
    {SIEGES_DOSHAS.map((s, i) => {
      const y = [120, 266, 394][i];
      const c = s.dosha === "vata" ? "#13201E" : "#F3F5E6";
      return (
        <g key={s.dosha} textAnchor="middle">
          <text x="180" y={y} className="font-display" fontSize="30" fill={c}>
            {NOM_DOSHA[s.dosha].toUpperCase()}
          </text>
          <text x="180" y={y + 28} fontStyle="italic" fontSize="17" fill={c}>
            {s.image}
          </text>
        </g>
      );
    })}
  </svg>
);

const Resume = ({
  d,
  onChoisir,
}: {
  d: DoshaDetail;
  onChoisir: () => void;
}) => {
  const Illu = ILLU[d.id];
  return (
    <button
      type="button"
      onClick={onChoisir}
      className="grid w-full grid-cols-[72px_minmax(0,1fr)] items-center gap-5 rounded-2xl bg-paon px-6 py-6 text-left text-pistache hover:opacity-95 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:gap-7 sm:px-8 sm:py-7"
    >
      <Illu
        size={110}
        stroke="#F3F5E6"
        decorative
        className="h-auto w-[72px] sm:w-[110px]"
      />
      <span className="flex flex-col gap-2">
        <span className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
          <span className="font-display text-[2.2rem] leading-none sm:text-[2.6rem]">
            {d.nom}
          </span>
          <Deva className="text-[26px] text-citron">{d.deva}</Deva>
          <span className="italic text-[#C4DCD5]">{d.elements}</span>
        </span>
        <span className="text-[#D3E3DE]">
          {d.essence}. Il est {enListe(d.qualites)}.
        </span>
      </span>
      <span className="col-span-2 inline-flex items-center gap-2 font-bold sm:col-span-1">
        Lire
      </span>
    </button>
  );
};

const Doshas = () => {
  const [params, setParams] = useSearchParams();
  const idChoisi = (
    DOSHAS_DETAIL.find((d) => d.id === params.get("dosha")) ?? DOSHAS_DETAIL[0]
  ).id;
  const actif = DOSHAS_DETAIL.find((d) => d.id === idChoisi)!;
  const choisir = (id: DoshaKey) => {
    setParams({ dosha: id }, { replace: true });
    document
      .getElementById("detail-dosha")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageComprendre>
      <Frontispice
        deva="त्रिदोष"
        translit="tridoṣa, les trois doshas"
        titre="Les trois doshas"
      >
        <p className="m-0 mt-1 max-w-[44ch] text-xl text-doux">
          Trois forces font vivre le corps et l'esprit. Chacun les porte
          toutes, dans des proportions qui lui sont propres et que l'on
          appelle sa <em className="font-body normal-case">prakriti</em>.
        </p>
        <div className="mt-5">
          <Ornement />
        </div>
        <div
          role="tablist"
          aria-label="Choisir un dosha"
          className="mt-6 grid w-full max-w-[640px] grid-cols-3 gap-2 sm:gap-6"
        >
          {DOSHAS_DETAIL.map((d) => {
            const Illu =
              d.id === "vata" ? Vent : d.id === "pitta" ? Flamme : Goutte;
            const choisi = d.id === idChoisi;
            return (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={choisi}
                aria-controls="detail-dosha"
                onClick={() => choisir(d.id)}
                className="group flex flex-col items-center gap-1.5 rounded-buta px-1 pb-3 pt-2 hover:bg-surface"
              >
                <Illu
                  size={104}
                  stroke="#13201E"
                  decorative
                  className="h-auto w-[72px] transition-transform group-hover:-translate-y-1 motion-reduce:transition-none sm:w-[104px]"
                />
                <span
                  className={`font-display text-[1.35rem] leading-none sm:text-[1.65rem] ${choisi ? "border-b-2 border-aubergine pb-1" : "border-b-2 border-transparent pb-1"}`}
                >
                  {d.nom}
                </span>
                <span className="text-sm italic text-doux sm:text-base">
                  {d.elements}
                </span>
              </button>
            );
          })}
        </div>
        <a
          href="#d-comparer"
          className="mt-2 text-base font-bold underline underline-offset-4"
        >
          Comparer les trois
        </a>
      </Frontispice>
      <Bande />
      <DApres>Charaka, Sūtrasthāna 1, 12 et 18 ; Suśruta, Sūtrasthāna 21</DApres>

      <div
        id="detail-dosha"
        role="tabpanel"
        className="scroll-mt-20"
        key={idChoisi}
      >
        <Detail d={actif} />
      </div>

      <section
        aria-label="Les deux autres doshas"
        className="mx-auto flex max-w-[1220px] flex-col gap-4 px-4 pb-24 pt-16 sm:px-10 md:pt-20"
      >
        {DOSHAS_DETAIL.filter((d) => d.id !== idChoisi).map((d) => (
          <Resume key={d.id} d={d} onChoisir={() => choisir(d.id)} />
        ))}
      </section>

      <section aria-labelledby="d-sieges" className="mx-auto grid max-w-[1100px] items-center gap-10 px-4 pb-20 sm:px-10 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-16">
        <Sieges />
        <div className="flex flex-col gap-3.5">
          <h2 id="d-sieges" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            Où ils siègent
          </h2>
          <p className="m-0 text-lg text-doux">
            Chaque dosha est présent partout, mais il a sa région. Suśruta les situe de haut en bas, du cœur au nombril.
            <Renvoi n={6} />
          </p>
          <ul className="m-0 mt-2 list-none p-0">
            {SIEGES_DOSHAS.map((s) => (
              <li key={s.dosha} className="flex flex-col gap-1 border-t border-encre/20 py-4">
                <span className="font-display text-[1.35rem]">{s.region}</span>
                <span className="italic text-aubergine">{NOM_DOSHA[s.dosha]}</span>
                <span>{s.lieux}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="d-comparer"
        id="d-comparer"
        className="scroll-mt-20 bg-surface"
      >
        <div className="mx-auto flex max-w-[1220px] flex-col gap-7 px-4 py-16 sm:px-10 md:py-[88px]">
          <h2 className="m-0 text-[clamp(2.2rem,4.4vw,3.25rem)]">
            Les trois, côte à côte
          </h2>
          <div className="overflow-x-auto rounded-2xl bg-carte shadow-[inset_0_0_0_2px_hsl(var(--encre))]">
            <table className="w-full min-w-[640px] border-collapse text-[17px]">
              <thead>
                <tr>
                  <td className="p-4" />
                  {DOSHAS_DETAIL.map((d) => (
                    <th
                      key={d.id}
                      scope="col"
                      className="p-4 text-left font-display text-[1.6rem] font-normal"
                    >
                      <span
                        aria-hidden="true"
                        className="mr-2.5 inline-block h-3 w-3 rounded-full"
                        style={{ background: COULEUR_DOSHA[d.id] }}
                      />
                      {d.nom}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARAISON.map(([c, ...v]) => (
                  <tr key={c}>
                    <th
                      scope="row"
                      className="border-t border-dashed border-trait px-4 py-3.5 text-left font-bold"
                    >
                      {c}
                    </th>
                    {v.map((x, i) => (
                      <td
                        key={i}
                        className="border-t border-dashed border-trait px-4 py-3.5"
                      >
                        {x}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="m-0 text-lg">
            Pour savoir lequel domine chez vous,{" "}
            <Link
              to="/profil"
              className="font-bold underline underline-offset-4"
            >
              faites le quiz
            </Link>
            . Il mesure votre nature, puis votre état du moment.
          </p>
        </div>
      </section>

      <Sources refs={REFS_DOSHAS} />
      <PiedSuite />
    </PageComprendre>
  );
};

export default Doshas;
