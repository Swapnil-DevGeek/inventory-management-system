import React from 'react';

const OrderSearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    
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
      
  );
};

export default OrderSearchFilter;
