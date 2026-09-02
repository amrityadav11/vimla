import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Search, Star } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { testsApi, categoriesApi } from '../../services/api';
import toast from 'react-hot-toast';

const EMPTY_FORM = {
    name: '', category: '', shortDescription: '', description: '',
    sampleType: 'Blood', preparation: '', reportTime: 'Same Day',
    price: '', showPrice: true, isAvailable: true, isPopular: false,
    processingType: 'IN_HOUSE', tags: '', parameters: [{ name: '', unit: '' }],
};

export default function AdminTests() {
    const [tests, setTests] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');

    const load = () => {
        setLoading(true);
        testsApi.getAllAdmin()
            .then(r => setTests(r.data.data || []))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        load();
        categoriesApi.getAllAdmin().then(r => setCategories(r.data.data || []));
    }, []);

    const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setShowModal(true); };
    const openEdit = (test) => {
        setEditing(test);
        setForm({
            ...test,
            category: test.category?._id || test.category || '',
            tags: Array.isArray(test.tags) ? test.tags.join(', ') : test.tags || '',
            parameters: test.parameters?.length ? test.parameters : [{ name: '', unit: '' }],
        });
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        const data = {
            ...form,
            price: form.price ? Number(form.price) : undefined,
            tags: form.tags ? form.tags.split(',').map(t => t.trim().toLowerCase()) : [],
            parameters: form.parameters.filter(p => p.name.trim()),
        };
        try {
            if (editing) {
                await testsApi.update(editing._id, data);
                toast.success('Test updated');
            } else {
                await testsApi.create(data);
                toast.success('Test created');
            }
            setShowModal(false);
            load();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error saving test');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
        try {
            await testsApi.delete(id);
            toast.success('Test deleted');
            load();
        } catch { toast.error('Error deleting test'); }
    };

    const toggleAvailable = async (test) => {
        try {
            await testsApi.update(test._id, { isAvailable: !test.isAvailable });
            load();
        } catch { toast.error('Error updating test'); }
    };

    const addParam = () => setForm(p => ({ ...p, parameters: [...p.parameters, { name: '', unit: '' }] }));
    const updateParam = (i, field, val) => setForm(p => ({
        ...p,
        parameters: p.parameters.map((par, idx) => idx === i ? { ...par, [field]: val } : par),
    }));
    const removeParam = (i) => setForm(p => ({ ...p, parameters: p.parameters.filter((_, idx) => idx !== i) }));

    const filtered = tests.filter(t => !search || t.name.toLowerCase().includes(search.toLowerCase()));

    const statusBadge = (t) => t.isAvailable
        ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
        : <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">Inactive</span>;

    return (
        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tests</h1>
                        <p className="text-sm text-gray-500">{tests.length} tests total</p>
                    </div>
                    <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors text-sm">
                        <Plus size={16} /> Add Test
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-50">
                        <div className="relative max-w-sm">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search" placeholder="Search tests..." value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-400">Loading...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Test Name</th>
                                        <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Category</th>
                                        <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Price</th>
                                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                                        <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filtered.map(test => (
                                        <tr key={test._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    {test.isPopular && <Star size={13} className="text-amber-500 fill-amber-500 shrink-0" />}
                                                    <span className="font-medium text-gray-900">{test.name}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-0.5">{test.sampleType}</p>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{test.category?.name || '—'}</td>
                                            <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{test.price ? `₹${test.price}` : '—'}</td>
                                            <td className="px-4 py-3">{statusBadge(test)}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button onClick={() => toggleAvailable(test)} className="p-1.5 text-gray-400 hover:text-green-600 transition-colors" title="Toggle availability">
                                                        {test.isAvailable ? <ToggleRight size={18} className="text-green-600" /> : <ToggleLeft size={18} />}
                                                    </button>
                                                    <button onClick={() => openEdit(test)} className="p-1.5 text-gray-400 hover:text-blue-700 transition-colors">
                                                        <Pencil size={15} />
                                                    </button>
                                                    <button onClick={() => handleDelete(test._id, test.name)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr><td colSpan={5} className="py-12 text-center text-gray-400">No tests found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-4 px-4 bg-black/40 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <h2 className="font-bold text-gray-900 text-lg">{editing ? 'Edit Test' : 'Add Test'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 text-xl font-light">×</button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Test Name *</label>
                                    <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                                    <select required value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Select category</option>
                                        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Sample Type</label>
                                    <input value={form.sampleType} onChange={e => setForm(p => ({ ...p, sampleType: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
                                    <input type="number" min="0" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="Leave blank to hide" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Report Time</label>
                                    <input value={form.reportTime} onChange={e => setForm(p => ({ ...p, reportTime: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
                                <input value={form.shortDescription} onChange={e => setForm(p => ({ ...p, shortDescription: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Preparation Requirements</label>
                                <input value={form.preparation} onChange={e => setForm(p => ({ ...p, preparation: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Tags (comma separated)</label>
                                <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="cbc, blood count, anemia..." className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            {/* Parameters */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-700">Parameters</label>
                                    <button type="button" onClick={addParam} className="text-xs text-blue-700 font-medium hover:text-blue-900">+ Add Parameter</button>
                                </div>
                                <div className="space-y-2">
                                    {form.parameters.map((param, i) => (
                                        <div key={i} className="flex gap-2">
                                            <input value={param.name} onChange={e => updateParam(i, 'name', e.target.value)} placeholder="Parameter name" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            <input value={param.unit} onChange={e => updateParam(i, 'unit', e.target.value)} placeholder="Unit" className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            {form.parameters.length > 1 && (
                                                <button type="button" onClick={() => removeParam(i)} className="text-red-400 hover:text-red-600 px-2"><Trash2 size={14} /></button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="flex flex-wrap gap-4 pt-2">
                                {[
                                    { key: 'isAvailable', label: 'Available' },
                                    { key: 'isPopular', label: 'Popular' },
                                    { key: 'showPrice', label: 'Show Price' },
                                ].map(toggle => (
                                    <label key={toggle.key} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={form[toggle.key]} onChange={e => setForm(p => ({ ...p, [toggle.key]: e.target.checked }))} className="w-4 h-4 accent-blue-700" />
                                        <span className="text-sm font-medium text-gray-700">{toggle.label}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 py-2.5 text-sm font-bold text-white bg-blue-800 rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-60">
                                    {saving ? 'Saving...' : editing ? 'Update Test' : 'Create Test'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
