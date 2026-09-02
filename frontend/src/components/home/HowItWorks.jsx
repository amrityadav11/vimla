import { motion } from 'framer-motion';
import { Search, Phone, Droplets, FileText } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const steps = [
    { icon: Search, title: 'Choose Your Test', desc: 'Browse our test catalogue or packages, or ask our staff for guidance.' },
    { icon: Phone, title: 'Contact विमला जाँच घर', desc: 'Reach us by phone or WhatsApp to confirm your test and schedule.' },
    { icon: Droplets, title: 'Sample Collection', desc: null }, // dynamic
    { icon: FileText, title: 'Receive Your Report', desc: 'Your test report will be prepared and made available in a timely manner.' },
];

export default function HowItWorks() {
    const { settings } = useSettings();

    const dynamicSteps = steps.map(s => {
        if (s.title === 'Sample Collection') {
            return {
                ...s,
                desc: settings.homeCollection
                    ? 'Visit the laboratory for sample collection, or request home sample collection where available.'
                    : 'Visit the laboratory for sample collection during working hours.',
            };
        }
        return s;
    });

    return (
        <section className="py-16 bg-blue-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Simple Process</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">How It Works</h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {/* Connector line - desktop only */}
                    <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-blue-800 hidden lg:block" aria-hidden="true" />

                    {dynamicSteps.map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 }}
                            className="text-center relative z-10"
                        >
                            <div className="w-20 h-20 bg-blue-800 border-4 border-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <step.icon size={28} className="text-blue-200" />
                            </div>
                            <div className="absolute top-0 right-8 lg:right-auto lg:left-[calc(50%+26px)] w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center text-xs font-bold text-white hidden lg:flex" aria-hidden="true">
                                {i + 1}
                            </div>
                            <h3 className="font-bold text-white mb-2 text-base">{step.title}</h3>
                            <p className="text-sm text-blue-200/80 leading-relaxed px-2">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
