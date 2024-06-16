import React from 'react';

const OrderSorting = ({ sortField, setSortField,statusFilter,setStatusFilter }) => {
  return (
    <div className='flex gap-3'>
      {/* Sort dropdown */}
      <div>
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
        <select
          onChange={(e) => setSortField(e.target.value)}
          value={sortField}
          className="border p-2 rounded bg-white"
        >
          <option value="id">Order ID</option>
          <option value="customer">Customer Name</option>
          <option value="itemCount">Item Count</option>
        </select>
      </div>
    </div>
  );
};

export default OrderSorting;
