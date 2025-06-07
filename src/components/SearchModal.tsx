import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onProductClick: (product: Product) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, products, onProductClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 pt-20">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                autoFocus
              />
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {searchQuery.trim() === '' ? (
            <div className="text-center text-gray-500 py-8">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Start typing to search for products</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No products found for "{searchQuery}"</p>
              <p className="text-sm mt-2">Try searching with different keywords</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => {
                    onProductClick(product);
                    onClose();
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;