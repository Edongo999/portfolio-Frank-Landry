// src/components/common/CustomCursor.tsx

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // =====================================================
  // POSITION DE LA SOURIS
  // =====================================================

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // =====================================================
  // MOUVEMENT FLUIDE DE L'ANNEAU
  // =====================================================

  const cursorX = useSpring(mouseX, {
    stiffness: 500,
    damping: 35,
    mass: 0.4,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 500,
    damping: 35,
    mass: 0.4,
  });

  // =====================================================
  // DÉTECTION DES APPAREILS AVEC SOURIS
  // =====================================================

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const updateDevice = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener('change', updateDevice);

    return () => {
      mediaQuery.removeEventListener('change', updateDevice);
    };
  }, []);

  // =====================================================
  // ÉVÉNEMENTS DU POINTEUR
  // =====================================================

  useEffect(() => {
    if (!isDesktop) return;

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      const target = event.target as HTMLElement | null;

      if (!target) {
        setIsHovering(false);
        return;
      }

      const interactiveElement = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]'
      );

      setIsHovering(Boolean(interactiveElement));
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button === 0) {
        setIsClicking(true);
      }
    };

    const handlePointerUp = () => {
      setIsClicking(false);
    };

    const handlePointerLeave = () => {
      setIsHovering(false);
      setIsClicking(false);
    };

    const handleWindowBlur = () => {
      setIsHovering(false);
      setIsClicking(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('blur', handleWindowBlur);

    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('blur', handleWindowBlur);

      document.documentElement.removeEventListener(
        'mouseleave',
        handlePointerLeave
      );
    };
  }, [isDesktop, mouseX, mouseY]);

  // =====================================================
  // PAS DE CURSEUR SUR MOBILE / TABLETTE
  // =====================================================

  if (!isDesktop) return null;

  return (
    <>
      {/* =================================================
          POINT CENTRAL
      ================================================= */}

      <motion.div
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[999999]
          h-2
          w-2
          rounded-full
          bg-[#f3f009]
          shadow-[0_0_12px_rgba(243,240,9,0.65)]
        "
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.65 : isHovering ? 0.8 : 1,
        }}
        transition={{
          duration: 0.15,
        }}
      />

      {/* =================================================
          ANNEAU EXTERNE
      ================================================= */}

      <motion.div
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[999998]
          flex
          items-center
          justify-center
          rounded-full
          border
          border-[#f3f009]/70
        "
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 46 : 30,
          height: isHovering ? 46 : 30,
          opacity: isClicking ? 0.45 : 0.8,
          borderWidth: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      />

      {/* =================================================
          HALO AU SURVOL
      ================================================= */}

      <motion.div
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[999997]
          rounded-full
          bg-[#f3f009]/5
          blur-md
        "
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 65 : 0,
          height: isHovering ? 65 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
        }}
      />
    </>
  );
}
