export const cartPersistMiddleware = (store) => (next) => (action) => {
  // Process the action first
  const result = next(action);

  // Save to localStorage after any cart-related actions
  if (action.type?.startsWith('cart/')) {
    try {
      const state = store.getState();
      localStorage.setItem('cart', JSON.stringify(state.cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  return result;
};