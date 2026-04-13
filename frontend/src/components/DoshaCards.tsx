import { Link } from "react-router-dom";
import { Wind, Flame, Droplets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const doshas = [
  {
    name: "Vata",
    sanskrit: "वात",
    element: "Air + Éther",
    description:
      "Mouvement, créativité et légèreté. Vata gouverne tout ce qui bouge dans le corps et l'esprit.",
    qualities: ["Créatif", "Vif d'esprit", "Enthousiaste", "Flexible"],
    characteristics: "Léger, sec, froid, mobile, subtil",
    color: "vata" as const,
    icon: Wind,
  },
  {
    name: "Pitta",
    sanskrit: "पित्त",
    element: "Feu + Eau",
    description:
      "Transformation, intelligence et chaleur. Pitta gouverne la digestion et le métabolisme.",
    qualities: ["Intelligent", "Déterminé", "Leader", "Passionné"],
    characteristics: "Chaud, léger, intense, fluide, acide",
    color: "pitta" as const,
    icon: Flame,
  },
  {
    name: "Kapha",
    sanskrit: "कफ",
    element: "Eau + Terre",
    description:
      "Structure, stabilité et douceur. Kapha gouverne la force et l'immunité du corps.",
    qualities: ["Calme", "Loyal", "Patient", "Nourrissant"],
    characteristics: "Lourd, lent, froid, huileux, doux",
    color: "kapha" as const,
    icon: Droplets,
  },
];

const colorClasses = {
  vata: {
    bg: "bg-vata/10",
    border: "border-vata/30",
    text: "text-vata",
    gradient: "from-vata/20 to-vata/5",
    hoverBorder: "hover:border-vata/50",
  },
  pitta: {
    bg: "bg-pitta/10",
    border: "border-pitta/30",
    text: "text-pitta",
    gradient: "from-pitta/20 to-pitta/5",
    hoverBorder: "hover:border-pitta/50",
  },
  kapha: {
    bg: "bg-kapha/10",
    border: "border-kapha/30",
    text: "text-kapha",
    gradient: "from-kapha/20 to-kapha/5",
    hoverBorder: "hover:border-kapha/50",
  },
};

const DoshaCards = () => {
  return (
    <section className="py-16 md:py-24 bg-muted relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-vata/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-kapha/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2 tracking-wider uppercase text-sm">
            Les trois énergies vitales
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-4">
            Découvrez les Doshas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            En Ayurveda, les trois doshas sont les énergies fondamentales qui
            régissent notre corps et notre esprit. Chacun de nous possède une
            combinaison unique.
          </p>
        </div>

        {/* Dosha cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {doshas.map((dosha, index) => {
            const colors = colorClasses[dosha.color];
            const Icon = dosha.icon;

            return (
              <Link to="/doshas" key={dosha.name}>
                <Card
                  className={`h-full bg-card border-2 ${colors.border} ${colors.hoverBorder} transition-all duration-300 hover:shadow-hover hover:-translate-y-1 group cursor-pointer relative overflow-hidden`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-50`}
                  />

                  <CardContent className="p-6 relative">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-14 h-14 rounded-full ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <Icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                      <div>
                        <h3
                          className={`text-2xl font-display font-semibold ${colors.text}`}
                        >
                          {dosha.name}
                        </h3>
                        <span className="text-muted-foreground text-lg font-serif">
                          {dosha.sanskrit}
                        </span>
                      </div>
                    </div>

                    {/* Element */}
                    <div className="mb-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${colors.bg} ${colors.text} font-medium`}
                      >
                        {dosha.element}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {dosha.description}
                    </p>

                    {/* Qualities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dosha.qualities.map((quality) => (
                        <span
                          key={quality}
                          className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                        >
                          {quality}
                        </span>
                      ))}
                    </div>

                    {/* Characteristics */}
                    <p className="text-xs text-muted-foreground/70 italic">
                      {dosha.characteristics}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DoshaCards;
