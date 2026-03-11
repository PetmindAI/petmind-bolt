import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import AIAssistantPage from './pages/AIAssistantPage';
import HealthScannerPage from './pages/HealthScannerPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminCouponsPage from './pages/AdminCouponsPage';
import AdminVetsPage from './pages/AdminVetsPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import PetProfilePage from './pages/PetProfilePage';
import VetsPage from './pages/VetsPage';
import VetProfilePage from './pages/VetProfilePage';
import VetDashboardPage from './pages/VetDashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import DataDeletionPage from './pages/DataDeletionPage';
import OAuthCallbackPage from './pages/OAuthCallbackPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading PetMind AI...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function Layout() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const publicPaths = ['/', '/privacy', '/terms', '/data-deletion'];
  const authPaths = ['/login', '/signup', '/reset-password', '/auth/callback'];
  const isPublicPage = publicPaths.includes(location.pathname);
  const isAuthPage = authPaths.includes(location.pathname);

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };

  const getActivePage = () => {
    const path = location.pathname.slice(1);
    return path || 'home';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && !isPublicPage && user && <Header onNavigate={handleNavigate} />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/privacy" element={<PrivacyPage onNavigate={handleNavigate} />} />
        <Route path="/terms" element={<TermsPage onNavigate={handleNavigate} />} />
        <Route path="/data-deletion" element={<DataDeletionPage onNavigate={handleNavigate} />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage onNavigate={handleNavigate} />} />
        <Route path="/signup" element={<SignupPage onNavigate={handleNavigate} />} />
        <Route path="/reset-password" element={<ResetPasswordPage onNavigate={handleNavigate} />} />
        <Route path="/auth/callback" element={<OAuthCallbackPage />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage onNavigate={handleNavigate} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <MarketplacePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistant"
          element={
            <ProtectedRoute>
              <AIAssistantPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scanner"
          element={
            <ProtectedRoute>
              <HealthScannerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage onNavigate={handleNavigate} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage onNavigate={handleNavigate} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/coupons"
          element={
            <ProtectedRoute>
              <AdminCouponsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets"
          element={
            <ProtectedRoute>
              <PetProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vets"
          element={
            <ProtectedRoute>
              <VetsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vet/:id"
          element={
            <ProtectedRoute>
              <VetProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vet-dashboard"
          element={
            <ProtectedRoute>
              <VetDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vets"
          element={
            <ProtectedRoute>
              <AdminVetsPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      {!isAuthPage && !isPublicPage && user && (
        <BottomNav activePage={getActivePage()} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
