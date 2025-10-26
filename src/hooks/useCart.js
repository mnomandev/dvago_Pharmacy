import { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from "../store/cartSlice";

export const useCart = (initialProduct = null) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  
  // Use ref to always have latest product without re-renders
  const productRef = useRef(initialProduct);
  
  // Update product ref when initialProduct changes
  if (initialProduct !== productRef.current) {
    productRef.current = initialProduct;
  }

  // Memoized functions to prevent unnecessary re-renders
  const increaseQuantity = useCallback(() => {
    setQuantity(prev => prev + 1);
  }, []);

  const decreaseQuantity = useCallback(() => {
    setQuantity(prev => Math.max(1, prev - 1));
  }, []);

  const resetQuantity = useCallback(() => {
    setQuantity(1);
  }, []);

  const validateProduct = useCallback((product) => {
    if (!product) {
      console.error('No product provided to add to cart');
      return null;
    }
    
    if (!product.id || !product.name || product.price === undefined) {
      console.error('Invalid product data:', product);
      return null;
    }
    
    return product;
  }, []);

  const handleAddToCart = useCallback((customProduct = null) => {
    const productToAdd = customProduct || productRef.current;
    const validatedProduct = validateProduct(productToAdd);
    
    if (!validatedProduct) return;

    // Prepare cart item data
    const cartItem = {
      id: validatedProduct.id,
      name: validatedProduct.name,
      price: validatedProduct.price,
      quantity: quantity,
      image: validatedProduct.image,
    };

    console.log('Adding to cart:', cartItem); // Debug log

    dispatch(addItemToCart(cartItem));

    // Show user feedback
    alert(`${quantity} ${validatedProduct.name} added to cart!`);
    
    
    // Reset quantity after successful addition
    resetQuantity();
  }, [dispatch, quantity, resetQuantity, validateProduct]);

  const handleQuickAdd = useCallback((productToAdd) => {
    const validatedProduct = validateProduct(productToAdd);
    
    if (!validatedProduct) return;

    // Always add 1 quantity for quick add
    const cartItem = {
      id: validatedProduct.id,
      name: validatedProduct.name,
      price: validatedProduct.price,
      quantity: 1,
      image: validatedProduct.image,
    };

    alert(`1 ${validatedProduct.name} added to cart!`); // Debug log

    dispatch(addItemToCart(cartItem));
    
    // Optional: Show subtle notification instead of alert for quick add
    console.log(`${validatedProduct.name} added to cart!`);
  }, [dispatch, validateProduct]);

  // Update product function in case product changes
  const updateProduct = useCallback((newProduct) => {
    productRef.current = newProduct;
  }, []);

  return {
    quantity,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
    resetQuantity,
    handleAddToCart,
    handleQuickAdd,
    updateProduct, // Export update function
  };
};