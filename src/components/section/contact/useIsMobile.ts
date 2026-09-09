import { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.innerWidth < 768;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const checkMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    // Vérification immédiate
    checkMobile();

    // Écoute uniquement les changements mobile/desktop
    mediaQuery.addEventListener('change', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', checkMobile);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
