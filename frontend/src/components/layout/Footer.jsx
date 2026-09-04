import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, FlaskConical, Clock } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function Footer() {
    const { settings, getWhatsAppLink } = useSettings();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="/logo.png"
                                alt="विमला जाँच घर"
                                className="h-12 w-12 rounded-xl object-contain bg-white p-1 shrink-0"
                                onError={e => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                            />
                            <div className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center shrink-0" style={{ display: 'none' }}>
                                <FlaskConical size={22} className="text-white" />
                            </div>
                            <div>
                                <span className="devanagari font-bold text-xl text-white block leading-tight">विमला जाँच घर</span>
                                <span className="text-xs text-blue-400 font-medium">Pathology Laboratory</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-5">
                            {settings.tagline || 'Reliable Diagnostics. Trusted Care.'}
                        </p>
                        <div className="flex items-start gap-2 text-sm text-gray-400">
                            <Clock size={15} className="mt-0.5 flex-shrink-0 text-blue-400" />
                            <span>{settings.openingHours}</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
                        <ul className="space-y-2.5">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/about', label: 'About Us' },
                                { to: '/tests', label: 'Test Catalogue' },
                                { to: '/packages', label: 'Health Packages' },
                                { to: '/gallery', label: 'Gallery' },
                                { to: '/blog', label: 'Health Articles' },
                                { to: '/faqs', label: 'FAQs' },
                                { to: '/contact', label: 'Contact' },
                                { to: '/request-test', label: 'Request a Test' },
                            ].map(link => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href={`tel:${settings.phone}`} className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                                    <Phone size={15} className="mt-0.5 flex-shrink-0 text-blue-400" />
                                    <span>{settings.phone}</span>
                                </a>
                            </li>
                            <li>
                                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                                    <MessageCircle size={15} className="mt-0.5 flex-shrink-0 text-green-400" />
                                    <span>WhatsApp</span>
                                </a>
                            </li>
                            {settings.email && (
                                <li>
                                    <a href={`mailto:${settings.email}`} className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                                        <Mail size={15} className="mt-0.5 flex-shrink-0 text-blue-400" />
                                        <span>{settings.email}</span>
                                    </a>
                                </li>
                            )}
                            <li className="flex items-start gap-2.5 text-sm text-gray-400">
                                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-blue-400" />
                                <span>{settings.address}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Information</h3>
                        <ul className="space-y-2.5 mb-6">
                            {[
                                { to: '/disclaimer', label: 'Medical Disclaimer' },
                                { to: '/privacy', label: 'Privacy Policy' },
                                { to: '/terms', label: 'Terms & Conditions' },
                            ].map(link => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-gray-800 rounded-lg p-3 text-xs text-gray-500 leading-relaxed">
                            Test information is for general informational purposes. Please follow your doctor's advice.
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-gray-500">© {year} <span className="devanagari">विमला जाँच घर</span>. All rights reserved.</p>
                    <p className="text-xs text-gray-600">Pathology &amp; Laboratory Services</p>
                </div>
            </div>
        </footer>
    );
}
