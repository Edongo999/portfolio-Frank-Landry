import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

export interface Media {
  type: "video" | "image";
  src: string;
}

export interface Project {
  title: string;
  description: string;
  descriptionLong?: string;
  role: string;
  results: string;
  link?: string;
  medias: Media[];
  category?: "Entreprise" | "Client";
  tools?: string;
  impact?: string;
}

type Props = {
  project: Project;
  onSelectMedia: (media: Media) => void;
  isVertical?: boolean;
  registerVideo?: (el: HTMLVideoElement | null) => void;
};

// 🔹 Variants pour la carte entière
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

// 🔹 Variants pour le conteneur texte
const textContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } }
};

// 🔹 Variants pour chaque élément texte
const textItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const ProjectCard: React.FC<Props> = ({
  project,
  onSelectMedia,
  isVertical = false,
  registerVideo
}) => {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isPaused || project.medias.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % project.medias.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, project.medias.length]);

  useEffect(() => {
    if (registerVideo) registerVideo(videoRef.current);
    return () => {
      if (registerVideo) registerVideo(null);
    };
  }, [registerVideo, currentIndex]);

  const currentMedia = project.medias[currentIndex];
  const previewHeight = isVertical ? "h-50 md:h-61" : "h-72 sm:h-70 md:h-89";

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={`relative rounded-lg overflow-hidden bg-gray-900 border border-gray-900 shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.01] 
        ${isVertical ? "flex flex-col h-[23rem] sm:h-[29rem]" : "flex flex-col sm:flex-row items-stretch min-h-[22rem]"}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Badge catégorie */}
      {project.category && (
        <div className="absolute top-3 left-3 z-20">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
              project.category === "Entreprise"
                ? "bg-yellow-400 text-gray-900"
                : "bg-indigo-600 text-white"
            }`}
          >
            {t(`projects.categories.${project.category.toLowerCase()}`)}
          </span>
        </div>
      )}

      {/* Media preview */}
      <div
        className={`relative group w-full ${isVertical ? "" : "sm:w-2/5"} ${previewHeight} flex-shrink-0`}
        onTouchStart={() => setShowOverlay(true)}
        onTouchEnd={() => setShowOverlay(false)}
      >
        {currentMedia.type === "video" ? (
          <video
            ref={videoRef}
            src={currentMedia.src}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
          />
        ) : (
          <img
            src={currentMedia.src}
            alt={project.title}
            className={`w-full h-full ${isVertical ? "object-cover" : "object-contain bg-black"}`}
          />
        )}

        {/* Overlay bouton Voir */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center 
            ${showOverlay ? "opacity-100" : "opacity-0"} sm:opacity-0 sm:group-hover:opacity-100`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectMedia(currentMedia);
            }}
            className="px-5 py-1 rounded-lg font-semibold 
                      bg-white text-black 
                      transition-all duration-200
                      hover:bg-yellow-400 hover:text-white 
                      active:bg-purple-800 active:text-yellow-200"
          >
            {t("projects.view")}
          </button>
        </div>
      </div>

      {/* Texte */}
      <motion.div
        variants={textContainer}
        className={`flex flex-col justify-start flex-grow 
          ${isVertical 
            ? "p-3 space-y-1 sm:p-5 sm:space-y-3 md:p-7 md:space-y-5" 
            : "p-3 space-y-2 sm:p-6 sm:space-y-4 md:p-10 md:space-y-5 sm:w-3/5 sm:pl-10"}`
        }
      >
        <motion.h3
          variants={textItem}
          className={`font-bold text-yellow-300 
            ${isVertical ? "text-base md:text-lg mb-1 line-clamp-2" 
                          : "text-sm sm:text-lg mb-2 sm:line-clamp-3"}`
          }
        >
          {project.title}
        </motion.h3>

        <motion.p
          variants={textItem}
          className={`text-gray-300 
            ${isVertical ? "text-sm md:text-base mb-1 line-clamp-3" 
                          : "text-sm sm:text-base mb-2 sm:line-clamp-4"}`
          }
        >
          {project.description}
        </motion.p>

        <motion.div
          variants={textItem}
          className={`text-gray-400 
            ${isVertical 
              ? "text-xs md:text-sm space-y-1 mt-1" 
              : "text-sm sm:text-base space-y-2 sm:space-y-1 mt-2"}`
          }
        >
          {/* 👉 Cartes horizontales affichent tout */}
          {!isVertical && project.role && (
            <p><span className="text-yellow-300 font-bold">{t("projects.role")} :</span> {project.role}</p>
          )}
          {!isVertical && project.impact && (
            <p><span className="text-yellow-300 font-bold">{t("projects.impact")} :</span> {project.impact}</p>
          )}
          {!isVertical && project.results && (
            <p><span className="text-yellow-300 font-bold">{t("projects.results")} :</span> {project.results}</p>
          )}
          {!isVertical && project.tools && (
            <p><span className="text-yellow-300 font-bold">{t("projects.tools")} :</span> {project.tools}</p>
          )}

          {/* 👉 Cartes verticales affichent seulement Résultats et Outils */}
          {isVertical && project.results && (
            <p><span className="text-yellow-300 font-bold">{t("projects.results")} :</span> {project.results}</p>
          )}
          {isVertical && project.tools && (
            <p><span className="text-yellow-300 font-bold">{t("projects.tools")} :</span> {project.tools}</p>
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

export default ProjectCard;
