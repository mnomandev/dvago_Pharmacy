import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { cartPersistMiddleware } from './helper/cartPersistMiddleware';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(cartPersistMiddleware),
});

export default store;