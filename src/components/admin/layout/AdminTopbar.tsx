import React from 'react';
import { Menu, Plus } from 'lucide-react';

interface AdminTopbarProps {
    title: string;
    onMenuClick: () => void;
    onAddStaffClick: () => void;
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({ title, onMenuClick, onAddStaffClick }) => {
    return (
        <header className="p-6 bg-white flex items-center justify-between border-b border-slate-100 shadow-sm z-30 relative">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-serif font-bold text-navy-900">
                    {title}
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={onAddStaffClick}
                    className="flex items-center gap-3 px-6 py-3 bg-navy-900 text-gold-500 rounded-2xl hover:bg-navy-800 transition-all font-black shadow-lg shadow-navy-900/10"
                >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">إضافة موظف</span>
                </button>
            </div>
        </header>
    );
};

export default AdminTopbar;
