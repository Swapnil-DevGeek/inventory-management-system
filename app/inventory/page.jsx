"use client";
import { useState } from 'react';
import Modal from 'react-modal';
import { data } from '../../data';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Apply inline styles if you prefer not using a separate CSS file
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const InventoryManagement = () => {
  const [items, setItems] = useState(data.items);
  const [stockFilter, setStockFilter] = useState('All');
  const [newItemName, setNewItemName] = useState('');
  const [newItemStock, setNewItemStock] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editItemName, setEditItemName] = useState('');
  const [editItemStock, setEditItemStock] = useState('');
  const [errors, setErrors] = useState({ name: '', stock: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item => {
    const matchesStockFilter =
      stockFilter === 'In Stock' ? item.stock > 0 : stockFilter === 'Out of Stock' ? item.stock === 0 : true;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStockFilter && matchesSearch;
  });
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setErrors({ name: '', stock: '' });
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setItemToDelete(null);
    setDeleteModalIsOpen(false);
  };

  const openEditModal = (item) => {
    setItemToEdit(item);
    setEditItemName(item.name);
    setEditItemStock(item.stock);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setItemToEdit(null);
    setEditItemName('');
    setEditItemStock('');
    setEditModalIsOpen(false);
  };

  const addItem = () => {
    const newErrors = { name: '', stock: '' };

    if (!newItemName) newErrors.name = 'Item name is required';
    if (!newItemStock) newErrors.stock = 'Stock value is required';

    if (newErrors.name || newErrors.stock) {
      setErrors(newErrors);
      return;
    }

    const newItem = {
      id: items.length + 1,
      name: newItemName,
      stock: parseInt(newItemStock, 10)
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemStock('');
    closeModal();
    toast.success('Item added successfully', { position: 'top-right' });
  };

  const editItem = () => {
    const newErrors = { name: '', stock: '' };

    if (!editItemName) newErrors.name = 'Item name is required';
    if (!editItemStock) newErrors.stock = 'Stock value is required';

    if (newErrors.name || newErrors.stock) {
      setErrors(newErrors);
      return;
    }

    const updatedItems = items.map(item =>
      item.id === itemToEdit.id
        ? { ...item, name: editItemName, stock: parseInt(editItemStock, 10) }
        : item
    );
    setItems(updatedItems);
    closeEditModal();
    toast.success('Item updated successfully', { position: 'top-right' });
  };

  const deleteItem = () => {
    setItems(items.filter(item => item.id !== itemToDelete.id));
    closeDeleteModal();
    toast.success('Item deleted successfully', { position: 'top-right' });
  };

    // Pagination
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto p-4">
    <ToastContainer />
    <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
    <div className="mb-4 flex md:flex-row md:justify-between md:items-center flex-col ">

      <div className=' flex md:flex-row md:items-center flex-col md:gap-12'>

      <div className="relative">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border p-2 rounded bg-white w-64 pl-8"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute top-2 left-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.5 15.5l5.5 5.5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 17l5.5 5.5M15.5 15.5a6 6 0 1 1-8.5-8.5 6 6 0 0 1 8.5 8.5z"
            />
          </svg>
      </div>

      <div className="flex items-center p-2">
        <label className="mr-2 font-medium">Filter by stock:</label>
        <select
          onChange={(e) => setStockFilter(e.target.value)}
          value={stockFilter}
          className="border p-2 rounded bg-white"
        >
          <option value="All">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      </div>
      <button onClick={openModal} className="w-32 bg-blue-500 text-white px-4 py-2 rounded">Add Item</button>
    </div>
    <ul>
      {currentItems.map(item => (
        <li key={item.id} className="mb-4 p-4 border rounded hover:shadow-lg transition-shadow duration-200">
          <p className="font-medium">Name: {item.name}</p>
          <p>Stock: {item.stock}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => openEditModal(item)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
            <button onClick={() => openDeleteModal(item)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div>
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
  
      {/* Modal for adding new item */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
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

      {/* Modal for delete confirmation */}
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        style={customStyles}
      >
        <div className="modal-content">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          {itemToDelete && (
            <p>Are you sure you want to delete the item "{itemToDelete.name}"?</p>
          )}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button onClick={deleteItem} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            <button onClick={closeDeleteModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      </Modal>

      {/* Modal for editing item */}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        style={customStyles}
      >
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
            <button onClick={editItem} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
            <button onClick={closeEditModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InventoryManagement;
