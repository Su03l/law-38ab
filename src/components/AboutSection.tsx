import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

const AboutSection: React.FC = () => {
    const [modalContent, setModalContent] = useState<{ title: string, content: React.ReactNode } | null>(null);

    const stats = [
        { label: '50M+ ريال', sub: 'تم تحصيلها للعملاء' },
        { label: '98%', sub: 'نسبة نجاح القضايا' },
        { label: '15+', sub: 'عاماً من الخبرة' },
    ];

    const openHistoryModal = () => {
        setModalContent({
            title: 'إرثنا وتاريخنا القانوني',
            content: (
                <div className="space-y-6 text-slate-600 leading-loose">
                    <p>تأسس مكتب العدل والبيان للمحاماة في عام 2009 برؤية تهدف إلى إعادة صياغة معايير الخدمات القانونية في المملكة العربية السعودية. بدأنا كفريق صغير من ثلاثة محامين شغوفين، واليوم نفخر بضم أكثر من 20 مستشاراً قانونياً متخصصاً.</p>
                    <p>خلال مسيرتنا، مثلنا كبرى الشركات الوطنية والعالمية في قضايا تجاوزت قيمتها المليارات، وحققنا أحكاماً قضائية تاريخية ساهمت في تعزيز البيئة العدلية والاستثمارية في المنطقة.</p>
                    <div className="bg-slate-50 p-6 rounded-2xl border-r-4 border-gold-500">
                        <h4 className="font-bold text-navy-900 mb-2">رسالتنا:</h4>
                        <p>تقديم الحماية القانونية القصوى لموكلينا من خلال الجمع بين العلم الشرعي والخبرة النظامية الحديثة.</p>
                    </div>
                </div>
            )
        });
    };

    return (
        <section id="about" className="py-20 container mx-auto px-6 bg-white">
            {/* Modal */}
            {modalContent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md transition-opacity" onClick={() => setModalContent(null)} />
                    <div className="relative bg-white rounded-[40px] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="px-10 py-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
                            <h3 className="text-2xl font-serif font-bold text-navy-900 leading-tight">{modalContent.title}</h3>
                            <button onClick={() => setModalContent(null)} className="p-3 bg-white rounded-2xl hover:bg-slate-100 transition-all shadow-sm">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                        <div className="p-10 overflow-y-auto custom-scrollbar">
                            {modalContent.content}
                        </div>
                        <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 text-center shrink-0">
                            <button onClick={() => setModalContent(null)} className="px-8 py-3 bg-navy-900 text-gold-500 rounded-xl font-black transition-all hover:bg-navy-800">إغلاق النافذة</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl" />
                    <h2 className="text-5xl font-serif font-bold text-navy-900 mb-8 leading-tight">إرث من التميز <br /><span className="text-gold-600">القانوني والنزاهة</span></h2>
                    <p className="text-xl text-slate-600 leading-loose mb-10 text-justify">
                        تأسس مكتب العدل والبيان على مبادئ العدالة المطلقة والدفاع المستميت عن حقوق موكلينا. على مدار أكثر من 15 عاماً، كنا وما زلزنا المرجع القانوني الأول لنخبة الشركات والعائلات في المملكة العربية السعودية، متميزين بنهجنا الاستراتيجي الذي يجمع بين الخبرة العميقة والابتكار في الحلول.
                    </p>
                    <button
                        onClick={openHistoryModal}
                        className="px-8 py-4 bg-navy-50 text-navy-900 font-black rounded-xl flex items-center gap-3 hover:bg-navy-100 transition-all border border-navy-100"
                    >
                        اقرأ المزيد عن تاريخنا <ArrowLeft className="w-5 h-5 text-gold-600" />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {stats.map((s, i) => (
                        <div key={i} className={`p-10 rounded-[32px] text-center transform hover:-translate-y-3 transition-all shadow-2xl ${i === 0 ? 'bg-navy-900 text-white sm:col-span-2' : 'bg-white border-2 border-slate-50'}`}>
                            <div className={`text-4xl font-black mb-3 ${i === 0 ? 'text-gold-500' : 'text-navy-900'}`}>{s.label}</div>
                            <div className={`text-lg font-bold ${i === 0 ? 'text-slate-400' : 'text-slate-500'}`}>{s.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
