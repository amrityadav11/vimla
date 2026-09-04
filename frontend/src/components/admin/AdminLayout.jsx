import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
    FlaskConical, LayoutDashboard, TestTube2, Package, ClipboardList,
    MessageSquare, Star, HelpCircle, Settings, LogOut, Menu, X,
    ChevronRight, UserPlus,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { settingsApi } from '../../services/api';

const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/tests', icon: TestTube2, label: 'Tests' },
    { to: '/admin/categories', icon: FlaskConical, label: 'Categories' },
    { to: '/admin/packages', icon: Package, label: 'Packages' },
    { to: '/admin/enquiries', icon: ClipboardList, label: 'Enquiries', badgeKey: 'pendingEnquiries' },
    { to: '/admin/messages', icon: MessageSquare, label: 'Messages', badgeKey: 'unreadMessages' },
    { to: '/admin/testimonials', icon: Star, label: 'Testimonials' },
    { to: '/admin/faqs', icon: HelpCircle, label: 'FAQs' },
    { to: '/admin/users', icon: UserPlus, label: 'Admin Users' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [badges, setBadges] = useState({ pendingEnquiries: 0, unreadMessages: 0 });

    /* Fetch badge counts on mount */
    useEffect(() => {
        settingsApi.getStats()
            .then(r => {
                const d = r.data.data || {};
                setBadges({
                    pendingEnquiries: d.pendingEnquiries || 0,
                    unreadMessages: d.unreadMessages || 0,
                });
            })
            .catch(() => { });
    }, []);

    const handleLogout = () => { logout(); navigate('/admin/login'); };

    function Sidebar() {
        return (
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 flex flex-col transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto lg:transform-none`}
            >
                {/* ── Brand / Logo ── */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-800 shrink-0">
                    <img
                        src="/logo.png"
                        alt="विमला जाँच घर logo"
                        className="h-12 w-12 rounded-xl object-contain bg-white p-1 shrink-0"
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div className="overflow-hidden">
                        <span className="devanagari text-white font-bold text-sm block leading-tight truncate">
                            विमला जाँच घर
                        </span>
                        <span className="text-gray-400 text-xs block truncate">Admin Panel</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="ml-auto lg:hidden text-gray-400 hover:text-white shrink-0"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* ── Nav items ── */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
                    {navItems.map(item => {
                        const count = item.badgeKey ? badges[item.badgeKey] : 0;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative
                  ${isActive
                                        ? 'bg-blue-700 text-white'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                <item.icon size={17} className="shrink-0" />
                                <span className="flex-1">{item.label}</span>

                                {/* Live badge for Enquiries & Messages */}
                                {count > 0 && (
                                    <span className="ml-auto min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full text-xs font-bold bg-red-500 text-white leading-none">
                                        {count > 99 ? '99+' : count}
                                    </span>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* ── User info + logout ── */}
                <div className="px-3 py-4 border-t border-gray-800 shrink-0">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-800 mb-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {user?.name?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
                            <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 mt-1 px-3 py-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    >
                        <ChevronRight size={12} /> View Website
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center gap-4 shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                        aria-label="Open sidebar"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Inline logo for top bar on mobile */}
                    <div className="lg:hidden flex items-center gap-2">
                        <img src="/logo.png" alt="logo" className="h-8 w-8 rounded-lg object-contain bg-white border border-gray-100 p-0.5"
                            onError={e => { e.target.style.display = 'none'; }} />
                        <span className="devanagari font-bold text-blue-900 text-sm">विमला जाँच घर</span>
                    </div>

                    <div className="flex-1" />

                    {/* Badge indicators in top bar */}
                    <div className="flex items-center gap-2">
                        {badges.pendingEnquiries > 0 && (
                            <Link to="/admin/enquiries"
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors">
                                <ClipboardList size={13} />
                                {badges.pendingEnquiries} pending
                            </Link>
                        )}
                        {badges.unreadMessages > 0 && (
                            <Link to="/admin/messages"
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors">
                                <MessageSquare size={13} />
                                {badges.unreadMessages} new
                            </Link>
                        )}
                    </div>

                    <Link to="/admin/settings"
                        className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm hover:bg-blue-200 transition-colors">
                        {user?.name?.[0]?.toUpperCase() || 'A'}
                    </Link>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
