import { Link, Navigate, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";
import { Bande } from "@/components/brand/BrandDefs";
import Photo from "@/components/brand/PhotoPlaceholder";
import { Deva } from "@/components/comprendre/Commun";
import { EffetsEpice, IlluEpice, PageCuisine } from "@/components/cuisine/Commun";
import { fr } from "@/components/quiz/conseils";
import { EPICES, MELANGES } from "@/data/cuisine";

const Trio = ({ titre, sanskrit, valeur, explication }: { titre: string; sanskrit: string; valeur: string; explication: string }) => (
  <div className="flex flex-col gap-1.5 rounded-[14px] bg-carte p-6 shadow-[inset_0_0_0_1.5px_hsl(var(--encre))]">
    <span className="text-sm font-bold text-doux">
      {titre} · <span className="font-normal italic">{sanskrit}</span>
    </span>
    <span className="font-display text-[1.75rem] leading-tight">{valeur}</span>
    <span className="text-[15px] text-doux">{explication}</span>
  </div>
);

const Colonne = ({ titre, items, couleur }: { titre: string; items: string[]; couleur: string }) => (
  <div className="flex flex-col gap-1">
    <h3 className={`m-0 mb-1 font-body text-[1.35rem] normal-case italic tracking-normal ${couleur}`}>{titre}</h3>
    <ul className="m-0 list-none p-0">
      {items.map((t) => (
        <li key={t} className="border-t border-dashed border-trait py-2.5">
          {fr(t)}
        </li>
      ))}
    </ul>
  </div>
);

const Fiche = () => {
  const { id } = useParams();
  const i = EPICES.findIndex((e) => e.id === id);
  if (i < 0) return <Navigate to="/cuisine" replace />;
  const e = EPICES[i];
  const prec = EPICES[(i + EPICES.length - 1) % EPICES.length];
  const suiv = EPICES[(i + 1) % EPICES.length];
  const melanges = MELANGES.filter((m) => e.dansLes.includes(m.id));

  return (
    <PageCuisine>
      <section className="mx-auto grid max-w-[1220px] items-center gap-12 px-4 pb-14 pt-10 sm:px-10 md:grid-cols-2 md:gap-14 md:pb-16">
        <div className="flex flex-col gap-4">
          <p className="m-0 flex flex-wrap items-baseline gap-x-3.5">
            <Deva className="text-[32px] text-aubergine">{e.deva}</Deva>
            <span className="italic text-doux">
              {e.translit} · {e.latin}
            </span>
          </p>
          <h1 className="m-0 text-[clamp(3rem,7.4vw,6rem)] leading-[0.95]">{e.nom}</h1>
          <p className="m-0 max-w-[44ch] text-xl">{fr(e.accroche)}</p>
          <EffetsEpice effets={e.effets} />
        </div>
        <div className="relative ml-6 h-[300px] md:ml-0 md:h-[400px]">
          <Photo description={`${e.nom.toLowerCase()} : la plante et l'épice, en gros plan`} />
          <div className="absolute -left-6 -top-8 -rotate-6 md:-left-6 md:bottom-6 md:top-auto">
            <IlluEpice id={e.id} size={160} className="h-auto w-[120px] md:w-[160px]" />
          </div>
        </div>
      </section>
      <Bande />

      <section aria-labelledby="f-ayur" className="mx-auto flex max-w-[1220px] flex-col gap-5 px-4 py-16 sm:px-10">
        <h2 id="f-ayur" className="m-0 text-[clamp(2rem,4vw,2.5rem)]">
          Selon l'Ayurveda
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Trio titre="La saveur" sanskrit="rasa" valeur={e.rasa} explication="Ce que l'on sent en bouche." />
          <Trio titre="L'effet" sanskrit="vīrya" valeur={e.virya} explication="Ce que l'épice fait au corps : réchauffer ou rafraîchir." />
          <Trio titre="Après digestion" sanskrit="vipāka" valeur={e.vipaka} explication="L'effet qui reste une fois digéré." />
        </div>
        <p className="m-0 text-[15px] text-doux">Ces effets relèvent de l'usage traditionnel et ne remplacent pas un avis médical.</p>
        <p className="m-0 mt-2 max-w-[70ch]">{fr(e.usage)}</p>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-[1220px] gap-10 px-4 py-16 sm:px-10 md:grid-cols-3">
          <Colonne titre="En cuisine" items={e.cuisine} couleur="text-citron-fonce" />
          <Colonne titre="Avec quoi" items={e.avecQuoi} couleur="text-paon" />
          <Colonne titre="Comment la garder" items={e.garder} couleur="text-doux" />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1220px] gap-8 px-4 pb-14 pt-14 sm:px-10 md:grid-cols-2">
        <div className="flex items-start gap-4 rounded-2xl p-6 shadow-[inset_0_0_0_2px_hsl(var(--aubergine))] sm:p-7">
          <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-aubergine" aria-hidden="true" />
          <div className="flex flex-col gap-1.5">
            <h2 className="m-0 text-2xl">Précautions</h2>
            <p className="m-0">{fr(e.precautions)}</p>
          </div>
        </div>
        {melanges.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="m-0 text-2xl">On la retrouve dans</h2>
            <p className="m-0 text-lg">
              {melanges.map((m, i) => (
                <span key={m.id}>
                  {i > 0 && (i === melanges.length - 1 ? " et " : ", ")}
                  <Link to={`/cuisine/melanges#${m.id}`} className="font-bold underline underline-offset-4">
                    {m.nom}
                  </Link>
                </span>
              ))}
              .
            </p>
          </div>
        )}
      </section>

      <nav aria-label="Autres épices" className="mx-auto flex max-w-[1220px] justify-between gap-6 border-t border-dashed border-trait px-4 pb-20 pt-7 sm:px-10">
        <Link to={`/cuisine/epices/${prec.id}`} className="flex flex-col gap-0.5 no-underline">
          <span className="inline-flex items-center gap-1 text-sm text-doux">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Épice précédente
          </span>
          <span className="font-display text-[1.35rem] leading-tight">{prec.nom}</span>
        </Link>
        <Link to={`/cuisine/epices/${suiv.id}`} className="flex flex-col items-end gap-0.5 text-right no-underline">
          <span className="inline-flex items-center gap-1 text-sm text-doux">
            Épice suivante <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-display text-[1.35rem] leading-tight">{suiv.nom}</span>
        </Link>
      </nav>
    </PageCuisine>
  );
};

export default Fiche;
