import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="py-20 relative bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-serif font-bold text-navy-900 mb-6">تواصل معنا</h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">نحن هنا للإجابة على استفساراتكم وتقديم الدعم القانوني الذي تحتاجونه.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[32px] shadow-lg flex items-start gap-6 hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                <MapPin className="w-7 h-7 text-gold-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-navy-900 mb-2">العنوان الرئيسي</h4>
                                <p className="text-slate-500 leading-relaxed">طريق الملك فهد، حي العليا<br />برج المملكة، الطابق 45<br />الرياض، المملكة العربية السعودية</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] shadow-lg flex items-start gap-6 hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                <Phone className="w-7 h-7 text-gold-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-navy-900 mb-2">اتصل بنا</h4>
                                <p className="text-slate-500 dir-ltr text-right">+966 11 555 0000</p>
                                <p className="text-slate-500 dir-ltr text-right">+966 50 123 4567</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] shadow-lg flex items-start gap-6 hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                <Mail className="w-7 h-7 text-gold-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-navy-900 mb-2">البريد الإلكتروني</h4>
                                <p className="text-slate-500">info@eqab-law.sa</p>
                                <p className="text-slate-500">consult@eqab-law.sa</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] shadow-lg flex items-start gap-6 hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                <Clock className="w-7 h-7 text-gold-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-navy-900 mb-2">ساعات العمل</h4>
                                <p className="text-slate-500">الأحد - الخميس: 9:00 ص - 5:00 م</p>
                                <p className="text-slate-500">الجمعة - السبت: مغلق</p>
                            </div>
                        </div>
                    </div>

                    {/* Mini Contact Form */}
                    <div className="bg-navy-950 p-10 rounded-[40px] text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                        <h3 className="text-3xl font-serif font-bold mb-8 relative z-10">أرسل رسالة فورية</h3>
                        <form className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">الاسم الكامل</label>
                                <input type="text" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-gold-500 transition-colors" placeholder="الاسم" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">البريد الإلكتروني</label>
                                <input type="email" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-gold-500 transition-colors" placeholder="example@mail.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">الرسالة</label>
                                <textarea rows={4} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-gold-500 transition-colors resize-none" placeholder="اكتب استفسارك هنا..." />
                            </div>
                            <button className="w-full py-4 bg-gold-500 text-navy-950 font-black rounded-xl hover:bg-gold-400 transition-all flex items-center justify-center gap-2">
                                إرسال الرسالة
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
