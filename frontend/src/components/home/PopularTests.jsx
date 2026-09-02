import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { testsApi } from '../../services/api';
import TestCard from '../ui/TestCard';

export default function PopularTests() {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        testsApi.getAll({ popular: 'true', limit: 8 })
            .then(res => setTests(res.data.data || []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (!loading && tests.length === 0) return null;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
                >
                    <div>
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">Frequently Requested</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popular Laboratory Tests</h2>
                    </div>
                    <Link to="/tests" className="flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors whitespace-nowrap">
                        View All Tests <ChevronRight size={16} />
                    </Link>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-100 rounded-xl h-52 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {tests.map((test, i) => (
                            <motion.div
                                key={test._id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                            >
                                <TestCard test={test} />
                            </motion.div>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <Link
                        to="/tests"
                        className="inline-flex items-center gap-2 px-7 py-3 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors text-sm"
                    >
                        Browse All Tests <ChevronRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
