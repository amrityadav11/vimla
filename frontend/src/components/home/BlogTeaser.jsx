import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Tag } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';

export default function BlogTeaser() {
    const featured = blogPosts.slice(0, 3);

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
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">Health Information</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Health Articles</h2>
                        <p className="text-gray-500 mt-1.5 text-sm max-w-lg">
                            General information about common laboratory tests and health topics. Always consult your doctor for medical advice.
                        </p>
                    </div>
                    <Link
                        to="/blog"
                        className="flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors whitespace-nowrap"
                    >
                        All Articles <ChevronRight size={16} />
                    </Link>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((post, i) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group"
                        >
                            {/* Thumbnail */}
                            <div className="aspect-video overflow-hidden bg-gray-100">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                                        <Tag size={10} /> {post.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                        <Clock size={11} /> {post.readTime}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-blue-800 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                                >
                                    Read Article <ChevronRight size={14} />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <p className="text-center text-xs text-gray-400 mt-8">
                    Articles are for general informational purposes. Please follow your doctor's advice.
                </p>
            </div>
        </section>
    );
}
