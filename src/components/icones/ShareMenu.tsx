import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface ShareMenuProps {
  url: string;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ url }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // =====================================================
  // FERMETURE AU CLIC EXTÉRIEUR
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // =====================================================
  // PARTAGE
  // =====================================================

  return (
    <div ref={menuRef} className="relative inline-flex">
      {/* =================================================
          BOUTON PARTAGER
      ================================================= */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t('blog.share.button')}
        aria-expanded={open}
        className={`
          group
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          px-3.5
          py-2
          text-xs
          font-semibold
          transition-all
          duration-300
          ${
            open
              ? `
                border-[#f3f009]/40
                bg-[#f3f009]/10
                text-[#f3f009]
                shadow-[0_0_20px_rgba(243,240,9,0.08)]
              `
              : `
                border-gray-700
                bg-gray-900/80
                text-gray-400
                hover:border-[#f3f009]/30
                hover:bg-gray-800
                hover:text-[#f3f009]
              `
          }
        `}
      >
        <Share2
          size={15}
          strokeWidth={2}
          className={`
            transition-transform
            duration-300
            ${open ? 'rotate-12' : 'group-hover:rotate-6'}
          `}
        />

        <span>{t('blog.share.button')}</span>
      </button>

      {/* =================================================
          MENU RÉSEAUX
      ================================================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.94,
            }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
            }}
            className="
              absolute
              bottom-full
              right-0
              z-[300]
              mb-3
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-gray-700/80
              bg-gray-950/95
              p-2
              shadow-[0_15px_40px_rgba(0,0,0,0.45)]
              backdrop-blur-xl
            "
          >
            {/* =================================================
                WHATSAPP
            ================================================= */}

            <a
              href={`https://wa.me/?text=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('blog.share.whatsapp')}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                text-green-400
                transition-all
                duration-300
                hover:bg-green-500/10
                hover:text-green-300
                hover:-translate-y-0.5
              "
            >
              <FaWhatsapp size={19} />
            </a>

            {/* =================================================
                FACEBOOK
            ================================================= */}

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('blog.share.facebook')}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                text-blue-400
                transition-all
                duration-300
                hover:bg-blue-500/10
                hover:text-blue-300
                hover:-translate-y-0.5
              "
            >
              <FaFacebook size={18} />
            </a>

            {/* =================================================
                LINKEDIN
            ================================================= */}

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                url
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('blog.share.linkedin')}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                text-sky-400
                transition-all
                duration-300
                hover:bg-sky-500/10
                hover:text-sky-300
                hover:-translate-y-0.5
              "
            >
              <FaLinkedin size={18} />
            </a>

            {/* Petite flèche visuelle */}

            <div
              className="
                absolute
                -bottom-1.5
                right-5
                h-3
                w-3
                rotate-45
                border-b
                border-r
                border-gray-700/80
                bg-gray-950
              "
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareMenu;
