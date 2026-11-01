import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AboutPage } from './pages/AboutPage';

import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPolicyPage, TermsPage } from './pages/LegalPages';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();

  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard') || location.pathname === '/admin';
  const isAdminLogin = location.pathname === '/admin/login';

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      
      {/* Show public navbar on non-admin dashboard pages */}
      {!isAdminDashboard && (
        <Navbar onOpenSearch={() => setSearchModalOpen(true)} />
      )}

      {/* Main Page Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/packages/:slug" element={<PackageDetailPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/plan-trip" element={<TripPlannerPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Show public footer on non-admin dashboard pages */}
      {!isAdminDashboard && !isAdminLogin && (
        <Footer />
      )}

      {/* Interactive Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
