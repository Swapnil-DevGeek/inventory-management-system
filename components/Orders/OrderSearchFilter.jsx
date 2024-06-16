import React from 'react';

const OrderSearchFilter = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <div className="md:flex items-center mb-4 md:gap-12">
      {/* Search input */}
      <div>
        <label className="block w-full text-sm font-medium text-gray-700 mb-1">Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by customer or order"
          className="border p-2 rounded bg-white"
        />
      </div>

      <div className='flex mt-4 md:mt-0 items-center gap-6'>
        {/* Status filter dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by status:</label>
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
            className="border p-2 rounded bg-white"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderSearchFilter;
