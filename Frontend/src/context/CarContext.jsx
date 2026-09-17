import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_CARS } from '../data/carsData';

const CarContext = createContext(null);
const STORAGE_KEY = 'finovo_fleet_cars_v1';

export function CarProvider({ children }) {
  const [cars, setCars] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback on parse error
    }
    return INITIAL_CARS;
  });

  const [navbarSearch, setNavbarSearch] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
    } catch {
      // Ignore quota errors
    }
  }, [cars]);

  // Dynamic statistics calculated directly from state
  const stats = useMemo(() => {
    return {
      total: cars.length,
      available: cars.filter(c => c.status === 'Available').length,
      rented: cars.filter(c => c.status === 'Rented').length,
      maintenance: cars.filter(c => c.status === 'Maintenance').length,
    };
  }, [cars]);

  const addCar = useCallback((carData) => {
    const newId = String(Date.now());
    const dailyPrice = carData.daily || '45';
    const formattedPrice = carData.price || `$${dailyPrice} / day`;

    const newCar = {
      id: newId,
      brand: carData.brand?.trim() || 'Unknown',
      model: carData.model?.trim() || 'Vehicle',
      category: carData.category || 'Sedan',
      year: String(carData.year || new Date().getFullYear()),
      registration: carData.registration?.trim() || `REG-${Math.floor(1000 + Math.random() * 9000)}`,
      daily: dailyPrice,
      weekly: carData.weekly || String(Number(dailyPrice) * 6),
      monthly: carData.monthly || String(Number(dailyPrice) * 22),
      price: formattedPrice,
      status: carData.status || 'Available',
      photo: carData.photo || null,
      transmission: carData.transmission || 'Automatic',
      seats: Number(carData.seats) || 5,
      doors: Number(carData.doors) || 4,
      fuel: carData.fuel || 'Petrol',
      color: carData.color || 'White',
      mileage: carData.mileage || '0',
      periods: Array.isArray(carData.periods) && carData.periods.length ? carData.periods : ['Daily'],
      public: carData.public !== undefined ? carData.public : true,
      notes: carData.notes || '',
      createdAt: new Date().toISOString()
    };

    setCars(prev => [newCar, ...prev]);
    return newCar;
  }, []);

  const updateCar = useCallback((id, updatedFields) => {
    let updatedCarResult = null;

    setCars(prev => prev.map(car => {
      if (String(car.id) === String(id)) {
        const dailyPrice = updatedFields.daily !== undefined ? updatedFields.daily : car.daily;
        const formattedPrice = updatedFields.price || `$${dailyPrice} / day`;

        updatedCarResult = {
          ...car,
          ...updatedFields,
          price: formattedPrice,
          updatedAt: new Date().toISOString()
        };
        return updatedCarResult;
      }
      return car;
    }));

    return updatedCarResult;
  }, []);

  const deleteCar = useCallback((id) => {
    setCars(prev => prev.filter(c => String(c.id) !== String(id)));
    return true;
  }, []);

  const updateCarStatus = useCallback((id, newStatus) => {
    setCars(prev => prev.map(car => {
      if (String(car.id) === String(id)) {
        return { ...car, status: newStatus };
      }
      return car;
    }));
  }, []);

  const getCarById = useCallback((id) => {
    return cars.find(c => String(c.id) === String(id)) || null;
  }, [cars]);

  const value = {
    cars,
    stats,
    navbarSearch,
    setNavbarSearch,
    addCar,
    updateCar,
    deleteCar,
    updateCarStatus,
    getCarById,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
}

export function useCars() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
}
