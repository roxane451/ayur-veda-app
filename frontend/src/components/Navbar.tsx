import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { NAV_LINKS } from "@/components/navLinks";


const lienClasse = ({ isActive }: { isActive: boolean }) =>
  `transition-colors hover:text-aubergine ${
    isActive ? "text-aubergine underline underline-offset-8 decoration-2" : "text-encre"
  }`;

const Navbar = () => {
  const [ouvert, setOuvert] = useState(false);
  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-50 bg-pistache/95 backdrop-blur-md pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-5 px-4 py-3 sm:px-10 sm:py-4">
        <Link to="/" aria-label="Ayur-Veda, accueil" className="no-underline">
          <Logo size={30} />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-base font-bold lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.href} to={l.href} className={lienClasse}>
              {l.name}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/profil"
          className="hidden min-h-[46px] items-center rounded-buta bg-aubergine px-6 font-bold text-pistache hover:opacity-90 lg:inline-flex"
        >
          Découvrir mon dosha
        </Link>

        <button
          type="button"
          onClick={() => setOuvert((o) => !o)}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
        >
          {ouvert ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {ouvert && (
        <nav
          id="menu-mobile"
          aria-label="Navigation principale"
          className="fixed inset-x-0 bottom-0 top-[calc(4.25rem+env(safe-area-inset-top))] overflow-y-auto bg-pistache px-4 pb-safe lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <li key={l.href} className="border-t border-dashed border-trait">
                <NavLink
                  to={l.href}
                  onClick={() => setOuvert(false)}
                  className={({ isActive }) =>
                    `block py-5 font-display text-[1.75rem] leading-none ${isActive ? "text-aubergine" : "text-encre"}`
                  }
                >
                  {l.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/profil"
            onClick={() => setOuvert(false)}
            className="mt-6 flex min-h-[54px] items-center justify-center rounded-buta bg-aubergine px-6 font-bold text-pistache"
          >
            Découvrir mon dosha
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
