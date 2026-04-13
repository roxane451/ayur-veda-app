import { Sparkles, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoshaQuiz from "@/components/DoshaQuiz";

const Quiz = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-soft border border-border mb-6">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Test gratuit • 5 minutes
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Découvrez votre
              <span className="block text-gradient mt-1">Dosha dominant</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Répondez à notre quiz complet basé sur les principes de l'Ayurveda
              et recevez un profil personnalisé avec des recommandations
              adaptées à votre constitution unique.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DoshaQuiz />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Quiz;
