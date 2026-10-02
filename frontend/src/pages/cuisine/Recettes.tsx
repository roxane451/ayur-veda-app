import { CONTENU_PAYANT } from "@/lib/offre";
import { Link, useSearchParams } from "react-router-dom";
import { Lock } from "lucide-react";
import Photo from "@/components/brand/PhotoPlaceholder";
import { IlluEpice, PageCuisine, Pastille, TeteCuisine } from "@/components/cuisine/Commun";
import { Poudre } from "@/components/brand/Illustrations";
import { COULEUR_DOSHA } from "@/components/quiz/conseils";
import { RECETTES, RECETTES_VISIBLES, RECETTES_COMPLETES, RUBRIQUES, filtrerRecettes, type Recette, type Saison } from "@/data/cuisine";
import { DOSHAS, NOM_DOSHA } from "@/lib/doshaLogic";
import { doshasTexte, saisonsTexte } from "./recettesTexte";

const SAISONS: Saison[] = ["Automne", "Hiver", "Printemps", "Été"];

const Fiche = ({ r }: { r: Recette }) => {
  const redigee = Boolean(RECETTES_COMPLETES[r.id]);
  const contenu = (
    <>
      <div role="img" aria-label={`Photo : ${r.nom}`} className="h-[84px] rounded-[10px] shadow-[inset_0_0_0_1.5px_hsl(var(--encre))] sm:h-[92px]" style={{ background: r.teinte }} />
      <span className="flex flex-col gap-1">
        <span className="font-display text-[1.15rem] leading-tight">{r.nom}</span>
        <span className="text-sm text-doux">
          {doshasTexte(r)} · {saisonsTexte(r)} · {r.minutes} min
        </span>
        {!CONTENU_PAYANT ? null : r.membres ? (
          <span className="inline-flex items-center gap-1 text-[13px] font-bold text-paon">
            <Lock className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" /> Membres
          </span>
        ) : (
          <span className="self-start rounded-full bg-citron px-2.5 py-px text-[13px] font-bold text-encre">Gratuit</span>
        )}
      </span>
    </>
  );
  const classe = "grid grid-cols-[84px_minmax(0,1fr)] items-center gap-4 border-t border-dashed border-trait py-3.5 no-underline sm:grid-cols-[92px_minmax(0,1fr)]";
  return redigee ? (
    <Link to={`/cuisine/recettes/${r.id}`} className={`${classe} group hover:bg-carte`}>
      {contenu}
    </Link>
  ) : (
    <div className={classe}>{contenu}</div>
  );
};

const Recettes = () => {
  const [params, setParams] = useSearchParams();
  const dosha = DOSHAS.find((d) => d === params.get("dosha")) ?? null;
  const saison = SAISONS.find((s) => s === params.get("saison")) ?? null;
  const rapide = params.get("rapide") === "1";
  const maj = (cle: string, valeur: string | null) => {
    const p = new URLSearchParams(params);
    if (valeur) p.set(cle, valeur);
    else p.delete(cle);
    setParams(p, { replace: true });
  };

  const liste = filtrerRecettes(RECETTES_VISIBLES, { dosha, saison, rapide });
  const gratuites = RECETTES.filter((r) => !r.membres).length;
  const filtre = Boolean(dosha || saison || rapide);

  return (
    <PageCuisine>
      <TeteCuisine
        titre="Les recettes"
        intro={`${RECETTES_VISIBLES.length} plats de la cuisine ayurvédique, du petit-déjeuner au dessert, avec pour chacun le dosha qu'il apaise et sa saison. ${CONTENU_PAYANT ? `${gratuites} sont en accès libre.` : ""}`.trim()}
      >
        <Poudre size={150} decorative className="h-auto w-[38%] max-w-[150px]" />
        <IlluEpice id="gingembre" size={120} className="h-auto w-[30%] max-w-[120px]" />
      </TeteCuisine>

      <section aria-label="Filtrer les recettes" className="sticky top-[calc(4.25rem+env(safe-area-inset-top))] z-10 border-y-2 border-encre bg-pistache lg:top-[5.25rem]">
        <div className="mx-auto flex max-w-[1220px] flex-col gap-2.5 px-4 py-3 sm:px-10 lg:flex-row lg:flex-wrap lg:items-center lg:gap-5">
          <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
            <span className="mr-1 shrink-0 font-bold">Dosha</span>
            <Pastille actif={!dosha} onClick={() => maj("dosha", null)}>
              Tous
            </Pastille>
            {DOSHAS.map((d) => (
              <Pastille key={d} actif={dosha === d} onClick={() => maj("dosha", dosha === d ? null : d)} couleur={COULEUR_DOSHA[d]}>
                {NOM_DOSHA[d]}
              </Pastille>
            ))}
          </div>
          <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
            <span className="mr-1 shrink-0 font-bold">Saison</span>
            <Pastille actif={!saison} onClick={() => maj("saison", null)}>
              Toutes
            </Pastille>
            {SAISONS.map((s) => (
              <Pastille key={s} actif={saison === s} onClick={() => maj("saison", saison === s ? null : s)}>
                {s}
              </Pastille>
            ))}
            <span className="mx-1 shrink-0 font-bold lg:ml-3">Temps</span>
            <Pastille actif={rapide} onClick={() => maj("rapide", rapide ? null : "1")}>
              Moins de 20 min
            </Pastille>
          </div>
        </div>
      </section>

      {!filtre && (
        <section aria-labelledby="r-kitchari" className="mx-auto grid max-w-[1220px] items-center gap-10 px-4 pb-2 pt-12 sm:px-10 md:grid-cols-2">
          <div className="h-[260px] md:h-[320px]">
            <Photo description="kitchari dans un bol, ghee et coriandre fraîche" aVenir />
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-aubergine">Pour commencer</span>
            <h2 id="r-kitchari" className="m-0 text-[clamp(2.4rem,5vw,3rem)] leading-none">
              Kitchari
            </h2>
            <p className="m-0">{RECETTES_COMPLETES.kitchari.intro}</p>
            <p className="m-0 text-doux">Pour les trois doshas, toute l'année. 40 minutes, en accès libre.</p>
            <Link
              to="/cuisine/recettes/kitchari"
              className="mt-1 inline-flex min-h-[52px] self-start items-center rounded-buta bg-aubergine px-6 font-bold text-pistache no-underline hover:opacity-90"
            >
              Lire la recette
            </Link>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-[1220px] px-4 pb-14 sm:px-10" aria-live="polite">
        {filtre && (
          <p className="m-0 flex flex-wrap items-center gap-3 pt-8 text-doux">
            {liste.length} recette{liste.length > 1 ? "s" : ""} trouvée{liste.length > 1 ? "s" : ""}
            <button type="button" onClick={() => setParams({}, { replace: true })} className="font-bold text-encre underline underline-offset-4">
              Tout afficher
            </button>
          </p>
        )}
        {RUBRIQUES.map((rub) => {
          const items = liste.filter((r) => r.rubrique === rub);
          if (!items.length) return null;
          return (
            <section key={rub} className="flex flex-col gap-2 pt-10">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="m-0 text-[clamp(1.8rem,3.5vw,2.25rem)]">{rub}</h2>
                <span className="shrink-0 text-doux">
                  {items.length} recette{items.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
                {items.map((r) => (
                  <Fiche key={r.id} r={r} />
                ))}
              </div>
            </section>
          );
        })}
        {liste.length === 0 && <p className="m-0 pt-10 text-doux">Aucune recette ne correspond à ces filtres pour l'instant.</p>}
      </div>

      {CONTENU_PAYANT && (
      <section className="mx-auto max-w-[1220px] px-4 pb-[88px] sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-paon px-6 py-7 text-pistache sm:px-8">
          <span className="max-w-[640px]">
            L'espace membre donnera accès à toutes les recettes, triées selon votre dosha, avec deux nouveautés par mois.
          </span>
          <Link
            to="/espace-membre"
            className="inline-flex min-h-[52px] items-center rounded-buta bg-citron px-6 font-bold text-encre no-underline hover:opacity-90"
          >
            Devenir membre
          </Link>
        </div>
      </section>
      )}
    </PageCuisine>
  );
};

export default Recettes;
