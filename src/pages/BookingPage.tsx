import React, { useState } from 'react';
import BookingWizard from '../components/booking/BookingWizard';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

const BookingPage: React.FC = () => {
    const { t } = useLanguage();
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <div className="pt-20 min-h-screen bg-slate-50">
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

            <section className="py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-navy-900 transform translate-x-1/2 -skew-x-12 opacity-5" />
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-6xl font-serif font-bold text-navy-900 mb-6">{t('booking.pageTitle') || 'ابدأ رحلتك القانونية'}</h2>
                        <p className="text-xl text-slate-500 font-light">الخطوة الأولى نحو حماية حقوقك تبدأ من هنا.</p>
                    </div>
                    <BookingWizard onSuccess={() => setShowSuccess(true)} />
                </div>
            </section>
        </div>
    );
};

export default BookingPage;
