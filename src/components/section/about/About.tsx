import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Palette,
  BarChart3,
  Users,
  Rocket,
  Handshake,
  Target,
  Send
} from "lucide-react";
import { useTranslation } from "react-i18next";

/* Animations inchangées */
const leftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { staggerChildren: 0.15, duration: 0.7, ease: "easeOut" } }
};
const rightVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { staggerChildren: 0.15, duration: 0.7, ease: "easeOut" } }
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const titleVariants: Variants = {
  hidden: { opacity: 0, y: -15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const About = () => {
  const { t } = useTranslation();

  const values = [
    { icon: Palette, text: t("about.values.creativity"), color: "bg-purple-700" },
    { icon: BarChart3, text: t("about.values.impact"), color: "bg-indigo-700" },
    { icon: Users, text: t("about.values.engagement"), color: "bg-rose-700" },
    { icon: Rocket, text: t("about.values.innovation"), color: "bg-green-700" },
    { icon: Handshake, text: t("about.values.teamwork"), color: "bg-yellow-700" },
    { icon: Target, text: t("about.values.client"), color: "bg-cyan-700" }
  ];

  return (
    <section id="about" className="min-h-screen bg-gray-800 text-white px-8 pt-12 pb-16">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* TITRE animé */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="flex justify-center"
        >
          <h2 className="text-2xl sm:text-4xl font-bold px-6 py-2 rounded-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-x">
            {t("about.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT SIDE animé */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6 text-left"
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-white">
              {t("about.subtitle")}
            </motion.h3>

            <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed">
              {t("about.intro")}
            </motion.p>

            <motion.ul className="text-gray-300 list-disc list-inside space-y-2">
              <motion.li variants={itemVariants}>{t("about.point1")}</motion.li>
              <motion.li variants={itemVariants}>{t("about.point2")}</motion.li>
              <motion.li variants={itemVariants}>{t("about.point3")}</motion.li>
              <motion.li variants={itemVariants}>{t("about.point4")}</motion.li>
            </motion.ul>

            <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed">
              {t("about.goal")}
            </motion.p>

            <motion.div variants={itemVariants}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-800 text-white font-bold rounded-lg shadow-lg hover:bg-purple-900 hover:scale-105 transition"
              >
                <Send size={20} />
                {t("about.cta")}
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE animé */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6 md:pl-6"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-center">
              {t("about.valuesTitle")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`${item.color} flex flex-col items-center w-full text-center text-white px-6 py-8 rounded-lg shadow-md hover:scale-105 transition duration-300`}
                  >
                    <Icon size={32} />
                    <span className="font-bold mt-3">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
