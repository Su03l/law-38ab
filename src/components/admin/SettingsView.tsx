import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Smartphone, Save, ChevronLeft, Building, Mail, MapPin, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Toast from './Toast';

const SettingsView: React.FC = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [loading, setLoading] = useState(false);

    // Mock State for various settings
    const [general, setGeneral] = useState({
        siteName: 'شركة عقاب السحيمي للمحاماة',
        email: 'info@alsuhaimi-law.sa',
        phone: '+966 50 000 0000',
        address: 'الرياض، المملكة العربية السعودية',
        twitter: '@alsuhaimilaw',
    });

    const [profile, setProfile] = useState({
        name: 'عبدالله السحيمي',
        role: 'الشريك المدير',
        bio: 'محامٍ ومستشار قانوني بخبرة تتجاوز 15 عاماً في القضايا التجارية والجنائية. حاصل على الماجستير في القانون الدولي.',
        email: 'admin@lawfirm.sa',
    });

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        smsAlerts: false,
        weeklyReports: true,
        caseUpdates: true,
    });

    const [security, setSecurity] = useState({
        password: '',
        newPassword: '',
        twoFactor: false,
    });




    // Fetch Data on Load
    React.useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);

            // 1. Fetch User Profile
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileData) {
                    setProfile({
                        name: profileData.full_name || '',
                        role: profileData.role || '',
                        bio: profileData.bio || '',
                        email: user.email || ''
                    });
                }
            }

            // 2. Fetch Site Settings
            const { data: settingsData } = await supabase
                .from('site_settings')
                .select('*')
                .single(); // Assuming single row

            if (settingsData) {
                setGeneral({
                    siteName: settingsData.site_name || '',
                    email: settingsData.contact_email || '',
                    phone: settingsData.phone || '',
                    address: settingsData.address || '',
                    twitter: settingsData.twitter || ''
                });
            }

        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // 1. Save General Settings
            if (activeTab === 'general') {
                const { error } = await supabase
                    .from('site_settings')
                    .update({
                        site_name: general.siteName,
                        contact_email: general.email,
                        phone: general.phone,
                        address: general.address,
                        twitter: general.twitter,
                        updated_at: new Date()
                    })
                    .eq('id', true); // Singleton row

                if (error) throw error;
            }

            // 2. Save Profile Settings
            if (activeTab === 'profile') {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { error } = await supabase
                        .from('profiles')
                        .update({
                            full_name: profile.name,
                            role: profile.role,
                            bio: profile.bio
                        })
                        .eq('id', user.id);

                    if (error) throw error;
                }
            }

            // 3. Save Security (Placeholder for now)
            if (activeTab === 'security') {
                // Implement password change logic here if needed
                alert('تغيير كلمة المرور يتطلب واجهة خاصة (Reset Password Flow)');
            }

            setToast({ message: 'تم حفظ التغييرات بنجاح', type: 'success' });

        } catch (error) {
            console.error('Error saving settings:', error);
            setToast({ message: 'حدث خطأ أثناء الحفظ', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'general', label: 'عام', icon: Globe },
        { id: 'profile', label: 'الملف الشخصي', icon: User },
        { id: 'security', label: 'الأمان', icon: Shield },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto relative">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-navy-900">الإعدادات</h2>
                    <p className="text-slate-400 mt-1">تخصيص تفضيلات الحساب والنظام</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-8 py-3 bg-gold-500 text-navy-900 rounded-xl font-black hover:bg-gold-400 flex items-center gap-3 shadow-lg shadow-gold-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                    <Save className="w-5 h-5" />
                    {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>

            <div className="bg-white rounded-[40px] shadow-lg border border-slate-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-72 bg-slate-50 border-l border-slate-100 p-6 flex flex-col gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all text-right ${activeTab === tab.id
                                ? 'bg-white text-navy-900 shadow-md shadow-slate-200'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-navy-900'}`}
                        >
                            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-gold-500' : ''}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 md:p-10">

                    {/* General Settings */}
                    {activeTab === 'general' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Globe className="w-6 h-6" /></div>
                                <h3 className="text-xl font-bold text-navy-900">إعدادات الموقع العامة</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">اسم  الموقع / الشركة</label>
                                    <input
                                        value={general.siteName}
                                        onChange={e => setGeneral({ ...general, siteName: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-gold-500 outline-none font-bold"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600">البريد الإلكتروني للاتصال</label>
                                        <input
                                            value={general.email}
                                            onChange={e => setGeneral({ ...general, email: e.target.value })}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-gold-500 outline-none font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600">رقم الهاتف</label>
                                        <input
                                            value={general.phone}
                                            onChange={e => setGeneral({ ...general, phone: e.target.value })}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-gold-500 outline-none font-bold dir-ltr text-right"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">العنوان</label>
                                    <input
                                        value={general.address}
                                        onChange={e => setGeneral({ ...general, address: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-gold-500 outline-none font-bold"
                                        placeholder="المدينة، الدولة"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Profile Settings */}
                    {activeTab === 'profile' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><User className="w-6 h-6" /></div>
                                <h3 className="text-xl font-bold text-navy-900">الملف الشخصي</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">الاسم الكامل</label>
                                    <input
                                        value={profile.name}
                                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-gold-500 outline-none font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">المسمى الوظيفي</label>
                                    <input
                                        value={profile.role}
                                        onChange={e => setProfile({ ...profile, role: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-gold-500 outline-none font-bold"
                                    />
                                </div>
                                <div className="col-span-full space-y-2">
                                    <label className="text-sm font-bold text-slate-600">نبذة تعريفية</label>
                                    <textarea
                                        value={profile.bio}
                                        onChange={e => setProfile({ ...profile, bio: e.target.value })}
                                        rows={4}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-gold-500 outline-none font-bold resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-rose-50 rounded-2xl text-rose-600"><Shield className="w-6 h-6" /></div>
                                <h3 className="text-xl font-bold text-navy-900">الأمان والحماية</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-100">
                                    <h4 className="font-bold text-navy-900 mb-4">تغيير كلمة المرور</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="password"
                                            placeholder="كلمة المرور الحالية"
                                            className="w-full px-5 py-3 bg-white border border-rose-200/50 rounded-xl focus:border-rose-500 outline-none"
                                        />
                                        <input
                                            type="password"
                                            placeholder="كلمة المرور الجديدة"
                                            className="w-full px-5 py-3 bg-white border border-rose-200/50 rounded-xl focus:border-rose-500 outline-none"
                                        />
                                    </div>
                                    <button className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors text-sm">
                                        تحديث كلمة المرور
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-6 rounded-3xl border border-slate-200">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-slate-100 rounded-full text-slate-600">
                                            <Smartphone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-navy-900">المصادقة الثنائية (2FA)</h4>
                                            <p className="text-sm text-slate-500">طبقة حماية إضافية لحسابك</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
                                        className={`px-6 py-2 rounded-xl font-bold transition-all ${security.twoFactor
                                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                    >
                                        {security.twoFactor ? 'مفعل' : 'غير مفعل'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SettingsView;
