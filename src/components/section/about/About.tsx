import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import AboutImage from './AboutImage';
import AboutContent from './AboutContent';

interface AboutProps {
  image?: string;
}

const About: React.FC<AboutProps> = ({ image = '/images/landry1.png' }) => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-b
        from-gray-900
        via-gray-950
        to-gray-900
        pt-8
        pb-16
        text-white
        sm:pt-10
        sm:pb-20
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-120px]
            top-20
            h-72
            w-72
            rounded-full
            bg-blue-600/5
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            bottom-[-120px]
            right-[-80px]
            h-72
            w-72
            rounded-full
            bg-[#f3f009]/5
            blur-[100px]
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* =====================================================
            TITRE PRINCIPAL
        ===================================================== */}

        <motion.h2
          initial={{
            opacity: 0,
            y: -20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-25
            md:mb-15
            mx-auto
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
          {t('about.title')}{' '}
          <span className="text-[#f3f009]">{t('about.me')}</span>
        </motion.h2>

        {/* =====================================================
            CONTENU
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            items-center
            gap-12
            md:flex-row
            md:items-center
            md:gap-10
            lg:gap-14
          "
        >
          {/* IMAGE */}

          <AboutImage image={image} />

          {/* SEPARATEUR */}

          <motion.div
            initial={{
              opacity: 0,
              scaleY: 0,
            }}
            whileInView={{
              opacity: 1,
              scaleY: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              hidden
              h-72
              w-[2px]
              origin-center
              bg-gradient-to-b
              from-transparent
              via-blue-500/50
              to-[#f3f009]/40
              md:block
            "
          />

          {/* CONTENU TEXTE */}

          <AboutContent />
        </div>
      </div>
    </section>
  );
};

export default About;
