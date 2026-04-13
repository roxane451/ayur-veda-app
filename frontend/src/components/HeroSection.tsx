import { Link } from "react-router-dom";
import {
  ArrowDown,
  Wind,
  Flame,
  Droplets,
  Leaf,
  BookOpen,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LotusLogo from "./LotusLogo";

const HeroSection = () => {
  const heroCards = [
    {
      icon: Leaf,
      title: "Quiz Dosha",
      description:
        "Découvrez votre constitution ayurvédique unique à travers notre quiz complet et personnalisé.",
      href: "/quiz",
    },
    {
      icon: Calendar,
      title: "Ritucharya",
      description:
        "Adaptez votre mode de vie aux cycles des saisons pour maintenir l'équilibre naturel.",
      href: "/ritucharya",
    },
    {
      icon: BookOpen,
      title: "Encyclopédie",
      description:
        "Explorez notre collection d'épices, plantes et remèdes ayurvédiques traditionnels.",
      href: "/spices",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-forest">
      {/* Forest texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/50 via-forest to-forest-dark/80" />

      {/* Decorative light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-96 bg-gradient-to-b from-gold/20 to-transparent rotate-12 blur-sm" />
        <div className="absolute top-0 left-1/2 w-1 h-80 bg-gradient-to-b from-gold/15 to-transparent -rotate-6 blur-sm" />
        <div className="absolute top-0 right-1/4 w-1 h-72 bg-gradient-to-b from-gold/10 to-transparent rotate-3 blur-sm" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Lotus Logo */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <LotusLogo className="w-28 h-28 md:w-36 md:h-36" />
        </div>

        {/* Main heading */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-gold tracking-wide mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Ayuressence
          </h1>

          {/* Subtitle with decorative elements */}
          <div
            className="flex items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="w-12 h-px bg-gold/50" />
            <p className="text-gold-light text-lg md:text-xl tracking-widest uppercase">
              Bien-être • Harmonie • Équilibre
            </p>
            <span className="w-12 h-px bg-gold/50" />
          </div>
        </div>

        {/* Hero Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
          {heroCards.map((card, index) => (
            <Card
              key={card.title}
              className="bg-forest-dark/60 border-gold/20 backdrop-blur-sm hover:bg-forest-dark/80 hover:border-gold/40 transition-all duration-300 group animate-fade-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <card.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-display text-gold mb-3">
                  {card.title}
                </h3>
                <p className="text-cream/80 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="bg-forest-dark text-gold border-gold/30 hover:bg-gold hover:text-forest-dark transition-all duration-300 uppercase tracking-wider text-xs"
                >
                  <Link to={card.href}>En savoir +</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center animate-bounce">
          <ArrowDown className="w-6 h-6 text-gold/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
