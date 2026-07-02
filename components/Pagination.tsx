"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  
  // Optional values for displaying "Showing X-Y of Z"
  totalItems?: number;
  itemsPerPage?: number;
  
  className?: string;
  testIdPrefix?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  className = "",
  testIdPrefix = "pagination",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Calculate items info range
  const hasItemsInfo = totalItems !== undefined && itemsPerPage !== undefined;
  const startItem = hasItemsInfo ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = hasItemsInfo ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  // Calculate pages range to display with ellipsis support
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push("ellipsis-start");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-border/60 ${className}`}
    >
      {/* Items Summary info */}
      {hasItemsInfo ? (
        <p className="text-xs text-foreground/60 font-sans tracking-wide">
          Showing <span className="font-semibold text-foreground">{startItem}</span>–
          <span className="font-semibold text-foreground">{endItem}</span> of{" "}
          <span className="font-semibold text-foreground">{totalItems}</span>
        </p>
      ) : (
        <div className="hidden sm:block" />
      )}

      {/* Controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          data-testid={`${testIdPrefix}-prev`}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded bg-white hover:bg-cream/40 hover:border-forest/40 hover:text-forest disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-border disabled:hover:text-foreground/70 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 group-disabled:transform-none" />
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((n, i) => {
          if (typeof n === "string") {
            return (
              <span
                key={`ellipsis-${i}`}
                className="w-8 h-8 flex items-center justify-center text-xs text-foreground/40 select-none"
              >
                &bull;&bull;&bull;
              </span>
            );
          }

          const isActive = n === currentPage;

          return (
            <button
              key={n}
              data-testid={`${testIdPrefix}-page-${n}`}
              onClick={() => onPageChange(n)}
              aria-current={isActive ? "page" : undefined}
              className={`w-8 h-8 text-xs font-semibold rounded border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-forest text-white border-forest shadow-sm"
                  : "bg-white border-border text-foreground/70 hover:bg-cream/40 hover:border-forest/40 hover:text-forest"
              }`}
            >
              {n}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          data-testid={`${testIdPrefix}-next`}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded bg-white hover:bg-cream/40 hover:border-forest/40 hover:text-forest disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-border disabled:hover:text-foreground/70 disabled:cursor-not-allowed transition-all duration-200"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-disabled:transform-none" />
        </button>
      </div>
    </nav>
  );
}
