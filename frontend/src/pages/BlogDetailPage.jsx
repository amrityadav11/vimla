import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Tag, ArrowLeft, ChevronRight, AlertTriangle, Phone, MessageCircle } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { getBlogBySlug, getRelatedBlogs } from '../data/blogPosts';
import { useSettings } from '../context/SettingsContext';

// Render content that has **bold** markdown-like syntax
function RichText({ text }) {
    const parts = text.split('\n');
    return (
        <div className="space-y-3">
            {parts.map((line, i) => {
                if (!line.trim()) return null;
                // Bullet points
                if (line.startsWith('• ')) {
                    const inner = line.slice(2);
                    return (
                        <div key={i} className="flex gap-2">
                            <span className="text-blue-600 mt-1 shrink-0">•</span>
                            <span className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: inner.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>
                    );
                }
                // Sub-heading with **
                if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={i} className="font-bold text-gray-800 text-sm pt-1">{line.slice(2, -2)}</p>;
                }
                return (
                    <p
                        key={i}
                        className="text-gray-600 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
                    />
                );
            })}
        </div>
    );
}

export default function BlogDetailPage() {
    const { slug } = useParams();
    const { settings, getWhatsAppLink } = useSettings();
    const post = getBlogBySlug(slug);

    if (!post) return <Navigate to="/blog" replace />;

    const related = getRelatedBlogs(slug, post.category, 3);

    return (
        <>
            <SEOHead
                title={post.title}
                description={post.excerpt}
                canonical={`/blog/${post.slug}`}
                ogImage={post.coverImage}
            />

            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-blue-700">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/blog" className="hover:text-blue-700">Blog</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium truncate">{post.category}</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-700 mb-6 transition-colors"
                >
                    <ArrowLeft size={15} /> Back to Articles
                </Link>

                <article>
                    {/* Cover image */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl overflow-hidden aspect-video mb-8 bg-gray-100"
                    >
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Meta */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="flex flex-wrap items-center gap-3 mb-4"
                    >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                            <Tag size={11} /> {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock size={12} /> {post.readTime}
                        </span>
                        <span className="text-xs text-gray-400">
                            {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4"
                    >
                        {post.title}
                    </motion.h1>

                    {/* Excerpt */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-base text-blue-800/80 font-medium leading-relaxed mb-8 bg-blue-50 rounded-xl p-4"
                    >
                        {post.excerpt}
                    </motion.p>

                    {/* Disclaimer banner */}
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
                        <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800 leading-relaxed">{post.disclaimer}</p>
                    </div>

                    {/* Article body */}
                    <div className="space-y-8">
                        {post.content.map((section, i) => (
                            <motion.section
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                                    {section.heading}
                                </h2>
                                <RichText text={section.body} />
                            </motion.section>
                        ))}
                    </div>

                    {/* Bottom disclaimer */}
                    <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5">
                        <p className="text-xs text-gray-500 leading-relaxed text-center">
                            <strong>Disclaimer:</strong> {post.disclaimer}
                        </p>
                    </div>
                </article>

                {/* CTA */}
                <div className="mt-10 bg-blue-900 rounded-2xl p-6 sm:p-8 text-center">
                    <h3 className="devanagari text-xl font-bold text-white mb-2">Need a Laboratory Test?</h3>
                    <p className="text-blue-200 text-sm mb-5">
                        Contact विमला जाँच घर to enquire about tests, packages, and appointments.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <a
                            href={`tel:${settings.phone}`}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm"
                        >
                            <Phone size={15} /> Call Now
                        </a>
                        <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-sm"
                        >
                            <MessageCircle size={15} /> WhatsApp
                        </a>
                        <Link
                            to="/request-test"
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-700/60 border border-blue-600/50 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
                        >
                            Request a Test
                        </Link>
                    </div>
                </div>

                {/* Related articles */}
                {related.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-lg font-bold text-gray-900 mb-5">Related Articles</h3>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {related.map(rp => (
                                <Link
                                    key={rp.slug}
                                    to={`/blog/${rp.slug}`}
                                    className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
                                >
                                    <div className="aspect-video overflow-hidden bg-gray-100">
                                        <img
                                            src={rp.coverImage}
                                            alt={rp.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <span className="text-xs font-semibold text-blue-600">{rp.category}</span>
                                        <p className="text-sm font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-blue-800 transition-colors">
                                            {rp.title}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
