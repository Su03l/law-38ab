import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import { Outlet } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Layout: React.FC = () => {
    const { isAr } = useLanguage();
    return (
        <div dir={isAr ? 'rtl' : 'ltr'}>
            <Navbar />
            <Outlet />
            <ScrollToTopButton />
            <Footer />
        </div>
    );
};

export default Layout;

