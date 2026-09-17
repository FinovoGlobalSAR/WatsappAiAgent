import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ car, isOpen, onClose, onConfirm, isDeleting }) {
  if (!isOpen || !car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md rounded-xl border border-[#e8ebf0] bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle size={22} />
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4">
          <h3 id="delete-dialog-title" className="text-lg font-bold text-gray-900">
            Delete Vehicle
          </h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Are you sure you want to delete <strong className="text-gray-800">{car.brand} {car.model}</strong>{' '}
            <span className="font-mono text-xs text-gray-600">({car.registration})</span>?
            This will permanently remove the vehicle from your fleet catalog.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-[7px] border border-[#dcdbe1] bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-[7px] bg-red-600 px-4 py-2 text-[13px] font-semibold text-white shadow-xs hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Deleting...</span>
              </>
            ) : (
              'Delete Vehicle'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
