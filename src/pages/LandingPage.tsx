import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AboutSection from '../components/sections/AboutSection';
import PracticeAreasSection from '../components/sections/PracticeAreasSection';
import BlogSection from '../components/sections/BlogSection';
import ContactSection from '../components/sections/ContactSection';
import BookingWizard from '../components/booking/BookingWizard';
import PackagesSection from '../components/sections/PackagesSection';
import SEO from '../components/ui/SEO';
import { useLanguage } from '../context/LanguageContext';

import partner1 from '@/assets/Screenshot_2026-02-12_213717-removebg-preview.png';
import partner2 from '@/assets/Screenshot_2026-02-12_213758-removebg-preview.png';
import partner3 from '@/assets/Screenshot_2026-02-12_213831-removebg-preview.png';
import partner4 from '@/assets/Screenshot_2026-02-12_213855-removebg-preview.png';
import partner5 from '@/assets/Screenshot_2026-02-12_213918-removebg-preview.png';
import partner6 from '@/assets/Screenshot_2026-02-12_213942-removebg-preview.png';
import partner7 from '@/assets/Screenshot_2026-02-12_214009-removebg-preview.png';
import partner8 from '@/assets/Screenshot_2026-02-12_214027-removebg-preview.png';
import partner9 from '@/assets/4a3d78e8-e85d-491c-b8da-71f08d68f535_مشروع_جديد-removebg-preview.png';

const partners = [partner1, partner2, partner3, partner4, partner5, partner6, partner7, partner8, partner9];

const LandingPage: React.FC = () => {
  const { t, isAr } = useLanguage();
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [showSuccess, setShowSuccess] = React.useState(false);

  const lawFirmSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "شركة عقاب السحيمي للمحاماة والاستشارات القانونية",
    "alternateName": "Oqab Al-Suhaimi Law Firm",
    "description": "شركة محاماة رائدة في المدينة المنورة والرياض تقدم خدمات قانونية متخصصة في القضايا التجارية والعمالية والإدارية.",
    "url": "https://oqab.sa",
    "logo": "https://oqab.sa/logo.png",
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "المدينة المنورة",
        "addressRegion": "منطقة المدينة المنورة",
        "addressCountry": "SA"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "الرياض",
        "addressRegion": "منطقة الرياض",
        "addressCountry": "SA"
      }
    ],
    "telephone": "+966148442230",
    "priceRange": "$$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "opens": "08:00",
      "closes": "16:00"
    }
  };

  return (
    <div className="relative">
      <SEO
        title="الرئيسية"
        description="نقدم حلولاً قانونية ذكية وخدمات احترافية في قلب المدينة المنورة والرياض. استشارات متخصصة في القضايا التجارية والمدنية والعمالية."
        keywords="محاماة، استشارات قانونية، المدينة المنورة، الرياض، محامي تجاري، محامي عمالي، عقاب السحيمي"
        schema={lawFirmSchema}
      />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={() => setShowSuccess(false)} />
          <div className="relative bg-white rounded-[40px] p-12 max-w-lg w-full text-center shadow-2xl border-t-8 border-gold-500 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CheckCircle2 className="w-12 h-12 text-gold-600" />
            </div>
            <h3 className="text-4xl font-serif font-bold text-navy-900 mb-4">{t('successModal.title')}</h3>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">{t('successModal.message')}</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-5 bg-navy-900 text-gold-500 rounded-2xl font-black text-xl hover:bg-navy-800 transition-all shadow-xl"
            >
              {t('successModal.close')}
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative h-screen min-h-[850px] flex items-center overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0">
          <img src="https://png.pngtree.com/thumb_back/fh260/background/20250324/pngtree-a-gold-balance-scale-symbolizes-justice-placed-on-dark-wooden-desk-image_17138389.jpg" className="w-full h-full object-cover opacity-30 grayscale brightness-50" alt="ميزان العدالة - مكتب المحاماة" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 backdrop-blur-md text-gold-400 text-sm font-bold animate-pulse hover:bg-gold-500/20 transition-colors">
              <span className="w-2 h-2 rounded-full bg-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              {t('hero.badge')}
            </div>
            <h1 className="text-7xl md:text-[92px] font-serif font-bold leading-[1.1] text-white">
              {t('hero.title1')} <span className="text-gold-500">{t('hero.titleHighlight')}</span> <br />
              {t('hero.title2')}
            </h1>
            <p className="text-2xl text-slate-300 max-w-2xl font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link to="/booking" className="px-12 py-6 bg-gold-500 text-navy-900 rounded-2xl font-black text-xl hover:bg-gold-400 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-gold-500/20">
                {t('hero.cta1')}
                <ArrowIcon className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
              </Link>
              <Link to="/about" className="px-12 py-6 border-2 border-white/20 hover:bg-white/5 rounded-2xl font-black text-xl text-center transition-all backdrop-blur-sm">
                {t('hero.cta2')}
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* SECTIONS */}
      <AboutSection />
      <PracticeAreasSection />
      <BlogSection limit={3} showViewAll={true} />

      {/* Packages Section */}
      <PackagesSection />

      {/* Partners */}
      <section className="py-24 bg-white border-y border-slate-100 overflow-hidden relative">
        <div className="absolute inset-0 bg-slate-50/50" />
        <div className="container mx-auto px-6 relative z-10">
          <p className="text-center text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-12">{t('hero.partnersLabel')}</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {partners.map((p, i) => (
              <img
                key={i}
                src={p}
                alt={t(`partners.partner${i + 1}Alt`)}
                className="h-20 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </section>



      {/* Booking Section */}
      <section id="booking-section" className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-navy-900 transform translate-x-1/2 -skew-x-12 opacity-5" />
        <div className="container mx-auto px-6">
          <BookingWizard onSuccess={() => setShowSuccess(true)} />
        </div>
      </section>

      <ContactSection />
    </div>
  );
};

export default LandingPage;
