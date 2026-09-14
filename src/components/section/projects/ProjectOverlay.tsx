import React from 'react';
import { Project, Media } from '@/components/section/projects/types';
import { useTranslation } from 'react-i18next';

type Props = {
  project: Project;
  showOverlay: boolean;
  onSelectMedia: (m: Media) => void;
  getConsultText?: () => string;
};

const ProjectOverlay: React.FC<Props> = ({
  project,
  showOverlay,
  onSelectMedia,
  getConsultText,
}) => {
  const { t } = useTranslation();

  const getConsult = () => {
    if (getConsultText) return getConsultText();
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
    <div
      className={`
        absolute
        inset-0
        z-10   /* <-- important pour passer au-dessus du média */
        flex
        items-center
        justify-center
        bg-black/40
        transition-opacity
        duration-300
        ${showOverlay ? 'opacity-100' : 'opacity-0 sm:group-hover:opacity-100'}
      `}
    >
      {project.category === 'Design' && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (project.medias && project.medias.length > 0) {
              onSelectMedia(project.medias[0]);
            }
          }}
          className="rounded-lg bg-white px-5 py-2 font-semibold text-black shadow-lg transition-all duration-200 hover:bg-yellow-400 active:scale-95"
        >
          {t('projects.view')}
        </button>
      )}

      {project.category === 'Développement Web' &&
        project.medias &&
        project.medias.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectMedia(project.medias![0]);
            }}
            className="rounded-lg bg-white px-5 py-2 font-semibold text-black shadow-lg transition-all duration-200 hover:bg-yellow-400 active:scale-95"
          >
            {t('projects.view')}
          </button>
        )}

      {project.category === 'desktop' && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (project.medias && project.medias.length > 0) {
              onSelectMedia(project.medias[0]);
            }
          }}
          className="rounded-lg bg-white px-5 py-2 font-semibold text-black shadow-lg transition-all duration-200 hover:bg-yellow-400 active:scale-95"
        >
          {t('projects.view')}
        </button>
      )}

      {project.category === 'Développement Web' &&
        (!project.medias || project.medias.length <= 1) &&
        project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg bg-white px-5 py-2 font-semibold text-black shadow-lg transition-all duration-200 hover:bg-yellow-400 active:scale-95"
          >
            {getConsult()}
          </a>
        )}
    </div>
  );
};

export default ProjectOverlay;
