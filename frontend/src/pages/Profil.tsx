import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Quiz from "@/components/quiz/Quiz";

interface EtatNavigation {
  depart?: "nature";
  premier?: number;
}

/** Mon profil : le quiz en deux parties, puis le résultat gardé sur l'appareil. */
const Profil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [depart] = useState(() => {
    const e = location.state as EtatNavigation | null;
    return e?.depart === "nature" ? { partie: "p" as const, premier: e.premier } : undefined;
  });
  const [enCours, setEnCours] = useState(false);
  const surEnCours = useCallback((v: boolean) => setEnCours(v), []);

  // On efface l'intention de départ : un rechargement ne relance pas le quiz.
  useEffect(() => {
    if (location.state) navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      {!enCours && <Navbar />}
      <main className="min-h-[60vh]">
        <Quiz onEnCours={surEnCours} depart={depart} />
      </main>
      {!enCours && <Footer />}
    </>
  );
};

export default Profil;
