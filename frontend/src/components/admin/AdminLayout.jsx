import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
    FlaskConical, LayoutDashboard, TestTube2, Package, ClipboardList,
    MessageSquare, Star, HelpCircle, Settings, LogOut, Menu, X, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/tests', icon: TestTube2, label: 'Tests' },
    { to: '/admin/categories', icon: FlaskConical, label: 'Categories' },
    { to: '/admin/packages', icon: Package, label: 'Packages' },
    { to: '/admin/enquiries', icon: ClipboardList, label: 'Enquiries' },
    { to: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/admin/testimonials', icon: Star, label: 'Testimonials' },
    { to: '/admin/faqs', icon: HelpCircle, label: 'FAQs' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/admin/login'); };

    const Sidebar = () => (
        <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto lg:transform-none`}>
            {/* Brand */}
            <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-800">
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <FlaskConical size={18} className="text-white" />
                </div>
                <div>
                    <span className="devanagari text-white font-bold text-sm block leading-tight">विमला जाँच घर</span>
                    <span className="text-gray-400 text-xs">Admin Panel</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-white">
                    <X size={20} />
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <item.icon size={17} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* User */}
            <div className="px-3 py-4 border-t border-gray-800">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 mb-2">
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
                <Link to="/" className="flex items-center gap-2 mt-1 px-3 py-2 text-xs text-gray-500 hover:text-gray-300 transition-colors">
                    <ChevronRight size={12} /> View Website
                </Link>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                        <Menu size={20} />
                    </button>
                    <div className="flex-1" />
                    <Link to="/admin/settings" className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm hover:bg-blue-200 transition-colors">
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
