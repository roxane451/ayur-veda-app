/**
 * Définitions SVG partagées par tout le site, rendues une seule fois (dans App).
 *  - #ink   : léger tremblé, pour un trait dessiné à la main
 *  - #stamp : tremblé + grain, pour un aplat imprimé au tampon
 *  - #soft  : grain plus léger, pour le logo et l'empreinte en grand
 *  - motifs : buta (cachemire), dabu (fleurs sur indigo), bordures à arches
 */
const GARANCE = "#B23A2A";
const KORA = "#F4ECDD";
const HALDI = "#E0A030";
const INDIGO = "#1F3263";

const BUTA =
  "M22 6 C17 10 8 14 8 23 C8 30 13 34 19 34 C26 34 29 29 28 23 C27 17 22 15 19 18 C21 13 23 10 22 6 Z";

const fleur = (cx: number, cy: number) => (
  <>
    <circle cx={cx} cy={cy} r="2.4" />
    <circle cx={cx} cy={cy - 7} r="3" />
    <circle cx={cx + 7} cy={cy} r="3" />
    <circle cx={cx} cy={cy + 7} r="3" />
    <circle cx={cx - 7} cy={cy} r="3" />
  </>
);

const BrandDefs = () => (
  <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
    <defs>
      <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={4} result="w" />
        <feDisplacementMap in="SourceGraphic" in2="w" scale={3.2} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="stamp" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={9} result="w" />
        <feDisplacementMap in="SourceGraphic" in2="w" scale={2.4} xChannelSelector="R" yChannelSelector="G" result="d" />
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves={1} seed={2} result="g" />
        <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 1.5" result="m" />
        <feComposite in="d" in2="m" operator="in" />
      </filter>
      <filter id="soft" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={9} result="w" />
        <feDisplacementMap in="SourceGraphic" in2="w" scale={2} xChannelSelector="R" yChannelSelector="G" result="d" />
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={1} seed={2} result="g" />
        <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.28" result="m" />
        <feComposite in="d" in2="m" operator="in" />
      </filter>

      <pattern id="buta" width="64" height="64" patternUnits="userSpaceOnUse">
        <g fill={GARANCE} opacity="0.08">
          <path d={BUTA} />
          <circle cx="50" cy="48" r="3" />
          <circle cx="56" cy="44" r="1.6" />
          <circle cx="44" cy="52" r="1.6" />
        </g>
      </pattern>
      <pattern id="dabu" width="56" height="56" patternUnits="userSpaceOnUse">
        <g fill={KORA} opacity="0.13">
          {fleur(14, 14)}
          {fleur(42, 42)}
        </g>
      </pattern>
      <pattern id="bande" width="40" height="44" patternUnits="userSpaceOnUse">
        <rect width="40" height="44" fill={GARANCE} />
        <path d="M2 40 C2 26 10 16 20 16 C30 16 38 26 38 40" fill="none" stroke={KORA} strokeWidth="2.2" />
        <path d="M10 40 C10 31 14 25 20 25 C26 25 30 31 30 40" fill="none" stroke={HALDI} strokeWidth="2" />
        <circle cx="20" cy="8" r="2.6" fill={KORA} />
        <circle cx="0" cy="8" r="1.4" fill={HALDI} />
        <circle cx="40" cy="8" r="1.4" fill={HALDI} />
      </pattern>
      <pattern id="bandeIndigo" width="40" height="44" patternUnits="userSpaceOnUse">
        <rect width="40" height="44" fill={INDIGO} />
        <path d="M2 4 C2 18 10 28 20 28 C30 28 38 18 38 4" fill="none" stroke={KORA} strokeWidth="2.2" />
        <circle cx="20" cy="15" r="3" fill={HALDI} />
        <circle cx="20" cy="37" r="2.4" fill={KORA} />
      </pattern>
    </defs>
  </svg>
);

export default BrandDefs;

/** Fond à motif (buta sur coton, dabu sur indigo), posé en absolu derrière une section. */
export const Motif = ({ id }: { id: "buta" | "dabu" }) => (
  <svg width="100%" height="100%" aria-hidden="true" className="pointer-events-none absolute inset-0">
    <rect width="100%" height="100%" fill={`url(#${id})`} filter={id === "dabu" ? "url(#stamp)" : undefined} />
  </svg>
);

/** Bordure imprimée entre deux sections. */
export const Bande = ({ variante = "garance" }: { variante?: "garance" | "indigo" }) => (
  <svg width="100%" height="44" aria-hidden="true" className="block">
    <rect
      width="100%"
      height="44"
      fill={variante === "indigo" ? "url(#bandeIndigo)" : "url(#bande)"}
      filter="url(#stamp)"
    />
  </svg>
);
