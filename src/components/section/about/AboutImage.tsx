import React from 'react';
import { motion } from 'framer-motion';

interface AboutImageProps {
  image: string;
}

const AboutImage: React.FC<AboutImageProps> = ({ image }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -50,
        scale: 0.94,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        flex
        w-full
        shrink-0
        justify-center
        md:w-[38%]
        md:justify-start
      "
    >
      <div
        className="
          relative
          h-80
          w-full
          max-w-xs
          sm:h-96
          sm:max-w-sm
          md:h-[420px]
          md:max-w-[360px]
        "
      >
        4{' '}
        {/* =================================================
            CADRE ARRIÈRE ROTATIF
        ================================================= */}
        <motion.div
          animate={{
            rotate: [-45, 315],
            borderColor: [
              '#60a5fa',
              '#3b82f6',
              '#a855f7',
              '#f3f009',
              '#60a5fa',
            ],
          }}
          transition={{
            rotate: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
            borderColor: {
              duration: 30,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className="
            absolute
            inset-0
            rounded-3xl
            border
            border-blue-400/40
            bg-blue-500/10
            shadow-[0_0_35px_rgba(59,130,246,0.10)]
          "
        />
        {/* =================================================
            HALO ARRIÈRE
        ================================================= */}
        <motion.div
          animate={{
            rotate: [-85, 275],
            opacity: [0.25, 0.4, 0.25],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="
            absolute
            inset-0
            rounded-3xl
            bg-blue-500/15
            blur-sm
          "
        />
        {/* =================================================
            CADRE PRINCIPAL
        ================================================= */}
        <div
          className="
            absolute
            inset-0
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/5
            shadow-2xl
            backdrop-blur-xl
          "
        >
          <motion.div
            initial={{
              scale: 0.7,
              opacity: 0,
              filter: 'blur(6px)',
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 3.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              inset-0
              overflow-hidden
              rounded-3xl
            "
          >
            <img
              src={image}
              alt="Portrait premium de Landry"
              className="
                h-full
                w-full
                object-cover
              "
            />
          </motion.div>

          {/* GLOW */}

          <div
            className="
              absolute
              bottom-0
              h-28
              w-full
              bg-gradient-to-t
              from-black/70
              via-black/20
              to-transparent
            "
          />

          {/* LABEL */}

          <div
            className="
              absolute
              bottom-4
              left-4
              rounded-full
              border
              border-white/10
              bg-black/40
              px-3
              py-1.5
              text-xs
              font-semibold
              tracking-wide
              text-white
              backdrop-blur-md
            "
          >
            Developer • Designer
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutImage;
