import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BackToTop = () => {
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('backToTop')}
      className={`
        group
        fixed
        bottom-6
        right-5
        z-50
        flex
        h-11
        w-11
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        border
        border-gray-700/80
        bg-gray-950/90
        text-gray-400
        shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        backdrop-blur-xl
        transition-all
        duration-500
        ease-out

        hover:-translate-y-1
        hover:border-[#f3f009]/60
        hover:bg-gray-900
        hover:text-[#f3f009]
        hover:shadow-[0_10px_35px_rgba(243,240,9,0.12)]

        sm:bottom-7
        sm:right-7

        ${
          isVisible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-4 scale-90 opacity-0'
        }
      `}
    >
      {/* Lueur discrète au survol */}
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-xl
          bg-[#f3f009]/10
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Ligne lumineuse supérieure */}
      <span
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-px
          w-0
          -translate-x-1/2
          bg-[#f3f009]
          shadow-[0_0_8px_rgba(243,240,9,0.8)]
          transition-all
          duration-500
          group-hover:w-1/2
        "
      />

      {/* Icône */}
      <ArrowUp
        size={17}
        strokeWidth={2}
        className="
          relative
          z-10
          transition-transform
          duration-300
          group-hover:-translate-y-0.5
        "
      />
    </button>
  );
};

export default BackToTop;
