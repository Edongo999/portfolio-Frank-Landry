import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Remonte en haut de la page à chaque changement de route
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}