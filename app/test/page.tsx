"use client";
import { useState } from "react";
import { Search, Download, ChevronLeft, ChevronRight, FileText } from "lucide-react";


const allDocuments = [
  { name: "Church Constitution", category: "Governance", type: "PDF", size: "2.4 MB" },
  { name: "Code of Conduct", category: "Governance", type: "PDF", size: "540 KB" },
  { name: "Member Handbook", category: "Guides", type: "PDF", size: "1.8 MB" },
  { name: "Annual Report 2025", category: "Publications", type: "PDF", size: "3.1 MB" },
  { name: "Annual Report 2025", category: "Publications", type: "PDF", size: "3.1 MB" },
  { name: "Meeting Minutes Q1", category: "Governance", type: "PDF", size: "1.2 MB" },
];

const ITEMS_PER_PAGE = 5;

const Documents = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = allDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || doc.category === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      <h1 className="text-3xl font-serif font-normal mb-8">Documents</h1>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="SEARCH DOCUMENTS..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3 py-2.5 border border-border rounded text-xs uppercase tracking-widest bg-background focus:outline-none focus:ring-1 focus:ring-portal-button transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="border border-border rounded px-4 py-2.5 text-xs uppercase tracking-widest bg-background focus:outline-none focus:ring-1 focus:ring-portal-button transition-colors"
        >
          <option>All</option>
          <option>Governance</option>
          <option>Guides</option>
          <option>Publications</option>
        </select>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-8">
        {paginated.map((doc, i) => (
          <div key={i} className="border border-border rounded-md p-4 flex flex-col items-center text-center">
            <div className="w-full aspect-[3/4] bg-muted/30 border border-border rounded flex items-center justify-center mb-3">
              <FileText size={32} className="text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium leading-tight mb-1">{doc.name}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">
              {doc.category} · {doc.type} · {doc.size}
            </p>
            <button className="flex items-center gap-1.5 text-xs border border-border rounded px-3 py-1.5 hover:bg-muted/40 transition-colors">
              <Download size={12} />
              Download
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted/40 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                page === i + 1
                  ? "bg-portal-button text-portal-button-foreground"
                  : "hover:bg-muted/40"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted/40 disabled:opacity-40 transition-colors"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documents;
