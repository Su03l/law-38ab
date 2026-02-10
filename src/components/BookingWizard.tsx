import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Video, MapPin, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';

interface BookingWizardProps {
    onSuccess: () => void;
}

const BookingWizard: React.FC<BookingWizardProps> = ({ onSuccess }) => {
    const [step, setStep] = useState(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState<'In-Person' | 'Online'>('In-Person');
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', notes: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Time slots logic
    const morningSlots = ['08:00 ص', '09:00 ص', '10:00 ص', '11:00 ص', '12:00 م'];
    const eveningSlots = ['04:00 م', '05:00 م', '06:00 م', '07:00 م', '08:00 م', '09:00 م'];

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            onSuccess();
        }, 1500);
    };

    const isMorning = morningSlots.includes(time);

    // Auto-set type based on time
    useEffect(() => {
        if (isMorning) setType('In-Person');
    }, [time, isMorning]);


    return (
        <div className="max-w-5xl mx-auto min-h-[700px] flex flex-col md:flex-row bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden font-sans" dir="rtl">

            {/* Sidebar / Header Area */}
            <div className="md:w-1/3 bg-navy-950 p-10 flex flex-col justify-between text-white relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-800/50 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-gold-500/20">
                        <Calendar className="w-8 h-8 text-navy-950" />
                    </div>

                    <h2 className="text-sm font-bold text-gold-500 uppercase tracking-widest mb-3">ابدأ رحلتك القانونية</h2>
                    <h3 className="text-3xl font-serif font-bold text-white mb-6 leading-tight">الخطوة الأولى نحو حماية حقوقك تبدأ من هنا.</h3>
                    <p className="text-slate-400 leading-relaxed font-light text-sm">
                        احجز استشارتك القانونية
                        <br />
                        نسعد بتقديم الدعم القانوني اللازم لك ولأعمالك عبر فريقنا المتخصص.
                    </p>
                </div>

                {/* Stepper */}
                <div className="relative z-10 space-y-8 mt-12">
                    {/* Step 1 */}
                    <div className="flex items-center gap-4 group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= 1 ? 'border-gold-500 bg-gold-500 text-navy-950 shadow-gold-500/20 shadow-lg' : 'border-slate-700 text-slate-500'
                            }`}>
                            {step > 1 ? <CheckCircle className="w-6 h-6" /> : <span className="font-bold font-serif">١</span>}
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-sm font-bold transition-colors ${step >= 1 ? 'text-white' : 'text-slate-500'}`}>الموعد والنوع</span>
                            {step === 1 && <span className="text-[10px] text-gold-500 animate-pulse">جاري الاختيار...</span>}
                        </div>
                    </div>

                    {/* Line Connector */}
                    <div className={`absolute right-5 top-10 w-0.5 h-8 -z-10 bg-slate-800 ${step > 1 ? 'bg-gold-500' : ''}`} />

                    {/* Step 2 */}
                    <div className="flex items-center gap-4 group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= 2 ? 'border-gold-500 bg-gold-500 text-navy-950 shadow-gold-500/20 shadow-lg' : 'border-slate-700 text-slate-500'
                            }`}>
                            {step > 2 ? <CheckCircle className="w-6 h-6" /> : <span className="font-bold font-serif">٢</span>}
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-sm font-bold transition-colors ${step >= 2 ? 'text-white' : 'text-slate-500'}`}>البيانات الشخصية</span>
                            {step === 2 && <span className="text-[10px] text-gold-500 animate-pulse">جاري الإدخال...</span>}
                        </div>
                    </div>

                    {/* Line Connector */}
                    <div className={`absolute right-5 top-[108px] w-0.5 h-8 -z-10 bg-slate-800 ${step > 2 ? 'bg-gold-500' : ''}`} />

                    {/* Step 3 */}
                    <div className="flex items-center gap-4 group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= 3 ? 'border-gold-500 bg-gold-500 text-navy-950 shadow-gold-500/20 shadow-lg' : 'border-slate-700 text-slate-500'
                            }`}>
                            <span className="font-bold font-serif">٣</span>
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-sm font-bold transition-colors ${step >= 3 ? 'text-white' : 'text-slate-500'}`}>التأكيد النهائي</span>
                            {step === 3 && <span className="text-[10px] text-gold-500 animate-pulse">المرحلة الأخيرة</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="md:w-2/3 p-10 bg-white relative">
                <div className="max-w-lg mx-auto h-full flex flex-col">

                    {/* STEP 1: DATE & TIME */}
                    {step === 1 && (
                        <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-8">
                                <h2 className="text-2xl font-serif font-bold text-navy-900 mb-2">١. اختيار الموعد المناسب</h2>
                                <p className="text-slate-500 text-sm">يرجى تحديد التاريخ والوقت المفضل لاستشارتك.</p>
                            </div>

                            <div className="space-y-6 flex-1">
                                {/* Date Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy-900">تاريخ الاستشارة</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all font-bold text-navy-900"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>

                                {/* Time Slots */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy-900">الوقت المتاح</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[...morningSlots.slice(0, 3), ...eveningSlots.slice(0, 3)].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setTime(t)}
                                                className={`py-3 px-2 text-sm font-bold rounded-xl border transition-all ${time === t
                                                        ? 'bg-navy-900 text-gold-500 border-navy-900 shadow-lg'
                                                        : 'bg-white text-slate-500 border-slate-200 hover:border-gold-300 hover:bg-gold-50/10'
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                    {/* More Slots Dropdown */}
                                    <div className="pt-2">
                                        <select
                                            onChange={(e) => setTime(e.target.value)}
                                            className="w-full py-3 px-4 bg-slate-50 text-slate-600 font-bold rounded-xl border border-slate-200 outline-none focus:border-gold-500 transition-all text-center text-sm appearance-none cursor-pointer hover:bg-slate-100"
                                            value={morningSlots.slice(0, 3).includes(time) || eveningSlots.slice(0, 3).includes(time) ? '' : time}
                                        >
                                            <option value="" disabled>عرض بقية المواعيد المتاحة...</option>
                                            {[...morningSlots, ...eveningSlots].map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Type Selection */}
                                {time && (
                                    <div className="pt-6 border-t border-slate-100 animate-in fade-in">
                                        <label className="text-sm font-bold text-navy-900 mb-3 block">نوع الحضور</label>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setType('In-Person')}
                                                className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${type === 'In-Person' ? 'bg-gold-50 border-gold-500 text-navy-900' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                                    }`}
                                            >
                                                <MapPin className="w-5 h-5" />
                                                <span className="font-bold text-sm">حضور شخصي</span>
                                            </button>
                                            <button
                                                disabled={isMorning} // Disabled for morning slots as implied by previous logic
                                                onClick={() => setType('Online')}
                                                className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${type === 'Online'
                                                        ? 'bg-gold-50 border-gold-500 text-navy-900'
                                                        : isMorning
                                                            ? 'bg-slate-50 border-slate-50 text-slate-300 cursor-not-allowed'
                                                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                                    }`}
                                                title={isMorning ? 'غير متاح للفترات الصباحية' : ''}
                                            >
                                                <Video className="w-5 h-5" />
                                                <span className="font-bold text-sm">عن بعد (أونلاين)</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    disabled={!date || !time}
                                    onClick={handleNext}
                                    className="group flex items-center gap-2 px-8 py-4 bg-navy-900 text-white rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-navy-900/10"
                                >
                                    المتابعة للبيانات
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}


                    {/* STEP 2: PERSONAL INFO */}
                    {step === 2 && (
                        <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-8">
                                <h2 className="text-2xl font-serif font-bold text-navy-900 mb-2">٢. البيانات الشخصية</h2>
                                <p className="text-slate-500 text-sm">يرجى إدخال معلومات التواصل الخاصة بك.</p>
                            </div>

                            <div className="space-y-5 flex-1">
                                <div className="group">
                                    <label className="text-sm font-bold text-navy-900 mb-1.5 block">الاسم الكامل</label>
                                    <div className="relative">
                                        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-gold-500 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="الاسم الثلاثي"
                                            className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:bg-white transition-all font-medium"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-sm font-bold text-navy-900 mb-1.5 block">رقم الجوال</label>
                                    <div className="relative">
                                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-gold-500 transition-colors" />
                                        <input
                                            type="tel"
                                            placeholder="05xxxxxxxx"
                                            className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:bg-white transition-all font-medium text-left"
                                            dir="ltr"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-sm font-bold text-navy-900 mb-1.5 block">البريد الإلكتروني</label>
                                    <div className="relative">
                                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-gold-500 transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="name@example.com"
                                            className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:bg-white transition-all font-medium text-left"
                                            dir="ltr"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-sm font-bold text-navy-900 mb-1.5 block">ملاحظات إضافية (اختياري)</label>
                                    <textarea
                                        rows={3}
                                        placeholder="نبذة مختصرة عن موضوع الاستشارة..."
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:bg-white transition-all font-medium resize-none"
                                        value={formData.notes}
                                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-center">
                                <button onClick={handleBack} className="text-slate-400 font-bold hover:text-navy-900 transition-colors">عودة للخلف</button>
                                <button
                                    disabled={!formData.name || !formData.phone}
                                    onClick={handleNext}
                                    className="group flex items-center gap-2 px-8 py-4 bg-navy-900 text-white rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-navy-900/10"
                                >
                                    مراجعة وتأكيد
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}


                    {/* STEP 3: CONFIRMATION */}
                    {step === 3 && (
                        <div className="flex-1 flex flex-col animate-in zoom-in duration-300">
                            <div className="mb-8">
                                <h2 className="text-2xl font-serif font-bold text-navy-900 mb-2">3. التأكيد النهائي</h2>
                                <p className="text-slate-500 text-sm">يرجى مراجعة تفاصيل الحجز قبل الاعتماد.</p>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                                    <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gold-500 shadow-sm">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold mb-1">الموعد المحدد</p>
                                            <p className="text-navy-900 font-black text-lg">{date}</p>
                                            <p className="text-gold-600 font-bold text-sm">{time}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold mb-1">نوع الاستشارة</p>
                                            <div className="flex items-center gap-2 text-navy-900 font-bold">
                                                {type === 'In-Person' ? <MapPin className="w-4 h-4 text-gold-500" /> : <Video className="w-4 h-4 text-gold-500" />}
                                                {type === 'In-Person' ? 'حضور شخصي' : 'أونلاين'}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold mb-1">صاحب الطلب</p>
                                            <p className="text-navy-900 font-bold truncate">{formData.name}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gold-50/50 p-4 rounded-xl border border-gold-100 text-sm text-gold-800 leading-relaxed">
                                    بالضغط على تأكيد الحجز، فإنك توافق على سياسة الخصوصية وشروط الخدمة الخاصة بشركة عقاب السحيمي للمحاماة.
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-center">
                                <button onClick={handleBack} className="text-slate-400 font-bold hover:text-navy-900 transition-colors">تعديل البيانات</button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="group flex items-center gap-3 px-10 py-4 bg-gold-500 text-navy-950 rounded-xl font-black hover:bg-gold-400 disabled:opacity-70 disabled:cursor-wait transition-all shadow-xl shadow-gold-500/20 text-lg"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
                                            جاري المعالجة...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            تأكيد الحجز
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default BookingWizard;
