import React from 'react';

const InventoryItem = ({ item, onEdit, onDelete }) => {
  return (
    <li className="mb-4 p-4 border rounded hover:shadow-lg transition-shadow duration-200">
      <p className="font-medium">Name: {item.name}</p>
      <p>Stock: {item.stock}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
        <button onClick={() => onDelete(item)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </li>
  );
};

export default InventoryItem;
