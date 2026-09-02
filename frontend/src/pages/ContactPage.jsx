import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { messagesApi } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const { settings, getWhatsAppLink } = useSettings();
    const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.message.trim()) e.message = 'Message is required';
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        try {
            await messagesApi.create(form);
            setSent(true);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputCls = (name) => `w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`;

    return (
        <>
            <SEOHead title="Contact Us" description="Contact विमला जाँच घर by phone, WhatsApp or email for test enquiries and appointments." canonical="/contact" />

            <section className="bg-blue-950 py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Contact Us</h1>
                    <p className="text-blue-200 text-sm">Reach विमला जाँच घर for test enquiries, appointments, or any questions.</p>
                </div>
            </section>

            <section className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Contact info */}
                        <div className="space-y-5">
                            <motion.div
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                            >
                                <h2 className="font-bold text-gray-900 text-lg mb-5">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                            <Phone size={18} className="text-blue-700" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium mb-0.5">Phone</p>
                                            <a href={`tel:${settings.phone}`} className="font-semibold text-gray-900 hover:text-blue-800 transition-colors">{settings.phone}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                                            <MessageCircle size={18} className="text-green-700" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium mb-0.5">WhatsApp</p>
                                            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 hover:text-green-700 transition-colors">
                                                Send WhatsApp Message
                                            </a>
                                        </div>
                                    </div>
                                    {settings.email && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                                <Mail size={18} className="text-blue-700" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-medium mb-0.5">Email</p>
                                                <a href={`mailto:${settings.email}`} className="font-semibold text-gray-900 hover:text-blue-800 transition-colors">{settings.email}</a>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center shrink-0">
                                            <MapPin size={18} className="text-rose-700" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium mb-0.5">Address</p>
                                            <p className="font-medium text-gray-800 text-sm">{settings.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                                            <Clock size={18} className="text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium mb-0.5">Opening Hours</p>
                                            <p className="font-medium text-gray-800 text-sm">{settings.openingHours}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-6 pt-5 border-t border-gray-50">
                                    <a href={`tel:${settings.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-bold text-white bg-blue-800 rounded-xl hover:bg-blue-900 transition-colors">
                                        <Phone size={14} /> Call Now
                                    </a>
                                    <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors">
                                        <MessageCircle size={14} /> WhatsApp
                                    </a>
                                </div>
                            </motion.div>

                            {/* Map */}
                            <div className="bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 aspect-video flex items-center justify-center">
                                <div className="text-center p-6">
                                    <MapPin size={28} className="text-blue-400 mx-auto mb-2" />
                                    <p className="devanagari font-semibold text-gray-700 mb-1">विमला जाँच घर</p>
                                    <p className="text-xs text-gray-500 mb-3">{settings.address}</p>
                                    {settings.googleMapsUrl && (
                                        <a href={settings.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900">
                                            Get Directions <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contact form */}
                        <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
                        >
                            {sent ? (
                                <div className="text-center py-12">
                                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-500 text-sm">Thank you for reaching out. We will get back to you soon.</p>
                                    <button onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', subject: '', message: '' }); }} className="mt-5 text-sm text-blue-700 font-medium hover:text-blue-900">
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="font-bold text-gray-900 text-xl mb-6">Send a Message</h2>
                                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">Name <span className="text-red-500">*</span></label>
                                                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" className={inputCls('name')} />
                                                {errors.name && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                                                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Mobile number" className={inputCls('phone')} />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                                            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputCls('email')} />
                                            {errors.email && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                                            <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} placeholder="e.g. Test enquiry, Report query..." className={inputCls('subject')} />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                                            <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Your message..." className={`${inputCls('message')} resize-none`} />
                                            {errors.message && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.message}</p>}
                                        </div>
                                        <button type="submit" disabled={loading} className="w-full py-3 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-60 text-sm">
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
