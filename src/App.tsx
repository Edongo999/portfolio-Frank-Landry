import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import Home from '@/components/pages/HomePages';
import BlogSection from '@/components/pages/BlogSection';

import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import ScrollToTop from './components/pages/ScrollToTop';
import CustomCursor from './components/layout/common/CustomCursor';
import PageLoader from './components/loaders/PageLoader';
import { Analytics } from '@vercel/analytics/react';

import {
  PageTransitionProvider,
  usePageTransition,
} from './components/hooks/PageTransitionContext';
import Chatbot from './components/chatbot/chatbot';

function AppContent() {
  const { loading } = usePageTransition();

  return (
    <>
      {loading && <PageLoader />}

      <ScrollToTop />
      <CustomCursor />

      <Layout>
        <Routes>
          {/* Page principale avec toutes les sections */}
          <Route path="/" element={<Home />} />

          {/* Route dédiée au Blog */}
          <Route path="/blog" element={<BlogSection />} />
        </Routes>

        <WhatsAppFloatingButton />
        <Chatbot />
      </Layout>
    </>
  );
}

function App() {
  return (
    <Router>
      <PageTransitionProvider>
        <AppContent />
      </PageTransitionProvider>
      <Analytics />
    </Router>
  );
}

export default App;
