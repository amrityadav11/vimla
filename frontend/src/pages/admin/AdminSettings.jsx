import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { settingsApi, authApi } from '../../services/api';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

const SETTINGS_CONFIG = [
    {
        group: 'Business', keys: [
            { key: 'businessName', label: 'Business Name (Devanagari)', type: 'text' },
            { key: 'businessNameEn', label: 'Business Name (English)', type: 'text' },
            { key: 'tagline', label: 'Tagline', type: 'text' },
            { key: 'aboutText', label: 'About Text', type: 'textarea' },
        ]
    },
    {
        group: 'Contact', keys: [
            { key: 'phone', label: 'Phone Number', type: 'text' },
            { key: 'whatsapp', label: 'WhatsApp Number (with country code, no +)', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'address', label: 'Address', type: 'textarea' },
            { key: 'openingHours', label: 'Opening Hours', type: 'text' },
            { key: 'googleMapsUrl', label: 'Google Maps URL', type: 'url' },
        ]
    },
    {
        group: 'Features', keys: [
            { key: 'homeCollection', label: 'Enable Home Sample Collection', type: 'boolean' },
            { key: 'showPrices', label: 'Show Test Prices on Website', type: 'boolean' },
        ]
    },
    {
        group: 'Content', keys: [
            { key: 'disclaimer', label: 'Medical Disclaimer Text', type: 'textarea' },
            { key: 'metaDescription', label: 'Website Meta Description (SEO)', type: 'textarea' },
        ]
    },
];

export default function AdminSettings() {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [pwSaving, setPwSaving] = useState(false);

    useEffect(() => {
        settingsApi.getPublic()
            .then(r => setSettings(r.data.data || {}))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await settingsApi.update(settings);
            toast.success('Settings saved');
        } catch { toast.error('Error saving settings'); }
        finally { setSaving(false); }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (pwForm.newPassword !== pwForm.confirmPassword) { toast.error('Passwords do not match'); return; }
        if (pwForm.newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return; }
        setPwSaving(true);
        try {
            await authApi.changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
            toast.success('Password changed successfully');
            setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) { toast.error(err.response?.data?.message || 'Error changing password'); }
        finally { setPwSaving(false); }
    };

    const updateSetting = (key, value) => setSettings(p => ({ ...p, [key]: value }));

    if (loading) return <AdminLayout><div className="p-8 text-center text-gray-400">Loading settings...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-7">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Website Settings</h1>
                        <p className="text-sm text-gray-500">Configure your website content and features</p>
                    </div>
                    <button
                        onClick={handleSave} disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-60 text-sm"
                    >
                        <Save size={16} /> {saving ? 'Saving...' : 'Save All Changes'}
                    </button>
                </div>

                <div className="space-y-6">
                    {SETTINGS_CONFIG.map(section => (
                        <div key={section.group} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h2 className="font-bold text-gray-900 text-lg mb-5 pb-3 border-b border-gray-50">{section.group}</h2>
                            <div className="space-y-4">
                                {section.keys.map(({ key, label, type }) => (
                                    <div key={key}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                                        {type === 'boolean' ? (
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <div
                                                    onClick={() => updateSetting(key, !settings[key])}
                                                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${settings[key] ? 'bg-blue-700' : 'bg-gray-300'}`}
                                                >
                                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                                                </div>
                                                <span className="text-sm text-gray-600">{settings[key] ? 'Enabled' : 'Disabled'}</span>
                                            </label>
                                        ) : type === 'textarea' ? (
                                            <textarea
                                                value={settings[key] || ''}
                                                onChange={e => updateSetting(key, e.target.value)}
                                                rows={3}
                                                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                            />
                                        ) : (
                                            <input
                                                type={type}
                                                value={settings[key] || ''}
                                                onChange={e => updateSetting(key, e.target.value)}
                                                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Change password */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-bold text-gray-900 text-lg mb-5 pb-3 border-b border-gray-50">Change Password</h2>
                        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                            {[
                                { key: 'currentPassword', label: 'Current Password' },
                                { key: 'newPassword', label: 'New Password' },
                                { key: 'confirmPassword', label: 'Confirm New Password' },
                            ].map(({ key, label }) => (
                                <div key={key}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                                    <input
                                        type="password" value={pwForm[key]}
                                        onChange={e => setPwForm(p => ({ ...p, [key]: e.target.value }))}
                                        required minLength={key !== 'currentPassword' ? 6 : 1}
                                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                            <button type="submit" disabled={pwSaving} className="px-5 py-2.5 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-60 text-sm">
                                {pwSaving ? 'Changing...' : 'Change Password'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
