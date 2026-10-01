import type { CSSProperties } from "react";

/**
 * Le logo : « ayurveda » suspendu sous un trait, comme en devanagari.
 * Le trait est une bordure de hauteur 1ex : il se cale toujours sur la
 * hauteur des minuscules, quelle que soit la taille.
 */
interface LogoProps {
  size?: number;
  color?: string;
  barColor?: string;
  word?: string;
  label?: string;
  className?: string;
}

export const Logo = ({
  size = 32,
  color = "hsl(var(--syahi))",
  barColor = "hsl(var(--garance))",
  word = "ayurveda",
  label = "Ayur-Veda",
  className,
}: LogoProps) => {
  const wrap: CSSProperties = {
    display: "inline-grid",
    fontSize: size,
    fontWeight: 420,
    lineHeight: 1.2,
    color,
    whiteSpace: "nowrap",
  };
  const bar: CSSProperties = {
    display: "inline-block",
    verticalAlign: "baseline",
    width: "calc(100% + 0.16em)",
    marginLeft: "-0.08em",
    height: "1ex",
    borderTop: `${word.length === 1 ? 0.11 : 0.09}em solid ${barColor}`,
    borderRadius: 2,
  };
  return (
    <span role="img" aria-label={label} className={`font-display ${className ?? ""}`} style={wrap}>
      <span aria-hidden="true" style={{ gridArea: "1 / 1", letterSpacing: "-0.01em" }}>
        {word}
      </span>
      <span aria-hidden="true" style={{ gridArea: "1 / 1" }}>
        <span style={bar} />
      </span>
    </span>
  );
};

export default Logo;
