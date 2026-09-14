import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

type NavbarLogoProps = {
  lightSection: boolean;
  scrolled: boolean;
};

export default function NavbarLogo({
  lightSection,
  scrolled,
}: NavbarLogoProps) {
  const textColor = lightSection && scrolled ? 'text-slate-900' : 'text-white';

  const logoControls = useAnimation();
  const dotControls = useAnimation();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    let mounted = true;
    const play = async () => {
      if (!mounted) return;
      await logoControls.start({
        scale: [1, 1.02, 1],
        x: [0, -2, 0],
        transition: { duration: 1.1, ease: 'easeInOut' },
      });
      dotControls.start({
        scale: [1, 1.25, 1],
        boxShadow: [
          '0 0 0 rgba(0,0,0,0)',
          '0 8px 20px rgba(243,240,9,0.18)',
          '0 0 0 rgba(0,0,0,0)',
        ],
        transition: { duration: 1.1, ease: 'easeInOut' },
      });
    };

    play();
    const id = window.setInterval(play, 60_000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [logoControls, dotControls]);

  return (
    <div
      className={`
        relative
        flex items-center
        font-bold
        transition-colors duration-500
        ${textColor}
      `}
      style={{ minWidth: 120 }} // réserve l'espace du logo pour éviter push
    >
      {/* Glow en absolute pour ne pas impacter le layout */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.35, scale: 0.95 }}
        animate={{ opacity: 0.75, scale: 1.05 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute -inset-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Contenu du logo (réserve l'espace, animations via transform seulement) */}
      <motion.div
        animate={logoControls}
        className="relative z-10 flex items-center gap-1 flex-none"
      >
        <span className="inline-block text-xl sm:text-2xl md:text-3xl leading-none select-none">
          EDA
        </span>

        <motion.span
          aria-hidden
          animate={dotControls}
          whileHover={{ scale: 1.5 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="inline-block ml-[0.12rem] -translate-y-[1px] text-[#f3f009]"
        >
          <span className="inline-block align-middle text-[1.45rem] sm:text-[1.9rem] md:text-[2.2rem] leading-none">
            .
          </span>
        </motion.span>
      </motion.div>
    </div>
  );
}
