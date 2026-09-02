import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import TestCard from '../components/ui/TestCard';
import { testsApi, categoriesApi } from '../services/api';
import { PageLoader } from '../components/ui/LoadingSpinner';

export default function TestsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [tests, setTests] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get('q') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [total, setTotal] = useState(0);

    const fetchTests = useCallback(() => {
        setLoading(true);
        const params = { limit: 100 };
        if (search) params.search = search;
        if (selectedCategory) params.category = selectedCategory;
        testsApi.getAll(params)
            .then(res => { setTests(res.data.data || []); setTotal(res.data.total || 0); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [search, selectedCategory]);

    useEffect(() => { fetchTests(); }, [fetchTests]);
    useEffect(() => { categoriesApi.getAll().then(r => setCategories(r.data.data || [])).catch(() => { }); }, []);

    const handleSearch = (val) => {
        setSearch(val);
        const p = new URLSearchParams(searchParams);
        if (val) p.set('q', val); else p.delete('q');
        setSearchParams(p);
    };

    const handleCategory = (id) => {
        const newCat = selectedCategory === id ? '' : id;
        setSelectedCategory(newCat);
        const p = new URLSearchParams(searchParams);
        if (newCat) p.set('category', newCat); else p.delete('category');
        setSearchParams(p);
    };

    return (
        <>
            <SEOHead
                title="Test Catalogue — All Laboratory Tests"
                description="Browse the complete list of laboratory tests available at विमला जाँच घर including CBC, blood sugar, thyroid, liver, kidney, lipid profile, urine tests and more."
                canonical="/tests"
            />

            {/* Header */}
            <section className="bg-blue-950 py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Test Catalogue</h1>
                    <p className="text-blue-200 text-sm max-w-xl">
                        Browse all available laboratory tests. Test information is for general reference. Please consult your doctor for test selection.
                    </p>
                </div>
            </section>

            <section className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search & Filters */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
                        <div className="flex flex-col sm:flex-row gap-3 mb-4">
                            <div className="relative flex-1">
                                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="search"
                                    placeholder="Search CBC, thyroid, sugar, liver, kidney..."
                                    value={search}
                                    onChange={e => handleSearch(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                    aria-label="Search tests"
                                />
                                {search && (
                                    <button onClick={() => handleSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Category chips */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleCategory('')}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${!selectedCategory ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                All Categories
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat._id}
                                    onClick={() => handleCategory(cat._id)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedCategory === cat._id ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="flex items-center justify-between mb-5">
                        <p className="text-sm text-gray-500">
                            {loading ? 'Loading...' : `${total} test${total !== 1 ? 's' : ''} found`}
                            {selectedCategory && categories.find(c => c._id === selectedCategory) && (
                                <span className="ml-1 text-blue-700 font-medium">
                                    in {categories.find(c => c._id === selectedCategory)?.name}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Tests grid */}
                    {loading ? (
                        <PageLoader />
                    ) : tests.length === 0 ? (
                        <div className="text-center py-20">
                            <SlidersHorizontal size={40} className="text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">No tests found</p>
                            <p className="text-sm text-gray-400 mt-1">Try a different search term or category</p>
                            <button onClick={() => { handleSearch(''); handleCategory(''); }} className="mt-4 text-sm text-blue-700 font-medium hover:text-blue-900">
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {tests.map((test, i) => (
                                <motion.div
                                    key={test._id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: Math.min(i * 0.04, 0.4) }}
                                >
                                    <TestCard test={test} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Disclaimer */}
                    <div className="mt-10 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-800/70 leading-relaxed">
                        Test information is provided for general information only. Please follow your doctor's advice regarding which tests are appropriate for you. Test availability is subject to the laboratory's current capabilities.
                    </div>
                </div>
            </section>
        </>
    );
}
