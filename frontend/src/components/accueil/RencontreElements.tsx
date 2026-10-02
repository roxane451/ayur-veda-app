import { useId, type ComponentType } from "react";

/**
 * Deux éléments qui se rencontrent : deux cercles qui se chevauchent,
 * la partie commune prend la couleur du dosha et porte son illustration.
 */
interface Element {
  nom: string;
  deva: string;
}

interface RencontreProps {
  gauche: Element;
  droite: Element;
  couleur: string;
  Illu: ComponentType<{ size?: number; stroke?: string; decorative?: boolean; className?: string }>;
  label: string;
}

const R = 78;
const D = 96;
const CX1 = 170 - D / 2;
const CX2 = 170 + D / 2;
const CY = 110;

const RencontreElements = ({ gauche, droite, couleur, Illu, label }: RencontreProps) => {
  const id = useId().replace(/:/g, "");
  return (
    <div className="relative mx-auto w-full max-w-[340px]" style={{ aspectRatio: "340 / 220" }}>
      <svg viewBox="0 0 340 220" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label={label}>
        <defs>
          <clipPath id={`lentille-${id}`}>
            <circle cx={CX1} cy={CY} r={R} />
          </clipPath>
        </defs>
        <circle cx={CX2} cy={CY} r={R} fill={couleur} clipPath={`url(#lentille-${id})`} />
        <g fill="none" stroke="#F3F5E6" strokeWidth="2.2">
          <circle cx={CX1} cy={CY} r={R} />
          <circle cx={CX2} cy={CY} r={R} />
        </g>
        {[
          { e: gauche, x: CX1 - 34 },
          { e: droite, x: CX2 + 34 },
        ].map(({ e, x }) => (
          <g key={e.nom} textAnchor="middle">
            <text x={x} y={CY + 2} className="font-devanagari" fontSize="24" fill="#F3F5E6">
              {e.deva}
            </text>
            <text x={x} y={CY + 26} fontStyle="italic" fontSize="14" fill="#C4DCD5">
              {e.nom}
            </text>
          </g>
        ))}
      </svg>
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 w-[13.5%] -translate-x-1/2 -translate-y-1/2">
        <Illu size={46} stroke="#13201E" decorative className="h-auto w-full" />
      </div>
    </div>
  );
};

export default RencontreElements;
