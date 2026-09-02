export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
    const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-12" role="status" aria-label={text}>
            <div className={`${sizes[size]} border-3 border-gray-200 border-t-blue-700 rounded-full animate-spin`} />
            {text && <p className="text-sm text-gray-500">{text}</p>}
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <LoadingSpinner size="lg" text="Loading..." />
        </div>
    );
}
