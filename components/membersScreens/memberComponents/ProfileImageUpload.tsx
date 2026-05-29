"use client";
import { useState, useEffect } from "react";
import { Upload, X, User, Camera } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageChange: (file: File | null) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabel?: boolean;
  name?: string;
}

const ProfileImageUpload = ({ 
  currentImage, 
  onImageChange, 
  size = "md",
  className = "",
  showLabel = true,
  name = "profileImage"
}: ProfileImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(currentImage || "");

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32", 
    lg: "w-48 h-48"
  };

  // Sync internal state with currentImage prop
  useEffect(() => {
    setPreview(currentImage || "");
    if (!currentImage) {
      setFile(null);
    }
  }, [currentImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === 'file-too-large') toast.error("Image must be under 5MB");
        if (error.code === 'file-invalid-type') toast.error("Only JPG, PNG, or WebP images are allowed");
        return;
      }
      
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        onImageChange(selectedFile);
      }
    }
  });

  const handleRemoveImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFile(null);
    setPreview("");
    onImageChange(null);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {showLabel && (
        <label className="block text-xs uppercase tracking-widest mb-2 text-center">
          Profile Image
        </label>
      )}
      
      <div
        {...getRootProps()}
        className={`relative ${sizeClasses[size]} rounded-full border-2 border-dashed cursor-pointer transition-all duration-200
          ${isDragActive 
            ? 'border-[#1E4D3A] bg-[#1E4D3A]/5' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${preview ? 'border-solid border-gray-200' : ''}
        `}
      >
        <input {...getInputProps()} name={name} />
        
        {/* Image Preview */}
        {preview ? (
          <>
            <img 
              src={preview} 
              alt="Profile preview" 
              className="w-full h-full rounded-full object-cover"
            />
            
            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
            >
              <X size={14} />
            </button>
            
            {/* Camera Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={24} className="text-white" />
            </div>
          </>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center w-full h-full">
            <User size={size === 'sm' ? 24 : size === 'md' ? 32 : 48} className="text-gray-400 mb-2" />
            <Upload size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} className="text-gray-400" />
          </div>
        )}
      </div>
      
      {/* Helper Text */}
      <p className="text-xs text-gray-500 mt-2 text-center max-w-[200px]">
        {file ? (
          <span className="text-green-600">
            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        ) : (
          <>
            Click or drag to upload<br />
            JPG, PNG, WebP (max 5MB)
          </>
        )}
      </p>
    </div>
  );
};

export default ProfileImageUpload;
