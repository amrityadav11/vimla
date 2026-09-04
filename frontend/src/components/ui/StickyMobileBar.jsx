import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';

export default function StickyMobileBar() {
    const { settings, getWhatsAppLink } = useSettings();

    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 xl:hidden"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 20 }}
        >
            {/* Safe area for phones with home bar */}
            <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 pt-3 pb-safe">
                <div className="flex gap-3 pb-3">
                    <a
                        href={`tel:${settings.phone}`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-800 text-white text-sm font-bold rounded-xl shadow-md active:scale-95 transition-transform"
                        aria-label="Call Now"
                    >
                        <Phone size={17} />
                        Call Now
                    </a>
                    <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white text-sm font-bold rounded-xl shadow-md active:scale-95 transition-transform"
                        aria-label="WhatsApp"
                    >
                        <MessageCircle size={17} />
                        WhatsApp
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
