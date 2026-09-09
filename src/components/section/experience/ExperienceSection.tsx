import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { experiences, type Experience } from '@/components/data/experiences';

import ExperienceCard from '@/components/section/experience/ExperienceCard';
import TimelinePoint from '@/components/section/experience/TimelinePoint';
import TimelineConnection from '@/components/section/experience/TimelineConnection';

/* =========================================================
   ANIMATIONS
========================================================= */

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -45,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 45,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

/* =========================================================
   EXPERIENCE SECTION
========================================================= */

const ExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-gray-800
        to-gray-900
        py-20
        text-white
        sm:py-24
        md:py-10
      "
    >
      {/* =====================================================
          LUMIÈRE DÉCORATIVE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-20
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          bg-[#f3f009]/5
          blur-3xl
        "
      />

      {/* =====================================================
          CONTENEUR
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
            EN-TÊTE
        ===================================================== */}

        <div className="mb-12 text-center">
          {/* BADGE */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#f3f009]/20
                bg-[#f3f009]/10
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#f3f009]
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#f3f009]
                  shadow-[0_0_8px_rgba(243,240,9,0.7)]
                "
              />

              {t('experience.badge')}
            </span>
          </motion.div>

          {/* TITRE */}

          <motion.h2
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="
              mx-auto
              mt-4
              max-w-3xl
              text-3xl
              font-extrabold
              leading-tight
              tracking-tight
              sm:text-4xl
              md:text-5xl
            "
          >
            <span className="text-white">{t('experience.title.first')}</span>{' '}
            <span className="text-[#f3f009]">
              {t('experience.title.highlight')}
            </span>
          </motion.h2>

          {/* TRAIT */}

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
              duration: 1.2,
              ease: 'easeOut',
              delay: 0.2,
            }}
            className="
              mx-auto
              mt-6
              h-1
              w-24
              rounded-full
              bg-gradient-to-r
              from-[#f3f009]
              to-yellow-300
            "
          />

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            className="
              mx-auto
              mt-6
              max-w-[95%]
              text-justify
              text-base
              leading-relaxed
              text-gray-100
              hyphens-auto
              [overflow-wrap:break-word]

              sm:max-w-5xl
              sm:text-lg
              sm:leading-8

              md:max-w-6xl
              md:text-xl
              md:leading-9
            "
          >
            {t('experience.description')}
          </motion.p>
        </div>

        {/* =====================================================
            TIMELINE
        ===================================================== */}

        <div className="relative mx-auto max-w-6xl">
          {/* ===================================================
              LIGNE CENTRALE — DESKTOP UNIQUEMENT
          =================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-0
              hidden
              h-full
              w-px
              -translate-x-1/2
              overflow-hidden
              bg-gray-700
              md:block
            "
          >
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              whileInView={{
                height: '100%',
                opacity: 1,
              }}
              transition={{
                duration: 3.5,
                ease: smoothEase,
              }}
              viewport={{
                once: true,
                amount: 0.05,
              }}
              className="
                h-full
                w-full
                bg-gradient-to-b
                from-[#f3f009]
                via-[#f3f009]/70
                to-transparent
              "
            />
          </div>

          {/* ===================================================
              CARTES
          =================================================== */}

          <div
            className="
              relative
              z-10
              space-y-0
              md:space-y-16
            "
          >
            {experiences.map((exp: Experience, index: number) => {
              const isLeft = index % 2 === 0;

              return (
                <React.Fragment key={`${exp.titleKey}-${index}`}>
                  <div
                    className="
                      relative
                      grid
                      md:grid-cols-2
                      md:gap-16
                    "
                  >
                    <TimelinePoint index={index} />

                    {/* CARTE GAUCHE */}

                    {isLeft ? (
                      <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        transition={{
                          duration: 1.15,
                          delay: 0.15,
                          ease: smoothEase,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                          margin: '-80px',
                        }}
                        className="
                          relative
                          md:pr-8
                        "
                      >
                        <ExperienceCard exp={exp} />

                        <TimelineConnection side="left" />
                      </motion.div>
                    ) : (
                      <div className="hidden md:block" />
                    )}

                    {/* CARTE DROITE */}

                    {!isLeft ? (
                      <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        transition={{
                          duration: 1.15,
                          delay: 0.15,
                          ease: smoothEase,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                          margin: '-80px',
                        }}
                        className="
                          relative
                          md:pl-8
                        "
                      >
                        <ExperienceCard exp={exp} />

                        <TimelineConnection side="right" />
                      </motion.div>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>

                  {/* TRAIT MOBILE */}

                  {index < experiences.length - 1 && (
                    <motion.div
                      initial={{
                        scaleY: 0,
                        opacity: 0,
                      }}
                      whileInView={{
                        scaleY: 1,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: 0.25,
                        ease: smoothEase,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.8,
                      }}
                      className="
                        relative
                        mx-auto
                        block
                        h-8
                        w-px
                        origin-top
                        bg-[#f3f009]/70
                        md:hidden
                      "
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
