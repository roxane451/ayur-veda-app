/**
 * L'empreinte : le tampon de bois (fleur à huit pétales en réserve).
 * Il signe (favicon, cachet, pied de page) ; il ne remplace jamais le nom.
 * On le pose toujours un peu de travers.
 */
interface TamponProps {
  size?: number;
  fond?: string;
  reserve?: string;
  rotate?: number;
  label?: string;
  filter?: "stamp" | "soft" | "ink";
  className?: string;
}

const COINS: [number, number][] = [
  [14, 14], [86, 14], [14, 86], [86, 86], [50, 10], [50, 90], [10, 50], [90, 50],
];

export const Tampon = ({
  size = 80,
  fond = "#B23A2A",
  reserve = "#F4ECDD",
  rotate = -5,
  label,
  filter = "stamp",
  className,
}: TamponProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    role={label ? "img" : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    className={className}
    style={{ display: "block", transform: `rotate(${rotate}deg)` }}
  >
    <g filter={`url(#${filter})`}>
      <rect x="4" y="4" width="92" height="92" rx="14" fill={fond} />
      <rect
        x="9" y="9" width="82" height="82" rx="10" fill="none"
        stroke={reserve} strokeWidth="1.6" strokeDasharray="1 4" strokeLinecap="round"
      />
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="50" cy="30" rx="7.5" ry="15" transform={`rotate(${i * 45} 50 50)`} fill={reserve} />
      ))}
      <circle cx="50" cy="50" r="10" fill={fond} />
      <circle cx="50" cy="50" r="5" fill={reserve} />
      {COINS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill={reserve} />
      ))}
    </g>
  </svg>
);

export default Tampon;
