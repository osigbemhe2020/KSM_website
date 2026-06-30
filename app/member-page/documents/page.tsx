"use client";
// import { useState } from "react";
// import { Search, Download, ChevronLeft, ChevronRight, FileText } from "lucide-react";
// import { Card, CardHeader, Input, Button, Toggle, StackLayout, Item } from "@/components/membersScreens/memberComponents/DetailsCards";
// import Pagination from "@/components/membersScreens/memberComponents/Pagination";
import DocumentsPage from "@/components/membersScreens/documents";



// const ITEMS_PER_PAGE = 4;

const Page = () => {
  // const [search, setSearch] = useState("");
  // const [filter, setFilter] = useState("All");
  // const [page, setPage] = useState(1);

  // const filtered = allDocuments.filter((doc) => {
  //   const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
  //   const matchesFilter = filter === "All" || doc.category === filter;
  //   return matchesSearch && matchesFilter;
  // });

  // const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  // const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <DocumentsPage />

    // waummauxeweuhe-9842@yopmail.com -test123
    // brubrossougeuga-3581@yopmail.com-test124
    // kijufrupoiwe-3957@yopmail.com -test125

    //     <StackLayout spacing="gap-8">
    //       {/* Search and Filter */}
    //       <div className="flex items-center gap-4">
    //         <div className="relative flex-1 max-w-md">
    //           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
    //           <Input
    //             type="text"
    //             placeholder="SEARCH DOCUMENTS..."
    //             value={search}
    //             onChange={(value) => { setSearch(value); setPage(1); }}
    //             className="pl-9 pr-3 py-2.5 text-xs uppercase tracking-widest"
    //           />
    //         </div>
    //         <select
    //           value={filter}
    //           onChange={(e) => { setFilter(e.target.value); setPage(1); }}
    //           className="border border-border rounded px-4 py-2.5 text-xs uppercase tracking-widest bg-background focus:outline-none focus:ring-1 focus:ring-portal-button transition-colors"
    //         >
    //           <option>All</option>
    //           <option>Governance</option>
    //           <option>Guides</option>
    //           <option>Publications</option>
    //         </select>
    //       </div>

    //       {/* Document Grid */}
    //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
    //         {paginated.map((doc, i) => (
    //           <div key={i} className="border border-[#EAEAEA] rounded-md p-4 flex flex-col items-center text-center">
    //             <div className="w-full aspect-square bg-muted/30 border border-[#EAEAEA]rounded flex items-center justify-center mb-3">
    //               <FileText size={32} className="text-muted-foreground/50" />
    //             </div>
    //             <p className="text-sm font-medium leading-tight mb-1">{doc.name}</p>
    //             <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">
    //               {doc.category} · {doc.type} · {doc.size}
    //             </p>
    //             <Button
    //               icon={<Download size={12} />}
    //               className="text-xs border border-border px-3 py-1.5 hover:bg-muted/40"
    //             >
    //               Download
    //             </Button>
    //           </div>
    //         ))}
    //       </div>
    //     </StackLayout>

    //     {/* Pagination */}
    //     <Pagination
    //       currentPage={page}
    //       totalPages={totalPages}
    //       totalItems={filtered.length}
    //       startIndex={(page - 1) * ITEMS_PER_PAGE}
    //       endIndex={Math.min(page * ITEMS_PER_PAGE, filtered.length)}
    //       onPageChange={setPage}
    //       itemsPerPage={ITEMS_PER_PAGE}
    //     />
    //   </div>
  );
};

export default Page;

