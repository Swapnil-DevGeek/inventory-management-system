import React from 'react';

const OrderSorting = ({ sortField, setSortField }) => {
  return (
    <div className="flex items-center mt-4 gap-6">
      {/* Sort dropdown */}
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
