import React from 'react';
import { Check, Shield, Star, Briefcase, Zap, Globe, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

const PackagesSection: React.FC = () => {
    const { translations, isAr } = useLanguage();
    const { packages } = translations;

    // Helper to get icon based on tier index or title
    const getIcon = (index: number) => {
        switch (index) {
            case 0: return <Briefcase className="w-6 h-6" />; // Labor
            case 1: return <Zap className="w-6 h-6" />; // Startup Basic
            case 2: return <Star className="w-6 h-6" />; // Startup Bronze
            case 3: return <Shield className="w-6 h-6" />; // Medium Silver
            case 4: return <Globe className="w-6 h-6" />; // Medium Gold
            case 5: return <Star className="w-6 h-6 fill-current" />; // Large Diamond
            default: return <Briefcase className="w-6 h-6" />;
        }
    };

    return (
        <section id="packages" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6 leading-tight">
                        {packages.sectionTitle}
                    </h2>
                    <p className="text-xl text-slate-500 leading-relaxed">
                        {packages.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.tiers.map((tier: any, index: number) => (
                        <div
                            key={index}
                            className="bg-white rounded-[32px] p-8 border border-slate-200 transition-all duration-300 hover:border-gold-500 hover:shadow-xl hover:-translate-y-2 flex flex-col h-full"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-navy-50 text-navy-900 rounded-2xl flex items-center justify-center">
                                    {getIcon(index)}
                                </div>
                                <h3 className="text-xl font-serif font-bold text-navy-900">{tier.title}</h3>
                            </div>

                            <div className="mb-8 pb-8 border-b border-slate-100">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-navy-900">{tier.price}</span>
                                    <span className="text-sm font-bold text-slate-500">{packages.currency}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-400">/ {packages.period}</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm">
                                        <Check className="w-5 h-5 shrink-0 text-gold-500" />
                                        <span className="font-medium leading-relaxed text-slate-600">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/contact"
                                className="w-full py-4 bg-navy-900 text-white rounded-xl font-black text-center block transition-all hover:bg-gold-500 hover:text-navy-900 mt-auto"
                            >
                                {packages.subscribe}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Flexible Package Callout */}
                <div className="mt-16 bg-navy-900 rounded-[32px] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                            <rect width="100" height="100" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
                            <MessageSquare className="w-10 h-10 text-gold-500" />
                        </div>
                        <h3 className="text-3xl md:text-5xl font-serif font-bold">{packages.flexible.title}</h3>
                        <p className="text-xl md:text-2xl font-light opacity-90 leading-relaxed text-slate-300">
                            {packages.flexible.desc}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <a
                                href="tel:0553300581"
                                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gold-500 text-navy-900 rounded-2xl font-black text-xl hover:bg-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                {packages.flexible.cta}
                            </a>
                            <a
                                href="https://wa.me/966553300581"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
                            >
                                {packages.flexible.subCta}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PackagesSection;
