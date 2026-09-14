// src/components/layout/common/Navbar/Navbar.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import NavbarLogo from '@/components/layout/common/Navbar/NavbarLogo';
import NavbarDesktop from '@/components/layout/common/Navbar/NavbarDesktop';
import NavbarMobile from '@/components/layout/common/Navbar/NavbarMobile';
import MobileMenu from '@/components/layout/common/Navbar/MobileMenu';

import { useNavbar } from '@/components/layout/common/Navbar/userNavbar';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, lightSection } = useNavbar();

  /*
   * ============================================================
   * 🎨 NAVBAR PREMIUM
   *
   * En haut :
   * → transparente
   *
   * Au scroll :
   * → gris élégant Gray-700
   * → contraste suffisant pour les textes blancs
   * ============================================================
   */

  const background = !scrolled
    ? 'rgba(255,255,255,0.07)'
    : 'rgba(55,65,81,0.94)';

  const border = !scrolled
    ? 'rgba(255,255,255,0.18)'
    : 'rgba(255,255,255,0.24)';

  return (
    <>
      <motion.nav
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          backgroundColor: background,
          borderColor: border,
        }}
        className={`
          fixed
          z-50

          top-3
          left-3
          right-3

          sm:top-4
          sm:left-5
          sm:right-5

          lg:top-5
          lg:left-8
          lg:right-8

          flex
          items-center
          justify-between
          flex-nowrap

          h-14
          sm:h-[68px]
          lg:h-[72px]

          px-4
          sm:px-6
          lg:px-7

          border
          rounded-2xl

          backdrop-blur-2xl

          transition-all
          duration-500
          ease-out

          ${
            scrolled
              ? 'shadow-[0_12px_40px_rgba(0,0,0,0.20)]'
              : 'shadow-[0_8px_30px_rgba(0,0,0,0.10)]'
          }
        `}
      >
        {/* ======================================================
            LOGO
        ====================================================== */}

        <div className="flex-none">
          <NavbarLogo lightSection={lightSection} scrolled={scrolled} />
        </div>

        {/* ======================================================
            NAVIGATION DESKTOP
        ====================================================== */}

        <div className="flex-1 flex items-center justify-center">
          <NavbarDesktop scrolled={scrolled} />
        </div>

        {/* ======================================================
            MENU MOBILE
        ====================================================== */}

        <div className="flex-none">
          <NavbarMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </motion.nav>

      {/* ========================================================
          MENU MOBILE PLEIN ÉCRAN
      ======================================================== */}

      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}
