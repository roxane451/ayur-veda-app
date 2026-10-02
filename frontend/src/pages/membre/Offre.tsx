import { CONTENU_PAYANT } from "@/lib/offre";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Motif } from "@/components/brand/BrandDefs";
import Photo from "@/components/brand/PhotoPlaceholder";
import Sceau from "@/components/brand/Sceau";
import { Poudre, SoleilLune } from "@/components/brand/Illustrations";
import { fr } from "@/components/quiz/conseils";
import { PROGRAMME_AUTOMNE } from "@/data/saisons";

/**
 * L'offre : gratuit, espace membre, contenus à l'unité.
 * [À FAIRE] prix et paiement. En attendant, le compte est gratuit : il garde le profil et le suivi.
 */
const A_VENIR = [
  {
    type: "Guide à imprimer",
    titre: "La routine du matin",
    texte: "La première heure de la journée détaillée pas à pas, du gratte-langue à l'auto-massage.",
    Illu: SoleilLune,
  },
  {
    type: "Atelier en ligne",
    titre: "Cuisiner pour son dosha",
    texte: "Deux heures pour apprendre à composer ses repas selon son dosha, en direct ou en replay.",
    Illu: Poudre,
  },
];

const FAQ = [
  ["À quoi sert le compte ?", "Il garde votre nature et vos bilans de saison sur tous vos appareils, et montre comment votre état change d'une saison à l'autre."],
  CONTENU_PAYANT
    ? ["Le compte est-il payant ?", "Non, pas pour l'instant. L'abonnement ajoutera les programmes et les recettes de la semaine. Vous serez prévenu avant tout paiement."]
    : ["Le compte est-il payant ?", "Non. Il est gratuit et sans carte bancaire."],
  ...(CONTENU_PAYANT ? [["Les contenus achetés à l'unité resteront-ils accessibles ?", "Oui, à vie, même sans abonnement."]] : []),
  ["Le site remplace-t-il une consultation ?", "Non. Il donne des repères pour le quotidien. Pour un trouble qui dure, consultez un professionnel de santé."],
];

const Offre = () => (
  <>
    <Navbar />
    <main>
      <section className="relative overflow-hidden">
        <Motif id="buta" />
        <div className="relative mx-auto flex max-w-[1220px] flex-col gap-5 px-4 pb-14 pt-8 sm:px-10 md:pb-[72px] md:pt-10">
          <h1 className="m-0 max-w-[16ch] text-[clamp(2.6rem,6.4vw,5.25rem)] leading-none">
            Suivre son état <em>d'une saison à l'autre</em>
          </h1>
          <p className="m-0 max-w-[52ch] text-xl text-doux">
            Le quiz, la cuisine et les saisons restent gratuits. Avec un compte, vos bilans sont gardés et vous voyez votre état changer au long de l'année.{CONTENU_PAYANT && " Les programmes et les guides seront aussi vendus à l'unité."}
          </p>
          <p className="m-0 text-[15px]">
            Déjà un compte ?{" "}
            <Link to="/connexion" className="font-bold underline underline-offset-4">
              Me connecter
            </Link>
          </p>
        </div>
      </section>

      <section aria-label="Avec ou sans compte" className="mx-auto grid max-w-[1220px] items-center gap-12 px-4 pb-24 pt-6 sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16">
        <div className="flex flex-col gap-5 md:pl-2">
          <h2 className="m-0 text-[clamp(2rem,3.6vw,2.6rem)] leading-none">Sans compte</h2>
          <p className="m-0 text-lg">
            Le quiz et son résultat, la boîte à épices, les mélanges, six recettes et les conseils des quatre saisons restent en accès libre.
          </p>
          <Link
            to="/profil"
            className="mt-2 inline-flex min-h-[52px] self-start items-center rounded-buta border-2 border-encre px-6 font-bold no-underline hover:bg-encre hover:text-pistache"
          >
            Faire le quiz
          </Link>
        </div>

        <article
          className="relative flex flex-col gap-5 overflow-hidden bg-paon px-8 py-12 text-pistache sm:px-12 sm:py-14"
          style={{ borderRadius: "clamp(56px, 9vw, 120px) 18px clamp(56px, 9vw, 120px) 18px" }}
        >
          <Motif id="dabu" />
          <div className="relative flex flex-col gap-5">
            <h2 className="m-0 text-[clamp(2rem,3.6vw,2.6rem)] leading-none">Avec un compte</h2>
            <p className="m-0 text-lg">
              Votre nature reste enregistrée et vous faites le point à chaque saison, avec l'historique de vos états.
              {CONTENU_PAYANT && " Le programme de 21 jours et les recettes de la semaine s'y ajouteront avec l'abonnement."}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <Link
                to="/inscription"
                className="inline-flex min-h-[52px] items-center rounded-buta bg-citron px-6 font-bold text-encre no-underline hover:opacity-90"
              >
                Créer mon compte
              </Link>
              <p className="m-0 max-w-[30ch] text-[15px] text-[#D3E3DE]">Gratuit, sans carte bancaire.{CONTENU_PAYANT && " Vous serez prévenu avant tout abonnement."}</p>
            </div>
          </div>
        </article>
      </section>

      {CONTENU_PAYANT && (
      <section id="contenus" aria-labelledby="o-catalogue" className="mx-auto flex max-w-[1220px] scroll-mt-24 flex-col gap-8 px-4 py-16 sm:px-10 md:py-[88px]">
        <div className="flex flex-col gap-3">
          <h2 id="o-catalogue" className="m-0 text-[clamp(2.2rem,4.4vw,3.25rem)]">
            Les contenus à l'unité
          </h2>
          <p className="m-0 max-w-[52ch] text-lg text-doux">Chaque contenu s'achètera une fois et restera accessible à vie, avec ou sans abonnement.</p>
        </div>
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="relative">
            <div className="h-[380px] md:h-[560px]">
              <Photo arche description="tasse de chaï et couverture en laine" />
            </div>
            <div className="absolute right-2 top-[38%] md:-right-8">
              <Sceau size={88} rotate={12} fond="hsl(var(--aubergine))" reserve="hsl(var(--pistache))" />
            </div>
          </div>

          <div className="flex flex-col gap-10 md:pt-16">
            <article className="flex flex-col gap-4">
              <span className="font-bold text-aubergine">Programme de {PROGRAMME_AUTOMNE.duree}, bientôt disponible</span>
              <h3 className="m-0 text-[clamp(2rem,4vw,3rem)] leading-[1.02]">{PROGRAMME_AUTOMNE.titre}</h3>
              <p className="m-0 max-w-[46ch] text-lg">{fr(PROGRAMME_AUTOMNE.intro)}</p>
              <Link
                to="/au-quotidien/programme"
                className="mt-1 inline-flex min-h-[52px] self-start items-center rounded-buta bg-aubergine px-6 font-bold text-pistache no-underline hover:opacity-90"
              >
                Voir le programme
              </Link>
            </article>

            <div className="flex flex-col">
              <p className="m-0 pb-3 text-doux">En préparation</p>
              <ul className="m-0 list-none p-0">
                {A_VENIR.map(({ type, titre, texte, Illu }) => (
                  <li key={titre} className="grid grid-cols-[84px_minmax(0,1fr)] items-start gap-5 border-t-2 border-encre py-6 sm:grid-cols-[104px_minmax(0,1fr)]">
                    <span className="flex aspect-square items-center justify-center rounded-buta bg-surface">
                      <Illu size={72} decorative />
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <span className="text-sm font-bold text-aubergine">{type}</span>
                      <span className="font-display text-[1.5rem] leading-tight">{titre}</span>
                      <span className="text-doux">{fr(texte)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      )}

      <section aria-labelledby="o-faq" className="bg-surface">
        <div className="mx-auto flex max-w-[900px] flex-col gap-2 px-4 py-16 sm:px-10 md:py-20">
          <h2 id="o-faq" className="m-0 mb-4 text-[clamp(2rem,4vw,2.5rem)]">
            Questions fréquentes
          </h2>
          {FAQ.map(([q, r], i) => (
            <details key={q} open={i === 0} className="group border-t border-dashed border-trait py-[18px]">
              <summary className="cursor-pointer font-body text-[1.3rem] font-semibold leading-snug marker:text-aubergine sm:text-[1.4rem]">{fr(q)}</summary>
              <p className="m-0 mt-2.5 text-doux">{fr(r)}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Offre;
