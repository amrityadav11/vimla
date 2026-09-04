import { useState, useEffect } from 'react';
import { UserPlus, Trash2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminUsersApi } from '../../services/api';
import toast from 'react-hot-toast';

const EMPTY = { name: '', email: '', password: '', role: 'admin' };

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const load = () => {
        setLoading(true);
        adminUsersApi.getAll()
            .then(r => setUsers(r.data.data || []))
            .catch(() => toast.error('Could not load users'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (form.password.length < 6) return toast.error('Password must be at least 6 characters.');
        setSaving(true);
        try {
            await adminUsersApi.create(form);
            toast.success(`User "${form.name}" created`);
            setForm(EMPTY);
            load();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating user');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`Remove user "${name}"?`)) return;
        try {
            await adminUsersApi.delete(id);
            toast.success('User removed');
            load();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error');
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <div className="mb-7">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Create and manage admin accounts for this panel.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Create form */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-bold text-gray-900 text-base mb-5 flex items-center gap-2">
                            <UserPlus size={17} className="text-blue-700" /> Create New Admin
                        </h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                                <input
                                    required type="text" value={form.name}
                                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                    placeholder="e.g. Rahul Sharma"
                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                                <input
                                    required type="email" value={form.email}
                                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                    placeholder="admin@example.com"
                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password *</label>
                                <div className="relative">
                                    <input
                                        required type={showPass ? 'text' : 'password'} value={form.password}
                                        minLength={6}
                                        onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                                        placeholder="Min. 6 characters"
                                        className="w-full px-3.5 py-2.5 pr-11 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button type="button" onClick={() => setShowPass(p => !p)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
                                <select
                                    value={form.role}
                                    onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="admin">Admin (Full Access)</option>
                                    <option value="staff">Staff (Limited)</option>
                                </select>
                            </div>
                            <button
                                type="submit" disabled={saving}
                                className="w-full py-3 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-60 text-sm"
                            >
                                {saving ? 'Creating...' : 'Create Admin User'}
                            </button>
                        </form>
                    </div>

                    {/* Users list */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-bold text-gray-900 text-base mb-5 flex items-center gap-2">
                            <ShieldCheck size={17} className="text-green-600" /> Existing Users
                        </h2>
                        {loading ? (
                            <div className="space-y-3">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : users.length === 0 ? (
                            <p className="text-center text-gray-400 py-8 text-sm">No users found.</p>
                        ) : (
                            <div className="space-y-2">
                                {users.map(u => (
                                    <div
                                        key={u._id}
                                        className="flex items-center justify-between gap-3 px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                                                {u.name?.[0]?.toUpperCase() || 'A'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                                                <p className="text-xs text-gray-400">{u.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${u.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {u.role}
                                            </span>
                                            {!u.isActive && (
                                                <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-600">Inactive</span>
                                            )}
                                            <button
                                                onClick={() => handleDelete(u._id, u.name)}
                                                className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                                                title="Remove"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
                    <strong>Security note:</strong> Admin users have full access to this panel. Only create accounts for trusted staff. Share credentials securely and change default passwords immediately.
                </div>
            </div>
        </AdminLayout>
    );
}
