import React from 'react';
import BlogSection from '../components/BlogSection';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const BlogPage: React.FC = () => {
    const { isAr, t } = useLanguage();
    const ArrowIcon = isAr ? ArrowRight : ArrowLeft;

    return (
        <div className="pt-20 min-h-screen bg-white">
            <div className="container mx-auto px-6 pt-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-3 text-navy-900 font-black hover:text-gold-500 transition-colors group mb-8"
                >
                    <ArrowIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    <Home className="w-5 h-5" />
                    <span className="text-lg">{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
                </Link>
            </div>
            <BlogSection />
        </div>
    );
};

export default BlogPage;
