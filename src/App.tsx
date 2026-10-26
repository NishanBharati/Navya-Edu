import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';
import { MotionConfig } from 'framer-motion';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { BackToTop } from './components/common/BackToTop';

const AdminRoutes = lazy(() => import('./admin/routes/AdminRoutes').then((m) => ({ default: m.AdminRoutes })));

const PublicSite: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-paper text-ink">
    {/* Accessible skip link for keyboard & screen-reader users */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-navy focus:text-white focus:font-semibold focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to main content
    </a>
    <Navbar />
    <div id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
      <AppRoutes />
    </div>
    <Footer />
    <BackToTop />
  </div>
);

const AdminLoading: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-paper-alt">
    <div className="w-8 h-8 rounded-full border-2 border-navy/20 border-t-navy animate-spin" />
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      {/* reducedMotion="user": Framer drops transform animations (keeps opacity) when the OS asks for less motion */}
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route
              path="/admin/*"
              element={
                <ErrorBoundary fallbackTitle="Admin Portal Error" fallbackDescription="An unexpected error occurred in the administrative workstation. Your unsaved modifications have been protected.">
                  <Suspense fallback={<AdminLoading />}>
                    <AdminRoutes />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route path="/*" element={<PublicSite />} />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </ErrorBoundary>
  );
}
