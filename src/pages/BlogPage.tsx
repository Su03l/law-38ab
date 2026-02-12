import React from 'react';
import BlogSection from '../components/sections/BlogSection';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/ui/SEO';

const BlogPage: React.FC = () => {
    const { isAr, t } = useLanguage();
    const ArrowIcon = isAr ? ArrowRight : ArrowLeft;

    return (
        <div className="pt-20 min-h-screen bg-white">
            <SEO
                title={isAr ? 'آفاق قانونية - المدونة' : 'Legal Insights - Blog'}
                description={isAr ? 'تابع آخر المقالات والمستجدات القانونية في المملكة العربية السعودية من خلال مدونة شركة عقاب السحيمي.' : 'Follow the latest articles and legal updates in Saudi Arabia through Oqab Al-Suhaimi blog.'}
                keywords={isAr ? 'مقالات قانونية، محاماة، ثقافة قانونية، أخبار المحاماة، السعودية' : 'legal articles, law, legal culture, law news, Saudi Arabia'}
            />
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
