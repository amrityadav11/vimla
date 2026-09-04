import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const highlights = [
    'Professional laboratory testing services',
    'Managed by a B.Sc. MLT qualified professional',
    'Focus on hygienic sample handling',
    'Timely and accurate reporting',
];

export default function AboutSection() {
    const { settings } = useSettings();

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-700/30 rounded-full -translate-y-12 translate-x-12" aria-hidden="true" />
                            <div className="relative z-10">
                                {/* Real logo */}
                                <div className="mb-6">
                                    <img
                                        src="/logo.png"
                                        alt="विमला जाँच घर"
                                        className="w-20 h-20 rounded-2xl object-contain bg-white p-1.5 shadow-lg"
                                        onError={e => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                                    />
                                    <div className="w-20 h-20 bg-white/10 rounded-2xl items-center justify-center" style={{ display: 'none' }}>
                                        <GraduationCap size={32} className="text-blue-200" />
                                    </div>
                                </div>
                                <h3 className="devanagari text-2xl font-bold text-white mb-1">विमला जाँच घर</h3>
                                <p className="text-blue-200 text-sm mb-6">Vimla Janch Ghar — Pathology Laboratory</p>
                                <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
                                    <p className="text-sm text-blue-100 font-medium mb-1">Managed by</p>
                                    <p className="text-white font-semibold">Azad Kumar Raman</p>
                                    <p className="text-blue-200 text-xs mt-1">B.Sc. M.L.T (Path)</p>
                                    <p className="text-blue-300 text-xs mt-0.5">Dr. B.R. Ambedkar Institute of Punjab</p>
                                </div>
                                <div className="mt-5 bg-white/10 rounded-xl p-4 text-xs text-blue-200">
                                    Test information is provided for general information. Please follow your doctor's advice regarding which tests are appropriate for you.
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-3">About Us</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            About <span className="devanagari text-blue-900">विमला जाँच घर</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {settings.aboutText || 'विमला जाँच घर is a local diagnostic and pathology testing centre providing laboratory investigation and reporting services. We are managed by a B.Sc. Medical Laboratory Technology (B.Sc. MLT) qualified professional with a focus on proper sample handling, hygienic procedures and timely reporting.'}
                        </p>
                        <ul className="space-y-3 mb-8">
                            {highlights.map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                                    <CheckCircle size={17} className="text-green-600 mt-0.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors text-sm"
                        >
                            Learn More <ArrowRight size={15} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
