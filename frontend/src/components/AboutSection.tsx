import { Heart, Sun, Moon, Leaf } from "lucide-react";

const principles = [
  {
    icon: Heart,
    title: "Holistique",
    description:
      "L'Ayurveda considère l'être humain dans sa globalité : corps, esprit et âme sont interconnectés.",
  },
  {
    icon: Sun,
    title: "Personnalisé",
    description:
      "Chaque individu est unique. Les recommandations sont adaptées à votre constitution personnelle.",
  },
  {
    icon: Moon,
    title: "Préventif",
    description:
      "Plutôt que de traiter les symptômes, l'Ayurveda vise à maintenir l'équilibre et prévenir les déséquilibres.",
  },
  {
    icon: Leaf,
    title: "Naturel",
    description:
      "Utilisation de remèdes naturels, d'herbes, d'alimentation adaptée et de routines de vie équilibrées.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              L'ancienne sagesse
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Qu'est-ce que l'Ayurveda ?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              L'Ayurveda, "science de la vie" en sanskrit, est l'un des plus
              anciens systèmes de médecine holistique au monde. Né en Inde il y
              a plus de 5000 ans, il offre une approche complète du bien-être.
            </p>
            <p className="text-muted-foreground mb-8">
              Cette sagesse ancestrale enseigne que la santé n'est pas
              simplement l'absence de maladie, mais un état d'équilibre parfait
              entre le corps, l'esprit et l'âme. En comprenant votre
              constitution unique (Prakriti) et vos déséquilibres actuels
              (Vikriti), vous pouvez retrouver l'harmonie et vivre une vie plus
              épanouie.
            </p>

            {/* Quote */}
            <blockquote className="border-l-4 border-primary pl-6 py-2 mb-8">
              <p className="font-serif text-xl italic text-foreground">
                "Lorsque le régime alimentaire est correct, la médecine n'est
                pas nécessaire. Lorsque le régime alimentaire est incorrect, la
                médecine est inutile."
              </p>
              <footer className="text-sm text-muted-foreground mt-2">
                — Proverbe Ayurvédique
              </footer>
            </blockquote>
          </div>

          {/* Principles Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 border border-border animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
