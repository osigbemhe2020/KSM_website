'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import ProfileImageUpload from './ProfileImageUpload';

interface ProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File) => void;
  isLoading?: boolean;
  currentImage?: string;
}

const ProfileImageModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  currentImage,
}: ProfileImageModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!selectedFile) return;
    onConfirm(selectedFile);
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      {/* Modal */}
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6 relative"
        onClick={(e) => e.stopPropagation()} // prevent backdrop click closing when clicking modal
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-1">Update Profile Photo</h2>
        <p className="text-sm text-gray-500 mb-6">Upload a new photo to update your profile.</p>

        {/* Uploader */}
        <div className="flex justify-center">
          <ProfileImageUpload
            currentImage={currentImage}
            onImageChange={(file) => setSelectedFile(file)}
            size="lg"
            showLabel={false}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedFile || isLoading}
            className="flex-1 px-4 py-2 bg-[#1E4D3A] text-white rounded-lg text-sm hover:bg-[#163d2e] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Uploading...' : 'Save Photo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageModal;