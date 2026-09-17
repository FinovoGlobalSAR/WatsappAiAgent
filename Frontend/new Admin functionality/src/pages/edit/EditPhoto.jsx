import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Trash2, Upload } from 'lucide-react';
import carPhoto from '../../assets/car-photo.png';
import SectionCard from '../../components/common/SectionCard';

export default function EditPhoto() {
    const [photo, setPhoto] = useState(carPhoto);
    const fileInputRef = useRef(null);

    const handleChangePhoto = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setPhoto(imageUrl);
    };

    const handleRemovePhoto = () => {
        setPhoto(null);
    };

    return (
        <SectionCard
            icon={<ImageIcon size={19} />}
            title="Photo"
            subtitle="Add a high-quality photo of the vehicle"
            className="mb-3"
        >
            <div className="h-[194px] overflow-hidden rounded-[8px] bg-[#eeeef0]">
                {photo && (
                    <img
                        src={photo}
                        alt="Car"
                        className="h-full w-full object-cover"
                    />
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChangePhoto}
                className="hidden"
            />

            <div className="mt-[9px] flex gap-3">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-[#4c2d5c] bg-white text-[10px] font-semibold"
                >
                    <Upload size={16} />
                    Change photo
                </button>

                <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="flex h-9 w-[88px] items-center justify-center gap-1.5 rounded-[10px] border border-[#ff4b45] bg-white text-[10px] font-semibold text-[#ff4b45]"
                >
                    <Trash2 size={16} />
                    Remove
                </button>
            </div>
        </SectionCard>
    );
}