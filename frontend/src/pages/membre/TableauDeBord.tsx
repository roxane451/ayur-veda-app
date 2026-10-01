import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Motif } from "@/components/brand/BrandDefs";
import { Chai } from "@/components/brand/Illustrations";
import Sceau from "@/components/brand/Sceau";
import { useCompte } from "@/components/compte/CompteContext";
import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import { RECETTES, RECETTES_COMPLETES, filtrerRecettes, type Saison } from "@/data/cuisine";
import { PROGRAMME_AUTOMNE, saisonDuMoment } from "@/data/saisons";
import type { BilanServeur } from "@/lib/api";
import { DOSHAS, NOM_DOSHA, comparerEtat, doshaDominant, libelleProfil, partsEntieres, type DoshaKey } from "@/lib/doshaLogic";

const NOM_SAISON: Record<string, Saison> = { automne: "Automne", hiver: "Hiver", printemps: "Printemps", ete: "Été" };
const COURT: Record<Saison, string> = { Automne: "Aut.", Hiver: "Hiver", Printemps: "Print.", Été: "Été" };

const dateLongue = (iso: string) => new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

/** Étiquette d'un bilan dans l'historique : la saison et l'année. */
const etiquette = (iso: string) => {
  const d = new Date(iso);
  const s = NOM_SAISON[saisonDuMoment(d).id];
  return `${COURT[s]} ${d.getFullYear()}`;
};

/** L'histogramme : pour chaque bilan de saison, la part de Vata, Pitta et Kapha. */
const Historique = ({ etats }: { etats: BilanServeur[] }) => {
  const derniers = etats.slice(-8);
  return (
    <figure className="m-0 flex flex-col gap-3">
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <ul
          className="m-0 flex min-w-max list-none items-end justify-between gap-5 border-b-2 border-encre p-0 pt-3 sm:min-w-0"
          aria-label="Vos bilans de saison, du plus ancien au plus récent"
        >
          {derniers.map((e) => {
            const p = partsEntieres(e.scores);
            return (
              <li key={e.id} className="flex flex-col items-center gap-2">
                <div className="flex h-40 items-end gap-1" aria-hidden="true">
                  {DOSHAS.map((d) => (
                    <span key={d} className="w-[18px] rounded-t" style={{ height: `${Math.max(2, p[d] * 1.6)}px`, background: COULEUR_DOSHA[d] }} />
                  ))}
                </div>
                <span className="text-sm text-doux">{etiquette(e.date)}</span>
                <span className="sr-only">
                  Vata {p.vata} %, Pitta {p.pitta} %, Kapha {p.kapha} %
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption className="flex flex-wrap gap-4 text-[15px]">
        {DOSHAS.map((d) => (
          <span key={d} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="h-3 w-3 rounded-[3px]" style={{ background: COULEUR_DOSHA[d] }} />
            {NOM_DOSHA[d]}
          </span>
        ))}
      </figcaption>
    </figure>
  );
};

const TableauDeBord = () => {
  const compte = useCompte();
  const [confirmer, setConfirmer] = useState(false);
  const { user, nature: natureBilan, etats } = compte;
  const nature = natureBilan ? partsEntieres(natureBilan.scores) : null;
  const dernier = etats[etats.length - 1];
  const etat = dernier ? partsEntieres(dernier.scores) : null;
  const comparaison = dernier ? comparerEtat(dernier.scores, nature ?? undefined) : null;
  const cible: DoshaKey | null = comparaison?.type === "exces" ? comparaison.dosha : nature ? doshaDominant(nature) : null;
  const saison = NOM_SAISON[saisonDuMoment().id];
  const recettes = filtrerRecettes(RECETTES, { dosha: cible, saison })
    .sort((a, b) => Number(a.membres) - Number(b.membres))
    .slice(0, 4);

  const onglets = [
    ["Mon suivi", "#suivi"],
    ["Mon programme", "#programme"],
    ["Recettes", "#recettes"],
    ["Mon compte", "#compte"],
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="mx-auto flex max-w-[1220px] flex-wrap items-end justify-between gap-6 px-4 pb-6 pt-8 sm:px-10">
          <div className="flex flex-col gap-1.5">
            <p className="m-0 text-doux">Espace membre</p>
            <h1 className="m-0 text-[clamp(2.4rem,5.4vw,4.25rem)] leading-none">
              Bonjour{user?.firstName ? ` ${user.firstName}` : ""}
            </h1>
          </div>
          <nav aria-label="Espace membre" className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {onglets.map(([t, h]) => (
              <a
                key={h}
                href={h}
                className="inline-flex min-h-10 shrink-0 items-center rounded-full px-4 text-[15px] font-bold no-underline shadow-[inset_0_0_0_1.5px_hsl(var(--trait))] hover:bg-surface"
              >
                {t}
              </a>
            ))}
          </nav>
        </section>

        <section id="suivi" className="mx-auto grid max-w-[1220px] scroll-mt-24 gap-6 px-4 pb-12 pt-6 sm:px-10 md:grid-cols-2">
          <div className="relative flex flex-col gap-3.5 rounded-[18px] bg-carte p-7 shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:p-8">
            <div className="absolute right-6 top-5">
              <Sceau size={60} rotate={10} fond="hsl(var(--aubergine))" reserve="hsl(var(--pistache))" />
            </div>
            <p className="m-0 text-doux">Ma constitution</p>
            {nature ? (
              <>
                <span className="pr-16 font-display text-[clamp(2.4rem,5vw,3.5rem)] leading-none">{libelleProfil(nature)}</span>
                <p className="m-0">
                  Vata {nature.vata} % · Pitta {nature.pitta} % · Kapha {nature.kapha} %
                </p>
                <p className="m-0 text-sm text-doux">Établie le {dateLongue(natureBilan!.date)}</p>
                <Link to="/profil" className="self-start font-bold underline underline-offset-4">
                  Relire mon portrait
                </Link>
              </>
            ) : (
              <>
                <span className="pr-16 font-display text-[2.2rem] leading-tight">Pas encore connue</span>
                <p className="m-0 text-doux">Vingt questions, environ cinq minutes. À faire une seule fois.</p>
                <Link
                  to="/profil"
                  state={{ depart: "nature" }}
                  className="mt-1 inline-flex min-h-[52px] self-start items-center rounded-buta bg-aubergine px-6 font-bold text-pistache no-underline"
                >
                  Découvrir ma nature
                </Link>
              </>
            )}
          </div>

          <div className="relative flex flex-col gap-3.5 overflow-hidden rounded-[18px] bg-paon p-7 text-pistache sm:p-8">
            <Motif id="dabu" />
            <div className="relative flex flex-col gap-3.5">
              <p className="m-0 text-[#D3E3DE]">{dernier ? `Mon état · ${dateLongue(dernier.date)}` : "Mon état du moment"}</p>
              <span className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05]">
                {comparaison?.type === "exces" ? (
                  <>
                    {NOM_DOSHA[comparaison.dosha]} est <em className="!text-citron">en excès</em>
                  </>
                ) : comparaison?.type === "equilibre" ? (
                  <>
                    Proche de <em className="!text-citron">l'équilibre</em>
                  </>
                ) : comparaison ? (
                  "Pas de dosha en excès"
                ) : (
                  "Pas encore mesuré"
                )}
              </span>
              <p className="m-0 text-[#D3E3DE]">
                {comparaison?.type === "exces" && etat && nature
                  ? `${etat[comparaison.dosha]} % contre ${nature[comparaison.dosha]} % dans votre constitution.`
                  : dernier
                    ? "Refaites le point à chaque saison pour suivre votre état."
                    : "Quinze questions sur vos dernières semaines."}
              </p>
              <Link
                to="/profil"
                className="mt-1 inline-flex min-h-[52px] self-start items-center rounded-buta bg-citron px-6 font-bold text-encre no-underline hover:opacity-90"
              >
                {dernier ? "Refaire le point" : "Faire le point"}
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="m-hist" className="mx-auto grid max-w-[1220px] items-start gap-12 px-4 pb-14 pt-6 sm:px-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 id="m-hist" className="m-0 text-[clamp(1.8rem,3.5vw,2.25rem)]">
              Mon état, saison après saison
            </h2>
            {etats.length ? (
              <>
                <Historique etats={etats} />
                <p className="m-0 text-doux">
                  {etats.length < 2
                    ? "Votre premier bilan est enregistré. Refaites le point à la prochaine saison pour voir votre état évoluer."
                    : fr(`${etats.length} bilans enregistrés. Le dernier, en ${etiquette(dernier!.date).toLowerCase()}, est mis en regard de votre nature.`)}
                </p>
              </>
            ) : (
              <p className="m-0 rounded-2xl bg-surface p-6 text-doux">
                Vos bilans de saison s'afficheront ici. On y voit par exemple Vata monter à l'automne. Faites le point une première fois pour commencer.
              </p>
            )}
          </div>

          <div id="programme" className="flex scroll-mt-24 flex-col gap-4 rounded-[18px] bg-surface p-7 sm:p-8">
            <p className="m-0 font-bold text-aubergine">Bientôt dans votre espace</p>
            <h2 className="m-0 text-[clamp(1.7rem,3vw,2.1rem)] leading-[1.1]">{PROGRAMME_AUTOMNE.titre}</h2>
            <div className="flex items-center gap-4 rounded-[14px] bg-carte p-4 shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
              <Chai size={72} decorative />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-doux">Exemple de geste</span>
                <span className="font-display text-[1.3rem] leading-tight">Un chaï l'après-midi, à la place du café</span>
              </div>
            </div>
            <p className="m-0 text-doux">
              Le programme s'ouvrira ici, avec votre progression jour après jour.
            </p>
            <Link
              to="/au-quotidien/programme"
              className="inline-flex min-h-[52px] self-start items-center gap-2.5 rounded-buta bg-aubergine px-6 font-bold text-pistache no-underline hover:opacity-90"
            >
              Voir le programme
            </Link>
          </div>
        </section>

        <section id="recettes" aria-labelledby="m-recettes" className="mx-auto flex max-w-[1220px] scroll-mt-24 flex-col gap-6 px-4 pb-16 pt-6 sm:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="m-recettes" className="m-0 text-[clamp(1.8rem,3.5vw,2.25rem)]">
              {cible ? `Pour ${NOM_DOSHA[cible]}, cette saison` : "Les recettes de la saison"}
            </h2>
            <Link to={cible ? `/cuisine/recettes?dosha=${cible}` : "/cuisine/recettes"} className="font-bold underline underline-offset-4">
              Toutes les recettes
            </Link>
          </div>
          <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {recettes.map((r) => {
              const contenu = (
                <>
                  <div role="img" aria-label={`Photo : ${r.nom}`} className="h-[160px] rounded-[14px] shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]" style={{ background: r.teinte }} />
                  <span className="font-display text-[1.3rem] leading-tight">{r.nom}</span>
                  <span className="flex items-center gap-2 text-[15px] text-doux">
                    {r.minutes} min ·
                    {r.membres ? (
                      <span className="inline-flex items-center gap-1 font-bold text-paon">
                        <Lock className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" /> Membres
                      </span>
                    ) : (
                      <span className="font-bold text-citron-fonce">Gratuit</span>
                    )}
                  </span>
                </>
              );
              return (
                <li key={r.id}>
                  {RECETTES_COMPLETES[r.id] ? (
                    <Link to={`/cuisine/recettes/${r.id}`} className="flex flex-col gap-2.5 no-underline">
                      {contenu}
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-2.5">{contenu}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section id="compte" aria-labelledby="m-compte" className="scroll-mt-24 bg-surface">
          <div className="mx-auto grid max-w-[1220px] gap-8 px-4 py-14 sm:px-10 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h2 id="m-compte" className="m-0 text-[clamp(1.8rem,3.5vw,2.25rem)]">
                Mon compte
              </h2>
              <p className="m-0">{user?.email}</p>
              <p className="m-0 text-doux">Compte gratuit. Vous serez prévenu avant l'arrivée de l'abonnement payant.</p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <button
                type="button"
                onClick={compte.deconnexion}
                className="inline-flex min-h-[52px] items-center rounded-buta border-2 border-encre px-6 font-bold hover:bg-encre hover:text-pistache"
              >
                Me déconnecter
              </button>
              {confirmer ? (
                <span className="flex flex-wrap items-center gap-3 text-[15px]">
                  <span>Effacer votre nature et tous vos bilans ?</span>
                  <button
                    type="button"
                    onClick={() => {
                      void compte.effacerTout();
                      setConfirmer(false);
                    }}
                    className="min-h-11 font-bold text-aubergine underline underline-offset-4"
                  >
                    Oui, tout effacer
                  </button>
                  <button type="button" onClick={() => setConfirmer(false)} className="min-h-11 font-bold underline underline-offset-4">
                    Annuler
                  </button>
                </span>
              ) : (
                <button type="button" onClick={() => setConfirmer(true)} className="min-h-11 text-[15px] font-bold text-doux underline underline-offset-4">
                  Effacer mon historique
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TableauDeBord;
