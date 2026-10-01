import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sceau from "@/components/brand/Sceau";

/** [À FAIRE] Espace membre : comptes, suivi des saisons, contenus à l'unité (maquettes validées). */
const EspaceMembre = () => (
  <>
    <Navbar />
    <main className="mx-auto flex min-h-[60vh] max-w-[760px] flex-col gap-5 px-4 pb-24 pt-10 sm:px-10">
      <Sceau size={72} />
      <h1 className="m-0 text-[clamp(2rem,6vw,3rem)]">
        L'espace membre <em>arrive bientôt</em>
      </h1>
      <p className="m-0 text-xl text-doux">
        Votre profil vous suivra sur tous vos appareils, et vous verrez votre état évoluer saison après saison.
      </p>
      <Link
        to="/profil"
        className="inline-flex min-h-[54px] self-start items-center rounded-buta bg-aubergine px-7 font-bold text-pistache"
      >
        En attendant, faire le quiz
      </Link>
    </main>
    <Footer />
  </>
);

export default EspaceMembre;
