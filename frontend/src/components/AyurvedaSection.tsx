import { Sparkles, User, Shield, Heart } from "lucide-react";

const elements = [
  {
    name: "Éther",
    sanskrit: "Akasha",
    description: "L'espace",
    color: "bg-ether/20 text-ether border-ether/30",
  },
  {
    name: "Air",
    sanskrit: "Vayu",
    description: "Le mouvement",
    color: "bg-air/20 text-air border-air/30",
  },
  {
    name: "Feu",
    sanskrit: "Agni",
    description: "La transformation",
    color: "bg-fire/20 text-fire border-fire/30",
  },
  {
    name: "Eau",
    sanskrit: "Apas",
    description: "La cohésion",
    color: "bg-water/20 text-water border-water/30",
  },
  {
    name: "Terre",
    sanskrit: "Prithvi",
    description: "La structure",
    color: "bg-earth/20 text-earth border-earth/30",
  },
];

const principles = [
  {
    icon: User,
    title: "Médecine de la personne",
    points: ["Chaque individu est unique", "Approche personnalisée"],
  },
  {
    icon: Shield,
    title: "Prévention avant tout",
    points: ["Maintenir l'équilibre naturel", "Éviter la maladie"],
  },
  {
    icon: Heart,
    title: "Vision holistique",
    points: ["Corps, esprit, environnement", "Tout est connecté"],
  },
];

const AyurvedaSection = () => {
  return (
    <>
      {/* What is Ayurveda */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent to-background overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Science millénaire
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4">
            Qu'est-ce que l'Ayurveda ?
          </h2>

          <p className="text-3xl md:text-4xl font-display text-primary/80 mb-4">
            आयुर्वेद
          </p>

          <p className="text-xl text-muted-foreground mb-10">
            <span className="font-semibold">Ayur</span> (Vie) +{" "}
            <span className="font-semibold">Veda</span> (Connaissance) = La
            science de la vie
          </p>

          <div className="text-left max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              L'Ayurveda est le système de santé le plus ancien au monde. Cette
              médecine traditionnelle indienne, vieille de près de 5 000 ans, va
              bien au-delà du soin : c'est un art de vivre qui nous invite à
              devenir acteur de notre propre santé.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              L'Ayurveda relie le corps, l'esprit et l'âme. Elle cherche à
              équilibrer chaque individu en fonction de sa nature unique.
            </p>

            <div className="mt-10 p-6 bg-accent rounded-2xl border border-border">
              <p className="text-lg font-display italic text-foreground text-center">
                "L'Ayurveda nous enseigne à vivre en harmonie avec notre vraie
                nature."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground text-center mb-12">
            Les Principes Fondamentaux
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-card p-8 rounded-2xl border border-border shadow-soft"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <principle.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                  {principle.title}
                </h3>
                <ul className="space-y-2">
                  {principle.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Elements */}
      <section id="elements" className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
              Les 5 Éléments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tout dans l'univers, y compris notre corps, est composé de ces
              cinq éléments fondamentaux
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {elements.map((element, index) => (
              <div
                key={element.name}
                className={`p-6 rounded-2xl border-2 ${element.color} text-center min-w-[140px] hover:scale-105 transition-transform cursor-pointer`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-2xl font-display font-semibold mb-1">
                  {element.name}
                </p>
                <p className="text-sm opacity-80 italic mb-2">
                  {element.sanskrit}
                </p>
                <p className="text-xs">{element.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AyurvedaSection;
