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
  // RÔLES
  // ----------------------------------------------------------

  const rotatingRoles = useMemo(
    () => [t('hero.role2'), t('hero.role3'), t('hero.role4'), t('hero.role5')],
    [t]
  );

  // ----------------------------------------------------------
  // INDEX DES RÔLES DE CHAQUE BADGE
  //
  // IMPORTANT :
  // Le rôle ne change QUE lorsque la lumière arrive
  // sur le badge correspondant.
  // ----------------------------------------------------------

  const [roleIndex1, setRoleIndex1] = useState(0);
  const [roleIndex2, setRoleIndex2] = useState(1);

  // ----------------------------------------------------------
  // LUMIÈRE
  // ----------------------------------------------------------

  useEffect(() => {
    if (!shouldAnimate) return;

    const interval = setInterval(() => {
      setActiveBadge((prev) => {
        const next = (prev + 1) % 3;

        // ================================================
        // LA LUMIÈRE ARRIVE SUR LE BADGE 2
        // ================================================

        if (next === 1) {
          setRoleIndex1((prevRole) => {
            return (prevRole + 1) % rotatingRoles.length;
          });
        }

        // ================================================
        // LA LUMIÈRE ARRIVE SUR LE BADGE 3
        // ================================================

        if (next === 2) {
          setRoleIndex2((prevRole) => {
            return (prevRole + 1) % rotatingRoles.length;
          });
        }

        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [shouldAnimate, rotatingRoles.length]);

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
  // RÔLES
  // ----------------------------------------------------------

  const developerRole = t('hero.role1');

  const rotatingRole1 = rotatingRoles[roleIndex1];

  const rotatingRole2 = rotatingRoles[roleIndex2];

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
          FIXE : DÉVELOPPEUR FULL STACK
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
          CHANGE UNIQUEMENT QUAND SA LUMIÈRE ARRIVE
          ===================================================== */}

      <RoleBadge
        role={rotatingRole1}
        color={badgeColors[1]}
        active={activeBadge === 1}
        visible={step >= 3}
        position="middle"
        direction="right"
      />

      {/* =====================================================
          BADGE 3
          CHANGE UNIQUEMENT QUAND SA LUMIÈRE ARRIVE
          ===================================================== */}

      <RoleBadge
        role={rotatingRole2}
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
