import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FlaskConical, Phone, MessageCircle, Microscope, Droplets, TestTube, Activity } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: 'easeOut' },
});

function LabIllustration() {
    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Main card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10 border border-gray-100">
                <div className="grid grid-cols-2 gap-5">
                    {/* Lab tech card */}
                    <div className="col-span-2 bg-blue-50 rounded-xl p-5 flex items-center gap-4">
                        <div className="w-14 h-14 bg-blue-800 rounded-xl flex items-center justify-center shadow-md">
                            <Microscope size={28} className="text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-blue-900 text-base">Laboratory Analysis</p>
                            <p className="text-xs text-blue-600 mt-0.5">Professional Testing</p>
                        </div>
                    </div>
                    {/* Small stat cards */}
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <TestTube size={20} className="text-white" />
                        </div>
                        <p className="text-xs font-semibold text-green-800">Blood Tests</p>
                        <p className="text-xs text-green-600 mt-0.5">CBC, LFT, KFT</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                        <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <Activity size={20} className="text-white" />
                        </div>
                        <p className="text-xs font-semibold text-amber-800">Thyroid Panel</p>
                        <p className="text-xs text-amber-600 mt-0.5">T3, T4, TSH</p>
                    </div>
                    {/* Report ready indicator */}
                    <div className="col-span-2 bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <div>
                            <p className="text-xs font-semibold text-gray-700">Timely Reporting</p>
                            <p className="text-xs text-gray-400">Most reports same day</p>
                        </div>
                        <div className="ml-auto">
                            <Droplets size={20} className="text-blue-400" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-60 blur-xl" aria-hidden="true" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-100 rounded-full opacity-50 blur-xl" aria-hidden="true" />
        </div>
    );
}

export default function Hero() {
    const { settings, getWhatsAppLink } = useSettings();

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5" aria-hidden="true">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left */}
                    <div>
                        {/* Badge */}
                        <motion.div {...fadeUp(0)}>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-800/60 border border-blue-700/50 text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm">
                                <FlaskConical size={14} />
                                Pathology Laboratory
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1 {...fadeUp(0.1)} className="devanagari text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-2">
                            विमला जाँच घर
                        </motion.h1>
                        <motion.p {...fadeUp(0.15)} className="text-xl sm:text-2xl text-blue-200 font-medium mb-5">
                            {settings.tagline || 'Reliable Diagnostics. Trusted Care.'}
                        </motion.p>
                        <motion.p {...fadeUp(0.2)} className="text-base text-blue-100/80 leading-relaxed max-w-lg mb-8">
                            Vimla Janch Ghar provides laboratory testing services with a focus on proper sample handling, hygienic procedures and timely reporting.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-3 mb-8">
                            <Link
                                to="/tests"
                                className="px-6 py-3 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-sm"
                            >
                                View Tests
                            </Link>
                            <Link
                                to="/contact"
                                className="px-6 py-3 bg-blue-700/70 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors border border-blue-600/50 text-sm"
                            >
                                Contact Us
                            </Link>
                            <a
                                href={getWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
                            >
                                <MessageCircle size={16} /> WhatsApp Us
                            </a>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div {...fadeUp(0.35)} className="flex flex-wrap gap-6 text-blue-200/80 text-sm">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-400 rounded-full" />
                                B.Sc. MLT Managed
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                                Hygienic Procedures
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                                Timely Reporting
                            </span>
                        </motion.div>
                    </div>

                    {/* Right - Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="hidden lg:block"
                    >
                        <LabIllustration />
                    </motion.div>
                </div>
            </div>

            {/* Wave bottom */}
            <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#f9fafb" />
                </svg>
            </div>
        </section>
    );
}
