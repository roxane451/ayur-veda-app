import type { ElementId } from "@/data/principes";

/** Signe décoratif de chaque élément (il ne vient pas des textes). */
const Glyphe = ({ id, couleur = "#13201E", taille = 80 }: { id: ElementId; couleur?: string; taille?: number }) => (
  <svg width={taille} height={taille} viewBox="0 0 80 80" aria-hidden="true" className="block">
    {id === "ether" && (
      <>
        <circle cx="40" cy="40" r="30" fill="none" stroke={couleur} strokeWidth="2" strokeDasharray="4 6" />
        <circle cx="40" cy="40" r="4" fill={couleur} />
      </>
    )}
    {id === "air" && (
      <path
        d="M12 30 C24 20 36 40 48 30 S64 24 68 28 M12 44 C24 34 36 54 48 44 S64 38 68 42 M18 58 C28 50 40 66 52 58"
        fill="none"
        stroke={couleur}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    )}
    {id === "feu" && <path d="M40 10 L70 66 H10 Z" fill="none" stroke={couleur} strokeWidth="2.4" strokeLinejoin="round" />}
    {id === "eau" && <path d="M14 34 A26 26 0 0 0 66 34 A30 30 0 0 1 14 34 Z" fill="none" stroke={couleur} strokeWidth="2.4" />}
    {id === "terre" && <rect x="14" y="14" width="52" height="52" fill="none" stroke={couleur} strokeWidth="2.4" />}
  </svg>
);

export default Glyphe;
