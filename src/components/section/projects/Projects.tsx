import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import MediaViewer from '@/components/section/projects/MediaViewer';
import ModalPortal from '@/components/section/projects/ModalPortal';

import ProjectFilters, { ProjectFilter } from './ProjectFilters';

import ProjectCounter from './ProjectCounter';
import ProjectGrid from './ProjectGrid';

import { useProjectsData } from './ProjectsData';
import { Project } from '@/components/section/projects/types';

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const projects = useProjectsData();

  /* =========================
     FILTRE
  ========================= */

  const [filter, setFilter] = useState<ProjectFilter>('Tous');

  /* =========================
     PROJET SÉLECTIONNÉ
  ========================= */

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  /* =========================
     PROJETS FILTRÉS
  ========================= */

  const filteredProjects =
    filter === 'Tous'
      ? projects
      : projects.filter((project) => project.category === filter);

  /* =========================
     OUVRIR PROJET
  ========================= */

  const openProject = (project: Project, startIndex = 0) => {
    setSelectedProject(project);
    setCurrentIndex(startIndex);
  };

  /* =========================
     FERMER MODAL
  ========================= */

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentIndex(0);
  };

  /* =========================
     SÉLECTION MEDIA
  ========================= */

  const handleSelectMedia = (project: Project, mediaSrc: string) => {
    if (!project.medias || project.medias.length === 0) {
      return;
    }

    const index = project.medias.findIndex((media) => media.src === mediaSrc);

    openProject(project, index >= 0 ? index : 0);
  };

  return (
    <section
      id="realisations"
      className="
        relative
        overflow-hidden
        bg-gray-900
        py-20
        text-white
        sm:py-24
        md:py-10
      "
    >
      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[350px]
            w-[350px]
            -translate-x-1/2
            rounded-full
            bg-green-500/5
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-[300px]
            w-[300px]
            rounded-full
            bg-[#f3f009]/5
            blur-[120px]
          "
        />
      </div>

      {/* =========================
          CONTAINER
      ========================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-12 text-center">
          {/* BADGE */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-green-500/20
                bg-green-500/10
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-green-400
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-green-500
                  shadow-[0_0_8px_rgba(74,222,128,0.7)]
                "
              />

              {t('projects.badge')}
            </span>
          </motion.div>

          {/* TITRE */}

          <motion.h2
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="
              mx-auto
              mt-4
              max-w-3xl
              text-3xl
              font-extrabold
              leading-tight
              tracking-tight
              sm:text-4xl
              md:text-5xl
            "
          >
            <span className="text-white">{t('projects.title')} </span>

            <span className="text-[#f3f009]">{t('projects.me')}</span>
          </motion.h2>

          {/* LIGNE */}

          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            whileInView={{
              opacity: 1,
              scaleX: 1,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
              delay: 0.2,
            }}
            className="
              mx-auto
              mt-6
              h-1
              w-24
              rounded-full
              bg-gradient-to-r
              from-green-500
              to-[#f3f009]
            "
          />

          {/* DESCRIPTION */}

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            className="
              mx-auto
              mt-6
              max-w-[95%]
              text-justify
              text-base
              leading-relaxed
              text-gray-100
              hyphens-auto
              [overflow-wrap:break-word]
              sm:max-w-5xl
              sm:text-lg
              sm:leading-8
              md:max-w-6xl
              md:text-xl
              md:leading-9
            "
          >
            {t('projects.description')}
          </motion.p>
        </div>

        {/* =========================
            FILTRES
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-10"
        >
          <ProjectFilters filter={filter} setFilter={setFilter} />
        </motion.div>

        {/* =========================
            COMPTEUR
        ========================= */}

        <ProjectCounter count={filteredProjects.length} />

        {/* =========================
            GRILLE
        ========================= */}

        <ProjectGrid
          projects={filteredProjects}
          onSelectMedia={handleSelectMedia}
        />
      </div>

      {/* =========================
          MODAL
      ========================= */}

      {selectedProject &&
        selectedProject.medias &&
        selectedProject.medias.length > 0 && (
          <ModalPortal onClose={closeModal}>
            <div
              className="
                relative
                z-10
                mx-auto
                w-full
                max-w-6xl
              "
            >
              <MediaViewer
                project={selectedProject}
                index={currentIndex}
                startMuted={true}
              />
            </div>
          </ModalPortal>
        )}
    </section>
  );
};

export default Projects;
