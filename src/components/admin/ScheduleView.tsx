import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Video, ChevronLeft, ChevronRight, RotateCcw, Plus, X, CheckCircle, XCircle, AlertCircle, Eye, Calendar, User, Phone, Mail, FileText, Briefcase } from 'lucide-react';
import { Booking } from '../../types';
import BookingDetailsModal from './BookingDetailsModal';

interface ScheduleViewProps {
    bookings: Booking[];
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ bookings, setBookings }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // null means "Upcoming" mode

    // Modal States
    const [showAddModal, setShowAddModal] = useState(false);
    const [actionModal, setActionModal] = useState<{ type: 'accept' | 'reject' | 'complete' | null, bookingId: string | null }>({ type: null, bookingId: null });
    const [rejectionReason, setRejectionReason] = useState('');
    const [viewModal, setViewModal] = useState<Booking | null>(null);

    // New Booking State
    const [newBooking, setNewBooking] = useState({
        clientName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        type: 'In-Person',
        serviceType: 'استشارة عامة',
        consultationTopic: '',
        details: ''
    });

    // Calendar Logic
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const isSameDay = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString();

    // Derived values
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const filteredBookings = useMemo(() => {
        if (selectedDate) {
            const selectedStr = selectedDate.toLocaleDateString('en-CA');
            return bookings.filter(b => b.date === selectedStr);
        } else {
            const today = new Date();
            const fiveDaysLater = new Date(today);
            fiveDaysLater.setDate(today.getDate() + 5);
            const todayStr = today.toLocaleDateString('en-CA');
            const maxStr = fiveDaysLater.toLocaleDateString('en-CA');
            return bookings.filter(b => b.date >= todayStr && b.date <= maxStr).sort((a, b) => a.date.localeCompare(b.date));
        }
    }, [selectedDate, bookings]);

    const hasEvents = (day: number) => {
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dateStr = checkDate.toLocaleDateString('en-CA');
        return bookings.some(b => b.date === dateStr);
    };

    // Handlers
    const handleDateClick = (day: number) => {
        setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    };

    const handleAddBooking = (e: React.FormEvent) => {
        e.preventDefault();
        const booking: any = {
            id: `new-${Date.now()}`,
            ...newBooking,
            status: 'Pending',
        };
        setBookings(prev => [...prev, booking]);
        setShowAddModal(false);
        setNewBooking({ clientName: '', email: '', phone: '', date: '', time: '', type: 'In-Person', serviceType: 'استشارة عامة', consultationTopic: '', details: '' });
    };

    const confirmAction = () => {
        if (!actionModal.bookingId) return;

        if (actionModal.type === 'accept') {
            setBookings(prev => prev.map(b => b.id === actionModal.bookingId ? { ...b, status: 'Confirmed' } : b));
        } else if (actionModal.type === 'reject') {
            setBookings(prev => prev.map(b => b.id === actionModal.bookingId ? { ...b, status: 'Rejected', notes: rejectionReason } : b));
        } else if (actionModal.type === 'complete') {
            setBookings(prev => prev.map(b => b.id === actionModal.bookingId ? { ...b, status: 'Completed' } : b));
        }

        if (viewModal && viewModal.id === actionModal.bookingId) {
            setViewModal(prev => prev ? ({ ...prev, status: actionModal.type === 'accept' ? 'Confirmed' : actionModal.type === 'reject' ? 'Rejected' : 'Completed' } as Booking) : null);
        }

        setActionModal({ type: null, bookingId: null });
        setRejectionReason('');
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-navy-900">جدول المواعيد</h2>
                    <p className="text-slate-400 mt-1">إدارة وتنظيم مواعيدك وجلساتك القانونية</p>
                </div>
                <div className="flex gap-3">
                    {selectedDate && (
                        <button
                            onClick={() => setSelectedDate(null)}
                            className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            عرض المواعيد القادمة
                        </button>
                    )}
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-5 py-2.5 bg-navy-900 text-gold-500 rounded-xl font-black hover:bg-navy-800 flex items-center gap-2 shadow-lg shadow-navy-900/20"
                    >
                        <Plus className="w-4 h-4" />
                        موعد جديد
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar Widget */}
                <div className="lg:col-span-1 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 h-fit">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-xl font-bold text-navy-900">
                            {currentDate.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })}
                        </span>
                        <div className="flex gap-2">
                            <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-navy-900"><ChevronRight className="w-5 h-5" /></button>
                            <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-navy-900"><ChevronLeft className="w-5 h-5" /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 text-center mb-4">
                        {['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map(d => (
                            <span key={d} className="text-xs font-bold text-slate-400 py-2">{d}</span>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
                        {Array.from({ length: daysInMonth }, (_, i) => {
                            const day = i + 1;
                            const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                            const isSelected = selectedDate && isSameDay(thisDate, selectedDate);
                            const isToday = isSameDay(thisDate, new Date());
                            const hasEvent = hasEvents(day);
                            return (
                                <button
                                    key={day}
                                    onClick={() => handleDateClick(day)}
                                    className={`
                                        w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all relative
                                        ${isSelected ? 'bg-navy-900 text-gold-500 shadow-lg scale-110' : 'hover:bg-slate-50 text-slate-600'}
                                        ${isToday && !isSelected ? 'border-2 border-gold-500 text-gold-600' : ''}
                                    `}
                                >
                                    {day}
                                    {hasEvent && !isSelected && <span className="absolute bottom-1.5 w-1 h-1 bg-gold-500 rounded-full" />}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <h4 className="font-bold text-navy-900 mb-4">
                            {selectedDate
                                ? `مواعيد ${selectedDate.toLocaleDateString('ar-SA', { day: 'numeric', month: 'long' })}`
                                : 'ملخص المواعيد القادمة'
                            }
                        </h4>
                        <div className="space-y-4">
                            {filteredBookings.length === 0 ? (
                                <p className="text-sm text-slate-400 text-center py-4">لا توجد مواعيد في هذه الفترة</p>
                            ) : (
                                <>
                                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <span className="text-sm font-bold text-slate-600">
                                            {filteredBookings.filter(b => b.status === 'Confirmed').length} مؤكدة
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                        <span className="text-sm font-bold text-slate-600">
                                            {filteredBookings.filter(b => b.status !== 'Confirmed' && b.status !== 'Rejected' && b.status !== 'Completed').length} قيد الانتظار
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Schedule List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-serif font-bold text-2xl text-navy-900">
                            {selectedDate ? 'مواعيد اليوم المحدد' : 'المواعيد القادمة (5 أيام)'}
                        </h3>
                        <span className="text-sm font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg">
                            {filteredBookings.length} موعد
                        </span>
                    </div>

                    {filteredBookings.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[32px] border border-slate-100 border-dashed">
                            <CalendarIcon className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold text-lg">لا توجد مواعيد لعرضها</p>
                        </div>
                    ) : (
                        filteredBookings.map((meeting: any) => (
                            <div key={meeting.id} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group animate-in slide-in-from-bottom-2 duration-300">
                                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl min-w-[100px] border border-slate-100 group-hover:border-gold-500/30 transition-colors">
                                    <span className="text-2xl font-black text-navy-900">{meeting.date.split('-')[2]}</span>
                                    <span className="text-xs font-bold text-slate-400">
                                        {new Date(meeting.date).toLocaleDateString('ar-SA', { month: 'short' })}
                                    </span>
                                </div>

                                <div className="flex-1 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-lg font-black text-navy-900">{meeting.clientName}</h4>
                                            <p className="text-sm text-slate-500 mt-1">{meeting.consultationTopic || meeting.serviceType || 'استشارة'}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-black ${meeting.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                            meeting.status === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                                                meeting.status === 'Completed' ? 'bg-slate-100 text-slate-600' :
                                                    'bg-amber-100 text-amber-700'
                                            }`}>
                                            {meeting.status === 'Confirmed' ? 'مؤكد' : meeting.status === 'Rejected' ? 'مرفوض' : meeting.status === 'Completed' ? 'منتهي' : 'انتظار'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 pt-2 border-t border-slate-50">
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                            <Clock className="w-4 h-4 text-gold-600" />
                                            {meeting.time}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                            {meeting.type === 'Online' ? (
                                                <><Video className="w-4 h-4 text-blue-500" /> اجتماع عن بعد</>
                                            ) : (
                                                <><MapPin className="w-4 h-4 text-navy-500" /> المكتب الرئيسي</>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col justify-center gap-2 border-t md:border-t-0 md:border-r border-slate-100 pt-4 md:pt-0 md:pr-4">
                                    <button
                                        onClick={() => setViewModal(meeting)}
                                        className="p-2 text-navy-600 hover:bg-navy-50 rounded-xl transition-colors" title="عرض التفاصيل"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Appointment Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={() => setShowAddModal(false)} />
                    <div className="relative bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom-8 duration-500 border-t-8 border-gold-500 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-serif font-bold text-navy-900">حجز موعد جديد</h3>
                            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-6 h-6 text-slate-400" /></button>
                        </div>

                        <form onSubmit={handleAddBooking} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">اسم الموكل</label>
                                <input required value={newBooking.clientName} onChange={e => setNewBooking({ ...newBooking, clientName: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold" placeholder="الاسم الكامل" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">رقم الجوال</label>
                                    <input required type="tel" value={newBooking.phone} onChange={e => setNewBooking({ ...newBooking, phone: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold dir-ltr" placeholder="05xxxxxxxx" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
                                    <input required type="email" value={newBooking.email} onChange={e => setNewBooking({ ...newBooking, email: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold text-left dir-ltr" placeholder="client@mail.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">التاريخ</label>
                                    <input required type="date" value={newBooking.date} onChange={e => setNewBooking({ ...newBooking, date: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold text-right" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">الوقت</label>
                                    <input required type="time" value={newBooking.time} onChange={e => setNewBooking({ ...newBooking, time: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold text-right" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">نوع الموعد</label>
                                    <select value={newBooking.type} onChange={e => setNewBooking({ ...newBooking, type: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold">
                                        <option value="In-Person">حضوري</option>
                                        <option value="Online">أونلاين</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">نوع الاستشارة</label>
                                    <select value={newBooking.serviceType} onChange={e => setNewBooking({ ...newBooking, serviceType: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold">
                                        <option value="استشارة عامة">استشارة عامة</option>
                                        <option value="قانون الشركات">قانون الشركات</option>
                                        <option value="الأحوال الشخصية">الأحوال الشخصية</option>
                                        <option value="القانون الجنائي">القانون الجنائي</option>
                                        <option value="الملكية الفكرية">الملكية الفكرية</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">موضوع الاستشارة</label>
                                <input value={newBooking.consultationTopic} onChange={e => setNewBooking({ ...newBooking, consultationTopic: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold" placeholder="مثال: تأسيس شركة، حضانة، ... " />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">تفاصيل الاستشارة</label>
                                <textarea value={newBooking.details} onChange={e => setNewBooking({ ...newBooking, details: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold h-24" placeholder="يرجى كتابة تفاصيل مختصرة عن الموضوع..." />
                            </div>

                            <button type="submit" className="w-full py-4 bg-navy-900 text-gold-500 rounded-xl font-black text-lg hover:bg-navy-800 transition-colors mt-4">
                                تأكيد الحجز
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Shared Booking Details Modal */}
            {viewModal && (
                <BookingDetailsModal
                    booking={viewModal}
                    onClose={() => setViewModal(null)}
                    onAction={(type, id) => setActionModal({ type, bookingId: id })}
                />
            )}

            {/* Action Confirmation Modal */}
            {actionModal.type && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={() => setActionModal({ type: null, bookingId: null })} />
                    <div className="relative bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex flex-col items-center text-center">
                            {actionModal.type === 'accept' || actionModal.type === 'complete' ? (
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                            ) : (
                                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6">
                                    <AlertCircle className="w-8 h-8" />
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-navy-900 mb-2">
                                {actionModal.type === 'accept' ? 'تأكيد قبول الموعد' :
                                    actionModal.type === 'complete' ? 'إنهاء الموعد' :
                                        'رفض الموعد'}
                            </h3>
                            <p className="text-slate-500 mb-6">
                                {actionModal.type === 'accept' ? 'هل أنت متأكد من رغبتك في قبول هذا الموعد وتأكيده؟' :
                                    actionModal.type === 'complete' ? 'هل تم الانتهاء من هذا الموعد بنجاح؟ سيتم أرشفته كمنتهي.' :
                                        'يرجى تحديد سبب الرفض لإشعار العميل.'}
                            </p>

                            {actionModal.type === 'reject' && (
                                <textarea
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl mb-6 outline-none focus:border-rose-500 min-h-[100px] font-bold text-sm"
                                    placeholder="سبب الرفض (اختياري)..."
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                />
                            )}

                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={confirmAction}
                                    className={`flex-1 py-3 rounded-xl font-black text-white transition-colors ${actionModal.type === 'accept' || actionModal.type === 'complete' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                                        }`}
                                >
                                    {actionModal.type === 'accept' ? 'نعم، تأكيد' :
                                        actionModal.type === 'complete' ? 'نعم، إنهاء' :
                                            'تأكيد الرفض'}
                                </button>
                                <button
                                    onClick={() => setActionModal({ type: null, bookingId: null })}
                                    className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleView;
