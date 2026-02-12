import React from 'react';
import { MapPin, Phone, Mail, Twitter, Instagram } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useLanguage } from '../../context/LanguageContext';

const Footer: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-navy-950 text-white py-24 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-2 bg-gold-500/10 rounded-xl">
                            <img src={logo} alt="شعار المكتب" className="w-12 h-12 object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-serif font-bold tracking-tighter">{t('navbar.companyName')}</span>
                            <span className="text-[10px] text-gold-500 font-bold uppercase tracking-[0.2em]">{t('navbar.companySubtitle')}</span>
                        </div>
                    </div>
                    <p className="text-slate-400 leading-loose mb-10 text-lg">
                        {t('footer.companyDesc')}
                    </p>

                </div>
                <div>
                    <h4 className="font-serif font-bold text-2xl mb-8 text-gold-500">{t('footer.quickLinks')}</h4>
                    <ul className="space-y-6 text-slate-400 font-medium">
                        <li><a href="/" className="hover:text-gold-500 transition-all block text-lg hover:translate-x-2 duration-300">{t('footer.home')}</a></li>
                        <li><a href="/about" className="hover:text-gold-500 transition-all block text-lg hover:translate-x-2 duration-300">{t('footer.aboutLink')}</a></li>
                        <li><a href="/practice-areas" className="hover:text-gold-500 transition-all block text-lg hover:translate-x-2 duration-300">{t('footer.areasLink')}</a></li>
                        <li><a href="/blog" className="hover:text-gold-500 transition-all block text-lg hover:translate-x-2 duration-300">{t('footer.blogLink')}</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-serif font-bold text-2xl mb-8 text-gold-500">{t('footer.contactUs')}</h4>
                    <ul className="space-y-6 text-slate-400 font-medium">
                        <li className="flex gap-4 items-start"><MapPin className="w-6 h-6 text-gold-500 shrink-0 mt-1" /> <span className="text-lg whitespace-pre-line">{t('contact.madinahAddress')}</span></li>
                        <li className="flex gap-4 items-center"><Phone className="w-6 h-6 text-gold-500 shrink-0" /> <span className="text-lg" dir="ltr">0148442230</span></li>
                        <li className="flex gap-4 items-center"><Phone className="w-6 h-6 text-gold-500 shrink-0" /> <span className="text-lg" dir="ltr">0553300581</span></li>
                        <li className="flex gap-4 items-center"><Mail className="w-6 h-6 text-gold-500 shrink-0" /> <span className="text-lg font-sans">info@oqab.sa</span></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-serif font-bold text-2xl mb-8 text-gold-500">{t('footer.followUs')}</h4>
                    <div className="flex flex-col gap-4">

                        <a href="https://twitter.com/law_oqab" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-gold-500 transition-colors">
                            <Twitter className="w-6 h-6" />
                            <span className="text-lg font-sans">@law_oqab</span>
                        </a>
                        <a href="https://instagram.com/law_oqab" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-gold-500 transition-colors">
                            <Instagram className="w-6 h-6" />
                            <span className="text-lg font-sans">@law_oqab</span>
                        </a>
                        <a href="https://tiktok.com/@law_oqab" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-gold-500 transition-colors">
                            <span className="w-6 h-6 flex items-center justify-center font-black text-xs border border-current rounded">tk</span>
                            <span className="text-lg font-sans">@law_oqab</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 pt-10 mt-20 border-t border-white/5 text-center text-slate-500 font-bold text-sm">
                {t('footer.copyright')}
            </div>
        </footer>
    );
};

export default Footer;
