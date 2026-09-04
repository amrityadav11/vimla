import SEOHead from '../components/ui/SEOHead';
import Hero from '../components/home/Hero';
import TestMarquee from '../components/home/TestMarquee';
import TrustBar from '../components/home/TrustBar';
import PopularTests from '../components/home/PopularTests';
import TestCategories from '../components/home/TestCategories';
import AboutSection from '../components/home/AboutSection';
import HealthPackages from '../components/home/HealthPackages';
import WhyUs from '../components/home/WhyUs';
import HowItWorks from '../components/home/HowItWorks';
import BlogTeaser from '../components/home/BlogTeaser';
import GalleryTeaser from '../components/home/GalleryTeaser';
import Testimonials from '../components/home/Testimonials';
import FAQSection from '../components/home/FAQSection';
import ContactCTA from '../components/home/ContactCTA';
import MapSection from '../components/home/MapSection';
import StickyMobileBar from '../components/ui/StickyMobileBar';

export default function HomePage() {
    return (
        <>
            <SEOHead
                title="Pathology Laboratory — Reliable Diagnostics. Trusted Care."
                description="विमला जाँच घर (Vimla Janch Ghar) provides reliable pathology and diagnostic laboratory testing services including CBC, thyroid, liver, kidney, lipid profile, urine tests and more."
                canonical="/"
            />
            <Hero />
            <TestMarquee />
            <TrustBar />
            <PopularTests />
            <TestCategories />
            <AboutSection />
            <HealthPackages />
            <WhyUs />
            <HowItWorks />
            <BlogTeaser />
            <GalleryTeaser />
            <Testimonials />
            <FAQSection limit={5} />
            <ContactCTA />
            <MapSection />
            {/* Extra bottom padding on mobile to clear sticky bar */}
            <div className="xl:hidden h-20" aria-hidden="true" />
            <StickyMobileBar />
        </>
    );
}
