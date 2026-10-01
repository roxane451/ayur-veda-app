import { useCompte } from "@/components/compte/CompteContext";
import Offre from "./membre/Offre";
import TableauDeBord from "./membre/TableauDeBord";

/** Espace membre : l'offre pour qui n'est pas connecté, le tableau de bord sinon. */
const EspaceMembre = () => {
  const { connecte } = useCompte();
  return connecte ? <TableauDeBord /> : <Offre />;
};

export default EspaceMembre;
