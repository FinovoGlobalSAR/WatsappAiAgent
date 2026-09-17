import React, { useMemo, useState, useRef } from "react";
import {
  CarFront,
  Check,
  ChevronDown,
  Eye,
  FileText,
  Globe2,
  Image as ImageIcon,
  Settings,
  Tag,
  Trash2,
  Upload,
  Users,
  Car,
  AlertCircle,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import SharedSidebar from "../components/layout/SharedSidebar";
import Topbar from "../components/layout/Topbar";
import SectionCard from "../components/common/SectionCard";
import Field from "../components/common/Field";
import Counter from "../components/common/Counter";
import Segment from "../components/common/Segment";
import SelectField from "../components/common/SelectField";
import TextField from "../components/common/TextField";
import { inputCls } from "../components/common/inputStyles";
import { BRANDS, CATEGORIES, COLORS, YEARS } from "../data/carOptions";
import { useCars } from "../context/CarContext";

export default function AddCarPage() {
  const navigate = useNavigate();
  const { addCar } = useCars();
  const fileInputRef = useRef(null);

  const [mobile, setMobile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    brand: "",
    model: "",
    registration: "",
    category: "",
    year: "2026",
    transmission: "Automatic",
    seats: 5,
    doors: 4,
    color: "",
    mileage: "",
    fuel: "Petrol",
    periods: ["Daily", "Weekly", "Monthly"],
    daily: "45",
    weekly: "280",
    monthly: "980",
    status: "Available",
    public: true,
    notes: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) {
      setErrors((prev) => ({ ...prev, [k]: null }));
    }
  };

  const togglePeriod = (p) =>
    setForm((f) => ({
      ...f,
      periods: f.periods.includes(p)
        ? f.periods.filter((x) => x !== p)
        : [...f.periods, p],
    }));

  const count = (k, d) =>
    setForm((f) => ({ ...f, [k]: Math.max(1, (Number(f[k]) || 1) + d) }));

  const onFile = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        photo: "Photo must be 5MB or smaller.",
      }));
      return;
    }
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        photo: "Please choose a PNG, JPG or WEBP image.",
      }));
      return;
    }

    setPhotoFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target.result);
      setErrors((prev) => ({ ...prev, photo: null }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e) => {
    e?.stopPropagation();
    setPhoto(null);
    setPhotoFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const errs = {};
    if (!form.brand.trim()) errs.brand = "Brand is required";
    if (!form.category.trim()) errs.category = "Category is required";
    if (!form.model.trim()) errs.model = "Model is required";
    if (!form.year.trim()) errs.year = "Year is required";
    if (!form.registration.trim())
      errs.registration = "Registration number is required";
    if (!form.daily || isNaN(Number(form.daily)) || Number(form.daily) <= 0) {
      errs.daily = "Daily rate must be a valid positive amount";
    }
    if (
      !form.weekly ||
      isNaN(Number(form.weekly)) ||
      Number(form.weekly) <= 0
    ) {
      errs.weekly = "Weekly rate must be a valid positive amount";
    }
    if (
      !form.monthly ||
      isNaN(Number(form.monthly)) ||
      Number(form.monthly) <= 0
    ) {
      errs.monthly = "Monthly rate must be a valid positive amount";
    }
    if (!photoFile) {
      errs.photo = "Car image is required";
    }
    return errs;
  };

  const save = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSaving(true);

    try {
      await addCar({
        ...form,
        photo,
        photoFile,
      });

      navigate("/cars", {
        state: {
          toast: `Vehicle ${form.brand} ${form.model} added successfully!`,
        },
      });
    } catch (error) {
      setErrors({ api: error.message || "Could not save the car." });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/cars");
  };

  const title = useMemo(
    () =>
      [form.brand, form.model].filter(Boolean).join(" ") || "Vehicle Preview",
    [form.brand, form.model],
  );

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans text-[#29243b]">
      <SharedSidebar mobileNav={mobile} setMobileNav={setMobile} />

      <div className="lg:ml-[224px]">
        <Topbar kind="add" onMenu={() => setMobile(true)} />

        <main className="mx-auto w-[calc(100%-44px)] max-w-[960px] py-7 pb-12">
          {/* Header */}
          <div className="mb-[20px] flex items-start justify-between gap-4">
            <div>
              <div className="mb-2.5 flex items-center gap-2 text-[11px] text-[#827d9c]">
                <Link
                  to="/cars"
                  className="hover:text-[#41394d] transition-colors"
                >
                  Cars
                </Link>
                <ChevronDown size={13} className="-rotate-90" />
                <b className="text-[#41394d]">Add a car</b>
              </div>
              <h1 className="mb-[5px] text-[26px] font-bold leading-[1.2] tracking-[-.5px] text-[#111827]">
                Add a Car
              </h1>
              <p className="m-0 text-[12px] text-[#8d87a3]">
                Add a new vehicle to your fleet. Fill in the details below to
                get started.
              </p>
            </div>

            <div className="flex gap-2.5 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="flex h-9 items-center gap-1.5 rounded-[7px] border border-[#dedce4] bg-white px-4 text-[12px] font-semibold text-[#41394d] transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="car-form"
                disabled={isSaving}
                className="flex h-9 items-center gap-1.5 rounded-[7px] border border-[#ffbd22] bg-[#ffbd22] px-5 text-[12px] font-semibold text-[#1e1a18] shadow-xs transition-transform hover:scale-[1.02] hover:bg-[#f5b41b] disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={17} />
                    <span>Save car</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Validation Alert */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-[13px] text-red-600">
              <AlertCircle size={17} className="shrink-0" />
              <span>
                {errors.api ||
                  "Please correct the highlighted fields before saving."}
              </span>
            </div>
          )}

          <form
            id="car-form"
            onSubmit={save}
            className="grid grid-cols-[1.45fr_.75fr] gap-x-[18px] gap-y-3 rounded-[12px] bg-white p-[18px_20px_20px] shadow-[0_3px_8px_rgba(0,0,0,.08)] max-md:grid-cols-1"
          >
            {/* Left Column: Form Fields */}
            <div className="flex min-w-0 flex-col gap-3.5">
              {/* Identification */}
              <SectionCard
                icon={<FileText size={19} />}
                title="Identification"
                subtitle="Basic information about the vehicle"
              >
                <div className="grid grid-cols-2 gap-x-[17px] gap-y-[12px]">
                  <div>
                    <SelectField
                      label="Brand"
                      value={form.brand}
                      placeholder="Select brand"
                      options={BRANDS}
                      onChange={(v) => set("brand", v)}
                    />
                    {errors.brand && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {errors.brand}
                      </p>
                    )}
                  </div>

                  <div>
                    <SelectField
                      label="Category"
                      value={form.category}
                      placeholder="Select category"
                      options={CATEGORIES}
                      onChange={(v) => set("category", v)}
                    />
                    {errors.category && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <TextField
                      label="Model"
                      value={form.model}
                      placeholder="e.g. Corolla"
                      max="100"
                      onChange={(v) => set("model", v)}
                    />
                    {errors.model && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {errors.model}
                      </p>
                    )}
                  </div>

                  <div>
                    <SelectField
                      label="Year"
                      value={form.year}
                      options={YEARS}
                      onChange={(v) => set("year", v)}
                    />
                    {errors.year && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {errors.year}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <TextField
                      label="Registration Number"
                      value={form.registration}
                      placeholder="e.g. ABC-1234"
                      max="50"
                      onChange={(v) => set("registration", v)}
                    />
                    {errors.registration && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {errors.registration}
                      </p>
                    )}
                  </div>
                </div>
              </SectionCard>

              {/* Specifications */}
              <SectionCard
                icon={<Settings size={19} />}
                title="Specifications"
                subtitle="Technical details and features"
              >
                <div className="grid grid-cols-2 gap-x-[17px] gap-y-[12px]">
                  <Field label="Transmission">
                    <Segment
                      items={["Automatic", "Manual"]}
                      value={form.transmission}
                      onChange={(v) => set("transmission", v)}
                    />
                  </Field>

                  <Field label="Fuel type">
                    <div className="flex h-[35px] gap-[6px]">
                      {["Petrol", "Diesel", "Hybrid", "Electric"].map((v) => (
                        <button
                          type="button"
                          key={v}
                          onClick={() => set("fuel", v)}
                          className={`rounded-[17px] border px-[10px] text-[10px] transition-colors ${
                            form.fuel === v
                              ? "border-[1.5px] border-[#5b0a58] bg-[#f8f2f9] text-[#4d0750] font-semibold"
                              : "border-[#dfdde4] bg-[#f0f0f1] text-[#7b748e] hover:bg-gray-200"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Counter
                    label="Seats"
                    value={form.seats}
                    onChange={(d) => count("seats", d)}
                  />
                  <Counter
                    label="Doors"
                    value={form.doors}
                    onChange={(d) => count("doors", d)}
                  />

                  <Field label="Color" required={false}>
                    <div className="flex gap-2">
                      <span
                        className="h-[35px] w-[34px] rounded-[7px] border border-[#dddbe2]"
                        style={{
                          backgroundColor: form.color
                            ? form.color.toLowerCase()
                            : "#fff",
                        }}
                      />
                      <div className="relative flex-1">
                        <select
                          className={`${inputCls} appearance-none pr-8`}
                          value={form.color}
                          onChange={(e) => set("color", e.target.value)}
                        >
                          <option value="">Select color</option>
                          {COLORS.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown
                          size={17}
                          className="pointer-events-none absolute right-[10px] top-[9px] text-[#6d6577]"
                        />
                      </div>
                    </div>
                  </Field>

                  <TextField
                    label="Mileage"
                    value={form.mileage}
                    max="50"
                    placeholder="e.g. 15000"
                    onChange={(v) => set("mileage", v)}
                  />
                </div>
              </SectionCard>

              {/* Pricing & Availability */}
              <SectionCard
                icon={<Tag size={19} />}
                title="Pricing & availability"
                subtitle="Set the rental rate and availability status."
              >
                <div className="text-[11px] font-semibold text-[#343043]">
                  Available For
                </div>
                <p className="-mt-px mb-3 text-[10px] text-[#8c869c]">
                  Select the rental periods this vehicle can be booked for
                </p>
                <div className="mb-3 flex gap-3">
                  {["Daily", "Weekly", "Monthly"].map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => togglePeriod(p)}
                      className={`flex h-9 items-center gap-[5px] rounded-[8px] px-[14px] text-[11px] transition-opacity ${
                        form.periods.includes(p)
                          ? "bg-[#3f003d] text-white shadow-xs"
                          : "bg-[#e5e5e8] text-[#555] opacity-70"
                      }`}
                    >
                      {form.periods.includes(p) && <Check size={15} />}
                      <span>{p}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    ["Daily Rate ($)", "daily", "/ day"],
                    ["Weekly Rate", "weekly", "/ Week"],
                    ["Monthly Rate", "monthly", "/ Month"],
                  ].map(([label, key, suffix]) => (
                    <Field key={key} label={label}>
                      <div className="flex h-[35px] items-center gap-2 rounded-[9px] border border-[#dcdbe1] bg-[#f1f1f2] px-[10px] focus-within:border-[#3f003d]">
                        <b className="text-[11px] text-[#25212c]">$</b>
                        <input
                          className="h-[30px] min-w-0 flex-1 border-0 bg-transparent p-0 text-[11px] text-[#25212c] outline-none"
                          value={form[key]}
                          onChange={(e) => set(key, e.target.value)}
                          placeholder="0.00"
                        />
                        <b className="ml-auto whitespace-nowrap text-[9px] font-medium text-[#888195]">
                          {suffix}
                        </b>
                      </div>
                      {key === "daily" && errors.daily && (
                        <p className="mt-1 text-[9px] text-red-500">
                          {errors.daily}
                        </p>
                      )}
                    </Field>
                  ))}
                </div>

                <div className="mb-[6px] mt-[14px] text-[11px] font-semibold text-[#343043]">
                  Status
                </div>
                <div className="grid grid-cols-3 gap-[11px]">
                  {[
                    ["Available", "Ready for rent", "green"],
                    ["Rented", "Currently rented", "blue"],
                    ["Maintenance", "Under service", "gold"],
                  ].map(([name, desc, colorType]) => (
                    <button
                      type="button"
                      key={name}
                      onClick={() => set("status", name)}
                      className={`flex h-[53px] items-start gap-[8px] rounded-[9px] border px-[10px] py-2 text-left transition-all ${
                        form.status === name
                          ? colorType === "green"
                            ? "border-[1.5px] border-[#377f64] bg-[#edf8f2]"
                            : colorType === "blue"
                              ? "border-[1.5px] border-[#2864cf] bg-[#eef4ff]"
                              : "border-[1.5px] border-[#c7880a] bg-[#fff6e5]"
                          : "border-[#dfdde4] bg-[#f0f0f1] hover:bg-gray-100"
                      }`}
                    >
                      <span
                        className={`mt-1 h-[11px] w-[11px] shrink-0 rounded-full ${
                          colorType === "green"
                            ? "bg-[#319a70]"
                            : colorType === "blue"
                              ? "bg-[#2864cf]"
                              : "bg-[#b27c09]"
                        } shadow-[inset_0_0_0_3px_#fff]`}
                      />
                      <span>
                        <b className="mb-[2px] block text-[11px] text-[#25212c]">
                          {name}
                        </b>
                        <small className="block text-[9px] text-[#827c92]">
                          {desc}
                        </small>
                      </span>
                    </button>
                  ))}
                </div>
              </SectionCard>

              {/* Description */}
              <SectionCard
                icon={<span className="text-[18px]">≡</span>}
                title="Description"
                subtitle="Add notes and additional information about this vehicle"
              >
                <textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Condition, history, standout features…"
                  className="block h-[65px] w-full resize-y rounded-[9px] border border-[#dcdbe1] bg-[#f1f1f2] p-[10px] text-[11px] text-[#25212c] outline-none focus:border-[#3f003d]"
                />
              </SectionCard>
            </div>

            {/* Right Column: Photo & Live Preview */}
            <div className="flex min-w-0 flex-col gap-3.5">
              {/* Photo Upload Card */}
              <SectionCard
                icon={<ImageIcon size={19} />}
                title="Photo"
                subtitle="Add a high-quality photo of the vehicle"
              >
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    onFile(e.dataTransfer.files?.[0]);
                  }}
                  className="relative flex h-[194px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[8px] border-[1.5px] border-dashed border-[#7d267c] bg-[#f6f0f7] transition-colors hover:bg-[#f2eaf3]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt="Vehicle preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <ImageIcon size={42} className="text-[#7d267c]" />
                      <strong className="mt-2 text-[11px] text-[#343043]">
                        Drag a photo here or{" "}
                        <span className="text-[#7d267c] underline">browse</span>
                      </strong>
                      <small className="mt-1 text-[9px] text-[#928ba8]">
                        PNG, JPG or WEBP (max 5MB)
                      </small>
                      <span className="mt-3 rounded-[6px] border border-[#d7c6da] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#343043]">
                        Choose file
                      </span>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    className="hidden"
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                    onChange={(e) => onFile(e.target.files?.[0])}
                  />
                </div>

                {errors.photo && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {errors.photo}
                  </p>
                )}

                {/* Photo action buttons: Change and Remove */}
                {photo && (
                  <div className="mt-2.5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-[7px] border border-[#4c2d5c] bg-white text-[11px] font-semibold text-[#4c2d5c] hover:bg-[#faf5fc]"
                    >
                      <Upload size={14} />
                      <span>Change photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="flex h-8 items-center justify-center gap-1.5 rounded-[7px] border border-red-300 bg-white px-3 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                )}
              </SectionCard>

              {/* Dynamic Live Preview (Synchronized directly with form state) */}
              <SectionCard
                icon={<Eye size={19} />}
                title="Live preview"
                subtitle="This is how the car will appear in the catalog."
              >
                <div className="overflow-hidden rounded-[8px] border border-[#ececf0] bg-[#fafafa]">
                  <div className="relative h-[160px] overflow-hidden bg-[#eeeef0]">
                    {photo ? (
                      <img
                        src={photo}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center text-[#827b9c]">
                        <CarFront size={48} />
                        <span className="mt-1 text-[10px] font-medium">
                          Photo preview
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="mb-0.5 text-[15px] font-bold text-[#111827]">
                      {title}
                    </h3>
                    <p className="m-0 text-[11px] text-[#6f6874]">
                      <span>{form.category || "Category"}</span>
                      <span className="px-1">•</span>
                      <span>{form.year || "2026"}</span>
                      <span className="px-1">•</span>
                      <span className="font-mono">
                        {form.registration || "REG-XXXX"}
                      </span>
                    </p>

                    <div className="my-2.5 flex justify-between gap-1 text-[9px] text-[#38323d]">
                      <span className="flex items-center gap-1">
                        <Users size={13} />
                        {form.seats} seats
                      </span>
                      <span className="flex items-center gap-1">
                        <Car size={13} />
                        {form.doors} doors
                      </span>
                      <span className="flex items-center gap-1">
                        ⛽ {form.fuel}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 border border-[#ececf0] text-center rounded-[6px] bg-white">
                      <div className="p-1.5">
                        <b className="text-[11px] text-[#111827]">
                          ${form.daily || "0"}
                        </b>
                        <small className="block text-[8px] text-[#888]">
                          / day
                        </small>
                      </div>
                      <div className="border-x border-[#ececf0] p-1.5">
                        <b className="text-[11px] text-[#111827]">
                          ${form.weekly || "0"}
                        </b>
                        <small className="block text-[8px] text-[#888]">
                          / week
                        </small>
                      </div>
                      <div className="p-1.5">
                        <b className="text-[11px] text-[#111827]">
                          ${form.monthly || "0"}
                        </b>
                        <small className="block text-[8px] text-[#888]">
                          / month
                        </small>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[10px]">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          form.status === "Available"
                            ? "text-[#21865d]"
                            : form.status === "Rented"
                              ? "text-[#2167d9]"
                              : "text-[#c7880a]"
                        }`}
                      >
                        ● {form.status}
                      </span>
                      <span className="text-[9px] text-gray-500">
                        {form.transmission}
                      </span>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Public Catalog Visibility Toggle */}
              <div className="flex items-center gap-3 rounded-[10px] border border-[#e2e0e7] bg-white p-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-[#f3edf5] text-[#4b0750]">
                  <Globe2 size={21} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <b className="text-[11px] text-[#25212c]">
                    Show in public catalog
                  </b>
                  <span className="text-[9px] text-[#928ba8]">
                    When enabled, this car will be visible to customers.
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Toggle public catalog"
                  onClick={() => set("public", !form.public)}
                  className={`relative h-[28px] w-[48px] rounded-full p-[2px] transition-colors ${
                    form.public ? "bg-[#3f003d]" : "bg-[#ddd]"
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white shadow-xs transition-transform ${
                      form.public ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
