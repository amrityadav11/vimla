import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { faqsApi } from '../../services/api';

function FAQItem({ faq, isOpen, onToggle }) {
    return (
        <div className="border border-gray-100 rounded-xl overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-gray-900 text-sm leading-relaxed">{faq.question}</span>
                <ChevronDown
                    size={18}
                    className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-5 pt-0 bg-white border-t border-gray-50">
                            <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQSection({ limit = 5 }) {
    const [faqs, setFaqs] = useState([]);
    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        faqsApi.getActive()
            .then(res => setFaqs(res.data.data || []))
            .catch(() => { });
    }, []);

    if (faqs.length === 0) return null;
    const shown = limit ? faqs.slice(0, limit) : faqs;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">Common Questions</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </motion.div>

                <div className="space-y-3">
                    {shown.map(faq => (
                        <FAQItem
                            key={faq._id}
                            faq={faq}
                            isOpen={openId === faq._id}
                            onToggle={() => setOpenId(openId === faq._id ? null : faq._id)}
                        />
                    ))}
                </div>

                {limit && faqs.length > limit && (
                    <div className="text-center mt-8">
                        <Link
                            to="/faqs"
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-800 border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
                        >
                            View All FAQs
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
