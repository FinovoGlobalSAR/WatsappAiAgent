import React, { useState, useEffect } from "react";
import { Check, ChevronLeft, AlertCircle } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Shell from "../components/layout/Shell";
import EditIdentification from "./edit/EditIdentification";
import EditSpecifications from "./edit/EditSpecifications";
import EditPricing from "./edit/EditPricing";
import EditDescription from "./edit/EditDescription";
import EditPhoto from "./edit/EditPhoto";
import EditPreview from "./edit/EditPreview";
import Catalog from "./edit/Catalog";
import { useCars } from "../context/CarContext";

export default function EditCarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCarById, updateCar, cars, loading } = useCars();

  const [car, setCar] = useState(() => {
    if (id) return getCarById(id);
    return cars.length > 0 ? cars[0] : null;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [errors, setErrors] = useState({});

  // Sync form if target car changes
  useEffect(() => {
    const targetCar = id ? getCarById(id) : cars.length > 0 ? cars[0] : null;
    if (targetCar && targetCar.id !== car?.id) {
      setCar({ ...targetCar });
    }
  }, [id, getCarById, cars, car?.id]);

  useEffect(() => {
    setSelectedPhotos([]);
  }, [id]);

  const update = (k, v) => {
    setCar((prev) => (prev ? { ...prev, [k]: v } : prev));
    if (errors[k]) {
      setErrors((prev) => ({ ...prev, [k]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!car.brand?.trim()) errs.brand = "Brand is required";
    if (!car.category?.trim()) errs.category = "Category is required";
    if (!car.model?.trim()) errs.model = "Model is required";
    if (!String(car.year || "").trim()) errs.year = "Year is required";
    if (!car.registration?.trim())
      errs.registration = "Registration number is required";
    if (!car.daily || isNaN(Number(car.daily)) || Number(car.daily) <= 0) {
      errs.daily = "Daily rate must be a valid positive amount";
    }
    if (!car.weekly || isNaN(Number(car.weekly)) || Number(car.weekly) <= 0) {
      errs.weekly = "Weekly rate must be a valid positive amount";
    }
    if (
      !car.monthly ||
      isNaN(Number(car.monthly)) ||
      Number(car.monthly) <= 0
    ) {
      errs.monthly = "Monthly rate must be a valid positive amount";
    }
    if (
      selectedPhotos.length > 0 &&
      (selectedPhotos.length < 4 || selectedPhotos.length > 6)
    ) {
      errs.photo = "Replacement upload must contain 4 to 6 images";
    }
    return errs;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!car) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);

    try {
      await updateCar(
        car.id,
        {
          ...car,
          photos:
            selectedPhotos.length > 0
              ? selectedPhotos.map((item) => item.preview)
              : car.photos,
        },
        selectedPhotos.map((item) => item.file),
      );
      navigate("/cars", {
        state: {
          toast: `Vehicle ${car.brand} ${car.model} updated successfully!`,
        },
      });
    } catch (error) {
      setErrors({ api: error.message || "Could not update the car." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/cars");
  };

  if (loading && !car) {
    return (
      <Shell kind="edit">
        <main className="min-h-[60vh] flex items-center justify-center p-8 bg-[#f4f6fb]">
          <div className="text-center rounded-xl bg-white p-8 border border-gray-200 shadow-sm max-w-md">
            <span className="mx-auto mb-3 block h-8 w-8 animate-spin rounded-full border-2 border-[#3f003d] border-t-transparent" />
            <h2 className="text-lg font-bold text-gray-800">
              Loading vehicle...
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Getting the car from the backend.
            </p>
          </div>
        </main>
      </Shell>
    );
  }

  if (!car) {
    return (
      <Shell kind="edit">
        <main className="min-h-[60vh] flex items-center justify-center p-8 bg-[#f4f6fb]">
          <div className="text-center rounded-xl bg-white p-8 border border-gray-200 shadow-sm max-w-md">
            <AlertCircle size={40} className="mx-auto text-amber-500 mb-3" />
            <h2 className="text-lg font-bold text-gray-800">
              Vehicle Not Found
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              The requested vehicle could not be loaded or does not exist.
            </p>
            <Link
              to="/cars"
              className="mt-4 inline-flex items-center gap-1.5 rounded-[7px] bg-[#3f003d] px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#571353]"
            >
              <ChevronLeft size={16} />
              <span>Back to fleet</span>
            </Link>
          </div>
        </main>
      </Shell>
    );
  }

  return (
    <Shell kind="edit">
      <main className="bg-[#f4f6fb] p-5 lg:px-11 pb-12">
        <div className="mx-auto max-w-[1200px] rounded-[14px] bg-white p-5 shadow-[0_8px_20px_rgba(29,34,50,.04)]">
          {/* Header */}
          <div className="flex items-start justify-between px-3 pb-[14px]">
            <div>
              <div className="mb-[7px] flex items-center gap-[9px] text-[11px] text-[#7e7b99]">
                <Link
                  to="/cars"
                  className="hover:text-[#463653] transition-colors"
                >
                  Cars
                </Link>
                <b className="text-[15px] text-[#aaa7b6]">›</b>
                <strong className="text-[#463653]">Edit a car</strong>
              </div>
              <h1 className="text-[25px] font-bold leading-tight text-[#242036]">
                Edit {car.brand} {car.model}
              </h1>
              <p className="mt-[5px] text-[12px] text-[#807c9a]">
                Update the vehicle details below. Make any changes and save when
                you're done.
              </p>
            </div>

            <div className="flex gap-2.5 pt-[17px]">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="h-9 rounded-[7px] border border-[#d7dae3] bg-white px-[17px] text-[12px] font-semibold text-[#383249] transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="flex h-9 items-center gap-1.5 rounded-[7px] bg-[#ffbf2d] px-[17px] text-[12px] font-semibold text-[#28231c] shadow-xs transition-transform hover:scale-[1.02] hover:bg-[#f5b41b] disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Save changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 mx-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-[13px] text-red-600">
              <AlertCircle size={17} className="shrink-0" />
              <span>
                {errors.api ||
                  `Please check the required fields: ${Object.values(errors).filter(Boolean).join(", ")}.`}
              </span>
            </div>
          )}

          {/* Main 2-Column Content */}
          <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-[21px] max-lg:grid-cols-1">
            {/* Left Column: Editable Details */}
            <div className="min-w-0">
              <EditIdentification car={car} update={update} />
              <EditSpecifications car={car} update={update} />
              <EditPricing car={car} update={update} />
              <EditDescription car={car} update={update} />
            </div>

            {/* Right Column: Photo, Live Preview, Catalog Visibility */}
            <div className="min-w-0">
              <EditPhoto
                photos={car.photos || (car.photo ? [car.photo] : [])}
                selectedPhotos={selectedPhotos}
                onChangePhotos={(nextPhotos) => {
                  setSelectedPhotos(nextPhotos);
                  if (nextPhotos.length > 0) {
                    update(
                      "photos",
                      nextPhotos.map((item) => item.preview),
                    );
                    update("photo", nextPhotos[0].preview);
                  } else {
                    update("photos", car.photos || []);
                    update("photo", car.photos?.[0] || null);
                  }
                }}
                onRemoveSelectedPhoto={(index) => {
                  setSelectedPhotos((current) => {
                    const next = current.filter((_, i) => i !== index);
                    if (next.length === 0) {
                      update("photos", car.photos || []);
                      update("photo", car.photos?.[0] || null);
                    } else {
                      update(
                        "photos",
                        next.map((item) => item.preview),
                      );
                      update("photo", next[0].preview);
                    }
                    return next;
                  });
                }}
              />
              <EditPreview car={car} />
              <Catalog car={car} update={update} />
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}
