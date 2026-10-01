import { useSearchParams } from "react-router-dom";
import { Bande } from "@/components/brand/BrandDefs";
import { Feuille, Poudre } from "@/components/brand/Illustrations";
import Ingredients from "@/components/cuisine/Ingredients";
import { PageCuisine, Pastille, TeteCuisine } from "@/components/cuisine/Commun";
import { COULEUR_DOSHA } from "@/components/quiz/conseils";
import { DOSHAS, NOM_DOSHA, type DoshaKey } from "@/lib/doshaLogic";

/** Les ingrédients de la pharmacopée ayurvédique, de A à Z. */
const PageIngredients = () => {
  const [params, setParams] = useSearchParams();
  const filtre = DOSHAS.find((d) => d === params.get("apaise")) ?? null;
  const choisir = (d: DoshaKey | null) => setParams(d ? { apaise: d } : {}, { replace: true });

  return (
    <PageCuisine>
      <TeteCuisine
        page="Les ingrédients"
        titre="Les ingrédients"
        intro="Plantes, fruits, résines et préparations que l'on croise en Ayurveda, avec leurs saveurs, leur effet chauffant ou rafraîchissant (virya) et leur action sur les doshas."
      >
        <Feuille size={150} decorative className="h-auto w-[34%] max-w-[150px]" />
        <Poudre size={130} decorative className="h-auto w-[30%] max-w-[130px]" />
      </TeteCuisine>
      <div className="mx-auto flex max-w-[1220px] flex-wrap items-center gap-2 px-4 pb-10 sm:px-10">
        <span className="mr-1.5 font-bold">Pour apaiser</span>
        <Pastille actif={!filtre} onClick={() => choisir(null)}>
          Tous
        </Pastille>
        {DOSHAS.map((d) => (
          <Pastille key={d} actif={filtre === d} onClick={() => choisir(d)} couleur={COULEUR_DOSHA[d]}>
            {NOM_DOSHA[d]}
          </Pastille>
        ))}
      </div>
      <Bande />
      <Ingredients filtre={filtre} />
    </PageCuisine>
  );
};

export default PageIngredients;
