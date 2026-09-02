import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16 lg:pt-18">
                {children}
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}
