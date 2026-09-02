import { motion } from 'framer-motion';
import { GraduationCap, ShieldCheck, Clock, FileText, MessageCircle, MapPin } from 'lucide-react';

const reasons = [
    {
        icon: GraduationCap,
        title: 'Qualified Laboratory Professional',
        desc: 'Managed and operated by a B.Sc. Medical Laboratory Technology (B.Sc. MLT) qualified professional.',
        color: 'text-blue-700', bg: 'bg-blue-50',
    },
    {
        icon: ShieldCheck,
        title: 'Hygienic Sample Handling',
        desc: 'We follow proper hygiene protocols for all sample collection and handling procedures.',
        color: 'text-green-700', bg: 'bg-green-50',
    },
    {
        icon: Clock,
        title: 'Timely Reporting',
        desc: 'Most routine test reports are prepared and delivered the same day.',
        color: 'text-amber-700', bg: 'bg-amber-50',
    },
    {
        icon: FileText,
        title: 'Transparent Information',
        desc: 'Clear test information, preparation requirements and pricing (where applicable) available on this website.',
        color: 'text-purple-700', bg: 'bg-purple-50',
    },
    {
        icon: MessageCircle,
        title: 'Patient-Friendly Support',
        desc: 'Reach us easily by phone or WhatsApp. Our staff will guide you through the process.',
        color: 'text-rose-700', bg: 'bg-rose-50',
    },
    {
        icon: MapPin,
        title: 'Convenient Service',
        desc: 'Conveniently located to serve residents of the local community.',
        color: 'text-cyan-700', bg: 'bg-cyan-50',
    },
];

export default function WhyUs() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">Our Promise</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Choose विमला जाँच घर?</h2>
                    <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
                        We aim to provide professional, hygienic and reliable laboratory services to our local community.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reasons.map((r, i) => (
                        <motion.div
                            key={r.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-200"
                        >
                            <div className={`w-11 h-11 ${r.bg} rounded-xl flex items-center justify-center shrink-0`}>
                                <r.icon size={21} className={r.color} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1.5 text-sm">{r.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
