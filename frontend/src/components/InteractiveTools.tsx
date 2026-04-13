import { Link } from "react-router-dom";
import {
  Activity,
  Leaf,
  UtensilsCrossed,
  Calendar,
  Music,
  Bell,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    id: "vikriti",
    icon: Activity,
    title: "Quiz Vikriti",
    description: "Découvre ton déséquilibre actuel",
    href: "/quiz",
  },
  {
    id: "spices",
    icon: Leaf,
    title: "Encyclopédie des Épices",
    description: "Explore les épices ayurvédiques",
    href: "/spices",
  },
  {
    id: "recipes",
    icon: UtensilsCrossed,
    title: "Recettes Saisonnières",
    description: "Menus adaptés à ton dosha",
    href: "/ritucharya",
  },
  {
    id: "seasons",
    icon: Calendar,
    title: "Planificateur Saisonnier",
    description: "Anticipe les transitions",
    href: "/ritucharya",
  },
  {
    id: "mantras",
    icon: Music,
    title: "Générateur de Mantras",
    description: "Mantras personnalisés",
    href: "#",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Rappels Bien-être",
    description: "Notifications personnalisées",
    href: "#",
  },
];

const InteractiveTools = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-4">
            Explore les outils
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Des outils interactifs pour t'accompagner dans ton voyage vers
            l'équilibre
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link to={feature.href} key={feature.id}>
                <Card className="h-full bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="shadow-soft hover:shadow-hover">
            <Link to="/quiz">Découvrir mon Dosha</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTools;
