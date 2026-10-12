import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages Import
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddCar from './pages/AddCar';
import AboutUs from './pages/AboutUs';
import AboutContact from './pages/AboutContact';
import Dashboard1 from './pages/Dashboard1'; 
import Dashboard2 from './pages/Dashboard2';
import Dashboard3 from './pages/Dashboard3';
import Dashboard4 from './pages/Dashboard4';
import AvailableCars from './pages/AvailableCars';
import CarDetailPage1 from './pages/CardetailPage1';
import Cmpltbooking from './pages/Cmpltbooking';
// Auth Pages
import Login1 from './pages/login1';
import Login2 from './pages/login2';
import Login3 from './pages/login3';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarDetailPage1 />} />

        {/* Dashboards Routes */}
        <Route path="/dashboard1" element={<Dashboard1 />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/dashboard3" element={<Dashboard3 />} />
        <Route path="/dashboard4" element={<Dashboard4 />} />

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

        <Route path="/available-cars" element={<AvailableCars />} />
        <Route path="/car-detail" element={<CarDetailPage1 />} />
        <Route path="/complete-booking" element={<Cmpltbooking />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}