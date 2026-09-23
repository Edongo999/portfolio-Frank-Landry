import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const BlogHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      {/* BADGE */}
      <span
        className="
          inline-flex items-center gap-2 rounded-full border
          border-[#f3f009]/20 bg-[#f3f009]/10 px-4 py-2
          text-xs font-semibold uppercase tracking-[0.2em]
          text-[#f3f009]
        "
      >
        <span
          className="
            h-2 w-2 rounded-full bg-[#f3f009]
            shadow-[0_0_8px_rgba(243,240,9,0.7)]
          "
        />
        {t("blog.badge")}
      </span>

      {/* TITRE */}
      <h2
        className="
          mt-5 text-3xl font-extrabold leading-tight tracking-tight
          sm:text-4xl md:text-5xl
        "
      >
        <span className="text-white">{t("blog.title.part1")} </span>
        <span className="text-[#f3f009]">{t("blog.title.part2")}</span>
      </h2>

      {/* LIGNE */}
      <div
        className="
          mx-auto mt-6 h-px w-24
          bg-gradient-to-r from-transparent via-[#f3f009] to-transparent
        "
      />

      {/* DESCRIPTION */}
      <p
        className="
          mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base
        "
      >
        {t("blog.description")}
      </p>
    </motion.div>
  );
};

export default BlogHeader;
