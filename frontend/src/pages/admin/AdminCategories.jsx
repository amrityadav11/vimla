import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { categoriesApi } from '../../services/api';
import toast from 'react-hot-toast';

const ICONS = ['flask-conical', 'droplets', 'activity', 'microscope', 'shield-check', 'sun', 'trending-up', 'heart', 'thermometer', 'test-tubes'];
const EMPTY = { name: '', description: '', icon: 'flask-conical', color: '#1e40af', order: 0, isActive: true };

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);

    const load = () => { setLoading(true); categoriesApi.getAllAdmin().then(r => setCategories(r.data.data || [])).finally(() => setLoading(false)); };
    useEffect(() => { load(); }, []);

    const openEdit = (c) => { setEditing(c); setForm(c); setShowModal(true); };
    const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editing) { await categoriesApi.update(editing._id, form); toast.success('Updated'); }
            else { await categoriesApi.create(form); toast.success('Created'); }
            setShowModal(false);
            load();
        } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this category?')) return;
        await categoriesApi.delete(id);
        toast.success('Deleted');
        load();
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                    <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors text-sm">
                        <Plus size={16} /> Add Category
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? <div className="p-8 text-center text-gray-400">Loading...</div> : (
                        <div className="divide-y divide-gray-50">
                            {categories.map(cat => (
                                <div key={cat._id} className="px-5 py-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}20` }}>
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 text-sm">{cat.name}</p>
                                        <p className="text-xs text-gray-400">{cat.description}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => openEdit(cat)} className="p-1.5 text-gray-400 hover:text-blue-700"><Pencil size={14} /></button>
                                        <button onClick={() => handleDelete(cat._id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                            ))}
                            {categories.length === 0 && <div className="py-12 text-center text-gray-400">No categories</div>}
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-6">
                        <h2 className="font-bold text-gray-900 text-lg mb-5">{editing ? 'Edit Category' : 'Add Category'}</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name *</label>
                                <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Color</label>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} className="w-10 h-10 rounded cursor-pointer border-0" />
                                        <input value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Order</label>
                                    <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Icon</label>
                                <select value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                                </select>
                            </div>
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
