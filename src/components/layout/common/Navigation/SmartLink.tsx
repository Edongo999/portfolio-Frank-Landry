import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import BlogModal from '@/components/layout/common/Navigation/BlogModal';
import { usePageTransition } from '@/components/hooks/PageTransitionContext';

type SmartLinkProps = {
  path: string;
  children: React.ReactNode;
  onClick?: () => void;
  setActiveSection: (key: string) => void;
};

export default function SmartLink({
  path,
  children,
  onClick,
  setActiveSection,
}: SmartLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { startTransition } = usePageTransition();

  const [showModal, setShowModal] = useState(false);

  // =====================================================
  // RESET SCROLL SUR LE BLOG
  // =====================================================

  useEffect(() => {
    if (location.pathname === '/blog') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [location.pathname]);

  // =====================================================
  // SCROLL VERS UNE SECTION
  // =====================================================

  const scrollToSection = (sectionPath: string) => {
    const element = document.querySelector(sectionPath);

    if (!element) return;

    const y = element.getBoundingClientRect().top + window.pageYOffset - 80;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  };

  // =====================================================
  // CLIC SUR UN LIEN
  // =====================================================

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // ===================================================
    // LIENS VERS LES SECTIONS DE L'ACCUEIL
    // ===================================================

    if (path.startsWith('#')) {
      const key = path.replace('#', '');

      setActiveSection(key);

      // -------------------------------------------------
      // CAS 1 : DÉJÀ SUR L'ACCUEIL
      // -------------------------------------------------

      if (location.pathname === '/') {
        scrollToSection(path);
        onClick?.();

        return;
      }

      // -------------------------------------------------
      // CAS 2 : SUR LE BLOG
      // → changement de page
      // → DONC LOADER
      // -------------------------------------------------

      sessionStorage.setItem('portfolioTargetSection', path);

      onClick?.();

      startTransition(() => {
        navigate('/');
      });

      return;
    }

    // ===================================================
    // BLOG
    // ===================================================

    if (path === '/blog') {
      // Déjà sur le Blog
      if (location.pathname === '/blog') {
        onClick?.();
        return;
      }

      // Accueil → Blog
      // → changement de page
      // → loader
      setShowModal(true);
    }
  };

  // =====================================================
  // APRÈS RETOUR SUR L'ACCUEIL
  // =====================================================

  useEffect(() => {
    if (location.pathname !== '/') return;

    const targetSection = sessionStorage.getItem('portfolioTargetSection');

    if (!targetSection) return;

    /*
     * On attend que l'accueil soit réellement rendu
     * avant de chercher la section.
     */
    const timeout = window.setTimeout(() => {
      const element = document.querySelector(targetSection);

      if (!element) return;

      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });

      sessionStorage.removeItem('portfolioTargetSection');
    }, 100);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [location.pathname]);

  // =====================================================
  // CONTINUER VERS LE BLOG
  // =====================================================

  const handleContinueToBlog = () => {
    setShowModal(false);

    /*
     * Le loader est global.
     * Le menu mobile peut donc être fermé immédiatement.
     */
    onClick?.();

    startTransition(() => {
      navigate('/blog');
    });
  };

  return (
    <>
      <a href={path} onClick={handleClick} className="block">
        {children}
      </a>

      <AnimatePresence>
        {showModal && (
          <BlogModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onContinue={handleContinueToBlog}
          />
        )}
      </AnimatePresence>
    </>
  );
}
