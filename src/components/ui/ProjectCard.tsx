import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export interface Media {
  type: 'video' | 'image';
  src: string;
}

export interface Project {
  title: string;
  description: string;
  results?: string;
  link?: string;
  medias?: Media[];
  category?: 'Développement Web' | 'Design' | 'desktop';
  cardId: string;
  tools?: string[];
}

type Props = {
  project: Project;
  onSelectMedia: (media: Media) => void;
  isVertical?: boolean;
  registerVideo?: (el: HTMLVideoElement | null) => void;
};

/* =========================
   ANIMATION CARTE
========================= */

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

/* =========================
   ANIMATION TEXTE
========================= */

const textContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const textItem: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const ProjectCard: React.FC<Props> = ({
  project,
  onSelectMedia,
  isVertical = false,
  registerVideo,
}) => {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* =========================
     DIAPORAMA AUTOMATIQUE
  ========================== */

  useEffect(() => {
    if (isPaused || !project.medias || project.medias.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % project.medias!.length);
    }, 6000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, project.medias]);

  /* =========================
     VIDEO
  ========================== */

  useEffect(() => {
    if (registerVideo) {
      registerVideo(videoRef.current);
    }

    return () => {
      if (registerVideo) {
        registerVideo(null);
      }
    };
  }, [registerVideo, currentIndex]);

  /* =========================
     MEDIA ACTUEL
  ========================== */

  const currentMedia =
    project.medias && project.medias.length > 0
      ? project.medias[Math.min(currentIndex, project.medias.length - 1)]
      : null;

  /* =========================
     COULEURS BADGES
  ========================== */

  const categoryColors: Record<string, string> = {
    'Développement Web': `
      bg-green-600
      text-white
      border border-green-300/60
      shadow-lg
      shadow-black/40
    `,

    Design: `
      bg-[#f3f009]
      text-black
      border border-yellow-200
      shadow-lg
      shadow-black/40
    `,
  };

  /* =========================
     CATEGORIE TRADUITE
  ========================== */

  const getCategoryLabel = () => {
    if (project.category === 'Développement Web') {
      return t('projects.categories.web');
    }

    if (project.category === 'Design') {
      return t('projects.categories.design');
    }

    return '';
  };

  /* =========================
     TEXTE BOUTON
  ========================== */

  const getConsultText = () => {
    const translatedTitle = t(project.title).toLowerCase();

    if (
      translatedTitle.includes('application') ||
      translatedTitle.includes('app')
    ) {
      return t('projects.consultApplication');
    }

    return t('projects.consultSite');
  };

  return (
    <motion.article
      data-card-id={project.cardId}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className={`
        relative
        flex
        overflow-hidden
        rounded-xl
        bg-gray-800
        border border-gray-700
        shadow-xl
        shadow-black/30
        transition-all
        duration-300
        hover:border-green-500/40
        hover:shadow-2xl
        hover:shadow-black/40

        ${isVertical ? 'flex-col' : 'flex-col sm:flex-row'}
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* =========================
          BADGE CATEGORIE
      ========================== */}

      {project.category && (
        <div
          className="
            absolute
            left-3
            top-3
            z-30
            sm:left-4
            sm:top-4
          "
        >
          <span
            className={`
              inline-flex
              items-center
              rounded-full
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              backdrop-blur-sm
              sm:text-xs
              ${categoryColors[project.category]}
            `}
          >
            {getCategoryLabel()}
          </span>
        </div>
      )}

      {/* =========================
          MEDIA
      ========================== */}

      <div
        className={`
          relative
          group
          w-full
          flex-shrink-0
          overflow-hidden

          ${isVertical ? 'h-48 sm:h-56' : 'h-64 sm:h-72 sm:w-2/5'}
        `}
        onTouchStart={() => setShowOverlay(true)}
        onTouchEnd={() => setShowOverlay(false)}
      >
        {currentMedia ? (
          currentMedia.type === 'video' ? (
            <video
              ref={videoRef}
              key={currentMedia.src}
              src={currentMedia.src}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-[1.03]
              "
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            />
          ) : (
            <img
              src={currentMedia.src}
              alt={t(project.title)}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-[1.03]
              "
            />
          )
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-gray-950
              px-4
              text-center
              text-sm
              text-gray-400
            "
          >
            {project.link ? t('projects.noPreview') : t('projects.noMedia')}
          </div>
        )}

        {/* =========================
            OVERLAY
        ========================== */}

        <div
          className={`
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/40
            transition-opacity
            duration-300

            ${
              showOverlay
                ? 'opacity-100'
                : 'opacity-0 sm:group-hover:opacity-100'
            }
          `}
        >
          {/* DESIGN */}

          {project.category === 'Design' && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                if (project.medias && project.medias.length > 0) {
                  onSelectMedia(project.medias[0]);
                }
              }}
              className="
                rounded-lg
                bg-white
                px-5
                py-2
                font-semibold
                text-black
                shadow-lg
                transition-all
                duration-200
                hover:bg-yellow-400
                active:scale-95
              "
            >
              {t('projects.view')}
            </button>
          )}

          {/* DEVELOPPEMENT WEB
              PLUSIEURS MEDIAS
          */}

          {project.category === 'Développement Web' &&
            project.medias &&
            project.medias.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  onSelectMedia(project.medias![0]);
                }}
                className="
                  rounded-lg
                  bg-white
                  px-5
                  py-2
                  font-semibold
                  text-black
                  shadow-lg
                  transition-all
                  duration-200
                  hover:bg-yellow-400
                  active:scale-95
                "
              >
                {t('projects.view')}
              </button>
            )}

          {/* DEVELOPPEMENT WEB
              UN SEUL MEDIA / PAS DE MEDIA
          */}

          {project.category === 'Développement Web' &&
            (!project.medias || project.medias.length <= 1) &&
            project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="
                  rounded-lg
                  bg-white
                  px-5
                  py-2
                  font-semibold
                  text-black
                  shadow-lg
                  transition-all
                  duration-200
                  hover:bg-yellow-400
                  active:scale-95
                "
              >
                {getConsultText()}
              </a>
            )}
        </div>
      </div>

      {/* =========================
          CONTENU DE LA CARTE
      ========================== */}

      <motion.div
        variants={textContainer}
        className={`
          flex
          flex-1
          flex-col
          bg-gray-800

          ${isVertical ? 'p-4 sm:p-5' : 'p-5 sm:w-3/5 sm:p-7'}
        `}
      >
        {/* TITRE */}

        <motion.h3
          variants={textItem}
          className="
            mb-2
            text-lg
            font-bold
            leading-tight
            text-green-500
            sm:text-xl
          "
        >
          {t(project.title)}
        </motion.h3>

        {/* DESCRIPTION */}

        <motion.p
          variants={textItem}
          lang="fr"
          className="
            text-sm
            leading-6
            text-gray-300
          "
        >
          {t(project.description)}
        </motion.p>

        {/* RESULTATS */}

        {project.results && (
          <motion.p
            variants={textItem}
            lang="fr"
            className="
              mt-3
              border-l-2
              border-green-500
              pl-3
              text-sm
              leading-6
              text-green-400
            "
          >
            <span className="font-semibold">{t('projects.results')} :</span>{' '}
            {t(project.results)}
          </motion.p>
        )}

        {/* =========================
            OUTILS
        ========================== */}

        {project.tools && project.tools.length > 0 && (
          <motion.div
            variants={textItem}
            className="
                mt-5
                flex
                flex-wrap
                gap-2
              "
          >
            {project.tools.map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className="
                    flex
                    items-center
                    gap-1.5
                    rounded-md
                    border
                    border-gray-600
                    bg-gray-700
                    px-2
                    py-1
                    text-[11px]
                    font-medium
                    text-gray-200
                    transition-colors
                    duration-200
                    hover:border-gray-500
                    hover:bg-gray-600
                  "
              >
                {tool === 'React.js' && (
                  <i className="devicon-react-original colored text-base" />
                )}

                {tool === 'Tailwind CSS' && (
                  <i className="devicon-tailwindcss-plain colored text-base" />
                )}

                {tool === 'Supabase' && (
                  <img
                    src="https://avatars.githubusercontent.com/u/54469796?s=200&v=4"
                    alt="Supabase"
                    className="h-4 w-4 rounded"
                  />
                )}

                {tool === 'Vercel' && (
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg"
                    alt="Vercel"
                    className="h-4 w-4"
                  />
                )}

                {tool === 'Framer Motion' && (
                  <img
                    src="https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png"
                    alt="Framer Motion"
                    className="
                        h-4
                        w-4
                        object-contain
                      "
                  />
                )}

                {tool === 'Java' && (
                  <i className="devicon-java-plain colored text-base" />
                )}

                {tool === 'NetBeans' && (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Apache_NetBeans_Logo.svg"
                    alt="NetBeans"
                    className="h-4 w-4"
                  />
                )}

                {tool === 'Photoshop' && (
                  <i className="devicon-photoshop-plain text-sky-400 text-base" />
                )}

                {tool === 'Illustrator' && (
                  <i className="devicon-illustrator-plain text-orange-400 text-base" />
                )}

                {tool === 'Adobe XD' && (
                  <i className="devicon-xd-plain text-pink-400 text-base" />
                )}

                {tool === 'Figma' && (
                  <i className="devicon-figma-plain colored text-base" />
                )}

                {tool === 'HTML' && (
                  <i className="devicon-html5-plain colored text-base" />
                )}

                {tool === 'CSS' && (
                  <i className="devicon-css3-plain colored text-base" />
                )}

                {tool === 'JavaScript' && (
                  <i className="devicon-javascript-plain colored text-base" />
                )}

                {tool === 'PHP' && (
                  <i className="devicon-php-plain colored text-base" />
                )}

                {tool === 'MySQL' && (
                  <i className="devicon-mysql-plain colored text-base" />
                )}

                <span>{tool}</span>
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.article>
  );
};

export default ProjectCard;
