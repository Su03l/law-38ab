import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, AlertCircle } from 'lucide-react';
import { usePackages } from '../../context/PackagesContext';
import Toast from './Toast';

const PackageManager: React.FC = () => {
    const { packages, addPackage, updatePackage, deletePackage } = usePackages();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<any | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Form State
    const [formData, setFormData] = useState({ title: '', price: '', features: '' });

    const openAddModal = () => {
        setEditingPackage(null);
        setFormData({ title: '', price: '', features: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (pkg: any) => {
        setEditingPackage(pkg);
        setFormData({
            title: pkg.title,
            price: pkg.price,
            features: pkg.features.join('\n')
        });
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.price || !formData.features) {
            setToast({ message: 'يرجى ملء جميع الحقول المطلوبة', type: 'error' });
            return;
        }

        const featuresList = formData.features.split('\n').filter(f => f.trim() !== '');

        if (editingPackage) {
            // Update
            updatePackage({
                ...editingPackage,
                title: formData.title,
                price: formData.price,
                features: featuresList
            });
            setToast({ message: 'تم تحديث الباقة بنجاح', type: 'success' });
        } else {
            // Add
            addPackage({
                title: formData.title,
                price: formData.price,
                features: featuresList
            });
            setToast({ message: 'تم إضافة الباقة الجديدة بنجاح', type: 'success' });
        }
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        if (deleteId) {
            deletePackage(deleteId);
            setDeleteId(null);
            setToast({ message: 'تم حذف الباقة بنجاح', type: 'success' });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-navy-900">إدارة الباقات</h2>
                    <p className="text-slate-400 mt-1">تخصيص باقات الخدمات والأسعار</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="px-6 py-3 bg-navy-900 text-gold-500 rounded-xl font-black hover:bg-navy-800 flex items-center gap-3 shadow-lg shadow-navy-900/20"
                >
                    <Plus className="w-5 h-5" />
                    باقة جديدة
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map(pkg => (
                    <div key={pkg.id} className="group bg-white rounded-[32px] p-8 border border-slate-200 transition-all duration-300 hover:border-gold-500 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full relative">

                        <div className="absolute top-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => openEditModal(pkg)}
                                className="p-2 bg-slate-100 rounded-xl text-navy-900 hover:text-gold-600 hover:bg-white border border-transparent hover:border-slate-200 shadow-sm"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setDeleteId(pkg.id)}
                                className="p-2 bg-rose-50 rounded-xl text-rose-500 hover:bg-rose-100 shadow-sm"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <h3 className="text-xl font-serif font-bold text-navy-900 mb-2 pr-2">{pkg.title}</h3>

                        <div className="mb-6 pb-6 border-b border-slate-100">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-navy-900">{pkg.price}</span>
                                <span className="text-xs font-bold text-slate-500">ريال</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-6 flex-1">
                            {pkg.features.slice(0, 5).map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm">
                                    <Check className="w-4 h-4 shrink-0 text-gold-500 mt-1" />
                                    <span className="font-medium text-slate-600 line-clamp-2">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                            {pkg.features.length > 5 && (
                                <li className="text-xs text-slate-400 font-bold pt-2">
                                    +{pkg.features.length - 5} مميزات إضافية...
                                </li>
                            )}
                        </ul>
                    </div>
                ))}

                {/* Add New Placeholder */}
                <button
                    onClick={openAddModal}
                    className="border-3 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-gold-500 hover:text-gold-600 hover:bg-gold-50/10 transition-all min-h-[350px]"
                >
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                        <Plus className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-lg">إضافة باقة جديدة</span>
                </button>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-serif font-bold text-navy-900">{editingPackage ? 'تعديل الباقة' : 'باقة جديدة'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">اسم الباقة</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold"
                                    placeholder="مثال: الباقة الذهبية..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">السعر (ريال)</label>
                                <input
                                    required
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold"
                                    placeholder="مثال: 5000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">المميزات (ميزة في كل سطر)</label>
                                <textarea
                                    required
                                    rows={6}
                                    value={formData.features}
                                    onChange={e => setFormData({ ...formData, features: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold text-sm"
                                    placeholder="- ميزة 1&#10;- ميزة 2&#10;- ميزة 3"
                                />
                            </div>
                            <button type="submit" className="w-full py-4 bg-navy-900 text-gold-500 rounded-xl font-black text-lg hover:bg-navy-800 transition-colors mt-4">
                                {editingPackage ? 'حفظ التعديلات' : 'إضافة الباقة'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={() => setDeleteId(null)} />
                    <div className="relative bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6">
                                <AlertCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-2">حذف الباقة</h3>
                            <p className="text-slate-500 mb-6">هل أنت متأكد من رغبتك في حذف هذه الباقة؟ لا يمكن التراجع عن هذا الإجراء.</p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-black hover:bg-rose-700 transition-colors"
                                >
                                    نعم، حذف
                                </button>
                                <button
                                    onClick={() => setDeleteId(null)}
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

export default PackageManager;
