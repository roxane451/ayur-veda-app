import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Bande } from "@/components/brand/BrandDefs";
import { Deva, Frontispice, PageComprendre, PiedSuite } from "@/components/comprendre/Commun";
import { fr } from "@/components/quiz/conseils";
import { LEXIQUE, initiale } from "@/data/comprendre";

const sansAccent = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const Lexique = () => {
  const [recherche, setRecherche] = useState("");
  const lettres = useMemo(() => Array.from(new Set(LEXIQUE.map((m) => initiale(m.mot)))).sort(), []);
  const mots = useMemo(() => {
    const q = sansAccent(recherche.trim());
    return q ? LEXIQUE.filter((m) => sansAccent(m.mot + " " + m.sens).includes(q)) : LEXIQUE;
  }, [recherche]);

  return (
    <PageComprendre>
      <Frontispice deva="शब्दकोश" translit="śabdakośa, le lexique" titre="Lexique">
        <p className="m-0 mt-1 max-w-[44ch] text-xl text-doux">Les mots sanskrits que vous croiserez sur le site, avec leur sens en une phrase.</p>
      </Frontispice>
      <div className="mx-auto max-w-[1220px] px-4 sm:px-10">
        <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Lettres" className="flex flex-wrap gap-1.5">
            {lettres.map((l) => (
              <a
                key={l}
                href={`#lettre-${l}`}
                onClick={() => setRecherche("")}
                className="inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-[15px] font-bold no-underline shadow-[inset_0_0_0_1.5px_hsl(var(--trait))] hover:bg-surface"
              >
                {l}
              </a>
            ))}
          </nav>
          <label className="relative flex min-h-11 items-center sm:w-72">
            <span className="sr-only">Chercher un mot</span>
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-doux" aria-hidden="true" />
            <input
              type="search"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Chercher un mot"
              className="h-11 w-full rounded-full bg-carte pl-10 pr-4 text-base shadow-[inset_0_0_0_1.5px_hsl(var(--encre))] outline-none focus-visible:ring-2 focus-visible:ring-citron"
            />
          </label>
        </div>
      </div>
      <Bande />

      <section aria-label="Les mots" className="mx-auto max-w-[1100px] px-4 pb-16 pt-12 sm:px-10 md:pt-14">
        {mots.length ? (
          <dl className="m-0">
            {mots.map((m, i) => {
              const premiere = i === 0 || initiale(mots[i - 1].mot) !== initiale(m.mot);
              return (
                <div
                  key={m.mot}
                  id={premiere ? `lettre-${initiale(m.mot)}` : undefined}
                  className="grid scroll-mt-24 items-baseline gap-x-6 gap-y-1 border-t border-dashed border-trait py-5 sm:grid-cols-[200px_120px_minmax(0,1fr)]"
                >
                  <dt className="flex items-baseline gap-3 font-display text-[1.6rem]">
                    {m.mot}
                    <Deva className="text-2xl text-aubergine sm:hidden">{m.deva}</Deva>
                  </dt>
                  <span className="hidden sm:block">
                    <Deva className="text-2xl text-aubergine">{m.deva}</Deva>
                  </span>
                  <dd className="m-0">{fr(m.sens)}</dd>
                </div>
              );
            })}
          </dl>
        ) : (
          <p className="m-0 text-doux">Aucun mot ne correspond à «&nbsp;{recherche}&nbsp;».</p>
        )}
      </section>
      <PiedSuite />
    </PageComprendre>
  );
};

export default Lexique;
