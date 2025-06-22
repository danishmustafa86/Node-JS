import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:3000';

// Async thunks for API calls
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      const data = await response.json();
      
      if (data.status === 'success') {
        return data.data;
      } else {
        return rejectWithValue(data.message || 'Failed to fetch items');
      }
    } catch (error) {
      return rejectWithValue('Failed to connect to server. Make sure your backend is running on port 3000.');
    }
  }
);

export const addItem = createAsyncThunk(
  'items/addItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/additem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: itemData.name,
          price: parseFloat(itemData.price)
        }),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        return data.data;
      } else {
        return rejectWithValue(data.message || 'Failed to add item');
      }
    } catch (error) {
      return rejectWithValue('Failed to add item. Check your connection.');
    }
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ id, itemData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: itemData.name,
          price: parseFloat(itemData.price)
        }),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        const updatedItem = data.data.find(item => item.id === id);
        return updatedItem || { id, ...itemData };
      } else {
        return rejectWithValue(data.message || 'Failed to update item');
      }
    } catch (error) {
      return rejectWithValue('Failed to update item. Check your connection.');
    }
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        return id;
      } else {
        return rejectWithValue(data.message || 'Failed to delete item');
      }
    } catch (error) {
      return rejectWithValue('Failed to delete item. Check your connection.');
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: '',
  success: '',
  showAddForm: false,
  editingItem: null,
  formData: { name: '', price: '' }
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearMessages: (state) => {
      state.error = '';
      state.success = '';
    },
    setShowAddForm: (state, action) => {
      state.showAddForm = action.payload;
    },
    setEditingItem: (state, action) => {
      state.editingItem = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    resetForm: (state) => {
      state.formData = { name: '', price: '' };
      state.editingItem = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch items
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.success = 'Items loaded successfully!';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add item
      .addCase(addItem.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.success = 'Item added successfully!';
        state.formData = { name: '', price: '' };
        state.showAddForm = false;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update item
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.success = 'Item updated successfully!';
        state.formData = { name: '', price: '' };
        state.editingItem = null;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete item
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.success = 'Item deleted successfully!';
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setError,
  setSuccess,
  clearMessages,
  setShowAddForm,
  setEditingItem,
  setFormData,
  resetForm
} = itemsSlice.actions;

export default itemsSlice.reducer; 