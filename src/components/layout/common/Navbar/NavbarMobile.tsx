// src/components/Navbar/NavbarMobile.tsx

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import LanguageSelector from '@/components/layout/common/LanguageSelector';

type NavbarMobileProps = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

export default function NavbarMobile({
  menuOpen,
  setMenuOpen,
}: NavbarMobileProps) {
  return (
    <div
      className="
        md:hidden
        flex
        items-center
         space-x-5  
          px-10 
        
        text-white
      "
    >
      {/* =====================================================
          LANGUE
      ===================================================== */}

      <LanguageSelector />

      {/* =====================================================
          MENU HAMBURGER
      ===================================================== */}

      <motion.button
        type="button"
        whileTap={{
          scale: 0.9,
          rotate: 5,
        }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="
          relative
          z-50
          rounded
          p-2
          text-white
          focus:outline-none
        "
        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        <AnimatePresence mode="wait">
          {menuOpen ? (
            <motion.div
              key="close"
              initial={{
                rotate: -90,
                opacity: 0,
              }}
              animate={{
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                rotate: 90,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{
                rotate: 90,
                opacity: 0,
              }}
              animate={{
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                rotate: -90,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <Menu size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
