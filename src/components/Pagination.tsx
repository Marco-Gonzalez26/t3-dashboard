import { getPages } from "@lib/getPagesItems";
import React, { useState } from "react";

export const Pagination: React.FC<{
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  offset: number;
  isPatientsLoading: boolean;
  patientLength: number | undefined;
}> = ({ offset, setOffset, isPatientsLoading, patientLength }) => {
  const pagesCount = patientLength && Math.ceil(patientLength / 10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const items = getPages(pagesCount);

  const handlePrev = () => {
    if (offset === 0) return;

    if (offset <= 10) {
      setOffset(offset - 10);
    }
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (patientLength && patientLength > (offset + 10)) {
      setOffset(offset + 10);

      if (pagesCount && currentPage <= pagesCount) {
        setCurrentPage((prev) => prev + 1);
      }
    } else {
      return;
    }
  };

  return (
    <div className="flex w-full items-center justify-between border-b border-b-gray-200  px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-300"
          onClick={handlePrev}
          disabled={isPatientsLoading}
        >
          Anterior
        </button>
        <div>
          {items?.map((item) => {
            const currentClassName =
              currentPage === item && "scale-110 border-blue-800 text-blue-900";
            return (
              <button
                key={`page-#${item}`}
                className={` relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-300 ${currentClassName} mr-2`}
                onClick={() => {
                  setCurrentPage(item);
                  setOffset(item * 10 - 10);
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-300"
          onClick={handleNext}
          disabled={isPatientsLoading}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
