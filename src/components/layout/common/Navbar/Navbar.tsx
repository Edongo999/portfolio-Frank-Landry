// src/components/Navbar/Navbar.tsx

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

  const background = !scrolled
    ? 'rgba(255,255,255,0.10)'
    : lightSection
      ? 'rgba(255,255,255,0.82)'
      : 'rgba(2,6,23,0.88)';

  const border = !scrolled
    ? 'rgba(255,255,255,0.20)'
    : lightSection
      ? 'rgba(15,23,42,0.10)'
      : 'rgba(255,255,255,0.10)';

  return (
    <motion.nav
      initial={{
        y: -100,
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
        top-0
        left-0
        w-full
        z-50
        flex
        items-center
        px-8
        backdrop-blur-xl
        border-b
        transition-all
        duration-500
        ease-in-out

        ${scrolled ? 'py-3 shadow-xl' : 'py-5 shadow-lg'}
      `}
    >
      {/* Logo */}
      <div className="flex-none">
        <NavbarLogo lightSection={lightSection} scrolled={scrolled} />
      </div>

      {/* Desktop */}
      <NavbarDesktop />

      {/* Mobile */}
      <NavbarMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Menu mobile */}
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </motion.nav>
  );
}
