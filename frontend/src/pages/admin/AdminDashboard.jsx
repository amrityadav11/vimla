import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    TestTube2, Activity, ClipboardList, MessageSquare,
    Package, Bell, TrendingUp, UserPlus, X, Eye, EyeOff,
    Trash2, ShieldCheck,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { settingsApi, enquiriesApi, adminUsersApi } from '../../services/api';
import toast from 'react-hot-toast';

/* ── Stat card ── */
function StatCard({ title, value, icon: Icon, color, link, loading }) {
    return (
        <Link to={link} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon size={20} className="text-white" />
                </div>
            </div>
            {loading
                ? <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                : <p className="text-3xl font-bold text-gray-900">{value}</p>
            }
        </Link>
    );
}

const EMPTY_USER = { name: '', email: '', password: '', role: 'admin' };

/* ── Dashboard ── */
export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [recentEnquiries, setRecentEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    /* modal state */
    const [modalOpen, setModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);
    const [form, setForm] = useState(EMPTY_USER);
    const [saving, setSaving] = useState(false);
    const [showPw, setShowPw] = useState(false);

    /* load dashboard data */
    useEffect(() => {
        Promise.all([
            settingsApi.getStats(),
            enquiriesApi.getAll({ limit: 5 }),
        ])
            .then(([s, e]) => {
                setStats(s.data.data);
                setRecentEnquiries(e.data.data || []);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    /* load admin users */
    const fetchUsers = () => {
        setUsersLoading(true);
        adminUsersApi.getAll()
            .then(r => setUsers(r.data.data || []))
            .catch(() => toast.error('Could not load users'))
            .finally(() => setUsersLoading(false));
    };

    const openModal = () => {
        setForm(EMPTY_USER);
        setShowPw(false);
        fetchUsers();
        setModalOpen(true);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (form.password.length < 6) return toast.error('Password must be at least 6 characters.');
        setSaving(true);
        try {
            await adminUsersApi.create(form);
            toast.success(`User "${form.name}" created successfully`);
            setForm(EMPTY_USER);
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating user');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Remove admin user "${name}"?`)) return;
        try {
            await adminUsersApi.delete(id);
            toast.success('User removed');
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error');
        }
    };

    const statCards = [
        { title: 'Total Tests', value: stats?.totalTests ?? '—', icon: TestTube2, color: 'bg-blue-600', link: '/admin/tests' },
        { title: 'Active Tests', value: stats?.activeTests ?? '—', icon: Activity, color: 'bg-green-600', link: '/admin/tests' },
        { title: 'Total Enquiries', value: stats?.totalEnquiries ?? '—', icon: ClipboardList, color: 'bg-purple-600', link: '/admin/enquiries' },
        { title: 'Pending Enquiries', value: stats?.pendingEnquiries ?? '—', icon: Bell, color: 'bg-amber-600', link: '/admin/enquiries' },
        { title: 'Active Packages', value: stats?.totalPackages ?? '—', icon: Package, color: 'bg-cyan-600', link: '/admin/packages' },
        { title: 'New Messages', value: stats?.unreadMessages ?? '—', icon: MessageSquare, color: 'bg-rose-600', link: '/admin/messages' },
    ];

    const statusColors = {
        new: 'bg-blue-100 text-blue-700',
        contacted: 'bg-yellow-100 text-yellow-700',
        scheduled: 'bg-purple-100 text-purple-700',
        completed: 'bg-green-100 text-green-700',
        cancelled: 'bg-gray-100 text-gray-600',
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto">

                {/* ── Page header with Create Admin button ── */}
                <div className="flex items-center justify-between mb-7">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500 text-sm mt-0.5">Welcome back. Here's what's happening.</p>
                    </div>

                    {/* CREATE ADMIN BUTTON */}
                    <button
                        type="button"
                        onClick={openModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-800 text-white text-sm font-semibold rounded-xl hover:bg-blue-900 active:bg-blue-950 transition-colors shadow-sm"
                    >
                        <UserPlus size={16} />
                        Create Admin
                    </button>
                </div>

                {/* ── Stats ── */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {statCards.map(c => <StatCard key={c.title} {...c} loading={loading} />)}
                </div>

                {/* ── Recent enquiries ── */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                        <h2 className="font-semibold text-gray-900">Recent Enquiries</h2>
                        <Link to="/admin/enquiries" className="text-sm text-blue-700 font-medium hover:text-blue-900">View All</Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {loading
                            ? [...Array(3)].map((_, i) => <div key={i} className="h-16 bg-gray-50 animate-pulse mx-4 my-2 rounded-lg" />)
                            : recentEnquiries.length === 0
                                ? <div className="py-12 text-center text-gray-400 text-sm">No enquiries yet</div>
                                : recentEnquiries.map(enq => (
                                    <div key={enq._id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">{enq.fullName}</p>
                                            <p className="text-xs text-gray-500">{enq.testOrPackage} • {enq.mobile}</p>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[enq.status] || 'bg-gray-100 text-gray-600'}`}>
                                                {enq.status}
                                            </span>
                                            <span className="text-xs text-gray-400">{new Date(enq.createdAt).toLocaleDateString('en-IN')}</span>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>

                {/* ── Quick links ── */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                        { to: '/admin/tests', label: 'Add Test', icon: TestTube2, color: 'text-blue-700 bg-blue-50' },
                        { to: '/admin/packages', label: 'Manage Packages', icon: Package, color: 'text-green-700 bg-green-50' },
                        { to: '/admin/enquiries', label: 'View Enquiries', icon: ClipboardList, color: 'text-purple-700 bg-purple-50' },
                        { to: '/admin/settings', label: 'Website Settings', icon: TrendingUp, color: 'text-amber-700 bg-amber-50' },
                    ].map(item => (
                        <Link key={item.to} to={item.to}
                            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.color}`}>
                                <item.icon size={17} />
                            </div>
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* ══════════════════════════════════════════
          CREATE ADMIN MODAL
      ══════════════════════════════════════════ */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-start justify-center pt-10 pb-6 px-4 bg-black/50 overflow-y-auto"
                    onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
                >
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">

                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div>
                                <h2 className="font-bold text-gray-900 text-lg">Admin Users</h2>
                                <p className="text-xs text-gray-400 mt-0.5">Create and manage admin panel accounts</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto">

                            {/* ── Create form ── */}
                            <section>
                                <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                                    <UserPlus size={14} className="text-blue-700" /> Create New Admin User
                                </h3>
                                <form onSubmit={handleCreate} className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                                            <input
                                                type="text" required
                                                value={form.name}
                                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                                placeholder="e.g. Rahul Sharma"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1">Email *</label>
                                            <input
                                                type="email" required
                                                value={form.email}
                                                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                                placeholder="admin@example.com"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1">Password *</label>
                                            <div className="relative">
                                                <input
                                                    type={showPw ? 'text' : 'password'} required minLength={6}
                                                    value={form.password}
                                                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                                                    placeholder="Min. 6 chars"
                                                    className="w-full px-3 py-2 pr-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <button type="button" onClick={() => setShowPw(p => !p)}
                                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1">Role</label>
                                            <select
                                                value={form.role}
                                                onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="admin">Admin (Full Access)</option>
                                                <option value="staff">Staff (Limited)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button type="submit" disabled={saving}
                                        className="w-full py-2.5 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-50 text-sm"
                                    >
                                        {saving ? 'Creating...' : 'Create Admin User'}
                                    </button>
                                </form>
                            </section>

                            <hr className="border-gray-100" />

                            {/* ── Existing users ── */}
                            <section>
                                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-green-600" /> Existing Users
                                </h3>
                                {usersLoading ? (
                                    <div className="space-y-2">
                                        {[...Array(2)].map((_, i) => <div key={i} className="h-12 rounded-lg bg-gray-100 animate-pulse" />)}
                                    </div>
                                ) : users.length === 0 ? (
                                    <p className="text-sm text-gray-400 text-center py-4">No users found</p>
                                ) : (
                                    <div className="space-y-2">
                                        {users.map(u => (
                                            <div key={u._id}
                                                className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0">
                                                        {u.name?.[0]?.toUpperCase() || 'A'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                                                        <p className="text-xs text-gray-400">{u.email}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${u.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                                        {u.role}
                                                    </span>
                                                    {!u.isActive && (
                                                        <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-600">Inactive</span>
                                                    )}
                                                    <button onClick={() => handleDelete(u._id, u.name)}
                                                        className="p-1.5 text-gray-300 hover:text-red-500 transition-colors" title="Remove">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
