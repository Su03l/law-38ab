import React, { useState } from 'react';
import { Shield, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Employee } from '../../types';

interface EmployeesViewProps {
    employees: Employee[];
    setEmployees: (employees: Employee[]) => void;
}

const EmployeesView: React.FC<EmployeesViewProps> = ({ employees, setEmployees }) => {
    const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editEmployee) {
            try {
                // Update profile in DB
                const { error } = await supabase
                    .from('profiles')
                    .update({
                        full_name: editEmployee.name,
                        role: editEmployee.role
                        // status is not in our schema yet, we can add it or ignore it for now
                    })
                    .eq('id', editEmployee.id);

                if (error) throw error;

                setEmployees(employees.map(emp => emp.id === editEmployee.id ? editEmployee : emp));
                setEditEmployee(null);
                alert('تم تحديث البيانات بنجاح');
            } catch (error) {
                console.error('Error updating employee:', error);
                alert('حدث خطأ أثناء التحديث');
            }
        }
    };

    const handleDelete = async () => {
        if (deleteId) {
            try {
                // Call RPC to delete user from auth
                const { error } = await supabase.rpc('admin_delete_user', { user_id: deleteId });

                if (error) throw error;

                setEmployees(employees.filter(emp => emp.id !== deleteId));
                setDeleteId(null);
                alert('تم حذف الموظف بنجاح');
            } catch (error) {
                console.error('Error deleting employee:', error);
                alert('حدث خطأ أثناء الحذف');
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            <div>
                <h2 className="text-3xl font-serif font-bold text-navy-900">الموظفين</h2>
                <p className="text-slate-400 mt-1">إدارة فريق العمل والصلاحيات</p>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-8 py-5 text-sm font-black text-slate-500">الموظف</th>
                                <th className="px-8 py-5 text-sm font-black text-slate-500">الدور</th>
                                <th className="px-8 py-5 text-sm font-black text-slate-500">الحالة</th>
                                <th className="px-8 py-5 text-sm font-black text-slate-500 text-center">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {employees.map((employee) => (
                                <tr key={employee.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="font-black text-navy-900 text-lg">{employee.name}</p>
                                            <p className="text-sm text-slate-400 font-medium">{employee.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-gold-500" />
                                            <span className="text-navy-900 font-bold">{employee.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-2 rounded-xl text-xs font-black border-2 ${employee.status === 'Active'
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                            : 'bg-slate-50 text-slate-500 border-slate-100'
                                            }`}>
                                            {employee.status === 'Active' ? 'نشط' : 'غير نشط'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => setEditEmployee(employee)}
                                                className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-200"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setDeleteId(employee.id)}
                                                className="p-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-200"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {editEmployee && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={() => setEditEmployee(null)} />
                    <div className="relative bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-serif font-bold text-navy-900">تعديل بيانات الموظف</h3>
                            <button onClick={() => setEditEmployee(null)} className="p-2 hover:bg-slate-100 rounded-xl">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">الاسم</label>
                                <input
                                    value={editEmployee.name}
                                    onChange={e => setEditEmployee({ ...editEmployee, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">الدور</label>
                                <select
                                    value={editEmployee.role}
                                    onChange={e => setEditEmployee({ ...editEmployee, role: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold"
                                >
                                    <option value="محامي أول">محامي أول</option>
                                    <option value="مستشار قانوني">مستشار قانوني</option>
                                    <option value="مساعد قانوني">مساعد قانوني</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">الحالة</label>
                                <select
                                    value={editEmployee.status}
                                    onChange={e => setEditEmployee({ ...editEmployee, status: e.target.value as 'Active' | 'Inactive' })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-gold-500 outline-none font-bold"
                                >
                                    <option value="Active">نشط</option>
                                    <option value="Inactive">غير نشط</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full py-4 bg-navy-900 text-gold-500 rounded-xl font-black text-lg hover:bg-navy-800 transition-colors mt-4">
                                حفظ التغييرات
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
                            <h3 className="text-xl font-bold text-navy-900 mb-2">حذف الموظف</h3>
                            <p className="text-slate-500 mb-6">هل أنت متأكد من رغبتك في حذف هذا الموظف؟ لا يمكن التراجع عن هذا الإجراء.</p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-black hover:bg-rose-700 transition-colors"
                                >
                                    حذف
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

export default EmployeesView;
