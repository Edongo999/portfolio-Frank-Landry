import React, { useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Media, Project } from '@/components/section/projects/types'; // optional: create a small types file or duplicate interfaces
import { useTranslation } from 'react-i18next';

type Props = {
  project: Project;
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isVertical?: boolean;
  setShowOverlay?: (v: boolean) => void;
  registerVideo?: (el: HTMLVideoElement | null) => void;
};

const ProjectMedia: React.FC<Props> = ({
  project,
  currentIndex,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCurrentIndex,
  videoRef,
  isVertical = false,
  setShowOverlay,
  registerVideo,
}) => {
  const { t } = useTranslation();

  const currentMedia =
    project.medias && project.medias.length > 0
      ? project.medias[Math.min(currentIndex, project.medias.length - 1)]
      : null;

  useEffect(() => {
    if (registerVideo) {
      registerVideo(videoRef.current);
    }
    return () => {
      if (registerVideo) registerVideo(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerVideo, currentIndex]);

  return (
    <div
      className={`
        relative
        group
        w-full
        flex-shrink-0
        overflow-hidden
        ${isVertical ? 'h-48 sm:h-56' : 'h-64 sm:h-72 sm:w-2/5'}
      `}
      onTouchStart={() => setShowOverlay && setShowOverlay(true)}
      onTouchEnd={() => setShowOverlay && setShowOverlay(false)}
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
    </div>
  );
};

export default ProjectMedia;
