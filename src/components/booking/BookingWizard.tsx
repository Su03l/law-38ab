import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Video, MapPin, ChevronRight, ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

import { useLanguage } from '../../context/LanguageContext';

interface BookingWizardProps {
    onSuccess: () => void;
}

const BookingWizard: React.FC<BookingWizardProps> = ({ onSuccess }) => {
    const { t, isAr } = useLanguage();
    const [step, setStep] = useState(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState<'In-Person' | 'Online'>('In-Person');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        notes: '',
        serviceType: '',  // New Field
        consultationTopic: '' // New Field
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Time slots logic
    const morningSlots = [
        '10:00 ص', '10:30 ص',
        '11:00 ص', '11:30 ص',
        '12:00 م', '12:30 م',
        '01:00 م', '01:30 م',
        '02:00 م', '02:30 م',
        '03:00 م', '03:30 م'
    ];
    const eveningSlots = [
        '04:00 م', '04:30 م',
        '05:00 م', '05:30 م',
        '06:00 م', '06:30 م',
        '07:00 م', '07:30 م',
        '08:00 م', '08:30 م',
        '09:00 م', '09:30 م',
        '10:00 م'
    ];

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('bookings')
                .insert([
                    {
                        client_name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        notes: formData.notes,
                        date: date,
                        time: time,
                        type: type,

                        service_type: formData.serviceType, // Map to DB column
                        consultation_topic: formData.consultationTopic, // Map to DB column
                        status: 'Pending'
                    }
                ]);

            if (error) throw error;

            onSuccess();
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('حدث خطأ أثناء حجز الموعد. يرجى المحاولة مرة أخرى.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isEvening = eveningSlots.includes(time);

    // Auto-set type based on time
    useEffect(() => {
        if (isEvening) {
            setType('Online');
        } else if (time && morningSlots.includes(time)) {
            // Optional: Reset to default if switching back to morning, or keep user selection
            // For now, let's not force In-Person for morning, let user choose.
        }
    }, [time, isEvening]);


    return (
        <div className="max-w-5xl mx-auto min-h-[700px] flex flex-col md:flex-row bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden font-sans" dir={isAr ? 'rtl' : 'ltr'}>

            {/* Sidebar / Header Area */}
            <div className="md:w-1/3 bg-navy-950 p-10 flex flex-col justify-between text-white relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-800/50 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-gold-500/20">
                        <Calendar className="w-8 h-8 text-navy-950" />
                    </div>

                    <h2 className="text-sm font-bold text-gold-500 uppercase tracking-widest mb-3">{t('booking.title')}</h2>
                    <h3 className="text-3xl font-serif font-bold text-white mb-6 leading-tight">{t('booking.subtitle')}</h3>
                    <p className="text-slate-400 leading-relaxed font-light text-sm whitespace-pre-line">
                        {t('booking.desc')}
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
                            <span className={`text-sm font-bold transition-colors ${step >= 1 ? 'text-white' : 'text-slate-500'}`}>{t('booking.steps.1')}</span>
                            {step === 1 && <span className="text-[10px] text-gold-500 animate-pulse">{t('booking.stepStatus.1')}</span>}
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
                            <span className={`text-sm font-bold transition-colors ${step >= 2 ? 'text-white' : 'text-slate-500'}`}>{t('booking.steps.2')}</span>
                            {step === 2 && <span className="text-[10px] text-gold-500 animate-pulse">{t('booking.stepStatus.2')}</span>}
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
                            <span className={`text-sm font-bold transition-colors ${step >= 3 ? 'text-white' : 'text-slate-500'}`}>{t('booking.steps.3')}</span>
                            {step === 3 && <span className="text-[10px] text-gold-500 animate-pulse">{t('booking.stepStatus.3')}</span>}
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
                                <h2 className="text-2xl font-serif font-bold text-navy-900 mb-2">{t('booking.step1.title')}</h2>
                                <p className="text-slate-500 text-sm">{t('booking.step1.subtitle')}</p>
                            </div>

                            <div className="space-y-6 flex-1">
                                {/* Date Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy-900">{t('booking.step1.dateLabel')}</label>
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
                                    <label className="text-sm font-bold text-navy-900">{t('booking.step1.timeLabel')}</label>
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
                                            <option value="" disabled>{t('booking.step1.moreSlots')}</option>
                                            {[...morningSlots, ...eveningSlots].map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Type Selection */}
                                {time && (
                                    <div className="pt-6 border-t border-slate-100 animate-in fade-in">
                                        <label className="text-sm font-bold text-navy-900 mb-3 block">{t('booking.step1.typeLabel')}</label>
                                        <div className="flex gap-4">
                                            <button
                                                disabled={isEvening}
                                                onClick={() => setType('In-Person')}
                                                className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${type === 'In-Person'
                                                    ? 'bg-gold-50 border-gold-500 text-navy-900'
                                                    : isEvening
                                                        ? 'bg-slate-50 border-slate-50 text-slate-300 cursor-not-allowed'
                                                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                                    }`}
                                                title={isEvening ? 'غير متاح للمواعيد المسائية' : ''}
                                            >
                                                <MapPin className="w-5 h-5" />
                                                <span className="font-bold text-sm">{t('booking.step1.inPerson')}</span>
                                            </button>
                                            <button
                                                onClick={() => setType('Online')}
                                                className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${type === 'Online'
                                                    ? 'bg-gold-50 border-gold-500 text-navy-900'
                                                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                                    }`}
                                            >
                                                <Video className="w-5 h-5" />
                                                <span className="font-bold text-sm">{t('booking.step1.online')}</span>
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
                                    {t('booking.step1.next')}
                                    {isAr ? (
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    ) : (
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}


                    {/* STEP 2: PERSONAL INFO */}
                    {step === 2 && (
                        <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-8">
                                <h2 className="text-2xl font-serif font-bold text-navy-900 mb-2">{t('booking.step2.title')}</h2>
                                <p className="text-slate-500 text-sm">{t('booking.step2.subtitle')}</p>
                            </div>

                            <div className="space-y-5 flex-1">
                                <div className="group">
                                    <label className="text-sm font-bold text-navy-900 mb-1.5 block">{t('booking.step2.nameLabel')}</label>
                                    <div className="relative">
                                        <User className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-gold-500 transition-colors`} />
                                        <input
                                            type="text"
                                            placeholder={t('booking.step2.namePlaceholder')}
                                            className={`w-full ${isAr ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:bg-white transition-all font-medium`}
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-sm font-bold text-navy-900 mb-1.5 block">{t('booking.step2.phoneLabel')}</label>
                                    <div className="relative">
                                        <Phone className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-gold-500 transition-colors`} />
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
                                    <label className="text-sm font-bold text-navy-900 mb-1.5 block">{t('booking.step2.emailLabel')}</label>
                                    <div className="relative">
                                        <Mail className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-gold-500 transition-colors`} />
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

                                {/* New Fields: Service Type & Topic */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="group">
                                        <label className="text-sm font-bold text-navy-900 mb-1.5 block">{t('booking.step2.serviceTypeLabel')}</label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:bg-white transition-all font-medium appearance-none cursor-pointer"
                                                value={formData.serviceType}
                                                onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                                            >
                                                <option value="" disabled>{t('booking.step2.serviceTypePlaceholder')}</option>
                                                <option value="استشارة عامة">{t('booking.step2.serviceTypes.general')}</option>
                                                <option value="قضايا تجارية">{t('booking.step2.serviceTypes.commercial')}</option>
                                                <option value="قضايا عمالية">{t('booking.step2.serviceTypes.labor')}</option>
                                                <option value="قضايا جنائية">{t('booking.step2.serviceTypes.criminal')}</option>
                                                <option value="قضايا أحوال شخصية">{t('booking.step2.serviceTypes.personal')}</option>
                                                <option value="صياغة عقود">{t('booking.step2.serviceTypes.contracts')}</option>
                                                <option value="أخرى">{t('booking.step2.serviceTypes.other')}</option>
                                            </select>
                                            <ChevronLeft className={`absolute ${isAr ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none`} />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="text-sm font-bold text-navy-900 mb-1.5 block">{t('booking.step2.topicLabel')}</label>
                                        <input
                                            type="text"
                                            placeholder={t('booking.step2.topicPlaceholder')}
                                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:bg-white transition-all font-medium"
                                            value={formData.consultationTopic}
                                            onChange={e => setFormData({ ...formData, consultationTopic: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-sm font-bold text-navy-900 mb-1.5 block">{t('booking.step2.notesLabel')}</label>
                                    <textarea
                                        rows={3}
                                        placeholder={t('booking.step2.notesPlaceholder')}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold-500 focus:bg-white transition-all font-medium resize-none"
                                        value={formData.notes}
                                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-center">
                                <button onClick={handleBack} className="text-slate-400 font-bold hover:text-navy-900 transition-colors">{t('booking.step2.back')}</button>
                                <button
                                    disabled={!formData.name || !formData.phone || !formData.serviceType}
                                    onClick={handleNext}
                                    className="group flex items-center gap-2 px-8 py-4 bg-navy-900 text-white rounded-xl font-bold hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-navy-900/10"
                                >
                                    {t('booking.step2.next')}
                                    {isAr ? (
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    ) : (
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}


                    {/* STEP 3: CONFIRMATION */}
                    {step === 3 && (
                        <div className="flex-1 flex flex-col animate-in zoom-in duration-300">
                            <div className="mb-8">
                                <h2 className="text-2xl font-serif font-bold text-navy-900 mb-2">{t('booking.step3.title')}</h2>
                                <p className="text-slate-500 text-sm">{t('booking.step3.subtitle')}</p>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                                    <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gold-500 shadow-sm">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold mb-1">{t('booking.step3.dateLabel')}</p>
                                            <p className="text-navy-900 font-black text-lg">{date}</p>
                                            <p className="text-gold-600 font-bold text-sm">{time}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold mb-1">{t('booking.step3.typeLabel')}</p>
                                            <div className="flex items-center gap-2 text-navy-900 font-bold">
                                                {type === 'In-Person' ? <MapPin className="w-4 h-4 text-gold-500" /> : <Video className="w-4 h-4 text-gold-500" />}
                                                {type === 'In-Person' ? t('booking.step1.inPerson') : t('booking.step1.online')}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold mb-1">{t('booking.step3.clientLabel')}</p>
                                            <p className="text-navy-900 font-bold truncate">{formData.name}</p>
                                        </div>
                                    </div>

                                    {/* Confirmation Extra Details */}
                                    <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold mb-1">{t('booking.step3.fieldLabel')}</p>
                                            <p className="text-navy-900 font-bold">{formData.serviceType || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold mb-1">{t('booking.step3.topicLabel')}</p>
                                            <p className="text-navy-900 font-bold truncate">{formData.consultationTopic || '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gold-50/50 p-4 rounded-xl border border-gold-100 text-sm text-gold-800 leading-relaxed">
                                    {t('booking.step3.agreement')}
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-center">
                                <button onClick={handleBack} className="text-slate-400 font-bold hover:text-navy-900 transition-colors">{t('booking.step3.back')}</button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="group flex items-center gap-3 px-10 py-4 bg-gold-500 text-navy-950 rounded-xl font-black hover:bg-gold-400 disabled:opacity-70 disabled:cursor-wait transition-all shadow-xl shadow-gold-500/20 text-lg"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
                                            {t('booking.step3.processing')}
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            {t('booking.step3.confirm')}
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
