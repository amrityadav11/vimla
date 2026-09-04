import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';

// All 11 real photos from /gallery/
const photos = [
    { src: '/gallery/1788331741242.jpg', alt: 'विमला जाँच घर — Laboratory facility' },
    { src: '/gallery/1788331741253.jpg', alt: 'विमला जाँच घर — Sample collection area' },
    { src: '/gallery/1788331741264.jpg', alt: 'विमला जाँच घर — Testing equipment' },
    { src: '/gallery/1788331741276.jpg', alt: 'विमला जाँच घर — Laboratory workspace' },
    { src: '/gallery/1788331741292.jpg', alt: 'विमला जाँच घर — Blood sample testing' },
    { src: '/gallery/1788331741312.jpg', alt: 'विमला जाँच घर — Laboratory instruments' },
    { src: '/gallery/1788331741332.jpg', alt: 'विमला जाँच घर — Pathology department' },
    { src: '/gallery/1788331741350.jpg', alt: 'विमला जाँच घर — Reception and waiting area' },
    { src: '/gallery/1788331741369.jpg', alt: 'विमला जाँच घर — Lab infrastructure' },
    { src: '/gallery/1788331741389.jpg', alt: 'विमला जाँच घर — Diagnostic services' },
    { src: '/gallery/1788331741405.jpg', alt: 'विमला जाँच घर — Professional environment' },
];

export default function GalleryPage() {
    const [lightbox, setLightbox] = useState(null); // index or null

    const open = (i) => setLightbox(i);
    const close = () => setLightbox(null);
    const prev = () => setLightbox(i => (i - 1 + photos.length) % photos.length);
    const next = () => setLightbox(i => (i + 1) % photos.length);

    // Keyboard nav
    const handleKey = (e) => {
        if (lightbox === null) return;
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'Escape') close();
    };

    return (
        <>
            <SEOHead
                title="Gallery"
                description="Photos of विमला जाँच घर (Vimla Janch Ghar) pathology laboratory — our facility, equipment and professional environment."
                canonical="/gallery"
            />

            {/* Header */}
            <section className="bg-blue-950 py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Our Facility</p>
                        <h1 className="devanagari text-3xl sm:text-4xl font-bold text-white mb-2">
                            Gallery — विमला जाँच घर
                        </h1>
                        <p className="text-blue-200 text-sm">
                            A look inside our pathology laboratory — our workspace, equipment and professional environment.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-12 bg-gray-50 min-h-screen" onKeyDown={handleKey} tabIndex={-1}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {photos.map((photo, i) => (
                            <motion.button
                                key={photo.src}
                                initial={{ opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04 }}
                                onClick={() => open(i)}
                                className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-label={`View ${photo.alt}`}
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-colors duration-200 flex items-center justify-center">
                                    <Image
                                        size={28}
                                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    />
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-8">
                        Photos show the विमला जाँच घर facility. Click any photo to enlarge.
                    </p>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                        onClick={close}
                        onKeyDown={handleKey}
                        tabIndex={0}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Photo lightbox"
                    >
                        {/* Close */}
                        <button
                            onClick={close}
                            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-10"
                            aria-label="Close"
                        >
                            <X size={22} />
                        </button>

                        {/* Prev */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-3 sm:left-6 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                            aria-label="Previous photo"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={lightbox}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="max-w-4xl max-h-[80vh] mx-16 sm:mx-20"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={photos[lightbox].src}
                                alt={photos[lightbox].alt}
                                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                            />
                            <p className="text-center text-white/60 text-sm mt-3">{photos[lightbox].alt}</p>
                            <p className="text-center text-white/40 text-xs mt-1">
                                {lightbox + 1} / {photos.length}
                            </p>
                        </motion.div>

                        {/* Next */}
                        <button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-3 sm:right-6 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                            aria-label="Next photo"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
