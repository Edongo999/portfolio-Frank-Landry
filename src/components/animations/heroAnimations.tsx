import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/* =====================================================
   HERO FADE IN
===================================================== */

interface HeroFadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const HeroFadeIn = ({
  children,
  delay = 0,
  className = '',
}: HeroFadeInProps) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

/* =====================================================
   HERO CASCADE ITEM
===================================================== */

interface HeroCascadeItemProps {
  children: ReactNode;
  index?: number;
  delay?: number;
  className?: string;
}

export const HeroCascadeItem = ({
  children,
  index = 0,
  delay = 0,
  className = '',
}: HeroCascadeItemProps) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.9,
        delay: delay + index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
