import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

// Dasrath Chowk, Vidhan Bazar, Samastipur coordinates
const EMBED_SRC =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.4!2d85.7776!3d25.8653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a5b1e2c3d4e5%3A0xabcdef1234567890!2sDasrath%20Chowk%2C%20Vidhan%20Bazar%2C%20Samastipur%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

// Fallback: use the query param approach which always works
const EMBED_QUERY = 'Dasrath+Chowk+Vidhan+Bazar+Samastipur+Bihar';

export default function MapSection() {
    const { settings } = useSettings();

    return (
        <section className="py-14 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                        <MapPin size={12} />
                        Find Us
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Visit Our Laboratory</h2>
                    <p className="text-gray-500 text-sm">
                        {settings.address || 'Dasrath Chowk, Vidhan Bazar, Samastipur, Bihar'}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
                >
                    <iframe
                        title="विमला जाँच घर Location"
                        src={`https://maps.google.com/maps?q=${EMBED_QUERY}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                        width="100%"
                        height="380"
                        style={{ border: 0, display: 'block' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6"
                >
                    {settings.googleMapsUrl && (
                        <a
                            href={settings.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 text-white text-sm font-semibold rounded-xl hover:bg-blue-900 transition-colors shadow-md"
                        >
                            <Navigation size={15} />
                            Get Directions
                        </a>
                    )}
                    <a
                        href={`https://maps.google.com/?q=${EMBED_QUERY}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-800 border border-blue-200 text-sm font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                    >
                        <ExternalLink size={15} />
                        Open in Google Maps
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
