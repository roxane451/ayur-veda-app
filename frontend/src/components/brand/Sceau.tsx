/**
 * L'empreinte : le sceau rond à la lettre आ (le « ā » d'āyurveda).
 * Il signe (favicon, icône de l'application, pied de page) ; il ne remplace jamais le nom.
 * La lettre est dessinée en tracé : elle s'affiche sans dépendre de la police.
 */
export const AA_PATH =
  "M309 71Q244 71 195.5 103.5Q147 136 109.0 190.5Q71 245 36 311L74 333Q100 286 127.5 242.5Q155 199 191.0 171.5Q227 144 279 144Q312 144 341.5 158.5Q371 173 390.0 199.0Q409 225 409 260Q409 297 384.5 316.0Q360 335 327 335Q299 335 269.0 323.5Q239 312 216 301L173 374Q200 389 232.5 401.0Q265 413 299 413H308Q335 430 349.0 453.5Q363 477 363 501Q363 527 347.0 544.0Q331 561 296 561Q268 561 224.0 547.5Q180 534 139 508L95 583Q139 609 183.5 621.0Q228 633 260 633Q306 633 338.0 613.5Q370 594 390.0 564.0Q410 534 419.5 502.5Q429 471 429 447Q429 431 424.0 413.0Q419 395 400 374Q406 369 413 360Q430 341 452.5 326.0Q475 311 519 311Q574 311 612 344L614 545H507L473 610V620H1041L1075 555V545H958L960 -15H950L870 37L874 545H698L700 -10H690L610 42L611 243Q603 240 594.0 239.0Q585 238 575 238Q547 238 519.5 248.0Q492 258 472 271L468 269Q474 255 476.5 240.5Q479 226 479 213Q479 172 456.5 140.0Q434 108 396.0 89.5Q358 71 309 71Z";

const POINTS: [number, number][] = [[92.0, 50.0], [90.6, 60.9], [86.4, 71.0], [79.7, 79.7], [71.0, 86.4], [60.9, 90.6], [50.0, 92.0], [39.1, 90.6], [29.0, 86.4], [20.3, 79.7], [13.6, 71.0], [9.4, 60.9], [8.0, 50.0], [9.4, 39.1], [13.6, 29.0], [20.3, 20.3], [29.0, 13.6], [39.1, 9.4], [50.0, 8.0], [60.9, 9.4], [71.0, 13.6], [79.7, 20.3], [86.4, 29.0], [90.6, 39.1]];

interface SceauProps {
  size?: number;
  fond?: string;
  reserve?: string;
  rotate?: number;
  label?: string;
  filter?: "stamp" | "soft" | "ink" | "none";
  className?: string;
}

export const Sceau = ({
  size = 80,
  fond = "hsl(var(--aubergine))",
  reserve = "hsl(var(--citron))",
  rotate = 0,
  label,
  filter = "none",
  className,
}: SceauProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    role={label ? "img" : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    className={`shrink-0 ${className ?? ""}`}
    style={{ display: "block", transform: rotate ? `rotate(${rotate}deg)` : undefined }}
  >
    <g filter={filter === "none" ? undefined : `url(#${filter})`}>
      <circle cx="50" cy="50" r="48" fill={fond} />
      {POINTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.9" fill={reserve} />
      ))}
      <circle cx="50" cy="50" r="35" fill="none" stroke={reserve} strokeWidth="2" />
      <path d={AA_PATH} transform="translate(24.45 66) scale(0.046 -0.046)" fill={reserve} />
    </g>
  </svg>
);

export default Sceau;
