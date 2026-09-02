import { useState, useEffect } from 'react';
import { Trash2, Eye } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { messagesApi } from '../../services/api';
import toast from 'react-hot-toast';

const STATUS_COLORS = { new: 'bg-blue-100 text-blue-700', read: 'bg-gray-100 text-gray-600', replied: 'bg-green-100 text-green-700', archived: 'bg-yellow-100 text-yellow-700' };

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    const load = () => {
        setLoading(true);
        messagesApi.getAll({ limit: 50 })
            .then(r => setMessages(r.data.data || []))
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const markStatus = async (id, status) => {
        await messagesApi.update(id, { status });
        load();
        if (selected?._id === id) setSelected(p => ({ ...p, status }));
        toast.success('Updated');
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this message?')) return;
        await messagesApi.delete(id);
        toast.success('Deleted');
        load();
        if (selected?._id === id) setSelected(null);
    };

    const handleSelect = async (msg) => {
        setSelected(msg);
        if (msg.status === 'new') markStatus(msg._id, 'read');
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                    <p className="text-sm text-gray-500">{messages.length} messages</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        {loading ? <div className="p-8 text-center text-gray-400">Loading...</div> : messages.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">No messages yet</div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {messages.map(msg => (
                                    <div
                                        key={msg._id}
                                        onClick={() => handleSelect(msg)}
                                        className={`px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?._id === msg._id ? 'bg-blue-50' : ''} ${msg.status === 'new' ? 'border-l-3 border-blue-600' : ''}`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className={`text-sm font-semibold text-gray-900 ${msg.status === 'new' ? 'font-bold' : ''}`}>{msg.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{msg.subject || msg.message.slice(0, 50)}...</p>
                                                <p className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString('en-IN')}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize shrink-0 ${STATUS_COLORS[msg.status]}`}>{msg.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        {selected ? (
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                                <div className="flex justify-between mb-4">
                                    <h3 className="font-bold text-gray-900">{selected.name}</h3>
                                    <button onClick={() => handleDelete(selected._id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={15} /></button>
                                </div>
                                <div className="space-y-2 text-sm mb-4">
                                    {[['Phone', selected.phone], ['Email', selected.email], ['Subject', selected.subject]].map(([l, v]) => v ? (
                                        <div key={l} className="flex gap-2"><span className="text-gray-400 w-16">{l}</span><span className="text-gray-700">{v}</span></div>
                                    ) : null)}
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed mb-4">{selected.message}</div>
                                <div className="flex gap-2">
                                    {['replied', 'archived'].map(s => (
                                        <button key={s} onClick={() => markStatus(selected._id, s)} className="flex-1 py-2 text-xs font-semibold border border-gray-200 rounded-lg capitalize hover:bg-gray-50 transition-colors">{s}</button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
                                <Eye size={28} className="mx-auto mb-2" />
                                <p className="text-sm">Select a message to view</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
