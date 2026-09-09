// src/components/Navigation/SmartLink.tsx

import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import BlogModal from '@/components/layout/common/Navigation/BlogModal';
import PageLoader from '@/components/loaders/PageLoader';

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

  const [showModal, setShowModal] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  /*
   * ==========================================================
   * ARRÊTER LE LOADER UNE FOIS QUE LE BLOG EST CHARGÉ
   * ==========================================================
   */
  useEffect(() => {
    if (pageLoading && location.pathname === '/blog') {
      const timer = window.setTimeout(() => {
        setPageLoading(false);
      }, 350);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, [location.pathname, pageLoading]);
  /*
   * ==========================================================
   * RENITIALISE LE SCROL ET AFFICHE LA PAGE EN HAUT
   * ==========================================================
   */

  useEffect(() => {
    if (location.pathname === '/blog') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [location.pathname]);

  /*
   * ==========================================================
   * SCROLL VERS UNE SECTION
   * ==========================================================
   */
  const scrollToSection = () => {
    const element = document.querySelector(path);

    if (!element) return;

    const y = element.getBoundingClientRect().top + window.pageYOffset - 80;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  };

  /*
   * ==========================================================
   * CLIC SUR UN LIEN
   * ==========================================================
   */
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    /*
     * --------------------------------------------------------
     * SECTIONS DE LA PAGE D'ACCUEIL
     * --------------------------------------------------------
     */
    if (path.startsWith('#')) {
      e.preventDefault();

      const key = path.replace('#', '');

      setActiveSection(key);

      if (location.pathname !== '/') {
        navigate('/');

        setTimeout(() => {
          scrollToSection();
        }, 200);
      } else {
        scrollToSection();
      }

      onClick?.();

      return;
    }

    /*
     * --------------------------------------------------------
     * BLOG
     * --------------------------------------------------------
     */
    if (path === '/blog') {
      e.preventDefault();

      /*
       * Si on est déjà sur le blog,
       * on ne montre pas le modal.
       */
      if (location.pathname === '/blog') {
        navigate('/blog');
        return;
      }

      /*
       * Sinon, afficher le modal.
       */
      setShowModal(true);
    }
  };

  /*
   * ==========================================================
   * CONTINUER VERS LE BLOG
   * ==========================================================
   */
  const handleContinueToBlog = () => {
    /*
     * 1. Fermer immédiatement le modal
     */
    setShowModal(false);

    /*
     * 2. Afficher le loader plein écran
     */
    setPageLoading(true);

    /*
     * 3. Laisser le loader jouer son animation
     */
    window.setTimeout(() => {
      navigate('/blog');
    }, 1800);
  };

  return (
    <>
      {/* ======================================================
          LIEN
      ====================================================== */}
      <a href={path} onClick={handleClick} className="block">
        {children}
      </a>

      {/* ======================================================
          MODAL BLOG
      ====================================================== */}
      <AnimatePresence>
        {showModal && (
          <BlogModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onContinue={handleContinueToBlog}
          />
        )}
      </AnimatePresence>

      {/* ======================================================
          LOADER DE TRANSITION
      ====================================================== */}
      <AnimatePresence>{pageLoading && <PageLoader />}</AnimatePresence>
    </>
  );
}
