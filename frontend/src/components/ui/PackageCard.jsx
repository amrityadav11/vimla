import { Link } from 'react-router-dom';
import { Check, ChevronRight, IndianRupee } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function PackageCard({ pkg }) {
    const { settings } = useSettings();

    return (
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-50" style={{ borderTop: `3px solid ${pkg.color || '#1e40af'}` }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{pkg.name}</h3>
                    {pkg.isPopular && (
                        <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            Popular
                        </span>
                    )}
                </div>
                {pkg.shortDescription && (
                    <p className="text-sm text-gray-500 leading-relaxed">{pkg.shortDescription}</p>
                )}
            </div>

            {/* Test list */}
            <div className="p-6 flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Includes</p>
                <ul className="space-y-2">
                    {(pkg.testNames || pkg.tests?.map(t => t.name) || []).slice(0, 6).map((name, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <Check size={14} className="shrink-0 text-green-600" />
                            {name}
                        </li>
                    ))}
                    {(pkg.testNames || pkg.tests || []).length > 6 && (
                        <li className="text-xs text-gray-400 pl-5">
                            +{(pkg.testNames || pkg.tests).length - 6} more tests
                        </li>
                    )}
                </ul>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
                {settings.showPrices && pkg.showPrice && pkg.price ? (
                    <div>
                        <span className="text-xs text-gray-400">Package price</span>
                        <div className="flex items-center gap-0.5 font-bold text-blue-900 text-xl">
                            <IndianRupee size={16} />{pkg.price}
                        </div>
                    </div>
                ) : (
                    <span className="text-sm text-gray-400 italic">Contact for price</span>
                )}
                <Link
                    to={`/request-test?package=${encodeURIComponent(pkg.name)}`}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors hover:opacity-90"
                    style={{ backgroundColor: pkg.color || '#1e40af' }}
                    aria-label={`Request ${pkg.name}`}
                >
                    Enquire <ChevronRight size={14} />
                </Link>
            </div>

            {/* Disclaimer */}
            {pkg.disclaimer && (
                <p className="px-6 pb-4 text-xs text-gray-400 italic leading-relaxed">{pkg.disclaimer}</p>
            )}
        </article>
    );
}
