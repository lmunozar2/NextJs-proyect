"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(createPageURL(page));
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1) return null;

  const pages = getPageNumbers();
  const startItem = totalItems ? (currentPage - 1) * (itemsPerPage ?? 10) + 1 : null;
  const endItem = totalItems
    ? Math.min(currentPage * (itemsPerPage ?? 10), totalItems)
    : null;

  return (
    <div className="flex flex-col items-center gap-3 mt-10">
      {/* Items info */}
      {totalItems && (
        <span className="text-xs text-base-content/50">
          Showing{" "}
          <span className="font-medium text-base-content">{startItem}–{endItem}</span>{" "}
          of <span className="font-medium text-base-content">{totalItems}</span> results
        </span>
      )}

      {/* Page controls */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-square btn-sm btn-ghost"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Page numbers */}
        <div className="join">
          {pages.map((page, idx) =>
            page === "..." ? (
              <button
                key={`ellipsis-${idx}`}
                className="join-item btn btn-square btn-sm btn-disabled"
              >
                ···
              </button>
            ) : (
              <input
                key={page}
                className="join-item btn btn-square btn-sm"
                type="radio"
                name="pagination"
                aria-label={String(page)}
                checked={currentPage === page}
                onChange={() => handlePageChange(page as number)}
              />
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-square btn-sm btn-ghost"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}