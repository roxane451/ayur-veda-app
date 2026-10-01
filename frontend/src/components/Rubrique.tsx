import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export interface SousPage {
  titre: string;
  href: string;
}

/** Sous-navigation d'une rubrique : défile au doigt sur téléphone. */
export const SousNav = ({ label, pages }: { label: string; pages: SousPage[] }) => (
  <nav aria-label={label} className="mx-auto max-w-[1220px] px-4 pb-2 sm:px-10">
    <ul className="-mx-4 m-0 flex list-none gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
      {pages.map((p) => (
        <li key={p.href} className="shrink-0">
          <NavLink
            to={p.href}
            end={p.href.split("/").length <= 2}
            className={({ isActive }) =>
              `inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-4 text-[15px] font-bold ${
                isActive ? "bg-encre text-pistache" : "text-encre shadow-[inset_0_0_0_1.5px_hsl(var(--trait))] hover:bg-surface"
              }`
            }
          >
            {p.titre}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

/** Gabarit d'une page de rubrique : menu, sous-navigation, contenu, pied de page. */
export const PageRubrique = ({ label, pages, children }: { label: string; pages: SousPage[]; children: ReactNode }) => (
  <>
    <Navbar />
    <SousNav label={label} pages={pages} />
    <main>{children}</main>
    <Footer />
  </>
);

const Sep = () => (
  <>
    {" "}
    <span aria-hidden="true" className="text-trait">
      /
    </span>{" "}
  </>
);

/** Fil d'Ariane : Accueil / Rubrique / Page. */
export const Fil = ({ rubrique, href, page }: { rubrique: string; href: string; page?: string }) => (
  <nav aria-label="Fil d'Ariane" className="text-[15px] text-doux">
    <Link to="/">Accueil</Link>
    <Sep />
    {page ? (
      <>
        <Link to={href}>{rubrique}</Link>
        <Sep />
        <span aria-current="page">{page}</span>
      </>
    ) : (
      <span aria-current="page">{rubrique}</span>
    )}
  </nav>
);
