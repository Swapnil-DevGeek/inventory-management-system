"use client";
import { useState, useEffect } from 'react';
import { data } from '@/data';

const OrderDetails = ({ params }) => {
  const id = params.id;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Load initial data into local storage if not already present
    const storedOrders = JSON.parse(localStorage.getItem('orders'));
    if (!storedOrders || storedOrders.length === 0) {
      localStorage.setItem('orders', JSON.stringify(data.orders));
    }

    // Retrieve data from local storage
    const orders = JSON.parse(localStorage.getItem('orders'));
    const foundOrder = orders.find(order => order.id === parseInt(id));
    setOrder(foundOrder);
  }, [id]);

  if (!order) return <div className="container mx-auto p-4 text-center">Loading...</div>;

  const markAsCompleted = () => {
    // Update the local state
    setOrder({ ...order, status: 'Completed' });

    // Update local storage
    const orders = JSON.parse(localStorage.getItem('orders'));
    const updatedOrders = orders.map(o => o.id === order.id ? { ...o, status: 'Completed' } : o);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">Order {order.id}</h2>
        <p className="mb-2">Customer: {order.customer}</p>
        <p className="mb-2">Status: {order.status}</p>
        <ul className="mb-4">
          {order.items.map(item => {
            const stockItem = data.items.find(stockItem => stockItem.id === item.id);
            return (
              <li key={item.id} className="mb-2">
                <p className="font-medium">Name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Stock: {stockItem?.stock || 'N/A'}</p>
              </li>
            );
          })}
        </ul>
        <button
          onClick={markAsCompleted}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${order.status === 'Completed' ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={order.status === 'Completed'}
        >
          Mark as Completed
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
