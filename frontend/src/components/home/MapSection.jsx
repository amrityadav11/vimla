import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function MapSection() {
    const { settings } = useSettings();

    return (
        <section className="py-14 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
                >
                    <div className="flex items-center gap-2">
                        <MapPin size={20} className="text-blue-700" />
                        <h2 className="text-lg font-bold text-gray-900">Find Us</h2>
                    </div>
                    {settings.googleMapsUrl && (
                        <a
                            href={settings.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                        >
                            Get Directions <ExternalLink size={14} />
                        </a>
                    )}
                </motion.div>

                <div className="bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 aspect-video max-h-72 flex items-center justify-center">
                    <div className="text-center p-8">
                        <MapPin size={36} className="text-blue-300 mx-auto mb-3" />
                        <p className="font-semibold text-gray-700 devanagari mb-1">विमला जाँच घर</p>
                        <p className="text-sm text-gray-500 mb-4">{settings.address}</p>
                        {settings.googleMapsUrl && (
                            <a
                                href={settings.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-800 text-white text-sm font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                            >
                                Open in Google Maps <ExternalLink size={14} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
