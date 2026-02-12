import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X, Target, Lightbulb, Shield, Award } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import founderImg from '@/public/FOUNDER.png';

const AboutSection: React.FC = () => {
    const { t } = useLanguage();

    const stats = [
        { label: t('about.stat1Label'), sub: t('about.stat1Sub') },
        { label: t('about.stat2Label'), sub: t('about.stat2Sub') },
        { label: t('about.stat3Label'), sub: t('about.stat3Sub') },
    ];

    return (
        <>
            {/* Founder Section */}
            <section id="founder" className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-4xl font-serif font-bold text-navy-900 mb-6">{t('about.founderTitle')}</h2>
                            <div className="w-20 h-1.5 bg-gold-500 mb-8 rounded-full" />
                            <p className="text-lg text-slate-600 leading-loose text-justify text-lg">
                                {t('about.founderBio')}
                            </p>
                        </div>
                        <div className="order-1 lg:order-2 flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gold-500/10 rounded-3xl transform rotate-6 scale-95" />
                                <img
                                    src={founderImg}
                                    alt={t('about.founderTitle')}
                                    className="relative w-full max-w-md rounded-3xl shadow-2xl object-cover aspect-[3/4]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About / Who We Are */}
            <section id="about" className="py-24 container mx-auto px-6 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl" />
                        <h2 className="text-5xl font-serif font-bold text-navy-900 mb-8 leading-tight">{t('about.sectionTitle')}</h2>
                        <p className="text-xl text-slate-600 leading-loose mb-10 text-justify">
                            {t('about.description')}
                        </p>
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

            {/* Goals Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500/10 rounded-2xl mb-6">
                            <Target className="w-8 h-8 text-gold-600" />
                        </div>
                        <h2 className="text-5xl font-serif font-bold text-navy-900 mb-6">{t('goals.sectionTitle')}</h2>
                    </div>
                    <p className="text-xl text-slate-600 leading-loose max-w-4xl mx-auto text-center">
                        {t('goals.description')}
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-serif font-bold text-navy-900 mb-6">{t('values.sectionTitle')}</h2>
                        <div className="w-32 h-1.5 bg-gold-500 mx-auto rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Responsibility */}
                        <div className="p-10 bg-slate-50 rounded-[32px] text-center hover:shadow-2xl transition-all border border-slate-100 group hover:border-gold-500/30">
                            <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-500 transition-all">
                                <Shield className="w-8 h-8 text-gold-600 group-hover:text-navy-900 transition-all" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">{t('values.responsibility.title')}</h3>
                            <p className="text-slate-600 leading-relaxed">{t('values.responsibility.description')}</p>
                        </div>
                        {/* Innovation */}
                        <div className="p-10 bg-slate-50 rounded-[32px] text-center hover:shadow-2xl transition-all border border-slate-100 group hover:border-gold-500/30">
                            <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-500 transition-all">
                                <Lightbulb className="w-8 h-8 text-gold-600 group-hover:text-navy-900 transition-all" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">{t('values.innovation.title')}</h3>
                            <p className="text-slate-600 leading-relaxed">{t('values.innovation.description')}</p>
                        </div>
                        {/* Professionalism */}
                        <div className="p-10 bg-slate-50 rounded-[32px] text-center hover:shadow-2xl transition-all border border-slate-100 group hover:border-gold-500/30">
                            <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-500 transition-all">
                                <Award className="w-8 h-8 text-gold-600 group-hover:text-navy-900 transition-all" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">{t('values.professionalism.title')}</h3>
                            <p className="text-slate-600 leading-relaxed">{t('values.professionalism.description')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutSection;
