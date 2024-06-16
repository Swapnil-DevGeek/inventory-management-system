import React from 'react';

const OrderPagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-l bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-100">{currentPage} of {totalPages}</span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-r bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default OrderPagination;
