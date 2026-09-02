import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Droplets, FlaskConical, Activity, Microscope, ShieldCheck, Sun, TrendingUp } from 'lucide-react';
import { categoriesApi } from '../../services/api';

const iconMap = {
    'droplets': Droplets,
    'flask-conical': FlaskConical,
    'activity': Activity,
    'microscope': Microscope,
    'shield-check': ShieldCheck,
    'sun': Sun,
    'trending-up': TrendingUp,
};

export default function TestCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoriesApi.getAll()
            .then(res => setCategories(res.data.data || []))
            .catch(() => { });
    }, []);

    if (categories.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">Browse by Department</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Test Categories</h2>
                    <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">Find the right laboratory test from our catalogue, organised by category.</p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((cat, i) => {
                        const Icon = iconMap[cat.icon] || FlaskConical;
                        return (
                            <motion.div
                                key={cat._id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                            >
                                <Link
                                    to={`/tests?category=${cat._id}`}
                                    className="flex flex-col items-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center group"
                                    aria-label={`Browse ${cat.name} tests`}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform"
                                        style={{ backgroundColor: `${cat.color}18` }}
                                    >
                                        <Icon size={22} style={{ color: cat.color }} />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-blue-800 transition-colors">{cat.name}</h3>
                                    {cat.description && (
                                        <p className="text-xs text-gray-400 line-clamp-2 hidden sm:block">{cat.description}</p>
                                    )}
                                    <span className="mt-2 text-xs font-medium text-blue-600 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Tests <ChevronRight size={12} />
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
