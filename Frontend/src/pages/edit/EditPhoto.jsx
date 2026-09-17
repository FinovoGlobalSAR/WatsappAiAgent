import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Trash2, Upload, AlertCircle } from 'lucide-react';
import carPhotoDefault from '../../assets/car-photo.png';
import SectionCard from '../../components/common/SectionCard';

export default function EditPhoto({ photo, onChangePhoto, onRemovePhoto }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);

  const handleChangePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Photo must be 5MB or smaller.');
      return;
    }
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setError('Please choose a PNG, JPG or WEBP image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setError(null);
      onChangePhoto?.(e.target.result, file);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setError(null);
    onRemovePhoto?.();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const displayPhoto = photo !== undefined ? photo : carPhotoDefault;

  return (
    <SectionCard
      icon={<ImageIcon size={19} />}
      title="Photo"
      subtitle="Add a high-quality photo of the vehicle"
      className="mb-3"
    >
      <div className="relative h-[194px] overflow-hidden rounded-[8px] bg-[#eeeef0] flex items-center justify-center">
        {displayPhoto ? (
          <img
            src={displayPhoto}
            alt="Car preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 p-4">
            <ImageIcon size={40} className="text-gray-300 mb-1" />
            <span className="text-[11px]">No photo uploaded</span>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-red-500">
          <AlertCircle size={13} />
          <span>{error}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChangePhoto}
        className="hidden"
      />

      <div className="mt-[9px] flex gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-[#4c2d5c] bg-white text-[10px] font-semibold text-[#4c2d5c] transition-colors hover:bg-[#faf5fc]"
        >
          <Upload size={16} />
          Change photo
        </button>

        <button
          type="button"
          onClick={handleRemove}
          disabled={!displayPhoto}
          className="flex h-9 w-[88px] items-center justify-center gap-1.5 rounded-[10px] border border-[#ff4b45] bg-white text-[10px] font-semibold text-[#ff4b45] transition-colors hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </SectionCard>
  );
}