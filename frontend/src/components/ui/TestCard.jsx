import { Link } from 'react-router-dom';
import { Droplets, FlaskConical, Clock, IndianRupee, ChevronRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function TestCard({ test }) {
    const { settings } = useSettings();

    return (
        <article className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
            <div className="p-5">
                {/* Category badge */}
                <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        <FlaskConical size={11} />
                        {test.category?.name || 'Laboratory Test'}
                    </span>
                    {test.isPopular && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            Popular
                        </span>
                    )}
                </div>

                {/* Name */}
                <h3 className="font-semibold text-gray-900 text-base mb-1.5 group-hover:text-blue-800 transition-colors line-clamp-2">
                    {test.name}
                </h3>

                {/* Short description */}
                {test.shortDescription && (
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{test.shortDescription}</p>
                )}

                {/* Meta */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                        <Droplets size={12} className="text-blue-400" />
                        {test.sampleType || 'Blood'}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={12} className="text-blue-400" />
                        {test.reportTime || 'Same Day'}
                    </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    {settings.showPrices && test.showPrice && test.price ? (
                        <span className="flex items-center gap-0.5 font-bold text-blue-900 text-base">
                            <IndianRupee size={14} />
                            {test.price}
                        </span>
                    ) : (
                        <span className="text-xs text-gray-400 italic">Contact for price</span>
                    )}
                    <Link
                        to={`/tests/${test.slug}`}
                        className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                        aria-label={`View details for ${test.name}`}
                    >
                        View Details <ChevronRight size={15} />
                    </Link>
                </div>
            </div>
        </article>
    );
}
