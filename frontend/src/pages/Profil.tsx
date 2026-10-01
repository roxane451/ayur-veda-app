import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Quiz from "@/components/quiz/Quiz";

/** Mon profil : le quiz en deux parties, puis le résultat gardé sur l'appareil. */
const Profil = () => {
  const [enCours, setEnCours] = useState(false);
  const surEnCours = useCallback((v: boolean) => setEnCours(v), []);
  return (
    <>
      {!enCours && <Navbar />}
      <main className="min-h-[60vh]">
        <Quiz onEnCours={surEnCours} />
      </main>
      {!enCours && <Footer />}
    </>
  );
};

export default Profil;
