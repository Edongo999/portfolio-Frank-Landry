import React, { useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import ModalPortal from "@/components/section/projects/ModalPortal";

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  tools: string[];
  certificate?: string; // optionnel
}

const Experiences: React.FC = () => {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const barColor = useTransform(progress, (p: number) =>
    `linear-gradient(to bottom, 
      rgba(99,102,241,${1 - p}), 
      rgba(168,85,247,${0.6 + p * 0.4}), 
      rgba(236,72,153,${p}))`
  );

  // 🔹 Récupération des expériences depuis i18n
  const experiences = (t("experience.items", { returnObjects: true }) as unknown) as Record<string, Experience>;

  // 🔹 État pour le modal
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const isPdf = (url: string) => /\.pdf(\?.*)?$/i.test(url);

  return (
    <section id="experiences" className="min-h-screen bg-gray-900 text-white px-6 sm:px-8 pt-12 pb-16">
      <div className="w-full max-w-5xl mx-auto space-y-12">
        
        {/* 🔹 Titre principal animé */}
        <div className="flex justify-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl font-bold inline-block px-6 py-2 rounded-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400"
          >
            {t("experience.title")}
          </motion.h2>
        </div>

        {/* 🔹 Timeline */}
        <div className="relative ml-6 space-y-12">
          <motion.div
            className="absolute left-0 top-0 h-full w-1 origin-top shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            style={{ background: barColor }}
          />

          {Object.values(experiences).map((exp, idx) => (
            <motion.div
              key={idx}
              className="relative pl-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.3 }}
              viewport={{ once: true, amount: 0.6 }}
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.3 }}
                viewport={{ once: true, amount: 0.6 }}
                className="absolute left-[-14px] top-2 w-6 h-6 bg-indigo-500 rounded-full border-4 border-gray-900 shadow-[0_0_10px_rgba(99,102,241,0.6)]"
              ></motion.span>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6 hover:scale-[1.01] transition-transform">
                <h3 className="text-xl font-semibold text-indigo-300">{exp.role}</h3>
                <p className="text-gray-400 text-sm italic">
                  {exp.company} • {exp.location} • {exp.period}
                </p>
                
                <ul className="list-disc list-inside text-gray-200 mt-3 space-y-1">
                  {exp.description.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tools.map((tool, i) => (
                    <span 
                      key={i} 
                      className="bg-indigo-600/20 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-500/30"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* 🔹 Bouton Voir le certificat uniquement si exp.certificate existe */}
                {exp.certificate && (
                  <div className="mt-4">
                    <button
                      onClick={() => setSelectedCertificate(exp.certificate!)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      aria-label={t("experience.viewCertificate")}
                    >
                      {t("experience.viewCertificate")}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🔹 Modal certificat */}
      {selectedCertificate && (
        <ModalPortal onClose={() => setSelectedCertificate(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="w-full max-w-[1000px]"
          >
            <div className="w-full bg-black/80 rounded-md p-4">
              {isPdf(selectedCertificate) ? (
                <div className="w-full h-[70vh]">
                  <object
                    data={selectedCertificate}
                    type="application/pdf"
                    className="w-full h-full"
                  >
                    <iframe
                      src={selectedCertificate}
                      title={t("experience.certificateAlt")}
                      className="w-full h-full"
                    />
                  </object>
                </div>
              ) : (
                <img
                  src={selectedCertificate}
                  alt={t("experience.certificateAlt")}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-md"
                />
              )}
            </div>
          </motion.div>
        </ModalPortal>
      )}
    </section>
  );
};

export default Experiences;
