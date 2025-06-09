import { useState, useEffect } from 'react';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('ridhi-sidhi-wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  const addToWishlist = (product) => {
    const existingItem = wishlistItems.find(item => item.product.id === product.id);
    
    if (!existingItem) {
      const newItem = {
        id: `wishlist-${product.id}-${Date.now()}`,
        product,
        addedAt: new Date().toISOString()
      };
      const updatedWishlist = [...wishlistItems, newItem];
      setWishlistItems(updatedWishlist);
      localStorage.setItem('ridhi-sidhi-wishlist', JSON.stringify(updatedWishlist));
    }
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.product.id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('ridhi-sidhi-wishlist', JSON.stringify(updatedWishlist));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.product.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem('ridhi-sidhi-wishlist');
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount
  };
};