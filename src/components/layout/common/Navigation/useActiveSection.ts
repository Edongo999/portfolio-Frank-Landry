// src/components/Navigation/useActiveSection.ts

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navLinks } from './navLinks.data';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/blog') {
      requestAnimationFrame(() => {
        setActiveSection('bloc');
      });

      return;
    }

    const handleScroll = () => {
      let current = 'hero';

      navLinks.forEach((link) => {
        if (!link.path.startsWith('#')) return;

        const element = document.getElementById(link.key);

        if (!element) return;

        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = link.key;
        }
      });

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return {
    activeSection,
    setActiveSection,
  };
}
