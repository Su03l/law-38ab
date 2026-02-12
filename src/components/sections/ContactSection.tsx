import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ContactSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" className="py-24 relative bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-serif font-bold text-navy-900 mb-6">{t('contact.sectionTitle')}</h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">{t('contact.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        {/* Madinah Address */}
                        <div className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex items-start gap-6 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                <MapPin className="w-7 h-7 text-gold-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-navy-900 mb-2">{t('contact.mainAddress')}</h4>
                                <p className="text-slate-500 leading-relaxed whitespace-pre-line">{t('contact.madinahAddress')}</p>
                            </div>
                        </div>

                        {/* Riyadh Address */}
                        <div className="bg-white p-8 rounded-[32px] shadow-lg flex items-start gap-6 hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                <MapPin className="w-7 h-7 text-gold-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-navy-900 mb-2">{t('contact.mainAddress')}</h4>
                                <p className="text-slate-500 leading-relaxed whitespace-pre-line">{t('contact.riyadhAddress')}</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="bg-white p-8 rounded-[32px] shadow-lg flex items-start gap-6 hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                <Phone className="w-7 h-7 text-gold-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-navy-900 mb-2">{t('contact.callUs')}</h4>
                                <p className="text-slate-500" dir="ltr">0148442230</p>
                                <p className="text-slate-500" dir="ltr">0553300581</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-white p-8 rounded-[32px] shadow-lg flex items-start gap-6 hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                <Mail className="w-7 h-7 text-gold-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-navy-900 mb-2">{t('contact.email')}</h4>
                                <p className="text-slate-500">info@oqab.sa</p>
                                <p className="text-slate-500">www.oqab.sa</p>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-white p-8 rounded-[32px] shadow-lg flex items-start gap-6 hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                <Clock className="w-7 h-7 text-gold-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-navy-900 mb-2">{t('contact.workHours')}</h4>
                                <p className="text-slate-500">{t('contact.workSchedule')}</p>
                                <p className="text-slate-500">{t('contact.weekend')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Mini Contact Form */}
                    <div className="bg-navy-950 p-10 rounded-[40px] text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                        <h3 className="text-3xl font-serif font-bold mb-8 relative z-10">{t('contact.sendMessage')}</h3>
                        <form className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">{t('contact.fullName')}</label>
                                <input type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-gold-500 focus:bg-white/10 transition-all text-lg" placeholder={t('contact.namePlaceholder')} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">{t('contact.emailLabel')}</label>
                                <input type="email" className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-gold-500 transition-colors" placeholder={t('contact.emailPlaceholder')} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">{t('contact.messageLabel')}</label>
                                <textarea rows={4} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-gold-500 transition-colors resize-none" placeholder={t('contact.messagePlaceholder')} />
                            </div>
                            <button className="w-full py-5 bg-gold-500 text-navy-950 font-black rounded-2xl hover:bg-white hover:text-navy-900 transition-all shadow-lg hover:shadow-gold-500/50 flex items-center justify-center gap-3 text-lg">
                                {t('contact.send')}
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
