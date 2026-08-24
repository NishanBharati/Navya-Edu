import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const FullScreenLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F4F1EA]">
    <div className="w-8 h-8 rounded-full border-2 border-[#17324D]/20 border-t-[#17324D] animate-spin" />
  </div>
);

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};
