import React, { useState, useEffect } from 'react';
import { Scale, Lock, Mail, AlertCircle, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Step 1: Verify Password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials' ? 'خطأ في البريد أو كلمة المرور' : err.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-6 relative overflow-hidden font-sans" dir="rtl">
      {/* خلفية فنية */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gold-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gold-500 rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-gold-500/30 rotate-3 transition-transform hover:rotate-12 cursor-pointer">
            <Scale className="w-10 h-10 text-navy-950 -rotate-3" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">بوابة المسئول</h1>
          <p className="text-slate-400 mt-3 text-lg font-light tracking-wide">العدل والبيان للمحاماة والاستشارات</p>
        </div>

        <div className="bg-white rounded-[40px] p-10 shadow-2xl border-t-8 border-gold-500">
          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <div className="p-5 bg-rose-50 border-r-4 border-rose-500 rounded-2xl flex items-center gap-4 text-rose-700 text-sm font-black animate-shake">
                <AlertCircle className="w-6 h-6 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-black text-navy-900 mr-1">البريد الإلكتروني المهني</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="partner@justicefirm.sa"
                    className="w-full pr-12 pl-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-gold-500 transition-all font-bold text-left"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-black text-navy-900 mr-1">كلمة المرور الآمنة</label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pr-12 pl-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-gold-500 transition-all font-bold text-left"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm font-bold">
              <label className="flex items-center gap-3 text-slate-500 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-gold-500 focus:ring-gold-500" />
                تذكر هويتي
              </label>
              <a href="#" className="text-gold-600 hover:text-gold-700">نسيت كلمة المرور؟</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-navy-900 text-gold-500 rounded-2xl font-black text-xl hover:bg-navy-800 transition-all flex items-center justify-center gap-4 group shadow-2xl shadow-navy-900/20"
            >
              {isLoading ? (
                <span className="w-6 h-6 border-3 border-gold-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  متابعة للتحقق
                  <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>


          <div className="mt-10 pt-8 border-t border-slate-100 text-center text-xs text-slate-400 leading-loose">
            نظام مكتب العدل والبيان الداخلي. <br />
            يمنع الدخول لغير الموظفين المصرح لهم.
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminLogin;
