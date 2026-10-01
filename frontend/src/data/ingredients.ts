/**
 * Les ingrédients de la pharmacopée ayurvédique, de A à Z.
 * Source : liste fournie par la rédaction. [À VALIDER] par une praticienne.
 * « augmente » signifie : fait monter ce dosha en cas d'excès.
 */
import type { DoshaKey } from "@/lib/doshaLogic";

export type EffetIngredient = "diminue" | "augmente";

export interface Ingredient {
  nom: string;
  botanique?: string;
  partie: string;
  rasa: string;
  virya: string;
  /** null : l'effet varie selon la préparation ou la partie utilisée */
  doshas: Partial<Record<DoshaKey, EffetIngredient>> | null;
  /** Précision quand l'effet varie */
  note?: string;
}

export const INGREDIENTS: Ingredient[] = [
  { nom: "Aloe Vera", botanique: "Aloe vera", partie: "Gel / feuille", rasa: "Amer, astringent", virya: "Rafraîchissante", doshas: null, note: "Les effets varient selon la partie utilisée." },
  { nom: "Amalaki", botanique: "Phyllanthus emblica", partie: "Fruit", rasa: "Doux, acide, amer, piquant, astringent", virya: "Rafraîchissante", doshas: { vata: "diminue", pitta: "diminue", kapha: "diminue" } },
  { nom: "Andraka", botanique: "Zingiber officinale", partie: "Rhizome frais", rasa: "Piquant", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Andrographis", botanique: "Andrographis paniculata", partie: "Parties aériennes", rasa: "Amer", virya: "Rafraîchissante", doshas: { pitta: "diminue", kapha: "diminue", vata: "augmente" } },
  { nom: "Arjuna", botanique: "Terminalia arjuna", partie: "Écorce", rasa: "Astringent", virya: "Rafraîchissante", doshas: { pitta: "diminue", kapha: "diminue", vata: "augmente" } },
  { nom: "Ashwagandha", botanique: "Withania somnifera", partie: "Racine", rasa: "Doux, amer, astringent", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Bibhitaki", botanique: "Terminalia bellirica", partie: "Fruit", rasa: "Principalement astringent", virya: "Chauffante", doshas: { kapha: "diminue", pitta: "diminue" } },
  { nom: "Bilva", botanique: "Aegle marmelos", partie: "Fruit, notamment fruit non mûr", rasa: "Amer, astringent", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Boswellia", botanique: "Boswellia serrata", partie: "Résine", rasa: "Principalement amer", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Brahmi", botanique: "Bacopa monnieri", partie: "Plante entière / parties aériennes", rasa: "Amer, astringent", virya: "Rafraîchissante", doshas: { vata: "diminue", pitta: "diminue", kapha: "diminue" } },
  { nom: "Centella", botanique: "Centella asiatica", partie: "Plante entière / feuilles", rasa: "Amer, astringent, doux", virya: "Rafraîchissante", doshas: { vata: "diminue", pitta: "diminue", kapha: "diminue" } },
  { nom: "Curcuma", botanique: "Curcuma longa", partie: "Rhizome", rasa: "Piquant, amer", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Fenugrec", botanique: "Trigonella foenum-graecum", partie: "Graines", rasa: "Piquant, amer", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Ghee", partie: "Beurre clarifié", rasa: "Doux", virya: "Rafraîchissante", doshas: { vata: "diminue", pitta: "diminue", kapha: "augmente" } },
  { nom: "Guduchi", botanique: "Tinospora cordifolia", partie: "Tige principalement", rasa: "Amer, astringent", virya: "Chauffante", doshas: { vata: "diminue", pitta: "diminue", kapha: "diminue" } },
  { nom: "Guggul", botanique: "Commiphora wightii", partie: "Oléorésine", rasa: "Amer, piquant", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Gymnema", botanique: "Gymnema sylvestre", partie: "Feuilles", rasa: "Amer, astringent", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Haritaki", botanique: "Terminalia chebula", partie: "Fruit", rasa: "5 saveurs sauf salé, dominante astringente", virya: "Chauffante", doshas: { vata: "diminue", pitta: "diminue", kapha: "diminue" } },
  { nom: "Manjistha", botanique: "Rubia cordifolia", partie: "Racine", rasa: "Astringent, amer, doux", virya: "Chauffante", doshas: { pitta: "diminue", kapha: "diminue", vata: "augmente" } },
  { nom: "Moringa", botanique: "Moringa oleifera", partie: "Feuilles principalement", rasa: "Piquant, amer", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Musta", botanique: "Cyperus rotundus", partie: "Rhizome", rasa: "Piquant, amer, astringent", virya: "Rafraîchissante", doshas: { pitta: "diminue", kapha: "diminue", vata: "augmente" } },
  { nom: "Shatavari", botanique: "Asparagus racemosus", partie: "Racine", rasa: "Doux, amer", virya: "Rafraîchissante", doshas: { vata: "diminue", pitta: "diminue", kapha: "augmente" } },
  { nom: "Shilajit", partie: "Exsudat minéral purifié", rasa: "Amer, astringent, parfois décrit comme piquant", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Tamarin", botanique: "Tamarindus indica", partie: "Pulpe du fruit", rasa: "Acide, doux", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Tribulus", botanique: "Tribulus terrestris", partie: "Fruit et racine", rasa: "Doux", virya: "Rafraîchissante", doshas: { vata: "diminue", pitta: "diminue", kapha: "augmente" } },
  { nom: "Trikatu", botanique: "Mélange traditionnel", partie: "Gingembre, poivre noir, poivre long", rasa: "Piquant", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Trimada", botanique: "Préparation composée", partie: "Variable", rasa: "Variable selon la composition", virya: "Variable", doshas: null, note: "Variable selon la formule." },
  { nom: "Triphala", botanique: "Préparation traditionnelle", partie: "Amalaki, Haritaki et Bibhitaki", rasa: "5 saveurs sauf salé", virya: "Mixte", doshas: { vata: "diminue", pitta: "diminue", kapha: "diminue" } },
  { nom: "Trivana", botanique: "Préparation composée", partie: "Variable", rasa: "Variable selon la composition", virya: "Variable", doshas: null, note: "Variable selon la formule." },
  { nom: "Tulsi", botanique: "Ocimum tenuiflorum", partie: "Feuilles / parties aériennes", rasa: "Piquant, amer", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
  { nom: "Vidanga", botanique: "Embelia ribes", partie: "Fruits", rasa: "Piquant, astringent", virya: "Chauffante", doshas: { vata: "diminue", kapha: "diminue", pitta: "augmente" } },
];

/** Les initiales présentes, dans l'ordre. */
export const initialeIngredient = (nom: string) => nom.normalize("NFD").charAt(0).toUpperCase();

/** Les ingrédients qui apaisent un dosha (ceux dont l'effet varie sont écartés). */
export const ingredientsQuiApaisent = (d: DoshaKey | null) => (d ? INGREDIENTS.filter((i) => i.doshas?.[d] === "diminue") : INGREDIENTS);
