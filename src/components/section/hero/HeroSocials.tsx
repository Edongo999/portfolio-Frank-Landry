import React, { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { HeroCascadeItem } from '@/components/animations/heroAnimations';

const HeroSocials: React.FC = () => {
  const { t } = useTranslation();

  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  return (
    <div
      className="
        flex
        items-center
        justify-center
        md:mt-0
        mt-3
        space-x-6
        md:justify-start
      "
    >
      {/* LinkedIn */}
      <HeroCascadeItem delay={0.75}>
        <div
          className="group relative flex justify-center"
          onTouchStart={() => setShowTooltip('linkedin')}
          onTouchEnd={() => setShowTooltip(null)}
          onFocus={() => setShowTooltip('linkedin')}
          onBlur={() => setShowTooltip(null)}
        >
          <a
            href="https://www.linkedin.com/in/photographe-exemple"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('hero.linkedinTooltip')}
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              border-2
              border-[#f3f009]
              bg-[#f3f009]
              text-black
              shadow-[0_0_12px_rgba(243,240,9,0.25)]
              transition-all
              duration-300
              hover:bg-black
              hover:text-[#f3f009]
              hover:shadow-[0_0_20px_rgba(243,240,9,0.4)]
              focus:outline-none
              focus:ring-2
              focus:ring-[#f3f009]
            "
          >
            <Linkedin className="h-6 w-6 stroke-[2.5]" />
          </a>

          <span
            className={`
              absolute
              left-1/2
              top-full
              z-50
              mt-2
              -translate-x-1/2
              whitespace-nowrap
              rounded-md
              bg-black
              px-3
              py-1
              text-xs
              font-medium
              text-white
              transition-all
              duration-300
              md:text-sm
              ${
                showTooltip === 'linkedin'
                  ? 'block opacity-100'
                  : 'hidden opacity-0 md:block md:group-hover:opacity-100'
              }
            `}
          >
            {t('hero.linkedinTooltip')}
          </span>
        </div>
      </HeroCascadeItem>

      {/* GitHub */}
      <HeroCascadeItem delay={0.9}>
        <div
          className="group relative flex justify-center"
          onTouchStart={() => setShowTooltip('github')}
          onTouchEnd={() => setShowTooltip(null)}
          onFocus={() => setShowTooltip('github')}
          onBlur={() => setShowTooltip(null)}
        >
          <a
            href="https://github.com/Edongo999"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('hero.githubTooltip')}
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              border-2
              border-[#f3f009]
              bg-[#f3f009]
              text-black
              shadow-[0_0_12px_rgba(243,240,9,0.25)]
              transition-all
              duration-300
              hover:bg-black
              hover:text-[#f3f009]
              hover:shadow-[0_0_20px_rgba(243,240,9,0.4)]
              focus:outline-none
              focus:ring-2
              focus:ring-[#f3f009]
            "
          >
            <Github className="h-6 w-6 stroke-[2.5]" />
          </a>

          <span
            className={`
              absolute
              left-1/2
              top-full
              z-50
              mt-2
              -translate-x-1/2
              whitespace-nowrap
              rounded-md
              bg-black
              px-3
              py-1
              text-xs
              font-medium
              text-white
              transition-all
              duration-300
              md:text-sm
              ${
                showTooltip === 'github'
                  ? 'block opacity-100'
                  : 'hidden opacity-0 md:block md:group-hover:opacity-100'
              }
            `}
          >
            {t('hero.githubTooltip')}
          </span>
        </div>
      </HeroCascadeItem>
    </div>
  );
};

export default HeroSocials;
