"use client";
import { useState, useEffect } from 'react';
import { data } from '../../data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddItemModal from '@/components/Modals/AddItemModal';
import EditItemModal from '@/components/Modals/EditItemModal';
import DeleteItemModal from '@/components/Modals/DeleteItemModal';
import InventoryItem from '@/components/Inventory/InventoryItems';
import OrderPagination from '@/components/Orders/OrderPagination';

const InventoryManagement = () => {
  const [items, setItems] = useState([]);
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

  useEffect(() => {
    const initialItems = JSON.parse(localStorage.getItem('items')) || data.items;
    setItems(initialItems);
  }, []);

  const filteredItems = items.filter(item => {
    const matchesStockFilter =
      stockFilter === 'In Stock' ? item.stock > 0 : stockFilter === 'Out of Stock' ? item.stock === 0 : true;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStockFilter && matchesSearch;
  });

  const setItemsAndLocalStorage = (updatedItems) => {
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

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
    const updatedItems = [...items, newItem];
    setItemsAndLocalStorage(updatedItems);
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
    setItemsAndLocalStorage(updatedItems);
    closeEditModal();
    toast.success('Item updated successfully', { position: 'top-right' });
  };

  const deleteItem = () => {
    const updatedItems = items.filter(item => item.id !== itemToDelete.id);
    setItemsAndLocalStorage(updatedItems);
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
        {currentItems.length === 0 ? (<div className='text-center mt-12 mb-28 text-2xl text-gray-600'>No Items to show</div>)
          : (currentItems.map(item => (
            <InventoryItem
              key={item.id}
              item={item}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          )))  
      }
      </ul>

      {/* Pagination controls */}
      <OrderPagination 
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      />

      {/* Modal for adding new item */}

      <AddItemModal 
        isOpen={modalIsOpen}
        closeModal={closeModal}
        addItem={addItem}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        newItemStock={newItemStock}
        setNewItemStock={setNewItemStock}
        errors={errors}
      />

      {/* Modal for delete confirmation */}

      <DeleteItemModal
        isOpen={deleteModalIsOpen}
        closeModal={closeDeleteModal}
        deleteItem={deleteItem}
      />

      {/* Modal for editing item */}
      <EditItemModal
        isOpen={editModalIsOpen}
        closeModal={closeEditModal}
        editItem={editItem}
        editItemName={editItemName}
        setEditItemName={setEditItemName}
        editItemStock={editItemStock}
        setEditItemStock={setEditItemStock}
        errors={errors}
      />

    </div>
  );
};

export default InventoryManagement;
