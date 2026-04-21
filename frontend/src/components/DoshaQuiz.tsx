import { useState } from "react";
import { ChevronLeft, Sparkles, Flame, Wind, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { calculateResults, type QuizOption } from "@/lib/doshaLogic";

const QuizData = {
  categories: [
    {
      name: "Constitution Physique",
      questions: [
        {
          q: "Votre morphologie générale ?",
          options: [
            {
              text: "Mince, ossature fine, difficile de prendre du poids",
              vata: 3,
            },
            { text: "Moyenne, musclée, poids stable", pitta: 3 },
            { text: "Forte, tendance à prendre du poids facilement", kapha: 3 },
          ],
        },
        {
          q: "Votre taille ?",
          options: [
            { text: "Très petit(e) ou très grand(e)", vata: 2 },
            { text: "Moyenne", pitta: 2 },
            { text: "Moyenne à grande, carrure large", kapha: 2 },
          ],
        },
        {
          q: "Vos articulations ?",
          options: [
            { text: "Fines, craquent souvent, saillantes", vata: 2 },
            { text: "Moyennes, souples", pitta: 2 },
            { text: "Larges, bien lubrifiées", kapha: 2 },
          ],
        },
        {
          q: "Votre poids ?",
          options: [
            { text: "Difficile de prendre du poids", vata: 3 },
            { text: "Fluctue facilement selon alimentation", pitta: 2 },
            {
              text: "Prend du poids facilement, difficile de perdre",
              kapha: 3,
            },
          ],
        },
        {
          q: "Votre température corporelle ?",
          options: [
            { text: "Toujours froid(e), mains/pieds glacés", vata: 3 },
            { text: "Souvent chaud(e), transpire facilement", pitta: 3 },
            { text: "Température stable, résiste au froid", kapha: 2 },
          ],
        },
      ],
    },
    {
      name: "Digestion & Appétit",
      questions: [
        {
          q: "Votre appétit ?",
          options: [
            { text: "Irrégulier, parfois oublie de manger", vata: 3 },
            { text: "Fort, faim intense, irritable si repas sauté", pitta: 3 },
            { text: "Modéré, peut sauter des repas sans problème", kapha: 2 },
          ],
        },
        {
          q: "Votre digestion ?",
          options: [
            { text: "Irrégulière, ballonnements, gaz", vata: 3 },
            { text: "Forte, rapide, brûlures possibles", pitta: 3 },
            { text: "Lente, lourdeur après repas", kapha: 3 },
          ],
        },
        {
          q: "Après un gros repas ?",
          options: [
            { text: "Ballonné(e), inconfortable", vata: 2 },
            { text: "Digère bien mais soif intense", pitta: 2 },
            { text: "Lourd(e), envie de sieste", kapha: 3 },
          ],
        },
        {
          q: "Votre transit ?",
          options: [
            { text: "Tendance constipation, selles sèches", vata: 3 },
            { text: "Régulier, 1-2x/jour, selles molles", pitta: 2 },
            { text: "Lent, selles épaisses", kapha: 2 },
          ],
        },
        {
          q: "Votre soif ?",
          options: [
            { text: "Variable, oublie de boire", vata: 2 },
            { text: "Grande soif, boit beaucoup", pitta: 3 },
            { text: "Faible soif", kapha: 2 },
          ],
        },
      ],
    },
    {
      name: "Mental & Émotions",
      questions: [
        {
          q: "Votre mental ?",
          options: [
            { text: "Rapide, créatif, dispersé", vata: 3 },
            { text: "Vif, concentré, analytique", pitta: 3 },
            { text: "Calme, lent, méthodique", kapha: 2 },
          ],
        },
        {
          q: "Votre mémoire ?",
          options: [
            { text: "Apprend vite, oublie vite", vata: 3 },
            { text: "Mémoire précise et claire", pitta: 2 },
            { text: "Apprend lentement, retient longtemps", kapha: 3 },
          ],
        },
        {
          q: "Face au stress ?",
          options: [
            { text: "Anxiété, inquiétude, panique", vata: 3 },
            { text: "Irritabilité, colère, frustration", pitta: 3 },
            { text: "Retrait, déni, léthargie", kapha: 2 },
          ],
        },
        {
          q: "Votre humeur ?",
          options: [
            { text: "Change rapidement, imprévisible", vata: 3 },
            { text: "Stable mais intense émotionnellement", pitta: 2 },
            { text: "Très stable, égale", kapha: 2 },
          ],
        },
        {
          q: "Face aux changements ?",
          options: [
            { text: "Adore la nouveauté mais angoisse", vata: 3 },
            { text: "Accepte si logique", pitta: 2 },
            { text: "Résiste, préfère routine", kapha: 3 },
          ],
        },
      ],
    },
    {
      name: "Énergie & Sommeil",
      questions: [
        {
          q: "Votre niveau d'énergie ?",
          options: [
            { text: "En dents de scie, pics et creux", vata: 3 },
            { text: "Élevé, constant dans la journée", pitta: 2 },
            { text: "Stable mais lent au démarrage", kapha: 2 },
          ],
        },
        {
          q: "Votre sommeil ?",
          options: [
            { text: "Léger, entrecoupé, insomnie", vata: 3 },
            { text: "Moyen, dort 6-7h, se réveille facilement", pitta: 2 },
            { text: "Profond, long (8-10h), difficile de se lever", kapha: 3 },
          ],
        },
        {
          q: "Le matin au réveil ?",
          options: [
            { text: "Difficile, brouillard mental", vata: 2 },
            { text: "Éveillé(e) rapidement", pitta: 2 },
            { text: "Très difficile, besoin de 30min+", kapha: 3 },
          ],
        },
        {
          q: "Votre rythme préféré ?",
          options: [
            { text: "Irrégulier, spontané", vata: 2 },
            { text: "Structuré, planifié", pitta: 2 },
            { text: "Lent, sans pression", kapha: 2 },
          ],
        },
      ],
    },
    {
      name: "Peau, Cheveux, Ongles",
      questions: [
        {
          q: "Votre peau ?",
          options: [
            { text: "Sèche, fine, rides précoces", vata: 3 },
            { text: "Sensible, rougeurs, acné, grasse", pitta: 3 },
            { text: "Épaisse, grasse, pores dilatés", kapha: 3 },
          ],
        },
        {
          q: "Vos cheveux ?",
          options: [
            { text: "Secs, fins, cassants, frisottent", vata: 3 },
            { text: "Fins, gras, grisonnent tôt, roux/blonds", pitta: 2 },
            { text: "Épais, gras, ondulés, foncés", kapha: 2 },
          ],
        },
        {
          q: "Votre transpiration ?",
          options: [
            { text: "Peu ou pas", vata: 2 },
            { text: "Abondante, odeur forte", pitta: 3 },
            { text: "Modérée, odeur douce", kapha: 2 },
          ],
        },
        {
          q: "Vos lèvres ?",
          options: [
            { text: "Sèches, gercent facilement", vata: 3 },
            { text: "Moyennes, rougissent", pitta: 1 },
            { text: "Pleines, humides", kapha: 2 },
          ],
        },
      ],
    },
    {
      name: "Comportement",
      questions: [
        {
          q: "Vos dépenses ?",
          options: [
            { text: "Impulsives, dépense vite", vata: 2 },
            { text: "Calculées, investissements", pitta: 2 },
            { text: "Économe, accumule", kapha: 2 },
          ],
        },
        {
          q: "En société ?",
          options: [
            { text: "Sociable mais fatigue vite", vata: 2 },
            { text: "Leader naturel, compétitif", pitta: 2 },
            { text: "Timide, observe, fidèle", kapha: 2 },
          ],
        },
        {
          q: "Votre rapport au temps ?",
          options: [
            { text: "Toujours en retard, temps distordu", vata: 3 },
            { text: "Ponctuel(le), impatient(e)", pitta: 2 },
            { text: "Lent(e), besoin de temps", kapha: 2 },
          ],
        },
      ],
    },
    {
      name: "Déséquilibres",
      questions: [
        {
          q: "Quand vous êtes déséquilibré(e) ?",
          options: [
            { text: "Anxiété, insomnie, constipation", vata: 3 },
            { text: "Colère, acidité, inflammation", pitta: 3 },
            { text: "Léthargie, prise de poids, mucus", kapha: 3 },
          ],
        },
        {
          q: "Vos douleurs fréquentes ?",
          options: [
            { text: "Articulaires, sèches, migrantes", vata: 2 },
            { text: "Brûlures, inflammations", pitta: 2 },
            { text: "Lourdeur, congestion", kapha: 2 },
          ],
        },
        {
          q: "Saison où vous vous sentez le moins bien ?",
          options: [
            { text: "Automne/hiver (froid, sec, venteux)", vata: 3 },
            { text: "Été (chaud, humide)", pitta: 3 },
            { text: "Printemps (humide, lourd)", kapha: 3 },
          ],
        },
      ],
    },
  ],
};

const DoshaQuiz = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);

  const allQuestions = QuizData.categories.flatMap((cat) => cat.questions);
  const totalQuestions = allQuestions.length;
  const currentGlobalIndex = answers.length;
  const progress = (currentGlobalIndex / totalQuestions) * 100;

  const handleAnswer = (option: QuizOption) => {
    setAnswers([...answers, option]);

    const currentCategory = QuizData.categories[currentCategoryIndex];

    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < QuizData.categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (answers.length === 0) return;

    const newAnswers = [...answers];
    newAnswers.pop();
    setAnswers(newAnswers);

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setCurrentQuestionIndex(
        QuizData.categories[currentCategoryIndex - 1].questions.length - 1,
      );
    }
  };

  // Délègue le calcul au module doshaLogic — logique pure, testée indépendamment
  const runCalculateResults = () => calculateResults(answers);

  const doshaInfo = {
    vata: {
      icon: <Wind className="w-8 h-8" />,
      colorClass: "bg-vata-muted border-vata/30 text-vata",
      barClass: "bg-vata",
      description: "Air + Éther • Mouvement, Créativité, Légèreté",
      traits: [
        "Mental vif",
        "Constitution fine",
        "Digestion irrégulière",
        "Tendance anxiété",
      ],
      recommendations: [
        "Routine régulière",
        "Aliments chauds & huileux",
        "Massage huile sésame",
        "Sommeil avant 22h",
      ],
    },
    pitta: {
      icon: <Flame className="w-8 h-8" />,
      colorClass: "bg-pitta-muted border-pitta/30 text-pitta",
      barClass: "bg-pitta",
      description: "Feu + Eau • Transformation, Intelligence, Chaleur",
      traits: [
        "Mental précis",
        "Constitution moyenne",
        "Digestion forte",
        "Tendance colère",
      ],
      recommendations: [
        "Fraîcheur & modération",
        "Aliments frais & sucrés",
        "Massage huile coco",
        "Activités apaisantes",
      ],
    },
    kapha: {
      icon: <Droplets className="w-8 h-8" />,
      colorClass: "bg-kapha-muted border-kapha/30 text-kapha",
      barClass: "bg-kapha",
      description: "Eau + Terre • Structure, Stabilité, Douceur",
      traits: [
        "Mental calme",
        "Constitution solide",
        "Digestion lente",
        "Tendance léthargie",
      ],
      recommendations: [
        "Mouvement & stimulation",
        "Aliments légers & épicés",
        "Massage huile moutarde",
        "Réveil avant 6h",
      ],
    },
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl shadow-card p-8 md:p-12 border border-border">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Quiz Dosha Ayurveda
            </h2>
            <p className="text-lg text-muted-foreground">
              Découvrez votre constitution ayurvédique en 5 minutes
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-vata-muted rounded-xl border border-vata/20">
              <Wind className="w-6 h-6 text-vata mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">VATA</h3>
                <p className="text-sm text-muted-foreground">
                  Créativité, mouvement, légèreté
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-pitta-muted rounded-xl border border-pitta/20">
              <Flame className="w-6 h-6 text-pitta mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">PITTA</h3>
                <p className="text-sm text-muted-foreground">
                  Intelligence, transformation, chaleur
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-kapha-muted rounded-xl border border-kapha/20">
              <Droplets className="w-6 h-6 text-kapha mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">KAPHA</h3>
                <p className="text-sm text-muted-foreground">
                  Stabilité, structure, douceur
                </p>
              </div>
            </div>
          </div>

          <div className="bg-accent rounded-xl p-4 mb-8 border border-border">
            <p className="text-sm text-foreground">
              <strong>📋 {totalQuestions} questions</strong> • Répondez
              instinctivement selon ce qui vous correspond le plus souvent.
            </p>
          </div>

          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={() => setStarted(true)}
          >
            Commencer le Quiz
          </Button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const { percentages, profile } = runCalculateResults();

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-2xl shadow-card p-8 md:p-12 border border-border">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Vos Résultats
            </h2>
            <p className="text-xl text-primary font-semibold">
              {profile.label}
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {(
              Object.entries(percentages) as [keyof typeof doshaInfo, string][]
            ).map(([dosha, percent]) => {
              const info = doshaInfo[dosha];
              return (
                <div key={dosha} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "p-2 rounded-lg border-2",
                          info.colorClass,
                        )}
                      >
                        {info.icon}
                      </span>
                      <span className="font-semibold text-foreground uppercase">
                        {dosha}
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-foreground">
                      {percent}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out",
                        info.barClass,
                      )}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {(
              Object.entries(doshaInfo) as [
                keyof typeof doshaInfo,
                (typeof doshaInfo)[keyof typeof doshaInfo],
              ][]
            ).map(([dosha, info]) => (
              <div
                key={dosha}
                className={cn("border-2 rounded-2xl p-6", info.colorClass)}
              >
                <div className="flex items-center gap-2 mb-3">
                  {info.icon}
                  <h3 className="font-serif font-bold text-lg uppercase">
                    {dosha}
                  </h3>
                </div>
                <p className="text-sm mb-4 font-medium opacity-80">
                  {info.description}
                </p>

                <div className="mb-4">
                  <p className="font-semibold text-sm mb-2">
                    Caractéristiques :
                  </p>
                  <ul className="text-xs space-y-1 opacity-80">
                    {info.traits.map((trait, i) => (
                      <li key={i}>• {trait}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">
                    Recommandations :
                  </p>
                  <ul className="text-xs space-y-1 opacity-80">
                    {info.recommendations.map((rec, i) => (
                      <li key={i}>✓ {rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-accent rounded-2xl p-6 mb-8 border border-border">
            <h3 className="font-serif font-bold text-lg text-foreground mb-3">
              🌿 Prochaines Étapes
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ Identifiez vos déséquilibres actuels</li>
              <li>✓ Adaptez votre routine selon votre dosha dominant</li>
              <li>✓ Ajustez votre alimentation aux saisons</li>
              <li>
                ✓ Consultez un praticien ayurvédique pour un bilan personnalisé
              </li>
            </ul>
          </div>

          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={() => {
              setAnswers([]);
              setCurrentCategoryIndex(0);
              setCurrentQuestionIndex(0);
              setShowResults(false);
              setStarted(false);
            }}
          >
            Refaire le Quiz
          </Button>
        </div>
      </div>
    );
  }

  const currentCategory = QuizData.categories[currentCategoryIndex];
  const currentQuestion = currentCategory.questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentGlobalIndex + 1} sur {totalQuestions}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="gradient-primary h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-card p-8 md:p-10 border border-border">
        <div className="mb-6">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {currentCategory.name}
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            {currentQuestion.q}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-5 rounded-xl border-2 border-border hover:border-primary hover:bg-accent transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary flex items-center justify-center flex-shrink-0 transition-colors">
                  <span className="text-muted-foreground group-hover:text-primary font-semibold transition-colors">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
                <span className="text-foreground font-medium">
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>

        {answers.length > 0 && (
          <button
            onClick={handlePrevious}
            className="mt-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Question précédente</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DoshaQuiz;
