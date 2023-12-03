import React from 'react';
import PaginationControl from './PaginationControl';

const Pagination = ({
  selectedRows,
  filteredData,
  currentPage,
  setCurrentPage,
  indexOfLastItem,
  totalPages,
}) => (
  <div className="flex justify-between items-center mt-4 w-11/12 mx-auto">
    <div className="flex">
      <div className="px-2 py-1 text-gray-500">
        {` ${selectedRows.length} of ${filteredData.length} row(s) selected`}
      </div>
    </div>
    <div className="flex justify-end mt-4">
      <PaginationControl
        label="<<"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className="first-page"
      />
      <PaginationControl
        label="<"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="previous-page"
      />
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <PaginationControl
          key={page}
          label={page}
          onClick={() => setCurrentPage(page)}
          active={page === currentPage}
          className={`page-${page}`}
        />
      ))}
      <PaginationControl
        label=">"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={indexOfLastItem >= filteredData.length}
        className="next-page"
      />
      <PaginationControl
        label=">>"
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className="last-page"
      />
    </div>
  </div>
);

export default Pagination;
