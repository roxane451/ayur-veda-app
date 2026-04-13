import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Sun,
  Snowflake,
  CloudRain,
  Wind,
  Flame,
  Droplets,
  Sparkles,
  Calendar,
  Heart,
  ArrowRight,
  Clock,
  Utensils,
  Moon,
  Sunrise,
  Activity,
} from "lucide-react";

const seasons = [
  {
    id: "automne",
    name: "Automne",
    period: "Septembre - Novembre",
    emoji: "🍂",
    dosha: "Vata",
    elements: "Air + Éther",
    qualities: "Sec, Froid, Mobile",
    icon: Wind,
    color: "vata",
    bgClass: "bg-vata/10",
    borderClass: "border-vata/30",
    textClass: "text-vata",
    challenges:
      "Avec la diminution de la lumière et l'arrivée du froid, Vata s'accumule naturellement. Cette saison peut apporter sécheresse, irrégularité, anxiété et dispersion mentale.",
    foodsGood: [
      "Aliments chauds, humides et nourrissants",
      "Soupes, ragoûts et bouillons",
      "Céréales complètes (riz, quinoa)",
      "Légumes racines (carottes, patates douces, betteraves)",
      "Épices réchauffantes : gingembre, cannelle, cardamome, cumin",
      "Huiles et matières grasses de qualité (ghee, huile de sésame)",
    ],
    foodsBad: [
      "Aliments crus et froids",
      "Salades crues et crudités",
      "Aliments secs (crackers, biscuits secs)",
      "Boissons glacées",
    ],
    rituals: {
      morning: [
        "Réveil doux, sans alarme stridente",
        "Gratter la langue pour éliminer les toxines",
        "Boire une tasse d'eau tiède avec du gingembre frais",
        "Abhyanga : auto-massage à l'huile de sésame tiède (15 minutes avant la douche)",
      ],
      day: [
        "Respecter des horaires réguliers pour les repas",
        "Pratiquer le yoga doux (Yin yoga, Hatha yoga)",
        "Marche consciente dans la nature",
        "Limiter les stimulations excessives (écrans, bruits)",
      ],
      evening: [
        "Dîner léger avant 19h",
        "Tisane calmante (camomille, ashwagandha)",
        "Rituel de coucher régulier",
        "Lecture apaisante ou méditation",
      ],
    },
    plants: [
      { name: "Ashwagandha", benefit: "tonique nerveux, réduit le stress" },
      { name: "Tulsi (basilic sacré)", benefit: "adaptogène, immunité" },
      { name: "Triphala", benefit: "détoxification douce" },
      { name: "Chaï masala", benefit: "mélange d'épices réchauffant" },
    ],
  },
  {
    id: "hiver",
    name: "Hiver",
    period: "Décembre - Février",
    emoji: "❄️",
    dosha: "Kapha",
    elements: "Eau + Terre",
    qualities: "Lourd, Froid, Humide",
    icon: Snowflake,
    color: "kapha",
    bgClass: "bg-kapha/10",
    borderClass: "border-kapha/30",
    textClass: "text-kapha",
    challenges:
      "Le froid et l'humidité augmentent Kapha, pouvant entraîner lourdeur, léthargie, congestion et ralentissement du métabolisme.",
    foodsGood: [
      "Aliments chauds, légers et stimulants",
      "Soupes épicées et bouillons clairs",
      "Légumes amers et astringents (légumes verts, crucifères)",
      "Céréales légères (millet, orge, sarrasin)",
      "Épices stimulantes : poivre noir, piment, moutarde, ail, gingembre",
      "Miel cru (avec modération)",
    ],
    foodsBad: [
      "Produits laitiers en excès",
      "Aliments lourds et gras",
      "Aliments sucrés",
      "Viandes rouges",
    ],
    rituals: {
      morning: [
        "Lever tôt (avant 6h pour éviter la léthargie)",
        "Bain de bouche à l'huile (oil pulling)",
        "Exercice dynamique : course, yoga vinyasa, salutations au soleil",
        "Douche chaude suivie d'un jet d'eau froide",
      ],
      day: [
        "Activité physique régulière et stimulante",
        "Exposition à la lumière naturelle",
        "Éviter les siestes",
        "Stimulation mentale (apprentissage, créativité)",
      ],
      evening: [
        "Dîner très léger",
        "Tisane digestive (gingembre, fenouil)",
        "Éviter de se coucher trop tôt",
      ],
    },
    plants: [
      {
        name: "Trikatu",
        benefit: "mélange poivre/gingembre pour stimuler Agni",
      },
      { name: "Guggul", benefit: "détoxification, métabolisme" },
      { name: "Curcuma", benefit: "anti-inflammatoire, immunité" },
      { name: "Cannelle", benefit: "stimule la circulation" },
    ],
  },
  {
    id: "printemps",
    name: "Printemps",
    period: "Mars - Mai",
    emoji: "🌺",
    dosha: "Kapha",
    elements: "Eau + Terre",
    qualities: "Humide, Lourd, Doux",
    icon: CloudRain,
    color: "kapha",
    bgClass: "bg-kapha/10",
    borderClass: "border-kapha/30",
    textClass: "text-kapha",
    challenges:
      "Avec le réchauffement, le kapha accumulé pendant l'hiver se dissout, pouvant entraîner rhumes, allergies, sinusites et troubles digestifs.",
    foodsGood: [
      "Aliments légers, amers et astringents",
      "Légumes verts à feuilles (épinards, kale, roquette)",
      "Légumes verts (asperges, brocolis, haricots verts)",
      "Céréales anciennes (quinoa, millet)",
      "Épices piquantes : poivre de cayenne, moutarde",
      "Aliments détoxifiants",
    ],
    foodsBad: [
      "Produits laitiers",
      "Aliments lourds et huileux",
      "Sucres raffinés",
      "Excès de sel",
    ],
    rituals: {
      morning: [
        "Lever avec le soleil",
        "Exercice cardiovasculaire intense",
        "Respiration énergisante (Kapalabhati pranayama)",
        "Massage à sec (avec gant de soie ou brosse)",
      ],
      day: [
        "Activités stimulantes en plein air",
        "Jeûne intermittent ou mono-diète (consulter un praticien)",
        "Limiter les collations",
        "Rester actif et dynamique",
      ],
      evening: [
        "Dîner léger et tôt",
        "Tisane détoxifiante",
        "Relaxation active (pas de somnolence)",
      ],
    },
    plants: [
      { name: "Guduchi", benefit: "détoxification printanière" },
      { name: "Neem", benefit: "purifiant sanguin" },
      { name: "Citron frais", benefit: "détoxifiant, alcalinisant" },
      { name: "Cumin, coriandre, fenouil", benefit: "digestion légère" },
    ],
  },
  {
    id: "ete",
    name: "Été",
    period: "Juin - Août",
    emoji: "☀️",
    dosha: "Pitta",
    elements: "Feu + Eau",
    qualities: "Chaud, Intense, Léger",
    icon: Sun,
    color: "pitta",
    bgClass: "bg-pitta/10",
    borderClass: "border-pitta/30",
    textClass: "text-pitta",
    challenges:
      "La chaleur et l'intensité solaire augmentent Pitta, pouvant causer irritabilité, inflammation, acidité, coup de soleil et problèmes cutanés.",
    foodsGood: [
      "Aliments frais et rafraîchissants (mais pas glacés)",
      "Fruits juteux (pastèque, melon, raisin, mangue)",
      "Légumes d'été (concombre, courgette, fenouil)",
      "Céréales rafraîchissantes (riz basmati, orge)",
      "Lait végétaux : coco, amande",
      "Herbes fraîches : menthe, coriandre",
      "Saveurs douces, amères et astringentes",
    ],
    foodsBad: [
      "Aliments épicés et piquants",
      "Aliments acides (tomates, yaourt fermenté)",
      "Alcool",
      "Viandes rouges",
      "Friture",
    ],
    rituals: {
      morning: [
        "Activité physique tôt (avant la chaleur)",
        "Yoga doux et lunaire",
        "Méditation rafraîchissante",
        "Auto-massage à l'huile de coco",
      ],
      day: [
        "Éviter le soleil de midi (11h-15h)",
        "Sieste courte permise (20 minutes)",
        "Marche au bord de l'eau",
        "Port de vêtements légers et clairs",
      ],
      evening: [
        "Dîner léger et frais",
        "Promenade au clair de lune",
        "Bain tiède (pas chaud)",
        "Respiration lunaire (Chandra Bhedana)",
      ],
    },
    plants: [
      { name: "Amalaki", benefit: "vitamine C, rafraîchissant" },
      { name: "Brahmi", benefit: "calme l'esprit Pitta" },
      { name: "Rose", benefit: "rafraîchit le cœur et les émotions" },
      { name: "Menthe", benefit: "digestif rafraîchissant" },
      { name: "Cardamome", benefit: "douce et rafraîchissante" },
    ],
  },
];

const doshaBalance = [
  {
    dosha: "Vata",
    icon: Wind,
    color: "vata",
    tips: [
      "Régularité dans les horaires",
      "Chaleur et humidité",
      "Massage à l'huile quotidien",
      "Aliments chauds et onctueux",
      "Repos suffisant",
      "Environnement calme et stable",
    ],
  },
  {
    dosha: "Pitta",
    icon: Flame,
    color: "pitta",
    tips: [
      "Modération et fraîcheur",
      "Éviter la surchauffe physique et mentale",
      "Activités apaisantes",
      "Aliments frais et doux",
      "Temps dans la nature",
      "Lâcher-prise et acceptation",
    ],
  },
  {
    dosha: "Kapha",
    icon: Droplets,
    color: "kapha",
    tips: [
      "Mouvement et stimulation",
      "Légèreté dans l'alimentation",
      "Exercice régulier et intense",
      "Réveil matinal",
      "Nouveauté et changement",
      "Chaleur sèche",
    ],
  },
];

const Ritucharya = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            Ritucharya
          </span>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Vivre au rythme des <span className="text-primary">saisons</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            En Ayurveda, Ritucharya désigne l'art de vivre en harmonie avec les
            saisons. Découvrez comment adapter votre alimentation, vos routines
            et vos soins selon chaque saison pour maintenir l'équilibre de vos
            doshas.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {seasons.map((season) => (
              <a
                key={season.id}
                href={`#${season.id}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${season.bgClass} ${season.textClass} border ${season.borderClass} font-medium transition-all hover:scale-105`}
              >
                <season.icon className="w-4 h-4" />
                {season.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Seasons Sections */}
      {seasons.map((season, index) => (
        <section
          key={season.id}
          id={season.id}
          className={`py-16 md:py-24 ${
            index % 2 === 0 ? "bg-muted/30" : "bg-background"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Season Header */}
            <div className="text-center mb-12">
              <span className="text-5xl mb-4 block">{season.emoji}</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                {season.name.toUpperCase()}
              </h2>
              <p className="text-muted-foreground mb-4">{season.period}</p>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${season.bgClass} ${season.textClass} border ${season.borderClass}`}
              >
                <season.icon className="w-5 h-5" />
                <span className="font-medium">Saison {season.dosha}</span>
                <span className="text-sm opacity-75">
                  • {season.elements} • {season.qualities}
                </span>
              </div>
            </div>

            {/* Challenges */}
            <div
              className={`rounded-2xl p-6 md:p-8 ${season.bgClass} border ${season.borderClass} mb-8`}
            >
              <h3
                className={`font-serif text-xl font-semibold ${season.textClass} mb-3`}
              >
                Les défis de {season.name.toLowerCase()}
              </h3>
              <p className="text-foreground/80">{season.challenges}</p>
            </div>

            {/* Food Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    À privilégier
                  </h3>
                </div>
                <ul className="space-y-2">
                  {season.foodsGood.map((food, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="text-green-500 mt-1">✓</span>
                      {food}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    À éviter
                  </h3>
                </div>
                <ul className="space-y-2">
                  {season.foodsBad.map((food, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="text-red-500 mt-1">✗</span>
                      {food}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rituals */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Sunrise className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    Le matin
                  </h3>
                </div>
                <ul className="space-y-2">
                  {season.rituals.morning.map((ritual, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {ritual}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    Dans la journée
                  </h3>
                </div>
                <ul className="space-y-2">
                  {season.rituals.day.map((ritual, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {ritual}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    Le soir
                  </h3>
                </div>
                <ul className="space-y-2">
                  {season.rituals.evening.map((ritual, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {ritual}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Plants */}
            <div
              className={`rounded-2xl p-6 md:p-8 ${season.bgClass} border ${season.borderClass}`}
            >
              <h3
                className={`font-serif text-xl font-semibold ${season.textClass} mb-4`}
              >
                🌿 Plantes et épices recommandées
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {season.plants.map((plant, i) => (
                  <div key={i} className="bg-background/50 rounded-xl p-4">
                    <p className="font-semibold text-foreground">
                      {plant.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {plant.benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Transitions Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-4xl mb-4 block">📅</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transitions Saisonnières
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <strong>Ritu Sandhi</strong> : Les maladies naissent souvent aux
              transitions entre les saisons, qui durent environ 2 semaines (7
              jours avant + 7 jours après le changement).
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border max-w-3xl mx-auto">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Pratiques pendant les transitions
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                "Panchakarma léger : détoxification douce",
                "Jeûne intermittent ou mono-diète (selon constitution)",
                "Méditation quotidienne accrue",
                "Introspection et ajustement des routines",
                "Éviter les changements brusques d'alimentation",
                "Renforcer l'immunité (plantes adaptogènes)",
              ].map((practice, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <span className="text-primary mt-1">✓</span>
                  {practice}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Daily Rituals by Dosha */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-4xl mb-4 block">🧘</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Rituels Quotidiens par Dosha
            </h2>
            <p className="text-lg text-muted-foreground">
              Conseils généraux à appliquer toute l'année selon votre
              constitution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {doshaBalance.map((item) => (
              <div
                key={item.dosha}
                className={`bg-${item.color}/10 border-2 border-${item.color}/30 rounded-2xl p-6 hover:shadow-hover transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-${item.color}/20 flex items-center justify-center`}
                  >
                    <item.icon className={`w-6 h-6 text-${item.color}`} />
                  </div>
                  <h3
                    className={`font-serif text-xl font-bold text-${item.color}`}
                  >
                    {item.dosha}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {item.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-foreground/80"
                    >
                      <span className={`text-${item.color} mt-1`}>•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-4xl mb-4 block">💡</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Conseils Pratiques
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                Comment adapter ces recommandations ?
              </h3>
              <ol className="space-y-4">
                {[
                  {
                    title: "Connaissez votre constitution (Prakriti)",
                    desc: "Faites le quiz des doshas",
                  },
                  {
                    title: "Identifiez vos déséquilibres actuels (Vikriti)",
                    desc: "Symptômes présents",
                  },
                  {
                    title: "Tenez compte de la saison",
                    desc: "Dosha dominant saisonnier",
                  },
                  {
                    title: "Adaptez progressivement",
                    desc: "Changements doux, pas radicaux",
                  },
                  {
                    title: "Écoutez votre corps",
                    desc: "L'Ayurveda est flexible et intuitive",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                Principe général d'équilibre
              </h3>
              <p className="text-lg text-foreground/80 italic mb-6">
                "Les semblables augmentent les semblables, les opposés
                équilibrent."
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Wind className="w-5 h-5 text-vata flex-shrink-0 mt-1" />
                  <p className="text-foreground/80">
                    <strong className="text-vata">Vata</strong> (froid, sec,
                    léger) → Privilégiez le chaud, l'humide, le nourrissant
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-pitta flex-shrink-0 mt-1" />
                  <p className="text-foreground/80">
                    <strong className="text-pitta">Pitta</strong> (chaud,
                    intense, acide) → Privilégiez le frais, le doux, le calmant
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-kapha flex-shrink-0 mt-1" />
                  <p className="text-foreground/80">
                    <strong className="text-kapha">Kapha</strong> (froid, lourd,
                    lent) → Privilégiez le chaud, le léger, le stimulant
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-primary-foreground" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Découvrez votre constitution unique
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Faites notre quiz personnalisé pour connaître votre dosha dominant
            et recevoir des recommandations adaptées à chaque saison.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
            asChild
          >
            <Link to="/quiz" className="inline-flex items-center gap-2">
              Faire le quiz Dosha
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ritucharya;
