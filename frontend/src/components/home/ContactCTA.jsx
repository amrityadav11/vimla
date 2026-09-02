import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function ContactCTA() {
    const { settings, getWhatsAppLink } = useSettings();

    return (
        <section className="py-16 bg-blue-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="devanagari text-2xl sm:text-3xl font-bold text-white mb-3">
                        Ready to Book a Test?
                    </h2>
                    <p className="text-blue-200 mb-8 text-sm max-w-xl mx-auto">
                        Contact विमला जाँच घर by phone or WhatsApp to enquire about tests, packages, and appointments.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        <a
                            href={`tel:${settings.phone}`}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-lg"
                        >
                            <Phone size={16} /> Call Now
                        </a>
                        <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors text-sm"
                        >
                            <MessageCircle size={16} /> WhatsApp Us
                        </a>
                        <Link
                            to="/request-test"
                            className="flex items-center gap-2 px-6 py-3 bg-blue-700/60 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors border border-blue-600/50 text-sm"
                        >
                            <Mail size={16} /> Request a Test
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                        <span>{settings.phone}</span>
                        <span>•</span>
                        <span>{settings.openingHours}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
