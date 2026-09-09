import React from 'react';
import { motion } from 'framer-motion';

interface HeroParticlesProps {
  particles: {
    x: number;
    y: number;
  }[];
  visible: boolean;
}

const HeroParticles: React.FC<HeroParticlesProps> = ({
  particles,
  visible,
}) => {
  if (!visible) return null;

  return (
    <div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-15
        h-0
        w-0
        overflow-visible
      "
    >
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="
            absolute
            left-1/2
            top-1/2
            h-[5px]
            w-[5px]
            rounded-full
            bg-white
            shadow-[0_0_7px_rgba(255,255,255,0.85),0_0_14px_rgba(243,240,9,0.3)]

            max-md:h-[10px]
            max-md:w-[10px]
            max-md:shadow-[0_0_6px_rgba(255,255,255,0.8),0_0_12px_rgba(243,240,9,0.25)]
          "
          initial={{
            opacity: 0,
            x: 0,
            y: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.9, 0.6, 0],
            x: particle.x,
            y: particle.y,
            scale: [0, 1, 0.85, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: index * 0.35,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default HeroParticles;
