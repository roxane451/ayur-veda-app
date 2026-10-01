import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bande, Motif } from "@/components/brand/BrandDefs";
import Photo from "@/components/brand/PhotoPlaceholder";
import Sceau from "@/components/brand/Sceau";
import { fr } from "@/components/quiz/conseils";
import { PROGRAMME_AUTOMNE } from "@/data/saisons";

/**
 * L'offre : gratuit, espace membre, contenus à l'unité.
 * [À FAIRE] prix et paiement. En attendant, le compte est gratuit : il garde le profil et le suivi.
 */
const Coche = ({ children, clair }: { children: string; clair?: boolean }) => (
  <li className={`flex gap-3 border-t border-dashed py-2.5 ${clair ? "border-[#2C6B63]" : "border-trait"}`}>
    <Check className={`mt-1 h-5 w-5 shrink-0 ${clair ? "text-citron" : "text-citron-fonce"}`} strokeWidth={2.6} aria-hidden="true" />
    <span>{children}</span>
  </li>
);

const CONTENUS = [
  { type: `Programme · ${PROGRAMME_AUTOMNE.duree}`, titre: PROGRAMME_AUTOMNE.titre, photo: "tasse de chaï et couverture en laine", href: "/au-quotidien/programme", sceau: true },
  { type: "Guide à télécharger", titre: "La routine du matin", photo: "mains, gratte-langue en cuivre et bol d'eau tiède" },
  { type: "Atelier en ligne", titre: "Cuisiner pour son dosha", photo: "plan de travail, épices, casserole de dal" },
];

const FAQ = [
  ["À quoi sert le compte ?", "Il garde votre nature et vos bilans de saison sur tous vos appareils, et montre comment votre état change d'une saison à l'autre."],
  ["Le compte est-il payant ?", "Non, pas pour l'instant. L'abonnement ajoutera les programmes et les recettes de la semaine. Vous serez prévenu avant tout paiement."],
  ["Les contenus achetés à l'unité resteront-ils accessibles ?", "Oui, à vie, même sans abonnement."],
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
            Le quiz, la cuisine et les saisons restent gratuits. Avec un compte, vos bilans sont gardés et vous voyez votre état changer au long de l'année. Les programmes et les guides seront aussi vendus à l'unité.
          </p>
          <p className="m-0 text-[15px]">
            Déjà un compte ?{" "}
            <Link to="/connexion" className="font-bold underline underline-offset-4">
              Me connecter
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1220px] items-stretch gap-6 px-4 pb-20 pt-6 sm:px-10 lg:grid-cols-3">
        <article className="flex flex-col gap-5 rounded-[18px] bg-carte px-7 py-9 shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:px-8">
          <h2 className="m-0 text-[2.1rem] leading-none">Gratuit</h2>
          <p className="m-0 flex flex-col gap-1">
            <span className="font-display text-[2.6rem] leading-none">0 €</span>
            <span className="text-doux">pour toujours</span>
          </p>
          <ul className="m-0 list-none p-0">
            <Coche>Le quiz en deux parties</Coche>
            <Coche>Votre résultat et les premiers conseils</Coche>
            <Coche>La boîte à épices, les mélanges, six recettes</Coche>
            <Coche>Les conseils des quatre saisons</Coche>
          </ul>
          <Link
            to="/profil"
            className="mt-auto inline-flex min-h-[52px] self-start items-center rounded-buta border-2 border-encre px-6 font-bold no-underline hover:bg-encre hover:text-pistache"
          >
            Faire le quiz
          </Link>
        </article>

        <article className="relative flex flex-col gap-5 overflow-hidden rounded-[18px] bg-paon px-7 py-9 text-pistache sm:px-8">
          <Motif id="dabu" />
          <div className="relative flex flex-col gap-5">
            <h2 className="m-0 text-[2.1rem] leading-none">Espace membre</h2>
            <p className="m-0 flex flex-col gap-1">
              <span className="font-display text-[2.6rem] leading-none">Compte gratuit</span>
              <span className="text-[#D3E3DE]">l'abonnement arrive bientôt</span>
            </p>
            <ul className="m-0 list-none p-0">
              <Coche clair>Votre constitution enregistrée</Coche>
              <Coche clair>Le point à chaque saison, et l'historique de vos états</Coche>
              <Coche clair>Bientôt : un programme de 21 jours à chaque saison</Coche>
              <Coche clair>Bientôt : les recettes de la semaine, selon votre dosha</Coche>
            </ul>
          </div>
          <div className="relative mt-auto flex flex-col gap-2.5">
            <Link
              to="/inscription"
              className="inline-flex min-h-[52px] items-center justify-center rounded-buta bg-citron px-6 font-bold text-encre no-underline hover:opacity-90"
            >
              Créer mon compte
            </Link>
            <p className="m-0 text-[15px] text-[#D3E3DE]">Sans carte bancaire. Vous serez prévenu avant tout abonnement payant.</p>
          </div>
        </article>

        <article className="flex flex-col gap-5 rounded-[18px] bg-carte px-7 py-9 shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:px-8">
          <h2 className="m-0 text-[2.1rem] leading-none">À l'unité</h2>
          <p className="m-0 flex flex-col gap-1">
            <span className="font-display text-[2.6rem] leading-none">Bientôt</span>
            <span className="text-doux">par contenu, à vie</span>
          </p>
          <ul className="m-0 list-none p-0">
            <Coche>Les programmes de saison, en 21 jours</Coche>
            <Coche>Des guides, comme la routine du matin</Coche>
            <Coche>Les ateliers en ligne, en direct ou en replay</Coche>
          </ul>
          <a
            href="#contenus"
            className="mt-auto inline-flex min-h-[52px] self-start items-center rounded-buta border-2 border-encre px-6 font-bold no-underline hover:bg-encre hover:text-pistache"
          >
            Voir les contenus
          </a>
        </article>
      </section>
      <Bande variante="paon" />

      <section id="contenus" aria-labelledby="o-catalogue" className="mx-auto flex max-w-[1220px] scroll-mt-24 flex-col gap-8 px-4 py-16 sm:px-10 md:py-[88px]">
        <h2 id="o-catalogue" className="m-0 text-[clamp(2.2rem,4.4vw,3.25rem)]">
          Les contenus à l'unité
        </h2>
        <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
          {CONTENUS.map((c) => {
            const carte = (
              <>
                <div className="relative h-[220px] md:h-[240px]">
                  <Photo description={c.photo} />
                  {c.sceau && (
                    <div className="absolute right-3.5 top-3.5">
                      <Sceau size={60} rotate={10} fond="hsl(var(--aubergine))" reserve="hsl(var(--pistache))" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-bold text-aubergine">{c.type}</span>
                <span className="font-display text-[1.75rem] leading-tight">{c.titre}</span>
                <span className="flex justify-between text-doux">
                  <span>{c.href ? "Bientôt disponible" : "En préparation"}</span>
                </span>
              </>
            );
            return (
              <li key={c.titre}>
                {c.href ? (
                  <Link to={c.href} className="group flex flex-col gap-3.5 no-underline">
                    {carte}
                  </Link>
                ) : (
                  <div className="flex flex-col gap-3.5">{carte}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="o-faq" className="bg-surface">
        <div className="mx-auto flex max-w-[900px] flex-col gap-2 px-4 py-16 sm:px-10 md:py-20">
          <h2 id="o-faq" className="m-0 mb-4 text-[clamp(2rem,4vw,2.5rem)]">
            Questions fréquentes
          </h2>
          {FAQ.map(([q, r], i) => (
            <details key={q} open={i === 0} className="group border-t border-dashed border-trait py-[18px]">
              <summary className="cursor-pointer font-display text-[1.35rem] leading-snug marker:text-aubergine sm:text-2xl">{fr(q)}</summary>
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
