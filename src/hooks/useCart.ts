import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('ridhi-sidhi-cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product: Product, size: string, color: string, quantity: number = 1) => {
    const existingItem = cartItems.find(
      item => item.product.id === product.id && item.size === size && item.color === color
    );

    let updatedCart;
    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${size}-${color}-${Date.now()}`,
        product,
        quantity,
        size,
        color
      };
      updatedCart = [...cartItems, newItem];
    }

    setCartItems(updatedCart);
    localStorage.setItem('ridhi-sidhi-cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('ridhi-sidhi-cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('ridhi-sidhi-cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('ridhi-sidhi-cart');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };
};