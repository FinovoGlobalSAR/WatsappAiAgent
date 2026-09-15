import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages Import
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddCar from './pages/AddCar';
import AboutUs from './pages/AboutUs';
import AboutContact from './pages/AboutContact';

// Auth Pages
import Login1 from './pages/login1';
import Login2 from './pages/login2';
import Login3 from './pages/login3';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutUs />} />

        {/* Page Routes */}
        <Route path="/contact" element={<AboutContact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/add-car" element={<AddCar />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/login1" element={<Login1 />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/login3" element={<Login3 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}