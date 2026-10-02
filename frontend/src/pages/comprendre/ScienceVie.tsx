import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Bande, Motif } from "@/components/brand/BrandDefs";
import { Deva, Frontispice, Ornement, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { DApres, Renvoi, Sources } from "@/components/comprendre/Sources";
import { LIVRES } from "@/components/comprendre/sousPages";
import { QUATRE_DE_LA_VIE, REFS_SCIENCE_VIE, SANTE, SORTES_DE_VIE } from "@/data/principes";

const NOMBRES = ["", "un", "deux", "trois", "quatre", "cinq"];

const H2 = ({ id, children, clair }: { id?: string; children: string; clair?: boolean }) => (
  <h2 id={id} className={`m-0 text-[clamp(2.2rem,4.4vw,3rem)] leading-none ${clair ? "text-pistache" : ""}`}>
    {children}
  </h2>
);

const ScienceVie = () => (
  <PageComprendre>
    <Frontispice deva="आयुर्वेद" translit="āyus, la vie, et veda, la connaissance" titre="La science de la vie">
      <p className="m-0 mt-1 max-w-[46ch] text-xl text-doux">
        Ce qu'est la vie, ce qu'est la santé, et ce que cherche l'Ayurveda. C'est par là que Charaka ouvre son traité.
      </p>
      <div className="mt-5">
        <Ornement />
      </div>
    </Frontispice>
    <Bande />
    <DApres>Charaka, Sūtrasthāna 1 et 30</DApres>

    {/* Ce qu'est la vie */}
    <section aria-labelledby="sv-vie" className="mx-auto flex max-w-[1100px] flex-col gap-9 px-4 pb-20 pt-14 sm:px-10 md:pt-16">
      <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
        <H2 id="sv-vie">Ce qu'est la vie</H2>
        <p className="m-0 text-lg text-doux">
          Pour Charaka, la vie est l'union de quatre choses. Tant qu'elles tiennent ensemble, on vit.
          <Renvoi n={1} />
        </p>
      </div>
      <ul className="m-0 grid list-none grid-cols-2 items-start gap-x-4 gap-y-8 p-0 md:flex md:justify-between">
        {QUATRE_DE_LA_VIE.map((q, i) => (
          <Fragment key={q.nom}>
            {i > 0 && (
              <li aria-hidden="true" className="hidden self-center pb-10 font-body text-[2rem] text-aubergine md:block">
                +
              </li>
            )}
            <li className="flex flex-col items-center gap-2.5 text-center">
              <span
                className={`flex h-[132px] w-[132px] flex-col items-center justify-center gap-0.5 rounded-full shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:h-[170px] sm:w-[170px] ${q.fond}`}
              >
                <Deva className="text-[26px] sm:text-[30px]">{q.deva}</Deva>
                <span className="text-[15px] italic">{q.sanskrit}</span>
              </span>
              <span className="font-display text-[1.35rem]">{q.nom}</span>
            </li>
          </Fragment>
        ))}
      </ul>
      <p className="m-0 text-center text-[1.2rem] italic text-aubergine">
        L'Ayurveda est la connaissance de ce qui est bon ou mauvais pour cette vie.
        <Renvoi n={2} />
      </p>
    </section>

    {/* Quatre sortes de vie */}
    <section aria-labelledby="sv-sortes" className="relative overflow-hidden bg-paon text-pistache">
      <Motif id="dabu" />
      <div className="relative mx-auto flex max-w-[1100px] flex-col gap-8 px-4 py-16 sm:px-10 md:py-[72px]">
        <div className="grid items-end gap-4 md:grid-cols-2 md:gap-14">
          <H2 id="sv-sortes" clair>
            Quatre sortes de vie
          </H2>
          <p className="m-0 text-lg text-[#D3E3DE]">
            Charaka distingue la vie bonne et la vie néfaste, la vie heureuse et la vie malheureuse. L'Ayurveda dit ce qui mène aux unes ou aux autres.
            <Renvoi n={3} />
          </p>
        </div>
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {SORTES_DE_VIE.map((v, i) => {
            const plein = i % 2 === 0;
            return (
              <li
                key={v.sanskrit}
                className={`flex flex-col gap-1.5 rounded-[4px_4px_22px_4px] px-6 py-5 ${
                  plein ? "bg-carte text-encre" : "bg-pistache/5 shadow-[inset_0_0_0_1.5px_rgba(243,245,230,0.5)]"
                }`}
              >
                <span className="flex items-baseline gap-2.5">
                  <Deva className={`text-[26px] ${plein ? "text-paon" : "text-citron"}`}>{v.deva}</Deva>
                  <i className="opacity-80">{v.sanskrit}</i>
                </span>
                <h3 className="m-0 text-[1.35rem]">{v.titre}</h3>
                <p className={`m-0 ${plein ? "text-doux" : "text-[#D3E3DE]"}`}>{v.texte}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>

    {/* Ce qu'est la santé */}
    <section aria-labelledby="sv-sante" className="mx-auto grid max-w-[1100px] items-start gap-10 px-4 pb-16 pt-20 sm:px-10 md:grid-cols-2 md:gap-16">
      <div className="flex flex-col gap-4">
        <H2 id="sv-sante">Ce qu'est la santé</H2>
        <p className="m-0 text-lg text-doux">
          Suśruta donne la définition la plus citée. Est en bonne santé celui dont ces quatre choses vont bien.
          <Renvoi n={4} />
        </p>
        <div className="mt-3 flex min-h-[260px] flex-col items-center justify-end gap-1.5 rounded-b-[14px] rounded-t-full bg-surface px-6 pb-7 text-center shadow-[inset_0_0_0_2px_hsl(var(--encre))] sm:min-h-[300px]">
          <Deva className="text-[34px] text-paon">स्वस्थ</Deva>
          <span className="italic text-doux">svastha, établi en soi-même</span>
          <span>C'est le mot sanskrit pour « en bonne santé ».</span>
        </div>
      </div>
      <ul className="m-0 list-none p-0 md:pt-24">
        {SANTE.map(([a, b]) => (
          <li key={a} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3 border-t border-encre/20 py-3.5 text-[1.15rem]">
            <span aria-hidden="true" className="mt-1.5 h-[20px] w-[20px] rounded-full bg-citron shadow-[0_0_0_1.5px_hsl(var(--encre))]" />
            <span>
              <b>{a}</b> {b}
            </span>
          </li>
        ))}
      </ul>
    </section>

    {/* Les deux buts */}
    <section aria-label="Les deux buts de l'Ayurveda" className="mx-auto grid max-w-[1100px] gap-8 px-4 pb-16 sm:px-10 md:grid-cols-2 md:gap-16">
      <div className="flex flex-col gap-2.5 border-t-4 border-citron pt-5">
        <h3 className="m-0 text-2xl">Garder la santé</h3>
        <p className="m-0 text-lg">
          Le premier but de l'Ayurveda, et celui de ce site.
          <Renvoi n={5} />
        </p>
      </div>
      <div className="flex flex-col gap-2.5 border-t-4 border-aubergine pt-5">
        <h3 className="m-0 text-2xl">Apaiser la maladie</h3>
        <p className="m-0 text-lg">Le second, qui demande un médecin et une praticienne.</p>
      </div>
    </section>

    {/* Le plan */}
    <section aria-labelledby="sv-livres" className="mx-auto flex max-w-[1100px] flex-col gap-4 px-4 pb-8 sm:px-10">
      <H2 id="sv-livres">{`Les ${NOMBRES[LIVRES.length]} livres`}</H2>
      <ol className="m-0 list-none p-0">
        {LIVRES.map((l) => (
          <li key={l.num}>
            <Link
              to={l.chapitres[0].href}
              className="group grid grid-cols-[72px_minmax(0,1fr)] items-baseline gap-4 border-t border-dashed border-trait py-4 no-underline sm:grid-cols-[90px_minmax(0,1fr)]"
            >
              <span className="text-lg italic text-aubergine">Livre {l.num}</span>
              <span className="flex flex-col gap-0.5">
                <span className="font-display text-[1.6rem] leading-tight group-hover:text-aubergine">{l.titre}</span>
                <span className="text-doux">{l.chapitres.map((c) => c.titre).join(", ")}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>

    <Sources refs={REFS_SCIENCE_VIE} />
    <PiedSuite />
  </PageComprendre>
);

export default ScienceVie;
