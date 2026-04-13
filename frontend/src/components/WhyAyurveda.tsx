import { Clock, User, Award } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "5000 ans de sagesse",
    description:
      "Une science millénaire éprouvée par le temps, transmise de génération en génération et adaptée au monde moderne.",
  },
  {
    icon: User,
    title: "Approche personnalisée",
    description:
      "Chaque individu est unique. L'Ayurveda propose des solutions sur-mesure adaptées à votre constitution.",
  },
  {
    icon: Award,
    title: "Reconnu par l'OMS",
    description:
      "L'Organisation Mondiale de la Santé reconnaît l'Ayurveda comme un système médical traditionnel efficace.",
  },
];

const WhyAyurveda = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4">
            Pourquoi l'Ayurveda ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une approche holistique de la santé qui a fait ses preuves depuis
            des millénaires
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <reason.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAyurveda;
