import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Clock, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import WhyUs from '../components/home/WhyUs';
import { useSettings } from '../context/SettingsContext';

export default function AboutPage() {
    const { settings, getWhatsAppLink } = useSettings();

    return (
        <>
            <SEOHead
                title="About Us"
                description="Learn about विमला जाँच घर (Vimla Janch Ghar), a local pathology and diagnostic laboratory managed by a B.Sc. MLT qualified professional."
                canonical="/about"
            />

            {/* Header */}
            <section className="bg-blue-950 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Our Story</p>
                        <h1 className="devanagari text-3xl sm:text-4xl font-bold text-white mb-3">
                            विमला जाँच घर के बारे में
                        </h1>
                        <p className="text-blue-200 text-sm max-w-xl mx-auto">About Vimla Janch Ghar — Local Pathology & Diagnostic Laboratory</p>
                    </motion.div>
                </div>
            </section>

            {/* About content */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
                            <div className="prose prose-sm text-gray-600 space-y-4">
                                <p>{settings.aboutText}</p>
                                <p>
                                    At विमला जाँच घर, we understand the importance of accurate and timely laboratory investigations in supporting healthcare decisions. Our focus is on providing reliable testing services to individuals and families in our community.
                                </p>
                                <p>
                                    We offer a wide range of laboratory investigations including hematology, clinical biochemistry, thyroid function tests, clinical pathology, serology and more — covering the investigations most commonly requested in routine and clinical practice.
                                </p>
                            </div>

                            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
                                <div className="flex items-start gap-3">
                                    <GraduationCap size={22} className="text-blue-700 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">Professional Qualification</p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Managed and operated by a qualified <strong>B.Sc. Medical Laboratory Technology (B.Sc. MLT)</strong> professional.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-5">Our Focus</h3>
                                <ul className="space-y-4">
                                    {[
                                        { icon: ShieldCheck, title: 'Hygienic Sample Collection', desc: 'We follow proper protocols to ensure safe and hygienic sample collection.', color: 'text-green-600 bg-green-50' },
                                        { icon: Clock, title: 'Timely Reporting', desc: 'We aim to provide reports in a timely manner, with most routine tests completed the same day.', color: 'text-blue-600 bg-blue-50' },
                                        { icon: CheckCircle, title: 'Reliable Testing', desc: 'Proper procedures and quality practices in handling and processing of samples.', color: 'text-purple-600 bg-purple-50' },
                                    ].map(item => (
                                        <li key={item.title} className="flex gap-3">
                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.color.split(' ')[1]}`}>
                                                <item.icon size={18} className={item.color.split(' ')[0]} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-5 bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-800 leading-relaxed">
                                Test information is provided for general informational purposes only. Please consult your doctor for guidance on which tests are appropriate for your situation.
                            </div>

                            <div className="mt-5 flex gap-3">
                                <a href={`tel:${settings.phone}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors text-sm">
                                    <Phone size={15} /> Call Us
                                </a>
                                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-sm">
                                    <MessageCircle size={15} /> WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <WhyUs />
        </>
    );
}
