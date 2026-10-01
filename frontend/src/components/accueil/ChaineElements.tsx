import { Flamme, Goutte, Vent } from "@/components/brand/Illustrations";
import { ELEMENTS } from "@/data/comprendre";

/*
 * La chaîne des éléments : les cinq éléments alignés, chaque dosha est un arc
 * qui relie ses deux éléments. Pitta et Kapha se partagent l'eau.
 * Deux dessins : à l'horizontale sur grand écran, à la verticale ailleurs.
 */

const ARCS = [
  { nom: "VATA", deva: "वात", de: 0, a: 1, couleur: "#8DB9B0", Illu: Vent, dessous: false },
  { nom: "PITTA", deva: "पित्त", de: 2, a: 3, couleur: "#DCBFD5", Illu: Flamme, dessous: false },
  // Kapha, l'eau et la terre, passe sous la chaîne : il ne se colle plus à Pitta
  { nom: "KAPHA", deva: "कफ", de: 3, a: 4, couleur: "#BBD439", Illu: Goutte, dessous: true },
];

const DESCRIPTION = "Les cinq éléments, de l'éther à la terre. Vata relie l'éther et l'air, Pitta le feu et l'eau, Kapha l'eau et la terre.";

/* ───────── À l'horizontale ───────── */
const LARGEUR = 1140;
const HAUTEUR = 540;
const Y = 280;
const R = 54;
const X = ELEMENTS.map((_, i) => (LARGEUR * (2 * i + 1)) / 10);
const BASE = Y - R - 8;
const BAS = Y + R + 8;

const Horizontal = () => (
  <div className="relative hidden w-full lg:block" style={{ aspectRatio: `${LARGEUR} / ${HAUTEUR}` }}>
    <svg viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`} className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label={DESCRIPTION}>
      <line x1={X[0]} y1={Y} x2={X[4]} y2={Y} stroke="#F3F5E6" strokeWidth="1.5" strokeDasharray="2 7" />
      {ARCS.map((a) => {
        const r = (X[a.a] - X[a.de]) / 2;
        const cx = (X[a.de] + X[a.a]) / 2;
        const haut = BASE - r * 0.95;
        const bas = BAS + r * 0.95;
        return (
          <g key={a.nom}>
            <path
              d={
                a.dessous
                  ? `M${X[a.de]} ${BAS} A${r} ${r * 0.95} 0 0 0 ${X[a.a]} ${BAS}`
                  : `M${X[a.de]} ${BASE} A${r} ${r * 0.95} 0 0 1 ${X[a.a]} ${BASE}`
              }
              fill="none"
              stroke={a.couleur}
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#ink)"
            />
            <text x={cx} y={a.dessous ? bas + 50 : haut - 26} textAnchor="middle" fill="#F3F5E6">
              <tspan className="font-display" fontSize="34" letterSpacing="1">
                {a.nom}
              </tspan>
              <tspan className="font-devanagari" fontSize="24" fill={a.couleur} dx="10">
                {a.deva}
              </tspan>
            </text>
          </g>
        );
      })}
      {ELEMENTS.map((e, i) => (
        <g key={e.nom}>
          <circle cx={X[i]} cy={Y} r={R} fill="#F3F5E6" stroke="#13201E" strokeWidth="2" />
          <text x={X[i]} y={Y + 4} textAnchor="middle" className="font-devanagari" fontSize="28" fill="#0E4D47">
            {e.deva}
          </text>
          <text x={X[i]} y={Y + 30} textAnchor="middle" fontStyle="italic" fontSize="15" fill="#4C5A57">
            {e.nom}
          </text>
        </g>
      ))}
    </svg>
    {ARCS.map(({ nom, de, a, Illu, dessous }) => (
      <div
        key={nom}
        aria-hidden="true"
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${((X[de] + X[a]) / 2 / LARGEUR) * 100}%`, top: `${((dessous ? BAS + 52 : BASE - 52) / HAUTEUR) * 100}%`, width: `${(64 / LARGEUR) * 100}%` }}
      >
        <Illu size={64} stroke="#F3F5E6" decorative className="h-auto w-full" />
      </div>
    ))}
  </div>
);

/* ───────── À la verticale ───────── */
const VL = 360;
const PAS = 92;
const VY = ELEMENTS.map((_, i) => 52 + i * PAS);
const VH = VY[4] + 52;
const VX = 56;
const VR = 36;
const BORD = VX + VR + 92;

const Vertical = () => (
  <div className="relative mx-auto w-full max-w-[420px] lg:hidden" style={{ aspectRatio: `${VL} / ${VH}` }}>
    <svg viewBox={`0 0 ${VL} ${VH}`} className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label={DESCRIPTION}>
      <line x1={VX} y1={VY[0]} x2={VX} y2={VY[4]} stroke="#F3F5E6" strokeWidth="1.5" strokeDasharray="2 6" />
      {ARCS.map((a) => {
        const r = (VY[a.a] - VY[a.de]) / 2;
        const cy = (VY[a.de] + VY[a.a]) / 2;
        return (
          <g key={a.nom}>
            <path
              d={`M${BORD - 10} ${VY[a.de]} A${r * 0.8} ${r} 0 0 1 ${BORD - 10} ${VY[a.a]}`}
              fill="none"
              stroke={a.couleur}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#ink)"
            />
            <text x={BORD + r * 0.8 + 6} y={cy + 2} fill="#F3F5E6">
              <tspan className="font-display" fontSize="22" letterSpacing="0.5">
                {a.nom}
              </tspan>
              <tspan className="font-devanagari" fontSize="17" fill={a.couleur} dx="6">
                {a.deva}
              </tspan>
            </text>
          </g>
        );
      })}
      {ELEMENTS.map((e, i) => (
        <g key={e.nom}>
          <circle cx={VX} cy={VY[i]} r={VR} fill="#F3F5E6" stroke="#13201E" strokeWidth="2" />
          <text x={VX} y={VY[i] + 7} textAnchor="middle" className="font-devanagari" fontSize="20" fill="#0E4D47">
            {e.deva}
          </text>
          <text x={VX + VR + 12} y={VY[i] + 6} fontStyle="italic" fontSize="16" fill="#D3E3DE">
            {e.nom}
          </text>
        </g>
      ))}
    </svg>
  </div>
);

const ChaineElements = () => (
  <>
    <Horizontal />
    <Vertical />
  </>
);

export default ChaineElements;
