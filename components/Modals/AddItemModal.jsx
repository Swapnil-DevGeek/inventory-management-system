import React from 'react';
import Modal from 'react-modal';
import { customStyles } from './ModalStyles'; 

const AddItemModal = ({ isOpen, closeModal, addItem, newItemName, setNewItemName, newItemStock, setNewItemStock, errors }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-2">Add New Item</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        {errors.name && <p className="text-red-500 mb-2">{errors.name}</p>}
        <input
          type="number"
          placeholder="Stock"
          value={newItemStock}
          onChange={(e) => setNewItemStock(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        {errors.stock && <p className="text-red-500 mb-2">{errors.stock}</p>}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button onClick={addItem} className="bg-green-500 text-white px-4 py-2 rounded">Add Item</button>
          <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddItemModal;
