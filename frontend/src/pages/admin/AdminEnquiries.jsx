import { useState, useEffect } from 'react';
import { Eye, Trash2, ChevronDown } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { enquiriesApi } from '../../services/api';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['new', 'contacted', 'scheduled', 'completed', 'cancelled'];
const STATUS_COLORS = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    scheduled: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-gray-100 text-gray-500',
};

export default function AdminEnquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [selected, setSelected] = useState(null);

    const load = (status) => {
        setLoading(true);
        const params = status ? { status } : {};
        enquiriesApi.getAll({ ...params, limit: 50 })
            .then(r => setEnquiries(r.data.data || []))
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(filter); }, [filter]);

    const updateStatus = async (id, status) => {
        try {
            await enquiriesApi.update(id, { status });
            load(filter);
            if (selected?._id === id) setSelected(p => ({ ...p, status }));
            toast.success('Status updated');
        } catch { toast.error('Error updating'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this enquiry?')) return;
        try {
            await enquiriesApi.delete(id);
            toast.success('Deleted');
            load(filter);
            if (selected?._id === id) setSelected(null);
        } catch { toast.error('Error deleting'); }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
                    <p className="text-sm text-gray-500">{enquiries.length} enquiries</p>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {['', ...STATUS_OPTIONS].map(s => (
                        <button
                            key={s || 'all'}
                            onClick={() => setFilter(s)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${filter === s ? 'bg-blue-800 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        >
                            {s || 'All'}
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* List */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="p-8 text-center text-gray-400">Loading...</div>
                        ) : enquiries.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">No enquiries found</div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {enquiries.map(enq => (
                                    <div
                                        key={enq._id}
                                        onClick={() => setSelected(enq)}
                                        className={`px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?._id === enq._id ? 'bg-blue-50' : ''}`}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">{enq.fullName}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{enq.testOrPackage} • {enq.mobile}</p>
                                                <p className="text-xs text-gray-400">{new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[enq.status] || ''}`}>{enq.status}</span>
                                                {enq.homeCollection && <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Home</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Detail */}
                    <div>
                        {selected ? (
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="font-bold text-gray-900">{selected.fullName}</h3>
                                    <button onClick={() => handleDelete(selected._id)} className="text-red-400 hover:text-red-600 p-1">
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                                <div className="space-y-3 text-sm">
                                    {[
                                        ['Mobile', selected.mobile],
                                        ['Email', selected.email || '—'],
                                        ['Test/Package', selected.testOrPackage],
                                        ['Preferred Date', selected.preferredDate ? new Date(selected.preferredDate).toLocaleDateString('en-IN') : '—'],
                                        ['Preferred Time', selected.preferredTime || '—'],
                                        ['Home Collection', selected.homeCollection ? 'Yes' : 'No'],
                                        ['Message', selected.message || '—'],
                                        ['Submitted', new Date(selected.createdAt).toLocaleString('en-IN')],
                                    ].map(([label, value]) => (
                                        <div key={label} className="flex gap-2">
                                            <span className="text-gray-400 font-medium w-28 shrink-0">{label}</span>
                                            <span className="text-gray-700 break-words">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 pt-4 border-t border-gray-100">
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Update Status</label>
                                    <select
                                        value={selected.status}
                                        onChange={e => updateStatus(selected._id, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {STATUS_OPTIONS.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                                    </select>
                                </div>

                                <div className="mt-3 flex gap-2">
                                    <a href={`tel:${selected.mobile}`} className="flex-1 py-2 text-center text-sm font-semibold text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                                        Call
                                    </a>
                                    <a href={`https://wa.me/91${selected.mobile.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
                                <Eye size={28} className="mx-auto mb-2" />
                                <p className="text-sm">Select an enquiry to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
