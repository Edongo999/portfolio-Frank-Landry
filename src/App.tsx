import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/components/pages/HomePages';
import BlogPage from '@/components/pages/BlogSection';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';
import ScrollToTop from './components/pages/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Page principale */}
          <Route path="/" element={<Home />} />

          {/* Page Blog */}
          <Route path="/blog" element={<BlogPage />} />
        </Routes>

        <WhatsAppFloatingButton />
      </Layout>
    </Router>
  );
}

export default App;
