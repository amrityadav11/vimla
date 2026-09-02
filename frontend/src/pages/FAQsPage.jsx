import SEOHead from '../components/ui/SEOHead';
import FAQSection from '../components/home/FAQSection';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function FAQsPage() {
    const { settings, getWhatsAppLink } = useSettings();
    return (
        <>
            <SEOHead title="Frequently Asked Questions" description="Answers to common questions about laboratory tests, preparation, timing, home collection and more at विमला जाँच घर." canonical="/faqs" />

            <section className="bg-blue-950 py-14">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Frequently Asked Questions</h1>
                    <p className="text-blue-200 text-sm">Answers to common questions about our services.</p>
                </div>
            </section>

            <FAQSection limit={null} />

            <section className="py-12 bg-gray-50 border-t border-gray-100">
                <div className="max-w-xl mx-auto px-4 text-center">
                    <p className="text-gray-600 mb-4 text-sm">Have a question that's not answered here?</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <a href={`tel:${settings.phone}`} className="flex items-center gap-2 px-5 py-2.5 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors text-sm">
                            <Phone size={15} /> Call Us
                        </a>
                        <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-sm">
                            <MessageCircle size={15} /> WhatsApp
                        </a>
                        <Link to="/contact" className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-800 border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                            Contact Form
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
