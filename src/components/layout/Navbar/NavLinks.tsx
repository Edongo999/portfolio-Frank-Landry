import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { itemVariants } from "../../animations/menuAnimations";
import { useTranslation } from "react-i18next";

type NavLink = {
  key: string;
  label: string;
  path: string;
};

const navLinks: NavLink[] = [
  { key: "hero", label: "nav.hero", path: "#hero" },
  { key: "about", label: "nav.about", path: "#about" },
  { key: "skills", label: "nav.skills", path: "#skills" },
  { key: "projects", label: "nav.projects", path: "#projects" },
  { key: "experience", label: "nav.experience", path: "#experience" },
  { key: "contact", label: "nav.contact", path: "#contact" },
];

type NavLinksProps = {
  vertical?: boolean;
  onClick?: () => void;
};

export default function NavLinks({ vertical = false, onClick }: NavLinksProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          const mostVisible = visibleSections.reduce((prev, current) =>
            prev.intersectionRatio > current.intersectionRatio ? prev : current
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      { threshold: 0.2 }
    );

    navLinks.forEach((link) => {
      const sectionId = link.path.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        setActiveSection("contact");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const section = document.querySelector(path);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    onClick?.();
  };

  return (
    <ul
      className={`flex ${
        vertical ? "flex-col space-y-6 w-full text-center" : "space-x-8 items-center"
      } font-medium text-lg`}
    >
      {navLinks.map((link) => (
        <motion.li key={link.key} variants={itemVariants} className="w-full md:w-auto">
          <a
            href={link.path}
            onClick={(e) => smoothScroll(e, link.path)}
            className={`
              relative block cursor-pointer px-2 py-1
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white
              after:w-0 after:transition-[width] after:duration-300 after:ease-out
              hover:after:w-full
              md:inline-block md:w-auto
              touch-manipulation
              ${activeSection === link.key ? "text-white font-semibold after:w-full" : ""} 
            `}
          >
            {t(link.label)}
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
