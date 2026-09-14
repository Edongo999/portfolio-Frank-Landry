import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCard from '@/components/section/projects/ProjectCard';
import { Project } from '@/components/section/projects/types';

interface ProjectGridProps {
  projects: Project[];
  onSelectMedia: (project: Project, mediaSrc: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onSelectMedia,
}) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence mode="popLayout">
      {projects.length > 0 ? (
        <motion.div
          layout
          transition={{
            layout: {
              duration: 0.45,
              ease: 'easeInOut',
            },
          }}
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {projects.map((project, index) => (
            <motion.div
              layout
              key={project.cardId}
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.97,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectCard
                project={project}
                isVertical={true}
                onSelectMedia={(media) => {
                  onSelectMedia(project, media.src);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            rounded-xl
            border
            border-gray-700
            bg-gray-800
            p-10
            text-center
          "
        >
          <p className="text-gray-400">{t('projects.empty')}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectGrid;
