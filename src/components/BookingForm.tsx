
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Video, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

interface BookingFormProps {
  onSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<'In-Person' | 'Online'>('In-Person');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const morningSlots = ['08:00 ص', '09:00 ص', '10:00 ص', '11:00 ص', '12:00 م'];
  const eveningSlots = ['04:00 م', '05:00 م', '06:00 م', '07:00 م', '08:00 م', '09:00 م'];

  useEffect(() => {
    if (morningSlots.includes(time)) {
      setType('In-Person');
    }
  }, [time]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  const isMorning = morningSlots.includes(time);

  return (
    <div id="booking-section" className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[600px]">
      {/* الجانب الأيمن: معلومات */}
      <div className="md:w-1/3 bg-navy-950 p-10 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-gold-500/20">
            <Calendar className="w-8 h-8 text-navy-950" />
          </div>
          <h3 className="text-3xl font-serif font-bold text-gold-500 mb-4">احجز استشارتك القانونية</h3>
          <p className="text-slate-400 leading-relaxed font-light">نسعد بتقديم الدعم القانوني اللازم لك ولأعمالك عبر فريقنا المتخصص.</p>
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4 text-sm">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step >= 1 ? 'border-gold-500 bg-gold-500 text-navy-950' : 'border-slate-700 text-slate-500'}`}>١</div>
            <span className={step >= 1 ? 'text-white font-bold' : 'text-slate-500'}>الموعد والنوع</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step >= 2 ? 'border-gold-500 bg-gold-500 text-navy-950' : 'border-slate-700 text-slate-500'}`}>٢</div>
            <span className={step >= 2 ? 'text-white font-bold' : 'text-slate-500'}>البيانات الشخصية</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step >= 3 ? 'border-gold-500 bg-gold-500 text-navy-950' : 'border-slate-700 text-slate-500'}`}>٣</div>
            <span className={step >= 3 ? 'text-white font-bold' : 'text-slate-500'}>التأكيد النهائي</span>
          </div>
        </div>
      </div>

      {/* الجانب الأيسر: النموذج */}
      <div className="md:w-2/3 p-10 bg-white">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="space-y-6">
              <label className="text-xl font-bold text-navy-900 block border-r-4 border-gold-500 pr-4">١. اختيار الموعد المناسب</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  type="date" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-gold-500 transition-all font-bold"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                <div className="grid grid-cols-2 gap-2">
                  {[...morningSlots.slice(0, 2), ...eveningSlots.slice(0, 2)].map(t => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`py-3 text-xs font-black rounded-xl border-2 transition-all ${
                        time === t 
                        ? 'bg-navy-900 text-gold-500 border-navy-900' 
                        : 'bg-white text-slate-400 border-slate-50 hover:border-gold-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                  <select 
                    onChange={(e) => setTime(e.target.value)}
                    className="col-span-2 py-3 bg-slate-50 text-slate-500 text-center text-xs font-bold rounded-xl border border-slate-100 outline-none"
                    value={time}
                  >
                    <option value="">بقية المواعيد...</option>
                    {[...morningSlots, ...eveningSlots].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {time && (
              <div className="space-y-4 pt-4 border-t border-slate-50">
                <p className="text-sm font-black text-navy-900">طريقة المقابلة:</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setType('In-Person')}
                    className={`flex-1 flex flex-col items-center gap-2 p-6 rounded-2xl border-2 transition-all ${
                      type === 'In-Person' ? 'bg-gold-50/50 border-gold-500 text-navy-900' : 'bg-white border-slate-100 text-slate-400'
                    }`}
                  >
                    <MapPin className="w-6 h-6" />
                    <span className="font-bold">حضور شخصي</span>
                  </button>
                  <button
                    disabled={isMorning}
                    onClick={() => setType('Online')}
                    className={`flex-1 flex flex-col items-center gap-2 p-6 rounded-2xl border-2 transition-all ${
                      type === 'Online' ? 'bg-gold-50/50 border-gold-500 text-navy-900' : isMorning ? 'bg-slate-50 text-slate-200 border-slate-50 cursor-not-allowed' : 'bg-white border-slate-100 text-slate-400'
                    }`}
                  >
                    <Video className="w-6 h-6" />
                    <span className="font-bold">عن بعد (أونلاين)</span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-8">
              <button
                disabled={!date || !time}
                onClick={handleNext}
                className="flex items-center gap-3 px-12 py-5 bg-navy-900 text-gold-500 rounded-2xl hover:bg-gold-800 disabled:opacity-20 transition-all font-black shadow-xl"
              >
                المتابعة للبيانات
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-left duration-500">
            <label className="text-xl font-bold text-navy-900 block border-r-4 border-gold-500 pr-4">٢. البيانات الشخصية</label>
            <div className="space-y-6">
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="الاسم الكامل"
                  className="w-full pr-14 pl-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-gold-500 font-bold"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="relative">
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                <input 
                  type="tel" 
                  placeholder="رقم الجوال"
                  className="w-full pr-14 pl-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-gold-500 font-bold text-left"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                <input 
                  type="email" 
                  placeholder="البريد الإلكتروني"
                  className="w-full pr-14 pl-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-gold-500 font-bold text-left"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-between pt-8">
              <button onClick={handleBack} className="font-bold text-slate-400 hover:text-navy-900">السابق</button>
              <button
                disabled={!formData.name || !formData.phone}
                onClick={handleNext}
                className="flex items-center gap-3 px-12 py-5 bg-navy-900 text-gold-500 rounded-2xl hover:bg-gold-800 disabled:opacity-20 transition-all font-black shadow-xl"
              >
                مراجعة الطلب
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in zoom-in duration-500">
            <label className="text-xl font-bold text-navy-900 block border-r-4 border-gold-500 pr-4">٣. مراجعة وتأكيد الحجز</label>
            <div className="bg-slate-50 p-8 rounded-[32px] border-2 border-slate-100 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-500 font-bold">التاريخ والوقت</span>
                <span className="text-navy-900 font-black">{date} | {time}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-500 font-bold">نوع الاستشارة</span>
                <span className="text-gold-600 font-black">{type === 'In-Person' ? 'حضور شخصي' : 'أونلاين'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">الاسم</span>
                <span className="text-navy-900 font-black">{formData.name}</span>
              </div>
            </div>
            <div className="flex justify-between pt-8">
              <button onClick={handleBack} className="font-bold text-slate-400 hover:text-navy-900">تعديل</button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center min-w-[240px] gap-3 px-12 py-6 bg-gold-600 text-white rounded-2xl hover:bg-gold-700 shadow-2xl shadow-gold-500/30 transition-all font-black text-xl"
              >
                {isSubmitting ? (
                  <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'تأكيد الحجز النهائي'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
