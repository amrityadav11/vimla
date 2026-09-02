import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplets, Clock, Phone, MessageCircle, ChevronRight, AlertCircle, IndianRupee, ArrowLeft, FlaskConical } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { testsApi } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import { PageLoader } from '../components/ui/LoadingSpinner';

export default function TestDetailPage() {
    const { slug } = useParams();
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const { settings, getWhatsAppLink } = useSettings();

    useEffect(() => {
        setLoading(true);
        testsApi.getBySlug(slug)
            .then(res => setTest(res.data.data))
            .catch(err => { if (err.response?.status === 404) setNotFound(true); })
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <PageLoader />;

    if (notFound || !test) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
                <AlertCircle size={48} className="text-gray-300 mb-4" />
                <h1 className="text-xl font-bold text-gray-800 mb-2">Test Not Found</h1>
                <p className="text-gray-500 mb-6">This test is not available or the URL may be incorrect.</p>
                <Link to="/tests" className="px-5 py-2.5 bg-blue-800 text-white rounded-xl text-sm font-semibold hover:bg-blue-900 transition-colors">
                    Browse All Tests
                </Link>
            </div>
        );
    }

    const waLink = getWhatsAppLink(`Hello विमला जाँच घर, I would like to enquire about the ${test.name} test.`);

    return (
        <>
            <SEOHead
                title={test.name}
                description={test.shortDescription || test.description?.slice(0, 155) || `${test.name} - ${test.category?.name} test at विमला जाँच घर.`}
                canonical={`/tests/${test.slug}`}
            />

            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-blue-700">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/tests" className="hover:text-blue-700">Tests</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium truncate">{test.name}</span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Link to="/tests" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-700 mb-6 transition-colors">
                    <ArrowLeft size={15} /> Back to Tests
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header card */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                        >
                            <div className="flex items-start gap-4 mb-5">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${test.category?.color || '#1e40af'}18` }}>
                                    <FlaskConical size={26} style={{ color: test.category?.color || '#1e40af' }} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">{test.category?.name}</p>
                                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">{test.name}</h1>
                                    {test.isPopular && <span className="mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Popular Test</span>}
                                </div>
                            </div>

                            {/* Quick info */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { label: 'Sample', value: test.sampleType || 'Blood', icon: Droplets },
                                    { label: 'Report Time', value: test.reportTime || 'Same Day', icon: Clock },
                                ].map(item => (
                                    <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
                                        <item.icon size={16} className="text-blue-500 mx-auto mb-1" />
                                        <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                                        <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                                    </div>
                                ))}
                                {settings.showPrices && test.showPrice && test.price && (
                                    <div className="bg-blue-50 rounded-xl p-3 text-center col-span-2 sm:col-span-2">
                                        <IndianRupee size={16} className="text-blue-700 mx-auto mb-1" />
                                        <p className="text-xs text-gray-500 mb-0.5">Price</p>
                                        <p className="text-lg font-bold text-blue-900 flex items-center justify-center gap-0.5">
                                            <IndianRupee size={14} />{test.price}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* About test */}
                        {test.description && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                            >
                                <h2 className="font-bold text-gray-900 text-lg mb-3">What is this test?</h2>
                                <p className="text-gray-600 text-sm leading-relaxed">{test.description}</p>
                            </motion.div>
                        )}

                        {/* Preparation */}
                        {test.preparation && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="bg-amber-50 border border-amber-100 rounded-2xl p-6"
                            >
                                <h2 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                                    <AlertCircle size={18} className="text-amber-600" /> Preparation Required
                                </h2>
                                <p className="text-gray-700 text-sm leading-relaxed">{test.preparation}</p>
                            </motion.div>
                        )}

                        {/* Parameters */}
                        {test.parameters?.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                            >
                                <h2 className="font-bold text-gray-900 text-lg mb-4">Parameters Included</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {test.parameters.map((param, i) => (
                                        <div key={i} className="bg-blue-50 rounded-lg p-3">
                                            <p className="text-xs font-semibold text-gray-800">{param.name}</p>
                                            {param.unit && <p className="text-xs text-gray-400 mt-0.5">{param.unit}</p>}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Disclaimer */}
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
                            Test information is provided for general informational purposes only and should not be considered medical advice. Test selection and result interpretation should be discussed with a qualified healthcare professional.
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {/* Contact card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-blue-900 rounded-2xl p-6 text-white sticky top-24"
                        >
                            <h3 className="font-bold text-lg mb-2">Need this test?</h3>
                            <p className="text-blue-200 text-sm mb-5">Contact विमला जाँच घर to enquire about this test.</p>
                            <div className="space-y-3">
                                <a
                                    href={`tel:${settings.phone}`}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm"
                                >
                                    <Phone size={16} /> Call Now
                                </a>
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-sm"
                                >
                                    <MessageCircle size={16} /> WhatsApp
                                </a>
                                <Link
                                    to={`/request-test?test=${encodeURIComponent(test.name)}`}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-700/60 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors border border-blue-600/50 text-sm"
                                >
                                    Request Test
                                </Link>
                            </div>
                            <div className="mt-4 pt-4 border-t border-blue-800 text-xs text-blue-200/70">
                                {settings.openingHours}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
