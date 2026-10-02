import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

import ScienceVie from "./pages/comprendre/ScienceVie";
import Elements from "./pages/comprendre/Elements";
import Textes from "./pages/comprendre/Textes";
import Doshas from "./pages/comprendre/Doshas";
import Saveurs from "./pages/comprendre/Saveurs";
import Agni from "./pages/comprendre/Agni";
import Journee from "./pages/comprendre/Journee";
import Lexique from "./pages/comprendre/Lexique";
import Qualites from "./pages/comprendre/Qualites";
import Constitution from "./pages/comprendre/Constitution";
import Tissus from "./pages/comprendre/Tissus";
import Action from "./pages/comprendre/Action";
import SaisonsTextes from "./pages/comprendre/SaisonsTextes";
import Sommeil from "./pages/comprendre/Sommeil";
import Besoins from "./pages/comprendre/Besoins";
import Esprit from "./pages/comprendre/Esprit";
import Piliers from "./pages/comprendre/Piliers";
import Ages from "./pages/comprendre/Ages";
import Desequilibre from "./pages/comprendre/Desequilibre";
import RetourEnHaut from "./components/RetourEnHaut";
import Profil from "./pages/Profil";
import EspaceMembre from "./pages/EspaceMembre";
import Acces from "./pages/membre/Acces";
import { CompteProvider } from "./components/compte/CompteContext";
import Saisons from "./pages/quotidien/Saisons";
import Programme from "./pages/quotidien/Programme";
import Boite from "./pages/cuisine/Boite";
import Melanges from "./pages/cuisine/Melanges";
import FicheEpice from "./pages/cuisine/Fiche";
import Recettes from "./pages/cuisine/Recettes";
import Recette from "./pages/cuisine/Recette";
import PageIngredients from "./pages/cuisine/Ingredients";
import BienManger from "./pages/cuisine/BienManger";
import NotFound from "./pages/NotFound";
import BrandDefs from "./components/brand/BrandDefs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrandDefs />
      <Toaster />
      <Sonner />
      <CompteProvider>
        <BrowserRouter>
          <RetourEnHaut />
          <Routes>
            <Route path="/" element={<Index />} />

            <Route path="/comprendre" element={<ScienceVie />} />
            <Route path="/comprendre/elements" element={<Elements />} />
            <Route path="/comprendre/textes" element={<Textes />} />
            <Route path="/comprendre/doshas" element={<Doshas />} />
            <Route path="/comprendre/qualites" element={<Qualites />} />
            <Route path="/comprendre/saveurs" element={<Saveurs />} />
            <Route path="/comprendre/constitution" element={<Constitution />} />
            <Route path="/comprendre/tissus" element={<Tissus />} />
            <Route path="/comprendre/esprit" element={<Esprit />} />
            <Route path="/comprendre/trois-piliers" element={<Piliers />} />
            <Route path="/comprendre/corps-et-esprit" element={<Navigate to="/comprendre/tissus" replace />} />
            <Route path="/comprendre/action-des-aliments" element={<Action />} />
            <Route path="/comprendre/agni" element={<Agni />} />
            <Route path="/comprendre/regles-du-repas" element={<BienManger rubrique="comprendre" />} />
            <Route path="/comprendre/journee" element={<Journee />} />
            <Route path="/comprendre/saisons" element={<SaisonsTextes />} />
            <Route path="/comprendre/sommeil" element={<Sommeil />} />
            <Route path="/comprendre/besoins-naturels" element={<Besoins />} />
            <Route path="/comprendre/ages-de-la-vie" element={<Ages />} />
            <Route path="/comprendre/desequilibre" element={<Desequilibre />} />
            <Route path="/comprendre/lexique" element={<Lexique />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/au-quotidien" element={<Saisons />} />
            <Route
              path="/au-quotidien/journee"
              element={<Journee rubrique="quotidien" />}
            />
            <Route path="/au-quotidien/programme" element={<Programme />} />
            <Route path="/cuisine" element={<Boite />} />
            <Route path="/cuisine/melanges" element={<Melanges />} />
            <Route path="/cuisine/epices/:id" element={<FicheEpice />} />
            <Route path="/cuisine/recettes" element={<Recettes />} />
            <Route path="/cuisine/recettes/:id" element={<Recette />} />
            <Route path="/cuisine/ingredients" element={<PageIngredients />} />
            <Route path="/cuisine/bien-manger" element={<BienManger />} />
            <Route path="/espace-membre" element={<EspaceMembre />} />
            <Route path="/connexion" element={<Acces mode="connexion" />} />
            <Route path="/inscription" element={<Acces mode="inscription" />} />

            {/* Anciennes adresses */}
            <Route
              path="/doshas"
              element={<Navigate to="/comprendre/doshas" replace />}
            />
            <Route path="/quiz" element={<Navigate to="/profil" replace />} />
            <Route
              path="/ritucharya"
              element={<Navigate to="/au-quotidien" replace />}
            />
            <Route
              path="/spices"
              element={<Navigate to="/cuisine" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CompteProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
