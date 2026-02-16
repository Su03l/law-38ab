import React from 'react';
import {
    LayoutDashboard,
    Calendar,
    Settings,
    LogOut,
    UserPlus,
    FileText,
    Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    adminProfile: { name: string; role: string } | null;
}

export const NAV_ITEMS = [
    { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
    { id: 'schedule', label: 'جدول المواعيد', icon: Calendar },
    { id: 'employees', label: 'الموظفين', icon: UserPlus },
    { id: 'blog', label: 'المدونة', icon: FileText },
    { id: 'packages', label: 'الباقات', icon: Briefcase },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({
    activeTab,
    setActiveTab,
    mobileMenuOpen,
    setMobileMenuOpen,
    adminProfile
}) => {
    const navigate = useNavigate();

    return (
        <>
            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-navy-950/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 right-0 z-50 w-72 bg-navy-950 text-white flex flex-col shadow-2xl transition-transform duration-300 lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } lg:static lg:h-auto lg:min-h-screen`}
            >
                <div className="p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-navy-950 font-black text-2xl">ع</div>
                        <span className="text-2xl font-serif font-bold tracking-tight">إدارة العدل</span>
                    </div>

                    {/* Admin Profile Widget */}
                    {adminProfile && (
                        <div className="bg-navy-900/50 p-4 rounded-2xl flex items-center gap-3 border border-navy-800">
                            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold text-lg text-white">
                                {adminProfile.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-white truncate">{adminProfile.name}</p>
                                <p className="text-xs text-gold-500 truncate">{adminProfile.role}</p>
                            </div>
                        </div>
                    )}
                </div>

                <nav className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-lg ${activeTab === item.id
                                ? 'bg-gold-500/20 text-gold-500 shadow-inner shadow-gold-500/20'
                                : 'text-white/70 hover:bg-navy-900/50 hover:text-white'
                                } `}
                        >
                            <item.icon className="w-6 h-6" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-navy-900 mt-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-lg text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 group"
                    >
                        <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        تسجيل الخروج
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
