import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';
import PackageCard from '../components/ui/PackageCard';
import { packagesApi } from '../services/api';
import { PageLoader } from '../components/ui/LoadingSpinner';

export default function PackagesPage() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        packagesApi.getAll()
            .then(res => setPackages(res.data.data || []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <SEOHead
                title="Health Check Packages"
                description="Browse health check packages at विमला जाँच घर including basic health check, diabetes screening, thyroid panel and more."
                canonical="/packages"
            />

            <section className="bg-blue-950 py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Health Check Packages</h1>
                    <p className="text-blue-200 text-sm max-w-xl">
                        Commonly grouped investigations. Package composition may vary. Please consult your doctor for advice on which tests are appropriate for you.
                    </p>
                </div>
            </section>

            <section className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <PageLoader />
                    ) : packages.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500">No packages available at the moment. Please contact us for more information.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {packages.map((pkg, i) => (
                                <motion.div
                                    key={pkg._id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <PackageCard pkg={pkg} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="mt-10 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-800/70 leading-relaxed">
                        Package contents are for informational purposes and subject to availability. These packages are not a substitute for medical consultation. Please consult your doctor for appropriate test selection.
                    </div>
                </div>
            </section>
        </>
    );
}
