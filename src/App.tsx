import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';

const AdminRoutes = lazy(() => import('./admin/routes/AdminRoutes').then((m) => ({ default: m.AdminRoutes })));

const PublicSite: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-navy selection:text-white">
    <Navbar />
    <div className="flex-1">
      <AppRoutes />
    </div>
    <Footer />
  </div>
);

const AdminLoading: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-paper-alt">
    <div className="w-8 h-8 rounded-full border-2 border-navy/20 border-t-navy animate-spin" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminLoading />}>
              <AdminRoutes />
            </Suspense>
          }
        />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
  );
}
