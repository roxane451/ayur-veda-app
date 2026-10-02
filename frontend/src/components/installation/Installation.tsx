import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useInstallation, type NavigateurIos } from "@/lib/installation";

const BOUTON =
  "inline-flex min-h-11 items-center rounded-buta px-5 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre";

const Partager = () => (
  <svg
    width="18"
    height="22"
    viewBox="0 0 18 22"
    aria-hidden="true"
    className="mx-0.5 inline-block align-[-4px]"
  >
    <path
      d="M5 8H2.5v12.5h13V8H13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M9 14V1.5M5 5.2 9 1.5l4 3.7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Les deux gestes de Safari, dans une fiche qui monte du bas de l'écran. */
const FicheIos = ({
  navigateur,
  onFermer,
}: {
  navigateur: NavigateurIos;
  onFermer: () => void;
}) => {
  const bouton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    bouton.current?.focus();
    const touche = (e: KeyboardEvent) => e.key === "Escape" && onFermer();
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [onFermer]);
  // Rendue dans <body> : elle n'hérite jamais des couleurs du bloc qui l'ouvre.
  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end bg-encre/35"
      onClick={onFermer}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="fiche-ios-titre"
        onClick={(e) => e.stopPropagation()}
        className="mx-auto flex w-full max-w-[520px] flex-col text-encre gap-3.5 rounded-t-[22px] bg-carte px-5 pb-[calc(1.75rem+env(safe-area-inset-bottom))] pt-6 shadow-[0_-1.5px_0_hsl(var(--encre))]"
      >
        <div className="flex items-center gap-3">
          <img
            src="/icons/icon-192.png"
            alt=""
            width={44}
            height={44}
            className="rounded-full"
          />
          <h2 id="fiche-ios-titre" className="m-0 text-[22px] leading-tight">
            Ajouter à l'écran d'accueil
          </h2>
        </div>
        <p className="m-0 text-doux">
          Sur iPhone et iPad, l'app s'ajoute depuis le menu Partager, en deux
          gestes.
        </p>
        <ol className="m-0 flex flex-col gap-2 pl-5">
          {navigateur === "chrome" ? (
            <li>
              Dans Chrome, touchez <b>Partager</b>
              <Partager /> en haut à droite, dans la barre d'adresse.
            </li>
          ) : navigateur === "safari" ? (
            <li>
              Dans Safari, touchez <b>Partager</b>
              <Partager /> dans la barre du navigateur.
            </li>
          ) : (
            <li>
              Ouvrez le menu <b>Partager</b>
              <Partager /> de votre navigateur.
            </li>
          )}
          <li>
            Choisissez <b>Sur l'écran d'accueil</b> ou{" "}
            <b>Ajouter à l'écran d'accueil</b>.
          </li>
        </ol>
        <button
          ref={bouton}
          type="button"
          onClick={onFermer}
          className={`${BOUTON} mt-1 self-start bg-transparent text-encre shadow-[inset_0_0_0_1.5px_hsl(var(--trait))]`}
        >
          J'ai compris
        </button>
      </div>
    </div>,
    document.body,
  );
};

/** Bandeau en bas de l'écran, à partir de la deuxième visite, jusqu'à ce qu'on le ferme. */
export const InviteInstallation = () => {
  const { bandeau, ios, installer, fermer } = useInstallation();
  const [fiche, setFiche] = useState(false);

  // Signale le bandeau à la page, pour que le bouton « haut de page » passe au-dessus.
  useEffect(() => {
    if (bandeau && !fiche) document.body.dataset.bandeau = "1";
    else delete document.body.dataset.bandeau;
    return () => {
      delete document.body.dataset.bandeau;
    };
  }, [bandeau, fiche]);

  if (fiche && ios) {
    return (
      <FicheIos
        navigateur={ios}
        onFermer={() => {
          setFiche(false);
          fermer();
        }}
      />
    );
  }
  if (!bandeau) return null;

  return (
    <aside
      aria-label="Installer l'app"
      className="fixed inset-x-3 bottom-[calc(0.875rem+env(safe-area-inset-bottom))] z-50 mx-auto flex max-w-[480px] items-center gap-3 rounded-[18px] bg-carte py-3.5 pl-4 pr-3 shadow-[0_0_0_1.5px_hsl(var(--encre))]"
    >
      <img
        src="/icons/icon-192.png"
        alt=""
        width={44}
        height={44}
        className="shrink-0 rounded-full"
      />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="m-0 text-[15px] font-bold">L'app Ayur-Veda</p>
        <p className="m-0 text-[13.5px] text-doux">
          Sur votre écran, même hors ligne.
        </p>
      </div>
      <button
        type="button"
        onClick={() => (ios ? setFiche(true) : installer())}
        className={`${BOUTON} min-h-10 shrink-0 bg-paon px-4 text-pistache hover:opacity-90`}
      >
        Installer
      </button>
      <button
        type="button"
        onClick={fermer}
        aria-label="Fermer"
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-[22px] text-doux hover:bg-surface"
      >
        ×
      </button>
    </aside>
  );
};

/** Bloc toujours présent avant le pied de page, tant que l'app n'est pas installée. */
export const BlocInstallation = () => {
  const { possible, ios, installer } = useInstallation();
  const [fiche, setFiche] = useState(false);
  if (!possible) return null;
  return (
    <section aria-labelledby="bloc-app" className="bg-aubergine text-pistache">
      <div className="mx-auto flex max-w-[1220px] flex-col gap-3 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-10">
        <div className="flex flex-col gap-1.5">
          <h2
            id="bloc-app"
            className="m-0 text-[clamp(1.4rem,3vw,1.75rem)] leading-tight"
          >
            L'app Ayur-Veda
          </h2>
          <p className="m-0 text-[#E8D9E3]">
            Gardez la saison du moment et les recettes dans votre poche, même
            sans réseau.
          </p>
        </div>
        <button
          type="button"
          onClick={() => (ios ? setFiche(true) : installer())}
          className={`${BOUTON} shrink-0 self-start bg-citron text-encre hover:opacity-90 sm:self-auto`}
        >
          Installer l'app
        </button>
      </div>
      {fiche && ios && (
        <FicheIos navigateur={ios} onFermer={() => setFiche(false)} />
      )}
    </section>
  );
};
