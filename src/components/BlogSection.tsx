import React, { useState } from 'react';
import { ArrowLeft, X, Clock, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const BlogSection: React.FC = () => {
    const [modalContent, setModalContent] = useState<{ title: string, content: React.ReactNode } | null>(null);

    const openBlogModal = (post: any) => {
        setModalContent({
            title: post.title,
            content: (
                <div className="space-y-6">
                    <img src={post.imageUrl} className="w-full h-64 object-cover rounded-3xl mb-6 shadow-xl" alt="" />
                    <div className="flex items-center gap-6 text-sm text-slate-400 font-bold mb-6">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 دقائق قراءة</span>
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                    </div>
                    <div className="text-slate-600 leading-loose space-y-4">
                        <p className="font-bold text-navy-900 text-lg">مقدمة في أهمية هذا التحديث القانوني:</p>
                        <p>{post.excerpt} هذا المقال يستعرض بالتفصيل أبعاد الأنظمة الجديدة وتأثيرها المباشر على الأفراد والمؤسسات. وفقاً لآخر التحديثات الصادرة من الجهات التنظيمية، فإن هذه التغييرات تتطلب مراجعة دقيقة لكافة العقود والاتفاقيات القائمة لضمان الامتثال الكامل.</p>
                        <p>نحن في مكتب العدل والبيان نقوم حالياً بإعداد تقارير مخصصة لعملائنا لمواكبة هذه التعديلات بكفاءة عالية وتفادي أي مخاطر قانونية محتملة.</p>
                    </div>
                </div>
            )
        });
    };

    return (
        <section id="blog" className="py-20 container mx-auto px-6 bg-white">
            {/* Modal */}
            {modalContent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md transition-opacity" onClick={() => setModalContent(null)} />
                    <div className="relative bg-white rounded-[40px] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="px-10 py-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
                            <h3 className="text-2xl font-serif font-bold text-navy-900 leading-tight">{modalContent.title}</h3>
                            <button onClick={() => setModalContent(null)} className="p-3 bg-white rounded-2xl hover:bg-slate-100 transition-all shadow-sm">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                        <div className="p-10 overflow-y-auto custom-scrollbar">
                            {modalContent.content}
                        </div>
                        <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 text-center shrink-0">
                            <button onClick={() => setModalContent(null)} className="px-8 py-3 bg-navy-900 text-gold-500 rounded-xl font-black transition-all hover:bg-navy-800">إغلاق النافذة</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-6 mb-20 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-right">
                    <h2 className="text-5xl font-serif font-bold text-navy-900 mb-4">آفاق قانونية</h2>
                    <p className="text-slate-500 text-xl font-light">تحليلات معمقة ورؤى قانونية من نخبة خبرائنا القانونيين.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {BLOG_POSTS.map(post => (
                    <div key={post.id} className="group flex flex-col bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all">
                        <div className="h-72 overflow-hidden">
                            <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                        </div>
                        <div className="p-10 flex-1 flex flex-col">
                            <span className="text-sm font-black text-gold-600 mb-4 inline-block">{post.date}</span>
                            <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-gold-600 transition-colors leading-tight">{post.title}</h3>
                            <p className="text-slate-600 leading-loose mb-8 flex-1">{post.excerpt}</p>
                            <button
                                onClick={() => openBlogModal(post)}
                                className="text-navy-900 font-black text-lg flex items-center gap-3"
                            >
                                اقرأ المقال <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
