import { Link } from "react-router-dom";
import { Leaf, Instagram, Facebook, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl font-display font-semibold">
                Ayuressence
              </span>
            </Link>
            <p className="text-background/70 text-sm max-w-md mb-6">
              Découvrez l'art de vivre ayurvédique et retrouvez votre équilibre
              naturel.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Accueil", href: "/" },
                { name: "Qu'est-ce que l'Ayurveda", href: "/ayurveda" },
                { name: "Quiz Dosha", href: "/quiz" },
                { name: "Ritucharya", href: "/ritucharya" },
              ].map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold mb-4">
              Informations
            </h4>
            <ul className="space-y-2">
              {["Mentions légales", "Politique de confidentialité", "CGU"].map(
                (l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-background/70 hover:text-primary transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Ayuressence. Tous droits réservés.
          </p>
          <p className="text-xs text-background/40 italic font-display">
            "L'Ayurveda est la connaissance de la vie"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
