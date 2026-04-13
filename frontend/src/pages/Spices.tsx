import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Wind,
  Flame,
  Droplets,
  X,
  Filter,
  Leaf,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { spices, spiceCategories, spiceTypes, type Spice } from "@/data/spices";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SpiceEncyclopedia = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSpice, setSelectedSpice] = useState<Spice | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredSpices = spices.filter((spice) => {
    const matchesSearch =
      spice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spice.sanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spice.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || spice.category.includes(selectedCategory);
    const matchesType = selectedType === "all" || spice.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getDoshaIcon = (dosha: string) => {
    switch (dosha) {
      case "vata":
        return <Wind className="w-4 h-4" />;
      case "pitta":
        return <Flame className="w-4 h-4" />;
      case "kapha":
        return <Droplets className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getDoshaEffect = (effect: string) => {
    switch (effect) {
      case "diminue":
        return {
          label: "↓",
          color: "text-primary bg-primary/10",
          text: "Apaise",
        };
      case "augmente":
        return {
          label: "↑",
          color: "text-secondary bg-secondary/10",
          text: "Augmente",
        };
      case "équilibre":
        return {
          label: "⚖",
          color: "text-gold bg-gold/10",
          text: "Équilibre",
        };
      default:
        return {
          label: "=",
          color: "text-muted-foreground bg-muted",
          text: "Neutre",
        };
    }
  };

  // Detail Modal
  if (selectedSpice) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => setSelectedSpice(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux épices
          </button>

          <div className="bg-card rounded-3xl p-8 shadow-card">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Type badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-4">
                <span
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    selectedSpice.type === "plante"
                      ? "text-kapha"
                      : "text-pitta",
                  )}
                >
                  {selectedSpice.type === "plante" ? (
                    <Leaf className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  {selectedSpice.type === "plante" ? "Plante" : "Épice"}
                </span>
              </div>

              <div className="text-7xl mb-4">{selectedSpice.image}</div>

              <h1 className="text-4xl font-display font-semibold text-foreground mb-2">
                {selectedSpice.name}
              </h1>
              <p className="text-xl text-muted-foreground font-serif">
                {selectedSpice.sanskrit}
              </p>

              <span
                className={cn(
                  "inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-medium",
                  selectedSpice.nature === "réchauffante"
                    ? "bg-pitta/10 text-pitta"
                    : selectedSpice.nature === "rafraîchissante"
                      ? "bg-vata/10 text-vata"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {selectedSpice.nature === "réchauffante"
                  ? "🔥"
                  : selectedSpice.nature === "rafraîchissante"
                    ? "❄️"
                    : "⚖️"}
                {selectedSpice.nature.charAt(0).toUpperCase() +
                  selectedSpice.nature.slice(1)}
              </span>
            </div>

            <div className="space-y-8">
              {/* Description */}
              {selectedSpice.description && (
                <div className="bg-accent/50 rounded-2xl p-6 text-center">
                  <p className="text-lg text-foreground italic leading-relaxed">
                    "{selectedSpice.description}"
                  </p>
                </div>
              )}

              {/* Doshas */}
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  Effet sur les Doshas
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {(["vata", "pitta", "kapha"] as const).map((dosha) => {
                    const effect = getDoshaEffect(
                      selectedSpice.doshaEffect[dosha],
                    );
                    return (
                      <div
                        key={dosha}
                        className={cn(
                          "rounded-xl p-4 text-center",
                          effect.color,
                        )}
                      >
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {getDoshaIcon(dosha)}
                          <span className="capitalize font-medium">
                            {dosha}
                          </span>
                        </div>
                        <span className="text-2xl">{effect.label}</span>
                        <p className="text-sm mt-1">{effect.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tastes */}
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  Saveurs (Rasa)
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedSpice.taste.map((taste) => (
                    <span
                      key={taste}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {taste}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits & Uses */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-kapha/5 rounded-2xl p-6">
                  <h2 className="text-xl font-display font-semibold text-kapha mb-4">
                    🌿 Bienfaits
                  </h2>
                  <ul className="space-y-2">
                    {selectedSpice.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-foreground"
                      >
                        <span className="text-kapha font-bold">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/5 rounded-2xl p-6">
                  <h2 className="text-xl font-display font-semibold text-primary mb-4">
                    🍳 Utilisations
                  </h2>
                  <ul className="space-y-2">
                    {selectedSpice.uses.map((use, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-foreground"
                      >
                        <span className="text-primary">•</span>
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contraindications */}
              {selectedSpice.contraindications.length > 0 && (
                <div className="bg-secondary/10 rounded-2xl p-6">
                  <h2 className="text-xl font-display font-semibold text-secondary mb-4">
                    ⚠️ Précautions
                  </h2>
                  <ul className="space-y-2">
                    {selectedSpice.contraindications.map((contra, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-foreground"
                      >
                        <span className="text-secondary font-bold">!</span>
                        <span>{contra}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Categories */}
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  Catégories
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedSpice.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground capitalize"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Main Encyclopedia View
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🌶️</div>
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
            Encyclopédie des Épices & Plantes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les propriétés ayurvédiques de chaque épice et plante
            médicinale, et apprenez à les utiliser pour équilibrer vos doshas.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-3xl font-display font-bold text-foreground">
              {spices.length}
            </p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-3xl font-display font-bold text-kapha">
              {spices.filter((s) => s.type === "plante").length}
            </p>
            <p className="text-sm text-muted-foreground">Plantes</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-3xl font-display font-bold text-pitta">
              {spices.filter((s) => s.type === "épice").length}
            </p>
            <p className="text-sm text-muted-foreground">Épices</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-3xl font-display font-bold text-gold">
              {spices.filter((s) => s.category.includes("tridoshique")).length}
            </p>
            <p className="text-sm text-muted-foreground">Tridoshiques</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une épice ou plante..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(showFilters && "bg-muted")}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>

          {showFilters && (
            <div className="bg-card rounded-xl p-6 border border-border space-y-6">
              {/* Type filter */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  {spiceTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                        selectedType === type.id
                          ? "bg-gold text-forest-dark"
                          : "bg-muted text-muted-foreground hover:bg-muted/80",
                      )}
                    >
                      {type.id === "plante" && <Leaf className="w-4 h-4" />}
                      {type.id === "épice" && <Sparkles className="w-4 h-4" />}
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category filter */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Catégorie
                </h3>
                <div className="flex flex-wrap gap-2">
                  {spiceCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80",
                      )}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filteredSpices.length} élément{filteredSpices.length > 1 ? "s" : ""}{" "}
          trouvé{filteredSpices.length > 1 ? "s" : ""}
        </p>

        {/* Spice Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpices.map((spice) => (
            <button
              key={spice.id}
              onClick={() => setSelectedSpice(spice)}
              className="bg-card rounded-2xl p-6 border-2 border-border hover:border-gold hover:shadow-card transition-all text-left group relative"
            >
              {/* Type badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    spice.type === "plante"
                      ? "bg-kapha/10 text-kapha"
                      : "bg-pitta/10 text-pitta",
                  )}
                >
                  {spice.type === "plante" ? (
                    <Leaf className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </span>
              </div>

              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {spice.image}
              </div>

              <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                {spice.name}
              </h3>

              <p className="text-sm text-muted-foreground font-serif mb-3">
                {spice.sanskrit}
              </p>

              {/* Nature badge */}
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-3",
                  spice.nature === "réchauffante"
                    ? "bg-pitta/10 text-pitta"
                    : spice.nature === "rafraîchissante"
                      ? "bg-vata/10 text-vata"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {spice.nature === "réchauffante"
                  ? "🔥"
                  : spice.nature === "rafraîchissante"
                    ? "❄️"
                    : "⚖️"}{" "}
                {spice.nature}
              </span>

              {/* Description preview */}
              {spice.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {spice.description}
                </p>
              )}

              {/* Dosha effects */}
              <div className="flex gap-2">
                {(["vata", "pitta", "kapha"] as const).map((dosha) => {
                  const effect = getDoshaEffect(spice.doshaEffect[dosha]);
                  return (
                    <div
                      key={dosha}
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                        effect.color,
                      )}
                    >
                      {getDoshaIcon(dosha)}
                      <span>{effect.label}</span>
                    </div>
                  );
                })}
              </div>
            </button>
          ))}
        </div>

        {filteredSpices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucun élément trouvé
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedType("all");
              }}
              className="mt-4"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SpiceEncyclopedia;
