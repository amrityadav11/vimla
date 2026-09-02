import { motion } from 'framer-motion';
import { FlaskConical, ClipboardList, ShieldCheck, Clock, Home } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const baseTrust = [
    { icon: FlaskConical, title: 'Wide Range of Tests', desc: 'Hematology, biochemistry, thyroid, serology and more', color: 'text-blue-700', bg: 'bg-blue-50' },
    { icon: ClipboardList, title: 'Reliable Reporting', desc: 'Accurate documentation with timely result delivery', color: 'text-green-700', bg: 'bg-green-50' },
    { icon: ShieldCheck, title: 'Hygienic Procedures', desc: 'Safe and hygienic sample collection practices', color: 'text-purple-700', bg: 'bg-purple-50' },
    { icon: Clock, title: 'Timely Service', desc: 'Most routine results reported the same day', color: 'text-amber-700', bg: 'bg-amber-50' },
];

export default function TrustBar() {
    const { settings } = useSettings();
    const items = settings.homeCollection
        ? [...baseTrust, { icon: Home, title: 'Home Collection', desc: 'Sample collection at your doorstep (where available)', color: 'text-rose-700', bg: 'bg-rose-50' }]
        : baseTrust;

    return (
        <section className="bg-gray-50 py-14 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid grid-cols-2 ${items.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-4 sm:gap-6`}>
                    {items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100"
                        >
                            <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                                <item.icon size={22} className={item.color} />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed hidden sm:block">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
