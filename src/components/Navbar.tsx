import React, { useState, useEffect } from 'react';
import { Scale, Menu, X, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force background if not on home page
  const isHome = location.pathname === '/';
  const headerClass = isHome && !isScrolled
    ? 'bg-transparent py-8'
    : 'bg-white/95 backdrop-blur-md shadow-xl py-3 border-b border-gold-500/10';

  const textClass = isHome && !isScrolled ? 'text-white' : 'text-navy-900';
  const navTextClass = isHome && !isScrolled ? 'text-slate-100' : 'text-navy-900';
  const logoBoxClass = isHome && !isScrolled ? 'bg-gold-500 text-navy-950 shadow-xl' : 'bg-navy-900 text-gold-500 shadow-lg';
  const logoTextClass = isHome && !isScrolled ? 'text-gold-400' : 'text-gold-600';

  const links = [
    { label: 'الرئيسية', href: '/' },
    { label: 'عن المكتب', href: '/about' },
    { label: 'تخصصاتنا', href: '/practice-areas' },
    { label: 'المدونة', href: '/blog' },
    { label: 'تواصل معنا', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${headerClass}`} dir="rtl">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className={`p-2.5 rounded-2xl transition-all duration-500 ${logoBoxClass}`}>
            <Scale className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-serif font-black tracking-tighter leading-tight ${textClass}`}>
              شركة عقاب السحيمي
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${logoTextClass}`}>
              للمحاماة والاستشارات
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
            >
              {l.label}
            </Link>
          ))}
          <div className="h-6 w-px bg-slate-300 mx-2 opacity-30" />
          <Link
            to="/admin/login"
            className={`flex items-center gap-2 text-xs font-black transition-all hover:opacity-80 ${isHome && !isScrolled ? 'text-slate-300' : 'text-navy-900'}`}
          >
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            بوابة المسئول
          </Link>
          <Link
            to="/booking"
            className={`px-8 py-3.5 rounded-xl font-black text-sm transition-all flex items-center gap-3 shadow-2xl ${isHome && !isScrolled
              ? 'bg-gold-500 text-navy-950 hover:bg-white hover:shadow-white/20'
              : 'bg-navy-900 text-gold-500 hover:shadow-gold-500/20'
              }`}
          >
            احجز استشارتك
            <ArrowLeft className="w-4 h-4" />
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
                className="text-4xl font-serif font-bold text-white hover:text-gold-500 border-b border-white/5 pb-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="text-2xl font-bold text-gold-400 flex items-center gap-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShieldCheck className="w-8 h-8" />
              بوابة المسئول
            </Link>
            <Link
              to="/booking"
              className="mt-6 px-10 py-6 bg-gold-500 text-navy-900 rounded-2xl font-black text-2xl text-center shadow-2xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              احجز استشارتك الآن
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
