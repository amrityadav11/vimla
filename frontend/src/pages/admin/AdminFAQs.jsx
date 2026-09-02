import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { faqsApi } from '../../services/api';
import toast from 'react-hot-toast';

const EMPTY = { question: '', answer: '', category: 'General', order: 0, isActive: true };

export default function AdminFAQs() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);

    const load = () => {
        setLoading(true);
        faqsApi.getAllAdmin().then(r => setFaqs(r.data.data || [])).finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const openEdit = (faq) => { setEditing(faq); setForm(faq); setShowModal(true); };
    const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editing) { await faqsApi.update(editing._id, form); toast.success('FAQ updated'); }
            else { await faqsApi.create(form); toast.success('FAQ created'); }
            setShowModal(false);
            load();
        } catch { toast.error('Error saving FAQ'); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this FAQ?')) return;
        await faqsApi.delete(id);
        toast.success('Deleted');
        load();
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
                    <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors text-sm">
                        <Plus size={16} /> Add FAQ
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? <div className="p-8 text-center text-gray-400">Loading...</div> : (
                        <div className="divide-y divide-gray-50">
                            {faqs.map(faq => (
                                <div key={faq._id} className="px-5 py-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                {!faq.isActive && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>}
                                                <p className="font-semibold text-gray-900 text-sm">{faq.question}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2">{faq.answer}</p>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                            <button onClick={() => openEdit(faq)} className="p-1.5 text-gray-400 hover:text-blue-700 transition-colors"><Pencil size={14} /></button>
                                            <button onClick={() => handleDelete(faq._id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {faqs.length === 0 && <div className="py-12 text-center text-gray-400">No FAQs yet</div>}
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6">
                        <h2 className="font-bold text-gray-900 text-lg mb-5">{editing ? 'Edit FAQ' : 'Add FAQ'}</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Question *</label>
                                <input required value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Answer *</label>
                                <textarea required value={form.answer} onChange={e => setForm(p => ({ ...p, answer: e.target.value }))} rows={4} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                                    <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Order</label>
                                    <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 accent-blue-700" />
                                <span className="text-sm text-gray-700">Active (visible on website)</span>
                            </label>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 py-2.5 text-sm font-bold text-white bg-blue-800 rounded-xl hover:bg-blue-900 disabled:opacity-60">{saving ? 'Saving...' : editing ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
