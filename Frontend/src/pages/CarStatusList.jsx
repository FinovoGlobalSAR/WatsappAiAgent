import React, { useMemo, useState, useEffect } from "react";
import { Plus, Check, AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Shell from "../components/layout/Shell";
import CarStats from "../components/car-list/CarStats";
import CarFilters from "../components/car-list/CarFilters";
import CarTable from "../components/car-list/CarTable";
import Pagination from "../components/car-list/Pagination";
import DeleteConfirmModal from "../components/car-list/DeleteConfirmModal";
import { useCars } from "../context/CarContext";

export default function CarStatusList() {
  const nav = useNavigate();
  const location = useLocation();
  const {
    cars,
    navbarSearch,
    updateCarStatus,
    deleteCar,
    loading,
    error,
    refreshCars,
  } = useCars();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Delete modal state
  const [carToDelete, setCarToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  // Check for toast message passed from navigation state (e.g. after Add or Edit)
  useEffect(() => {
    if (location.state?.toast) {
      setToast({ type: "success", text: location.state.toast });
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const showToast = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Sync with navbar search if active
  const activeSearch = search || navbarSearch;

  const filtered = useMemo(() => {
    const q = activeSearch.trim().toLowerCase();

    return cars.filter((c) => {
      const matchesQuery =
        !q ||
        [c.brand, c.model, c.registration].some((v) =>
          v ? v.toLowerCase().includes(q) : false,
        );
      const matchesCat =
        category === "All categories" || c.category === category;
      const matchesStatus = status === "All statuses" || c.status === status;

      return matchesQuery && matchesCat && matchesStatus;
    });
  }, [cars, activeSearch, category, status]);

  // Ensure current page does not exceed available pages
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const validCurrentPage = currentPage > totalPages ? 1 : currentPage;

  // Paginated slice
  const paginatedCars = useMemo(() => {
    const start = (validCurrentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, validCurrentPage, pageSize]);

  const handleOpenDelete = (car) => {
    setCarToDelete(car);
  };

  const handleConfirmDelete = async () => {
    if (!carToDelete) return;
    setIsDeleting(true);

    try {
      await deleteCar(carToDelete.id);
      showToast(
        `Vehicle ${carToDelete.brand} ${carToDelete.model} deleted successfully.`,
      );
      setCarToDelete(null);
    } catch (err) {
      showToast(err.message || "Could not delete the vehicle.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (carId, newStatus) => {
    try {
      await updateCarStatus(carId, newStatus);
      showToast(`Vehicle status updated to ${newStatus}.`);
    } catch (err) {
      showToast(err.message || "Could not update vehicle status.", "error");
    }
  };

  return (
    <Shell kind="list">
      <main className="mx-auto max-w-[1600px] px-4 pb-10 pt-[31px] lg:px-8">
        <div className="mb-[25px] flex items-start justify-between gap-5">
          <div>
            <h1 className="m-0 mb-[7px] text-[26px] font-bold leading-tight tracking-[-.7px] text-[#111827]">
              Cars
            </h1>
            <p className="m-0 text-[13px] text-[#7b8494]">
              Manage your vehicle fleet. Add new cars, edit details, or update
              availability
            </p>
          </div>

          <button
            onClick={() => nav("/cars/add")}
            className="inline-flex h-[38px] items-center gap-[7px] rounded-[7px] bg-[#ffbd22] px-[15px] text-[13px] font-semibold text-[#1e1a18] shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#f5b41b]"
          >
            <Plus size={17} />
            <span>Add Car</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-[13px] text-red-700">
            <span>{error}</span>
            <button
              type="button"
              onClick={refreshCars}
              className="rounded-md bg-white px-3 py-1.5 font-semibold text-red-700 border border-red-200 hover:bg-red-100"
            >
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="mb-4 rounded-lg border border-[#e8ebf0] bg-white p-4 text-[13px] text-[#667085]">
            Loading cars from backend...
          </div>
        )}

        {/* Dynamic Statistics */}
        <CarStats />

        {/* Filter and Table Container */}
        <section className="overflow-hidden rounded-[9px] border border-[#e8ebf0] bg-white shadow-[0_8px_20px_rgba(29,34,50,.04)]">
          <CarFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
          />

          <CarTable
            cars={paginatedCars}
            onDeleteCar={handleOpenDelete}
            onStatusChange={handleStatusChange}
          />

          <Pagination
            currentPage={validCurrentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalCount={filtered.length}
          />
        </section>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          car={carToDelete}
          isOpen={Boolean(carToDelete)}
          onClose={() => setCarToDelete(null)}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />

        {/* Toast feedback */}
        {toast && (
          <div
            className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg px-4 py-3 text-[13px] text-white shadow-xl animate-in slide-in-from-bottom-3 duration-200 ${
              toast.type === "error" ? "bg-red-600" : "bg-[#3f003d]"
            }`}
          >
            {toast.type === "error" ? (
              <AlertCircle size={17} />
            ) : (
              <Check size={17} />
            )}
            <span>{toast.text}</span>
          </div>
        )}
      </main>
    </Shell>
  );
}
