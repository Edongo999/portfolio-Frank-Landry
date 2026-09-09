import { useEffect, useState } from 'react';

export function useNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [lightSection, setLightSection] = useState(false);

  useEffect(() => {
    const detectSection = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // Hauteur dynamique du navbar
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 90;

      const element = document.elementFromPoint(
        window.innerWidth / 2,
        navbarHeight
      ) as HTMLElement | null;

      if (!element) return;

      const section = element.closest(
        'section, main, header, footer'
      ) as HTMLElement | null;

      if (!section) return;

      const background = window.getComputedStyle(section).backgroundColor;
      const rgb = background.match(/\d+/g);

      if (!rgb || rgb.length < 3) return;

      const r = Number(rgb[0]);
      const g = Number(rgb[1]);
      const b = Number(rgb[2]);

      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      setLightSection(brightness > 170);
    };

    // Premier calcul après le rendu complet
    window.addEventListener('load', detectSection);

    // Vérification après scroll/resize
    window.addEventListener('scroll', detectSection, { passive: true });
    window.addEventListener('resize', detectSection);

    return () => {
      window.removeEventListener('load', detectSection);
      window.removeEventListener('scroll', detectSection);
      window.removeEventListener('resize', detectSection);
    };
  }, []);

  return { scrolled, lightSection };
}
