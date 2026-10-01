import { Bande } from "@/components/brand/BrandDefs";
import { IlluEpice, PageCuisine, TeteCuisine } from "@/components/cuisine/Commun";
import { fr } from "@/components/quiz/conseils";
import { MELANGES } from "@/data/cuisine";

const Melanges = () => (
  <PageCuisine>
    <TeteCuisine
      page="Les mélanges"
      titre="Les mélanges"
      intro="Six préparations à faire chez soi : trois boissons et un mélange d'épices pour chaque dosha. Les proportions sont indicatives, à ajuster à votre goût."
    >
      <IlluEpice id="chai" size={160} className="h-auto w-[40%] max-w-[160px]" />
      <IlluEpice id="fenouil" size={120} className="h-auto w-[30%] max-w-[120px]" />
    </TeteCuisine>
    <Bande />

    <section aria-label="Les six mélanges" className="mx-auto max-w-[1220px] px-4 pb-10 pt-14 sm:px-10">
      {MELANGES.map((m) => (
        <article
          key={m.id}
          id={m.id}
          className="grid scroll-mt-24 gap-6 border-t-2 border-encre py-8 md:grid-cols-[130px_minmax(0,1fr)_minmax(0,1fr)] md:gap-8"
        >
          <div className="flex items-start gap-5 md:block">
            <IlluEpice id={m.illu} size={120} className="h-auto w-20 md:w-[120px]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="m-0 text-[2.1rem] leading-[1.05]">{m.nom}</h2>
            <span className="italic text-aubergine">{m.sousTitre}</span>
            <ul className="m-0 mt-2.5 list-none p-0">
              {m.ingredients.map((x) => (
                <li key={x} className="border-t border-dashed border-trait py-[7px]">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="m-0 font-body text-lg font-bold normal-case tracking-normal">Comment faire</h3>
            <p className="m-0">{fr(m.methode)}</p>
          </div>
        </article>
      ))}
    </section>

    <section className="mx-auto max-w-[1220px] px-4 pb-[88px] sm:px-10">
      <p className="m-0 rounded-xl bg-surface px-6 py-5 text-base">
        {fr(
          "Enceinte, sous traitement ou avec un trouble digestif qui dure ? Demandez conseil avant de consommer ces mélanges tous les jours.",
        )}
      </p>
    </section>
  </PageCuisine>
);

export default Melanges;
