import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import PracticeAreasPage from './pages/PracticeAreasPage';
import BlogPage from './pages/BlogPage';
import BookingPage from './pages/BookingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';
import Layout from './components/Layout';

// Use HashRouter for static file hosting compatibility if needed, but user requested no '#', so BrowserRouter is correct for localhost.
// However, if on a file system or simple host without rewrites, BrowserRouter might fail on refresh. 
// Given the user specifically asked to remove '#', I MUST use BrowserRouter.

const App: React.FC = () => {
  return (
    <BrowserRouter>
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
  );
};

export default App;
