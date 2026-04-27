import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import { Linkedin } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation();

  // 🔹 Liste des noms et rôles (traduits via i18n)
  const names = [t("hero.name1"), t("hero.name2")];
  const roles = [t("hero.role1"), t("hero.role2")];

  // 🔹 États pour le texte affiché
  const [displayedName, setDisplayedName] = useState("");
  const [displayedRole, setDisplayedRole] = useState("");
  const [nameIndex, setNameIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [nameChar, setNameChar] = useState(0);
  const [roleChar, setRoleChar] = useState(0);
  const [phase, setPhase] = useState<"name" | "role" | "deleteRole">("name");

  // 🔹 Effet d’écriture automatique
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (phase === "name") {
        const currentName = names[nameIndex];
        if (nameChar < currentName.length) {
          setDisplayedName(currentName.slice(0, nameChar + 1));
          setNameChar(nameChar + 1);
        } else {
          setPhase("role");
          setRoleChar(0);
          setDisplayedRole("");
        }
      } else if (phase === "role") {
        const currentRole = roles[roleIndex];
        if (roleChar < currentRole.length) {
          setDisplayedRole(currentRole.slice(0, roleChar + 1));
          setRoleChar(roleChar + 1);
        } else {
          setPhase("deleteRole");
        }
      } else if (phase === "deleteRole") {
        const currentRole = roles[roleIndex];
        if (roleChar > 0) {
          setDisplayedRole(currentRole.slice(0, roleChar - 1));
          setRoleChar(roleChar - 1);
        } else {
          const nextRoleIndex = roleIndex + 1 < roles.length ? roleIndex + 1 : 0;
          const nextPhase = nextRoleIndex === 0 ? "name" : "role";
          const nextNameIndex = nextRoleIndex === 0 ? (nameIndex + 1) % names.length : nameIndex;

          setRoleIndex(nextRoleIndex);
          setNameIndex(nextNameIndex);
          setPhase(nextPhase);
          setNameChar(nextPhase === "name" ? 0 : nameChar);
          setRoleChar(0);
          setDisplayedName(nextPhase === "name" ? "" : displayedName);
          setDisplayedRole("");
        }
      }
    }, 120);

    return () => clearTimeout(timeout);
  }, [phase, nameChar, roleChar, nameIndex, roleIndex, displayedName]);

  // 🔹 Variants cascade
  const cascadeVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        ease: "easeOut"
        
      }
    })
  };

  return (
    <section
      id="hero"
      className="min-h-[70vh] flex flex-col md:flex-row justify-between px-8 pt-40 pb-14 bg-gray-950 text-white"
    >
      {/* 🔹 Bloc texte */}
      <div className="md:w-1/2 space-y-6 self-start">
        <motion.h1
          className="font-bold mb-4 whitespace-nowrap text-[clamp(1.2rem,4vw,2.5rem)]"
          variants={cascadeVariant}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="text-white">{t("hero.greeting")} </span>
          <span className="text-[#9333EA]">{displayedName}</span>
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl font-semibold text-gray-200"
          variants={cascadeVariant}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {displayedRole}
        </motion.h2>

        <motion.p
          className="text-gray-400 text-justify text-xl leading-relaxed max-w-xl"
          variants={cascadeVariant}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {t("hero.description")}
        </motion.p>

        {/* 🔹 Boutons + LinkedIn */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 relative"
          variants={cascadeVariant}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <a href="#projects" className="w-full md:w-auto">
            <Button text={t("hero.btnProjects")} />
          </a>

          <motion.a
            href="/public/Document/CV_LEMOUDJI_KEMTA_Miranda.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block w-full md:w-auto"
          >
            <Button text={t("hero.btnCV")} variant="secondary" />
          </motion.a>

          <div className="group flex justify-center md:justify-start relative">
            <a
              href="https://linkedin.com/in/tonprofil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full 
                         bg-gray-900 hover:bg-blue-600 
                         transition-colors shadow-md hover:shadow-lg"
            >
              <Linkedin className="text-white w-6 h-6" />
            </a>

            <span
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
                         px-3 py-1 rounded-md text-xs md:text-sm font-medium 
                          text-white whitespace-nowrap 
                         opacity-0 group-hover:opacity-100 
                         transition-all duration-300 transform group-hover:-translate-y-1
                         hidden md:block"
            >
              {t("hero.linkedinTooltip")}
            </span>
          </div>
        </motion.div>
      </div>

      {/* 🔹 Bloc image */}
      <motion.div
        className="md:w-1/3 flex justify-center relative mt-10 md:mt-0"
        variants={cascadeVariant}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <img
          src="/images/Miranda.png"
          alt={t("hero.imageAlt")}
          className="w-80 h-96 md:w-[23rem] md:h-[26rem] rounded-full shadow-lg animate-updown"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
