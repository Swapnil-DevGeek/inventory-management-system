"use client";

import { useEffect, useState } from 'react';
import Head from 'next/head';

const Home = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    // Fetch orders and items from local storage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];

    // Calculate total items
    const totalItemsCount = storedItems.length;

    // Calculate total orders
    const totalOrdersCount = storedOrders.length;

    // Calculate pending orders
    const pendingOrdersCount = storedOrders.filter(order => order.status === 'Pending').length;

    // Update state
    setTotalItems(totalItemsCount);
    setTotalOrders(totalOrdersCount);
    setPendingOrders(pendingOrdersCount);
  }, []);

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to our inventory management system" />
      </Head>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Inventory Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Total Items</h2>
            <p className="text-3xl font-bold">{totalItems}</p>
          </div>
          <div className="p-4 bg-white border rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </div>
          <div className="p-4 bg-white border rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Pending Orders</h2>
            <p className="text-3xl font-bold">{pendingOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
