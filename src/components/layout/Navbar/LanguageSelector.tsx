import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

type Language = {
  code: string;
  label: string;
  flag: string;
};

const languages: Language[] = [
  { code: "fr", label: "Français", flag: "FR" },
  { code: "en", label: "English", flag: "GB" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);

  const changeLanguage = (lang: Language) => {
    // On change directement la langue, AnimatePresence gère la transition
    setCurrentLang(lang);
    i18n.changeLanguage(lang.code);
    setLangOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setLangOpen(!langOpen)}
        className="flex items-center space-x-2 font-semibold"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLang.code} // ✅ clé unique pour déclencher l’animation
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center space-x-2"
          >
            <ReactCountryFlag
              countryCode={currentLang.flag}
              svg
              style={{ width: "1.5em", height: "1.5em" }}
            />
            <span>{currentLang.label}</span>
            <ChevronDown size={18} className="text-white" />
          </motion.div>
        </AnimatePresence>
      </button>

      {langOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => changeLanguage(lang)}
            >
              <ReactCountryFlag
                countryCode={lang.flag}
                svg
                style={{ width: "1.5em", height: "1.5em", marginRight: "0.5em" }}
              />
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
