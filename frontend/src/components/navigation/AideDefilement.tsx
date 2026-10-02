import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface Repere {
  titre: string;
  el: HTMLElement;
}

/** Les titres de section de la page (h2 de <main>), hors cartes et listes. */
function lireReperes(): Repere[] {
  const main = document.querySelector("main");
  if (!main) return [];
  return [...main.querySelectorAll<HTMLElement>("h2")]
    .filter(
      (h) =>
        !h.closest("li, article, [aria-hidden='true'], .sr-only") &&
        h.offsetParent !== null,
    )
    .map((h) => ({
      titre: (h.textContent ?? "").replace(/\s+/g, " ").trim(),
      el: h,
    }))
    .filter((r) => r.titre.length > 0);
}

const hauteurEnTete = () =>
  document.querySelector("header")?.getBoundingClientRect().height ?? 68;

/**
 * Sur téléphone, une rangée de pastilles collée sous l'en-tête : les sections de la page,
 * celle qu'on lit en noir. Elle apparaît après le premier écran.
 */
export const SommaireMobile = () => {
  const { pathname } = useLocation();
  const [reperes, setReperes] = useState<Repere[]>([]);
  const [actif, setActif] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [haut, setHaut] = useState(68);
  const rangee = useRef<HTMLDivElement>(null);

  // Relire les titres au changement de page et quand le contenu change (onglets, filtres).
  useEffect(() => {
    let minuteur = 0;
    const relire = () => {
      window.clearTimeout(minuteur);
      minuteur = window.setTimeout(() => setReperes(lireReperes()), 150);
    };
    relire();
    const main = document.querySelector("main");
    const obs = new MutationObserver(relire);
    if (main) obs.observe(main, { childList: true, subtree: true });
    return () => {
      obs.disconnect();
      window.clearTimeout(minuteur);
    };
  }, [pathname]);

  useEffect(() => {
    const suivre = () => {
      const h = hauteurEnTete();
      setHaut(h);
      setVisible(window.scrollY > window.innerHeight * 0.9);
      const ligne = h + 64;
      let i = -1;
      reperes.forEach((r, k) => {
        if (r.el.getBoundingClientRect().top <= ligne) i = k;
      });
      setActif(i);
    };
    suivre();
    window.addEventListener("scroll", suivre, { passive: true });
    window.addEventListener("resize", suivre);
    return () => {
      window.removeEventListener("scroll", suivre);
      window.removeEventListener("resize", suivre);
    };
  }, [reperes]);

  // Garder la pastille active visible dans la rangée.
  useEffect(() => {
    const p = rangee.current?.querySelector<HTMLElement>(`[data-i="${actif}"]`);
    if (p && rangee.current) {
      const r = rangee.current;
      r.scrollTo({
        left: p.offsetLeft - r.clientWidth / 2 + p.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [actif]);

  if (reperes.length < 3) return null;

  const aller = (r: Repere) => {
    const y =
      r.el.getBoundingClientRect().top + window.scrollY - hauteurEnTete() - 64;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Sections de la page"
      style={{ top: haut }}
      className={`fixed inset-x-0 z-40 border-b border-trait bg-pistache/95 backdrop-blur-md transition-[opacity,transform] duration-200 lg:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div
        ref={rangee}
        className="flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none]"
      >
        {reperes.map((r, i) => (
          <button
            key={`${i}-${r.titre}`}
            type="button"
            data-i={i}
            onClick={() => aller(r)}
            aria-current={i === actif ? "true" : undefined}
            tabIndex={visible ? 0 : -1}
            className={`max-w-[16rem] shrink-0 truncate rounded-full px-3.5 py-1.5 text-[14px] font-bold ${
              i === actif
                ? "bg-encre text-pistache"
                : "text-encre shadow-[inset_0_0_0_1.5px_hsl(var(--trait))]"
            }`}
          >
            {r.titre}
          </button>
        ))}
      </div>
    </nav>
  );
};

/** Bouton en arche pour remonter, après deux écrans de lecture. */
export const BoutonHaut = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const suivre = () => setVisible(window.scrollY > window.innerHeight * 2);
    suivre();
    window.addEventListener("scroll", suivre, { passive: true });
    return () => window.removeEventListener("scroll", suivre);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Revenir en haut de la page"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 z-40 flex h-[60px] w-[52px] items-center justify-center rounded-b-md rounded-t-full bg-paon text-pistache shadow-[0_0_0_2px_hsl(var(--pistache))] transition-[opacity,transform] duration-200 lg:hidden [[data-bandeau]_&]:bottom-[calc(6.5rem+env(safe-area-inset-bottom))] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
};
