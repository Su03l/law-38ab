import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import PracticeAreasPage from './pages/PracticeAreasPage';
import BlogPage from './pages/BlogPage';
import BookingPage from './pages/BookingPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ContactPage from './pages/ContactPage';
import Layout from './components/layout/Layout';
import { LanguageProvider } from './context/LanguageContext';
import { BlogProvider } from './context/BlogContext';
import { HelmetProvider } from 'react-helmet-async';

import ScrollToTop from './components/layout/ScrollToTop';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BlogProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="practice-areas" element={<PracticeAreasPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="booking" element={<BookingPage />} />
                <Route path="contact" element={<ContactPage />} />
              </Route>

              {/* Admin Routes separate from public layout */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/login" element={<AdminLogin />} />
            </Routes>
          </BrowserRouter>
        </BlogProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;

