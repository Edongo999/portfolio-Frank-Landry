import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  names: string[];
}

const TypewriterName: React.FC<Props> = ({ names }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!names.length) return;

    const currentName = names[index];

    const displayTime = Math.min(
      Math.max(6500 + currentName.length * 80, 7500),
      10000
    );

    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % names.length);
    }, displayTime);

    return () => clearTimeout(timeout);
  }, [index, names]);

  if (!names.length) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={names[index]}
        className="
          relative
          inline-block
          whitespace-nowrap
          text-[#f3f009]
          isolate
        "
        initial={{
          opacity: 0,
          x: 18,
          clipPath: 'inset(0 100% 0 0)',
        }}
        animate={{
          opacity: 1,
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
        }}
        exit={{
          opacity: 0,
          x: -12,
          clipPath: 'inset(0 100% 0 0)',
        }}
        transition={{
          duration: 1.05,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* TEXTE */}
        <span className="relative z-10">{names[index]}</span>

        {/* REFLET PREMIUM */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            overflow-hidden
          "
        >
          <motion.span
            className="
              absolute
              top-[-20%]
              bottom-[-20%]
              left-0
              w-[10%]
              skew-x-[-18deg]
              bg-gradient-to-r
              from-transparent
              via-white/90
              to-transparent
              opacity-0
            "
            initial={{
              x: '-180%',
            }}
            animate={{
              x: '1100%',
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.35,
              delay: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          {/* PETIT HALO DERRIÈRE LE REFLET */}
          <motion.span
            className="
              absolute
              top-0
              bottom-0
              left-0
              w-[24%]
              skew-x-[-18deg]
              bg-gradient-to-r
              from-transparent
              via-white/15
              to-transparent
              blur-[5px]
              opacity-0
            "
            initial={{
              x: '-180%',
            }}
            animate={{
              x: '500%',
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.35,
              delay: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </span>

        {/* SOULIGNEMENT */}
        <motion.span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-0
            -bottom-2
            h-[2px]
            rounded-full
            bg-[#f3f009]
          "
          initial={{
            width: 0,
            opacity: 0,
          }}
          animate={{
            width: '100%',
            opacity: 1,
          }}
          exit={{
            width: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.75,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* PETIT ÉCLAT SUR LA LIGNE */}
        <motion.span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-2
            left-0
            z-10
            h-[2px]
            w-[20%]
            rounded-full
            bg-white
            opacity-0
            blur-[1px]
          "
          initial={{
            x: '-100%',
          }}
          animate={{
            x: '500%',
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 1.1,
            delay: 0.45,
            ease: 'easeInOut',
          }}
        />
      </motion.span>
    </AnimatePresence>
  );
};

export default React.memo(TypewriterName);
