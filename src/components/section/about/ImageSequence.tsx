import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageSequenceProps {
  images: string[];
  interval?: number;
}

const ImageSequence: React.FC<ImageSequenceProps> = ({
  images,
  interval = 3000,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-80 h-96 mt-10">
      {/* =====================================================
          HALO ARRIÈRE
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-64
          w-64
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-[80px]
        "
      />

      {/* =====================================================
          CADRE BLEU INCLINÉ
      ===================================================== */}

      <motion.div
        animate={{
          rotate: [-4, -2, -4],
          x: [8, 10, 8],
          y: [8, 10, 8],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute
          inset-0
          rounded-3xl
          border
          border-blue-400/40
          bg-blue-500/[0.04]
          shadow-[0_0_35px_rgba(59,130,246,0.10)]
        "
      />

      {/* =====================================================
          CADRE JAUNE
      ===================================================== */}

      <motion.div
        animate={{
          rotate: [4, 2, 4],
          x: [-6, -4, -6],
          y: [-6, -4, -6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute
          inset-0
          rounded-3xl
          border
          border-[#f3f009]/20
          bg-[#f3f009]/[0.015]
        "
      />

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            scale: 1.01,
            filter: 'blur(3px)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            scale: 1.01,
            filter: 'blur(3px)',
          }}
          transition={{
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            inset-0
            z-10
            rounded-3xl
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            shadow-2xl
            overflow-hidden
          "
        >
          <img
            src={images[index]}
            alt={`Portrait ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* =====================================================
          GLOW BAS
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          z-20
          w-full
          h-24
          bg-gradient-to-t
          from-black/60
          to-transparent
        "
      />

      {/* =====================================================
          MINI LABEL
      ===================================================== */}

      <div
        className="
          absolute
          bottom-4
          left-4
          z-30
          text-white
          text-sm
          font-semibold
          bg-black/40
          px-3
          py-1
          rounded-full
          backdrop-blur-md
        "
      >
        Developer • Designer
      </div>

      {/* =====================================================
          PETIT ACCENT
      ===================================================== */}

      <div
        className="
          absolute
          right-4
          top-4
          z-30
          h-2
          w-2
          rounded-full
          bg-[#f3f009]
          shadow-[0_0_12px_rgba(243,240,9,0.7)]
        "
      />
    </div>
  );
};

export default ImageSequence;
