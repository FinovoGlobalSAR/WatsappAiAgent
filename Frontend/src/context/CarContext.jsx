import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CarContext = createContext(null);

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
const API_BASE = `${API_ORIGIN}/api/v1`;

function getImageUrl(image) {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("data:")) {
    return image;
  }
  return `${API_ORIGIN}${image.startsWith("/") ? image : `/${image}`}`;
}

async function apiRequest(path, options = {}) {
  const headers = { ...(options.headers || {}) };

  // Do not send Authorization here. CRUD testing is intentionally unauthenticated.
  if (!(options.body instanceof FormData) && options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  let body = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { message: text };
  }

  if (!response.ok) {
    const details = Array.isArray(body.errors) ? `: ${body.errors.join(", ")}` : "";
    const error = new Error(`${body.message || `Request failed (${response.status})`}${details}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return body;
}

function normalizeCar(raw) {
  const daily = raw.pricePerDay ?? raw.daily ?? 0;
  const dailyNumber = Number(daily) || 0;
  const weekly = raw.pricePerWeek ?? raw.weekly ?? (dailyNumber * 6);
  const monthly = raw.pricePerMonth ?? raw.monthly ?? (dailyNumber * 22);

  return {
    id: String(raw.id),
    brandId: raw.brandId,
    categoryId: raw.categoryId,
    brand: raw.brandName || raw.brand || "Unknown",
    model: raw.model || "Vehicle",
    category: raw.categoryName || raw.category || "Category",
    year: String(raw.year ?? ""),
    registration: raw.registrationNumber || raw.registration || "",
    daily: String(daily),
    weekly: String(weekly),
    monthly: String(monthly),
    price: `$${daily} / day`,
    status: raw.status || "Available",
    photo: getImageUrl(raw.image || raw.photo),
    transmission: raw.transmission || "Automatic",
    seats: Number(raw.seats) || 5,
    doors: Number(raw.doors) || 4,
    fuel: raw.fuelType || raw.fuel || "Petrol",
    color: raw.color || "",
    mileage: raw.mileage == null ? "" : String(raw.mileage),
    periods: Array.isArray(raw.periods) && raw.periods.length
      ? raw.periods
      : ["Daily", "Weekly", "Monthly"],
    public: raw.isActive !== undefined ? Boolean(raw.isActive) : true,
    isActive: raw.isActive !== undefined ? Boolean(raw.isActive) : true,
    notes: raw.description || raw.notes || "",
    description: raw.description || raw.notes || "",
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

async function findOrCreateLookup(endpoint, name) {
  const wanted = String(name || "").trim();
  if (!wanted) throw new Error(`Please select a ${endpoint === "/brands" ? "brand" : "category"}.`);

  const result = await apiRequest(
    `${endpoint}?search=${encodeURIComponent(wanted)}&limit=100`,
    { method: "GET" },
  );

  const existing = (result.data || []).find(
    (item) => String(item.name).trim().toLowerCase() === wanted.toLowerCase(),
  );

  if (existing) return existing.id;

  const created = await apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify({ name: wanted, description: `${wanted} for the car rental fleet` }),
  });

  if (!created.data?.id) {
    throw new Error(`Could not create ${endpoint === "/brands" ? "brand" : "category"} "${wanted}".`);
  }

  return created.data.id;
}

function buildCarFormData(carData, brandId, categoryId, imageFile = null) {
  const formData = new FormData();

  formData.append("brandId", String(brandId));
  formData.append("categoryId", String(categoryId));
  formData.append("model", String(carData.model || "").trim());
  formData.append("year", String(carData.year || ""));
  formData.append("registrationNumber", String(carData.registration || "").trim());
  formData.append("color", String(carData.color || ""));
  formData.append("transmission", carData.transmission || "Automatic");
  formData.append("fuelType", carData.fuel || "Petrol");
  formData.append("seats", String(carData.seats ?? 5));
  formData.append("doors", String(carData.doors ?? 4));
  formData.append("mileage", String(carData.mileage ?? ""));
  formData.append("pricePerDay", String(carData.daily ?? ""));
  formData.append("pricePerWeek", String(carData.weekly ?? ""));
  formData.append("pricePerMonth", String(carData.monthly ?? ""));
  formData.append("status", carData.status || "Available");
  formData.append("description", String(carData.notes || carData.description || ""));
  formData.append("isActive", String(carData.public !== false));

  if (imageFile instanceof File) {
    formData.append("image", imageFile);
  }

  return formData;
}

export function CarProvider({ children }) {
  const [cars, setCars] = useState([]);
  const [navbarSearch, setNavbarSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshCars = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiRequest("/cars?limit=100&page=1", { method: "GET" });
      setCars(Array.isArray(result.data) ? result.data.map(normalizeCar) : []);
    } catch (err) {
      setCars([]);
      setError(err.message || "Could not load cars from the backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCars();
  }, [refreshCars]);

  const stats = useMemo(() => {
    return {
      total: cars.length,
      available: cars.filter((c) => c.status === "Available").length,
      rented: cars.filter((c) => c.status === "Rented").length,
      maintenance: cars.filter((c) => c.status === "Maintenance").length,
    };
  }, [cars]);

  const addCar = useCallback(async (carData) => {
    const brandId = await findOrCreateLookup("/brands", carData.brand);
    const categoryId = await findOrCreateLookup("/categories", carData.category);

    if (!(carData.photoFile instanceof File)) {
      throw new Error("Car image is required. Please select a PNG, JPG or WEBP image.");
    }

    const formData = buildCarFormData(carData, brandId, categoryId, carData.photoFile);
    const result = await apiRequest("/cars", {
      method: "POST",
      body: formData,
    });

    const newCar = normalizeCar(result.data);
    // Keep the local preview visible immediately after upload.
    if (carData.photo) newCar.photo = carData.photo;
    setCars((prev) => [newCar, ...prev]);
    return newCar;
  }, []);

  const updateCar = useCallback(async (id, carData, imageFile = null) => {
    let brandId = carData.brandId;
    let categoryId = carData.categoryId;

    if (!brandId || String(carData.brand || "").trim()) {
      brandId = await findOrCreateLookup("/brands", carData.brand);
    }
    if (!categoryId || String(carData.category || "").trim()) {
      categoryId = await findOrCreateLookup("/categories", carData.category);
    }

    const formData = buildCarFormData(carData, brandId, categoryId, imageFile);
    const result = await apiRequest(`/cars/${id}`, {
      method: "PUT",
      body: formData,
    });

    const updatedCar = normalizeCar(result.data);
    // Keep the current local preview visible immediately after an image change.
    if (carData.photo) updatedCar.photo = carData.photo;
    setCars((prev) => prev.map((car) => (String(car.id) === String(id) ? updatedCar : car)));
    return updatedCar;
  }, []);

  const deleteCar = useCallback(async (id) => {
    await apiRequest(`/cars/${id}`, { method: "DELETE" });
    setCars((prev) => prev.filter((car) => String(car.id) !== String(id)));
    return true;
  }, []);

  const updateCarStatus = useCallback(async (id, newStatus) => {
    const formData = new FormData();
    formData.append("status", newStatus);

    const result = await apiRequest(`/cars/${id}`, {
      method: "PUT",
      body: formData,
    });

    const updatedCar = normalizeCar(result.data);
    setCars((prev) => prev.map((car) => (String(car.id) === String(id) ? updatedCar : car)));
    return updatedCar;
  }, []);

  const getCarById = useCallback(
    (id) => cars.find((car) => String(car.id) === String(id)) || null,
    [cars],
  );

  const value = {
    cars,
    stats,
    navbarSearch,
    setNavbarSearch,
    loading,
    error,
    refreshCars,
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
    throw new Error("useCars must be used within a CarProvider");
  }
  return context;
}
