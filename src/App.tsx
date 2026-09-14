import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import Home from '@/components/pages/HomePages';
import BlogPage from '@/components/pages/BlogSection';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import ScrollToTop from './components/pages/ScrollToTop';
import CustomCursor from './components/layout/common/CustomCursor';
import PageLoader from './components/loaders/PageLoader';

import {
  PageTransitionProvider,
  usePageTransition,
} from './components/hooks/PageTransitionContext';

function AppContent() {
  const { loading } = usePageTransition();

  return (
    <>
      {loading && <PageLoader />}

      <ScrollToTop />
      <CustomCursor />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>

        <WhatsAppFloatingButton />
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
    </Router>
  );
}

export default App;
