import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonialsApi } from '../../services/api';

function StarRating({ rating }) {
    return (
        <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={14} className={s <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
            ))}
        </div>
    );
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        testimonialsApi.getApproved()
            .then(res => setTestimonials(res.data.data || []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (!loading && testimonials.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">Patient Feedback</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What Our Patients Say</h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.article
                            key={t._id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        >
                            <Quote size={24} className="text-blue-200 mb-3" />
                            <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{t.review}"</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                                    {t.location && <p className="text-xs text-gray-400">{t.location}</p>}
                                </div>
                                <StarRating rating={t.rating} />
                            </div>
                        </motion.article>
                    ))}
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Testimonials are shared by real patients. Results and experiences may vary.
                </p>
            </div>
        </section>
    );
}
