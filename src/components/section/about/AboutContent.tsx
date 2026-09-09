import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Download,
  CheckCircle2,
  Palette,
  Accessibility,
  BookOpen,
} from 'lucide-react';

import CVRequestModal from './CVRequestModal';

const container: Variants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const AboutContent: React.FC = () => {
  const { t } = useTranslation();

  const [showCVModal, setShowCVModal] = useState(false);

  const values = [
    {
      text: t('about.values.cleanCode'),
      icon: CheckCircle2,
    },
    {
      text: t('about.values.ux'),
      icon: Palette,
    },
    {
      text: t('about.values.accessibility'),
      icon: Accessibility,
    },
    {
      text: t('about.values.learning'),
      icon: BookOpen,
    },
  ];

  const handleMessage = () => {
    setShowCVModal(false);

    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 250);
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        className="
          w-full
          md:flex-1
          md:text-left
        "
      >
        {/* =================================================
            BADGE
        ================================================= */}

        <motion.span
          variants={item}
          className="
            mb-10 
            mt-15
            md:mt-0
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

          {t('about.badge')}
        </motion.span>

        {/* =================================================
            SOUS-TITRE
        ================================================= */}

        <motion.h3
          variants={item}
          className="
            mb-5
            mt-4
            flex
            items-center
            justify-center
            gap-3
            text-center
            text-2xl
            font-semibold
            sm:text-3xl
            md:justify-start
            md:text-left
          "
        >
          <span
            className="
              h-1
              w-10
              shrink-0
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-[#f3f009]
            "
          />

          <span>{t('about.who')}</span>
        </motion.h3>

        {/* =================================================
            DESCRIPTION
        ================================================= */}
        <motion.p
          variants={item}
          className="
    mx-auto
    w-full
    max-w-[95%]
    text-justify
    text-base
    leading-relaxed
    tracking-normal
    text-gray-300
    hyphens-auto
    [overflow-wrap:break-word]
    px-0
    mb-2
    sm:max-w-2xl
    sm:text-base
    sm:leading-7
    md:mx-0
    md:px-0
    md:max-w-lg
    md:text-base
    md:leading-7
  "
        >
          {t('about.description')}
        </motion.p>

        {/* =================================================
    VALEURS
================================================= */}

        <motion.div variants={item} className="mb-8">
          <h4
            className="
      mb-4
      text-center
      text-xl
      font-semibold
      md:text-left
    "
          >
            {t('about.valuesTitle')}
          </h4>

          <div
            className="
      grid
      grid-cols-2
      gap-3
      md:flex
      md:flex-wrap
      md:justify-start
    "
          >
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <span
                  key={index}
                  className="
            inline-flex
            min-h-[42px]
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-3
            py-2
            text-center
            text-sm
            font-medium
            text-gray-200
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-blue-400/30
            hover:bg-blue-500/10
            hover:text-white
          "
                >
                  <Icon size={15} className="shrink-0 text-blue-400" />

                  <span className="leading-tight">{value.text}</span>
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* =================================================
    BOUTON CV
================================================= */}

        <motion.button
          variants={item}
          type="button"
          onClick={() => setShowCVModal(true)}
          className="
    mx-auto
    flex
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-[#f3f009]
    px-6
    py-3
    font-semibold
    text-gray-950
    shadow-lg
    shadow-[#f3f009]/20
    transition-all
    duration-300
    hover:-translate-y-1
    hover:bg-[#e2df00]
    hover:shadow-[#f3f009]/30
    md:mx-0
  "
        >
          <Download size={18} />

          {t('about.downloadCV')}
        </motion.button>
      </motion.div>

      {/* =================================================
          MODAL DEMANDE DE CV
      ================================================= */}

      <CVRequestModal
        isOpen={showCVModal}
        onClose={() => setShowCVModal(false)}
        onMessage={handleMessage}
      />
    </>
  );
};

export default AboutContent;
