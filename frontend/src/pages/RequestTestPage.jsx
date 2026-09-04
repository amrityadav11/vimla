import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { enquiriesApi, testsApi, packagesApi } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import toast from 'react-hot-toast';

const timeSlots = [
    '7:00 AM – 9:00 AM',
    '9:00 AM – 11:00 AM',
    '11:00 AM – 1:00 PM',
    '2:00 PM – 4:00 PM',
    '4:00 PM – 6:00 PM',
];

// Field wrapper defined OUTSIDE component so it never remounts
function FieldWrapper({ label, required, hint, error, children }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
            {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
            {error && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />{error}
                </p>
            )}
        </div>
    );
}

export default function RequestTestPage() {
    const [searchParams] = useSearchParams();
    const { settings, getWhatsAppLink } = useSettings();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tests, setTests] = useState([]);
    const [packages, setPackages] = useState([]);

    const defaultTest = searchParams.get('test') || searchParams.get('package') || '';

    const [form, setForm] = useState({
        fullName: '',
        mobile: '',
        email: '',
        testOrPackage: defaultTest,
        preferredDate: '',
        preferredTime: '',
        homeCollection: false,
        message: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        testsApi.getAll({ limit: 100 }).then(r => setTests(r.data.data || [])).catch(() => { });
        packagesApi.getAll().then(r => setPackages(r.data.data || [])).catch(() => { });
    }, []);

    const today = new Date().toISOString().split('T')[0];

    // Stable handler — doesn't change on every render
    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        setErrors(prev => prev[name] ? { ...prev, [name]: '' } : prev);
    }, []);

    const validate = () => {
        const e = {};
        if (!form.fullName.trim()) e.fullName = 'Name is required';
        if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\D/g, '')))
            e.mobile = 'Enter a valid 10-digit mobile number';
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            e.email = 'Enter a valid email address';
        if (!form.testOrPackage.trim())
            e.testOrPackage = 'Please enter or select a test/package';
        if (form.preferredDate && form.preferredDate < today)
            e.preferredDate = 'Date cannot be in the past';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        try {
            await enquiriesApi.create(form);
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputCls = (name) =>
        `w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
        }`;

    if (submitted) {
        return (
            <>
                <SEOHead title="Request Submitted" />
                <div className="min-h-[70vh] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full text-center"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                            <CheckCircle size={40} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Submitted!</h2>
                        <p className="text-gray-600 mb-6 text-sm">
                            Thank you, {form.fullName}. We have received your enquiry and will contact you on{' '}
                            {form.mobile} shortly.
                        </p>
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-sm text-gray-700">
                            <p className="font-semibold mb-2">Want a faster response?</p>
                            <a
                                href={getWhatsAppLink(
                                    `Hello, I just submitted a test enquiry for ${form.testOrPackage}. My name is ${form.fullName}.`
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                                <MessageCircle size={16} /> Follow up on WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div>
            </>
        );
    }

    return (
        <>
            <SEOHead
                title="Request a Test"
                description="Submit a test enquiry or appointment request at विमला जाँच घर."
                canonical="/request-test"
            />

            <section className="bg-blue-950 py-14">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Request a Test</h1>
                    <p className="text-blue-200 text-sm">
                        Fill out the form below and we will contact you to confirm your appointment.
                    </p>
                </div>
            </section>

            <section className="bg-gray-50 py-12 min-h-screen">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                        <form onSubmit={handleSubmit} noValidate className="space-y-5">

                            {/* Row 1: Name + Mobile */}
                            <div className="grid sm:grid-cols-2 gap-5">
                                <FieldWrapper label="Full Name" required error={errors.fullName}>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        className={inputCls('fullName')}
                                        autoComplete="name"
                                    />
                                </FieldWrapper>

                                <FieldWrapper
                                    label="Mobile Number"
                                    required
                                    hint="10-digit Indian mobile number"
                                    error={errors.mobile}
                                >
                                    <input
                                        id="mobile"
                                        name="mobile"
                                        type="tel"
                                        value={form.mobile}
                                        onChange={handleChange}
                                        placeholder="98765 43210"
                                        className={inputCls('mobile')}
                                        autoComplete="tel"
                                        maxLength={10}
                                    />
                                </FieldWrapper>
                            </div>

                            {/* Email */}
                            <FieldWrapper label="Email Address" hint="Optional — for confirmation" error={errors.email}>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className={inputCls('email')}
                                    autoComplete="email"
                                />
                            </FieldWrapper>

                            {/* Test/Package */}
                            <FieldWrapper label="Test / Package" required error={errors.testOrPackage}>
                                <input
                                    id="testOrPackage"
                                    name="testOrPackage"
                                    type="text"
                                    value={form.testOrPackage}
                                    onChange={handleChange}
                                    placeholder="e.g. CBC, Thyroid Profile, Basic Health Check..."
                                    list="test-suggestions"
                                    className={inputCls('testOrPackage')}
                                    autoComplete="off"
                                />
                                <datalist id="test-suggestions">
                                    {tests.map(t => <option key={t._id} value={t.name} />)}
                                    {packages.map(p => <option key={p._id} value={p.name} />)}
                                </datalist>
                            </FieldWrapper>

                            {/* Date + Time */}
                            <div className="grid sm:grid-cols-2 gap-5">
                                <FieldWrapper label="Preferred Date" error={errors.preferredDate}>
                                    <input
                                        id="preferredDate"
                                        name="preferredDate"
                                        type="date"
                                        value={form.preferredDate}
                                        onChange={handleChange}
                                        min={today}
                                        className={inputCls('preferredDate')}
                                    />
                                </FieldWrapper>

                                <FieldWrapper label="Preferred Time">
                                    <select
                                        id="preferredTime"
                                        name="preferredTime"
                                        value={form.preferredTime}
                                        onChange={handleChange}
                                        className={inputCls('preferredTime')}
                                    >
                                        <option value="">Select a time slot</option>
                                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </FieldWrapper>
                            </div>

                            {/* Home collection — only if enabled in settings */}
                            {settings.homeCollection && (
                                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                                    <input
                                        type="checkbox"
                                        id="homeCollection"
                                        name="homeCollection"
                                        checked={form.homeCollection}
                                        onChange={handleChange}
                                        className="mt-0.5 w-4 h-4 rounded accent-green-600"
                                    />
                                    <label htmlFor="homeCollection" className="text-sm text-gray-700 cursor-pointer">
                                        <span className="font-semibold">Request Home Sample Collection</span>
                                        <span className="block text-xs text-gray-500 mt-0.5">
                                            Subject to availability in your area. Our staff will confirm.
                                        </span>
                                    </label>
                                </div>
                            )}

                            {/* Message */}
                            <FieldWrapper label="Additional Information" error={errors.message}>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Any specific instructions or questions..."
                                    className={`${inputCls('message')} resize-none`}
                                />
                            </FieldWrapper>

                            {/* Submit */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                                >
                                    {loading ? 'Submitting...' : 'Submit Enquiry'}
                                </button>
                            </div>

                            {/* Direct contact */}
                            <div className="text-center">
                                <p className="text-xs text-gray-400 mb-3">Or contact us directly:</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <a
                                        href={`tel:${settings.phone}`}
                                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        <Phone size={14} /> {settings.phone}
                                    </a>
                                    <a
                                        href={getWhatsAppLink()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <MessageCircle size={14} /> WhatsApp
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
