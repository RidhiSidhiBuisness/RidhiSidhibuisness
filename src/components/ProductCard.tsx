import React from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../hooks/useWishlist';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.originalPrice && (
          <div className="absolute top-3 left-3">
            <span className="bg-rose-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button 
            onClick={handleWishlistClick}
            className={`p-2 backdrop-blur-sm rounded-full transition-all ${
              inWishlist 
                ? 'bg-rose-600 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-rose-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <ShoppingBag className="h-4 w-4 text-gray-600 hover:text-rose-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center mt-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.subcategory}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;