// src/components/layout/common/Navbar/NavbarMobile.tsx
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
        flex items-center
        space-x-12
        px-2
        text-white
        flex-none
      "
    >
      <div className="flex-none">
        <LanguageSelector />
      </div>

      {/* Bouton hamburger qui devient croix */}
      <motion.button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        className="
          relative z-50
          w-10 h-10
          flex items-center justify-center
          rounded
          text-white
          focus:outline-none
        "
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait">
          {menuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.9 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0, scale: 0.9 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
            >
              <Menu size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
