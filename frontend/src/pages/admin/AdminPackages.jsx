import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { packagesApi, testsApi } from '../../services/api';
import toast from 'react-hot-toast';

const EMPTY = { name: '', shortDescription: '', description: '', testNames: '', price: '', showPrice: true, isActive: true, isPopular: false, color: '#1e40af', disclaimer: '' };

export default function AdminPackages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);

    const load = () => { setLoading(true); packagesApi.getAllAdmin().then(r => setPackages(r.data.data || [])).finally(() => setLoading(false)); };
    useEffect(() => { load(); }, []);

    const openEdit = (pkg) => {
        setEditing(pkg);
        setForm({ ...pkg, testNames: (pkg.testNames || []).join('\n'), price: pkg.price || '' });
        setShowModal(true);
    };
    const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        const data = {
            ...form,
            price: form.price ? Number(form.price) : undefined,
            testNames: form.testNames ? form.testNames.split('\n').map(t => t.trim()).filter(Boolean) : [],
        };
        try {
            if (editing) { await packagesApi.update(editing._id, data); toast.success('Updated'); }
            else { await packagesApi.create(data); toast.success('Created'); }
            setShowModal(false);
            load();
        } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this package?')) return;
        await packagesApi.delete(id);
        toast.success('Deleted');
        load();
    };

    const toggleActive = async (pkg) => {
        await packagesApi.update(pkg._id, { isActive: !pkg.isActive });
        load();
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Packages</h1>
                    <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors text-sm">
                        <Plus size={16} /> Add Package
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? <div className="p-8 text-center text-gray-400">Loading...</div> : (
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Package Name</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Tests</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Price</th>
                                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {packages.map(pkg => (
                                    <tr key={pkg._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-gray-900">{pkg.name}</p>
                                            <p className="text-xs text-gray-400">{pkg.shortDescription?.slice(0, 50)}</p>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{(pkg.testNames || []).length} tests</td>
                                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{pkg.price ? `₹${pkg.price}` : '—'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${pkg.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {pkg.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => toggleActive(pkg)} className="p-1.5 text-gray-400 hover:text-green-600">
                                                    {pkg.isActive ? <ToggleRight size={18} className="text-green-600" /> : <ToggleLeft size={18} />}
                                                </button>
                                                <button onClick={() => openEdit(pkg)} className="p-1.5 text-gray-400 hover:text-blue-700"><Pencil size={14} /></button>
                                                <button onClick={() => handleDelete(pkg._id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {packages.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-gray-400">No packages</td></tr>}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-4 px-4 bg-black/40 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <h2 className="font-bold text-gray-900 text-lg">{editing ? 'Edit Package' : 'Add Package'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 text-xl font-light">×</button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Package Name *</label>
                                <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
                                <input value={form.shortDescription} onChange={e => setForm(p => ({ ...p, shortDescription: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Test Names (one per line)</label>
                                <textarea value={form.testNames} onChange={e => setForm(p => ({ ...p, testNames: e.target.value }))} rows={5} placeholder="Complete Blood Count (CBC)&#10;Fasting Blood Sugar&#10;Lipid Profile..." className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
                                    <input type="number" min="0" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Color</label>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} className="w-10 h-10 rounded cursor-pointer border-0" />
                                        <input value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Disclaimer</label>
                                <input value={form.disclaimer} onChange={e => setForm(p => ({ ...p, disclaimer: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {[['isActive', 'Active'], ['isPopular', 'Popular'], ['showPrice', 'Show Price']].map(([k, l]) => (
                                    <label key={k} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.checked }))} className="w-4 h-4 accent-blue-700" />
                                        <span className="text-sm text-gray-700">{l}</span>
                                    </label>
                                ))}
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
