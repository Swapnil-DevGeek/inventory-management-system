"use client";
import React, { useState, useEffect } from 'react';
import { data } from '../../data';
import OrderSearchFilter from '@/components/Orders/OrderSearchFilter';
import OrderSorting from '@/components/Orders/OrderSorting';
import OrderPagination from '@/components/Orders/OrderPagination';
import OrderItem from '@/components/Orders/OrderItem';

const OrderList = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders'));
    if (!storedOrders) {
      localStorage.setItem('orders', JSON.stringify(data.orders));
      setOrders(data.orders);
    } else {
      setOrders(storedOrders);
    }
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toString().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortField === 'customer') return a.customer.localeCompare(b.customer);
    if (sortField === 'itemCount') return a.items.length - b.items.length;
    return a.id - b.id;
  });

  const ordersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <div className='flex flex-col lg:flex lg:flex-row lg:items-center gap-4 mb-8'>

      <OrderSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <OrderSorting
        sortField={sortField}
        setSortField={setSortField}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      </div>

      <ul>
        {currentOrders.map(order => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>

      <OrderPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default OrderList;
