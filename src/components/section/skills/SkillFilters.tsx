import React from 'react';
import { Code2, Database, Wrench, Sparkles, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const categories = [
  {
    id: 'all',
    label: 'skills.filters.all',
    icon: Sparkles,
  },
  {
    id: 'frontend',
    label: 'skills.filters.frontend',
    icon: Code2,
  },
  {
    id: 'backend',
    label: 'skills.filters.backend',
    icon: Database,
  },
  {
    id: 'tools',
    label: 'skills.filters.tools',
    icon: Wrench,
  },
  {
    id: 'desktop',
    label: 'skills.filters.desktop',
    icon: Monitor, // nouvelle icône pour Desktop
  },
];

interface SkillFiltersProps {
  filter: string;
  setFilter: (value: string) => void;
}

export default function SkillFilters({ filter, setFilter }: SkillFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const Icon = category.icon;
        const active = filter === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => setFilter(category.id)}
            className={`
              flex
              items-center
              gap-2
              rounded-xl
              border
              px-4
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-300
              ${
                active
                  ? 'border-[#f3f009] bg-[#f3f009] text-black'
                  : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-blue-500 hover:text-white'
              }
            `}
          >
            <Icon size={16} />
            {t(category.label)}
          </button>
        );
      })}
    </div>
  );
}
