// src/components/layout/Layout.tsx

import React from 'react';

import Navbar from './common/Navbar/Navbar';
import Footer from './common/Footer';
import BackToTop from './common/BackToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className="
        min-h-screen
        bg-[var(--background)]
        text-[var(--foreground)]
        transition-colors
        duration-500
      "
    >
      {/* Navbar */}
      <Navbar />

      {/* Contenu principal */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />

      {/* Bouton retour en haut */}
      <BackToTop />
    </div>
  );
};

export default Layout;
