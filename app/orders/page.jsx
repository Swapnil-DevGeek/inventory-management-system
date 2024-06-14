"use client";
import { useState } from 'react';
import { data } from '../../data';

const OrderList = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState(data.orders);

  // Function to filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toString().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort the filtered orders based on the selected sort field
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortField === 'customer') return a.customer.localeCompare(b.customer);
    if (sortField === 'itemCount') return a.items.length - b.items.length;
    return a.id - b.id;
  });

  // Pagination logic remains the same as before
  const ordersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Search and filter controls */}
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

      </div>

      {/* List of orders */}
      <ul>
        {currentOrders.map(order => (
          <li key={order.id} className="mb-4 p-4 border rounded hover:shadow-lg transition-shadow duration-200">
            <a href={`/orders/${order.id}`} className="block text-gray-800 hover:text-gray-600">
              <h2 className="text-xl font-bold mb-2">Order {order.id}</h2>
              <p className="mb-1">Customer: {order.customer}</p>
              <p className="mb-1">Status: {order.status}</p>
              <p>Item Count: {order.items.length}</p>
            </a>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
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
    </div>
  );
};

export default OrderList;
