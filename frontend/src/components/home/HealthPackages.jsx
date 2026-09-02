import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { packagesApi } from '../../services/api';
import PackageCard from '../ui/PackageCard';

export default function HealthPackages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        packagesApi.getAll()
            .then(res => setPackages(res.data.data || []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (!loading && packages.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
                >
                    <div>
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">Grouped Investigations</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Health Check Packages</h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-xl">
                            Commonly grouped tests. Package composition is subject to availability. Always consult your doctor for advice on which tests are appropriate for you.
                        </p>
                    </div>
                    <Link to="/packages" className="flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 whitespace-nowrap">
                        All Packages <ChevronRight size={16} />
                    </Link>
                </motion.div>

                {loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100" />)}
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.slice(0, 3).map((pkg, i) => (
                            <motion.div
                                key={pkg._id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <PackageCard pkg={pkg} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {packages.length > 3 && (
                    <div className="text-center mt-8">
                        <Link to="/packages" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-900 transition-colors text-sm">
                            View All Packages <ChevronRight size={16} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
