import { useEffect, useRef } from 'react';
import { FlaskConical } from 'lucide-react';

const tests = [
    'CBC (Complete Blood Count)',
    'Blood Sugar (Fasting / PP)',
    'Thyroid Panel (T3, T4, TSH)',
    'Liver Function Test (LFT)',
    'Kidney Function Test (KFT)',
    'Lipid Profile',
    'HbA1c (Diabetes)',
    'Urine Routine',
    'Dengue Test (NS1 / IgG / IgM)',
    'Malaria Antigen',
    'Widal Test (Typhoid)',
    'Vitamin D3',
    'Vitamin B12',
    'Serum Iron / TIBC',
    'ESR',
    'CRP (C-Reactive Protein)',
    'SGOT / SGPT',
    'Creatinine',
    'Uric Acid',
    'Stool Routine',
];

export default function TestMarquee() {
    // Duplicate for seamless loop
    const items = [...tests, ...tests];

    return (
        <div className="bg-blue-900 py-3 overflow-hidden border-y border-blue-800 select-none">
            <div className="flex gap-0 whitespace-nowrap animate-marquee">
                {items.map((test, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-2 text-blue-100 text-sm font-medium px-6"
                    >
                        <FlaskConical size={13} className="text-blue-400 shrink-0" />
                        {test}
                        <span className="text-blue-600 ml-4">·</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
