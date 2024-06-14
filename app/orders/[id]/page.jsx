"use client";
import { useState, useEffect } from 'react';
import { data } from '@/data';

const OrderDetails = ({ params }) => {
  const id = params.id;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) {
      const foundOrder = data.orders.find(order => order.id === parseInt(id));
      setOrder(foundOrder);
    }
  }, [id]);

  if (!order) return <div className="container mx-auto p-4 text-center">Loading...</div>;

  const markAsCompleted = () => {
    // Simulating update in state, assuming data.orders should reflect this change globally
    setOrder({ ...order, status: 'Completed' });

    // Assuming data.orders is updated in actual use case
    const updatedOrders = data.orders.map(o => o.id === order.id ? { ...o, status: 'Completed' } : o);
    data.orders = updatedOrders; // Updating the global data (simulated)
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
                <p>Stock: {stockItem.stock}</p>
              </li>
            );
          })}
        </ul>
        {order.status === 'Pending' && (
          <button onClick={markAsCompleted} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Mark as Completed</button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
