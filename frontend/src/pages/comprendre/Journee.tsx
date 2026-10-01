import { useState } from "react";
import { Link } from "react-router-dom";
import { Bande } from "@/components/brand/BrandDefs";
import { PageComprendre, PiedSuite, TitrePage } from "@/components/comprendre/Commun";
import { Fil, PageRubrique } from "@/components/Rubrique";
import { PAGES_QUOTIDIEN } from "@/components/quotidien/pages";
import { COULEUR_DOSHA, fr } from "@/components/quiz/conseils";
import { MOMENTS_JOURNEE, momentEnCours } from "@/data/comprendre";
import { NOM_DOSHA } from "@/lib/doshaLogic";

const COULEUR_HEX = { vata: "#8DB9B0", pitta: "#5B2A4E", kapha: "#6E7F1A" } as const;

/** L'horloge des doshas : six tranches de quatre heures, le moment présent en relief. */
const Horloge = ({ actuel }: { actuel: number }) => {
  const C = 2 * Math.PI * 150;
  const arc = C / 6 - 4;
  return (
    <svg viewBox="0 0 440 440" width="100%" className="max-w-[420px]" role="img" aria-label="Horloge des doshas sur vingt-quatre heures">
      <g transform="rotate(-90 220 220)" fill="none">
        {MOMENTS_JOURNEE.map((m, i) => (
          <circle
            key={m.debut}
            cx="220"
            cy="220"
            r="150"
            stroke={COULEUR_HEX[m.dosha]}
            strokeWidth={i === actuel ? 58 : 44}
            strokeDasharray={`${arc} ${C - arc}`}
            strokeDashoffset={-(m.debut / 24) * C - 2}
          />
        ))}
      </g>
      {[0, 6, 12, 18].map((h) => (
        <text
          key={h}
          x={220 + 198 * Math.sin((h * 15 * Math.PI) / 180)}
          y={226 - 198 * Math.cos((h * 15 * Math.PI) / 180)}
          textAnchor="middle"
          fontFamily="Castoro, serif"
          fontSize="15"
          fill="#4C5A57"
        >
          {h} h
        </text>
      ))}
      <text x="220" y="214" textAnchor="middle" fontFamily="Castoro Titling, serif" fontSize="22" letterSpacing="3" fill="#13201E">
        DINACHARYA
      </text>
      <text x="220" y="242" textAnchor="middle" fontFamily="Castoro, serif" fontStyle="italic" fontSize="19" fill="#5B2A4E">
        le rythme du jour
      </text>
    </svg>
  );
};

const Cadre = ({ quotidien, children }: { quotidien: boolean; children: React.ReactNode }) =>
  quotidien ? (
    <PageRubrique label="Au quotidien" pages={PAGES_QUOTIDIEN}>
      {children}
    </PageRubrique>
  ) : (
    <PageComprendre>{children}</PageComprendre>
  );

/** La journée : dans « Comprendre », et aussi dans « Au quotidien ». */
const Journee = ({ rubrique = "comprendre" }: { rubrique?: "comprendre" | "quotidien" }) => {
  const quotidien = rubrique === "quotidien";
  const [actuel] = useState(() => momentEnCours(new Date().getHours()));
  return (
    <Cadre quotidien={quotidien}>
      <div className="mx-auto grid max-w-[1220px] items-center gap-6 px-4 sm:px-10 md:grid-cols-2">
        <TitrePage
          fil="La journée"
          filAriane={quotidien ? <Fil rubrique="Au quotidien" href="/au-quotidien" page="La journée" /> : undefined}
          titre="La journée idéale"
          deva="दिनचर्या"
          translit="dinacharya"
          intro="La journée suit le même cycle que l'année. Chaque dosha y domine deux fois, quatre heures à chaque fois, et l'on cale ses gestes sur ce rythme."
        />
        <div className="flex justify-center pb-8 md:py-6">
          <Horloge actuel={actuel} />
        </div>
      </div>
      <Bande />

      <section aria-label="Les moments de la journée" className="mx-auto flex max-w-[1000px] flex-col px-4 pb-12 pt-16 sm:px-10 md:pt-[72px]">
        {MOMENTS_JOURNEE.map((m, i) => (
          <div
            key={m.debut}
            className={`grid gap-3 border-t border-dashed border-trait py-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6 ${
              i === actuel ? "-mx-4 rounded-xl bg-carte px-4 shadow-[inset_0_0_0_1.5px_hsl(var(--encre))] sm:-mx-6 sm:px-6" : ""
            }`}
            aria-current={i === actuel ? "time" : undefined}
          >
            <span className="flex flex-row items-baseline gap-3 sm:flex-col sm:gap-1.5">
              <span className="font-bold">{m.heures}</span>
              <span className="inline-flex items-center gap-2 text-[15px] text-doux">
                <span aria-hidden="true" className="h-3 w-3 rounded-full" style={{ background: COULEUR_DOSHA[m.dosha] }} />
                {NOM_DOSHA[m.dosha]}
              </span>
              {i === actuel && <span className="text-sm font-bold text-aubergine">En ce moment</span>}
            </span>
            <span className="flex flex-col gap-1.5">
              <span className="font-display text-[1.6rem]">{m.titre}</span>
              {m.gestes.map((g) => (
                <span key={g}>{fr(g)}</span>
              ))}
            </span>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-[1220px] px-4 pb-[72px] sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-surface px-6 py-8 sm:px-9">
          <div className="flex max-w-[620px] flex-col gap-1.5">
            <span className="font-display text-[1.75rem]">Par où commencer</span>
            <span className="text-doux">
              Choisissez le geste qui vous semble le plus facile et tenez-le trois semaines avant d'en ajouter un autre. Le programme de saison de l'espace membre en propose un par jour.
            </span>
          </div>
          <Link
            to="/espace-membre"
            className="inline-flex min-h-[52px] items-center rounded-buta bg-aubergine px-6 font-bold text-pistache no-underline hover:opacity-90"
          >
            Voir les programmes
          </Link>
        </div>
      </section>
      {!quotidien && <PiedSuite precedent="Le corps et l'esprit" suivant="Lexique" />}
    </Cadre>
  );
};

export default Journee;
