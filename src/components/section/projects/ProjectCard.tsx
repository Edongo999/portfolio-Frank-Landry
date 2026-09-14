// src/components/section/projects/ProjectCard.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Project as ProjectType,
  Media,
} from '@/components/section/projects/types';
import ProjectBadge from '@/components/section/projects/ProjectBadge';
import ProjectMedia from '@/components/section/projects/ProjectMedia';
import ProjectOverlay from '@/components/section/projects/ProjectOverlay';
import ProjectText from '@/components/section/projects/ProjectText';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

type Props = {
  project: ProjectType;
  onSelectMedia: (media: Media) => void;
  isVertical?: boolean;
  registerVideo?: (el: HTMLVideoElement | null) => void;
};

const ProjectCard: React.FC<Props> = ({
  project,
  onSelectMedia,
  isVertical = false,
  registerVideo,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isPaused || !project.medias || project.medias.length <= 1) return;
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % project.medias!.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, [isPaused, project.medias]);

  useEffect(() => {
    if (registerVideo) registerVideo(videoRef.current);
    return () => {
      if (registerVideo) registerVideo(null);
    };
  }, [registerVideo, currentIndex]);

  const getConsultText = () => {
    const translatedTitle = project.title.toLowerCase();
    if (
      translatedTitle.includes('application') ||
      translatedTitle.includes('app')
    ) {
      return "Consulter l'application";
    }
    return 'Consulter le site';
  };

  return (
    <motion.article
      data-card-id={project.cardId}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={`
        relative
        flex
        overflow-hidden
        rounded-xl
        bg-gray-800
        border border-gray-700
        shadow-xl shadow-black/30
        transition-all duration-300
        hover:border-green-500/40
        hover:shadow-2xl hover:shadow-black/40
        ${isVertical ? 'flex-col' : 'flex-col sm:flex-row'}
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <ProjectBadge category={project.category} />

      {/* MEDIA + OVERLAY ensemble */}
      <div
        className={`
          relative group w-full flex-shrink-0 overflow-hidden
          ${isVertical ? 'h-48 sm:h-56' : 'h-64 sm:h-72 sm:w-2/5'}
        `}
        onTouchStart={() => setShowOverlay(true)}
        onTouchEnd={() => setShowOverlay(false)}
      >
        <ProjectMedia
          project={project}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          videoRef={videoRef}
          isVertical={isVertical}
          setShowOverlay={setShowOverlay}
          registerVideo={registerVideo}
        />

        <ProjectOverlay
          project={project}
          showOverlay={showOverlay}
          onSelectMedia={onSelectMedia}
          getConsultText={getConsultText}
        />
      </div>

      <ProjectText project={project} isVertical={isVertical} />
    </motion.article>
  );
};

export default ProjectCard;
