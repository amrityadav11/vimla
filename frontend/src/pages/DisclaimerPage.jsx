import SEOHead from '../components/ui/SEOHead';
import { useSettings } from '../context/SettingsContext';

export default function DisclaimerPage() {
    const { settings } = useSettings();
    return (
        <>
            <SEOHead title="Medical Disclaimer" canonical="/disclaimer" />
            <section className="bg-blue-950 py-14">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl font-bold text-white">Medical Disclaimer</h1>
                </div>
            </section>
            <section className="py-12 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="prose prose-sm text-gray-700 space-y-4">
                        <p className="text-base font-medium text-gray-800">{settings.disclaimer}</p>
                        <p>Test descriptions and information provided on this website are for general informational purposes only. They do not constitute medical advice, diagnosis or treatment recommendations.</p>
                        <p>Laboratory test results should always be interpreted by a qualified healthcare professional in the context of clinical symptoms and history.</p>
                        <p>If you have concerns about your health or test results, please consult a licensed medical professional.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
