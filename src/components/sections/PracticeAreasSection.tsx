import React from 'react';
import { Scale, ShieldCheck, Briefcase, Users, Landmark, Gavel, FileText, Building2, Globe2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const serviceIcons = [
    <Scale className="w-8 h-8" />,
    <ShieldCheck className="w-8 h-8" />,
    <FileText className="w-8 h-8" />,
    <Gavel className="w-8 h-8" />,
    <Briefcase className="w-8 h-8" />,
    <Building2 className="w-8 h-8" />,
    <Globe2 className="w-8 h-8" />,
    <Landmark className="w-8 h-8" />,
    <Users className="w-8 h-8" />,
];

const PracticeAreasSection: React.FC = () => {
    const { t, translations } = useLanguage();
    const serviceItems: { title: string; description: string }[] = translations?.services?.items || [];

    return (
        <section id="practice-areas" className="py-24 relative bg-navy-950 text-white overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
            <div className="container mx-auto px-6 text-center mb-20">
                <h2 className="text-6xl font-serif font-bold mb-6">{t('services.sectionTitle')}</h2>
                <div className="w-32 h-1.5 bg-gold-500 mx-auto rounded-full" />
                <p className="mt-8 text-xl text-slate-400 max-w-2xl mx-auto">{t('services.subtitle')}</p>
            </div>
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceItems.map((item, index) => (
                    <div key={index} className="group p-8 glass-card rounded-[32px] hover:bg-white/5 transition-all duration-300 cursor-pointer border border-white/5 hover:border-gold-500/50 shadow-lg hover:shadow-gold-500/10 hover:-translate-y-2">
                        <div className="text-gold-500 mb-8 p-4 bg-white/5 inline-block rounded-2xl group-hover:bg-gold-500 group-hover:text-navy-900 transition-all">
                            {serviceIcons[index] || <Scale className="w-8 h-8" />}
                        </div>
                        <h3 className="text-3xl font-serif font-bold mb-4">{item.title}</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PracticeAreasSection;
