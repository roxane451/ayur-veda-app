import type { KeyboardEvent } from "react";
import { SoleilLune } from "@/components/brand/Illustrations";
import { COULEUR_DOSHA } from "@/components/quiz/conseils";
import { SAISONS_DETAIL, type SaisonId } from "@/data/saisons";
import { NOM_DOSHA } from "@/lib/doshaLogic";

/* La roue part du 1er décembre en haut et tourne dans le sens de l'année. */
const DEPART: Record<SaisonId, { angle: number; mois: number }> = {
  hiver: { angle: 0, mois: 11 },
  printemps: { angle: 90, mois: 2 },
  ete: { angle: 180, mois: 5 },
  automne: { angle: 270, mois: 8 },
};
const ORDRE: SaisonId[] = ["hiver", "printemps", "ete", "automne"];

const C = 260;
const R_EXT = 246;
const R_INT = 92;

const point = (r: number, a: number) => {
  const t = ((a - 90) * Math.PI) / 180;
  return [C + r * Math.cos(t), C + r * Math.sin(t)] as const;
};

const secteur = (a0: number) => {
  const a1 = a0 + 90;
  const [x1, y1] = point(R_EXT, a0 + 1.2);
  const [x2, y2] = point(R_EXT, a1 - 1.2);
  const [x3, y3] = point(R_INT, a1 - 3);
  const [x4, y4] = point(R_INT, a0 + 3);
  const f = (n: number) => n.toFixed(1);
  return `M${f(x1)} ${f(y1)} A${R_EXT} ${R_EXT} 0 0 1 ${f(x2)} ${f(y2)} L${f(x3)} ${f(y3)} A${R_INT} ${R_INT} 0 0 0 ${f(x4)} ${f(y4)} Z`;
};

/** Angle de la date sur la roue : la saison en cours, plus l'avancée dans cette saison. */
const angleDuJour = (date: Date, saison: SaisonId) => {
  const { angle, mois } = DEPART[saison];
  const annee = date.getMonth() < mois ? date.getFullYear() - 1 : date.getFullYear();
  const debut = new Date(annee, mois, 1);
  const fin = new Date(annee, mois + 3, 1);
  const part = (date.getTime() - debut.getTime()) / (fin.getTime() - debut.getTime());
  return angle + Math.min(Math.max(part, 0), 1) * 90;
};

interface RoueProps {
  choisie: SaisonId;
  actuelle: SaisonId;
  onChoisir: (id: SaisonId) => void;
}

/** La roue des saisons : un quart par saison, celle qu'on lit en vert paon, un repère pour aujourd'hui. */
const Roue = ({ choisie, actuelle, onChoisir }: RoueProps) => {
  const aujourdhui = angleDuJour(new Date(), actuelle);
  const [mx1, my1] = point(R_EXT - 10, aujourdhui);
  const [mx2, my2] = point(R_EXT + 20, aujourdhui);
  const aDroite = mx2 > C;

  const clavier = (e: KeyboardEvent, id: SaisonId) => {
    const i = ORDRE.indexOf(id);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChoisir(id);
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const suivant = ORDRE[(i + 1) % 4];
      onChoisir(suivant);
      document.getElementById(`roue-${suivant}`)?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const precedent = ORDRE[(i + 3) % 4];
      onChoisir(precedent);
      document.getElementById(`roue-${precedent}`)?.focus();
    }
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] max-sm:w-[calc(100%+1rem)] max-sm:-mx-2">
      <svg viewBox="-16 -16 552 552" className="absolute inset-0 h-full w-full overflow-visible" role="tablist" aria-label="Les quatre saisons">
        <circle cx={C} cy={C} r={R_INT - 10} fill="#F0F4E0" stroke="#13201E" strokeWidth="2" />
        {ORDRE.map((id) => {
          const s = SAISONS_DETAIL.find((x) => x.id === id)!;
          const a0 = DEPART[id].angle;
          const d = secteur(a0);
          const lue = id === choisie;
          const [lx, ly] = point(170, a0 + 45);
          const clair = lue ? "#F0F4E0" : "#13201E";
          return (
            <g
              key={id}
              id={`roue-${id}`}
              role="tab"
              tabIndex={lue ? 0 : -1}
              aria-selected={lue}
              aria-controls="detail-saison"
              aria-label={`${s.court}, ${s.periode}, saison de ${NOM_DOSHA[s.dosha]}${id === actuelle ? ", en ce moment" : ""}`}
              onClick={() => onChoisir(id)}
              onKeyDown={(e) => clavier(e, id)}
              className="group cursor-pointer outline-none [&:focus-visible>path:first-child]:stroke-citron [&:focus-visible>path:first-child]:[stroke-width:5]"
            >
              <path
                d={d}
                fill={lue ? "#0E4D47" : "#FBFCF4"}
                stroke="#13201E"
                strokeWidth="2"
               
                className={lue ? "" : "transition-colors group-hover:fill-[#E8EBD6]"}
              />
              {lue && <path d={d} fill="url(#dabu)" pointerEvents="none" />}
              <g pointerEvents="none" textAnchor="middle" fill={clair}>
                <text x={lx} y={ly - 14} fontFamily="'Castoro Titling', serif" fontSize="28">
                  {s.court.toUpperCase()}
                </text>
                <text x={lx} y={ly + 12} fontFamily="Castoro, serif" fontSize="15" fill={lue ? "#D3E3DE" : "#4C5A57"} className="max-sm:hidden">
                  {s.periode}
                </text>
                <circle cx={lx - 30} cy={ly + 35} r="6" fill={COULEUR_DOSHA[s.dosha]} stroke={clair} strokeWidth="1.5" />
                <text x={lx + 8} y={ly + 41} fontFamily="Castoro, serif" fontSize="19" fontWeight="700">
                  {NOM_DOSHA[s.dosha]}
                </text>
              </g>
            </g>
          );
        })}
        <g aria-hidden="true">
          <line x1={mx1} y1={my1} x2={mx2} y2={my2} stroke="#BBD439" strokeWidth="5" strokeLinecap="round" />
          <circle cx={mx2} cy={my2} r="7" fill="#BBD439" stroke="#13201E" strokeWidth="2" />
          <text
            x={mx2 + (aDroite ? 14 : -14)}
            y={my2 - 12}
            textAnchor={aDroite ? "start" : "end"}
            fontFamily="Castoro, serif"
            fontStyle="italic"
            fontSize="16"
            fill="#13201E"
            className="max-sm:hidden"
          >
            aujourd'hui
          </text>
        </g>
      </svg>
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 w-[21%] -translate-x-1/2 -translate-y-1/2">
        <SoleilLune size={118} decorative className="h-auto w-full" />
      </div>
    </div>
  );
};

export default Roue;
