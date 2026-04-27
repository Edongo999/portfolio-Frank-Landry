import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* 🔹 Liens de navigation */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium">
          <a href="#home" className="hover:text-indigo-400 transition">{t("footer.nav.home")}</a>
          <a href="#about" className="hover:text-indigo-400 transition">{t("footer.nav.about")}</a>
          <a href="#projects" className="hover:text-indigo-400 transition">{t("footer.nav.projects")}</a>
          <a href="#experiences" className="hover:text-indigo-400 transition">{t("footer.nav.experiences")}</a>
          <a href="#contact" className="hover:text-indigo-400 transition">{t("footer.nav.contact")}</a>
        </nav>

        {/* 🔹 Texte droit */}
        <div className="text-center md:text-right space-y-1">
          <p className="text-sm text-gray-400">
            {t("footer.portfolio")}{" "}
            <span className="font-semibold text-indigo-300">LEMOUDJI KEMTA MIRANDA</span>
          </p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x">
              {t("footer.company")}
            </span>. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
