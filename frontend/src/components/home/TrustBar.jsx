import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, ClipboardList, ShieldCheck, Clock, Home, Users, Award, TestTube } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

// Animated counter hook
function useCounter(target, duration = 1800, startOnVisible = true) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!startOnVisible) { setStarted(true); return; }
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    useEffect(() => {
        if (!started) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, target, duration]);

    return { count, ref };
}

function StatCounter({ value, suffix, label, color, bg, icon: Icon }) {
    const { count, ref } = useCounter(value);
    return (
        <div ref={ref} className={`${bg} rounded-xl p-5 text-center shadow-sm border border-gray-100`}>
            <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                <Icon size={22} className={color} />
            </div>
            <p className={`text-2xl font-extrabold ${color} mb-0.5`}>
                {count}{suffix}
            </p>
            <p className="font-semibold text-gray-700 text-sm">{label}</p>
        </div>
    );
}

const stats = [
    { value: 50, suffix: '+', label: 'Tests Available', color: 'text-blue-700', bg: 'bg-blue-50', icon: TestTube },
    { value: 500, suffix: '+', label: 'Patients Served', color: 'text-green-700', bg: 'bg-green-50', icon: Users },
    { value: 1, suffix: ' Day', label: 'Report Turnaround', color: 'text-amber-700', bg: 'bg-amber-50', icon: Clock },
    { value: 10, suffix: '+', label: 'Years Experience', color: 'text-purple-700', bg: 'bg-purple-50', icon: Award },
];

const baseTrust = [
    { icon: FlaskConical, title: 'Wide Range of Tests', desc: 'Hematology, biochemistry, thyroid, serology and more', color: 'text-blue-700', bg: 'bg-blue-50' },
    { icon: ClipboardList, title: 'Reliable Reporting', desc: 'Accurate documentation with timely result delivery', color: 'text-green-700', bg: 'bg-green-50' },
    { icon: ShieldCheck, title: 'Hygienic Procedures', desc: 'Safe and hygienic sample collection practices', color: 'text-purple-700', bg: 'bg-purple-50' },
    { icon: Clock, title: 'Timely Service', desc: 'Most routine results reported the same day', color: 'text-amber-700', bg: 'bg-amber-50' },
];

export default function TrustBar() {
    const { settings } = useSettings();
    const items = settings.homeCollection
        ? [...baseTrust, { icon: Home, title: 'Home Collection', desc: 'Sample collection at your doorstep (where available)', color: 'text-rose-700', bg: 'bg-rose-50' }]
        : baseTrust;

    return (
        <>
            {/* Animated Stats Row */}
            <section className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <StatCounter {...s} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Icons Row */}
            <section className="bg-gray-50 py-14 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`grid grid-cols-2 ${items.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-4 sm:gap-6`}>
                        {items.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100"
                            >
                                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                                    <item.icon size={22} className={item.color} />
                                </div>
                                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed hidden sm:block">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
