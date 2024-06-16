import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <li className="mb-4 p-4 border rounded hover:shadow-lg transition-shadow duration-200">
      <a href={`/orders/${order.id}`} className="block text-gray-800 hover:text-gray-600">
        <h2 className="text-xl font-bold mb-2">Order {order.id}</h2>
        <p className="mb-1">Customer: {order.customer}</p>
        <p className="mb-1">Status: {order.status}</p>
        <p>Item Count: {order.items.length}</p>
      </a>
    </li>
  );
};

export default OrderItem;
