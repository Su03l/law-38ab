import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ScrollToTopButton: React.FC = () => {
    const { isAr } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className={`fixed bottom-8 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'} ${isAr ? 'left-8' : 'right-8'}`}>
            <button
                onClick={scrollToTop}
                className="p-4 bg-navy-900 text-gold-500 rounded-full shadow-lg hover:bg-gold-500 hover:text-navy-900 transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2"
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-6 h-6" />
            </button>
        </div>
    );
};

export default ScrollToTopButton;
