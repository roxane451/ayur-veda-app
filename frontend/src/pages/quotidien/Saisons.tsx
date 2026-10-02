import { CONTENU_PAYANT } from "@/lib/offre";
import { Link, useSearchParams } from "react-router-dom";
import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Chai } from "@/components/brand/Illustrations";
import Photo from "@/components/brand/PhotoPlaceholder";
import { Deva } from "@/components/comprendre/Commun";
import { Fil, PageRubrique } from "@/components/Rubrique";
import { PAGES_QUOTIDIEN } from "@/components/quotidien/pages";
import Roue from "@/components/quotidien/Roue";
import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import {
  EQUILIBRE_DOSHA,
  PROGRAMME_AUTOMNE,
  SAISONS_DETAIL,
  saisonDuMoment,
} from "@/data/saisons";
import { NOM_DOSHA } from "@/lib/doshaLogic";
import { BandePlantes, Frise, ListeButa } from "@/components/brand/Listes";

const Moment = ({
  heures,
  titre,
  items,
}: {
  heures: string;
  titre: string;
  items: string[];
}) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-sm font-bold text-doux">{heures}</span>
    <h4 className="m-0 mb-1 text-[1.6rem]">{titre}</h4>
    <ul className="m-0 list-none p-0">
      {items.map((t) => (
        <li key={t} className="border-t border-dashed border-trait py-2.5">
          {fr(t)}
        </li>
      ))}
    </ul>
  </div>
);

const Saisons = () => {
  const actuelle = saisonDuMoment().id;
  const [params, setParams] = useSearchParams();
  const id =
    SAISONS_DETAIL.find((s) => s.id === params.get("saison"))?.id ?? actuelle;
  const s = SAISONS_DETAIL.find((x) => x.id === id)!;
  const nomLong =
    s.id === "ete"
      ? "L'été"
      : s.id === "automne"
        ? "L'automne"
        : s.id === "hiver"
          ? "L'hiver"
          : "Le printemps";
  const deLa =
    s.id === "printemps"
      ? "du printemps"
      : s.id === "ete"
        ? "d'été"
        : s.id === "hiver"
          ? "d'hiver"
          : "d'automne";

  return (
    <PageRubrique label="Au quotidien" pages={PAGES_QUOTIDIEN}>
      <section className="mx-auto grid max-w-[1220px] items-center gap-10 px-4 pb-12 pt-6 sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:pb-16">
        <div className="flex flex-col gap-5">
          <Fil
            rubrique="Au quotidien"
            href="/au-quotidien"
            page="Les saisons"
          />
          <p className="m-0 flex items-baseline gap-3.5">
            <Deva>ऋतुचर्या</Deva>
            <span className="italic text-doux">ritucharya</span>
          </p>
          <h1 className="m-0 text-[clamp(2.6rem,5.6vw,4.25rem)] leading-[0.95]">
            Vivre avec les saisons
          </h1>
          <p className="m-0 max-w-[36ch] text-xl text-doux">
            Chaque saison fait monter un dosha. En adaptant ses repas et ses
            journées, on l'empêche de s'accumuler.
          </p>
          <p className="m-0 max-w-[36ch]">
            Nous sommes en{" "}
            <b>
              {SAISONS_DETAIL.find(
                (x) => x.id === actuelle,
              )!.court.toLowerCase()}
            </b>
            , la saison de{" "}
            {NOM_DOSHA[SAISONS_DETAIL.find((x) => x.id === actuelle)!.dosha]}.
            Touchez une autre saison sur la roue pour lire ses conseils.
          </p>
          <p className="m-0 max-w-[46ch] text-[15px] text-doux">
            Les textes anciens de l'Ayurveda, la Charaka Samhita et la Sushruta
            Samhita, décrivent six saisons propres au climat de l'Inde du Nord.
            Nous les ramenons ici aux quatre saisons européennes, comme le font
            la plupart des praticiens en Occident. Cette correspondance est une
            adaptation, pas une règle des textes.
          </p>
        </div>
        <Roue
          choisie={id}
          actuelle={actuelle}
          onChoisir={(x) =>
            setParams(x === actuelle ? {} : { saison: x }, { replace: true })
          }
        />
      </section>
      <Bande />

      <div
        id="detail-saison"
        role="tabpanel"
        aria-labelledby="s-titre"
        key={id}
      >
        <section className="mx-auto flex max-w-[1220px] flex-col gap-16 px-4 py-16 sm:px-10 md:py-[88px]">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
            <div className="flex flex-col gap-4">
              <h2
                id="s-titre"
                className="m-0 text-[clamp(3rem,6.4vw,5.25rem)] leading-[0.9]"
              >
                {nomLong}
              </h2>
              <p className="m-0 flex items-center gap-2.5 font-bold">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full shadow-[0_0_0_1.5px_hsl(var(--encre))]"
                  style={{ background: COULEUR_DOSHA[s.dosha] }}
                />
                Saison de {NOM_DOSHA[s.dosha]}, {s.periode}
              </p>
              <Frise mots={s.qualites} label={`Les qualités de la saison`} />
              <p className="m-0 max-w-[46ch] text-[19px]">{fr(s.intro)}</p>
            </div>
            <div className="relative h-[300px] md:h-[380px]">
              <Photo description={s.photo} arche />
              <div className="absolute -right-2 bottom-2 md:-right-2.5 md:bottom-2.5">
                <Chai
                  size={150}
                  decorative
                  className="h-auto w-[110px] md:w-[150px]"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-10 rounded-[18px] bg-carte p-6 shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:p-10 md:grid-cols-[minmax(0,1.3fr)_2px_minmax(0,1fr)] md:gap-12">
            <ListeButa
              titre="À mettre dans l'assiette"
              items={s.assiette}
              couleur="#6E7F1A"
              classeTitre="text-citron-fonce"
            />
            <div aria-hidden="true" className="hidden bg-trait md:block" />
            <ListeButa
              titre="À limiter"
              items={s.limiter}
              couleur="#5B2A4E"
              classeTitre="text-aubergine"
              creux
            />
          </div>

          <div className="flex flex-col gap-7">
            <h3 className="m-0 text-[clamp(2rem,4vw,2.75rem)]">
              Une journée {deLa}
            </h3>
            <div className="grid gap-10 md:grid-cols-3">
              <Moment heures="6 h – 10 h" titre="Le matin" items={s.matin} />
              <Moment
                heures="10 h – 18 h"
                titre="Dans la journée"
                items={s.journee}
              />
              <Moment heures="18 h – 22 h" titre="Le soir" items={s.soir} />
            </div>
            <Link
              to="/au-quotidien/journee"
              className="self-start font-bold underline underline-offset-4"
            >
              Le rythme de la journée, heure par heure
            </Link>
          </div>
        </section>
        {/* [À FAIRE] lier aux fiches plantes quand elles existeront */}
        <BandePlantes
          titre="Les plantes de la saison"
          note="À utiliser avec les précautions de leurs fiches, qui arrivent dans la rubrique La cuisine."
          plantes={s.plantes.map((p) => ({
            nom: p.nom,
            texte: p.texte.charAt(0).toUpperCase() + p.texte.slice(1),
          }))}
        />
      </div>

      <section aria-labelledby="s-toute" className="bg-surface">
        <div className="mx-auto flex max-w-[1220px] flex-col gap-9 px-4 py-16 sm:px-10 md:py-[88px]">
          <h2 id="s-toute" className="m-0 text-[clamp(2.2rem,4.4vw,3.25rem)]">
            Ce qui aide chaque dosha, toute l'année
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {EQUILIBRE_DOSHA.map((e) => (
              <ListeButa
                key={e.dosha}
                titre={NOM_DOSHA[e.dosha]}
                items={e.conseils}
                couleur={COULEUR_DOSHA[e.dosha]}
                classeTitre="!font-display !not-italic !uppercase text-encre"
              />
            ))}
          </div>
        </div>
      </section>

      {CONTENU_PAYANT && (
      <section className="mx-auto grid max-w-[1220px] items-center gap-10 px-4 py-16 sm:px-10 md:grid-cols-2 md:py-[72px]">
        <div className="flex flex-col gap-2.5">
          <h2 className="m-0 text-[clamp(2rem,4vw,2.5rem)] leading-[1.05]">
            Le programme d'automne, jour par jour
          </h2>
          <p className="m-0 text-doux">
            Trois semaines pour apaiser Vata, avec un rappel chaque matin.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link
            to="/au-quotidien/programme"
            className="inline-flex min-h-[52px] items-center rounded-buta bg-aubergine px-6 font-bold text-pistache no-underline hover:opacity-90"
          >
            Voir le programme
          </Link>
          <Link
            to="/espace-membre"
            className="inline-flex min-h-[52px] items-center rounded-buta border-2 border-encre px-6 font-bold no-underline hover:bg-encre hover:text-pistache"
          >
            Découvrir l'espace membre
          </Link>
        </div>
      </section>
      )}
    </PageRubrique>
  );
};

export default Saisons;
