import React, { useMemo } from 'react';
import Button from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';

import PortraitWithBadges from '@/components/section/hero/PortraitWithBadges';
import TypewriterName from '@/components/section/hero/TypewriterName';
import HeroSocials from '@/components/section/hero/HeroSocials';

import {
  HeroFadeIn,
  HeroCascadeItem,
} from '@/components/animations/heroAnimations';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const names = useMemo(() => [t('hero.name1'), t('hero.name2')], [t]);

  const roles = useMemo(
    () => [t('hero.role1'), t('hero.role2'), t('hero.role3')],
    [t]
  );

  return (
    <section
      id="hero"
      className="
        flex
        h-auto
        flex-col
        items-end
        justify-between
        bg-black
        px-8
        pb-16
        pt-35
        text-white
        md:flex-row
      "
    >
      {/* TEXTE */}
      <div
        className="
          w-full
          self-start
          space-y-4
          sm:space-y-9
          md:ml-16
          md:mt-6
          md:w-1/2
        "
      >
        {/* SALUTATION + NOM */}
        {/* SALUTATION + NOM */}
        <HeroFadeIn delay={0}>
          <h1
            className="
      mb-0
      sm:mb-6
      w-full
      text-[clamp(1.6rem,5vw,2.2rem)]
      sm:text-[clamp(1.2rem,3vw,1.8rem)]
      font-bold
      text-white
      text-center
      sm:text-left
      flex flex-col sm:flex-row sm:items-baseline sm:gap-4
    "
          >
            {/* Bonjour */}
            <span className="whitespace-nowrap">{t('hero.greeting')}</span>

            {/* Nom animé qui alterne entre name1 et name2 */}
            <span className="text-[#f3f009] mt-2 sm:mt-0">
              <TypewriterName names={[t('hero.name1'), t('hero.name2')]} />
            </span>
          </h1>
        </HeroFadeIn>

        {/* DESCRIPTION */}
        <HeroFadeIn delay={0.25}>
          <p
            className="
              mx-auto
              w-full
              max-w-[95%]
              translate-x-0
              text-justify
              text-base
              leading-relaxed
              tracking-normal
              text-gray-400
              hyphens-auto
              [overflow-wrap:break-word]
              sm:-translate-x-2
              sm:max-w-5xl
              sm:text-lg
              sm:leading-8
              md:-translate-x-15
              md:max-w-lg
              md:text-xl
              md:leading-relaxed
              md:tracking-wide
            "
          >
            {t('hero.description')}
          </p>
        </HeroFadeIn>

        {/* BOUTONS + RÉSEAUX */}
        <div
          className="
            flex
            flex-col
            space-y-4
            md:flex-row
            md:items-center
            md:space-x-4
            md:space-y-0
          "
        >
          <HeroCascadeItem delay={0.45}>
            <a href="#projects" className="block w-full md:w-auto">
              <Button
                text={t('hero.btnProjects')}
                variant="primary"
                className="w-full md:w-auto"
              />
            </a>
          </HeroCascadeItem>

          <HeroCascadeItem delay={0.6}>
            <a href="#contact" className="block w-full md:w-auto">
              <Button
                text={t('hero.btnCV')}
                variant="secondary"
                className="w-full md:w-auto"
              />
            </a>
          </HeroCascadeItem>

          <HeroSocials />
        </div>
      </div>

      {/* PORTRAIT + BADGES */}
      <HeroFadeIn delay={0.55} className="w-full md:w-auto">
        <PortraitWithBadges roles={roles} t={t} />
      </HeroFadeIn>
    </section>
  );
};

export default Hero;
