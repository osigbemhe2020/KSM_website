// app/member-page/documents/documents.tsx
"use client";
import { useState } from "react";
import { Upload, FileText, Trash2, Download, Search } from "lucide-react";
import { useGetDocuments, useDeleteDocument } from "@/hooks/document.hook";
import { Card, CardHeader, Input, Button, Toggle, StackLayout, Item } from "@/components/membersScreens/memberComponents/DetailsCards";

import DocumentUploadModal from "./memberComponents/DocumentUploadModal";
import { toast } from "react-toastify";

const DocumentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const { data, isLoading } = useGetDocuments();
  const { mutate: deleteDoc } = useDeleteDocument();

  const filtered = data?.documents?.filter((doc: any) => {
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || doc.category === filter;
    return matchesSearch && matchesFilter;
  }) || [];

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    deleteDoc(id, {
      onSuccess: () => toast.success("Document deleted"),
      onError: (error) => toast.error(error.message),
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div 
    className={ 'border-2 border-[#EAEAEA]  rounded-lg p-4'}
    >

        {/* Search and Filter */}
        {/* <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="SEARCH DOCUMENTS..."
              value={search}
              onChange={(value) => setSearch(typeof value === 'string' ? value : value.target.value)}
              className="pl-9 pr-3 py-2.5 text-xs uppercase tracking-widest"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-border rounded px-4 py-2.5 text-xs uppercase tracking-widest bg-background focus:outline-none focus:ring-1 focus:ring-portal-button transition-colors"
          >
            <option>All</option>
            <option>Governance</option>
            <option>Guides</option>
            <option>Publications</option>
            <option>Other</option>
          </select>
        </div> */}

        {/* Header with upload button */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{filtered.length} documents</p>
        
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-forest text-white px-4 py-2 text-sm rounded-sm hover:opacity-90"
          >
            <Upload size={16} />
            Upload Document
          </button>
     
      </div>

        {/* Document Grid */}
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-10">No documents found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((doc: any) => (
              <div key={doc._id} className="border border-black/30 rounded-md p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-30 bg-muted/30 border border-black/30 rounded flex items-center justify-center mb-3">
                  <FileText size={32} className="text-muted-foreground/50" />
                </div>
                <p className="text-sm font-medium leading-tight mb-1">{doc.title}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                  {doc.category} • {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-2 w-full justify-center">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-forest"
                  >
                    <Download size={16} />
                  </a>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="p-2 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      <DocumentUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DocumentsPage;