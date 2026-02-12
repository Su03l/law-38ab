import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/public/logo.png';
import { useLanguage } from '../LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, toggleLang, isAr } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const headerClass = isHome && !isScrolled
    ? 'bg-transparent py-8'
    : 'bg-white/95 backdrop-blur-md shadow-xl py-3 border-b border-gold-500/10';

  const textClass = isHome && !isScrolled ? 'text-white' : 'text-navy-900';
  const navTextClass = isHome && !isScrolled ? 'text-slate-100' : 'text-navy-900';
  const logoTextClass = isHome && !isScrolled ? 'text-gold-400' : 'text-gold-600';

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const links = [
    { label: t('navbar.home'), href: '/' },
    { label: t('navbar.about'), href: '/#about' },
    { label: t('navbar.practiceAreas'), href: '/#practice-areas' },
    { label: t('navbar.blog'), href: '/#blog' },
    { label: t('navbar.packages'), href: '/#packages' },
    { label: t('navbar.contact'), href: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      if (href === '/' || href === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href.includes('#')) {
        const id = href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          /* 
             Using scrollIntoView directly can sometimes clash if layout shifts.
             Adding a small offset or verifying element position is sometimes safer.
             But the user just wants it to work "smoothly".
          */
          const offset = 80; // Adjust for fixed navbar height if needed
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${headerClass}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={logo} alt="شعار المكتب" className="w-20 h-20 object-contain -my-4" />
          <div className="flex flex-col">
            <span className={`text-2xl font-serif font-black tracking-tighter leading-tight ${textClass}`}>
              {t('navbar.companyName')}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${logoTextClass}`}>
              {t('navbar.companySubtitle')}
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {links.map(l => (
            <Link
              key={l.label}
              to={l.href}
              className={`text-sm font-black transition-all hover:text-gold-500 ${navTextClass}`}
              onClick={(e) => handleNavClick(e, l.href)}
            >
              {l.label}
            </Link>
          ))}
          <div className="h-6 w-px bg-slate-300 mx-2 opacity-30" />

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className={`flex items-center gap-2 text-xs font-black transition-all hover:opacity-80 px-3 py-2 rounded-lg border ${isHome && !isScrolled ? 'text-slate-200 border-white/20 hover:bg-white/10' : 'text-navy-900 border-navy-100 hover:bg-navy-50'}`}
          >
            <Globe className="w-4 h-4 text-gold-500" />
            {t('navbar.langToggle')}
          </button>

          <Link
            to="/admin/login"
            className={`flex items-center gap-2 text-xs font-black transition-all hover:opacity-80 ${isHome && !isScrolled ? 'text-slate-300' : 'text-navy-900'}`}
          >
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            {t('navbar.adminPortal')}
          </Link>
          <Link
            to="/booking"
            className={`px-8 py-3.5 rounded-xl font-black text-sm transition-all flex items-center gap-3 shadow-2xl ${isHome && !isScrolled
              ? 'bg-gold-500 text-navy-950 hover:bg-white hover:shadow-white/20'
              : 'bg-navy-900 text-gold-500 hover:shadow-gold-500/20'
              }`}
          >
            {t('navbar.bookConsultation')}
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-3 rounded-2xl border-2 transition-all ${isHome && !isScrolled ? 'border-white/10 text-white' : 'border-navy-100 text-navy-900'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[100px] bg-navy-950 z-[59] p-10 animate-in slide-in-from-right duration-500 overflow-y-auto">
          <div className="flex flex-col gap-8">
            {links.map(l => (
              <Link
                key={l.label}
                to={l.href}
                className="text-4xl font-bold text-white hover:text-gold-500 border-b border-white/5 pb-4"
                onClick={(e) => handleNavClick(e, l.href)}
              >
                {l.label}
              </Link>
            ))}

            {/* Mobile Language Toggle */}
            <button
              onClick={() => { toggleLang(); }}
              className="text-2xl font-bold text-gold-400 flex items-center gap-4"
            >
              <Globe className="w-8 h-8" />
              {t('navbar.langToggle')}
            </button>

            <Link
              to="/admin/login"
              className="text-2xl font-bold text-gold-400 flex items-center gap-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShieldCheck className="w-8 h-8" />
              {t('navbar.adminPortal')}
            </Link>
            <Link
              to="/booking"
              className="mt-6 px-10 py-6 bg-gold-500 text-navy-900 rounded-2xl font-black text-2xl text-center shadow-2xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navbar.bookConsultationNow')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
