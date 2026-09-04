import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Images } from 'lucide-react';

// Show first 6 photos as a preview
const previewPhotos = [
    { src: '/gallery/1788331741242.jpg', alt: 'विमला जाँच घर facility' },
    { src: '/gallery/1788331741253.jpg', alt: 'Laboratory workspace' },
    { src: '/gallery/1788331741264.jpg', alt: 'Testing equipment' },
    { src: '/gallery/1788331741276.jpg', alt: 'Sample collection area' },
    { src: '/gallery/1788331741292.jpg', alt: 'Blood testing setup' },
    { src: '/gallery/1788331741312.jpg', alt: 'Lab instruments' },
];

export default function GalleryTeaser() {
    return (
        <section className="py-14 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7"
                >
                    <div>
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">Our Facility</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Gallery</h2>
                        <p className="text-gray-500 text-sm mt-1.5">
                            A look inside the विमला जाँच घर laboratory.
                        </p>
                    </div>
                    <Link
                        to="/gallery"
                        className="flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors whitespace-nowrap"
                    >
                        <Images size={16} /> View All Photos <ChevronRight size={15} />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                    {previewPhotos.map((photo, i) => (
                        <motion.div
                            key={photo.src}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                        >
                            <Link
                                to="/gallery"
                                className="block aspect-square overflow-hidden rounded-xl bg-gray-200 group"
                                aria-label={photo.alt}
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-6">
                    <Link
                        to="/gallery"
                        className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-blue-800 border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
                    >
                        <Images size={16} /> View Full Gallery
                    </Link>
                </div>
            </div>
        </section>
    );
}
