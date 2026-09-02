import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import { PageLoader } from './components/ui/LoadingSpinner';

// Public pages
const HomePage = lazy(() => import('./pages/HomePage'));
const TestsPage = lazy(() => import('./pages/TestsPage'));
const TestDetailPage = lazy(() => import('./pages/TestDetailPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const RequestTestPage = lazy(() => import('./pages/RequestTestPage'));
const FAQsPage = lazy(() => import('./pages/FAQsPage'));
const WhyUsPage = lazy(() => import('./pages/WhyUsPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminTests = lazy(() => import('./pages/admin/AdminTests'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminPackages = lazy(() => import('./pages/admin/AdminPackages'));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminFAQs = lazy(() => import('./pages/admin/AdminFAQs'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

function PublicOnlyRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;
  return children;
}

function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
        <h1 className="text-xl font-bold text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6 text-sm">The page you're looking for doesn't exist.</p>
        <a href="/" className="px-5 py-2.5 bg-blue-800 text-white rounded-xl text-sm font-semibold hover:bg-blue-900 transition-colors">
          Return Home
        </a>
      </div>
    </Layout>
  );
}

function SimpleInfoPage({ title, content }) {
  return (
    <Layout>
      <section className="bg-blue-950 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-sm text-gray-700 space-y-4">
          {content}
        </div>
      </section>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/about" element={<Layout><AboutPage /></Layout>} />
              <Route path="/tests" element={<Layout><TestsPage /></Layout>} />
              <Route path="/tests/:slug" element={<Layout><TestDetailPage /></Layout>} />
              <Route path="/packages" element={<Layout><PackagesPage /></Layout>} />
              <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
              <Route path="/request-test" element={<Layout><RequestTestPage /></Layout>} />
              <Route path="/faqs" element={<Layout><FAQsPage /></Layout>} />
              <Route path="/why-us" element={<Layout><WhyUsPage /></Layout>} />
              <Route path="/disclaimer" element={<Layout><DisclaimerPage /></Layout>} />

              {/* Static legal pages */}
              <Route path="/privacy" element={
                <SimpleInfoPage title="Privacy Policy" content={
                  <div>
                    <p>विमला जाँच घर collects personal information (name, contact details) only for the purpose of processing test enquiries and appointments.</p>
                    <p>Your information is not shared with third parties except as required by law.</p>
                    <p>For questions about your data, contact us directly.</p>
                  </div>
                } />
              } />
              <Route path="/terms" element={
                <SimpleInfoPage title="Terms & Conditions" content={
                  <div>
                    <p>By using this website, you agree that information provided is for general informational purposes only.</p>
                    <p>Test availability, pricing, and services are subject to change without notice.</p>
                    <p>Results and services should be discussed with a qualified healthcare professional.</p>
                  </div>
                } />
              } />

              {/* Admin routes */}
              <Route path="/admin/login" element={<PublicOnlyRoute><AdminLogin /></PublicOnlyRoute>} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/tests" element={<ProtectedRoute><AdminTests /></ProtectedRoute>} />
              <Route path="/admin/categories" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />
              <Route path="/admin/packages" element={<ProtectedRoute><AdminPackages /></ProtectedRoute>} />
              <Route path="/admin/enquiries" element={<ProtectedRoute><AdminEnquiries /></ProtectedRoute>} />
              <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
              <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
              <Route path="/admin/faqs" element={<ProtectedRoute><AdminFAQs /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
