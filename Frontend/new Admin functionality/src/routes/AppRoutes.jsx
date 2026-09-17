import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CarStatusList from '../pages/CarStatusList';
import AddCarPage from '../pages/AddCarPage';
import EditCarPage from '../pages/EditCarPage';

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Navigate to="/car-status-list" replace />} />
    <Route path="/car-status-list" element={<CarStatusList />} />
    <Route path="/cars" element={<CarStatusList />} />
    <Route path="/add-car" element={<AddCarPage />} />
    <Route path="/cars/add" element={<AddCarPage />} />
    <Route path="/edit-car" element={<EditCarPage />} />
    <Route path="/cars/edit" element={<EditCarPage />} />
    <Route path="/cars/edit/:id" element={<EditCarPage />} />
    <Route path="*" element={<Navigate to="/car-status-list" replace />} />
  </Routes>;
}
