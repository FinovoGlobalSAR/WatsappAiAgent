import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CarProvider } from "./context/CarContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CustomerHome from "./pages/CustomerHome";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import CarStatusList from "./pages/CarStatusList";
import AddCarPage from "./pages/AddCarPage";
import EditCarPage from "./pages/EditCarPage";

export default function App() {
  return (
    <AuthProvider>
      <CarProvider>
        <BrowserRouter>
          <Routes>
            {/* Public redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Auth pages (public) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Customer-only */}
            <Route
              path="/home"
              element={
                <ProtectedRoute role="CUSTOMER">
                  <CustomerHome />
                </ProtectedRoute>
              }
            />

            {/* Admin-only: Dashboard & Users */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            {/* Admin-only: Car Fleet Management */}
            <Route
              path="/cars"
              element={
                <ProtectedRoute role="ADMIN">
                  <CarStatusList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/car-status-list"
              element={
                <ProtectedRoute role="ADMIN">
                  <CarStatusList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/cars"
              element={
                <ProtectedRoute role="ADMIN">
                  <CarStatusList />
                </ProtectedRoute>
              }
            />

            {/* Admin-only: Add Car */}
            <Route
              path="/cars/add"
              element={
                <ProtectedRoute role="ADMIN">
                  <AddCarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-car"
              element={
                <ProtectedRoute role="ADMIN">
                  <AddCarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/cars/add"
              element={
                <ProtectedRoute role="ADMIN">
                  <AddCarPage />
                </ProtectedRoute>
              }
            />

            {/* Admin-only: Edit Car */}
            <Route
              path="/cars/edit/:id"
              element={
                <ProtectedRoute role="ADMIN">
                  <EditCarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cars/edit"
              element={
                <ProtectedRoute role="ADMIN">
                  <EditCarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-car"
              element={
                <ProtectedRoute role="ADMIN">
                  <EditCarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/cars/edit/:id"
              element={
                <ProtectedRoute role="ADMIN">
                  <EditCarPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </CarProvider>
    </AuthProvider>
  );
}
