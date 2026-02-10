import React from 'react';
import { Scale, MapPin, Phone, Mail, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-navy-950 text-white py-24">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-2 bg-gold-500/10 rounded-xl">
                            <Scale className="w-8 h-8 text-gold-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-serif font-bold tracking-tighter">شركة عقاب السحيمي</span>
                            <span className="text-[10px] text-gold-500 font-bold uppercase tracking-[0.2em]">للمحاماة والاستشارات</span>
                        </div>
                    </div>
                    <p className="text-slate-400 leading-loose mb-10 text-lg">
                        نحن نقدم حلولاً قانونية استثنائية لأكثر القضايا تعقيداً في المملكة العربية السعودية منذ عام ٢٠٠٩.
                    </p>
                    <div className="flex gap-6">
                        <Twitter className="w-6 h-6 text-slate-500 hover:text-gold-500 cursor-pointer transition-colors" />
                        <Linkedin className="w-6 h-6 text-slate-500 hover:text-gold-500 cursor-pointer transition-colors" />
                        <Instagram className="w-6 h-6 text-slate-500 hover:text-gold-500 cursor-pointer transition-colors" />
                    </div>
                </div>
                <div>
                    <h4 className="font-serif font-bold text-2xl mb-8 text-gold-500">روابط سريعة</h4>
                    <ul className="space-y-6 text-slate-400 font-medium">
                        <li><a href="/" className="hover:text-white transition-all block text-lg">الرئيسية</a></li>
                        <li><a href="/about" className="hover:text-white transition-all block text-lg">عن المكتب</a></li>
                        <li><a href="/practice-areas" className="hover:text-white transition-all block text-lg">مجالات الاختصاص</a></li>
                        <li><a href="/blog" className="hover:text-white transition-all block text-lg">المدونة القانونية</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-serif font-bold text-2xl mb-8 text-gold-500">تواصل معنا</h4>
                    <ul className="space-y-6 text-slate-400 font-medium">
                        <li className="flex gap-4 items-start"><MapPin className="w-6 h-6 text-gold-500 shrink-0 mt-1" /> <span className="text-lg">طريق الملك فهد، الرياض، المملكة العربية السعودية</span></li>
                        <li className="flex gap-4 items-center"><Phone className="w-6 h-6 text-gold-500 shrink-0" /> <span className="text-lg" dir="ltr">+966 11 555 0000</span></li>
                        <li className="flex gap-4 items-center"><Mail className="w-6 h-6 text-gold-500 shrink-0" /> <span className="text-lg font-sans">contact@justicefirm.sa</span></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-serif font-bold text-2xl mb-8 text-gold-500">النشرة البريدية</h4>
                    <p className="text-slate-500 mb-6 text-lg">اشترك ليصلك جديد الأنظمة واللوائح القانونية في المملكة.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="بريدك الإلكتروني" className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl flex-1 outline-none focus:border-gold-500 text-white placeholder:text-slate-600 transition-colors" />
                        <button className="bg-gold-500 text-navy-950 px-6 py-3 rounded-xl font-black transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20">اشترك</button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 pt-10 mt-20 border-t border-white/5 text-center text-slate-500 font-bold text-sm">
                جميع الحقوق محفوظة &copy; 2024 شركة عقاب السحيمي للمحاماة والاستشارات القانونية. ترخيص مزاولة المهنة رقم 44102
            </div>
        </footer>
    );
};

export default Footer;
