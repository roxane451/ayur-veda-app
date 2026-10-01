import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

import Doshas from "./pages/Doshas";
import Profil from "./pages/Profil";
import EspaceMembre from "./pages/EspaceMembre";
import Ritucharya from "./pages/Ritucharya";
import Spices from "./pages/Spices";
import NotFound from "./pages/NotFound";
import BrandDefs from "./components/brand/BrandDefs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrandDefs />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/comprendre" element={<Doshas />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/au-quotidien" element={<Ritucharya />} />
          <Route path="/cuisine" element={<Spices />} />
          <Route path="/espace-membre" element={<EspaceMembre />} />

          {/* Anciennes adresses */}
          <Route path="/doshas" element={<Navigate to="/comprendre" replace />} />
          <Route path="/quiz" element={<Navigate to="/profil" replace />} />
          <Route path="/ritucharya" element={<Navigate to="/au-quotidien" replace />} />
          <Route path="/spices" element={<Navigate to="/cuisine" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
