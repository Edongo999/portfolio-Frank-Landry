import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PageLoader() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.45,
        ease: 'easeOut',
      }}
      className="
        fixed
        left-0
        top-0
        z-[999999]
        flex
        h-screen
        w-screen
        items-center
        justify-center
        overflow-hidden
        bg-gray-950
      "
    >
      {/* Halo lumineux */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#f3f009]/10
          blur-3xl
        "
      />

      {/* Contenu central */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 10,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          flex
          flex-col
          items-center
          justify-center
        "
      >
        {/* Cercle */}
        <div
          className="
            relative
            flex
            h-24
            w-24
            items-center
            justify-center
          "
        >
          {/* Anneau extérieur */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="
              absolute
              inset-0
              rounded-full
              border-[3px]
              border-white/10
              border-t-[#f3f009]
            "
          />

          {/* Anneau intérieur */}
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="
              absolute
              inset-3
              rounded-full
              border-2
              border-white/5
              border-b-indigo-500
            "
          />

          {/* Halo de l'icône */}
          <motion.div
            animate={{
              scale: [0.8, 1.1, 0.8],
              opacity: [0.25, 0.7, 0.25],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              absolute
              h-12
              w-12
              rounded-full
              bg-[#f3f009]/10
              blur-md
            "
          />

          {/* Icône */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            <Loader2 size={28} strokeWidth={2} className="text-[#f3f009]" />
          </motion.div>
        </div>

        {/* Texte */}
        <motion.p
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: [0.55, 1, 0.55],
            y: 0,
          }}
          transition={{
            y: {
              duration: 0.5,
              ease: 'easeOut',
            },
            opacity: {
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className="
            mt-7
            text-center
            text-base
            font-medium
            tracking-wide
            text-white
          "
        >
          {t('pageLoader.message')}
        </motion.p>

        {/* Points */}
        <div
          className="
            mt-3
            flex
            items-center
            gap-1.5
          "
        >
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={{
                y: [0, -5, 0],
                opacity: [0.25, 1, 0.25],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.15,
                ease: 'easeInOut',
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#f3f009]
              "
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
