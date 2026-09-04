import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Tag, ChevronRight, BookOpen } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { blogPosts } from '../data/blogPosts';

const categories = ['All', ...new Set(blogPosts.map(p => p.category))];

function BlogCard({ post, index }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
        >
            {/* Cover image */}
            <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </div>

            <div className="p-5 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        <Tag size={10} /> {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={11} /> {post.readTime}
                    </span>
                </div>

                {/* Title */}
                <h2 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-blue-800 line-clamp-2">
                    {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1 mb-4">
                    {post.excerpt}
                </p>

                {/* Date + Read more */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="text-xs text-gray-400">
                        {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <Link
                        to={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                    >
                        Read More <ChevronRight size={14} />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All'
        ? blogPosts
        : blogPosts.filter(p => p.category === activeCategory);

    return (
        <>
            <SEOHead
                title="Health Articles & Blog"
                description="Read health articles on common laboratory tests, blood sugar, thyroid, liver, kidney, cholesterol and more from विमला जाँच घर."
                canonical="/blog"
            />

            {/* Header */}
            <section className="bg-blue-950 py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Health Information</p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Health Articles</h1>
                        <p className="text-blue-200 text-sm max-w-xl">
                            General health information about common laboratory tests and health topics. All articles are for informational purposes only — please consult your doctor for medical advice.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Disclaimer banner */}
            <div className="bg-amber-50 border-b border-amber-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <p className="text-xs text-amber-800 text-center">
                        <strong>Information disclaimer:</strong> All articles are for general informational purposes only. They do not constitute medical advice. Please follow your doctor's guidance for diagnosis and treatment.
                    </p>
                </div>
            </div>

            {/* Content */}
            <section className="bg-gray-50 py-10 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category filter */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeCategory === cat
                                        ? 'bg-blue-800 text-white'
                                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((post, i) => (
                            <BlogCard key={post.slug} post={post} index={i} />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-16 text-gray-400">
                            <BookOpen size={36} className="mx-auto mb-3" />
                            <p>No articles in this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
