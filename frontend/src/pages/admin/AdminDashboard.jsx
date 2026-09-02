import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TestTube2, Activity, ClipboardList, MessageSquare, Package, Bell, TrendingUp } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { settingsApi, enquiriesApi } from '../../services/api';

function StatCard({ title, value, icon: Icon, color, link, loading }) {
    return (
        <Link to={link} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon size={20} className="text-white" />
                </div>
            </div>
            <p className={`text-3xl font-bold text-gray-900 ${loading ? 'animate-pulse bg-gray-200 rounded h-8 w-16' : ''}`}>
                {!loading ? value : ''}
            </p>
        </Link>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [recentEnquiries, setRecentEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            settingsApi.getStats(),
            enquiriesApi.getAll({ limit: 5 }),
        ])
            .then(([statsRes, enquiriesRes]) => {
                setStats(statsRes.data.data);
                setRecentEnquiries(enquiriesRes.data.data || []);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const statCards = [
        { title: 'Total Tests', value: stats?.totalTests ?? '—', icon: TestTube2, color: 'bg-blue-600', link: '/admin/tests' },
        { title: 'Active Tests', value: stats?.activeTests ?? '—', icon: Activity, color: 'bg-green-600', link: '/admin/tests' },
        { title: 'Total Enquiries', value: stats?.totalEnquiries ?? '—', icon: ClipboardList, color: 'bg-purple-600', link: '/admin/enquiries' },
        { title: 'Pending Enquiries', value: stats?.pendingEnquiries ?? '—', icon: Bell, color: 'bg-amber-600', link: '/admin/enquiries' },
        { title: 'Active Packages', value: stats?.totalPackages ?? '—', icon: Package, color: 'bg-cyan-600', link: '/admin/packages' },
        { title: 'New Messages', value: stats?.unreadMessages ?? '—', icon: MessageSquare, color: 'bg-rose-600', link: '/admin/messages' },
    ];

    const statusColors = { new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700', scheduled: 'bg-purple-100 text-purple-700', completed: 'bg-green-100 text-green-700', cancelled: 'bg-gray-100 text-gray-600' };

    return (
        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <div className="mb-7">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Welcome back. Here's what's happening.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {statCards.map(card => (
                        <StatCard key={card.title} {...card} loading={loading} />
                    ))}
                </div>

                {/* Recent enquiries */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                        <h2 className="font-semibold text-gray-900">Recent Enquiries</h2>
                        <Link to="/admin/enquiries" className="text-sm text-blue-700 font-medium hover:text-blue-900">View All</Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {loading ? (
                            [...Array(3)].map((_, i) => <div key={i} className="h-16 bg-gray-50 animate-pulse mx-4 my-2 rounded-lg" />)
                        ) : recentEnquiries.length === 0 ? (
                            <div className="py-12 text-center text-gray-400 text-sm">No enquiries yet</div>
                        ) : (
                            recentEnquiries.map(enq => (
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
                        )}
                    </div>
                </div>

                {/* Quick links */}
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                        { to: '/admin/tests', label: 'Add Test', icon: TestTube2, color: 'text-blue-700 bg-blue-50' },
                        { to: '/admin/packages', label: 'Manage Packages', icon: Package, color: 'text-green-700 bg-green-50' },
                        { to: '/admin/enquiries', label: 'View Enquiries', icon: ClipboardList, color: 'text-purple-700 bg-purple-50' },
                        { to: '/admin/settings', label: 'Website Settings', icon: TrendingUp, color: 'text-amber-700 bg-amber-50' },
                    ].map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
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
        </AdminLayout>
    );
}
