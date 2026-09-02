import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { testimonialsApi } from '../../services/api';
import toast from 'react-hot-toast';

const EMPTY = { name: '', location: '', review: '', rating: 5, isApproved: false };

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);

    const load = () => {
        setLoading(true);
        testimonialsApi.getAllAdmin()
            .then(r => setTestimonials(r.data.data || []))
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await testimonialsApi.create(form);
            toast.success('Testimonial added');
            setShowModal(false);
            setForm(EMPTY);
            load();
        } catch { toast.error('Error saving'); }
        finally { setSaving(false); }
    };

    const toggleApprove = async (t) => {
        await testimonialsApi.update(t._id, { isApproved: !t.isApproved });
        load();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this testimonial?')) return;
        await testimonialsApi.delete(id);
        toast.success('Deleted');
        load();
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
                    <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors text-sm">
                        <Plus size={16} /> Add Testimonial
                    </button>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
                    Only <strong>approved</strong> testimonials appear publicly. Ensure testimonials are genuine before approving.
                </div>

                {loading ? <div className="text-center text-gray-400 py-10">Loading...</div> : (
                    <div className="space-y-3">
                        {testimonials.map(t => (
                            <div key={t._id} className={`bg-white rounded-xl border p-5 flex items-start gap-4 ${t.isApproved ? 'border-green-200' : 'border-gray-100'}`}>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                                        {t.location && <span className="text-xs text-gray-400">• {t.location}</span>}
                                        <div className="flex gap-0.5 ml-1">{'★'.repeat(t.rating)}<span className="text-gray-200">{'★'.repeat(5 - t.rating)}</span></div>
                                    </div>
                                    <p className="text-sm text-gray-600 italic">"{t.review}"</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={() => toggleApprove(t)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${t.isApproved ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700' : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700'}`}
                                    >
                                        {t.isApproved ? <><Check size={12} /> Approved</> : <><X size={12} /> Pending</>}
                                    </button>
                                    <button onClick={() => handleDelete(t._id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={15} /></button>
                                </div>
                            </div>
                        ))}
                        {testimonials.length === 0 && <div className="text-center text-gray-400 py-10">No testimonials yet</div>}
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6">
                        <h2 className="font-bold text-gray-900 text-lg mb-5">Add Testimonial</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name *</label>
                                    <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                                    <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Local Resident" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Review *</label>
                                <textarea required value={form.review} onChange={e => setForm(p => ({ ...p, review: e.target.value }))} rows={3} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Rating (1–5)</label>
                                <select value={form.rating} onChange={e => setForm(p => ({ ...p, rating: Number(e.target.value) }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{'★'.repeat(n)} ({n})</option>)}
                                </select>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form.isApproved} onChange={e => setForm(p => ({ ...p, isApproved: e.target.checked }))} className="w-4 h-4 accent-blue-700" />
                                <span className="text-sm text-gray-700">Approve immediately (will appear publicly)</span>
                            </label>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 py-2.5 text-sm font-bold text-white bg-blue-800 rounded-xl hover:bg-blue-900 disabled:opacity-60">{saving ? 'Saving...' : 'Add Testimonial'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
