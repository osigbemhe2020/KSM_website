"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: any, item: T, index: number) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  className?: string;
  showPagination?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T, index: number) => void;
}

function Table<T extends Record<string, any>>({
  data,
  columns,
  itemsPerPage = 10,
  className = '',
  showPagination = true,
  emptyMessage = 'No data available',
  onRowClick
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, data.length);
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={`border border-border rounded-md overflow-hidden ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((column) => (
              <th
                key={column.key as string}
                className={`text-left px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-8 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            paginatedData.map((item, index) => (
              <tr
                key={startIndex + index}
                className={`border-b border-border last:border-0 ${onRowClick ? 'hover:bg-muted/40 cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(item, startIndex + index)}
              >
                {columns.map((column) => (
                  <td key={column.key as string} className="px-5 py-3">
                    {column.render 
                      ? column.render(item[column.key], item, startIndex + index)
                      : item[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 text-sm text-muted-foreground border-t border-border">
          <span>
            Showing {data.length > 0 ? startIndex + 1 : 0}-{endIndex} of {data.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted/40 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft size={14} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-portal-button text-portal-button-foreground"
                    : "hover:bg-muted/40"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted/40 disabled:opacity-40 transition-colors"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
