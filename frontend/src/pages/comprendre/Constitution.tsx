import { Link } from "react-router-dom";
import { Bande, Motif } from "@/components/brand/BrandDefs";
import { ListeButa } from "@/components/brand/Listes";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { COULEUR_DOSHA } from "@/components/quiz/conseils";
import { FACTEURS_PRAKRITI, PORTRAITS, REFS_CONSTITUTION, SEPT_NATURES } from "@/data/constitution";
import { NOM_DOSHA } from "@/lib/doshaLogic";

/* Les sept natures : un dosha à chaque pointe, les natures doubles sur les côtés, l'équilibre au centre */
const Triangle = () => (
  <svg
    viewBox="0 0 520 470"
    className="h-auto w-full"
    role="img"
    aria-label="Trois natures simples aux pointes, Vata, Pitta et Kapha. Trois natures doubles sur les côtés. La nature équilibrée au centre."
  >
    <path d="M260 40 L470 400 L50 400 Z" fill="none" stroke="#13201E" strokeWidth="2" />
    <g fontStyle="italic" fontSize="16" fill="#4C5A57" textAnchor="middle">
      <text x="130" y="210" transform="rotate(-60 130 210)">Vata et Pitta</text>
      <text x="392" y="210" transform="rotate(60 392 210)">Pitta et Kapha</text>
      <text x="260" y="432">Vata et Kapha</text>
    </g>
    {[
      [155, 220],
      [365, 220],
      [260, 400],
    ].map(([x, y]) => (
      <circle key={x} cx={x} cy={y} r="12" fill="#FBFCF4" stroke="#13201E" strokeWidth="2" />
    ))}
    <circle cx="260" cy="280" r="58" fill="#BBD439" stroke="#13201E" strokeWidth="2" />
    <text x="260" y="276" textAnchor="middle" className="font-display" fontSize="17" fill="#13201E">
      ÉQUILIBRÉE
    </text>
    <text x="260" y="298" textAnchor="middle" fontStyle="italic" fontSize="15" fill="#13201E">
      sama
    </text>
    {(
      [
        ["pitta", 260, 40],
        ["vata", 50, 400],
        ["kapha", 470, 400],
      ] as const
    ).map(([d, x, y]) => (
      <g key={d}>
        <circle cx={x} cy={y} r="38" fill={d === "pitta" ? "#5B2A4E" : d === "vata" ? "#8DB9B0" : "#6E7F1A"} stroke="#13201E" strokeWidth="2" />
        <text x={x} y={y + 6} textAnchor="middle" className="font-display" fontSize="17" fill={d === "vata" ? "#13201E" : "#F0F4E0"}>
          {NOM_DOSHA[d].toUpperCase()}
        </text>
      </g>
    ))}
  </svg>
);

const Constitution = () => (
  <PageComprendre>
    <Frontispice deva="प्रकृति" translit="prakṛti, la nature" titre="La constitution">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Chacun naît avec un dosage des trois doshas qui lui est propre. Il ne change plus de toute la vie, et c'est par rapport à lui qu'on mesure un
        déséquilibre.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />
    <DApres>Charaka, Vimānasthāna 8 ; Suśruta, Śārīrasthāna 4</DApres>

    <section aria-labelledby="co-conception" className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 pb-20 pt-14 sm:px-10 md:pt-16">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="co-conception" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Fixée dès la conception
        </h2>
        <p className="m-0 text-lg text-doux">
          Pour Charaka, la nature se décide au moment de la conception. Quatre choses la façonnent.
          <Renvoi n={1} />
        </p>
      </div>
      <ol className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {FACTEURS_PRAKRITI.map((f) => (
          <li key={f.titre} className={`flex flex-col gap-2.5 border-t-4 pt-4 ${f.trait}`}>
            <Deva className="text-2xl text-paon">{f.deva}</Deva>
            <h3 className="m-0 text-[1.3rem] leading-tight">{f.titre}</h3>
            <p className="m-0 text-doux">{f.texte}</p>
          </li>
        ))}
      </ol>
    </section>

    <section aria-labelledby="co-sept" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto grid max-w-[1100px] items-center gap-10 px-4 py-16 sm:px-10 md:py-[72px] lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-14">
        <div className="flex flex-col gap-4">
          <h2 id="co-sept" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
            Sept natures
          </h2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Les textes en comptent sept.<Renvoi n={2} clair /> Pour Charaka, la nature équilibrée réunit toutes les qualités.
            <Renvoi n={3} clair />
          </p>
          <ul className="m-0 list-none p-0">
            {SEPT_NATURES.map((s) => (
              <li key={s.titre} className="grid grid-cols-[52px_minmax(0,1fr)] gap-3.5 border-t border-pistache/30 py-4">
                <span aria-hidden="true" className="font-body text-[2.4rem] italic leading-none text-citron">
                  {s.n}
                </span>
                <span className="flex flex-col gap-1">
                  <h3 className="m-0 text-[1.35rem]">{s.titre}</h3>
                  <span className="text-[#D3E3DE]">{s.texte}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-b-[18px] rounded-t-full bg-pistache px-3 pb-4 pt-12 shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:px-6 sm:pt-16">
          <Triangle />
        </div>
      </div>
    </section>

    <section aria-labelledby="co-portraits" className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 pb-16 pt-20 sm:px-10">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <h2 id="co-portraits" className="m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none">
          Les portraits de Charaka
        </h2>
        <p className="m-0 text-lg text-doux">
          Charaka décrit chaque nature simple, en commençant par Kapha. On s'y reconnaît rarement en entier.
          <Renvoi n={4} />
        </p>
      </div>
      <div className="grid gap-12 md:grid-cols-3 md:gap-9">
        {PORTRAITS.map((p) => (
          <article key={p.dosha} className="flex flex-col gap-4">
            <div
              className={`flex h-[150px] flex-col items-center justify-end rounded-b-[10px] rounded-t-full pb-4 shadow-[inset_0_0_0_2px_hsl(var(--encre))] ${p.dosha === "vata" ? "text-encre" : "text-pistache"}`}
              style={{ background: COULEUR_DOSHA[p.dosha] }}
            >
              <Deva className="text-[30px] text-inherit">{p.deva}</Deva>
              <span className="font-display text-[1.6rem]">{NOM_DOSHA[p.dosha]}</span>
            </div>
            <ListeButa titre={p.image} items={p.traits} couleur={COULEUR_DOSHA[p.dosha]} classeTitre="text-aubergine !text-[1.2rem]" />
          </article>
        ))}
      </div>
    </section>

    <section aria-label="Votre nature et votre état du moment" className="mx-auto grid max-w-[1100px] gap-6 px-4 pb-6 sm:px-10 md:grid-cols-2">
      <div className="flex min-h-[260px] flex-col items-center justify-end gap-2 rounded-b-[14px] rounded-t-full bg-carte px-8 pb-8 text-center shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:min-h-[300px]">
        <Deva className="text-[28px] text-paon">प्रकृति</Deva>
        <h2 className="m-0 text-2xl">Votre nature</h2>
        <p className="m-0 text-lg">Celle de naissance. Elle ne change pas.</p>
      </div>
      <div className="flex min-h-[340px] flex-col items-center justify-end gap-2 rounded-b-[14px] rounded-t-full bg-aubergine px-8 pb-8 text-center text-pistache shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:min-h-[300px]">
        <Deva className="text-[28px] text-citron">विकृति</Deva>
        <h2 className="m-0 text-2xl">Votre état du moment</h2>
        <p className="m-0 text-lg text-[#E7D9E3]">Ce que la saison, l'âge et la vie y ont changé. C'est lui qu'on rééquilibre.</p>
        <Link to="/profil" className="mt-2 inline-flex min-h-[48px] items-center rounded-buta bg-citron px-6 font-bold text-encre no-underline hover:opacity-90">
          Faire le quiz
        </Link>
      </div>
    </section>

    <Sources refs={REFS_CONSTITUTION} />
    <PiedSuite />
  </PageComprendre>
);

export default Constitution;
