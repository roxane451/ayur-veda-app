/**
 * Définitions SVG partagées par tout le site, rendues une seule fois (dans App).
 *  - #stamp : grain fin, pour un aplat imprimé au tampon
 *  - #soft  : grain plus léger encore, pour le logo et l'empreinte en grand
 *  - motifs : buta (cachemire), dabu (fleurs sur vert paon), bordures à arches
 */
const AUBERGINE = "#5B2A4E";
const PISTACHE = "#F0F4E0";
const CITRON = "#BBD439";
const OCRE = "#D2A12A";
const PAON = "#0E4D47";

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
      {/* Grain d'impression fin : quelques points de réserve dans l'aplat, sans déformer les contours. */}
      <filter id="stamp" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves={1} seed={2} result="g" />
        <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.38" result="m" />
        <feComposite in="SourceGraphic" in2="m" operator="in" />
      </filter>
      <filter id="soft" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves={1} seed={2} result="g" />
        <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.6 1.3" result="m" />
        <feComposite in="SourceGraphic" in2="m" operator="in" />
      </filter>

      <pattern id="buta" width="64" height="64" patternUnits="userSpaceOnUse">
        <g fill={AUBERGINE} opacity="0.08">
          <path d={BUTA} />
          <circle cx="50" cy="48" r="3" />
          <circle cx="56" cy="44" r="1.6" />
          <circle cx="44" cy="52" r="1.6" />
        </g>
      </pattern>
      <pattern id="dabu" width="56" height="56" patternUnits="userSpaceOnUse">
        <g fill={PISTACHE} opacity="0.13">
          {fleur(14, 14)}
          {fleur(42, 42)}
        </g>
      </pattern>
      <pattern id="bande" width="40" height="44" patternUnits="userSpaceOnUse">
        <rect width="40" height="44" fill={AUBERGINE} />
        <path d="M2 40 C2 26 10 16 20 16 C30 16 38 26 38 40" fill="none" stroke={PISTACHE} strokeWidth="2.2" />
        <path d="M10 40 C10 31 14 25 20 25 C26 25 30 31 30 40" fill="none" stroke={CITRON} strokeWidth="2" />
        <circle cx="20" cy="8" r="2.6" fill={PISTACHE} />
        <circle cx="0" cy="8" r="1.4" fill={OCRE} />
        <circle cx="40" cy="8" r="1.4" fill={OCRE} />
      </pattern>
      <pattern id="bandeIndigo" width="40" height="44" patternUnits="userSpaceOnUse">
        <rect width="40" height="44" fill={PAON} />
        <path d="M2 4 C2 18 10 28 20 28 C30 28 38 18 38 4" fill="none" stroke={PISTACHE} strokeWidth="2.2" />
        <circle cx="20" cy="15" r="3" fill={OCRE} />
        <circle cx="20" cy="37" r="2.4" fill={PISTACHE} />
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
export const Bande = ({ variante = "aubergine" }: { variante?: "aubergine" | "paon" }) => (
  <svg width="100%" height="44" aria-hidden="true" className="block">
    <rect
      width="100%"
      height="44"
      fill={variante === "paon" ? "url(#bandeIndigo)" : "url(#bande)"}
      filter="url(#stamp)"
    />
  </svg>
);
