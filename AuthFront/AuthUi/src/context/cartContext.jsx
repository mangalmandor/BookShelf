import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Initialize state by checking LocalStorage first
  const [cart, setCart] = useState(() => {
    // Changed key to prevent conflicts with old 'id' based data
    const savedCart = localStorage.getItem('library-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Whenever 'cart' changes, save it to LocalStorage
  useEffect(() => {
    localStorage.setItem('library-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      // --- CRITICAL CHANGE: item.id -> item._id ---
      const isItemInCart = prev.find((item) => item._id === product._id);
      if (isItemInCart) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    // --- CRITICAL CHANGE: item.id -> item._id ---
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  // Optional: Added clearCart for when they successfully checkout
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 
