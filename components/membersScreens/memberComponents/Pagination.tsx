import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  startIndex, 
  endIndex, 
  onPageChange,
  itemsPerPage = 10 
}: PaginationProps) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-600">
        Showing {totalItems > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, totalItems)} of{' '}
        {totalItems}
      </p>
      <div className="flex gap-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-2 text-sm"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <div className="flex items-center gap-2 px-3">
          <span className="text-sm font-medium text-slate-600">
            {currentPage} / {totalPages || 1}
          </span>
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-2 text-sm"
        >
          Next
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
