import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import NavbarComponent from './components/NavbarComponent';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginSignupPage from './pages/LoginSignupPage';
import Dashboard from './pages/Dashboard';
import AddCampsitePage from './pages/AddCampsitePage';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';
import CampsiteDetail from './pages/CampsiteDetail';
import CampsitesPage from './pages/CampsitesPage';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <NavbarComponent />
          <div className="nav-spacer" />
          <Suspense fallback={<div className="text-center text-muted py-5">Loading…</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/signup" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginSignupPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-campsite" element={<AddCampsitePage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/campsites" element={<CampsitesPage />} />
              <Route path="/campsite/:id" element={<CampsiteDetail />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
