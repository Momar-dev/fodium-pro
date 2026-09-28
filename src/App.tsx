/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProDataProvider } from './context/ProDataContext';
import { ProLayout } from './components/layout/ProLayout';
import { UniverseSelection } from './pages/UniverseSelection';
import { Login } from './pages/Login';
import { PinUnlock } from './pages/PinUnlock';
import { OperationalHome } from './pages/OperationalHome';
import { EventsList } from './pages/EventsList';
import { EventManagement } from './pages/EventManagement';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { Profile } from './pages/Profile';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isPinLocked } = useAuth();
  const location = useLocation();

  if (isPinLocked) {
    return <Navigate to="/pin-unlock" replace state={{ from: location }} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <ProDataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public flow & Gateways */}
            <Route path="/welcome" element={<UniverseSelection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pin-unlock" element={<PinUnlock />} />

            {/* Authenticated Pro Workspace */}
            <Route
              element={
                <ProtectedRoute>
                  <ProLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<OperationalHome />} />
              <Route path="/events" element={<EventsList />} />
              <Route path="/events/:eventId" element={<EventManagement />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/dashboard" element={<AnalyticsDashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ProDataProvider>
    </AuthProvider>
  );
}
