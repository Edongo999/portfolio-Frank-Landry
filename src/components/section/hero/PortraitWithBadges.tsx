import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

import type { TFunction } from 'i18next';

import HeroParticles from './HeroParticles';
import PortraitImage from './PortraitImage';
import RoleBadge from './RoleBadge';

interface PortraitWithBadgesProps {
  roles: string[];
  t: TFunction;
}

const PortraitWithBadges: React.FC<PortraitWithBadgesProps> = ({ t }) => {
  const [step, setStep] = useState(0);
  const [activeBadge, setActiveBadge] = useState(0);

  const [roleIndex2, setRoleIndex2] = useState(0);
  const [roleIndex3, setRoleIndex3] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // ----------------------------------------------------------
  // MOBILE : déclenchement lorsque le portrait entre dans
  // l'écran
  // ----------------------------------------------------------

  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.25,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const checkMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    checkMobile();

    mediaQuery.addEventListener('change', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', checkMobile);
    };
  }, []);

  const shouldAnimate = isMobile ? isInView : true;

  // ----------------------------------------------------------
  // APPARITION
  // ----------------------------------------------------------

  useEffect(() => {
    if (!shouldAnimate) return;

    const timers = [
      setTimeout(() => setStep(1), 100),
      setTimeout(() => setStep(2), 500),
      setTimeout(() => setStep(3), 900),
      setTimeout(() => setStep(4), 1300),
    ];

    return () => timers.forEach(clearTimeout);
  }, [shouldAnimate]);

  // ----------------------------------------------------------
  // RÔLES DU BADGE 2
  //
  // UNIQUEMENT :
  // role2 ↔ role4
  // ----------------------------------------------------------

  const badge2Roles = useMemo(() => [t('hero.role2'), t('hero.role4')], [t]);

  // ----------------------------------------------------------
  // RÔLES DU BADGE 3
  //
  // UNIQUEMENT :
  // role3 ↔ role5
  // ----------------------------------------------------------

  const badge3Roles = useMemo(() => [t('hero.role3'), t('hero.role5')], [t]);

  // ----------------------------------------------------------
  // CIRCULATION DE LA LUMIÈRE
  //
  // Badge 1 → Badge 2 → Badge 3 → Badge 1...
  // ----------------------------------------------------------

  useEffect(() => {
    if (!shouldAnimate) return;

    const interval = setInterval(() => {
      setActiveBadge((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [shouldAnimate]);

  // ----------------------------------------------------------
  // CHANGEMENT DU RÔLE DU BADGE 2
  //
  // La lumière vient d'arriver sur le Badge 2.
  //
  // role2 → role4 → role2 → role4...
  // ----------------------------------------------------------

  useEffect(() => {
    if (activeBadge !== 1) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRoleIndex2((prev) => (prev + 1) % 2);
  }, [activeBadge]);

  // ----------------------------------------------------------
  // CHANGEMENT DU RÔLE DU BADGE 3
  //
  // La lumière vient d'arriver sur le Badge 3.
  //
  // role3 → role5 → role3 → role5...
  // ----------------------------------------------------------

  useEffect(() => {
    if (activeBadge !== 2) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRoleIndex3((prev) => (prev + 1) % 2);
  }, [activeBadge]);

  // ----------------------------------------------------------
  // PARTICULES
  // ----------------------------------------------------------

  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, index) => {
      const angle = (index / 14) * Math.PI * 2;

      return {
        x: Math.cos(angle) * 220,
        y: Math.sin(angle) * 220,
      };
    });
  }, []);

  // ----------------------------------------------------------
  // COULEURS
  // ----------------------------------------------------------

  const badgeColors = ['#f3f009', '#22c55e', '#3b82f6'];

  // ----------------------------------------------------------
  // RÔLES FINAUX
  // ----------------------------------------------------------

  const developerRole = t('hero.role1');

  const rotatingRole2 = badge2Roles[roleIndex2];

  const rotatingRole3 = badge3Roles[roleIndex3];

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------

  return (
    <div
      ref={containerRef}
      className="
        relative
        flex
        h-[430px]
        w-[520px]
        items-center
        justify-center
        max-md:mx-auto
        max-md:mt-10
        max-md:h-[360px]
        max-md:w-full
        max-md:max-w-[390px]
      "
    >
      <HeroParticles particles={particles} visible={step >= 1} />

      <PortraitImage visible={step >= 1} alt={t('hero.imageAlt')} />

      {/* =====================================================
          BADGE 1
          FIXE
          ===================================================== */}

      <RoleBadge
        role={developerRole}
        color={badgeColors[0]}
        active={activeBadge === 0}
        visible={step >= 2}
        position="top"
        direction="left"
      />

      {/* =====================================================
          BADGE 2
          ROLE 2 ↔ ROLE 4
          ===================================================== */}

      <RoleBadge
        role={rotatingRole2}
        color={badgeColors[1]}
        active={activeBadge === 1}
        visible={step >= 3}
        position="middle"
        direction="right"
      />

      {/* =====================================================
          BADGE 3
          ROLE 3 ↔ ROLE 5
          ===================================================== */}

      <RoleBadge
        role={rotatingRole3}
        color={badgeColors[2]}
        active={activeBadge === 2}
        visible={step >= 4}
        position="bottom"
        direction="left"
      />
    </div>
  );
};

export default PortraitWithBadges;
