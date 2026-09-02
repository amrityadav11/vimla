import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';

export default function WhatsAppButton() {
    const { getWhatsAppLink } = useSettings();

    return (
        <motion.a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <MessageCircle size={26} fill="white" />
            <span
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"
                aria-hidden="true"
            />
            <span
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
                aria-hidden="true"
            />
        </motion.a>
    );
}
