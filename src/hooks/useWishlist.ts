import { useState, useEffect } from 'react';
import { WishlistItem, Product } from '../types';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('ridhi-sidhi-wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  const addToWishlist = (product: Product) => {
    const existingItem = wishlistItems.find(item => item.product.id === product.id);
    
    if (!existingItem) {
      const newItem: WishlistItem = {
        id: `wishlist-${product.id}-${Date.now()}`,
        product,
        addedAt: new Date().toISOString()
      };
      const updatedWishlist = [...wishlistItems, newItem];
      setWishlistItems(updatedWishlist);
      localStorage.setItem('ridhi-sidhi-wishlist', JSON.stringify(updatedWishlist));
    }
  };

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.product.id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('ridhi-sidhi-wishlist', JSON.stringify(updatedWishlist));
  };

  const isInWishlist = (productId: string) => {
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