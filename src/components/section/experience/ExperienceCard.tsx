import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import type { Experience } from '@/components/data/experiences';

type ExperienceCardProps = {
  exp: Experience;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

const ExperienceCard = ({ exp }: ExperienceCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.article
      whileHover={{
        y: -5,
        transition: {
          duration: 0.35,
          ease: 'easeOut',
        },
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/5
        bg-gray-700/80
        p-5
        shadow-xl
        backdrop-blur-sm
        transition-all
        duration-500
        hover:border-[#f3f009]/30
        hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
        sm:p-6
      "
    >
      {/* BARRE SUPÉRIEURE */}

      <motion.div
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        whileInView={{
          scaleX: 1,
          opacity: 0.7,
        }}
        transition={{
          delay: 0.3,
          duration: 1.1,
          ease: smoothEase,
        }}
        viewport={{
          once: true,
        }}
        style={{
          transformOrigin: 'left',
        }}
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          bg-gradient-to-r
          from-[#f3f009]
          via-[#f3f009]/50
          to-transparent
        "
      />

      {/* EFFET LUMINEUX */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-32
          w-32
          rounded-full
          bg-[#f3f009]/5
          blur-2xl
          transition-all
          duration-700
          group-hover:bg-[#f3f009]/10
        "
      />

      <div className="relative">
        {/* EN-TÊTE */}

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 0.85,
            ease: smoothEase,
          }}
          viewport={{
            once: true,
          }}
          className="flex items-start gap-4"
        >
          {/* ICÔNE */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.45,
              duration: 0.8,
              ease: smoothEase,
            }}
            viewport={{
              once: true,
            }}
            whileHover={{
              rotate: 5,
              scale: 1.05,
              transition: {
                duration: 0.3,
              },
            }}
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#f3f009]
              text-black
              shadow-lg
              shadow-[#f3f009]/10
            "
          >
            <span className="text-lg">
              <exp.icon />
            </span>
          </motion.div>

          {/* TITRE + LIEU */}

          <div className="min-w-0 flex-1">
            <h3
              className="
                text-base
                font-bold
                leading-snug
                text-white
                sm:text-lg
              "
            >
              {t(exp.titleKey)}
            </h3>

            <p
              className="
                mt-1
                text-sm
                leading-relaxed
                text-gray-300
              "
            >
              {t(exp.placeKey)}
            </p>
          </div>
        </motion.div>

        {/* DATE */}

        <motion.div
          initial={{
            opacity: 0,
            y: 6,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.55,
            duration: 0.8,
            ease: smoothEase,
          }}
          viewport={{
            once: true,
          }}
          className="
            ml-0
            mt-4
            inline-flex
            rounded-full
            border
            border-[#f3f009]/20
            bg-black/20
            px-3
            py-1
            text-xs
            font-medium
            text-[#f3f009]
            sm:ml-[3.75rem]
          "
        >
          {t(exp.dateKey)}
        </motion.div>

        {/* DESCRIPTION */}

        <motion.p
          initial={{
            opacity: 0,
            y: 8,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.68,
            duration: 0.95,
            ease: smoothEase,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-4
            text-sm
            leading-7
            text-gray-200
          "
        >
          {t(exp.descKey)}
        </motion.p>

        {/* TECHNOLOGIES */}

        {exp.tech.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {exp.tech.map((tech: string, techIndex: number) => (
              <motion.span
                key={`${tech}-${techIndex}`}
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.85 + techIndex * 0.08,
                  duration: 0.7,
                  ease: smoothEase,
                }}
                viewport={{
                  once: true,
                }}
                className="
                    rounded-md
                    border
                    border-white/5
                    bg-gray-800/80
                    px-2.5
                    py-1
                    text-[11px]
                    font-medium
                    text-[#f3f009]
                  "
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ExperienceCard;
