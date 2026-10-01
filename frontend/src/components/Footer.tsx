import { Link } from "react-router-dom";
import Logo from "@/components/brand/Logo";
import Sceau from "@/components/brand/Sceau";
import { Bande } from "@/components/brand/BrandDefs";
import { NAV_LINKS } from "@/components/navLinks";

const LEGAL = ["Mentions légales", "Confidentialité", "CGU", "Conditions de vente"];

const Footer = () => (
  <>
    <Bande />
    <footer className="bg-encre text-pistache">
      <div className="mx-auto flex max-w-[1220px] flex-wrap justify-between gap-8 px-4 py-14 text-[15px] sm:px-10">
        <div className="flex max-w-[520px] items-center gap-6">
          <Sceau size={88} rotate={-6} fond="hsl(var(--aubergine))" reserve="hsl(var(--pistache))" />
          <div className="flex flex-col gap-2">
            <Logo size={28} color="hsl(var(--pistache))" barColor="hsl(var(--citron))" />
            <p className="m-0 text-[#D3E3DE]">
              Les contenus de ce site sont informatifs et ne remplacent pas l'avis d'un professionnel de santé.
            </p>
          </div>
        </div>
        <nav aria-label="Pied de page" className="flex flex-wrap gap-x-10 gap-y-6">
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-pistache hover:text-citron">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {LEGAL.map((l) => (
              <li key={l}>
                {/* [À FAIRE] pages légales à rédiger */}
                <a href="#" className="text-[#D3E3DE] hover:text-citron">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto m-0 max-w-[1220px] px-4 pb-safe pb-8 text-sm text-[#B8C2BE] sm:px-10">
        © {new Date().getFullYear()} Ayur-Veda
      </p>
    </footer>
  </>
);

export default Footer;
