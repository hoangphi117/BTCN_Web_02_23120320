import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  loading,
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();
  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  return (
    <div className="flex justify-center items-center space-x-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className={`p-2 rounded-full ${foregroundColor} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 cursor-pointer`}
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className={`px-3 py-1 ${foregroundColor} opacity-60`}>
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              disabled={loading}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                page === currentPage
                  ? "bg-blue-600 text-white shadow-md"
                  : `${foregroundColor} hover:bg-gray-100 dark:hover:bg-gray-700`
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className={`p-2 rounded-full ${foregroundColor} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 cursor-pointer`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default PaginationControls;
