import React from 'react';
import { X, Calendar, Clock, Video, MapPin, Briefcase, User, Phone, Mail, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Booking } from '../../types';

interface BookingDetailsModalProps {
    booking: Booking;
    onClose: () => void;
    onAction: (type: 'accept' | 'reject' | 'complete', bookingId: string) => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, onClose, onAction }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={onClose} />
            <div className="relative bg-white rounded-[40px] p-0 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-300 border-t-8 border-gold-500 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center p-8 bg-white border-b border-slate-100">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-navy-900">تفاصيل الحجز</h3>
                        <p className="text-slate-400 mt-1">مراجعة بيانات الموعد والحالة</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 rounded-xl text-sm font-black ${booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : booking.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : booking.status === 'Completed' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-700'}`}>
                            {booking.status === 'Confirmed' ? 'مؤكد' : booking.status === 'Rejected' ? 'مرفوض' : booking.status === 'Completed' ? 'منتهي' : 'قيد الانتظار'}
                        </span>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
                    </div>
                </div>

                <div className="p-8 bg-slate-50 max-h-[70vh] overflow-y-auto">

                    {/* Section 1: Appointment Details */}
                    <div className="mb-8 p-6 bg-white rounded-[24px] border border-slate-200">
                        <h4 className="flex items-center gap-2 text-lg font-bold text-navy-900 mb-6 border-b border-slate-100 pb-4">
                            <span className="w-8 h-8 rounded-full bg-gold-500 text-white flex items-center justify-center text-sm">1</span>
                            تفاصيل الموعد
                        </h4>

                        <div className="space-y-6">
                            {/* Client Info */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-navy-900 text-gold-500 rounded-full flex items-center justify-center text-2xl font-black">
                                    {(booking.clientName || 'C').charAt(0)}
                                </div>
                                <div>
                                    <h5 className="text-xl font-black text-navy-900">{booking.clientName}</h5>
                                    <p className="text-slate-400 font-bold dir-ltr text-right">{booking.email}</p>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">التاريخ</label>
                                    <div className="text-lg font-black text-navy-900">{booking.date}</div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">الوقت</label>
                                    <div className="text-lg font-black text-navy-900">{booking.time}</div>
                                </div>
                            </div>

                            {/* Types */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">النوع</label>
                                    <div className="flex items-center gap-2 font-bold text-navy-900">
                                        {booking.type === 'Online' ? <Video className="w-4 h-4 text-blue-500" /> : <MapPin className="w-4 h-4 text-navy-900" />}
                                        {booking.type === 'Online' ? 'أونلاين (عن بعد)' : 'حضوري (المكتب)'}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1">نوع الاستشارة</label>
                                    <div className="flex items-center gap-2 font-bold text-navy-900">
                                        <Briefcase className="w-4 h-4 text-gold-500" />
                                        {booking.serviceType || 'غير محدد'}
                                    </div>
                                </div>
                            </div>

                            {/* Topic */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1">موضوع الاستشارة</label>
                                <div className="text-lg font-black text-navy-900">{booking.consultationTopic || 'غير محدد'}</div>
                            </div>

                            {/* Status & Actions Inline */}
                            <div className="pt-4 border-t border-slate-100">
                                <label className="block text-xs font-bold text-slate-400 mb-2">الإجراءات المتاحة</label>
                                <div className="flex flex-wrap gap-3">
                                    {booking.status === 'Pending' ? (
                                        <>
                                            <button onClick={() => onAction('accept', booking.id)} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 flex items-center gap-2 shadow-lg shadow-emerald-600/20">
                                                <CheckCircle className="w-4 h-4" /> قبول الموعد
                                            </button>
                                            <button onClick={() => onAction('reject', booking.id)} className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 flex items-center gap-2 shadow-lg shadow-rose-600/20">
                                                <AlertCircle className="w-4 h-4" /> رفض
                                            </button>
                                        </>
                                    ) : booking.status === 'Confirmed' ? (
                                        <button onClick={() => onAction('complete', booking.id)} className="px-6 py-2.5 bg-navy-900 text-gold-500 rounded-xl font-bold hover:bg-navy-800 flex items-center gap-2 shadow-lg shadow-navy-900/20">
                                            <CheckCircle className="w-4 h-4" /> إنهاء الموعد (تم الحضور)
                                        </button>
                                    ) : (
                                        <span className="text-sm font-bold text-slate-400 italic">لا توجد إجراءات متاحة لهذا الطلب</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Personal Data & Details */}
                    <div className="p-6 bg-white rounded-[24px] border border-slate-200">
                        <h4 className="flex items-center gap-2 text-lg font-bold text-navy-900 mb-6 border-b border-slate-100 pb-4">
                            <span className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center text-sm">2</span>
                            البيانات الشخصية و التفاصيل
                        </h4>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2">رقم الجوال</label>
                                    <div className="p-3 bg-slate-50 rounded-xl font-bold text-navy-900 border border-slate-100 dir-ltr text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            {booking.phone || 'غير متوفر'}
                                            <Phone className="w-4 h-4 text-slate-400" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2">البريد الإلكتروني</label>
                                    <div className="p-3 bg-slate-50 rounded-xl font-bold text-navy-900 border border-slate-100 dir-ltr text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            {booking.email}
                                            <Mail className="w-4 h-4 text-slate-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2">تفاصيل الاستشارة</label>
                                <div className="p-4 bg-slate-50 rounded-xl font-bold text-navy-900 border border-slate-100 min-h-[80px] whitespace-pre-wrap flex items-start gap-2">
                                    <FileText className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
                                    {booking.details || 'لا توجد تفاصيل إضافية'}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookingDetailsModal;
