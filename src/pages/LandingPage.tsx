import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AboutSection from '../components/AboutSection';
import PracticeAreasSection from '../components/PracticeAreasSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import BookingWizard from '../components/BookingWizard';

const LandingPage: React.FC = () => {
  const partners = ['شركة النخبة', 'تيك فلو للتقنية', 'مصرف المملكة', 'اللوجستية العالمية', 'مجموعة الفيصل'];
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={() => setShowSuccess(false)} />
          <div className="relative bg-white rounded-[40px] p-12 max-w-lg w-full text-center shadow-2xl border-t-8 border-gold-500 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CheckCircle2 className="w-12 h-12 text-gold-600" />
            </div>
            <h3 className="text-4xl font-serif font-bold text-navy-900 mb-4">تم استلام طلبك!</h3>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">شكراً لثقتك بشركة عقاب السحيمي. سيقوم أحد مستشارينا بالتواصل معك خلال 24 ساعة لتأكيد موعدك.</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-5 bg-navy-900 text-gold-500 rounded-2xl font-black text-xl hover:bg-navy-800 transition-all shadow-xl"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative h-screen min-h-[850px] flex items-center overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0">
          <img src="https://png.pngtree.com/thumb_back/fh260/background/20250324/pngtree-a-gold-balance-scale-symbolizes-justice-placed-on-dark-wooden-desk-image_17138389.jpg" className="w-full h-full object-cover opacity-30 grayscale brightness-50" alt="Law Office Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-sm font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              شركة عقاب السحيمي للمحاماة والاستشارات القانونية
            </div>
            <h1 className="text-7xl md:text-[92px] font-serif font-bold leading-[1.1] text-white">
              عدالة <span className="text-gold-500 italic">راسخة</span> <br />
              وحماية قانونية شاملة.
            </h1>
            <p className="text-2xl text-slate-300 max-w-2xl font-light leading-relaxed">
              نحن لا نمثلك قانونياً فحسب، بل نحن شركاؤك في النجاح وحماية مصالحك بأعلى معايير النزاهة والاحترافية العالمية في قلب المملكة.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link to="/booking" className="px-12 py-6 bg-gold-500 text-navy-900 rounded-2xl font-black text-xl hover:bg-gold-400 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-gold-500/20">
                احجز استشارتك الآن
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
              </Link>
              <Link to="/about" className="px-12 py-6 border-2 border-white/20 hover:bg-white/5 rounded-2xl font-black text-xl text-center transition-all backdrop-blur-sm">
                تعرف علينا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-12">نفتخر بخدمة كبرى الكيانات الوطنية</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-28">
            {partners.map(p => (
              <span key={p} className="text-3xl font-serif font-bold text-slate-300 hover:text-gold-600 transition-all cursor-default select-none grayscale hover:grayscale-0">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <AboutSection />
      <PracticeAreasSection />
      <BlogSection />

      {/* Booking Section */}
      <section id="booking-section" className="py-20 relative overflow-hidden bg-slate-50">
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
