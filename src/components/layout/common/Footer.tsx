// src/components/layout/common/Footer/Footer.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2 } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <motion.footer
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        overflow-hidden
        border-t
        border-gray-800
        bg-gray-950
        text-gray-300
      "
    >
      {/* =====================================================
          LUMIÈRE DÉCORATIVE
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        animate={{
          opacity: [0.35, 0.6, 0.35],
          scale: [1, 1.08, 1],
        }}
        transition={{
          opacity: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-32
          w-80
          -translate-x-1/2
          rounded-full
          bg-[#f3f009]/5
          blur-[90px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =====================================================
            CONTENU PRINCIPAL
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
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
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            flex-col
            items-center
            gap-6
            py-7
            md:flex-row
            md:justify-between
            md:gap-8
          "
        >
          {/* =================================================
              IDENTITÉ
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center"
          >
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 3,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-[#f3f009]/20
                bg-[#f3f009]/10
                text-[#f3f009]
              "
            >
              <Code2 size={18} strokeWidth={2} />
            </motion.div>

            <div className="ml-3">
              <p className="text-sm font-bold tracking-wide text-white">
                {t('footer.company')}
              </p>

              <p className="mt-0.5 text-[11px] text-gray-500">
                {t('footer.tagline')}
              </p>
            </div>
          </motion.div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <motion.nav
            initial={{
              opacity: 0,
              x: 25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-6
              gap-y-2
              text-xs
              font-medium
              md:justify-end
              md:text-sm
            "
          >
            <a
              href="#hero"
              className="
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:text-[#f3f009]
              "
            >
              {t('footer.nav.home')}
            </a>

            <a
              href="#about"
              className="
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:text-[#f3f009]
              "
            >
              {t('footer.nav.about')}
            </a>

            <a
              href="#projects"
              className="
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:text-[#f3f009]
              "
            >
              {t('footer.nav.projects')}
            </a>

            <a
              href="#experience"
              className="
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:text-[#f3f009]
              "
            >
              {t('footer.nav.experiences')}
            </a>

            <a
              href="#contact"
              className="
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:text-[#f3f009]
              "
            >
              {t('footer.nav.contact')}
            </a>
          </motion.nav>
        </motion.div>

        {/* =====================================================
            SÉPARATION
        ===================================================== */}

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
          }}
          transition={{
            duration: 0.7,
            delay: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            h-px
            w-full
            origin-center
            bg-gray-800
          "
        />

        {/* =====================================================
            COPYRIGHT
        ===================================================== */}

        <motion.div
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
          }}
          transition={{
            duration: 0.6,
            delay: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-2
            py-4
            text-center
            sm:flex-row
            sm:text-left
          "
        >
          <p className="text-[11px] text-gray-600 sm:text-xs">
            © {new Date().getFullYear()}{' '}
            <span className="font-medium text-gray-400">
              {t('footer.company')}
            </span>
            . {t('footer.rights')}
          </p>

          <p className="text-[11px] text-gray-600 sm:text-xs">
            {t('footer.madeWith')}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
