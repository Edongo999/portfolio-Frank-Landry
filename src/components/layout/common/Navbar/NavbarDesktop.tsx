// src/components/Navbar/NavbarDesktop.tsx

import NavLinks from '@/components/layout/common/Navigation/NavLinks';
import LanguageSelector from '@/components/layout/common/LanguageSelector';

export default function NavbarDesktop() {
  return (
    <>
      {/* =====================================================
          MENU DESKTOP
      ===================================================== */}

      <div
        className="
          flex-1
          hidden
          md:flex
          items-center
          justify-center
          ml-18
        "
      >
        <NavLinks />
      </div>

      {/* =====================================================
          ACTIONS DESKTOP
      ===================================================== */}

      <div
        className="
          flex-none
          hidden
          md:flex
          items-center
          font-medium
        "
      >
        <LanguageSelector />
      </div>
    </>
  );
}
