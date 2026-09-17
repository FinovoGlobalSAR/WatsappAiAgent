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

            {/* Car Fleet Management - backend testing routes (no frontend auth guard) */}
            <Route path="/cars" element={<CarStatusList />} />
            <Route path="/car-status-list" element={<CarStatusList />} />
            <Route path="/admin/cars" element={<CarStatusList />} />

            {/* Add Car - backend testing route (no frontend auth guard) */}
            <Route path="/cars/add" element={<AddCarPage />} />
            <Route path="/add-car" element={<AddCarPage />} />
            <Route path="/admin/cars/add" element={<AddCarPage />} />

            {/* Edit Car - backend testing route (no frontend auth guard) */}
            <Route path="/cars/edit/:id" element={<EditCarPage />} />
            <Route path="/cars/edit" element={<EditCarPage />} />
            <Route path="/edit-car" element={<EditCarPage />} />
            <Route path="/admin/cars/edit/:id" element={<EditCarPage />} />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </CarProvider>
    </AuthProvider>
  );
}
