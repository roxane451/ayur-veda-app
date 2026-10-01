import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Logo from "@/components/brand/Logo";
import Sceau from "@/components/brand/Sceau";
import { Motif } from "@/components/brand/BrandDefs";
import { SoleilLune } from "@/components/brand/Illustrations";
import { ECHELLE, PRAKRITI, VIKRITI } from "@/data/quiz";
import {
  DOSHAS,
  NOM_DOSHA,
  comparerEtat,
  doshaDominant,
  libelleProfil,
  noteEcart,
  partsEntieres,
  scoresPrakriti,
  scoresVikriti,
  type DoshaKey,
  type DoshaScores,
} from "@/lib/doshaLogic";
import { ecrireProfil, effacerProfil, lireProfil, type ProfilEnregistre } from "@/lib/profilStorage";
import { CONSEILS, COULEUR_DOSHA, PORTRAITS, PORTRAIT_TRIDOSHA, fr } from "./conseils";

export type Partie = "p" | "v";
type Ecran = "accueil" | "question" | "pause" | "resultat";

const DELAI_AUTO = 320; // ms : le temps de voir sa réponse cochée avant de passer à la suivante

const aujourdhui = () => new Date().toISOString().slice(0, 10);

interface QuizProps {
  /** Prévenu quand on entre ou sort des questions (la page masque alors le menu). */
  onEnCours?: (enCours: boolean) => void;
  /** Démarrer directement la partie 1, avec éventuellement une première réponse déjà cochée (depuis l'accueil). */
  depart?: { partie: Partie; premier?: number };
}

const Quiz = ({ onEnCours, depart }: QuizProps) => {
  const [profil, setProfil] = useState<ProfilEnregistre>(() => lireProfil());
  const [ecran, setEcran] = useState<Ecran>(() =>
    depart ? "question" : lireProfil().nature ? "resultat" : "accueil",
  );
  const [partie, setPartie] = useState<Partie>(depart?.partie ?? "p");
  const [index, setIndex] = useState(0);
  const [repP, setRepP] = useState<number[][]>([]);
  const [repV, setRepV] = useState<number[]>([]);
  const [selection, setSelection] = useState<number[]>(
    depart?.premier !== undefined ? [depart.premier] : [],
  );
  const minuteur = useRef<number>();
  const titre = useRef<HTMLHeadingElement>(null);

  useEffect(() => () => window.clearTimeout(minuteur.current), []);
  useEffect(() => onEnCours?.(ecran === "question"), [ecran, onEnCours]);

  // Le focus suit la question : utile au clavier et aux lecteurs d'écran.
  useEffect(() => {
    if (ecran !== "accueil") titre.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [ecran, index, partie]);

  const estP = partie === "p";
  const total = estP ? PRAKRITI.length : VIKRITI.length;

  const commencer = (p: Partie) => {
    window.clearTimeout(minuteur.current);
    setPartie(p);
    setIndex(0);
    setSelection([]);
    if (p === "p") setRepP([]);
    else setRepV([]);
    setEcran("question");
  };

  const ouvrir = (i: number, reponses: number[][] | number[]) => {
    const r = reponses[i];
    setIndex(i);
    setSelection(r === undefined ? [] : Array.isArray(r) ? [...r] : [r]);
  };

  const terminer = (p: Partie, reponses: number[][] | number[]) => {
    const suivant = { ...profil };
    if (p === "p") {
      const scores = scoresPrakriti(
        (reponses as number[][]).map((sel, n) => sel.map((j) => PRAKRITI[n].options[j])),
      );
      suivant.nature = { scores, date: aujourdhui() };
    } else {
      const scores = scoresVikriti(
        (reponses as number[]).map((frequence, n) => ({ dosha: VIKRITI[n].dosha, frequence })),
      );
      suivant.etat = { scores, date: aujourdhui() };
    }
    setProfil(suivant);
    ecrireProfil(suivant);
    setSelection([]);
    setIndex(0);
    setEcran(p === "p" && !suivant.etat ? "pause" : "resultat");
  };

  const valider = (sel: number[]) => {
    if (!sel.length) return;
    if (estP) {
      const r = [...repP];
      r[index] = sel;
      setRepP(r);
      if (index + 1 < total) ouvrir(index + 1, r);
      else terminer("p", r);
    } else {
      const r = [...repV];
      r[index] = sel[0];
      setRepV(r);
      if (index + 1 < total) ouvrir(index + 1, r);
      else terminer("v", r);
    }
  };

  const choisir = (j: number) => {
    if (estP) {
      setSelection((s) => {
        if (s.includes(j)) return s.filter((x) => x !== j);
        const n = [...s, j];
        return n.length > 2 ? n.slice(1) : n;
      });
    } else {
      setSelection([j]);
      window.clearTimeout(minuteur.current);
      minuteur.current = window.setTimeout(() => valider([j]), DELAI_AUTO);
    }
  };

  const revenir = () => {
    window.clearTimeout(minuteur.current);
    if (index > 0) ouvrir(index - 1, estP ? repP : repV);
  };

  const quitter = () => {
    window.clearTimeout(minuteur.current);
    setEcran(profil.nature ? "resultat" : "accueil");
  };

  const recommencer = () => {
    effacerProfil();
    setProfil({});
    setRepP([]);
    setRepV([]);
    setEcran("accueil");
  };

  if (ecran === "question") {
    return (
      <QuestionEcran
        titre={titre}
        estP={estP}
        index={index}
        total={total}
        selection={selection}
        onChoisir={choisir}
        onSuivante={() => valider(selection)}
        onRevenir={revenir}
        onQuitter={quitter}
      />
    );
  }

  if (ecran === "pause" && profil.nature) {
    const parts = partsEntieres(profil.nature.scores);
    return (
      <section className="mx-auto flex max-w-[760px] flex-col gap-6 px-4 pb-24 pt-10 sm:px-10">
        <p className="m-0 font-bold text-aubergine">Partie 1 terminée</p>
        <h1 ref={titre} tabIndex={-1} className="m-0 text-[clamp(2.5rem,9vw,3.5rem)] leading-none outline-none">
          {libelleProfil(parts)}
        </h1>
        <p className="m-0 text-xl text-doux">
          C'est votre nature. Maintenant, voyons comment vous allez en ce moment&nbsp;: 15 questions sur les dernières
          semaines.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => commencer("v")}
            className="inline-flex min-h-[54px] items-center rounded-full bg-aubergine px-7 font-bold text-pistache hover:opacity-90"
          >
            Continuer avec la partie 2
          </button>
          <button type="button" onClick={() => setEcran("resultat")} className="font-bold underline underline-offset-4">
            Voir seulement ma nature
          </button>
        </div>
      </section>
    );
  }

  if (ecran === "resultat" && (profil.nature || profil.etat)) {
    return (
      <Resultat
        titre={titre}
        profil={profil}
        onNature={() => commencer("p")}
        onEtat={() => commencer("v")}
        onRecommencer={recommencer}
      />
    );
  }

  return <Accueil onNature={() => commencer("p")} onEtat={() => commencer("v")} />;
};

export default Quiz;

/* ─────────────────────────── Accueil ─────────────────────────── */

const Accueil = ({ onNature, onEtat }: { onNature: () => void; onEtat: () => void }) => (
  <section className="mx-auto flex max-w-[1220px] flex-col gap-10 px-4 pb-24 pt-8 sm:px-10">
    <div className="flex max-w-[680px] flex-col gap-4">
      <Sceau size={84} />
      <h1 className="m-0 text-[clamp(2.1rem,6vw,3.1rem)]">
        Deux questionnaires, <em>deux questions</em> différentes.
      </h1>
      <p className="m-0 text-xl text-doux">
        Votre nature ne change pas au cours de la vie. Votre état, lui, change avec les saisons. C'est l'écart entre
        les deux qui dit quoi rééquilibrer.
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-3.5 rounded-[18px] bg-paon px-8 py-9 text-pistache">
        <span className="text-[15px] font-bold text-citron">Commencez par ici</span>
        <h2 className="m-0 text-[1.9rem]">
          Ma nature <em className="!text-citron">prakriti</em>
        </h2>
        <p className="m-0">Qui êtes-vous depuis toujours, quand tout va bien&nbsp;?</p>
        <p className="m-0 text-[15px] text-[#D3E3DE]">20 questions · environ 5 minutes · une fois pour toutes</p>
        <button
          type="button"
          onClick={onNature}
          className="mt-1 inline-flex min-h-[54px] self-start items-center rounded-full bg-citron px-7 font-bold text-encre hover:opacity-90"
        >
          Découvrir ma nature
        </button>
      </div>
      <div className="flex flex-col gap-3.5 rounded-[18px] bg-carte px-8 py-9 shadow-[inset_0_0_0_2px_hsl(var(--encre))]">
        <span className="text-[15px] font-bold text-aubergine">Puis à chaque saison</span>
        <h2 className="m-0 text-[1.9rem]">
          Mon état du moment <em>vikriti</em>
        </h2>
        <p className="m-0">Comment allez-vous ces dernières semaines&nbsp;?</p>
        <p className="m-0 text-[15px] text-doux">15 questions · environ 3 minutes · à refaire à chaque saison</p>
        <button
          type="button"
          onClick={onEtat}
          className="mt-1 inline-flex min-h-[54px] self-start items-center rounded-full border-2 border-encre px-7 font-bold hover:bg-encre hover:text-pistache"
        >
          Faire le point
        </button>
      </div>
    </div>
  </section>
);

/* ─────────────────────────── Une question ─────────────────────────── */

interface QuestionProps {
  titre: React.RefObject<HTMLHeadingElement>;
  estP: boolean;
  index: number;
  total: number;
  selection: number[];
  onChoisir: (j: number) => void;
  onSuivante: () => void;
  onRevenir: () => void;
  onQuitter: () => void;
}

const QuestionEcran = ({
  titre,
  estP,
  index,
  total,
  selection,
  onChoisir,
  onSuivante,
  onRevenir,
  onQuitter,
}: QuestionProps) => {
  const q = estP ? PRAKRITI[index] : VIKRITI[index];
  const libelle = estP ? PRAKRITI[index].question : `${VIKRITI[index].texte} ?`;
  const options = estP ? PRAKRITI[index].options.map((o) => o.texte) : [...ECHELLE];
  const etapes = useMemo(
    () => Array.from(new Set((estP ? PRAKRITI : VIKRITI).map((x) => x.etape))),
    [estP],
  );

  return (
    <div className="min-h-[100dvh]">
      <header className="mx-auto flex max-w-[1220px] items-center justify-between gap-4 px-4 pb-2 pt-[calc(1rem+env(safe-area-inset-top))] sm:px-10">
        <Link to="/" aria-label="Ayur-Veda, accueil">
          <Logo size={28} />
        </Link>
        <button type="button" onClick={onQuitter} className="min-h-11 font-bold underline underline-offset-4">
          Quitter
        </button>
      </header>

      <main className="mx-auto grid max-w-[1220px] items-start gap-7 px-4 pb-24 pt-4 sm:px-10 md:grid-cols-2 md:gap-14 md:pt-6">
        <aside className="flex flex-col gap-5">
          <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-[1.6rem]">{estP ? "Ma nature" : "Mon état du moment"}</span>
            <span className="italic text-aubergine">{estP ? "prakriti" : "vikriti"}</span>
          </p>
          <ol aria-label="Étapes" className="m-0 hidden list-none flex-wrap gap-2 p-0 sm:flex">
            {etapes.map((e) => (
              <li
                key={e}
                aria-current={e === q.etape ? "step" : undefined}
                className={`inline-flex min-h-9 items-center rounded-full px-4 text-[15px] font-bold ${
                  e === q.etape ? "bg-encre text-pistache" : "text-doux shadow-[inset_0_0_0_1.5px_hsl(var(--trait))]"
                }`}
              >
                {e}
              </li>
            ))}
          </ol>

          {estP ? (
            <div className="rounded-l rounded-r-2xl bg-citron px-5 py-4 sm:px-7 sm:py-6">
              <p className="m-0 font-display text-[1.15rem] leading-snug">
                Pensez à vous <em className="font-body normal-case italic tracking-normal">depuis toujours</em>, quand
                vous allez bien.
              </p>
              <p className="m-0 mt-2 hidden text-base sm:block">
                Pas à cette semaine, ni à une période difficile. En cas de doute, demandez-vous comment vous étiez à
                vingt ans.
              </p>
            </div>
          ) : (
            <div className="relative flex flex-col gap-3.5 overflow-hidden rounded-2xl bg-paon px-5 py-4 text-pistache sm:p-7">
              <Motif id="dabu" />
              <div className="relative hidden sm:block">
                <SoleilLune size={84} stroke="#F3F5E6" decorative />
              </div>
              <p className="relative m-0 font-display text-2xl leading-tight">
                Ces dernières <em className="font-body normal-case italic tracking-normal text-citron">semaines</em>…
              </p>
              <p className="relative m-0 hidden text-[#D3E3DE] sm:block">
                Répondez selon ce que vous avez vécu depuis un mois environ, même si ça ne vous ressemble pas
                d'habitude.
              </p>
            </div>
          )}

          <p className="m-0 text-[15px] text-doux">
            Question {index + 1} sur {total}
          </p>
          <div
            role="progressbar"
            aria-label="Progression"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={index + 1}
            className="h-2.5 overflow-hidden rounded-full bg-surface"
          >
            <div
              className="h-full bg-aubergine transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${((index + 1) * 100) / total}%` }}
            />
          </div>
        </aside>

        <section
          key={`${estP}-${index}`}
          className="flex flex-col gap-3.5 motion-safe:animate-fade-in"
          aria-labelledby="question-titre"
        >
          <p className="m-0 text-[15px] font-bold uppercase tracking-[0.12em] text-aubergine">{q.etape}</p>
          <h1
            id="question-titre"
            ref={titre}
            tabIndex={-1}
            className="m-0 mb-2.5 text-[clamp(1.6rem,4vw,2.3rem)] outline-none"
          >
            {fr(libelle)}
          </h1>
          <div role="group" aria-labelledby="question-titre" className="flex flex-col gap-3.5">
            {options.map((texte, j) => {
              const pris = selection.includes(j);
              return (
                <button
                  key={texte}
                  type="button"
                  aria-pressed={pris}
                  onClick={() => onChoisir(j)}
                  className={`flex min-h-16 items-center gap-4 rounded-[14px] px-5 py-2.5 text-left transition-colors active:scale-[0.99] motion-reduce:transition-none ${
                    pris
                      ? "bg-paon text-pistache"
                      : "bg-carte shadow-[inset_0_0_0_1.5px_hsl(var(--encre))] hover:bg-surface"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center ${estP ? "rounded-[6px]" : "rounded-full"} ${
                      pris ? "bg-citron" : "shadow-[inset_0_0_0_2px_hsl(var(--encre))]"
                    }`}
                  >
                    {pris && <Check className="h-3.5 w-3.5 text-paon" strokeWidth={3} />}
                  </span>
                  <span>{texte}</span>
                </button>
              );
            })}
          </div>
          <p className="m-0 mt-1.5 text-base text-doux">
            {estP
              ? fr("Deux réponses vous ressemblent autant ? Cochez les deux : les points sont partagés.")
              : fr("Ces dernières semaines, à quelle fréquence ? Touchez une réponse pour passer à la suite.")}
          </p>
          <div className="mt-4 flex min-h-[54px] items-center justify-between gap-4">
            {index > 0 ? (
              <button type="button" onClick={onRevenir} className="min-h-11 font-bold underline underline-offset-4">
                Question précédente
              </button>
            ) : (
              <span />
            )}
            {estP && selection.length > 0 && (
              <button
                type="button"
                onClick={onSuivante}
                className="inline-flex min-h-[54px] items-center gap-2.5 rounded-full bg-aubergine px-7 font-bold text-pistache hover:opacity-90"
              >
                {index + 1 === total ? "Voir ma nature" : "Suivante"} <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

/* ─────────────────────────── Résultat ─────────────────────────── */

interface ResultatProps {
  titre: React.RefObject<HTMLHeadingElement>;
  profil: ProfilEnregistre;
  onNature: () => void;
  onEtat: () => void;
  onRecommencer: () => void;
}

const dateCourte = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

const Resultat = ({ titre, profil, onNature, onEtat, onRecommencer }: ResultatProps) => {
  const nature = profil.nature ? partsEntieres(profil.nature.scores) : undefined;
  const etatScores: DoshaScores | undefined = profil.etat?.scores;
  const etat = etatScores ? partsEntieres(etatScores) : undefined;
  const comparaison = etatScores ? comparerEtat(etatScores, nature) : undefined;
  const dominant = nature ? doshaDominant(nature) : undefined;
  const cible: DoshaKey | undefined = comparaison?.type === "exces" ? comparaison.dosha : dominant;

  let phrase = "Pas encore mesuré";
  let detail = "Répondez à la partie 2 pour comparer votre état à votre nature.";
  if (comparaison?.type === "equilibre") {
    phrase = "Vous êtes proche de votre équilibre";
    detail = "Vous avez signalé très peu de gênes ces dernières semaines.";
  } else if (comparaison?.type === "exces" && etat) {
    phrase = `${NOM_DOSHA[comparaison.dosha]} est en excès`;
    detail = nature
      ? `${NOM_DOSHA[comparaison.dosha]} atteint ${etat[comparaison.dosha]} %, contre ${nature[comparaison.dosha]} % dans votre nature.`
      : `${NOM_DOSHA[comparaison.dosha]} domine vos gênes du moment.`;
  } else if (comparaison?.type === "reparti") {
    phrase = "Pas de dosha nettement en excès";
    detail = "Vos gênes sont réparties entre les trois doshas. Refaites le point dans quelques semaines.";
  }

  return (
    <section className="mx-auto flex max-w-[1220px] flex-col gap-9 px-4 pb-24 pt-6 sm:px-10">
      {nature && dominant ? (
        <div className="flex flex-col gap-2.5">
          <p className="m-0 font-bold text-aubergine">Votre nature</p>
          <h1 ref={titre} tabIndex={-1} className="m-0 text-[clamp(2.5rem,9vw,4rem)] leading-none outline-none">
            {libelleProfil(nature)}
          </h1>
          <p className="m-0 max-w-[56ch] text-xl text-doux">
            {fr(libelleProfil(nature) === "Tridosha" ? PORTRAIT_TRIDOSHA : PORTRAITS[dominant])}
          </p>
          {profil.nature && <p className="m-0 text-sm text-doux">Établie le {dateCourte(profil.nature.date)}</p>}
        </div>
      ) : (
        <h1 ref={titre} tabIndex={-1} className="m-0 text-[clamp(2rem,6vw,3rem)] outline-none">
          Votre état du moment
        </h1>
      )}

      <div className="grid gap-10 rounded-[18px] bg-carte p-[clamp(22px,4vw,36px)] shadow-[inset_0_0_0_2px_hsl(var(--encre))] md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="m-0 font-bold text-aubergine">Votre état du moment</p>
          <h2 className="m-0 font-body text-[2.2rem] normal-case leading-tight tracking-normal">{phrase}</h2>
          <p className="m-0 text-doux">{fr(detail)}</p>
          {profil.etat && <p className="m-0 text-sm text-doux">Mesuré le {dateCourte(profil.etat.date)}</p>}
        </div>
        <ul className="m-0 flex list-none flex-col gap-5 p-0" aria-label="Les trois doshas">
          {DOSHAS.map((d) => (
            <li key={d} className="grid grid-cols-[64px_minmax(0,1fr)] items-start gap-4">
              <span className="font-display text-lg leading-[1.6]">{NOM_DOSHA[d]}</span>
              <div className="flex flex-col gap-1.5">
                {nature && <Barre valeur={nature[d]} couleur={COULEUR_DOSHA[d]} pale libelle={`nature ${nature[d]} %`} />}
                {etat && <Barre valeur={etat[d]} couleur={COULEUR_DOSHA[d]} libelle={`en ce moment ${etat[d]} %`} />}
                {nature && etat && <span className="text-sm text-doux">{fr(noteEcart(nature[d], etat[d]))}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {cible && (
        <div className="flex flex-col gap-3.5">
          <h2 className="m-0 text-[2.1rem]">Pour apaiser {NOM_DOSHA[cible]}</h2>
          <ul className="m-0 max-w-[760px] list-none p-0">
            {CONSEILS[cible].map((c) => (
              <li key={c} className="border-t border-dashed border-trait py-3">
                {fr(c)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3.5 rounded-[18px] bg-paon px-6 py-7 text-pistache sm:px-8">
        <p className="m-0 flex-grow basis-64">
          {etat
            ? fr("Refaites le point à la prochaine saison : votre nature reste enregistrée sur cet appareil.")
            : fr("Votre nature est connue. Mesurez maintenant votre état du moment.")}
        </p>
        <button
          type="button"
          onClick={onEtat}
          className="inline-flex min-h-[52px] items-center rounded-full bg-citron px-6 font-bold text-encre hover:opacity-90"
        >
          {etat ? "Refaire le point" : "Faire le point maintenant"}
        </button>
        {!nature && (
          <button
            type="button"
            onClick={onNature}
            className="inline-flex min-h-[52px] items-center rounded-full border-2 border-pistache px-6 font-bold"
          >
            Découvrir ma nature
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 text-[15px] text-doux">
        <p className="m-0">Ce questionnaire donne des repères, il ne remplace pas une consultation.</p>
        <button type="button" onClick={onRecommencer} className="min-h-11 font-bold text-encre underline underline-offset-4">
          Tout effacer et recommencer
        </button>
      </div>
    </section>
  );
};

const Barre = ({ valeur, couleur, libelle, pale }: { valeur: number; couleur: string; libelle: string; pale?: boolean }) => (
  <div className="flex items-center gap-2.5">
    <div className="h-3 flex-grow rounded-full bg-surface" aria-hidden="true">
      <div className="h-full rounded-full" style={{ width: `${valeur}%`, background: couleur, opacity: pale ? 0.45 : 1 }} />
    </div>
    <span className={`w-[140px] shrink-0 whitespace-nowrap text-sm ${pale ? "text-doux" : "font-bold"}`}>{libelle}</span>
  </div>
);
