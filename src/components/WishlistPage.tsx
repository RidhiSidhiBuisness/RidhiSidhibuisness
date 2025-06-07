import React from 'react';
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { PageType, Product } from '../types';
import ProductCard from './ProductCard';

interface WishlistPageProps {
  onPageChange: (page: PageType) => void;
  onProductClick: (product: Product) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ onPageChange, onProductClick }) => {
  const { wishlistItems, clearWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save items you love to your wishlist and shop them later.</p>
          <button 
            onClick={() => onPageChange('home')}
            className="bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors font-medium"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button 
              onClick={() => onPageChange('home')}
              className="flex items-center text-gray-600 hover:text-rose-600 transition-colors mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Shopping
            </button>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist ({wishlistItems.length})</h1>
          </div>
          
          <button
            onClick={clearWishlist}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <ProductCard
              key={item.id}
              product={item.product}
              onClick={() => onProductClick(item.product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;