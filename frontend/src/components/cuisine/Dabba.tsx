import { Link } from "react-router-dom";
import { EPICES } from "@/data/cuisine";
import { IlluEpice } from "./Commun";

/** Teinte du fond de chaque bol, proche de l'épice moulue. */
const TEINTE: Record<string, string> = {
  curcuma: "#E9C46A",
  gingembre: "#E4D3A8",
  cumin: "#C9B48A",
  coriandre: "#D9CFA0",
  fenouil: "#C7D3A0",
  cardamome: "#BFCB98",
  cannelle: "#D8B48F",
  poivre: "#B9B7A6",
};

/* Géométrie, en % d'un carré : la boîte au centre, le premier bol au milieu, les sept autres en couronne. */
const COURONNE = 23.7;
const ETIQUETTE = 43;

const position = (i: number) => {
  if (i === 0) return { x: 50, y: 50, d: 21.4, angle: null as number | null };
  const angle = -90 + ((i - 1) * 360) / 7;
  const r = (angle * Math.PI) / 180;
  return { x: 50 + COURONNE * Math.cos(r), y: 50 + COURONNE * Math.sin(r), d: 18.7, angle };
};

/**
 * La masala dabba : la boîte à épices ronde des cuisines indiennes, vue de dessus.
 * Chaque bol mène à la fiche de l'épice. `actives` atténue les épices qui ne correspondent pas au filtre.
 */
const Dabba = ({ actives }: { actives?: Set<string> }) => (
  <div className="flex w-full flex-col items-center gap-5">
    <div className="relative aspect-square w-full max-w-[560px] max-sm:-my-[9%] sm:w-[calc(100%-200px)]">
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-surface shadow-[inset_0_0_0_2px_hsl(var(--encre))]" />
      <div aria-hidden="true" className="absolute inset-[14.3%] rounded-full bg-carte shadow-[inset_0_0_0_2px_hsl(var(--encre))]" />
      <ul className="m-0 list-none p-0">
        {EPICES.map((e, i) => {
          const p = position(i);
          const eteinte = actives && !actives.has(e.id);
          const cos = p.angle === null ? 0 : Math.cos((p.angle * Math.PI) / 180);
          const alignement = cos > 0.3 ? "gauche" : cos < -0.3 ? "droite" : "centre";
          return (
            <li key={e.id}>
              <Link
                to={`/cuisine/epices/${e.id}`}
                aria-label={`${e.nom}, la fiche`}
                className={`group absolute flex items-center justify-center rounded-full no-underline transition-[opacity,transform] hover:scale-105 focus-visible:scale-105 motion-reduce:transition-none ${
                  eteinte ? "opacity-30" : ""
                }`}
                style={{
                  left: `${p.x - p.d / 2}%`,
                  top: `${p.y - p.d / 2}%`,
                  width: `${p.d}%`,
                  height: `${p.d}%`,
                  background: TEINTE[e.id],
                  boxShadow: "inset 0 0 0 2px #13201E, inset 0 8px 0 0 rgba(19,32,30,0.12)",
                }}
              >
                <IlluEpice id={e.id} size={80} className="h-auto w-[62%]" />
              </Link>
              {p.angle !== null && (
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute hidden flex-col whitespace-nowrap leading-tight sm:flex ${eteinte ? "opacity-30" : ""} ${
                    alignement === "gauche" ? "text-left" : alignement === "droite" ? "items-end text-right" : "items-center text-center"
                  }`}
                  style={{
                    left: `${50 + ETIQUETTE * Math.cos((p.angle * Math.PI) / 180)}%`,
                    top: `${50 + (ETIQUETTE - 0.7) * Math.sin((p.angle * Math.PI) / 180)}%`,
                    transform: `translate(${alignement === "gauche" ? "0" : alignement === "droite" ? "-100%" : "-50%"}, -50%)`,
                  }}
                >
                  <span className="font-display text-[1.05rem] lg:text-[1.2rem]">{e.nom}</span>
                  <span className="text-sm italic text-doux">{e.translit}</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
    <p className="m-0 hidden text-[15px] italic text-doux sm:block">
      Au centre, le curcuma (<i>haridra</i>)
    </p>
    {/* Sur téléphone, les noms passent sous la boîte */}
    <ul className="m-0 grid w-full list-none grid-cols-2 gap-x-6 p-0 sm:hidden">
      {EPICES.map((e) => (
        <li key={e.id} className={`border-t border-dashed border-trait ${actives && !actives.has(e.id) ? "opacity-40" : ""}`}>
          <Link to={`/cuisine/epices/${e.id}`} className="flex min-h-11 flex-col justify-center py-1.5 no-underline">
            <span className="font-display text-[1.05rem] leading-tight">{e.nom}</span>
            <span className="text-sm italic text-doux">{e.translit}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Dabba;
