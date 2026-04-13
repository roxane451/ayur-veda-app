import { Link } from "react-router-dom";
import {
  Wind,
  Flame,
  Droplets,
  ArrowRight,
  Check,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const doshaData = [
  {
    id: "vata",
    name: "Vata",
    sanskrit: "वात",
    elements: "Air + Éther",
    essence: "Le Mouvement",
    qualities: ["Léger", "Froid", "Sec", "Mobile", "Subtil"],
    icon: Wind,
    bgClass:
      "bg-gradient-to-br from-vata-muted via-background to-vata-muted/50",
    accentClass: "bg-vata/10",
    textClass: "text-vata",
    borderClass: "border-vata/30",
    physical: [
      { label: "Morphologie", value: "Mince, difficile de prendre du poids" },
      { label: "Peau", value: "Fine et sèche" },
      { label: "Cheveux", value: "Fins, foncés, frisés" },
      { label: "Énergie", value: "Vive mais irrégulière" },
      { label: "Digestion", value: "Variable et sensible" },
    ],
    psychological: [
      { label: "Esprit", value: "Créatif et vif" },
      { label: "Émotions", value: "Enthousiaste, imaginatif" },
      { label: "Apprentissage", value: "Rapide mais oublie vite" },
      { label: "Communication", value: "Bavard, expressif" },
      { label: "Tendances", value: "Anxiété quand déséquilibré" },
    ],
    imbalanceSigns: [
      "Anxiété, inquiétude",
      "Insomnie",
      "Constipation",
      "Peau très sèche",
      "Difficultés de concentration",
    ],
    balanceTips: [
      "Alimentation chaude et onctueuse",
      "Routine régulière",
      "Repos et calme",
      "Huiles nourrissantes",
      "Éviter le froid et le sec",
    ],
    plants: ["Ashwagandha", "Shatavari", "Triphala"],
  },
  {
    id: "pitta",
    name: "Pitta",
    sanskrit: "पित्त",
    elements: "Feu + Eau",
    essence: "La Transformation",
    qualities: ["Chaud", "Léger", "Intense", "Fluide", "Acide"],
    icon: Flame,
    bgClass:
      "bg-gradient-to-br from-pitta-muted via-background to-pitta-muted/50",
    accentClass: "bg-pitta/10",
    textClass: "text-pitta",
    borderClass: "border-pitta/30",
    physical: [
      { label: "Morphologie", value: "Moyenne, musclée" },
      { label: "Peau", value: "Claire, sensible, taches de rousseur" },
      { label: "Cheveux", value: "Fins, blonds/roux" },
      { label: "Énergie", value: "Forte et régulière" },
      { label: "Digestion", value: "Puissante, grand appétit" },
    ],
    psychological: [
      { label: "Esprit", value: "Intelligent et concentré" },
      { label: "Émotions", value: "Déterminé, leader" },
      { label: "Apprentissage", value: "Rapide et précis" },
      { label: "Communication", value: "Direct, persuasif" },
      { label: "Tendances", value: "Colère quand déséquilibré" },
    ],
    imbalanceSigns: [
      "Irritabilité, colère",
      "Inflammation cutanée",
      "Brûlures d'estomac",
      "Transpiration excessive",
      "Impatience",
    ],
    balanceTips: [
      "Alimentation fraîche et modérée",
      "Éviter l'excès de chaleur",
      "Activités apaisantes",
      "Environnement frais",
      "Lâcher-prise",
    ],
    plants: ["Amalaki", "Brahmi", "Aloe Vera"],
  },
  {
    id: "kapha",
    name: "Kapha",
    sanskrit: "कफ",
    elements: "Eau + Terre",
    essence: "La Structure",
    qualities: ["Lourd", "Froid", "Huileux", "Lent", "Doux"],
    icon: Droplets,
    bgClass:
      "bg-gradient-to-br from-kapha-muted via-background to-kapha-muted/50",
    accentClass: "bg-kapha/10",
    textClass: "text-kapha",
    borderClass: "border-kapha/30",
    physical: [
      { label: "Morphologie", value: "Robuste, prend du poids facilement" },
      { label: "Peau", value: "Épaisse, grasse, pâle" },
      { label: "Cheveux", value: "Épais, abondants, brillants" },
      { label: "Énergie", value: "Stable et endurante" },
      { label: "Digestion", value: "Lente mais régulière" },
    ],
    psychological: [
      { label: "Esprit", value: "Calme et stable" },
      { label: "Émotions", value: "Patient, loyal" },
      { label: "Apprentissage", value: "Lent mais retient longtemps" },
      { label: "Communication", value: "Posé, réfléchi" },
      { label: "Tendances", value: "Léthargie quand déséquilibré" },
    ],
    imbalanceSigns: [
      "Léthargie, dépression",
      "Prise de poids",
      "Congestion, mucus",
      "Rétention d'eau",
      "Résistance au changement",
    ],
    balanceTips: [
      "Alimentation légère et épicée",
      "Exercice régulier",
      "Stimulation mentale",
      "Éviter l'excès de sommeil",
      "Environnement sec et chaud",
    ],
    plants: ["Trikatu", "Guggul", "Boswellia"],
  },
];

const comparisonData = [
  {
    category: "Morphologie",
    vata: "Mince, léger",
    pitta: "Moyenne, athlétique",
    kapha: "Robuste, solide",
  },
  {
    category: "Digestion",
    vata: "Irrégulière",
    pitta: "Forte, rapide",
    kapha: "Lente, stable",
  },
  {
    category: "Sommeil",
    vata: "Léger, interrompu",
    pitta: "Modéré, 6-7h",
    kapha: "Profond, 8h+",
  },
  {
    category: "Activité préférée",
    vata: "Créative, variée",
    pitta: "Compétitive, intense",
    kapha: "Calme, régulière",
  },
  {
    category: "Saison aggravante",
    vata: "Automne (sec, froid)",
    pitta: "Été (chaud)",
    kapha: "Printemps (humide)",
  },
  {
    category: "Saveurs à privilégier",
    vata: "Sucré, salé, acide",
    pitta: "Sucré, amer, astringent",
    kapha: "Piquant, amer, astringent",
  },
];

const Doshas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Accueil
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">Les 3 Doshas</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-accent to-background overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-40 h-40 bg-vata/10 rounded-full blur-3xl" />
            <div className="absolute top-20 right-20 w-48 h-48 bg-pitta/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-1/2 w-56 h-56 bg-kapha/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Énergies fondamentales
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground mb-4">
              Les 3 Doshas : Énergies Vitales
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Vata, Pitta, Kapha — Les forces qui régissent votre corps et votre
              esprit
            </p>

            {/* Mandala Visual */}
            <div className="relative w-48 h-48 mx-auto mt-8">
              <div
                className="absolute inset-0 rounded-full border-4 border-dashed border-border animate-spin"
                style={{ animationDuration: "30s" }}
              />
              <div className="absolute inset-4 rounded-full bg-card shadow-card flex items-center justify-center">
                <div className="flex gap-2">
                  <Wind className="w-6 h-6 text-vata" />
                  <Flame className="w-6 h-6 text-pitta" />
                  <Droplets className="w-6 h-6 text-kapha" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 md:py-16 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              En Ayurveda, les doshas sont trois énergies fondamentales qui
              gouvernent tous les processus de notre corps et de notre esprit.
              Chacun de nous possède une combinaison unique de ces trois forces,
              déterminée à la naissance et constituant notre{" "}
              <em className="text-foreground font-medium">Prakriti</em>{" "}
              (constitution naturelle).
            </p>
          </div>
        </section>

        {/* Dosha Sections */}
        {doshaData.map((dosha, index) => {
          const IconComponent = dosha.icon;
          return (
            <section
              key={dosha.id}
              id={dosha.id}
              className={`py-16 md:py-24 ${dosha.bgClass}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Dosha Header */}
                <div className="text-center mb-12">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 ${dosha.accentClass} rounded-2xl flex items-center justify-center`}
                  >
                    <IconComponent className={`w-10 h-10 ${dosha.textClass}`} />
                  </div>
                  <p
                    className={`text-4xl font-display ${dosha.textClass} mb-2`}
                  >
                    {dosha.sanskrit}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-2">
                    {dosha.name}
                  </h2>
                  <p className={`text-xl font-medium ${dosha.textClass} mb-4`}>
                    {dosha.elements}
                  </p>
                  <p className="text-2xl font-display text-muted-foreground">
                    {dosha.essence}
                  </p>
                </div>

                {/* Qualities */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {dosha.qualities.map((quality) => (
                    <span
                      key={quality}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${dosha.accentClass} ${dosha.textClass} border ${dosha.borderClass}`}
                    >
                      {quality}
                    </span>
                  ))}
                </div>

                {/* Characteristics Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {/* Physical */}
                  <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-soft">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                      <div
                        className={`w-8 h-8 ${dosha.accentClass} rounded-lg flex items-center justify-center`}
                      >
                        <span className={`text-sm ${dosha.textClass}`}>🏃</span>
                      </div>
                      Caractéristiques Physiques
                    </h3>
                    <div className="space-y-4">
                      {dosha.physical.map((item) => (
                        <div
                          key={item.label}
                          className="flex justify-between items-start gap-4 pb-3 border-b border-border last:border-0"
                        >
                          <span className="text-sm font-medium text-muted-foreground">
                            {item.label}
                          </span>
                          <span className="text-sm text-foreground text-right">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Psychological */}
                  <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-soft">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                      <div
                        className={`w-8 h-8 ${dosha.accentClass} rounded-lg flex items-center justify-center`}
                      >
                        <span className={`text-sm ${dosha.textClass}`}>🧠</span>
                      </div>
                      Caractéristiques Psychologiques
                    </h3>
                    <div className="space-y-4">
                      {dosha.psychological.map((item) => (
                        <div
                          key={item.label}
                          className="flex justify-between items-start gap-4 pb-3 border-b border-border last:border-0"
                        >
                          <span className="text-sm font-medium text-muted-foreground">
                            {item.label}
                          </span>
                          <span className="text-sm text-foreground text-right">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Imbalance & Balance Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {/* Imbalance Signs */}
                  <div className="bg-destructive/5 rounded-2xl p-6 md:p-8 border border-destructive/20">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      Signes de Déséquilibre
                    </h3>
                    <ul className="space-y-3">
                      {dosha.imbalanceSigns.map((sign) => (
                        <li
                          key={sign}
                          className="flex items-center gap-3 text-muted-foreground"
                        >
                          <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0" />
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Balance Tips */}
                  <div
                    className={`${dosha.accentClass} rounded-2xl p-6 md:p-8 border ${dosha.borderClass}`}
                  >
                    <h3 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                      <Check className={`w-5 h-5 ${dosha.textClass}`} />
                      Comment Équilibrer {dosha.name}
                    </h3>
                    <ul className="space-y-3">
                      {dosha.balanceTips.map((tip) => (
                        <li
                          key={tip}
                          className="flex items-center gap-3 text-muted-foreground"
                        >
                          <Check
                            className={`w-4 h-4 ${dosha.textClass} flex-shrink-0`}
                          />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plants */}
                <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-soft mb-8">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Leaf className={`w-5 h-5 ${dosha.textClass}`} />
                    Plantes Recommandées
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {dosha.plants.map((plant) => (
                      <span
                        key={plant}
                        className={`px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20`}
                      >
                        {plant}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild>
                    <Link to="/quiz">
                      Quiz personnalisé
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/ayurveda">En savoir plus sur l'Ayurveda</Link>
                  </Button>
                </div>
              </div>
            </section>
          );
        })}

        {/* Comparison Table */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
                Tableau Comparatif
              </h2>
              <p className="text-lg text-muted-foreground">
                Comparez les trois doshas en un coup d'œil
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left font-display font-semibold text-foreground bg-muted/50"></th>
                    <th className="p-4 text-center font-display font-semibold bg-vata-muted">
                      <div className="flex items-center justify-center gap-2">
                        <Wind className="w-5 h-5 text-vata" />
                        <span className="text-vata">Vata</span>
                      </div>
                    </th>
                    <th className="p-4 text-center font-display font-semibold bg-pitta-muted">
                      <div className="flex items-center justify-center gap-2">
                        <Flame className="w-5 h-5 text-pitta" />
                        <span className="text-pitta">Pitta</span>
                      </div>
                    </th>
                    <th className="p-4 text-center font-display font-semibold bg-kapha-muted">
                      <div className="flex items-center justify-center gap-2">
                        <Droplets className="w-5 h-5 text-kapha" />
                        <span className="text-kapha">Kapha</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={row.category}
                      className={
                        index % 2 === 0 ? "bg-background" : "bg-muted/20"
                      }
                    >
                      <td className="p-4 font-medium text-foreground">
                        {row.category}
                      </td>
                      <td className="p-4 text-center text-sm text-muted-foreground">
                        {row.vata}
                      </td>
                      <td className="p-4 text-center text-sm text-muted-foreground">
                        {row.pitta}
                      </td>
                      <td className="p-4 text-center text-sm text-muted-foreground">
                        {row.kapha}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
              Découvrez votre Dosha dominant
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Répondez à notre quiz personnalisé pour découvrir votre
              constitution ayurvédique unique
            </p>
            <Button size="lg" asChild>
              <Link to="/quiz">
                <Sparkles className="w-5 h-5 mr-2" />
                Faire le Quiz Dosha
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Doshas;
