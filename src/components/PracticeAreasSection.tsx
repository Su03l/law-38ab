import React from 'react';
import { PRACTICE_AREAS, IconMap } from '../constants';

const PracticeAreasSection: React.FC = () => {
    return (
        <section id="practice-areas" className="py-20 relative bg-navy-950 text-white">
            <div className="absolute top-0 inset-x-0 h-2 bg-gold-500" />
            <div className="container mx-auto px-6 text-center mb-20">
                <h2 className="text-6xl font-serif font-bold mb-6 italic">مجالات الاختصاص</h2>
                <div className="w-32 h-1.5 bg-gold-500 mx-auto rounded-full" />
                <p className="mt-8 text-xl text-slate-400 max-w-2xl mx-auto">خبرات قانونية متكاملة تغطي كافة احتياجاتك التجارية والشخصية.</p>
            </div>
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {PRACTICE_AREAS.map(area => (
                    <div key={area.id} className="group p-10 glass-card rounded-[40px] hover:bg-white/10 transition-all cursor-pointer border-t-2 border-transparent hover:border-gold-500 shadow-xl">
                        <div className="text-gold-500 mb-8 p-4 bg-white/5 inline-block rounded-2xl group-hover:bg-gold-500 group-hover:text-navy-900 transition-all">
                            {IconMap[area.iconName]}
                        </div>
                        <h3 className="text-3xl font-serif font-bold mb-4">{area.title}</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">{area.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PracticeAreasSection;
