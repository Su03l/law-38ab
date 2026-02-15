import React, { useState, useEffect } from 'react';
import { Scale, Lock, Mail, AlertCircle, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

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
        // Enforce 2FA: Sign out immediately so checking password doesn't leave a session
        await supabase.auth.signOut();

        // Step 2: Trigger OTP
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: false }
        });

        if (otpError) throw otpError;

        setStep('otp');
        setTimer(60); // 1 minute cooldown
      }
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials' ? 'خطأ في البريد أو كلمة المرور' : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) throw error;

      if (data.session) {
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError('الرمز المدخل غير صحيح أو انتهت صلاحيته');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false }
      });
      if (error) throw error;
      setTimer(60);
    } catch (err: any) {
      setError(err.message);
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
          {step === 'credentials' ? (
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
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-8 animate-in fade-in slide-in-from-right-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-navy-900" />
                </div>
                <h3 className="text-xl font-bold text-navy-900">التحقق الثنائي</h3>
                <p className="text-slate-500 text-sm mt-2">
                  تم إرسال رمز التحقق إلى بريدك الإلكتروني.
                  <br />
                  <span className="font-bold text-navy-700" dir="ltr">{email}</span>
                </p>
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm font-bold text-center">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <label className="block text-sm font-black text-navy-900 mr-1 text-center">رمز التحقق (OTP)</label>
                <input
                  type="text"
                  placeholder="------"
                  maxLength={8}
                  className="w-full py-4 text-center text-3xl tracking-[1em] bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-gold-500 transition-all font-black"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length < 6}
                className="w-full py-5 bg-navy-900 text-gold-500 rounded-2xl font-black text-xl hover:bg-navy-800 transition-all flex items-center justify-center gap-4 group shadow-2xl shadow-navy-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="w-6 h-6 border-3 border-gold-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  'تأكيد الدخول'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={timer > 0 || isLoading}
                  className="text-sm font-bold text-slate-400 hover:text-navy-900 disabled:text-slate-300 transition-colors"
                >
                  {timer > 0 ? `إعادة الإرسال بعد ${timer} ثانية` : 'إعادة إرسال الرمز'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => { setStep('credentials'); setError(''); }}
                className="w-full text-sm font-bold text-slate-400 hover:text-rose-500 transition-colors mt-4"
              >
                العودة لتسجيل الدخول
              </button>
            </form>
          )}

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
