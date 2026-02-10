import React, { useState } from 'react';
import { LayoutDashboard, Calendar, FileText, Settings, LogOut, Bell, Search, Plus, CheckCircle, XCircle, MoreVertical, UserPlus, Menu, X, Eye, AlertCircle } from 'lucide-react';
import { INITIAL_BOOKINGS, INITIAL_EMPLOYEES } from '../constants';
import { Booking, BookingStatus, Employee } from '../types';
import { useNavigate } from 'react-router-dom';
import ScheduleView from '../components/admin/ScheduleView';
import EmployeesView from '../components/admin/EmployeesView';
import BlogManager from '../components/admin/BlogManager';
import SettingsView from '../components/admin/SettingsView';
import BookingDetailsModal from '../components/admin/BookingDetailsModal';

// Helper to generate dynamic bookings (Moved here to share init)
const generateMockBookings = () => {
  // ... existing implementation ...
  const today = new Date();
  const bookings = [...INITIAL_BOOKINGS];

  // Add some specific bookings for the next few days to demonstrate functionality
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toLocaleDateString('en-CA'); // YYYY-MM-DD format

    if (i === 0) { // Today
      bookings.push({
        id: `mock-${i}`,
        clientName: 'شركة المستقبل',
        email: 'info@future.sa',
        phone: '0500000000',
        date: dateStr,
        time: '10:00 ص',
        type: 'In-Person',
        serviceType: 'قانون الشركات',
        consultationTopic: 'اجتماع مجلس الإدارة السنوي',
        details: 'تمثيل قانوني في اجتماع الجمعية العمومية.',
        status: 'Confirmed'
      });
    } else if (i === 2) { // Today + 2
      bookings.push({
        id: `mock-${i}`,
        clientName: 'خالد العمري',
        email: 'k.omari@mail.com',
        phone: '0599999999',
        date: dateStr,
        time: '01:30 م',
        type: 'Online',
        serviceType: 'استشارة عامة',
        consultationTopic: 'مراجعة عقد عمل',
        details: 'لدي استفسار بخصوص المادة 77 من نظام العمل.',
        status: 'Pending'
      });
    }
  }
  return bookings;
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState<Booking[]>(generateMockBookings());
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal States
  const [viewModal, setViewModal] = useState<Booking | null>(null);
  const [actionModal, setActionModal] = useState<{ type: 'accept' | 'reject' | 'complete' | null, bookingId: string | null }>({ type: null, bookingId: null });
  const [rejectionReason, setRejectionReason] = useState('');

  // Status Helpers
  const updateStatus = (id: string, newStatus: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const confirmAction = () => {
    if (!actionModal.bookingId) return;

    if (actionModal.type === 'accept') {
      updateStatus(actionModal.bookingId, 'Confirmed');
    } else if (actionModal.type === 'reject') {
      // In a real app we'd save the reason
      updateStatus(actionModal.bookingId, 'Rejected');
    } else if (actionModal.type === 'complete') {
      updateStatus(actionModal.bookingId, 'Completed');
    }

    // Update modal view if open
    if (viewModal && viewModal.id === actionModal.bookingId) {
      setViewModal(prev => prev ? ({ ...prev, status: actionModal.type === 'accept' ? 'Confirmed' : actionModal.type === 'reject' ? 'Rejected' : 'Completed' } as Booking) : null);
    }

    setActionModal({ type: null, bookingId: null });
    setRejectionReason('');
  };

  const getStatusStyle = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'Completed': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed': return 'مؤكد';
      case 'Rejected': return 'مرفوض';
      case 'Completed': return 'منتهي';
      default: return 'قيد المراجعة';
    }
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    // ... same as before
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;

    if (name && email && role) {
      const newEmployee: Employee = {
        id: Date.now().toString(),
        name,
        email,
        role,
        status: 'Active',
      };
      setEmployees([...employees, newEmployee]);
      setShowStaffModal(false);
    }
  };

  const todayStr = new Date().toLocaleDateString('en-CA');
  const confirmedTodayCount = bookings.filter(b => b.status === 'Confirmed' && b.date === todayStr).length;

  const stats = [
    { label: 'إجمالي الحجوزات', value: bookings.length, icon: Calendar, color: 'text-blue-600' },
    { label: 'طلبات معلقة', value: bookings.filter(b => b.status === 'Pending').length, icon: Bell, color: 'text-amber-600' },
    { label: 'مؤكدة اليوم', value: confirmedTodayCount, icon: CheckCircle, color: 'text-emerald-600' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <ScheduleView bookings={bookings} setBookings={setBookings} />;
      case 'employees':
        return <EmployeesView employees={employees} setEmployees={setEmployees} />;
      case 'blog':
        return <BlogManager />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="space-y-10 animate-in fade-in zoom-in duration-500">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map(s => (
                <div key={s.label} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-6 group hover:border-gold-500 transition-all">
                  <div className={`p-5 rounded-2xl bg-slate-50 ${s.color} group-hover:scale-110 transition-transform`}>
                    <s.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-slate-500 font-bold mb-1">{s.label}</p>
                    <p className="text-3xl font-black text-navy-900">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Latest Requests Table */}
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-2xl font-serif font-bold text-navy-900">أحدث طلبات الاستشارة</h3>
                <button className="text-sm font-black text-gold-600 hover:text-gold-700">تصدير التقارير (PDF)</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-8 py-5 text-sm font-black text-slate-500">الموكل</th>
                      <th className="px-8 py-5 text-sm font-black text-slate-500">الموعد</th>
                      <th className="px-8 py-5 text-sm font-black text-slate-500">النوع / الموضوع</th>
                      <th className="px-8 py-5 text-sm font-black text-slate-500">الحالة</th>
                      <th className="px-8 py-5 text-sm font-black text-slate-500 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.slice(0, 6).map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <p className="font-black text-navy-900 text-lg">{booking.clientName}</p>
                          <p className="text-sm text-slate-400 font-medium">{booking.email}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-navy-900 font-bold">{booking.date}</p>
                          <p className="text-sm text-gold-600 font-bold">{booking.time}</p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="space-y-1">
                            <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-black border ${booking.type === 'Online' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                              {booking.type === 'Online' ? 'أونلاين' : 'حضوري'}
                            </span>
                            <p className="text-sm font-bold text-navy-900 truncate max-w-[150px]">{booking.serviceType}</p>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-5 py-2 rounded-full text-xs font-black border ${getStatusStyle(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => setViewModal(booking)}
                              className="p-2 text-navy-600 hover:bg-navy-50 rounded-xl transition-all border border-transparent hover:border-navy-100"
                              title="عرض التفاصيل"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            {booking.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => setActionModal({ type: 'accept', bookingId: booking.id })}
                                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-emerald-200"
                                  title="تأكيد"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => setActionModal({ type: 'reject', bookingId: booking.id })}
                                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-200"
                                  title="رفض"
                                >
                                  <XCircle className="w-5 h-5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  const navItems = [
    { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
    { id: 'schedule', label: 'جدول المواعيد', icon: Calendar },
    { id: 'employees', label: 'الموظفين', icon: UserPlus },
    { id: 'blog', label: 'المدونة', icon: FileText },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-72 bg-navy-950 text-white flex flex-col shadow-2xl transition-transform duration-300 lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:static`}>
        <div className="p-10 flex items-center justify-between lg:justify-start gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-navy-950 font-black text-2xl">ع</div>
            <span className="text-2xl font-serif font-bold tracking-tight">إدارة العدل</span>
          </div>
        </div>
        <nav className="flex-1 px-6 py-8 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-lg ${activeTab === item.id
                ? 'bg-gold-500/20 text-gold-500 shadow-inner shadow-gold-500/20'
                : 'text-white/70 hover:bg-navy-900/50 hover:text-white'
                }`}
            >
              <item.icon className="w-6 h-6" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-navy-900">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-lg text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 group"
          >
            <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="p-6 bg-white flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-serif font-bold text-navy-900">
              {navItems.find(item => item.id === activeTab)?.label || 'نظرة عامة'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowStaffModal(true)}
              className="flex items-center gap-3 px-6 py-3 bg-navy-900 text-gold-500 rounded-2xl hover:bg-navy-800 transition-all font-black shadow-lg shadow-navy-900/10"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">إضافة موظف</span>
            </button>
          </div>
        </header>
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>

      {/* View Details Modal with Shared Component */}
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

      {/* Add Staff Modal */}
      {showStaffModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-[40px] shadow-2xl max-w-xl w-full relative">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-serif font-bold text-navy-900">إضافة موظف</h3>
              <button onClick={() => setShowStaffModal(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all"><XCircle className="w-7 h-7 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              {/* ... form content ... */}
              <div className="space-y-2">
                <label className="block text-sm font-black text-slate-700">الاسم الكامل</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="الاسم"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-gold-500 font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-black text-slate-700">البريد الإلكتروني المهني</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="lawyer@justicefirm.sa"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-gold-500 font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-black text-slate-700">كلمة المرور</label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-gold-500 font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-black text-slate-700">التخصص القضائي</label>
                <select name="role" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-gold-500 font-black">
                  <option value="محامي أول">محامي أول</option>
                  <option value="مستشار قانوني">مستشار قانوني</option>
                  <option value="مساعد قانوني">مساعد قانوني</option>
                  <option value="قانون الشركات">قانون الشركات</option>
                  <option value="القانون الجنائي">القانون الجنائي</option>
                  <option value="الملكية الفكرية">الملكية الفكرية</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-navy-900 text-gold-500 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-navy-800 mt-6 shadow-xl shadow-navy-900/20"
              >
                <UserPlus className="w-6 h-6" />
                إضافة
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
