import React from 'react';
import Modal from 'react-modal';
import { customStyles } from './ModalStyles'; // Ensure to import customStyles

const DeleteItemModal = ({ isOpen, closeModal, deleteItem }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <button onClick={deleteItem} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteItemModal;
