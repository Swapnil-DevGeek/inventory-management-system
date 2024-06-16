import React from 'react';
import Modal from 'react-modal';
import { customStyles } from './ModalStyles'; // Ensure to import customStyles

const EditItemModal = ({ isOpen, closeModal, editItem, editItemName, setEditItemName, editItemStock, setEditItemStock, errors }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-2">Edit Item</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={editItemName}
          onChange={(e) => setEditItemName(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        {errors.name && <p className="text-red-500 mb-2">{errors.name}</p>}
        <input
          type="number"
          placeholder="Stock"
          value={editItemStock}
          onChange={(e) => setEditItemStock(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        {errors.stock && <p className="text-red-500 mb-2">{errors.stock}</p>}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button onClick={editItem} className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
          <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditItemModal;
