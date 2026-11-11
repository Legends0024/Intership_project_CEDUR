import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FaqsPage from './pages/FaqsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import BlogPage from './pages/BlogPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WorkspacePage from './pages/WorkspacePage';
import { AuthProvider } from './context/AuthContext';

export function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Layout>
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/features" element={<Navigate to="/products" replace />} />

            {/* Individual Product Deep-Dives matching live site URLs */}
            <Route
              path="/hr-software"
              element={<ProductDetailPage productSlug="hr-software" />}
            />
            <Route
              path="/payroll-software"
              element={<ProductDetailPage productSlug="payroll-software" />}
            />
            <Route
              path="/leave-management-software"
              element={<ProductDetailPage productSlug="leave-management-software" />}
            />
            <Route
              path="/attendance-management-software"
              element={<ProductDetailPage productSlug="attendance-management-software" />}
            />
            <Route
              path="/employee-self-service-portal"
              element={<ProductDetailPage productSlug="employee-self-service-portal" />}
            />
            <Route
              path="/mobile-app"
              element={<ProductDetailPage productSlug="mobile-app" />}
            />
            <Route
              path="/expense-management-software"
              element={<ProductDetailPage productSlug="expense-management-software" />}
            />
            <Route
              path="/geofence-attendance-software"
              element={<ProductDetailPage productSlug="geofence-attendance-software" />}
            />

            {/* Pricing Pages (Supports both /pricing and live site /plans) */}
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/plans" element={<PricingPage />} />

            {/* Company & Support Pages (Supports both short & live site slug aliases) */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/contact" element={<SupportPage />} />
            <Route path="/contact-us" element={<SupportPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faqs" element={<FaqsPage />} />

            {/* Resources / Blog */}
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/resources" element={<BlogPage />} />

            {/* Legal */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />

            {/* Local Auth Pages (Local UI with zero external redirects) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signin" element={<Navigate to="/login" replace />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signup" element={<Navigate to="/register" replace />} />

            {/* Workspace & HR Dashboard (Authenticated View) */}
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/dashboard" element={<Navigate to="/workspace" replace />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  </HelmetProvider>
  );
}

export default App;
