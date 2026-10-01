import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** À chaque changement de page, on repart du haut (sauf lien vers une ancre). */
const RetourEnHaut = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);
  return null;
};

export default RetourEnHaut;
