import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <img
                            src="/logo.png"
                            alt="विमला जाँच घर"
                            className="w-20 h-20 rounded-2xl object-contain bg-white border border-gray-100 shadow-md p-1"
                            onError={e => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                        />
                        <div className="w-20 h-20 bg-blue-800 rounded-2xl items-center justify-center shadow-md" style={{ display: 'none' }}>
                            <FlaskConical size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="devanagari text-2xl font-bold text-blue-900">विमला जाँच घर</h1>
                    <p className="text-gray-500 text-sm mt-1">Admin Panel</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <h2 className="font-bold text-gray-900 text-xl mb-6">Sign In</h2>
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-sm text-red-700">
                            <AlertCircle size={16} className="shrink-0" />
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                            <input
                                id="email" type="email" value={form.email}
                                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                placeholder="admin@vimlajanch.com"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="email" required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    id="password" type={showPass ? 'text' : 'password'} value={form.password}
                                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoComplete="current-password" required
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit" disabled={loading}
                            className="w-full py-3 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-60 text-sm mt-2"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
                <p className="text-center text-xs text-gray-400 mt-6">
                    Default: admin@vimlajanch.com / admin@123 — Change immediately after first login.
                </p>
            </div>
        </div>
    );
}
