import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  category?: 'Développement Web' | 'Design' | 'desktop';
};

const ProjectBadge: React.FC<Props> = ({ category }) => {
  const { t } = useTranslation();

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
    desktop: `
      bg-blue-600
      text-white
      border border-blue-300/40
      shadow-lg
      shadow-black/30
    `,
  };

  const getCategoryLabel = () => {
    if (category === 'Développement Web') return t('projects.categories.web');
    if (category === 'Design') return t('projects.categories.design');
    if (category === 'desktop')
      return t('projects.categories.desktop') || 'Desktop';
    return '';
  };

  if (!category) return null;

  return (
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
          ${categoryColors[category]}
        `}
      >
        {getCategoryLabel()}
      </span>
    </div>
  );
};

export default ProjectBadge;
