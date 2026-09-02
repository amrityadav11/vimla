import SEOHead from '../components/ui/SEOHead';
import WhyUs from '../components/home/WhyUs';
import HowItWorks from '../components/home/HowItWorks';
import ContactCTA from '../components/home/ContactCTA';

export default function WhyUsPage() {
    return (
        <>
            <SEOHead title="Why Choose Us" description="Learn why विमला जाँच घर is a trusted choice for pathology and laboratory testing services." canonical="/why-us" />
            <section className="bg-blue-950 py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Why Choose Us</h1>
                    <p className="text-blue-200 text-sm max-w-xl">Our commitment to professional, hygienic and reliable laboratory services.</p>
                </div>
            </section>
            <WhyUs />
            <HowItWorks />
            <ContactCTA />
        </>
    );
}
