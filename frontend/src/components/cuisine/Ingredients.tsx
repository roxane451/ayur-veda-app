import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import {
  ingredientsQuiApaisent,
  initialeIngredient,
  type Ingredient,
} from "@/data/ingredients";
import { DOSHAS, NOM_DOSHA, type DoshaKey } from "@/lib/doshaLogic";

/** Les effets d'un ingrédient sur les doshas : ↓ apaise, ↑ fait monter en excès. */
const Effets = ({ i }: { i: Ingredient }) => {
  if (!i.doshas)
    return <span className="text-[15px] italic text-doux">{i.note}</span>;
  return (
    <span className="flex flex-wrap gap-1.5">
      {DOSHAS.filter((d) => i.doshas?.[d]).map((d) =>
        i.doshas?.[d] === "diminue" ? (
          <span
            key={d}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-bold ${d === "vata" ? "text-encre" : "text-pistache"}`}
            style={{ background: COULEUR_DOSHA[d] }}
          >
            <span aria-hidden="true">↓</span>
            <span className="sr-only">apaise </span>
            {NOM_DOSHA[d]}
          </span>
        ) : (
          <span
            key={d}
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-bold shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]"
          >
            <span aria-hidden="true">↑</span>
            <span className="sr-only">fait monter en excès </span>
            {NOM_DOSHA[d]}
          </span>
        ),
      )}
    </span>
  );
};

/** Un nom botanique est en italique ; « Préparation composée » ou « Mélange traditionnel » ne le sont pas. */
const Botanique = ({ texte }: { texte?: string }) =>
  texte ? (
    <span
      className={`text-[15px] text-doux ${/^(Préparation|Mélange)/.test(texte) ? "" : "italic"}`}
    >
      {texte}
    </span>
  ) : null;

const Ligne = ({ i }: { i: Ingredient }) => (
  <li className="grid gap-x-6 gap-y-2 border-t border-encre/25 py-4 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.3fr)_minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1.5fr)] lg:items-baseline">
    <span className="flex flex-col">
      <span className="font-display text-[1.3rem] leading-tight">{i.nom}</span>
      <Botanique texte={i.botanique} />
    </span>
    <dl className="m-0 contents text-[16px]">
      {[
        ["Partie utilisée", i.partie],
        ["Saveurs (rasa)", i.rasa],
        ["Virya", i.virya],
      ].map(([t, v]) => (
        <div key={t} className="flex gap-2 lg:block">
          <dt className="w-[8.5rem] shrink-0 text-doux lg:sr-only">{t}</dt>
          <dd className="m-0">{fr(v)}</dd>
        </div>
      ))}
    </dl>
    <span className="flex flex-col gap-1">
      <Effets i={i} />
      {i.doshas && i.note && (
        <span className="text-sm italic text-doux">{i.note}</span>
      )}
    </span>
  </li>
);

/** Les ingrédients de la pharmacopée, rangés de A à Z, filtrés comme les épices. */
const Ingredients = ({ filtre }: { filtre: DoshaKey | null }) => {
  const liste = ingredientsQuiApaisent(filtre);
  const lettres = Array.from(
    new Set(liste.map((i) => initialeIngredient(i.nom))),
  );
  return (
    <section
      aria-label="Les ingrédients de A à Z"
      className="mx-auto flex max-w-[1220px] flex-col gap-8 px-4 pb-20 pt-12 sm:px-10 md:pt-14"
    >
      <div className="contents">
        <nav
          aria-label="Aller à une lettre"
          className="flex flex-wrap items-center gap-x-1 gap-y-2 border-y border-encre py-2"
        >
          {lettres.map((l) => (
            <a
              key={l}
              href={`#ingredients-${l}`}
              className="inline-flex h-10 min-w-10 items-center justify-center font-display text-xl no-underline hover:text-aubergine"
            >
              {l}
            </a>
          ))}
          <span className="ml-auto text-[15px] text-doux">
            ↓ apaise, ↑ fait monter en excès
          </span>
        </nav>

        {filtre && (
          <p className="m-0 text-doux" aria-live="polite">
            {liste.length} ingrédients apaisent {NOM_DOSHA[filtre]}.
          </p>
        )}

        <div className="flex flex-col gap-10">
          <div
            aria-hidden="true"
            className="-mb-8 hidden gap-x-6 pl-[136px] text-sm text-doux lg:grid lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.3fr)_minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1.5fr)]"
          >
            <span>Ingrédient</span>
            <span>Partie utilisée</span>
            <span>Saveurs (rasa)</span>
            <span>Virya</span>
            <span>Doshas</span>
          </div>
          {lettres.map((l) => (
            <div
              key={l}
              id={`ingredients-${l}`}
              className="grid scroll-mt-24 gap-2 lg:grid-cols-[112px_minmax(0,1fr)] lg:gap-6"
            >
              <span
                aria-hidden="true"
                className="font-display text-[3.5rem] leading-none text-aubergine lg:sticky lg:top-28 lg:self-start lg:pt-3"
              >
                {l}
              </span>
              <ul aria-label={`Lettre ${l}`} className="m-0 list-none p-0">
                {liste
                  .filter((i) => initialeIngredient(i.nom) === l)
                  .map((i) => (
                    <Ligne key={i.nom} i={i} />
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
