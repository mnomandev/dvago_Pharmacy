import { createSlice } from '@reduxjs/toolkit';

// Validation helper functions
const validateCartItem = (item) => {
  return {
    id: String(item.id || Date.now().toString()),
    name: String(item.name || 'Unknown Product'),
    price: Math.max(0, Number(item.price) || 0),
    quantity: Math.max(1, Number(item.quantity) || 1),
    image: String(item.image || '/placeholder-image.jpg'),
  };
};

const calculateItemTotal = (price, quantity) => {
  return Math.max(0, price * quantity);
};

const calculateCartTotals = (items) => {
  return items.reduce(
    (totals, item) => {
      totals.quantity += item.quantity;
      totals.amount += item.totalPrice;
      return totals;
    },
    { quantity: 0, amount: 0 }
  );
};

// Load initial state from localStorage with validation
const loadInitialState = () => {
  try {
    const persistedCart = localStorage.getItem('cart');
    if (persistedCart) {
      const parsedCart = JSON.parse(persistedCart);
      
      // Validate and sanitize persisted data
      const validatedItems = (parsedCart.items || []).map(item => ({
        ...validateCartItem(item),
        totalPrice: calculateItemTotal(item.price, item.quantity),
      }));

      const totals = calculateCartTotals(validatedItems);

      return {
        items: validatedItems,
        totalQuantity: totals.quantity,
        totalAmount: totals.amount,
      };
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  
  // Return clean initial state
  return {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadInitialState(),
  reducers: {
    addItemToCart: (state, action) => {
      const rawItem = action.payload;
      const newItem = validateCartItem(rawItem);
      
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        // Add new item
        state.items.push({
          ...newItem,
          totalPrice: calculateItemTotal(newItem.price, newItem.quantity),
        });
      } else {
        // Update existing item
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = calculateItemTotal(existingItem.price, existingItem.quantity);
      }
      
      // Recalculate totals
      const totals = calculateCartTotals(state.items);
      state.totalQuantity = totals.quantity;
      state.totalAmount = totals.amount;
    },
    
    removeItemFromCart: (state, action) => {
      const id = String(action.payload);
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== id);
        
        // Recalculate totals
        const totals = calculateCartTotals(state.items);
        state.totalQuantity = totals.quantity;
        state.totalAmount = totals.amount;
      }
    },
    
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemId = String(id);
      const newQuantity = Math.max(1, Number(quantity) || 1);
      
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        existingItem.quantity = newQuantity;
        existingItem.totalPrice = calculateItemTotal(existingItem.price, newQuantity);
        
        // Recalculate totals
        const totals = calculateCartTotals(state.items);
        state.totalQuantity = totals.quantity;
        state.totalAmount = totals.amount;
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;