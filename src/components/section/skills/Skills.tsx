import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Megaphone, PenTool, BarChart3, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: isMobile ? 0.5 : 0.25,
      delayChildren: isMobile ? 0.3 : 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: isMobile ? 60 : 40, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: isMobile ? 1 : 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const Skills = () => {
  const { t } = useTranslation();
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);

  const skills = [
    {
      icon: Megaphone,
      title: t("skills.marketing.title"),
      items: [
        t("skills.marketing.item1"),
        t("skills.marketing.item2"),
        t("skills.marketing.item3"),
      ],
    },
    {
      icon: PenTool,
      title: t("skills.content.title"),
      items: [
        t("skills.content.item1"),
        t("skills.content.item2"),
        t("skills.content.item3"),
      ],
    },
    {
      icon: BarChart3,
      title: t("skills.analysis.title"),
      items: [
        t("skills.analysis.item1"),
        t("skills.analysis.item2"),
        t("skills.analysis.item3"),
      ],
    },
    {
      icon: Wrench,
      title: t("skills.other.title"),
      items: [
        t("skills.other.item1"),
        t("skills.other.item2"),
        t("skills.other.item3"),
        t("skills.other.item4"),
        t("skills.other.item5"),
      ],
    },
  ];

  const cardClassBase =
    "group rounded-lg p-8 min-h-[300px] space-y-5 text-center bg-white/10 backdrop-blur-md border border-white/10 shadow-md transition duration-300";
  const cardHoverClasses =
    "cursor-pointer hover:scale-[1.03] hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-indigo-500/30";

  return (
    <section id="skills" className="min-h-screen bg-gray-900 text-white px-6 sm:px-8 pt-12 pb-16">
      <div className="w-full max-w-6xl mx-auto space-y-10">
        {/* TITLE */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="flex justify-center"
        >
          <h2 className="text-2xl sm:text-4xl font-bold px-6 py-2 rounded-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-x">
            {t("skills.title")}
          </h2>
        </motion.div>

        {/* INTRO */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-gray-100 text-lg md:text-xl leading-relaxed text-left md:text-justify"
        >
          {t("skills.intro")}
        </motion.p>

        {/* CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {skills.map((block, idx) => {
            const Icon = block.icon;
            const itemsToShow =
              block.title === t("skills.other.title") && !showMore
                ? block.items.slice(0, 3)
                : block.items;

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`${cardClassBase} ${cardHoverClasses} ${
                  touchedIndex === idx
                    ? "scale-[1.03] bg-gradient-to-br from-purple-500/30 to-indigo-500/30"
                    : ""
                }`}
                onTouchStart={() =>
                  setTouchedIndex((prev) => (prev === idx ? null : idx))
                }
              >
                <Icon size={36} className="mx-auto text-purple-300" />
                <h3 className="text-lg font-semibold text-purple-300">{block.title}</h3>
                <ul className="list-disc list-inside text-gray-200 space-y-2 text-left">
                  {itemsToShow.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                {block.title === t("skills.other.title") && (
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="mt-4 px-4 py-2 rounded-lg bg-purple-500/40 text-white font-semibold hover:bg-purple-600 transition"
                  >
                    {showMore ? t("skills.showLess") : t("skills.showMore")}
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
