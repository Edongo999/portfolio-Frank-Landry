import React from 'react';
import { Layers3, Code2, Palette, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type ProjectFilter = 'Tous' | 'Développement Web' | 'Design' | 'desktop';

interface ProjectFiltersProps {
  filter: ProjectFilter;
  setFilter: React.Dispatch<React.SetStateAction<ProjectFilter>>;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filter,
  setFilter,
}) => {
  const { t } = useTranslation();

  const filters: {
    name: ProjectFilter;
    labelKey: string;
    icon: React.ElementType;
  }[] = [
    {
      name: 'Tous',
      labelKey: 'projects.categories.all',
      icon: Layers3,
    },
    {
      name: 'Développement Web',
      labelKey: 'projects.categories.web',
      icon: Code2,
    },
    {
      name: 'Design',
      labelKey: 'projects.categories.design',
      icon: Palette,
    },
    {
      name: 'desktop',
      labelKey: 'projects.categories.desktop',
      icon: Monitor, // nouvelle icône pour Desktop
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filters.map((item) => {
        const active = filter === item.name;
        const Icon = item.icon;

        return (
          <button
            key={item.name}
            type="button"
            onClick={() => setFilter(item.name)}
            aria-pressed={active}
            className={`
              group inline-flex items-center justify-center gap-2
              rounded-xl border px-4 py-2.5 text-xs font-semibold
              transition-all duration-300 ease-out active:scale-95
              sm:px-5 sm:py-3 sm:text-sm
              ${
                active
                  ? 'scale-[1.02] border-[#f3f009] bg-[#f3f009] text-black shadow-lg shadow-[#f3f009]/10'
                  : 'border-gray-700/80 bg-gray-800/80 text-gray-300 hover:-translate-y-0.5 hover:border-green-500/50 hover:bg-gray-800 hover:text-green-400'
              }
            `}
          >
            <Icon
              size={17}
              strokeWidth={2}
              className={`flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${
                active ? 'scale-105 text-black' : 'text-green-400'
              }`}
            />
            <span>{t(item.labelKey)}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ProjectFilters;
