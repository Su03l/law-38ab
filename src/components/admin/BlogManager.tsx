import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Eye, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';
import Toast from './Toast';

const BlogManager: React.FC = () => {
    const { posts, addPost, updatePost, deletePost } = useBlog();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<any | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Form State
    const [formData, setFormData] = useState({ title: '', excerpt: '', imageUrl: '' });

    const openAddModal = () => {
        setEditingPost(null);
        setFormData({ title: '', excerpt: '', imageUrl: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (post: any) => {
        setEditingPost(post);
        setFormData({ title: post.title, excerpt: post.excerpt, imageUrl: post.imageUrl });
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.excerpt) {
            setToast({ message: 'يرجى ملء جميع الحقول المطلوبة', type: 'error' });
            return;
        }

        if (editingPost) {
            // Update
            updatePost({ ...editingPost, ...formData });
            setToast({ message: 'تم تحديث المقال بنجاح', type: 'success' });
        } else {
            // Add
            addPost({
                ...formData,
                imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80',
            });
            setToast({ message: 'تم نشر المقال الجديد بنجاح', type: 'success' });
        }
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        if (deleteId) {
            deletePost(deleteId);
            setDeleteId(null);
            setToast({ message: 'تم حذف المقال بنجاح', type: 'success' });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-navy-900">إدارة المدونة</h2>
                    <p className="text-slate-400 mt-1">نشر وتعديل المقالات والأخبار القانونية</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="px-6 py-3 bg-navy-900 text-gold-500 rounded-xl font-black hover:bg-navy-800 flex items-center gap-3 shadow-lg shadow-navy-900/20"
                >
                    <Plus className="w-5 h-5" />
                    مقال جديد
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <div key={post.id} className="group bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="h-48 overflow-hidden relative">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => openEditModal(post)}
                                    className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-navy-900 hover:text-gold-600 shadow-lg"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setDeleteId(post.id)}
                                    className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-rose-500 hover:bg-rose-50 shadow-lg"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <span className="absolute bottom-4 right-4 px-3 py-1 bg-navy-900/80 backdrop-blur-md text-white text-xs font-bold rounded-lg">
                                {post.date}
                            </span>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-serif font-bold text-navy-900 mb-3 line-clamp-2 leading-tight">{post.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                    <Eye className="w-4 h-4" />
                                    1.2k مشاهدة
                                </div>
                                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">منشور</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Draft / Add New Placeholder */}
                <button
                    onClick={openAddModal}
                    className="border-3 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-gold-500 hover:text-gold-600 hover:bg-gold-50/10 transition-all min-h-[400px]"
                >
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-lg">إضافة مقال جديد</span>
                </button>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-serif font-bold text-navy-900">{editingPost ? 'تعديل المقال' : 'نشر مقال جديد'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">عنوان المقال</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold"
                                    placeholder="عنوان جذاب للمقال..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">صورة المقال (اختياري)</label>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold text-left dir-ltr"
                                        placeholder="رابط الصورة (URL)..."
                                    />
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setFormData({ ...formData, imageUrl: reader.result as string });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="w-full px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-400 hover:border-gold-500 hover:text-gold-500 transition-colors">
                                            <ImageIcon className="w-5 h-5" />
                                            <span>أو اختر صورة من جهازك</span>
                                        </div>
                                    </div>
                                    {formData.imageUrl && (
                                        <div className="relative h-32 rounded-xl overflow-hidden border border-slate-200">
                                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                                className="absolute top-2 right-2 p-1 bg-white/90 rounded-lg text-rose-500 hover:bg-white"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">مقتطف قصير</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold text-sm"
                                    placeholder="اكتب ملخصاً للمقال..."
                                />
                            </div>
                            <button type="submit" className="w-full py-4 bg-navy-900 text-gold-500 rounded-xl font-black text-lg hover:bg-navy-800 transition-colors mt-4">
                                {editingPost ? 'حفظ التعديلات' : 'نشر المقال'}
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
                            <h3 className="text-xl font-bold text-navy-900 mb-2">حذف المقال</h3>
                            <p className="text-slate-500 mb-6">هل أنت متأكد من رغبتك في حذف هذا المقال النهائي؟ سيختفي من الموقع العام.</p>
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

export default BlogManager;
