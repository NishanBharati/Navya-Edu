import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AdminLayout } from '../layouts/AdminLayout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { CoursesAdmin } from '../pages/CoursesAdmin';
import { ProgramsAdmin } from '../pages/ProgramsAdmin';
import { StudentWorkAdmin } from '../pages/StudentWorkAdmin';
import { InsightsAdmin } from '../pages/InsightsAdmin';
import { InquiriesAdmin } from '../pages/InquiriesAdmin';
import { SettingsAdmin } from '../pages/SettingsAdmin';

export const AdminRoutes: React.FC = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path=""
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<CoursesAdmin />} />
          <Route path="programs" element={<ProgramsAdmin />} />
          <Route path="student-work" element={<StudentWorkAdmin />} />
          <Route path="insights" element={<InsightsAdmin />} />
          <Route path="inquiries" element={<InquiriesAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
};
