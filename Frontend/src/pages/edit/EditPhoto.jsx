import React, { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Trash2, Upload, AlertCircle } from "lucide-react";
import carPhotoDefault from "../../assets/car-photo.png";
import SectionCard from "../../components/common/SectionCard";

const MIN_IMAGES = 4;
const MAX_IMAGES = 6;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const TYPES = ["image/png", "image/jpeg", "image/webp"];

export default function EditPhoto({
  photos = [],
  selectedPhotos = [],
  onChangePhotos,
  onRemoveSelectedPhoto,
}) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);

  const existingPhotos = Array.isArray(photos) ? photos.filter(Boolean) : [];
  const selected = Array.isArray(selectedPhotos) ? selectedPhotos : [];

  useEffect(() => {
    return () => {
      selected.forEach((item) => {
        if (item?.preview?.startsWith("blob:")) URL.revokeObjectURL(item.preview);
      });
    };
  }, [selected]);

  const handleChangePhotos = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const invalid = files.find(
      (file) => !TYPES.includes(file.type) || file.size > MAX_FILE_SIZE,
    );

    if (invalid) {
      setError(
        invalid.size > MAX_FILE_SIZE
          ? `"${invalid.name}" is larger than 5MB.`
          : `"${invalid.name}" is not a PNG, JPG or WEBP image.`,
      );
      event.target.value = "";
      return;
    }

    if (files.length < MIN_IMAGES || files.length > MAX_IMAGES) {
      setError(`Please select between ${MIN_IMAGES} and ${MAX_IMAGES} images.`);
      event.target.value = "";
      return;
    }

    const next = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setError(null);
    onChangePhotos?.(next);
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files || []);

    if (!files.length) return;

    const invalid = files.find(
      (file) => !TYPES.includes(file.type) || file.size > MAX_FILE_SIZE,
    );

    if (invalid) {
      setError(
        invalid.size > MAX_FILE_SIZE
          ? `"${invalid.name}" is larger than 5MB.`
          : `"${invalid.name}" is not a PNG, JPG or WEBP image.`,
      );
      return;
    }

    if (files.length < MIN_IMAGES || files.length > MAX_IMAGES) {
      setError(`Please select between ${MIN_IMAGES} and ${MAX_IMAGES} images.`);
      return;
    }

    const next = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setError(null);
    onChangePhotos?.(next);
  };

  const handleRemoveSelected = (index) => {
    if (selected.length <= MIN_IMAGES) {
      setError(`A replacement set must contain at least ${MIN_IMAGES} images.`);
      return;
    }
    onRemoveSelectedPhoto?.(index);
  };

  const previewPhotos =
    selected.length > 0 ? selected.map((item) => item.preview) : existingPhotos;

  return (
    <SectionCard
      icon={<ImageIcon size={19} />}
      title="Photos"
      subtitle="Keep 4 to 6 photos for this vehicle"
      className="mb-3"
    >
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative overflow-hidden rounded-[8px] border-[1.5px] border-dashed border-[#7d267c] bg-[#f6f0f7] p-2"
      >
        {previewPhotos.length ? (
          <>
            <div className="relative h-[170px] overflow-hidden rounded-[7px] bg-[#eeeef0]">
              <img
                src={previewPhotos[0]}
                alt="Primary car preview"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-2 top-2 rounded-[5px] bg-[#3f003d] px-2 py-1 text-[9px] font-semibold text-white">
                Main photo
              </span>
            </div>

            <div className="mt-2 grid grid-cols-5 gap-1.5">
              {previewPhotos.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="group relative h-[42px] overflow-hidden rounded-[5px] border border-[#d7c6da] bg-white"
                >
                  <img
                    src={src}
                    alt={`Vehicle ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {selected.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSelected(index)}
                      className="absolute right-0.5 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-white/90 text-red-600 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                      title={`Remove image ${index + 1}`}
                    >
                      ×
                    </button>
                  )}
                  <span className="absolute bottom-0 left-0 rounded-tr-[3px] bg-black/55 px-1 text-[7px] text-white">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-[194px] flex-col items-center justify-center text-gray-400">
            <ImageIcon size={40} className="mb-1 text-gray-300" />
            <span className="text-[11px]">No photos available</span>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-red-500">
          <AlertCircle size={13} />
          <span>{error}</span>
        </div>
      )}

      {selected.length > 0 && selected.length < MIN_IMAGES && (
        <p className="mt-1 text-[10px] text-red-500">
          A replacement set must contain at least {MIN_IMAGES} images.
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChangePhotos}
        className="hidden"
      />

      <div className="mt-[9px] flex gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-[#4c2d5c] bg-white text-[10px] font-semibold text-[#4c2d5c] transition-colors hover:bg-[#faf5fc]"
        >
          <Upload size={16} />
          {selected.length ? "Change photos" : "Replace photos"}
        </button>

        <button
          type="button"
          onClick={() => {
            if (selected.length) onChangePhotos?.([]);
          }}
          disabled={!selected.length}
          className="flex h-9 w-[88px] items-center justify-center gap-1.5 rounded-[10px] border border-[#ff4b45] bg-white text-[10px] font-semibold text-[#ff4b45] transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={16} />
          Cancel
        </button>
      </div>

      <p className="mt-2 text-[9px] text-[#928ba8]">
        Existing photos are kept until you choose a replacement set. Replacement
        uploads must contain 4–6 images, each up to 5MB.
      </p>
    </SectionCard>
  );
}
