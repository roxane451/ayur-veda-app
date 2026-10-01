import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Motif } from "@/components/brand/BrandDefs";
import Sceau from "@/components/brand/Sceau";
import { useCompte } from "@/components/compte/CompteContext";
import { ErreurApi } from "@/lib/api";
import { lireProfil } from "@/lib/profilStorage";

const MESSAGES: Record<string, string> = {
  "Invalid credentials": "L'adresse e-mail ou le mot de passe ne correspond pas.",
  "User already exists": "Un compte existe déjà avec cette adresse. Connectez-vous plutôt.",
};

const champ =
  "h-[52px] w-full rounded-[12px] bg-carte px-4 text-base shadow-[inset_0_0_0_1.5px_hsl(var(--encre))] outline-none focus-visible:shadow-[inset_0_0_0_2.5px_hsl(var(--paon))] aria-[invalid=true]:shadow-[inset_0_0_0_2px_hsl(var(--aubergine))]";

/** Connexion et création de compte, sur la même page. */
const Acces = ({ mode }: { mode: "connexion" | "inscription" }) => {
  const compte = useCompte();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prenom, setPrenom] = useState("");
  const [voir, setVoir] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [erreursChamps, setErreursChamps] = useState<Record<string, string>>({});
  const [envoi, setEnvoi] = useState(false);
  const inscription = mode === "inscription";
  const aUnProfil = Boolean(lireProfil().nature);

  if (compte.connecte) return <Navigate to="/espace-membre" replace />;

  const envoyer = async (e: FormEvent) => {
    e.preventDefault();
    setErreur(null);
    setErreursChamps({});
    setEnvoi(true);
    try {
      if (inscription) await compte.inscription(email.trim(), password, prenom.trim());
      else await compte.connexion(email.trim(), password);
      navigate("/espace-membre", { replace: true });
    } catch (err) {
      if (err instanceof ErreurApi) {
        setErreur(MESSAGES[err.message] ?? err.message);
        if (err.details) setErreursChamps(Object.fromEntries(err.details.map((d) => [d.field, d.message])));
      } else setErreur("Une erreur est survenue.");
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <Motif id="buta" />
        <div className="relative mx-auto grid max-w-[1220px] items-start gap-10 px-4 pb-24 pt-8 sm:px-10 md:grid-cols-2 md:gap-14 md:pt-14">
          <div className="flex flex-col gap-4">
            <Sceau size={76} rotate={-8} />
            <h1 className="m-0 text-[clamp(2.4rem,5.6vw,4.25rem)] leading-none">
              {inscription ? (
                <>
                  Créer mon compte
                </>
              ) : (
                <>
                  Me connecter
                </>
              )}
            </h1>
            <p className="m-0 max-w-[44ch] text-xl text-doux">
              {inscription
                ? "Le compte garde votre nature et vos bilans de saison. Vous les retrouvez sur tous vos appareils."
                : "Pour retrouver votre nature et vos bilans de saison."}
            </p>
            {inscription && aUnProfil && (
              <p className="m-0 rounded-xl bg-citron px-5 py-3.5">Le quiz que vous avez déjà fait sera gardé sur votre compte.</p>
            )}
          </div>

          <form
            onSubmit={envoyer}
            noValidate
            className="flex flex-col gap-5 rounded-[18px] bg-carte p-6 shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:p-9"
          >
            {inscription && (
              <label className="flex flex-col gap-1.5">
                <span className="font-bold">
                  Prénom <span className="font-normal text-doux">(facultatif)</span>
                </span>
                <input className={champ} value={prenom} onChange={(e) => setPrenom(e.target.value)} autoComplete="given-name" maxLength={100} />
              </label>
            )}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-bold">
                Adresse e-mail
              </label>
              <input
                id="email"
                className={champ}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                inputMode="email"
                aria-invalid={Boolean(erreursChamps.email)}
                aria-describedby={erreursChamps.email ? "err-email" : undefined}
              />
              {erreursChamps.email && (
                <span id="err-email" className="text-[15px] text-aubergine">
                  {erreursChamps.email}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mot-de-passe" className="font-bold">
                Mot de passe
              </label>
              <span className="relative">
                <input
                  id="mot-de-passe"
                  className={`${champ} pr-14`}
                  type={voir ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={inscription ? "new-password" : "current-password"}
                  aria-invalid={Boolean(erreursChamps.password)}
                  aria-describedby={inscription ? "aide-mdp" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setVoir((v) => !v)}
                  aria-label={voir ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full hover:bg-surface"
                >
                  {voir ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                </button>
              </span>
              {inscription && (
                <span id="aide-mdp" className={`text-[15px] ${erreursChamps.password ? "text-aubergine" : "text-doux"}`}>
                  {erreursChamps.password ?? "Au moins 12 caractères, dont une majuscule ou un chiffre."}
                </span>
              )}
            </div>

            {erreur && !Object.keys(erreursChamps).length && (
              <p role="alert" className="m-0 rounded-xl px-4 py-3 text-aubergine shadow-[inset_0_0_0_1.5px_hsl(var(--aubergine))]">
                {erreur}
              </p>
            )}

            <button
              type="submit"
              disabled={envoi}
              className="inline-flex min-h-[54px] items-center justify-center rounded-buta bg-aubergine px-7 font-bold text-pistache hover:opacity-90 disabled:opacity-60"
            >
              {envoi ? "Un instant…" : inscription ? "Créer mon compte" : "Me connecter"}
            </button>

            <p className="m-0 border-t border-dashed border-trait pt-4 text-[15px]">
              {inscription ? "Déjà un compte ? " : "Pas encore de compte ? "}
              <Link to={inscription ? "/connexion" : "/inscription"} className="font-bold underline underline-offset-4">
                {inscription ? "Me connecter" : "Créer mon compte"}
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Acces;
