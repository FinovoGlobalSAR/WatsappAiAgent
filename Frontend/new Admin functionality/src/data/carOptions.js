export const BRANDS = ['Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Kia', 'Hyundai'];
export const CATEGORIES = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Van', 'Pickup'];
export const COLORS = ['Black', 'White', 'Silver', 'Gray', 'Blue', 'Red'];
export const YEARS = Array.from({ length: 31 }, (_, i) => String(2026 - i));

export const initialCar = {
  brand: 'Toyota',
  model: 'Corolla',
  registration: 'ABC-1234',
  category: 'Sedan',
  year: '2026',
  transmission: 'Automatic',
  fuel: 'Petrol',
  seats: 5,
  doors: 4,
  color: 'Black',
  mileage: '15000',
  daily: '45',
  weekly: '280',
  monthly: '980',
  status: 'Available',
  notes: 'Well-maintained Toyota Corolla with low mileage, automatic transmission, cold AC, and excellent fuel efficiency.'
};
