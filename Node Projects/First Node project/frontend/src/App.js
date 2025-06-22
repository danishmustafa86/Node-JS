import React, { useEffect } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, Package } from 'lucide-react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
  setShowAddForm,
  setEditingItem,
  setFormData,
  resetForm,
  clearMessages,
  setError
} from './store/items/itemsSlice';
import './App.css';

const ItemsManager = () => {
  const dispatch = useAppDispatch();
  const {
    items,
    loading,
    error,
    success,
    showAddForm,
    editingItem,
    formData
  } = useAppSelector((state) => state.items);

  // Debug logging
  console.log('Current state:', { showAddForm, editingItem, formData, items });

  // Handle add item
  const handleAddItem = () => {
    console.log('handleAddItem called with formData:', formData);
    if (!formData.name.trim() || !formData.price) {
      console.log('Validation failed - empty fields');
      dispatch(setError('Please fill in all fields'));
      return;
    }
    console.log('Dispatching addItem with:', formData);
    dispatch(addItem(formData));
  };

  // Handle update item
  const handleUpdateItem = () => {
    console.log('handleUpdateItem called with formData:', formData);
    if (!formData.name.trim() || !formData.price) {
      dispatch(setError('Please fill in all fields'));
      return;
    }
    dispatch(updateItem({ id: editingItem.id, itemData: formData }));
  };

  // Handle delete item
  const handleDeleteItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    dispatch(deleteItem(id));
  };

  // Handle edit button click
  const handleEdit = (item) => {
    console.log('handleEdit called with item:', item);
    dispatch(setEditingItem(item));
    dispatch(setFormData({ name: item.name, price: item.price.toString() }));
    dispatch(setShowAddForm(true)); // Show form for editing
  };

  // Cancel editing
  const handleCancelEdit = () => {
    console.log('handleCancelEdit called');
    dispatch(resetForm());
    dispatch(setShowAddForm(false));
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    console.log('Input change:', field, value);
    dispatch(setFormData({ ...formData, [field]: value }));
  };

  // Clear messages after timeout
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => dispatch(clearMessages()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearMessages()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Load items on component mount
  useEffect(() => {
    console.log('Component mounted, fetching items');
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div className="items-manager-container">
      <div className="max-container">
        {/* Header */}
        <div className="header-card fade-in">
          <div className="header-content">
            <div className="header-title">
              <Package className="header-icon" />
              <h1 className="main-title">Items Manager</h1>
            </div>
            <div className="header-actions">
              <button
                onClick={() => dispatch(fetchItems())}
                disabled={loading}
                className="btn btn-secondary"
              >
                <RefreshCw className={`btn-icon ${loading ? 'loading-spinner' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => {
                  console.log('Add Item button clicked, current showAddForm:', showAddForm);
                  if (showAddForm) {
                    dispatch(setShowAddForm(false));
                  } else {
                    dispatch(resetForm());
                    dispatch(setShowAddForm(true));
                  }
                }}
                className="btn btn-primary"
              >
                <Plus className="btn-icon" />
                <span>{showAddForm || editingItem ? 'Close' : 'Add Item'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="alert alert-error scale-in">
            {error}
          </div>
        )}
        
        {success && (
          <div className="alert alert-success scale-in">
            {success}
          </div>
        )}

        {/* Add/Edit Form */}
        {(showAddForm || editingItem) && (
          <div className="card scale-in">
            <h2 className="card-title">
              {editingItem ? (
                <>
                  <Edit2 className="btn-icon" />
                  Edit Item
                </>
              ) : (
                <>
                  <Plus className="btn-icon" />
                  Add New Item
                </>
              )}
            </h2>
            <div className="form-container">
              <div className="form-group">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="form-input"
                  placeholder="Enter item name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="form-input"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div className="form-actions">
                <button
                  onClick={editingItem ? handleUpdateItem : handleAddItem}
                  disabled={loading}
                  className="btn btn-success"
                >
                  {loading ? 'Processing...' : (editingItem ? 'Update Item' : 'Add Item')}
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="card fade-in">
          <h2 className="card-title">
            <Package className="btn-icon" />
            Items List 
            <span className="items-counter">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </h2>
          
          {loading && !items.length ? (
            <div className="loading-container">
              <RefreshCw className="loading-spinner" />
              <p className="loading-text">Loading items...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <Package className="empty-icon" />
              <p className="empty-title">No items found</p>
              <p className="empty-subtitle">Add your first item to get started!</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="table-row">
                      <td className="table-cell id">{item.id}</td>
                      <td className="table-cell">{item.name}</td>
                      <td className="table-cell price">${item.price ? item.price.toFixed(2) : '0.00'}</td>
                      <td className="table-cell">
                        <div className="table-actions">
                          <button
                            onClick={() => handleEdit(item)}
                            className="action-btn edit"
                            title="Edit item"
                          >
                            <Edit2 className="btn-icon" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            disabled={loading}
                            className="action-btn delete"
                            title="Delete item"
                          >
                            <Trash2 className="btn-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsManager;