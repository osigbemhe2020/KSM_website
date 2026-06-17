// components/DocumentUploadModal.tsx
"use client";
import { useState } from "react";
import { X, Upload, FileText } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useUploadDocument } from "@/hooks/document.hook";
import { toast } from "react-toastify";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = ["Constitution", "Circulars", "Minutes", "Announcements", "Other"];

const DocumentUploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isPending } = useUploadDocument();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === 'file-too-large') toast.error("File must be under 10MB");
        if (error.code === 'file-invalid-type') toast.error("Only PDF files are allowed");
        return;
      }
      if (acceptedFiles.length > 0) setFile(acceptedFiles[0]);
    }
  });

  if (!isOpen) return null;

  const handleClose = () => {
    // Reset form on close
    setTitle("");
    setCategory("");
    setFile(null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a document title");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append('document', file);
    formData.append('title', title.trim());
    formData.append('category', category);

    mutate(formData, {
      onSuccess: () => {
        toast.success("Document uploaded successfully");
        handleClose();
      },
      onError: (error: any) => {
        toast.error(error.message || "Upload failed");
      }
    });
  };

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Upload Document</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. KSM Constitution 2024"
              className="w-full bg-[#F4F4F4] py-2 px-4 text-sm focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#F4F4F4] py-2 px-4 text-sm focus:outline-none"
            >
              <option value="">Select category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Dropzone */}
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">
              PDF File
            </label>
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center w-full h-36 
                border-2 border-dashed cursor-pointer transition-colors rounded-sm
                ${isDragActive
                  ? 'border-forest bg-forest/5'
                  : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <input {...getInputProps()} />

              {file ? (
                // File selected state
                <div className="flex items-center gap-3 px-4">
                  <FileText size={24} className="text-forest shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  {/* Clear file */}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                // Empty state
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Upload size={28} />
                  <p className="text-sm text-center">
                    {isDragActive
                      ? "Drop your PDF here"
                      : "Drag & drop or click to select"
                    }
                  </p>
                  <p className="text-xs">PDF only • Max 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="flex-1 border border-gray-300 py-2 text-sm hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !file || !title || !category}
              className="flex-1 bg-forest text-white py-2 text-sm 
                hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {isPending ? "Uploading..." : "Upload"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default DocumentUploadModal;