// src/components/layout/common/Navbar/MobileMenu.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import NavLinks from '@/components/layout/common/Navigation/NavLinks';

type MobileMenuProps = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

export default function MobileMenu({ menuOpen, setMenuOpen }: MobileMenuProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
            className="
              fixed inset-0
              z-40
              bg-black/60
              backdrop-blur-sm
              md:hidden
            "
          />

          {/* Menu plein écran */}
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="
              fixed inset-0
              z-50
              flex flex-col
              bg-gray-950/95
              backdrop-blur-2xl
              md:hidden
              overflow-y-auto
            "
          >
            <div className="px-6 pb-8 pt-28 flex-1">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mb-8 h-px w-full origin-left
                  bg-gradient-to-r from-[#f3f009]/70 via-white/10 to-transparent
                "
              />

              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
                  },
                }}
              >
                <NavLinks vertical onClick={() => setMenuOpen(false)} />
              </motion.div>

              <motion.button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="
                  mt-8 w-full rounded-xl border border-white/10
                  bg-white/5 px-6 py-3 text-sm font-medium text-white
                  transition-all duration-300
                  hover:border-[#f3f009]/30 hover:bg-[#f3f009]/10 hover:text-[#f3f009]
                "
              >
                {t('nav.close')}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
