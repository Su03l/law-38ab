import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, AlertCircle, X, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ContactSection: React.FC = () => {
    const { t, isAr } = useLanguage();
    const [showModal, setShowModal] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowModal(true);
    };

    return (
        <section id="contact" className="py-24 relative bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-navy-900 mb-4">{t('contact.sectionTitle')}</h2>
                    <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto">{t('contact.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Madinah Address */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center shrink-0">
                                <MapPin className="w-6 h-6 text-gold-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-navy-900 mb-2">{t('contact.mainAddress')}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{t('contact.madinahAddress')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Riyadh Address */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center shrink-0">
                                <MapPin className="w-6 h-6 text-gold-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-navy-900 mb-2">{t('contact.riyadhAddress').split('\n')[0]}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{t('contact.riyadhAddress')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Contact Info */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gold-600 shrink-0" />
                                <div className="text-sm text-slate-500" dir="ltr">0553300581</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gold-600 shrink-0" />
                                <div className="text-sm text-slate-500">info@oqab.sa</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-gold-600 shrink-0" />
                                <div className="text-sm text-slate-500">{t('contact.workSchedule')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-2">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-100">
                        <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6">{t('contact.sendMessage')}</h3>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">{t('contact.fullName')}</label>
                                <input type="text" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:bg-white transition-all" placeholder={t('contact.namePlaceholder')} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">{t('contact.emailLabel')}</label>
                                <input type="email" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:bg-white transition-all" placeholder={t('contact.emailPlaceholder')} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">{t('contact.messageLabel')}</label>
                                <textarea rows={4} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:bg-white transition-all resize-none" placeholder={t('contact.messagePlaceholder')} />
                            </div>
                            <button className="w-full py-4 bg-navy-900 text-white font-bold rounded-xl hover:bg-gold-500 hover:text-navy-900 transition-all shadow-lg flex items-center justify-center gap-2">
                                {t('contact.send')}
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    {/* Map */}
                    <div className="rounded-[32px] overflow-hidden shadow-lg border border-slate-100 h-full min-h-[500px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.0264091699655!2d39.649484199999996!3d24.484541800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbfbf520eb221%3A0x6cbe02899b0ab174!2z2LTYsdmD2Kkg2LnZgtin2Kgg2KfZhNiz2K3ZitmF2Yog2YTZhNmF2K3Yp9mF2KfYqSDZiNin2YTYp9iz2KrYtNin2LHYp9iqINin2YTZgtin2YbZiNmG2YrYqQ!5e0!3m2!1sen!2ssa!4v1771191250373!5m2!1sen!2ssa"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Error/Contact Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setShowModal(false)}
                            className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} p-2 text-slate-400 hover:text-navy-900 hover:bg-slate-100 rounded-full transition-all`}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">{t('contact.modal.title')}</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            {t('contact.modal.desc')}
                        </p>
                        <div className="flex flex-col gap-3">
                            <a
                                href="https://wa.me/966553300581"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
                            >
                                <MessageSquare className="w-5 h-5" />
                                {t('contact.modal.whatsapp')}
                            </a>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                            >
                                {t('contact.modal.close')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContactSection;
