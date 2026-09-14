import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { skills } from './skillsData';
import SkillCard from './SkillCard';
import SkillFilters from './SkillFilters';
import CascadeItem from './CascadeItem';
import { motion } from 'framer-motion';

const SkillsSection = () => {
  const [filter, setFilter] = useState('all');
  const { t } = useTranslation();

  const filteredSkills =
    filter === 'all'
      ? skills
      : skills.filter((skill) => skill.category === filter);

  return (
    <section
      id="skills"
      className="
        relative
        overflow-hidden
        bg-gray-850
        md:py-10
        py-10
        text-white
        sm:py-24
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

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
            bg-blue-600/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            h-[250px]
            w-[250px]
            rounded-full
            bg-[#f3f009]/5
            blur-[100px]
          "
        />
      </div>

      {/* =====================================================
          CONTAINER
      ===================================================== */}

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
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-12 text-center">
          {/* BADGE */}

          <CascadeItem direction="left">
            <span
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-blue-400
              "
            >
              <span className="h-2 w-2 rounded-full bg-blue-400" />

              {t('skills.badge')}
            </span>
          </CascadeItem>

          {/* TITRE */}

          <CascadeItem direction="right">
            <h2
              className="
                mx-auto
                mt-4
                max-w-3xl
                text-center
                text-3xl
                font-extrabold
                leading-tight
                tracking-tight
                sm:text-4xl
                md:text-5xl
              "
            >
              <span className="text-white">{t('skills.title')} </span>

              <span className="text-[#f3f009]">{t('skills.me')}</span>
            </h2>
          </CascadeItem>

          {/* DESCRIPTION */}

          <CascadeItem direction="bottom">
            <p
              className="
                mx-auto
                mt-6
                max-w-[95%]
                text-justify
                text-base
                leading-relaxed
                text-gray-100
                hyphens-auto
                break-normal
                [overflow-wrap:break-word]
                sm:max-w-5xl
                sm:text-lg
                sm:leading-8
                md:max-w-6xl
                md:text-xl
                md:leading-9
              "
            >
              {t('skills.description')}
            </p>
          </CascadeItem>

          {/* LIGNE */}

          <CascadeItem direction="bottom">
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
                duration: 1.4,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.15,
              }}
              className="
                mx-auto
                mt-7
                h-1
                w-28
                origin-center
                rounded-full
                bg-gradient-to-r
                from-blue-500
                to-[#f3f009]
              "
            />
          </CascadeItem>
        </div>

        {/* =====================================================
            FILTRES
        ===================================================== */}

        <CascadeItem direction="right">
          <div className="mb-10">
            <SkillFilters filter={filter} setFilter={setFilter} />
          </div>
        </CascadeItem>

        {/* =====================================================
            COMPTEUR
        ===================================================== */}

        <CascadeItem direction="bottom">
          <div className="mb-7 flex items-center">
            {/* COMPTEUR */}

            <div
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-xl
                border
                border-gray-700/70
                bg-gray-900/70
                px-4
                py-2.5
                shadow-sm
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-blue-500/40
                hover:bg-gray-900
              "
            >
              {/* CHIFFRE */}

              <span
                className="
                  flex
                  h-8
                  min-w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-500/10
                  px-2
                  text-sm
                  font-bold
                  text-blue-400
                  ring-1
                  ring-blue-500/20
                "
              >
                {filteredSkills.length}
              </span>

              {/* TEXTE */}

              <span
                className="
                  text-sm
                  font-medium
                  tracking-wide
                  text-gray-400
                  transition-colors
                  duration-300
                  group-hover:text-gray-300
                "
              >
                {t('skills.count')}
              </span>
            </div>

            {/* LIGNE DE SÉPARATION */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.5,
                ease: 'easeOut',
                times: [0, 0.3, 0.6, 1], // étapes du remplissage
              }}
              className="ml-4 h-px flex-1 bg-gray-700 origin-left"
            />
          </div>
        </CascadeItem>

        {/* =====================================================
            CARTES
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {filteredSkills.map((skill, index) => {
            const direction =
              index % 3 === 0 ? 'left' : index % 3 === 1 ? 'right' : 'bottom';

            return (
              <CascadeItem key={skill.name} direction={direction}>
                <SkillCard skill={skill} index={index} />
              </CascadeItem>
            );
          })}
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <CascadeItem direction="bottom">
          <div
            className="
              mx-auto
              mt-14
              max-w-3xl
              text-center
            "
          >
            <p
              className="
                text-sm
                leading-6
                text-gray-400
                sm:text-base
              "
            >
              {t('skills.footer')}
            </p>
          </div>
        </CascadeItem>
      </div>
    </section>
  );
};

export default SkillsSection;
