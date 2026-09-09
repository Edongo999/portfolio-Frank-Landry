import React from 'react';
import { motion } from 'framer-motion';

interface PortraitImageProps {
  visible: boolean;
  alt: string;
}

const PortraitImage: React.FC<PortraitImageProps> = ({ visible, alt }) => {
  return (
    <>
      {/* =====================================================
          HALO — ARRIÈRE-PLAN
      ===================================================== */}
      <div
        className="
          absolute
          z-0
          -translate-x-7
          sm:translate-x-0
          md:translate-x-0
        "
      >
        <motion.div
          className="
            h-[395px]
            w-[395px]
            rounded-full
            border
            border-white/10
            max-md:h-[270px]
            max-md:w-[270px]
          "
          initial={{
            opacity: 0,
            scale: 0.85,
          }}
          animate={{
            opacity: visible ? 1 : 0,
            scale: visible ? [1, 1.025, 1] : 0.85,
            boxShadow: visible
              ? [
                  '0 0 20px rgba(243,240,9,0.04)',
                  '0 0 45px rgba(243,240,9,0.12)',
                  '0 0 20px rgba(243,240,9,0.04)',
                ]
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{
            opacity: {
              duration: 0.8,
            },
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            boxShadow: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      </div>

      {/* =====================================================
          CERCLE — ARRIÈRE-PLAN
      ===================================================== */}
      <div
        className="
          absolute
          z-0
          -translate-x-7
          sm:translate-x-0
          md:translate-x-0
        "
      >
        <motion.div
          className="
            h-[365px]
            w-[365px]
            rounded-full
            border-2
            border-white/20
            max-md:h-[245px]
            max-md:w-[245px]
          "
          initial={{
            opacity: 0,
            scale: 0.75,
            rotate: -20,
          }}
          animate={{
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0.75,
            rotate: visible ? 0 : -20,
          }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
          }}
        />
      </div>

      {/* =====================================================
          IMAGE — PREMIER PLAN
      ===================================================== */}
      <div
        className="
          absolute
          z-20
          -translate-x-7
          sm:translate-x-0
          md:translate-x-0
        "
      >
        <motion.img
          src="/images/landry.png"
          alt={alt}
          className="
            relative
            h-[350px]
            w-[350px]
            rounded-full
            border-4
            border-white
            object-cover
            shadow-[0_0_50px_rgba(255,255,255,0.08)]
            max-md:h-[230px]
            max-md:w-[230px]
          "
          initial={{
            opacity: 0,
            scale: 0.7,
            y: 20,
          }}
          animate={{
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0.7,
            y: visible ? 0 : 20,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </>
  );
};

export default PortraitImage;
