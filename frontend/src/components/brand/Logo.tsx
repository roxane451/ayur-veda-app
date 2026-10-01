import { LOGO_BINDU, LOGO_BINDU_PETIT, LOGO_CADRE, LOGO_LETTRES, LOGO_SHIROREKHA, LOGO_SHIROREKHA_PETIT } from "./logoTraces";

/**
 * Le logo : « ayurveda » suspendu sous la shirorekha, le trait des écritures devanagari.
 * Le trait aubergine est posé sur le haut des lettres ; un bindu le surmonte au-dessus du d.
 * `size` correspond à la taille du texte (comme une taille de police).
 */
interface LogoProps {
  size?: number;
  color?: string;
  barColor?: string;
  label?: string;
  className?: string;
}

export const Logo = ({
  size = 32,
  color = "hsl(var(--encre))",
  barColor = "hsl(var(--aubergine))",
  label = "Ayur-Veda",
  className,
}: LogoProps) => {
  const [x, y, w, h] = LOGO_CADRE;
  const hauteur = (size * h) / 1000;
  // En petit, le trait et le bindu s'épaississent pour rester visibles
  const petit = size < 48;
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`${x} ${y} ${w} ${h}`}
      width={(hauteur * w) / h}
      height={hauteur}
      className={`block shrink-0 ${className ?? ""}`}
    >
      <path d={petit ? LOGO_SHIROREKHA_PETIT : LOGO_SHIROREKHA} fill={barColor} />
      <path d={LOGO_LETTRES} fill={color} />
      <circle cx={LOGO_BINDU.cx} cy={LOGO_BINDU.cy} r={petit ? LOGO_BINDU_PETIT.r : LOGO_BINDU.r} fill={barColor} />
    </svg>
  );
};

export default Logo;
