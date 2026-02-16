import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import PracticeAreasPage from './pages/PracticeAreasPage';
import BlogPage from './pages/BlogPage';
import BookingPage from './pages/BookingPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ContactPage from './pages/ContactPage';
import RequireAuth from './components/auth/RequireAuth';
import Layout from './components/layout/Layout';
import { LanguageProvider } from './context/LanguageContext';
import { BlogProvider } from './context/BlogContext';
import { PackagesProvider } from './context/PackagesContext';


import ScrollToTop from './components/layout/ScrollToTop';

const App: React.FC = () => {
  return (
    <>
      <LanguageProvider>
        <BlogProvider>
          <PackagesProvider>
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
                <Route path="/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route element={<RequireAuth />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </PackagesProvider>
        </BlogProvider>
      </LanguageProvider>
    </>
  );
};

export default App;

