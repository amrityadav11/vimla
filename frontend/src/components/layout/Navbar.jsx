import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, FlaskConical, LogIn } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/tests', label: 'Tests' },
    { to: '/packages', label: 'Packages' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/blog', label: 'Blog' },
    { to: '/why-us', label: 'Why Us' },
    { to: '/faqs', label: 'FAQs' },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { settings, getWhatsAppLink } = useSettings();
    const location = useLocation();

    useEffect(() => { setOpen(false); }, [location]);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="विमला जाँच घर - Home">
                        <img
                            src="/logo.png"
                            alt="विमला जाँच घर"
                            className="h-10 w-10 rounded-xl object-contain bg-white border border-blue-100 shadow-sm group-hover:shadow-md transition-shadow p-0.5"
                            onError={e => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                        />
                        <div className="w-10 h-10 bg-blue-800 rounded-xl items-center justify-center shadow-sm group-hover:bg-blue-900 transition-colors" style={{ display: 'none' }}>
                            <FlaskConical size={20} className="text-white" />
                        </div>
                        <div>
                            <span className="devanagari font-bold text-xl text-blue-900 leading-tight block">विमला जाँच घर</span>
                            <span className="text-xs text-blue-600 font-medium tracking-wide hidden sm:block">Pathology Laboratory</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden xl:flex items-center gap-0.5">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === '/'}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${isActive ? 'bg-blue-50 text-blue-800' : 'text-gray-700 hover:text-blue-800 hover:bg-gray-50'}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden xl:flex items-center gap-2 shrink-0">
                        <a
                            href={`tel:${settings.phone}`}
                            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                            aria-label="Call Now"
                        >
                            <Phone size={15} />
                            <span>Call</span>
                        </a>
                        <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                            aria-label="WhatsApp"
                        >
                            <MessageCircle size={15} />
                            WhatsApp
                        </a>
                        <Link
                            to="/admin/login"
                            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            aria-label="Admin Login"
                        >
                            <LogIn size={15} />
                            Login
                        </Link>
                    </div>

                    {/* Mobile: show call + wa + hamburger */}
                    <div className="xl:hidden flex items-center gap-2">
                        <a
                            href={`tel:${settings.phone}`}
                            className="p-2 text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            aria-label="Call Now"
                        >
                            <Phone size={18} />
                        </a>
                        <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            aria-label="WhatsApp"
                        >
                            <MessageCircle size={18} />
                        </a>
                        <button
                            onClick={() => setOpen(!open)}
                            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                        >
                            {open ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="xl:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map(link => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    end={link.to === '/'}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-800' : 'text-gray-700 hover:bg-gray-50'}`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}

                            {/* Mobile CTA row */}
                            <div className="pt-3 pb-1 border-t border-gray-100 mt-2 space-y-2">
                                <div className="flex gap-2">
                                    <a
                                        href={`tel:${settings.phone}`}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-blue-800 border border-blue-200 rounded-lg"
                                    >
                                        <Phone size={15} /> Call Now
                                    </a>
                                    <a
                                        href={getWhatsAppLink()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg"
                                    >
                                        <MessageCircle size={15} /> WhatsApp
                                    </a>
                                </div>
                                <Link
                                    to="/admin/login"
                                    className="flex items-center justify-center gap-1.5 w-full py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <LogIn size={15} /> Admin Login
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
