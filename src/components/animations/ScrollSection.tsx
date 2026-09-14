import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'normal' | 'strong';
}

export default function ScrollSection({
  children,
  className = '',
  intensity = 'normal',
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  /*
   * La section :
   * 0%   → arrive réduite
   * 20%  → commence à prendre toute la place
   * 50%  → plein écran
   * 80%  → commence à se rétracter
   * 100% → quitte l'écran
   */

  const minScale = intensity === 'strong' ? 0.82 : 0.9;

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [minScale, 0.97, 1, 0.97, minScale]
  );

  const scale = useSpring(rawScale, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
  });

  /*
   * Les coins sont légèrement arrondis lorsque
   * la section entre ou sort.
   */
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.82, 1],
    [32, 12, 0, 12, 32]
  );

  /*
   * Petit effet de profondeur.
   */
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.72, 1, 1, 0.72]
  );

  return (
    <section ref={sectionRef} className={`relative h-[140vh] ${className}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{
            scale,
            borderRadius,
            opacity,
          }}
          className="relative h-full w-full overflow-hidden transform-gpu"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
